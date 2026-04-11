const fs = require('fs');
const path = require('path');

const NUM_RECORDS = 3200; 

const STORES = [
  '강남본점', '여의도역점', '판교역점', '홍대입구역점', '신촌역점', '안암역점', '부산서면점', '광주상무점', '대전둔산점'
];

const ITEMS = [
  { name: '원두 (Ediya Blend)', hq_cost: 15000, supply_price: 18500 },
  { name: '우유 (1L)', hq_cost: 2100, supply_price: 2650 },
  { name: '바닐라 시럽', hq_cost: 8500, supply_price: 11000 },
  { name: '종이컵 (Hot 13oz)', hq_cost: 45, supply_price: 65 },
  { name: '플라스틱 리드', hq_cost: 12, supply_price: 20 },
  { name: '초당옥수수 베이스', hq_cost: 12000, supply_price: 16000 }
];

const data = [];

for (let i = 0; i < NUM_RECORDS; i++) {
    const store = STORES[Math.floor(Math.random() * STORES.length)];
    const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const qty = Math.floor(Math.random() * 50) + 10;
    
    const totalPrice = item.supply_price * qty;
    const purchaseCost = item.hq_cost * qty;
    const margin = totalPrice - purchaseCost;

    // Last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 14) + 8, Math.floor(Math.random() * 60));
    
    data.push({
        order_id: `SCM-${date.getTime().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
        timestamp: date.toISOString().replace('T', ' ').substring(0, 16),
        store_name: store,
        item_name: item.name,
        qty: qty,
        total_price: totalPrice,
        purchase_cost: purchaseCost,
        distribution_margin: margin,
        status: '배송 완료'
    });
}

data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

const tsContent = `export interface LogisticsOrder {
  order_id: string;
  timestamp: string;
  store_name: string;
  item_name: string;
  qty: number;
  total_price: number;
  purchase_cost: number;
  distribution_margin: number;
  status: string;
}

export const mockLogisticsOrders: LogisticsOrder[] = ${JSON.stringify(data, null, 2)};
`;

const outputPath = path.join(__dirname, 'frontend/src/data/mock/logisticsOrders.ts');
fs.writeFileSync(outputPath, tsContent);
console.log('Successfully generated ' + data.length + ' Logistics SCM records');
