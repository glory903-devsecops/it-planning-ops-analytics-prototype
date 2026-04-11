import { io, Socket } from 'socket.io-client';

export class LogisticsService {
  public socket: Socket | null = null;
  private latestData: any = null;

  async getInitialData() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const apiUrl = backendUrl.startsWith('http') ? backendUrl : `http://localhost:4000`;
    
    try {
      const res = await fetch(`${apiUrl}/api/logistics/init`);
      if (!res.ok) throw new Error();
      this.latestData = await res.json();
      return this.latestData;
    } catch (e) {
      console.warn("Logistics backend not reachable, using Static Showcase Data");
      this.latestData = {
        metrics: {
          totalStockLevel: 82,
          activeAlerts: 3,
          pendingOrders: 14,
          avgLeadTime: '2.4h'
        },
        inventory: [
          { item: '원두', stock: 45, status: '충분' },
          { item: '우유', stock: 12, status: '주의' },
          { item: '종이컵', stock: 88, status: '충분' }
        ],
        timeSeriesData: Array.from({ length: 12 }, (_, i) => ({
          time: `${(i + 8).toString().padStart(2, '0')}:00`,
          '강남본점': 70 + Math.random() * 20,
          '여의도역점': 60 + Math.random() * 30
        })),
        availableItems: ['원두', '우유', '종이컵', '시럽'],
        availableStores: ['강남본점', '여의도역점', '판교역점']
      };
      return this.latestData;
    }
  }

  connectSocket(onUpdate: (data: any) => void, onAlert: (alert: any) => void) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    this.socket = io(backendUrl);

    this.socket.on('inventory_update', (data) => {
      this.latestData = data;
      onUpdate(data);
    });

    this.socket.on('inventory_alert', (alert) => {
      onAlert(alert);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const logisticsService = new LogisticsService();
