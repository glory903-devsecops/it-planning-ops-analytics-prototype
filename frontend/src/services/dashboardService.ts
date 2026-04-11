import { io, Socket } from 'socket.io-client';

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
      console.warn("Backend not reachable, using Static Showcase Data");
      // High-fidelity fallback for demo site
      this.latestData = {
        metrics: {
          totalSales: 153370600,
          totalOrders: 1240,
          averageOrderValue: 123680,
          bestSeller: 'NEW 아메리카노'
        },
        timeSeriesData: Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          총매출액: 5000000 + Math.random() * 8000000,
          'NEW 아메리카노': 2000000 + Math.random() * 3000000
        })),
        availableItems: ['NEW 아메리카노', '카페라떼', '토피넛 라떼'],
        availableStores: ['강남본점', '여의도역점', '판교역점'],
        availableChannels: ['배달의민족', '매장 POS', '키오스크'],
        recentSales: Array.from({ length: 10 }, (_, i) => ({
          timestamp: new Date(Date.now() - i * 600000).toISOString().replace('T', ' ').substring(0, 19),
          menu_name: i % 2 === 0 ? 'NEW 아메리카노' : '카페라떼',
          store_name: '강남본점',
          channel: '배달의민족',
          qty: 1,
          total_price: 3200,
          status: '완료'
        }))
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
