import { 
  SalesTransaction, 
  InventorySnapshot, 
  NetworkEvent, 
  TransactionStatus,
  OrderType,
  MembershipActivity,
  BranchCompliance,
  StrategicInsight
} from '../domain/types';

const STORE_CONFIGS = [
  { id: 'STORE-001', name: '강남본점', region: 'Seoul-Metro', city: 'Seoul', type: 'Office', weight: 1.8 },
  { id: 'STORE-002', name: '여의도역점', region: 'Seoul-Metro', city: 'Seoul', type: 'Office', weight: 1.6 },
  { id: 'STORE-003', name: '판교역점', region: 'Gyeonggi-South', city: 'Seongnam', type: 'Office', weight: 1.5 },
  { id: 'STORE-004', name: '홍대입구역점', region: 'Seoul-West', city: 'Seoul', type: 'University', weight: 1.4 },
  { id: 'STORE-005', name: '신촌역점', region: 'Seoul-West', city: 'Seoul', type: 'University', weight: 1.3 },
  { id: 'STORE-006', name: '안암역점', region: 'Seoul-East', city: 'Seoul', type: 'University', weight: 1.2 },
  { id: 'STORE-007', name: '부산서면점', region: 'Busan', city: 'Busan', type: 'Residential', weight: 1.0 },
  { id: 'STORE-008', name: '광주상무점', region: 'Gwangju', city: 'Gwangju', type: 'Residential', weight: 0.9 },
  { id: 'STORE-009', name: '대전둔산점', region: 'Daejeon', city: 'Daejeon', type: 'Residential', weight: 0.9 }
];

// Add more mock stores for scale
const ALL_STORES = [...STORE_CONFIGS];
for(let i=10; i<=60; i++) {
  ALL_STORES.push({
    id: `STORE-${i.toString().padStart(3, '0')}`,
    name: `이디야커피 지점-${i}`,
    region: ['Seoul-East', 'Seoul-West', 'Busan', 'Daegu'][i % 4],
    city: 'Mixed',
    type: 'Residential',
    weight: 0.7 + Math.random()
  });
}

const MENU_CONFIGS = [
  // 에스프레소 커피
  { id: 'MENU-001', name: '아메리카노', category: '에스프레소 커피', price: 3200, weight: 5.0 },
  { id: 'MENU-002', name: '카페라떼', category: '에스프레소 커피', price: 4200, weight: 2.5 },
  { id: 'MENU-003', name: '카라멜 마키아또', category: '에스프레소 커피', price: 4500, weight: 1.2 },
  { id: 'MENU-004', name: '바닐라 라떼', category: '에스프레소 커피', price: 4300, weight: 1.8 },
  { id: 'MENU-005', name: '연유 카페라떼', category: '에스프레소 커피', price: 4500, weight: 1.0 },
  
  // 베버리지 (Non-Coffee)
  { id: 'MENU-021', name: '토피넛 라떼', category: '베버리지', price: 4200, weight: 2.2 },
  { id: 'MENU-022', name: '초콜릿 칩 라떼', category: '베버리지', price: 3900, weight: 1.1 },
  { id: 'MENU-023', name: '녹차 라떼', category: '베버리지', price: 3900, weight: 0.8 },
  { id: 'MENU-024', name: '복숭아 아이스티', category: '베버리지', price: 3000, weight: 3.5 },
  
  // 플랫치노
  { id: 'MENU-041', name: '꿀복숭아 플랫치노', category: '플랫치노', price: 3900, weight: 1.4 },
  { id: 'MENU-042', name: '민트 초콜릿 칩 플랫치노', category: '플랫치노', price: 4500, weight: 0.9 },
  { id: 'MENU-043', name: '망고 플랫치노', category: '플랫치노', price: 3900, weight: 1.0 },
  
  // 블렌딩티
  { id: 'MENU-061', name: '자몽차', category: '블렌딩티', price: 3800, weight: 0.7 },
  { id: 'MENU-062', name: '유자차', category: '블렌딩티', price: 3800, weight: 0.6 },
  { id: 'MENU-063', name: '캐모마일 레드티', category: '블렌딩티', price: 3500, weight: 0.5 },
  
  // 시즌메뉴 및 빙수
  { id: 'MENU-012', name: '초당옥수수 1인빙수', category: '시즌메뉴', price: 6300, weight: 1.5 },
  { id: 'MENU-081', name: '망고샤베트 1인빙수', category: '시즌메뉴', price: 6300, weight: 1.2 },
  { id: 'MENU-082', name: '팥인절미 1인빙수', category: '시즌메뉴', price: 5900, weight: 1.0 },
  
  // 푸드/베이커리
  { id: 'MENU-101', name: '허니 카라멜 브레드', category: '푸드', price: 5200, weight: 0.8 },
  { id: 'MENU-102', name: '프레즐', category: '푸드', price: 2500, weight: 0.6 },
  { id: 'MENU-103', name: '스틱케익 (플레인)', category: '푸드', price: 2000, weight: 0.5 }
];

export class SimulationService {
  private static instance: SimulationService;
  private salesHistory: SalesTransaction[] = [];
  private inventorySnapshots: InventorySnapshot[] = [];
  private networkEvents: NetworkEvent[] = [];
  private membershipActivity: MembershipActivity[] = [];
  private complianceRecords: BranchCompliance[] = [];

  private constructor() {}

