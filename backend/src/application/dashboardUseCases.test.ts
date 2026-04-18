import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DashboardUseCases } from './dashboardUseCases';
import { simulationService } from '../infrastructure/simulationService';

describe('DashboardUseCases', () => {
  let useCases: DashboardUseCases;

  beforeEach(() => {
    useCases = new DashboardUseCases();
    // Pre-generate some data for tests (V3 Scale)
    simulationService.initialize(1000, 500);
  });

  it('should return 4 executive KPI blocks', async () => {
    const result = await useCases.getSalesDashboard();
    expect(result.kpis.length).toBe(4);
  });

  it('should aggregate net sales by hour correctly', async () => {
    const result = await useCases.getSalesDashboard();
    expect(result.timeSeries.length).toBeGreaterThan(0);
    expect(result.timeSeries[0]).toHaveProperty('time');
    expect(result.timeSeries[0]).toHaveProperty('value');
    
    // Check if time is in HH:00 format
    expect(result.timeSeries[0].time).toMatch(/^\d{2}:00$/);
  });

  it('should format CSV with correct headers', async () => {
    const csv = await useCases.getCSVData({});
    const firstLine = csv.split('\n')[0];
    expect(firstLine).toContain('ID');
    expect(firstLine).toContain('Store');
    expect(firstLine).toContain('Status');
    expect(firstLine).toContain('NetSales');
  });

  it('should apply store filters to CSV data', async () => {
    const storeName = '강남본점';
    const csv = await useCases.getCSVData({ store: storeName });
    const rows = csv.split('\n').slice(1);
    
    // If we have data, every row should have the store name
    if (rows.length > 0 && rows[0] !== '') {
      rows.forEach(row => {
        expect(row).toContain(storeName);
      });
    }
  });

  it('should return Strategic Insights with Health Scores (V3)', async () => {
    const result = await useCases.getStrategicDashboard();
    expect(result.insights.length).toBeGreaterThan(0);
    expect(result.insights[0]).toHaveProperty('health_score');
    expect(result.insights[0]).toHaveProperty('compliance_score');
    
    // Check if score is within 0-100
    expect(result.insights[0].health_score).toBeGreaterThanOrEqual(0);
    expect(result.insights[0].health_score).toBeLessThanOrEqual(100);
  });

  it('should return Logistics Insights with inventory snapshots', async () => {
    const result = await useCases.getLogisticsDashboard();
    expect(result.kpis.length).toBe(4);
    expect(result.inventory.length).toBeGreaterThan(0);
    expect(result.inventory[0]).toHaveProperty('stockout_risk_score');
  });

  it('should return Network Insights with event logs', async () => {
    const result = await useCases.getNetworkDashboard();
    expect(result.kpis.length).toBe(4);
    expect(result.events.length).toBeGreaterThan(0);
    expect(result.events[0]).toHaveProperty('latency_ms');
  });
});
