"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { KPICards } from '../components/dashboard/KPICards';
import { DashboardCharts } from '../components/dashboard/Charts';
import { RecentIncidents } from '../components/dashboard/RecentIncidents';
import { AIAssistantPanel } from '../components/ai/AIAssistantPanel';
import { dashboardService } from '../services/dashboardService';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const dashboardData = await dashboardService.getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003B6D]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* KPI Cards section */}
        <KPICards metrics={data.metrics} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 flex flex-col">
            {/* Charts Section */}
            <DashboardCharts 
              timeSeriesData={data.timeSeriesData} 
              availableItems={data.availableItems}
              availableStores={data.availableStores}
              availableChannels={data.availableChannels}
              channelDistribution={data.channelDistribution} 
            />
            {/* Recent Sales Table */}
            <RecentIncidents incidents={data.recentSales || []} />
          </div>

          <div className="xl:col-span-1 min-h-[500px]">
            {/* AI Assistant */}
            <AIAssistantPanel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
