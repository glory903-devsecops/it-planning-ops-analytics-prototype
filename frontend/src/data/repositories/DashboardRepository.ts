import { SalesEvent, mockSalesEvents } from '../mock/salesEvents';

export interface SalesMetrics {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  bestSeller: string;
}

export interface DashboardRepository {
  getSalesData(): Promise<SalesEvent[]>;
  getMetrics(): Promise<SalesMetrics>;
}

export class MockDashboardRepository implements DashboardRepository {
  async getSalesData(): Promise<SalesEvent[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSalesEvents.filter(e => e.status === '완료');
  }

  async getMetrics(): Promise<SalesMetrics> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let totalSales = 0;
    let completedOrders = 0;
    const itemCounts: Record<string, number> = {};

    mockSalesEvents.forEach(event => {
      if (event.status === '완료') {
        totalSales += event.total_price;
        completedOrders++;
        itemCounts[event.menu_name] = (itemCounts[event.menu_name] || 0) + 1;
      }
    });

    const averageOrderValue = completedOrders > 0 ? Math.round(totalSales / completedOrders) : 0;
    
    let bestSeller = '';
    let maxCount = 0;
    for (const [item, count] of Object.entries(itemCounts)) {
      if (count > maxCount) {
        maxCount = count;
        bestSeller = item;
      }
    }

    return {
      totalSales,
      totalOrders: completedOrders,
      averageOrderValue,
      bestSeller
    };
  }
}

export const dashboardRepository = new MockDashboardRepository();
