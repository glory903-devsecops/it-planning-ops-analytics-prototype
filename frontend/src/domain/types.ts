/**
 * Ediya AX Decision Intelligence - Domain Models
 * Following Clean Architecture Principles
 */

export type TransactionStatus = '완료' | '실패(Timeout)' | '취소됨';

// --- Shared Base ---
export interface TimeDimension {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
}

// --- Sales Insight Domain ---
export interface SalesTransaction extends TimeDimension {
  transaction_id: string;
  datetime: string; // ISO string format
  
  // Store info
  store_id: string;
  store_name: string;
  region: string;
  city: string;
  
  // Item info
  item_id: string;
  item_name: string;
  item_category: string;
  
  // Financials
  quantity: number;
  unit_price: number;
  gross_sales: number;
  discount_amount: number;
  net_sales: number;
  
  // Channel
  channel: string;
  order_type: '매장' | '배달' | '픽업';
  
  // Derived / Decision Metrics
  sales_zscore: number;
  trend_delta_percent: number;
  status: TransactionStatus;
}

// --- Logistics Insight Domain ---
export interface InventorySnapshot extends TimeDimension {
  inventory_id: string;
  
  // Store info
  store_id: string;
  store_name: string;
  
  // Item info
  item_id: string;
  item_name: string;
  
  // Stocks
  current_stock: number;
  reserved_stock: number;
  available_stock: number;
  safety_stock: number;
  
  // Derived / Decision Metrics
  days_of_cover: number;
  stockout_risk_score: number; // 0-100
  recommended_order_quantity: number;
  recommended_order_priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

// --- Network Insight Domain ---
export interface NetworkEvent extends TimeDimension {
  event_id: string;
  
  // Endpoint info
  endpoint_name: string;
  api_route: string;
  
  // Performance
  latency_ms: number;
  status_code: number;
  error_code?: string;
  
  // Impact
  affected_transactions: number;
  impact_score: number; // 0-100
  
  // Derived / Decision Metrics
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
  hygiene_score: number; 
  service_quality_score: number; 
  equipment_health: number; 
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

// --- UI Components Types ---
export interface ExecutiveKpi {
  id: string;
  label: string;
  value: string | number;
  subValue?: string;
  trend: number; // percentage
  trendDirection: 'up' | 'down' | 'neutral';
  impactScore?: number;
  confidenceScore: number;
  status: 'normal' | 'warning' | 'critical';
}
