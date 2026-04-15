export type TransactionStatus = '완료' | '실패(Timeout)' | '취소';
export type OrderType = '매장' | '배달' | '픽업';

export interface SalesTransaction {
  transaction_id: string;
  datetime: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  store_id: string;
  store_name: string;
  region: string;
  city: string;
  item_id: string;
  item_name: string;
  item_category: string;
  quantity: number;
  unit_price: number;
  gross_sales: number;
  discount_amount: number;
  net_sales: number;
  channel: string;
  order_type: OrderType;
  status: TransactionStatus;
  sales_zscore: number;
  trend_delta_percent: number;
}

export interface InventorySnapshot {
  inventory_id: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  store_id: string;
  store_name: string;
  item_id: string;
  item_name: string;
  current_stock: number;
  reserved_stock: number;
  available_stock: number;
  safety_stock: number;
  days_of_cover: number;
  stockout_risk_score: number;
  recommended_order_quantity: number;
  recommended_order_priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface NetworkEvent {
  event_id: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  endpoint_name: string;
  api_route: string;
  latency_ms: number;
  status_code: number;
  affected_transactions: number;
  impact_score: number;
  latency_zscore: number;
  anomaly_flag: boolean;
}

// --- V3 Strategic Domain ---

export interface MembershipActivity {
  id: string;
  datetime: string;
  hour: number;
  user_tier: 'Silver' | 'Gold' | 'VIP';
  app_event: 'Open' | 'Search' | 'OrderStart' | 'Payment_Completed';
  location_region: string;
  store_id?: string;
}

export interface BranchCompliance {
  id: string;
  store_id: string;
  audit_date: string;
  hygiene_score: number; // 0-100
  service_quality_score: number; // 0-100
  equipment_health: number; // 0-100
  compliance_rank: 'A' | 'B' | 'C' | 'D';
}

export interface StrategicInsight {
  id: string;
  store_id: string;
  store_name: string;
  health_score: number;
  sales_performance: number;
  inventory_risk: number;
  compliance_score: number;
  customer_sentiment: number;
  is_anomaly: boolean;
  recommendation: string;
}

export interface ExecutiveKpi {
  id: string;
  label: string;
  value: string | number;
  subValue?: string;
  trend: number;
  trendDirection: 'up' | 'down' | 'neutral';
  confidenceScore: number;
  status: 'normal' | 'warning' | 'critical';
}
