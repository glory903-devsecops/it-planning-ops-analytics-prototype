import { simulationService } from '../infrastructure/simulationService';
import { SalesTransaction, ExecutiveKpi, StrategicInsight } from '../domain/types';

interface SalesFilters {
  store?: string;
  item?: string;
}

interface TimeSeriesPoint {
  time: string;
  value: number;
}

export class DashboardUseCases {
  public async getSalesDashboard() {
    const rawSales = simulationService.getSales();
    const completedSales = rawSales.filter(s => s.status === '완료');
    const totalRevenue = completedSales.reduce((sum, t) => sum + t.net_sales, 0);
    const totalCompleted = completedSales.length;

    const kpis = [
      this.createKpi({
        id: 'S1',
        label: '총 매출 지수(Trend Index)',
        value: this.formatCurrency(totalRevenue),
        trend: 12.5,
        trendDirection: 'up',
        confidenceScore: 98,
        status: 'normal'
      }),
      this.createKpi({
        id: 'S2',
        label: '최고 성장 품목',
        value: '초당옥수수 1인빙수',
        subValue: '+42% MoM',
        trend: 42,
        trendDirection: 'up',
        confidenceScore: 92,
        status: 'normal'
      }),
      this.createKpi({
        id: 'S3',
        label: '완료 주문 수',
        value: totalCompleted.toLocaleString(),
        trend: 5.2,
        trendDirection: 'up',
        confidenceScore: 95,
        status: 'normal'
      }),
      this.createKpi({
        id: 'S4',
        label: '이상 징후 탐지(Anomaly)',
        value: `${this.detectAnomalies(completedSales)}건`,
        subValue: 'Timeout 감지',
        trend: -2.1,
        trendDirection: 'down',
        confidenceScore: 88,
        status: 'warning'
      })
    ];

    return {
      kpis,
      timeSeries: this.buildTimeSeries(completedSales),
      recentSales: completedSales.slice(0, 100),
      recentPayments: this.getRecentPayments(completedSales, 30)
    };
  }

  public async getStrategicDashboard() {
    const sales = simulationService.getSales();
    const membership = simulationService.getMembership();
    const compliance = simulationService.getCompliance();

    const salesByStore: Record<string, number> = {};
    sales.forEach(s => {
      salesByStore[s.store_id] = (salesByStore[s.store_id] || 0) + s.net_sales;
    });

    const appTrafficByStore: Record<string, number> = {};
    membership.forEach(m => {
      if (m.store_id) {
        appTrafficByStore[m.store_id] = (appTrafficByStore[m.store_id] || 0) + 1;
      }
    });

    const insights: StrategicInsight[] = compliance.map(c => {
      const storeSales = salesByStore[c.store_id] || 0;
      const appTraffic = appTrafficByStore[c.store_id] || 0;
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
        inventory_risk: Math.round(Math.max(0, 100 - (storeSales / 1000000))),
        compliance_score: Math.round((c.hygiene_score + c.service_quality_score) / 2),
        customer_sentiment: Math.round(customerScore),
        is_anomaly: healthScore < 75,
        recommendation: healthScore < 75 ? '긴급 서비스 점검 및 품질 교육 실시 권고' : '안정적 운영 중'
      };
    });

    const strategicKpis = [
      this.createKpi({ id: 'ST1', label: '전사 브랜드 건강 지수', value: '88.4', trend: 2.1, confidenceScore: 94, status: 'normal' }),
      this.createKpi({ id: 'ST2', label: '앱 연동 매출 기여도', value: '24.2%', trend: 5.5, confidenceScore: 91, status: 'normal' }),
      this.createKpi({ id: 'ST3', label: '품질 관리 위기 매장', value: `${insights.filter(i => i.is_anomaly).length}개소`, trend: 1, confidenceScore: 96, status: 'warning' }),
      this.createKpi({ id: 'ST4', label: '예측 수요 오차율', value: '4.2%', trend: -1.2, trendDirection: 'down', confidenceScore: 89, status: 'normal' })
    ];

