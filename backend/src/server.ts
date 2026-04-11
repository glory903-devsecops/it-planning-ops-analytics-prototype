import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { generateSalesData } from './generator';
import { LogisticsManager } from './logisticsManager';
import { NetworkManager } from './networkManager';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let cacheReady = false;
let aggregatedData: any = {};
let latestEvents: any[] = [];
let salesData: any[] = [];
const logistics = new LogisticsManager();
const network = new NetworkManager();

console.log("Generating 30,000 sales records. This may take a moment...");
salesData = generateSalesData(30000);

function aggregateData() {
  const timeSeriesMap: any = {};

  for (let i = 0; i < 24; i++) {
    const h = i.toString().padStart(2, '0');
    timeSeriesMap[`${h}:00`] = { time: `${h}:00`, 총매출액: 0 };
  }
  
  const channelStats: any = {};
  const itemStats: any = {};
  const availableItems = new Set<string>();
  const availableStores = new Set<string>();
  const availableChannels = new Set<string>();

  salesData.forEach(event => {
    availableItems.add(event.menu_name);
    availableStores.add(event.store_name);
    availableChannels.add(event.channel);

    const timeMatch = event.timestamp.match(/ (\d{2}):/);
    if (!timeMatch) return;
    
    const hour = `${timeMatch[1]}:00`;
    
    if (event.status === '완료') {
      timeSeriesMap[hour]['총매출액'] += event.total_price;
      
      if (!timeSeriesMap[hour][event.menu_name]) timeSeriesMap[hour][event.menu_name] = 0;
      timeSeriesMap[hour][event.menu_name] += event.total_price;

      if (!timeSeriesMap[hour][event.store_name]) timeSeriesMap[hour][event.store_name] = 0;
      timeSeriesMap[hour][event.store_name] += event.total_price;

      if (!timeSeriesMap[hour][event.channel]) timeSeriesMap[hour][event.channel] = 0;
      timeSeriesMap[hour][event.channel] += event.total_price;

      channelStats[event.channel] = (channelStats[event.channel] || 0) + event.total_price;
      itemStats[event.menu_name] = (itemStats[event.menu_name] || 0) + event.total_price;
    }
  });

  const timeSeriesData = Object.values(timeSeriesMap).sort((a: any, b: any) => a.time.localeCompare(b.time));

  timeSeriesData.forEach((dataPoint: any) => {
    [...availableItems, ...availableStores, ...availableChannels].forEach(key => {
      if (dataPoint[key] === undefined) {
        dataPoint[key] = 0;
      }
    });
  });

  const channelDistribution = Object.keys(channelStats).map(channel => ({
    name: channel,
    value: channelStats[channel]
  }));

  const topItems = Object.keys(itemStats)
    .map(item => ({ name: item, sales: itemStats[item] }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const recentSales = salesData
    .filter(e => e.status === '완료')
    .slice(0, 10);

  let totalSalesGlobal = 0;
  let totalOrdersGlobal = 0;
  for (const event of salesData) {
    if (event.status === '완료') {
      totalSalesGlobal += event.total_price;
      totalOrdersGlobal++;
    }
  }

  const sortedItems = Object.keys(itemStats)
    .sort((a, b) => itemStats[b] - itemStats[a]);
  const bestSeller = sortedItems[0] || "N/A";

  const metrics = {
    totalSales: totalSalesGlobal,
    totalOrders: totalOrdersGlobal,
    averageOrderValue: totalOrdersGlobal > 0 ? Math.round(totalSalesGlobal / totalOrdersGlobal) : 0,
    bestSeller: bestSeller
  };

  aggregatedData = {
    metrics,
    timeSeriesData,
    availableItems: Array.from(availableItems),
    availableStores: Array.from(availableStores),
    availableChannels: Array.from(availableChannels),
    channelDistribution,
    topItems,
    recentSales
  };

  cacheReady = true;
  console.log("Aggregation completed. Server ready.");
}

aggregateData();

app.get('/api/dashboard/init', (req, res) => {
  if (!cacheReady) return res.status(503).json({ error: "Cache not ready yet" });
  res.json(aggregatedData);
});

app.get('/api/dashboard/export', (req, res) => {
  const { year, month, day, store } = req.query;
  
  let filtered = salesData;
  if (year) filtered = filtered.filter(d => d.timestamp.startsWith(year as string));
  if (month) filtered = filtered.filter(d => d.timestamp.includes(`-${(month as string).padStart(2, '0')}-`));
  if (day) filtered = filtered.filter(d => d.timestamp.includes(`-${(day as string).padStart(2, '0')} `));
  if (store && store !== '전체 지점') filtered = filtered.filter(d => d.store_name === store);

  // Convert to CSV
  const headers = ['일시', '품목명', '지점', '매체', '결제수단', '상태', '금액'];
  const rows = filtered.map(d => [
    d.timestamp,
    d.menu_name,
    d.store_name,
    d.channel,
    d.payment_method,
    d.status,
    d.total_price
  ]);
  
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=ediya_sales_export.csv`);
  res.send(csvContent);
});

app.get('/api/logistics/init', (req, res) => {
  const baseData = logistics.getLogisticsData();
  const availableItems = ['원두', '우유', '종이컵', '시럽'];
  const availableStores = STORES;
  res.json({
    ...baseData,
    timeSeriesData: logistics.history,
    availableItems,
    availableStores
  });
});

app.get('/api/network/init', (req, res) => {
  const baseData = network.getNetworkData();
  const availableServices = SERVICES;
  res.json({
    ...baseData,
    timeSeriesData: network.history,
    availableServices
  });
});

io.on('connection', (socket) => {
  console.log('Client connected to Live WebSocket:', socket.id);
  // Send initial history/state immediately to the newly connected client
  socket.emit('recent_sales_full', salesData.filter(e => e.status === '완료').slice(0, 50));
  socket.emit('inventory_history_update', logistics.history);
  socket.emit('network_history_update', network.history);
});

setInterval(() => {
  if(!cacheReady) return;
  const newEvent = generateSalesData(1)[0];
  newEvent.timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19); 
  
  // Update UI Dashboard Sales feed
  io.emit('new_sales_event', newEvent);
  
  // Deduct inventory and check alerts
  const { alerts } = logistics.processSalesEvent(newEvent);
  logistics.takeSnapshot();
  io.emit('inventory_update', logistics.getLogisticsData());
  io.emit('inventory_history_update', logistics.history);
  
  alerts.forEach(alert => {
    io.emit('inventory_alert', alert);
  });

  // Track network events
  const netEvent = network.tick();
  network.takeSnapshot();
  io.emit('network_update', network.getNetworkData());
  io.emit('network_history_update', network.history);
  
  if (netEvent.status !== '건강(정상)') {
     io.emit('network_incident', netEvent);
  }
}, 3000);

const STORES = [
  '강남본점', '여의도역점', '판교역점', '홍대입구역점', 
  '신촌역점', '안암역점', '부산서면점', '광주상무점', '대전둔산점'
];

const SERVICES = ['POS 연동 서버', 'ERP 게이트웨이', '배달 플랫폼 API', '모바일 앱 주문 API'];

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
