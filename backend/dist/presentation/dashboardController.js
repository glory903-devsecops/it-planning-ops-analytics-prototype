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
exports.dashboardController = exports.DashboardController = void 0;
const dashboardUseCases_1 = require("../application/dashboardUseCases");
class DashboardController {
    getSalesInit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dashboardUseCases_1.dashboardUseCases.getSalesDashboard();
                res.json(data);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch sales dashboard data' });
            }
        });
    }
    exportCSV(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = {
                    store: typeof req.query.store === 'string' ? req.query.store : undefined,
                    item: typeof req.query.item === 'string' ? req.query.item : undefined
                };
                const csv = yield dashboardUseCases_1.dashboardUseCases.getCSVData(filters);
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename=ediya_analytics_export.csv');
                res.send(csv);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to generate CSV export' });
            }
        });
    }
    getStrategicInit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dashboardUseCases_1.dashboardUseCases.getStrategicDashboard();
                res.json(data);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch strategic dashboard data' });
            }
        });
    }
    getLogisticsInit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dashboardUseCases_1.dashboardUseCases.getLogisticsDashboard();
                res.json(data);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch logistics dashboard data' });
            }
        });
    }
    getNetworkInit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dashboardUseCases_1.dashboardUseCases.getNetworkDashboard();
                res.json(data);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch network dashboard data' });
            }
        });
    }
}
exports.DashboardController = DashboardController;
exports.dashboardController = new DashboardController();
