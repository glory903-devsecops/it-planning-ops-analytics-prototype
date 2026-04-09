const fs = require('fs');
const path = require('path');

const NUM_RECORDS = 800; // Generate 800 simulation records

const STORE_CONFIGS = [
  // Office Districts (오피스 핵심 상권 - High multiplier, morning/lunch peaks)
  { name: '강남본점', type: 'office', weight: 1.8 },
  { name: '여의도역점', type: 'office', weight: 1.6 },
  { name: '판교역점', type: 'office', weight: 1.5 },
  // University Districts (대학가 상권 - Mid/High multiplier, afternoon/evening peaks)
  { name: '홍대입구역점', type: 'university', weight: 1.4 },
  { name: '신촌역점', type: 'university', weight: 1.3 },
  { name: '안암역점', type: 'university', weight: 1.2 },
  // Normal/Local Districts (일반 상권 - Normal multiplier, steady)
  { name: '부산서면점', type: 'normal', weight: 1.0 },
  { name: '광주상무점', type: 'normal', weight: 0.9 },
  { name: '대전둔산점', type: 'normal', weight: 0.9 }
];

const MENU_CONFIGS = [
  { name: 'NEW 아메리카노', category: '에스프레소 커피', price: 3200, weight: 5.0, type: 'steady' },
  { name: '카페라떼', category: '에스프레소 커피', price: 4200, weight: 2.5, type: 'steady' },
  { name: '초당옥수수 1인빙수', category: '플랫치노/빙수', price: 6300, weight: 1.5, type: 'season_spike' }, // Season specific
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

// Helper to choose item from weighted array
function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  for (const item of items) {
    if (random < item.weight) return item;
    random -= item.weight;
  }
  return items[items.length - 1]; // Fallback
}

// Ensure pseudo-timezone calculation (simulate events today, between 08:00 and 22:00)
function getSimulatedTimestamp(hour, minute) {
  const now = new Date();
  now.setHours(hour, minute, Math.floor(Math.random() * 60));
  return now.toISOString().replace('T', ' ').substring(0, 19);
}

const data = [];

// Base Generation loop per hour
for (let h = 8; h <= 22; h++) {
  // Volume calculation for this hour
  let eventVolumeForHour = Math.floor(Math.random() * 30) + 20; 
  
  // Create variations based on hour
  for (let i = 0; i < eventVolumeForHour; i++) {
    // 1. Pick a store
    const store = weightedRandom(STORE_CONFIGS);
    
    // 2. Determine time adjustments based on store type
    let hourProbability = 1.0;
    if (store.type === 'office') {
      if (h === 8 || h === 9 || h === 12 || h === 13) hourProbability = 2.5; // Morning & Lunch peaks
      else if (h >= 18) hourProbability = 0.4; // Drops fast after work
    } else if (store.type === 'university') {
      if (h >= 14 && h <= 19) hourProbability = 2.0; // Afternoon & Evening hits
      if (h <= 10) hourProbability = 0.5; // Slow mornings
    } else {
      // normal
      if (h >= 12 && h <= 14) hourProbability = 1.5;
    }

    // Skip some iterations to simulate lower probability
    if (Math.random() > (hourProbability / 2.5) * store.weight) continue;

    // 3. Pick a menu, adjuting for type and time
    let menuWeights = MENU_CONFIGS.map(m => ({...m}));
    if (store.type === 'university' && (h >= 14 && h <= 18)) {
      // Boosting sweets in afternoon for uni students
      menuWeights.find(m => m.type === 'sweet').weight *= 2.0;
    }
    if (h >= 14 && h <= 16) {
      // Season spikes boost randomly in hot afternoons
      menuWeights.find(m => m.type === 'season_spike').weight *= 1.8;
    }
    const menu = weightedRandom(menuWeights);

    // 4. Quantity usually 1, sometimes 2 or 3
    let qty = 1;
    if (Math.random() > 0.8) qty = 2;
    if (Math.random() > 0.95) qty = 3;

    // 5. Pick channel
    const channel = weightedRandom(CHANNELS).name;

    // 6. Simulate system failure risk
    // Higher traffic (office peaks) -> higher timeout risk
    const isError = Math.random() < 0.05 * hourProbability; // roughly 2~5% failure rate

    data.push({
      timestamp: getSimulatedTimestamp(h, Math.floor(Math.random() * 60)),
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
}

// Sort chronologically reverse for the dashboard
data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

const tsContent = `export interface SalesEvent {
  timestamp: string;
  store_name: string;
  store_category: string;
  menu_name: string;
  menu_category: string;
  channel: string;
  qty: number;
  total_price: number;
  status: string;           // "완료" or "실패(Timeout)"
  payment_method: string;
  order_id: string;
}

// [시뮬레이션 가이드 준수]
// ※ 본 데이터는 이디야 실제 메뉴명과 상권 유형을 차용하였으나, 
// 금액 수치 및 판매량, 장애율은 완전히 랜덤 생성된 가상의 시뮬레이션 데이터입니다.
export const mockSalesEvents: SalesEvent[] = ${JSON.stringify(data, null, 2)};
`;

const outputPath = path.join(__dirname, 'frontend/src/data/mock/salesEvents.ts');
fs.writeFileSync(outputPath, tsContent);
console.log('Successfully generated ' + data.length + ' simulated Sales Insights data points');
