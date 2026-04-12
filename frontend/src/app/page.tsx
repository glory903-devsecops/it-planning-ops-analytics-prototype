"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { dashboardService } from '../services/dashboardService';
import { formatKoreanCurrency } from '../lib/formatters';
import { PremiumStockChart } from '../components/dashboard/PremiumStockChart';
import { RecentIncidents } from '../components/dashboard/RecentIncidents';
import { KpiGrid } from '../components/dashboard/KpiGrid';
import { AIStrategyPanel } from '../components/ai/AIStrategyPanel';
import { DecisionReportModal } from '../components/dashboard/DecisionReportModal';
import { useAIChat } from '../hooks/useAIChat';
import { KpiData } from '../types/dashboard';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // AI Chat Hook
  const { messages, inputValue, setInputValue, sendMessage, isTyping } = useAIChat({
    initialMessages: [
      { role: 'ai', content: "현재 대학가 상권(신촌역점, 홍대입구역점)에서 오후 시간대 진입과 함께 '초당옥수수 1인빙수'의 주문량이 급증하고 있습니다." }
    ],
    mode: 'sales'
  });

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const initialData = await dashboardService.getInitialData();
        if (mounted) {
          setData(initialData);
          dashboardService.connectSocket((newEvent) => {
            setData((prev: any) => {
              if (!prev) return prev;
              const isWin = newEvent.status === '완료';
              return {
                ...prev,
                metrics: {
                  ...prev.metrics,
                  totalSales: isWin ? prev.metrics.totalSales + newEvent.total_price : prev.metrics.totalSales,
                  totalOrders: isWin ? prev.metrics.totalOrders + 1 : prev.metrics.totalOrders,
                },
                recentSales: [newEvent, ...prev.recentSales]
              };
            });
          });
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      mounted = false;
      dashboardService.disconnect();
    };
  }, []);

  if (loading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
           <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full shadow-inner"></div>
              <div className="absolute inset-0 border-4 border-[#003B6D] border-t-transparent rounded-full animate-spin shadow-lg"></div>
           </div>
        </div>
      </DashboardLayout>
    );
  }

  const kpis: KpiData[] = [
    { label: '누적 총 매출액', value: formatKoreanCurrency(data.metrics.totalSales), trend: '+12.5%', isUp: true, color: 'text-blue-600', bg: 'bg-blue-50/50' },
    { label: '전체 주문 건수', value: data.metrics.totalOrders.toLocaleString(), unit: '건', trend: '+5.2%', isUp: true, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { label: '평균 객단가 (AOV)', value: formatKoreanCurrency(data.metrics.averageOrderValue), trend: '-1.2%', isUp: false, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
  ];

  const top5Products = [
    { rank: 1, name: data.metrics.bestSeller || 'NEW 아메리카노', color: 'bg-amber-500 text-white' },
    { rank: 2, name: '아메리카노', color: 'bg-blue-500 text-white' },
    { rank: 3, name: '카페라떼', color: 'bg-indigo-500 text-white' },
    { rank: 4, name: '초당옥수수 1인빙수', color: 'bg-emerald-500 text-white' },
    { rank: 5, name: '자몽 하이볼 에이드', color: 'bg-rose-500 text-white' },
  ];

  const chartFilters = [
    { label: '메뉴', options: ['전체 품목', ...(data.availableItems || [])], defaultValue: '전체 품목' },
    { label: '지점', options: ['전체 지점', ...(data.availableStores || [])], defaultValue: '전체 지점' },
    { label: '채널', options: ['전체 채널', ...(data.availableChannels || [])], defaultValue: '전체 채널' }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
            <div className="space-y-1">
                <div className="flex items-center gap-3 text-[#003B6D] font-black text-[9px] tracking-[0.3em] uppercase opacity-70">
                    <div className="w-10 h-[2px] bg-[#003B6D] rounded-full" />
                    EDIYA AX Sales Intelligence
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter">실시간 매출 인사이트</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 bg-white/50 border border-white/40 rounded-xl shadow-sm backdrop-blur-md flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Engine Connected</span>
                </div>
            </div>
        </div>

        {/* KPI Grid */}
        <KpiGrid kpis={kpis} />

        {/* Best Seller Banner */}
        <div className="border border-white/40 bg-amber-50/30 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] p-5 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">최근 인기 품목 (TOP 5)</p>
              <div className="flex items-center gap-2 flex-wrap">
                {top5Products.map((item) => (
                  <div key={item.rank} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${item.color} shadow-sm transition-transform hover:scale-105`}>
                    <span className="opacity-70 text-[10px]">#{item.rank}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black tracking-tighter text-amber-600 bg-amber-100/50">BEST</div>
          </div>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-stretch">
          <div className="xl:col-span-2 flex flex-col">
            <PremiumStockChart 
              title="통합 매출 변동 트렌드 분석"
              data={data.timeSeriesData}
              filters={chartFilters}
              unit="₩"
              height={580}
            />
          </div>
          <div className="xl:col-span-1 flex flex-col">
            <AIStrategyPanel 
              mode="sales"
              messages={messages}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSendMessage={() => sendMessage(inputValue)}
              onOpenReport={() => setIsReportOpen(true)}
              isTyping={isTyping}
            />
          </div>
        </div>

        {/* Recent Incidents Table */}
        <RecentIncidents incidents={data.recentSales} />

        {/* Strategic report Modal */}
        <DecisionReportModal 
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          mode="sales"
          metrics={data.metrics}
        />

      </div>
    </DashboardLayout>
  );
}
