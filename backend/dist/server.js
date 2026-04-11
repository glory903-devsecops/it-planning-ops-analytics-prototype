"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const generator_1 = require("./generator");
const logisticsManager_1 = require("./logisticsManager");
const networkManager_1 = require("./networkManager");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
let cacheReady = false;
let aggregatedData = {};
let latestEvents = [];
let salesData = [];
const logistics = new logisticsManager_1.LogisticsManager();
const network = new networkManager_1.NetworkManager();
console.log("Generating 30,000 sales records. This may take a moment...");
salesData = (0, generator_1.generateSalesData)(30000);
function aggregateData() {
    const timeSeriesMap = {};
    for (let i = 0; i < 24; i++) {
        const h = i.toString().padStart(2, '0');
        timeSeriesMap[`${h}:00`] = { time: `${h}:00`, 총매출액: 0 };
    }
    const channelStats = {};
    const itemStats = {};
    const availableItems = new Set();
    const availableStores = new Set();
    const availableChannels = new Set();
    salesData.forEach(event => {
        availableItems.add(event.menu_name);
        availableStores.add(event.store_name);
        availableChannels.add(event.channel);
        const timeMatch = event.timestamp.match(/ (\d{2}):/);
        if (!timeMatch)
            return;
        const hour = `${timeMatch[1]}:00`;
        if (event.status === '완료') {
            timeSeriesMap[hour]['총매출액'] += event.total_price;
            if (!timeSeriesMap[hour][event.menu_name])
                timeSeriesMap[hour][event.menu_name] = 0;
            timeSeriesMap[hour][event.menu_name] += event.total_price;
            if (!timeSeriesMap[hour][event.store_name])
                timeSeriesMap[hour][event.store_name] = 0;
            timeSeriesMap[hour][event.store_name] += event.total_price;
            if (!timeSeriesMap[hour][event.channel])
                timeSeriesMap[hour][event.channel] = 0;
            timeSeriesMap[hour][event.channel] += event.total_price;
            channelStats[event.channel] = (channelStats[event.channel] || 0) + event.total_price;
            itemStats[event.menu_name] = (itemStats[event.menu_name] || 0) + event.total_price;
        }
    });
    const timeSeriesData = Object.values(timeSeriesMap).sort((a, b) => a.time.localeCompare(b.time));
    timeSeriesData.forEach((dataPoint) => {
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
    if (!cacheReady)
        return res.status(503).json({ error: "Cache not ready yet" });
    res.json(aggregatedData);
});
app.get('/api/logistics/init', (req, res) => {
    res.json(logistics.getLogisticsData());
});
app.get('/api/network/init', (req, res) => {
    res.json(network.getNetworkData());
});
io.on('connection', (socket) => {
    console.log('Client connected to Live WebSocket:', socket.id);
});
setInterval(() => {
    if (!cacheReady)
        return;
    const newEvent = (0, generator_1.generateSalesData)(1)[0];
    newEvent.timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    // Update UI Dashboard Sales feed
    io.emit('new_sales_event', newEvent);
    // Deduct inventory and check alerts
    const { alerts } = logistics.processSalesEvent(newEvent);
    io.emit('inventory_update', logistics.getLogisticsData());
    alerts.forEach(alert => {
        io.emit('inventory_alert', alert);
    });
    // Track network events
    const netEvent = network.tick();
    io.emit('network_update', network.getNetworkData());
    if (netEvent.status !== '건강(정상)') {
        io.emit('network_incident', netEvent);
    }
}, 3000);
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`);
});
