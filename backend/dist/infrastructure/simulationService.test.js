"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const simulationService_1 = require("./simulationService");
(0, vitest_1.describe)('SimulationService', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = simulationService_1.SimulationService.getInstance();
    });
    (0, vitest_1.it)('should generate requested number of sales records', () => {
        const count = 100;
        const data = service.generateSalesData(count);
        (0, vitest_1.expect)(data.length).toBe(count);
    });
    (0, vitest_1.it)('should have valid currency consistency (net_sales = gross_sales - discount)', () => {
        const data = service.generateSalesData(10);
        data.forEach(trx => {
            (0, vitest_1.expect)(trx.net_sales).toBeCloseTo(trx.gross_sales - trx.discount_amount);
        });
    });
    (0, vitest_1.it)('should generate unique transaction IDs', () => {
        const data = service.generateSalesData(50);
        const ids = new Set(data.map(d => d.transaction_id));
        (0, vitest_1.expect)(ids.size).toBe(50);
    });
    (0, vitest_1.it)('should sort data by datetime descending (latest first)', () => {
        const data = service.generateSalesData(10);
        const firstDate = new Date(data[0].datetime).getTime();
        const lastDate = new Date(data[data.length - 1].datetime).getTime();
        (0, vitest_1.expect)(firstDate).toBeGreaterThanOrEqual(lastDate);
    });
});
