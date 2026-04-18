import { Request, Response } from 'express';
import { dashboardUseCases } from '../application/dashboardUseCases';

export class DashboardController {
  public async getSalesInit(req: Request, res: Response) {
    try {
      const data = await dashboardUseCases.getSalesDashboard();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sales dashboard data' });
    }
  }

  public async exportCSV(req: Request, res: Response) {
    try {
      const filters = {
        store: typeof req.query.store === 'string' ? req.query.store : undefined,
        item: typeof req.query.item === 'string' ? req.query.item : undefined
      };
      const csv = await dashboardUseCases.getCSVData(filters);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=ediya_analytics_export.csv');
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate CSV export' });
    }
  }

  public async getStrategicInit(req: Request, res: Response) {
    try {
      const data = await dashboardUseCases.getStrategicDashboard();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch strategic dashboard data' });
    }
  }

  public async getLogisticsInit(req: Request, res: Response) {
    try {
      const data = await dashboardUseCases.getLogisticsDashboard();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch logistics dashboard data' });
    }
  }

  public async getNetworkInit(req: Request, res: Response) {
    try {
      const data = await dashboardUseCases.getNetworkDashboard();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch network dashboard data' });
    }
  }
}

export const dashboardController = new DashboardController();
