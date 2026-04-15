import { describe, it, expect, beforeEach } from 'vitest';
import { SimulationService } from './simulationService';

describe('SimulationService', () => {
  let service: SimulationService;

  beforeEach(() => {
    service = SimulationService.getInstance();
  });

  it('should generate requested number of sales records', () => {
    const count = 100;
    const data = service.generateSalesData(count);
    expect(data.length).toBe(count);
  });

  it('should have valid currency consistency (net_sales = gross_sales - discount)', () => {
    const data = service.generateSalesData(10);
    data.forEach(trx => {
      expect(trx.net_sales).toBeCloseTo(trx.gross_sales - trx.discount_amount);
    });
  });

  it('should generate unique transaction IDs', () => {
    const data = service.generateSalesData(50);
    const ids = new Set(data.map(d => d.transaction_id));
    expect(ids.size).toBe(50);
  });

  it('should sort data by datetime descending (latest first)', () => {
    const data = service.generateSalesData(10);
    const firstDate = new Date(data[0].datetime).getTime();
    const lastDate = new Date(data[data.length - 1].datetime).getTime();
    expect(firstDate).toBeGreaterThanOrEqual(lastDate);
  });
});
