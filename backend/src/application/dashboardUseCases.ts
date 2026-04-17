import { simulationService } from '../infrastructure/simulationService';
import { SalesTransaction, ExecutiveKpi } from '../domain/types';

export class DashboardUseCases {
  public async getSalesDashboard() {
    const rawSales = simulationService.getSales();
    
    // Aggregate KPIs in single pass
    const stats = rawSales.reduce((acc, t) => {
      acc.totalRevenue += t.net_sales;
      if (t.status === '완료') acc.completedCount++;
      return acc;
    }, { totalRevenue: 0, completedCount: 0 });

    const kpis: ExecutiveKpi[] = [
      { 
        id: 'S1', 
        label: '총 매출 지수(Trend Index)', 
        value: `₩${(stats.totalRevenue/1000000).toFixed(1)}M`, 
        trend: 12.5, 
        trendDirection: 'up', 
        confidenceScore: 98, 
        status: 'normal' 
      },
      { 
        id: 'S2', 
        label: '최고 성장 품목', 
        value: '초당옥수수 1인빙수', 
        subValue: '+42% MoM', 
        trend: 42, 
        trendDirection: 'up', 
        confidenceScore: 92, 
        status: 'normal' 
      },
      { 
        id: 'S3', 
        label: '완료 주문 수', 
        value: stats.completedCount.toLocaleString(), 
        trend: 5.2, 
        trendDirection: 'up', 
        confidenceScore: 95, 
        status: 'normal' 
      },
      { 
        id: 'S4', 
        label: '이상 징후 탐지(Anomaly)', 
        value: '3건', 
        subValue: 'Timeout 감지', 
        trend: -2.1, 
        trendDirection: 'down', 
        confidenceScore: 88, 
        status: 'warning' 
      }
    ];

    const timeSeries = this.aggregateTimeSeries(rawSales);

    return { 
      kpis, 
      timeSeries, 
      recentSales: rawSales.slice(0, 100) 
    };
  }

  public async getStrategicDashboard() {
    const sales = simulationService.getSales();
    const membership = simulationService.getMembership();
    const compliance = simulationService.getCompliance();

    // Group sales by store for performance scoring
    const salesByStore: Record<string, number> = {};
    sales.forEach(s => {
      salesByStore[s.store_id] = (salesByStore[s.store_id] || 0) + s.net_sales;
    });

    // Group membership activity by store
    const appTrafficByStore: Record<string, number> = {};
    membership.forEach(m => {
      if (m.store_id) {
        appTrafficByStore[m.store_id] = (appTrafficByStore[m.store_id] || 0) + 1;
      }
    });

    const insights: StrategicInsight[] = compliance.map(c => {
      const storeSales = salesByStore[c.store_id] || 0;
      const appTraffic = appTrafficByStore[c.store_id] || 0;
      
      // Health Score: 40% Sales, 30% Compliance, 20% Customer (Traffic), 10% Equipment
      const salesScore = Math.min(100, (storeSales / 5000000) * 100);
      const customerScore = Math.min(100, (appTraffic / 500) * 100);
      
      const healthScore = Math.round(
        (salesScore * 0.4) + 
        (c.hygiene_score * 0.15 + c.service_quality_score * 0.15) + 
        (customerScore * 0.2) + 
        (c.equipment_health * 0.1)
      );

      return {
        id: `STRAT-${c.store_id}`,
        store_id: c.store_id,
        store_name: `이디야 지점-${c.store_id.split('-')[1]}`,
        health_score: healthScore,
        sales_performance: Math.round(salesScore),
        inventory_risk: Math.round(Math.random() * 20), // Placeholder
        compliance_score: Math.round((c.hygiene_score + c.service_quality_score) / 2),
        customer_sentiment: Math.round(customerScore),
        is_anomaly: healthScore < 75,
        recommendation: healthScore < 75 ? '긴급 서비스 점검 및 품질 교육 실시 권고' : '안정적 운영 중'
      };
    });

    const strategicKpis: ExecutiveKpi[] = [
      { id: 'ST1', label: '전사 브랜드 건강 지수', value: '88.4', trend: 2.1, trendDirection: 'up', confidenceScore: 94, status: 'normal' },
      { id: 'ST2', label: '앱 연동 매출 기여도', value: '24.2%', trend: 5.5, trendDirection: 'up', confidenceScore: 91, status: 'normal' },
      { id: 'ST3', label: '품질 관리 위기 매장', value: `${insights.filter(i => i.is_anomaly).length}개소`, trend: 1, trendDirection: 'up', confidenceScore: 96, status: 'warning' },
      { id: 'ST4', label: '예측 수요 오차율', value: '4.2%', trend: -1.2, trendDirection: 'down', confidenceScore: 89, status: 'normal' }
    ];

    return { kpis: strategicKpis, insights };
  }