  public static getInstance(): SimulationService {
    if (!SimulationService.instance) {
      SimulationService.instance = new SimulationService();
    }
    return SimulationService.instance;
  }

  private weightedRandom(items: any[]) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (const item of items) {
      if (random < item.weight) return item;
      random -= item.weight;
    }
    return items[items.length - 1];
  }

  public initialize(salesCount: number, memberCount: number) {
    console.log(`🚀 Scaling Simulation to ${ (salesCount + memberCount + 6000).toLocaleString() } Strategic Records...`);
    this.generateSalesData(salesCount);
    this.generateMembershipActivity(memberCount);
    this.generateInventorySnapshots();
    this.generateNetworkEvents(5000);
    this.generateComplianceData();
  }

  public generateSalesData(count: number): SalesTransaction[] {
    const data: SalesTransaction[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const store = this.weightedRandom(ALL_STORES);
      const menu = this.weightedRandom(MENU_CONFIGS);
      const timestamp = new Date(now.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000));
      
      data.push({
        transaction_id: `TRX-${timestamp.getTime()}-${i}`,
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
        quantity: 1,
        unit_price: menu.price,
        gross_sales: menu.price,
        discount_amount: 0,
        net_sales: menu.price,
        channel: 'POS',
        order_type: '매장',
        status: '완료',
        sales_zscore: Math.random() * 2,
        trend_delta_percent: 5
      });
    }
    this.salesHistory = data;
    return data;
  }

  private generateMembershipActivity(count: number) {
    const events: ('Open' | 'Search' | 'OrderStart' | 'Payment_Completed')[] = ['Open', 'Search', 'OrderStart', 'Payment_Completed'];
    const now = new Date();
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(now.getTime() - (Math.random() * 7 * 24 * 60 * 60 * 1000));
      this.membershipActivity.push({
        id: `MEM-${i}`,
        datetime: timestamp.toISOString(),
        hour: timestamp.getHours(),
        user_tier: Math.random() > 0.8 ? 'VIP' : (Math.random() > 0.5 ? 'Gold' : 'Silver'),
        app_event: events[Math.floor(Math.random() * events.length)],
        location_region: ['Seoul-Metro', 'Seoul-East', 'Seoul-West', 'Busan'][Math.floor(Math.random() * 4)],
        store_id: ALL_STORES[Math.floor(Math.random() * ALL_STORES.length)].id
      });
    }
  }

  private generateInventorySnapshots() {
    ALL_STORES.forEach(store => {
      MENU_CONFIGS.forEach(menu => {
        const current = 50 + Math.random() * 450;
        const safety = 100;
        const reserved = Math.floor(current * 0.1);
        const now = new Date();
        this.inventorySnapshots.push({
          inventory_id: `INV-${store.id}-${menu.id}`,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate(),
          hour: now.getHours(),
          minute: now.getMinutes(),
          store_id: store.id,
          store_name: store.name,
          item_id: menu.id,
          item_name: menu.name,
          current_stock: Math.floor(current),
          reserved_stock: reserved,
          available_stock: Math.max(0, Math.floor(current * 0.9) - reserved),
          safety_stock: safety,
          days_of_cover: Math.max(1, Math.floor(current / 15)),
          stockout_risk_score: current < safety ? 80 + Math.random() * 20 : Math.random() * 30,
          recommended_order_quantity: current < safety ? Math.floor((safety - current) * 1.5) : 0,
          recommended_order_priority: current < safety ? 'Critical' : 'Medium'
        });
      });
    });
  }

  private generateNetworkEvents(count: number) {
    const now = new Date();
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(now.getTime() - (Math.random() * 24 * 60 * 60 * 1000));
      const latency = 20 + Math.random() * 500;
      this.networkEvents.push({
        event_id: `NET-${i}`,
        year: timestamp.getFullYear(),
        month: timestamp.getMonth() + 1,
        day: timestamp.getDate(),
        hour: timestamp.getHours(),
        minute: timestamp.getMinutes(),
        endpoint_name: 'API-Gateway-Core',
        api_route: ['/api/v1/sales', '/api/v1/membership', '/api/v2/strategic'][Math.floor(Math.random() * 3)],
        latency_ms: latency,
        status_code: Math.random() > 0.98 ? 503 : 200,
        affected_transactions: Math.floor(Math.random() * 10),
        impact_score: latency > 300 ? 70 : 10,
        latency_zscore: (latency - 50) / 100,
        anomaly_flag: latency > 400
      });
    }
  }

  private generateComplianceData() {
    ALL_STORES.forEach(store => {
      const hygiene = 70 + Math.random() * 30;
      const service = 65 + Math.random() * 35;
      const equipment = 80 + Math.random() * 20;
      const avg = (hygiene + service + equipment) / 3;

      this.complianceRecords.push({
        id: `AUDIT-${store.id}`,
        store_id: store.id,
        audit_date: new Date().toISOString(),
        hygiene_score: hygiene,
        service_quality_score: service,
        equipment_health: equipment,
        compliance_rank: avg > 90 ? 'A' : (avg > 80 ? 'B' : (avg > 70 ? 'C' : 'D'))
      });
    });
  }

  public getSales() { return this.salesHistory; }
  public getInventory() { return this.inventorySnapshots; }
  public getNetwork() { return this.networkEvents; }
  public getMembership() { return this.membershipActivity; }
  public getCompliance() { return this.complianceRecords; }
}

export const simulationService = SimulationService.getInstance();
