import express from 'express';
import { dashboardController } from '../presentation/dashboardController';

const router = express.Router();

// Sales Routes
router.get('/sales/init', (req, res) => dashboardController.getSalesInit(req, res));
router.get('/sales/export', (req, res) => dashboardController.exportCSV(req, res));
router.get('/strategic/init', (req, res) => dashboardController.getStrategicInit(req, res));

// Logistics Routes
router.get('/logistics/init', (req, res) => dashboardController.getLogisticsInit(req, res));

// Network Routes
router.get('/network/init', (req, res) => dashboardController.getNetworkInit(req, res));

export default router;
