import { 
  SalesTransaction, 
  InventorySnapshot, 
  NetworkEvent,
  ExecutiveKpi
} from '../domain/types';

const API_BASE_URL = 'http://localhost:4000/api';

export const DecisionApplication = {
  
  // --- Sales Use Cases ---
  async getSalesDashboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/sales/init`);
      if (!response.ok) throw new Error('Backend connectivity failed');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch sales insight:', error);
      return { kpis: [], timeSeries: [], recentSales: [], stores: [] };
    }
  },

  // --- Logistics Use Cases ---
  async getLogisticsDashboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/logistics/init`);
      if (!response.ok) throw new Error('Backend connectivity failed');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch logistics insight:', error);
      return { kpis: [], inventory: [], recentOrders: [] };
    }
  },

  // --- Network Use Cases ---
  async getNetworkDashboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/network/init`);
      if (!response.ok) throw new Error('Backend connectivity failed');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch network insight:', error);
      return { kpis: [], events: [], recentEvents: [] };
    }
  },

  // --- Strategic V3 Use Cases ---
  async getStrategicDashboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/strategic/init`);
      if (!response.ok) throw new Error('Backend connectivity failed');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch strategic insight:', error);
      return { kpis: [], insights: [] };
    }
  },

  // --- CSV Export Helper ---
  exportToCSV(data: any[], filename: string) {
    if (!data || !data.length) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(val => {
        if (typeof val === 'string') return `"${val.replace(/"/g, '""')}"`;
        if (val === null || val === undefined) return '';
        return val;
      }).join(',')
    );
    
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
