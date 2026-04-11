import { salesEvents } from '../data/mock/salesEvents';

export class DashboardService {
  public socket: Socket | null = null;
  private listeners: ((data: any) => void)[] = [];
  private latestData: any = null;

  async getInitialData() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const apiUrl = backendUrl.startsWith('http') ? backendUrl : `http://localhost:4000`;
    
    try {
      const res = await fetch(`${apiUrl}/api/dashboard/init`);
      if (!res.ok) throw new Error();
      this.latestData = await res.json();
      return this.latestData;
    } catch (e) {
      console.warn("Backend not reachable, using Static Showcase Data (37,000+ records)");
      // High-fidelity fallback for demo site
      this.latestData = {
        metrics: {
          totalSales: salesEvents.reduce((acc, curr) => acc + (curr.status === '완료' ? curr.total_price : 0), 0),
          totalOrders: salesEvents.filter(s => s.status === '완료').length,
          averageOrderValue: Math.floor(salesEvents.reduce((acc, curr) => acc + (curr.status === '완료' ? curr.total_price : 0), 0) / salesEvents.filter(s => s.status === '완료').length),
          bestSeller: 'NEW 아메리카노'
        },
        timeSeriesData: Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          총매출액: 5000000 + Math.random() * 8000000,
          'NEW 아메리카노': 2000000 + Math.random() * 3000000
        })),
        availableItems: Array.from(new Set(salesEvents.map(s => s.menu_name))),
        availableStores: Array.from(new Set(salesEvents.map(s => s.store_name))),
        availableChannels: Array.from(new Set(salesEvents.map(s => s.channel))),
        recentSales: salesEvents
      };
      return this.latestData;
    }
  }

  connectSocket(onUpdate: (data: any) => void) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    this.socket = io(backendUrl);

    this.socket.on('new_sales_event', (event) => {
      if (this.latestData) {
        if (event.status === '완료') {
          this.latestData.recentSales.unshift(event);
          if (this.latestData.recentSales.length > 10) this.latestData.recentSales.pop();
        }
        const newData = { ...this.latestData, recentSales: [...this.latestData.recentSales] };
        onUpdate(newData);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const dashboardService = new DashboardService();
