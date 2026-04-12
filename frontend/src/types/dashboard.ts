export interface SalesEvent {
  order_id: string;
  timestamp: string;
  menu_name: string;
  store_name: string;
  channel: string;
  qty: number;
  total_price: number;
  status: string;
}

export interface LogisticsOrder extends SalesEvent {
  purchase_cost: number;
  distribution_margin: number;
}

export interface KpiData {
  label: string;
  value: string | number;
  unit?: string;
  trend: string;
  isUp: boolean;
  color: string;
  bg: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}
