import { SalesEvent } from '../data/mock/salesEvents';
import { dashboardRepository, SalesMetrics } from '../data/repositories/DashboardRepository';

export class DashboardService {
  async getDashboardData() {
    const [events, metrics] = await Promise.all([
      dashboardRepository.getSalesData(),
      dashboardRepository.getMetrics()
    ]);

    // Group sales data by hour for the Time-Series (Stock-like) Chart
    const timeSeriesMap: Record<string, any> = {};
    for (let i = 0; i < 24; i++) {
      const h = i.toString().padStart(2, '0');
      timeSeriesMap[`${h}:00`] = { time: `${h}:00`, 총매출액: 0 };
    }

    events.reduce((acc, event) => {
      // Extract hour format, eg "2024-04-10 14:00" -> "14:00"
      const timeMatch = event.timestamp.match(/ (\d{2}):/);
      if (!timeMatch) return acc;
      
      const hour = `${timeMatch[1]}:00`;
      
      if (event.status === '완료') {
        acc[hour]['총매출액'] += event.total_price;
        
        // Track specific top items
        if (!acc[hour][event.menu_name]) acc[hour][event.menu_name] = 0;
        acc[hour][event.menu_name] += event.total_price;

        // Track specific stores
        if (!acc[hour][event.store_name]) acc[hour][event.store_name] = 0;
        acc[hour][event.store_name] += event.total_price;

        // Track specific channels
        if (!acc[hour][event.channel]) acc[hour][event.channel] = 0;
        acc[hour][event.channel] += event.total_price;
      }
      
      return acc;
    }, timeSeriesMap);

    const timeSeriesData = Object.values(timeSeriesMap).sort((a: any, b: any) => a.time.localeCompare(b.time));

    // Get unique list of items, stores, and channels for the UI dropdowns
    const availableItems = Array.from(new Set(events.map(e => e.menu_name))).sort();
    const availableStores = Array.from(new Set(events.map(e => e.store_name))).sort();
    const availableChannels = Array.from(new Set(events.map(e => e.channel))).sort();

    // Channel Distribution
    const channelStats = events.reduce((acc, event) => {
      if (event.status === '완료') {
        acc[event.channel] = (acc[event.channel] || 0) + event.total_price;
      }
      return acc;
    }, {} as Record<string, number>);

    const channelDistribution = Object.keys(channelStats).map(channel => ({
      name: channel,
      value: channelStats[channel]
    }));

    // Top 5 Sales Items
    const itemStats = events.reduce((acc, event) => {
      if (event.status === '완료') {
        acc[event.menu_name] = (acc[event.menu_name] || 0) + event.total_price;
      }
      return acc;
    }, {} as Record<string, number>);

    const topItems = Object.keys(itemStats)
      .map(item => ({ name: item, sales: itemStats[item] }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Recent 10 Completed Sales (결제 내역)
    const recentSales = events
      .filter(e => e.status === '완료')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return {
      events,
      metrics,
      timeSeriesData,
      availableItems,
      availableStores,
      availableChannels,
      channelDistribution,
      topItems,
      recentSales
    };
  }
}

export const dashboardService = new DashboardService();
