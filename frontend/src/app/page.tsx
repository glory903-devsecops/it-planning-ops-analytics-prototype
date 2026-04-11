"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { RecentIncidents } from '../components/dashboard/RecentIncidents';
import { dashboardService } from '../services/dashboardService';
import { TrendingUp, ShoppingBag, Users, Star, ArrowUpRight, ArrowDownRight, Activity, ChevronRight, Clock } from 'lucide-react';
import { formatKoreanCurrency } from '../lib/formatters';
import { PremiumStockChart } from '../components/dashboard/PremiumStockChart';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
                recentSales: [newEvent, ...prev.recentSales].slice(0, 15)
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

  const kpiData = [
    { label: '누적 총 매출액', value: formatKoreanCurrency(data.metrics.totalSales), icon: TrendingUp, trend: '+12.5%', isUp: true },
    { label: '전체 주문 건수', value: data.metrics.totalOrders.toLocaleString(), unit: '건', icon: ShoppingBag, trend: '+5.2%', isUp: true },
    { label: '평균 객단가 (AOV)', value: formatKoreanCurrency(data.metrics.averageOrderValue), icon: Users, trend: '-1.2%', isUp: false },
    { label: '최고 인기 품목', value: data.metrics.bestSeller, icon: Star, trend: 'BEST', isUp: true }
  ];

  const chartFilters = [
    { label: '메뉴', options: ['전체 품목', ...data.availableItems], defaultValue: '전체 품목' },
    { label: '지점', options: ['전체 지점', ...data.availableStores], defaultValue: '전체 지점' },
    { label: '채널', options: ['전체 채널', ...data.availableChannels], defaultValue: '전체 채널' }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
            <div className="space-y-2">
                <div className="flex items-center gap-3 text-[#003B6D] font-black text-[10px] tracking-[0.3em] uppercase opacity-80">
                    <div className="w-12 h-[3px] bg-gradient-to-r from-[#003B6D] to-blue-400 rounded-full" />
                    EDIYA AX Sales Intelligence
                </div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter">실시간 매출 인사이트</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="px-5 py-2.5 bg-white/50 border border-white/40 rounded-2xl shadow-sm backdrop-blur-md flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Live Engine Connected</span>
                </div>
            </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpiData.map((kpi, idx) => (
            <div key={idx} className="group relative border border-white/40 bg-white/60 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#003B6D]/5 rounded-full blur-3xl group-hover:bg-[#003B6D]/10 transition-all duration-700" />
              
              <div className="flex justify-between items-start z-10">
                <div className="p-4 bg-[#003B6D] text-white rounded-2xl shadow-xl shadow-blue-900/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <kpi.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-tighter ${kpi.isUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                    {kpi.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.trend}
                </div>
              </div>

              <div className="mt-8 z-10">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 group-hover:text-[#003B6D] transition-colors">{kpi.label}</p>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-none">
                    {kpi.value}
                    {kpi.unit && <span className="text-lg ml-1 font-bold opacity-40">{kpi.unit}</span>}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Analytics Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="xl:col-span-2 space-y-10">
            <PremiumStockChart 
              title="통합 매출 변동 트렌드 분석"
              data={data.timeSeriesData}
              filters={chartFilters}
              unit="₩"
            />
          </div>
          
          <div className="xl:col-span-1">
             <div className="bg-[#0B0F1A] border border-white/10 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-1000" />
                <div className="relative z-10 space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl ring-4 ring-blue-500/10 group-hover:rotate-12 transition-transform">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl tracking-tight">AI STRATEGY LAB</h4>
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest opacity-60">Neural Decision Core</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-7 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4 hover:bg-white/10 transition-colors cursor-pointer group/card">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <p className="text-[11px] font-black text-green-400 uppercase tracking-widest">Growth Opportunity</p>
                            </div>
                            <p className="text-sm font-medium text-gray-300 leading-relaxed font-sans">
                                점심 시간대 <span className="text-blue-400 font-black underline underline-offset-4">'NEW 아메리카노'</span> 판매 비중이 평소보다 12% 높게 유지되고 있습니다. 오피스 상권 집중 프로모션이 효과를 보이고 있습니다.
                            </p>
                        </div>

                        <div className="p-7 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4 hover:bg-white/10 transition-colors cursor-pointer group/card">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                <p className="text-[11px] font-black text-orange-400 uppercase tracking-widest">Inventory Pre-Alert</p>
                            </div>
                            <p className="text-sm font-medium text-gray-300 leading-relaxed font-sans">
                                '초당옥수수 1인빙수'의 수요 예측값이 상향되었습니다. 강남 및 홍대 지점의 재고 보충 주기를 2시간 단축할 것을 권장합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-10 z-10 mt-auto">
                    <button className="w-full py-5 bg-white text-[#0B0F1A] rounded-3xl text-[12px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 group/btn">
                        통합 경영 전략 리포트 생성
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
          </div>
        </div>

        <RecentIncidents incidents={data.recentSales} />

      </div>
    </DashboardLayout>
  );
}
