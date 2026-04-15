import { describe, it, expect, beforeEach } from 'vitest';
import { SimulationEngine } from './engine';

describe('SimulationEngine (Frontend)', () => {
  let engine: SimulationEngine;

  beforeEach(() => {
    // We access the singleton instance
    engine = SimulationEngine.getInstance();
  });

  it('should generate 30,000+ total records for enterprise scale', () => {
    const sales = engine.getSales();
    const logistics = engine.getLogistics();
    const network = engine.getNetwork();
    
    expect(sales.length + logistics.length + network.length).toBeGreaterThanOrEqual(30000);
  });

  it('should filter sales by region', () => {
    const regions = engine.getAvailableRegions();
    if (regions.length > 0) {
      const targetRegion = regions[0];
      const filtered = engine.getSales({ region: targetRegion });
      
      filtered.forEach(t => {
        expect(t.region).toBe(targetRegion);
      });
    }
  });

  it('should maintain transaction status integrity', () => {
    const sales = engine.getSales();
    sales.forEach(t => {
      expect(['완료', '실패(Timeout)', '취소']).toContain(t.status);
    });
  });

  it('should correctly calculate net sales (net = gross - discount)', () => {
    const sales = engine.getSales().slice(0, 100);
    sales.forEach(t => {
      expect(t.net_sales).toBeCloseTo(t.gross_sales - t.discount_amount);
    });
  });
});
