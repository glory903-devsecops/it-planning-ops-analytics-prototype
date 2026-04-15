import { 
  SalesTransaction, 
  InventorySnapshot, 
  NetworkEvent, 
  TransactionStatus 
} from '../../domain/types';

// --- Constants & Config ---

export const REGIONS = ['Seoul-Metro', 'Seoul-East', 'Seoul-West', 'Gyeonggi-South', 'Busan', 'Daegu', 'Gwangju', 'Daejeon'];
export const STORE_TYPES = ['Office', 'University', 'Residential', 'Mall'];

const EDIYA_MENU = [
  { id: 'MENU-001', name: '아메리카노', category: '에스프레소 커피', price: 3200 },
  { id: 'MENU-002', name: '카페라떼', category: '에스프레소 커피', price: 4200 },
  { id: 'MENU-003', name: '바닐라 라떼', category: '에스프레소 커피', price: 4500 },
  { id: 'MENU-004', name: '카라멜 마끼아또', category: '에스프레소 커피', price: 4500 },
  { id: 'MENU-005', name: '카페모카', category: '에스프레소 커피', price: 4500 },
  { id: 'MENU-006', name: '화이트 초콜릿 모카', category: '에스프레소 커피', price: 4500 },
  { id: 'MENU-007', name: '카푸치노', category: '에스프레소 커피', price: 4200 },
  { id: 'MENU-008', name: '민트 초콜릿 모카', category: '에스프레소 커피', price: 4800 },
  { id: 'MENU-009', name: '콜드브루 아메리카노', category: '콜드브루', price: 3900 },
  { id: 'MENU-010', name: '콜드브루 라떼', category: '콜드브루', price: 4900 },
  { id: 'MENU-011', name: '니트로 커피', category: '콜드브루', price: 4200 },
  { id: 'MENU-012', name: '초당옥수수 1인빙수', category: '시즌메뉴', price: 6300 },
  { id: 'MENU-013', name: '자몽 하이볼 에이드', category: '에이드', price: 4800 },
  { id: 'MENU-014', name: '청포도 에이드', category: '에이드', price: 4200 },
  { id: 'MENU-015', name: '레몬 에이드', category: '에이드', price: 4200 },
  { id: 'MENU-016', name: '수박주스', category: '시즌메뉴', price: 4900 },
  { id: 'MENU-017', name: '망고 플랫치노', category: '플랫치노', price: 3900 },
  { id: 'MENU-018', name: '커피 플랫치노', category: '플랫치노', price: 3900 },
  { id: 'MENU-019', name: '녹차 플랫치노', category: '플랫치노', price: 4200 },
  { id: 'MENU-020', name: '초콜릿 칩 플랫치노', category: '플랫치노', price: 4500 },
  { id: 'MENU-021', name: '토피넛 라떼', category: '베버리지', price: 4200 },
  { id: 'MENU-022', name: '고구마 라떼', category: '베버리지', price: 4200 },
  { id: 'MENU-023', name: '초콜릿', category: '베버리지', price: 3900 },
  { id: 'MENU-024', name: '녹차 라떼', category: '베버리지', price: 3900 },
  { id: 'MENU-025', name: '이곡 라떼', category: '베버리지', price: 3700 },
  { id: 'MENU-026', name: '살얼음 식혜', category: '시즌메뉴', price: 3900 },
  { id: 'MENU-027', name: '밀크티', category: '티', price: 4200 },
  { id: 'MENU-028', name: '자몽차', category: '티', price: 3900 },
  { id: 'MENU-029', name: '유자차', category: '티', price: 3900 },
  { id: 'MENU-030', name: '허니 카라멜 브레드', category: '베이커리', price: 4800 },
];

const STORES = Array.from({ length: 60 }, (_, i) => ({
  id: `STORE-${(i + 1).toString().padStart(3, '0')}`,
  name: `이디야커피 ${['강남', '역삼', '선릉', '삼성', '서초', '교대', '신촌', '홍대', '안암', '서울대', '판교', '정자', '수내', '서현'][i % 14]}${Math.floor(i / 14) + 1}호점`,
  region: REGIONS[i % REGIONS.length],
  city: 'Seoul',
  type: STORE_TYPES[i % STORE_TYPES.length],
  weight: 0.5 + Math.random() * 1.5,
}));

// --- Generators ---

export class SimulationEngine {
  private static instance: SimulationEngine;
  private salesHistory: SalesTransaction[] = [];
  private inventorySnapshots: InventorySnapshot[] = [];
  private networkEvents: NetworkEvent[] = [];

  private constructor() {
    this.generateInitialData();
  }

  public static getInstance(): SimulationEngine {
    if (!SimulationEngine.instance) {
      SimulationEngine.instance = new SimulationEngine();
    }
    return SimulationEngine.instance;
  }

  private generateInitialData() {
    const start = performance.now();
    console.log("🚀 Initializing Simulation Engine V2 (Enterprise Scale)...");
    
    this.generateSales(25000);
    this.generateInventory();
    this.generateNetwork(5000);

    const end = performance.now();
    const totalCount = this.salesHistory.length + this.inventorySnapshots.length + this.networkEvents.length;
    console.log(`✅ Simulation Data Generated: ${totalCount.toLocaleString()} records`);
    console.log(`⏱️ Cold Initialization Time: ${(end - start).toFixed(2)}ms`);
  }