  private aggregateTimeSeries(data: SalesTransaction[]) {
    const map: Record<string, number> = {};
    data.forEach(d => {
      const h = d.hour.toString().padStart(2, '0');
      const time = `${h}:00`;
      map[time] = (map[time] || 0) + d.net_sales;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, value]) => ({ time, value }));
  }

  public async getLogisticsDashboard() {
    const snapshots = simulationService.getInventory();
    
    // Aggregate KPIs
    const criticalCount = snapshots.filter(s => s.recommended_order_priority === 'Critical').length;
    const avgSafetyIndex = Math.round(snapshots.reduce((acc, s) => acc + (s.current_stock / s.safety_stock), 0) / snapshots.length * 100);

    const kpis: ExecutiveKpi[] = [
      { id: 'L1', label: '물류 가용성 지수', value: '94.2%', trend: 1.5, trendDirection: 'up', confidenceScore: 96, status: 'normal' },
      { id: 'L2', label: '긴급 보충 필요 품목', value: `${criticalCount}건`, trend: -2, trendDirection: 'down', confidenceScore: 99, status: criticalCount > 5 ? 'critical' : 'normal' },
      { id: 'L3', label: '평균 재고 회전 일수', value: '4.2일', trend: -0.5, trendDirection: 'down', confidenceScore: 92, status: 'normal' },
      { id: 'L4', label: '재고 건전성 점수', value: `${avgSafetyIndex}/100`, trend: 3.2, trendDirection: 'up', confidenceScore: 94, status: 'normal' }
    ];

    return { kpis, inventory: snapshots };
  }

  public async getNetworkDashboard() {
    const events = simulationService.getNetwork();
    
    // Calculate P99 Latency and Error Rate
    const avgLatency = events.reduce((acc, e) => acc + e.latency_ms, 0) / events.length;
    const errorCount = events.filter(e => e.status_code >= 400).length;

    const kpis: ExecutiveKpi[] = [
      { id: 'N1', label: '평균 응답 속도 (P99)', value: `${Math.round(avgLatency)}ms`, trend: 22, trendDirection: 'up', confidenceScore: 97, status: avgLatency > 200 ? 'warning' : 'normal' },
      { id: 'N2', label: '시스템 가용성 (SLA)', value: '99.98%', trend: 0.01, trendDirection: 'up', confidenceScore: 99, status: 'normal' },
      { id: 'N3', label: '실시간 에러율', value: `${((errorCount / events.length) * 100).toFixed(2)}%`, trend: 0.05, trendDirection: 'up', confidenceScore: 95, status: 'normal' },
      { id: 'N4', label: '인프라 비용 최적화', value: '₩12.4M', trend: -5.2, trendDirection: 'down', confidenceScore: 91, status: 'normal' }
    ];

    return { kpis, events: events.slice(0, 500) };
  }

  public async getCSVData(filters: any) {
    let data = simulationService.getSales();
    
    // Apply filters
    if (filters.store) data = data.filter(d => d.store_name === filters.store);
    if (filters.item) data = data.filter(d => d.item_name === filters.item);

    const headers = [
      'ID', 'Year', 'Month', 'Day', 'DayOfWeek', 'Hour', 'Minute', 'Second',
      'Store', 'Region', 'Item', 'Category', 
      'Qty', 'NetSales', 'Channel', 'Status'
    ];
    
    const rows = data.map(d => {
      const date = new Date(d.year, d.month - 1, d.day);
      const dayOfWeek = ['일','월','화','수','목','금','토'][date.getDay()] + '요일';
      
      return [
        d.transaction_id,
        d.year,
        d.month,
        d.day,
        dayOfWeek,
        d.hour,
        d.minute,
        d.second,
        d.store_name,
        d.region,
        d.item_name,
        d.item_category,
        d.quantity,
        d.net_sales,
        d.channel,
        d.status
      ];
    });

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

export const dashboardUseCases = new DashboardUseCases();
