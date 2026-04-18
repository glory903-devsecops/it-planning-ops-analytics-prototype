"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = require("../presentation/dashboardController");
const router = express_1.default.Router();
// Sales Routes
router.get('/sales/init', (req, res) => dashboardController_1.dashboardController.getSalesInit(req, res));
router.get('/sales/export', (req, res) => dashboardController_1.dashboardController.exportCSV(req, res));
router.get('/strategic/init', (req, res) => dashboardController_1.dashboardController.getStrategicInit(req, res));
// Logistics Routes
router.get('/logistics/init', (req, res) => dashboardController_1.dashboardController.getLogisticsInit(req, res));
// Network Routes
router.get('/network/init', (req, res) => dashboardController_1.dashboardController.getNetworkInit(req, res));
exports.default = router;
