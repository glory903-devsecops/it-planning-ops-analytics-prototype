// Initialize logistics inventory for stores
// Every store has 'Coffee Beans(kg)', 'Milk(L)', 'Syrup(bottle)', 'Cups(ea)'

const STORES = [
    '강남본점', '여의도역점', '판교역점', '홍대입구역점', 
    '신촌역점', '안암역점', '부산서면점', '광주상무점', '대전둔산점'
  ];
  
  export interface InventoryItem {
    name: string;
    stock: number;
    maxStock: number;
    unit: string;
    threshold: number; // when to alert (e.g. 0.1 for 10%)
  }
  
  export interface StoreInventory {
    storeName: string;
    items: InventoryItem[];
  }
  
  export class LogisticsManager {
    public inventories: StoreInventory[] = [];
    public history: any[] = [];
    public logisticsOrders: any[] = [];
  
    constructor() {
      this.initInventories();
      this.initHistory();
      this.generateHistoricalOrders(3000);
    }
  
    private initHistory() {
      const now = Date.now();
      // Generate some mock history for the initial chart
      for (let i = 24; i >= 0; i--) {
        const time = new Date(now - i * 3600000);
        const snapshot: any = { time: time.getHours().toString().padStart(2, '0') + ':00' };
        
        // Add some random variation per store/item
        this.inventories.forEach(inv => {
          inv.items.forEach(item => {
            const key = `${inv.storeName} - ${item.name}`;
            snapshot[key] = Math.floor(60 + Math.random() * 40); // 60-100% capacity
          });
        });
        this.history.push(snapshot);
      }
    }

    public takeSnapshot() {
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      const snapshot: any = { time: timeStr };
      
      this.inventories.forEach(inv => {
        inv.items.forEach(item => {
          const key = `${inv.storeName} - ${item.name}`;
          snapshot[key] = Math.round((item.stock / item.maxStock) * 100);
        });
      });

      this.history.push(snapshot);
      if (this.history.length > 50) this.history.shift();
    }
  
    private initInventories() {
      STORES.forEach(store => {
        // Randomize initial stock slightly to make dashboard look dynamic
        const coffeeMax = 200 + Math.floor(Math.random() * 50);
        const milkMax = 300 + Math.floor(Math.random() * 100);
        const cupMax = 2000 + Math.floor(Math.random() * 500);
        const syrupMax = 50 + Math.floor(Math.random() * 20);
  
        // Start them off at 30-100% capacity
        const startCapacity = () => 0.3 + (Math.random() * 0.7);
  
        this.inventories.push({
          storeName: store,
          items: [
            { name: '원두', stock: Math.floor(coffeeMax * startCapacity()), maxStock: coffeeMax, unit: 'kg', threshold: 0.15 },
            { name: '우유', stock: Math.floor(milkMax * startCapacity()), maxStock: milkMax, unit: 'L', threshold: 0.20 },
            { name: '종이컵', stock: Math.floor(cupMax * startCapacity()), maxStock: cupMax, unit: '개', threshold: 0.10 },
            { name: '시럽', stock: Math.floor(syrupMax * startCapacity()), maxStock: syrupMax, unit: '병', threshold: 0.15 },
          ]
        });
      });
    }
  
    // Deduct stock based on a sales event
    public processSalesEvent(event: any): { alerts: { store: string, item: string, currentPct: number }[] } {
      const storeInv = this.inventories.find(i => i.storeName === event.store_name);
      if (!storeInv) return { alerts: [] };
  
      const alerts: any[] = [];
      const qty = event.qty || 1;
  
      // Simple deduction logic based on menu name
      storeInv.items.forEach(item => {
        let deductAmount = 0;
        if (item.name === '원두' && event.menu_name.includes('커피') || event.menu_name.includes('아메리카노') || event.menu_name.includes('라떼')) {
          deductAmount = 0.02 * qty; // 20g per shot
        }
        if (item.name === '우유' && (event.menu_name.includes('라떼') || event.menu_name.includes('플랫치노'))) {
          deductAmount = 0.2 * qty; // 200ml
        }
        if (item.name === '종이컵') {
          deductAmount = 1 * qty; // 1 cup per drink
        }
        if (item.name === '시럽' && event.menu_name.includes('달콤')) {
          deductAmount = 0.05 * qty; 
        }
  
        // If stock is enough, deduct it
        if (deductAmount > 0) {
            item.stock = Math.max(0, item.stock - deductAmount);
        }
  
        // Check threshold
        const pct = item.stock / item.maxStock;
        if (pct > 0 && pct <= item.threshold) {
             // Only alert occasionally or logic handles tracking sent alerts
             alerts.push({ store: storeInv.storeName, item: item.name, currentPct: pct });
        }
      });
  
      return { alerts };
    }
  
    public getLogisticsData() {
      // Calculate total network metrics
      let totalStock = 0;
      let totalMax = 0;
      let criticalStores = 0;
  
      this.inventories.forEach(inv => {
        let hasCritical = false;
        inv.items.forEach(item => {
          totalStock += item.stock;
          totalMax += item.maxStock;
          if (item.stock / item.maxStock <= item.threshold) hasCritical = true;
        });
        if (hasCritical) criticalStores++;
      });
  
      return {
        metrics: {
          totalStores: this.inventories.length,
          criticalStores: criticalStores,
          avgStockLevel: Math.round((totalStock / totalMax) * 100) + '%',
          pendingOrders: criticalStores * 2 // mock
        },
        inventories: this.inventories,
        recentOrders: this.logisticsOrders.slice(0, 15),
        allOrders: this.logisticsOrders
      };
    }

    private generateHistoricalOrders(count: number) {
      const now = Date.now();
      const items = ['원두', '우유', '종이컵', '시럽', '초코파우더', '원액'];
      
      for (let i = 0; i < count; i++) {
        const store = STORES[Math.floor(Math.random() * STORES.length)];
        const item = items[Math.floor(Math.random() * items.length)];
        const qty = Math.floor(Math.random() * 50) + 1;
        
        // HQ Economics Logic
        const unitPriceMap: Record<string, number> = {
          '원두': 15000, 
          '우유': 2500,
          '종이컵': 50,
          '시럽': 8000,
          '초코파우더': 6000,
          '원액': 12000
        };
        const unitPrice = unitPriceMap[item] || 5000;
        const sellingPrice = unitPrice * qty;
        const marginRate = 0.25 + (Math.random() * 0.1); 
        const distributionMargin = Math.round(sellingPrice * marginRate);
        const purchaseCost = sellingPrice - distributionMargin;

        const timeOffset = Math.random() * 30 * 24 * 60 * 60 * 1000; 
        const timestamp = new Date(now - timeOffset);

        this.logisticsOrders.push({
          order_id: `LOG-${Math.floor(Math.random() * 90000) + 10000}`,
          timestamp: timestamp.toISOString().replace('T', ' ').substring(0, 19),
          store_name: store,
          item_name: item,
          qty: qty,
          unit_price: unitPrice,
          total_price: sellingPrice,
          purchase_cost: purchaseCost,
          distribution_margin: distributionMargin,
          status: '배송완료'
        });
      }
      this.logisticsOrders.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    }
  }
  