  private generateSales(count: number) {
    const now = new Date();
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(now.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000)); // Last 30 days
      const store = STORES[Math.floor(Math.random() * STORES.length)];
      const menu = EDIYA_MENU[Math.floor(Math.random() * EDIYA_MENU.length)];
      
      // Hourly multiplier
      const hour = timestamp.getHours();
      let hourMultiplier = 1.0;
      if (store.type === 'Office') {
        if (hour === 8 || hour === 12) hourMultiplier = 3.0;
        else if (hour > 18) hourMultiplier = 0.3;
      } else if (store.type === 'University') {
        if (hour >= 13 && hour <= 17) hourMultiplier = 2.5;
      }

      const qty = Math.random() > 0.8 ? 2 : 1;
      const grossSales = menu.price * qty;
      const discount = Math.random() > 0.9 ? grossSales * 0.1 : 0;
      const netSales = grossSales - discount;

      const trx: SalesTransaction = {
        transaction_id: `TRX-${timestamp.getTime()}-${Math.floor(Math.random() * 1000)}`,
        datetime: timestamp.toISOString(),
        year: timestamp.getFullYear(),
        month: timestamp.getMonth() + 1,
        day: timestamp.getDate(),
        hour: timestamp.getHours(),
        minute: timestamp.getMinutes(),
        second: timestamp.getSeconds(),
        store_id: store.id,
        store_name: store.name,
        region: store.region,
        city: store.city,
        item_id: menu.id,
        item_name: menu.name,
        item_category: menu.category,
        quantity: qty,
        unit_price: menu.price,
        gross_sales: grossSales,
        discount_amount: discount,
        net_sales: netSales,
        channel: ['Point of Sale', 'Kiosk', 'Mobile App', 'Delivery App'][Math.floor(Math.random() * 4)],
        order_type: ['매장', '배달', '픽업'][Math.floor(Math.random() * 3)] as any,
        status: Math.random() > 0.98 ? '실패(Timeout)' : '완료',
        sales_zscore: (Math.random() * 4) - 2,
        trend_delta_percent: (Math.random() * 20) - 10,
      };
      this.salesHistory.push(trx);
    }
    this.salesHistory.sort((a, b) => b.datetime.localeCompare(a.datetime));
  }

  private generateInventory() {
    STORES.forEach(store => {
      EDIYA_MENU.slice(0, 5).forEach(menu => { // Only first 5 items for simplified logistics demo
        const timestamp = new Date();
        const available = 50 + Math.floor(Math.random() * 200);
        const safety = 60;
        const risk = available < safety ? 80 + Math.random() * 20 : Math.random() * 30;

        this.inventorySnapshots.push({
          inventory_id: `INV-${store.id}-${menu.id}`,
          year: timestamp.getFullYear(),
          month: timestamp.getMonth() + 1,
          day: timestamp.getDate(),
          hour: timestamp.getHours(),
          minute: timestamp.getMinutes(),
          store_id: store.id,
          store_name: store.name,
          item_id: menu.id,
          item_name: menu.name,
          current_stock: available + 20,
          reserved_stock: 20,
          available_stock: available,
          safety_stock: safety,
          days_of_cover: Math.floor(available / 15),
          stockout_risk_score: risk,
          recommended_order_quantity: available < safety ? 100 : 0,
          recommended_order_priority: available < safety ? 'Critical' : 'Low',
        });
      });
    });
  }

  private generateNetwork(count: number) {
    const endpoints = ['/api/auth', '/api/order', '/api/payment', '/api/inventory', '/api/logistics'];
    const now = new Date();
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(now.getTime() - (Math.random() * 24 * 60 * 60 * 1000));
      const latency = Math.random() > 0.95 ? 1000 + Math.random() * 2000 : 50 + Math.random() * 300;
      
      this.networkEvents.push({
        event_id: `NET-${timestamp.getTime()}-${i}`,
        year: timestamp.getFullYear(),
        month: timestamp.getMonth() + 1,
        day: timestamp.getDate(),
        hour: timestamp.getHours(),
        minute: timestamp.getMinutes(),
        endpoint_name: ['Gateway', 'OrderService', 'AuthServer', 'DataCloud'][Math.floor(Math.random() * 4)],
        api_route: endpoints[Math.floor(Math.random() * endpoints.length)],
        latency_ms: latency,
        status_code: latency > 2000 ? 504 : (Math.random() > 0.98 ? 500 : 200),
        affected_transactions: latency > 500 ? Math.floor(Math.random() * 50) : 0,
        impact_score: latency > 1000 ? 70 + Math.random() * 30 : Math.random() * 20,
        latency_zscore: (latency - 200) / 100,
        anomaly_flag: latency > 1500,
      });
    }
  }

  // --- Public APIs ---

  public getSales(filters?: any): SalesTransaction[] {
    let filtered = [...this.salesHistory];
    if (filters?.store) filtered = filtered.filter(t => t.store_name === filters.store);
    if (filters?.region) filtered = filtered.filter(t => t.region === filters.region);
    return filtered;
  }

  public getLogistics(): InventorySnapshot[] {
    return [...this.inventorySnapshots];
  }

  public getNetwork(): NetworkEvent[] {
    return [...this.networkEvents];
  }

  public getAvailableStores() {
    return STORES.map(s => s.name);
  }

  public getAvailableRegions() {
    return REGIONS;
  }
}

export const simulationEngine = SimulationEngine.getInstance();
