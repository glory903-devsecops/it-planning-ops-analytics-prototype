"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSalesData = generateSalesData;
const STORE_CONFIGS = [
    { name: '강남본점', type: 'office', weight: 1.8 },
    { name: '여의도역점', type: 'office', weight: 1.6 },
    { name: '판교역점', type: 'office', weight: 1.5 },
    { name: '홍대입구역점', type: 'university', weight: 1.4 },
    { name: '신촌역점', type: 'university', weight: 1.3 },
    { name: '안암역점', type: 'university', weight: 1.2 },
    { name: '부산서면점', type: 'normal', weight: 1.0 },
    { name: '광주상무점', type: 'normal', weight: 0.9 },
    { name: '대전둔산점', type: 'normal', weight: 0.9 }
];
const MENU_CONFIGS = [
    { name: 'NEW 아메리카노', category: '에스프레소 커피', price: 3200, weight: 5.0, type: 'steady' },
    { name: '카페라떼', category: '에스프레소 커피', price: 4200, weight: 2.5, type: 'steady' },
    { name: '초당옥수수 1인빙수', category: '플랫치노/빙수', price: 6300, weight: 1.5, type: 'season_spike' },
    { name: '토피넛 라떼', category: '베버리지', price: 4200, weight: 1.8, type: 'steady' },
    { name: '딸기 연유 플랫치노', category: '플랫치노', price: 4700, weight: 1.2, type: 'sweet' },
    { name: '허니 카라멜 브레드', category: '베이커리', price: 4600, weight: 1.0, type: 'sweet' },
    { name: '생과일 수박주스', category: '베버리지', price: 4900, weight: 1.3, type: 'season_spike' },
    { name: '콤부차 청포도', category: '블렌딩 티', price: 3500, weight: 0.8, type: 'steady' }
];
const CHANNELS = [
    { name: '배달의민족', weight: 0.4 },
    { name: '매장 POS', weight: 0.35 },
    { name: '키오스크', weight: 0.15 },
    { name: '요기요', weight: 0.1 }
];
function weightedRandom(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (const item of items) {
        if (random < item.weight)
            return item;
        random -= item.weight;
    }
    return items[items.length - 1];
}
function generateSalesData(count) {
    const data = [];
    const now = new Date();
    // We distribute 'count' records throughout the day (last 14 hours)
    for (let i = 0; i < count; i++) {
        const store = weightedRandom(STORE_CONFIGS);
        let menuWeights = MENU_CONFIGS.map(m => (Object.assign({}, m)));
        const menu = weightedRandom(menuWeights);
        let qty = 1;
        if (Math.random() > 0.8)
            qty = 2;
        if (Math.random() > 0.95)
            qty = 3;
        const channel = weightedRandom(CHANNELS).name;
        const isError = Math.random() < 0.05;
        // spread time randomly within the last 14 hours mostly
        const timeOffset = Math.random() * 14 * 60 * 60 * 1000;
        const pastTime = new Date(now.getTime() - timeOffset);
        data.push({
            timestamp: pastTime.toISOString().replace('T', ' ').substring(0, 19),
            store_name: store.name,
            store_category: store.type,
            menu_name: menu.name,
            menu_category: menu.category,
            channel: channel,
            qty: qty,
            total_price: menu.price * qty,
            status: isError ? '실패(Timeout)' : '완료',
            payment_method: Math.random() > 0.3 ? '카드결제' : '간편결제',
            order_id: `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`
        });
    }
    // Sort latest first
    data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    return data;
}