    return { kpis: strategicKpis, insights };
  }

  public async getLogisticsDashboard() {
    const snapshots = simulationService.getInventory();
    const criticalCount = snapshots.filter(s => s.recommended_order_priority === 'Critical').length;
    const avgSafetyIndex = Math.round(snapshots.reduce((acc, s) => acc + (s.current_stock / s.safety_stock), 0) / snapshots.length * 100);

    const kpis = [
      this.createKpi({ id: 'L1', label: '물류 가용성 지수', value: '94.2%', trend: 1.5, confidenceScore: 96, status: 'normal' }),
      this.createKpi({ id: 'L2', label: '긴급 보충 필요 품목', value: `${criticalCount}건`, trend: -2, confidenceScore: 99, status: criticalCount > 5 ? 'critical' : 'normal' }),
      this.createKpi({ id: 'L3', label: '평균 재고 회전 일수', value: '4.2일', trend: -0.5, confidenceScore: 92, status: 'normal' }),
      this.createKpi({ id: 'L4', label: '재고 건전성 점수', value: `${avgSafetyIndex}/100`, trend: 3.2, confidenceScore: 94, status: 'normal' })
    ];

    return { kpis, inventory: snapshots };
  }

  public async getNetworkDashboard() {
    const events = simulationService.getNetwork();
    const avgLatency = events.reduce((acc, e) => acc + e.latency_ms, 0) / events.length;
    const errorCount = events.filter(e => e.status_code >= 400).length;

    const kpis = [
      this.createKpi({
        id: 'N1',
        label: '평균 응답 속도 (P99)',
        value: `${Math.round(avgLatency)}ms`,
        trend: 22,
        trendDirection: 'up',
        confidenceScore: 97,
        status: avgLatency > 200 ? 'warning' : 'normal'
      }),
      this.createKpi({ id: 'N2', label: '시스템 가용성 (SLA)', value: '99.98%', trend: 0.01, confidenceScore: 99, status: 'normal' }),
      this.createKpi({ id: 'N3', label: '실시간 에러율', value: `${((errorCount / events.length) * 100).toFixed(2)}%`, trend: 0.05, confidenceScore: 95, status: 'normal' }),
      this.createKpi({ id: 'N4', label: '인프라 비용 최적화', value: '₩12.4M', trend: -5.2, trendDirection: 'down', confidenceScore: 91, status: 'normal' })
    ];

    return { kpis, events: events.slice(0, 500) };
  }

  public async getCSVData(filters: SalesFilters) {
    const data = this.filterSales(simulationService.getSales(), filters);
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

  private createKpi(params: {
    id: string;
    label: string;
    value: string | number;
    trend: number;
    status: 'normal' | 'warning' | 'critical';
    trendDirection?: 'up' | 'down' | 'neutral';
    confidenceScore?: number;
    subValue?: string;
  }): ExecutiveKpi {
    return {
      id: params.id,
      label: params.label,
      value: params.value,
      subValue: params.subValue,
      trend: params.trend,
      trendDirection: params.trendDirection ?? 'neutral',
      confidenceScore: params.confidenceScore ?? 90,
      status: params.status
    };
  }

  private formatCurrency(amount: number) {
    return `₩${(amount / 1000000).toFixed(1)}M`;
  }

  private detectAnomalies(sales: SalesTransaction[]) {
    const timeoutEvents = sales.filter(s => s.status !== '완료').length;
    return timeoutEvents > 0 ? timeoutEvents : 0;
  }

  private buildTimeSeries(data: SalesTransaction[]): TimeSeriesPoint[] {
    const map: Record<string, number> = {};
    data.forEach(d => {
      const hour = d.hour.toString().padStart(2, '0');
      const time = `${hour}:00`;
      map[time] = (map[time] || 0) + d.net_sales;
    });

    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, value]) => ({ time, value }));
  }

  private getRecentPayments(data: SalesTransaction[], limit = 30) {
    return data
      .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      .slice(0, limit)
      .map(({ transaction_id, datetime, store_name, item_name, item_category, net_sales, status, channel }) => ({
        transaction_id,
        datetime,
        store_name,
        item_name,
        item_category,
        net_sales,
        status,
        channel
      }));
  }

  private filterSales(data: SalesTransaction[], filters: SalesFilters) {
    return data.filter(sales => {
      if (filters.store && sales.store_name !== filters.store) return false;
      if (filters.item && sales.item_name !== filters.item) return false;
      return true;
    });
  }
}

export const dashboardUseCases = new DashboardUseCases();
