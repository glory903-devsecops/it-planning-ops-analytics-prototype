import { io, Socket } from 'socket.io-client';

export class NetworkService {
  public socket: Socket | null = null;
  private latestData: any = null;

  async getInitialData() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const apiUrl = backendUrl.startsWith('http') ? backendUrl : `http://localhost:4000`;
    
    try {
      const res = await fetch(`${apiUrl}/api/network/init`);
      if (!res.ok) throw new Error();
      this.latestData = await res.json();
      return this.latestData;
    } catch (e) {
      console.warn("Network backend not reachable, using Static Showcase Data");
      this.latestData = {
        metrics: {
          systemHealth: '건강(정상)',
          avgLatencyMs: 142,
          errorRatePct: '0.02%',
          totalApis: 12
        },
        timeSeriesData: Array.from({ length: 12 }, (_, i) => ({
          time: `${(i + 8).toString().padStart(2, '0')}:00`,
          'POS 연동 서버': 80 + Math.random() * 40,
          '배달 플랫폼 API': 150 + Math.random() * 100
        })),
        availableServices: ['POS 연동 서버', 'ERP 게이트웨이', '배달 플랫폼 API', '모바일 앱 주문 API']
      };
      return this.latestData;
    }
  }

  connectSocket(onUpdate: (data: any) => void, onIncident: (incident: any) => void) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    this.socket = io(backendUrl);

    this.socket.on('network_update', (data) => {
      this.latestData = data;
      onUpdate(data);
    });

    this.socket.on('network_incident', (incident) => {
      onIncident(incident);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const networkService = new NetworkService();
