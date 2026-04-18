"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const dashboardUseCases_1 = require("./dashboardUseCases");
const simulationService_1 = require("../infrastructure/simulationService");
(0, vitest_1.describe)('DashboardUseCases', () => {
    let useCases;
    (0, vitest_1.beforeEach)(() => {
        useCases = new dashboardUseCases_1.DashboardUseCases();
        // Pre-generate some data for tests (V3 Scale)
        simulationService_1.simulationService.initialize(1000, 500);
    });
    (0, vitest_1.it)('should return 4 executive KPI blocks', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield useCases.getSalesDashboard();
        (0, vitest_1.expect)(result.kpis.length).toBe(4);
    }));
    (0, vitest_1.it)('should aggregate net sales by hour correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield useCases.getSalesDashboard();
        (0, vitest_1.expect)(result.timeSeries.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(result.timeSeries[0]).toHaveProperty('time');
        (0, vitest_1.expect)(result.timeSeries[0]).toHaveProperty('value');
        // Check if time is in HH:00 format
        (0, vitest_1.expect)(result.timeSeries[0].time).toMatch(/^\d{2}:00$/);
    }));
    (0, vitest_1.it)('should format CSV with correct headers', () => __awaiter(void 0, void 0, void 0, function* () {
        const csv = yield useCases.getCSVData({});
        const firstLine = csv.split('\n')[0];
        (0, vitest_1.expect)(firstLine).toContain('ID,Date,Time,Store,Region');
    }));
    (0, vitest_1.it)('should apply store filters to CSV data', () => __awaiter(void 0, void 0, void 0, function* () {
        const storeName = '강남본점';
        const csv = yield useCases.getCSVData({ store: storeName });
        const rows = csv.split('\n').slice(1);
        // If we have data, every row should have the store name
        if (rows.length > 0 && rows[0] !== '') {
            rows.forEach(row => {
                (0, vitest_1.expect)(row).toContain(storeName);
            });
        }
    }));
    (0, vitest_1.it)('should return Strategic Insights with Health Scores (V3)', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield useCases.getStrategicDashboard();
        (0, vitest_1.expect)(result.insights.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(result.insights[0]).toHaveProperty('health_score');
        (0, vitest_1.expect)(result.insights[0]).toHaveProperty('compliance_score');
        // Check if score is within 0-100
        (0, vitest_1.expect)(result.insights[0].health_score).toBeGreaterThanOrEqual(0);
        (0, vitest_1.expect)(result.insights[0].health_score).toBeLessThanOrEqual(100);
    }));
    (0, vitest_1.it)('should return Logistics Insights with inventory snapshots', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield useCases.getLogisticsDashboard();
        (0, vitest_1.expect)(result.kpis.length).toBe(4);
        (0, vitest_1.expect)(result.inventory.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(result.inventory[0]).toHaveProperty('stockout_risk_score');
    }));
    (0, vitest_1.it)('should return Network Insights with event logs', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield useCases.getNetworkDashboard();
        (0, vitest_1.expect)(result.kpis.length).toBe(4);
        (0, vitest_1.expect)(result.events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(result.events[0]).toHaveProperty('latency_ms');
    }));
});
