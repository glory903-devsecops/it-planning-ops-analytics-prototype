"use client";

import React, { useEffect, useState, useRef } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Package, AlertOctagon, TrendingDown, Clock, X, ChevronRight } from 'lucide-react';
import { logisticsService } from '../../services/logisticsService';
import { PremiumStockChart } from '../../components/dashboard/PremiumStockChart';

export default function LogisticsPage() {
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<any[]>([]);

  const alertSet = useRef(new Set<string>());

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const initialData = await logisticsService.getInitialData();
        if (mounted) {
          setData(initialData);
          setHistory(initialData.timeSeriesData || []);

          logisticsService.connectSocket(
            (updatedData) => {
              if (mounted) setData({ ...updatedData });
            },
            (newAlert) => {
              if (mounted) {
                const alertKey = `${newAlert.store}-${newAlert.item}`;
                if (!alertSet.current.has(alertKey)) {
                  alertSet.current.add(alertKey);
                  setAlerts(prev => [newAlert, ...prev].slice(0, 5));
                }
              }
            }
          );

          // Handle history updates separately if needed, or via data
          // For simplicity in this prototype, we'll listen for a dedicated event if available
          // or rely on the init data for now. 
          // (Backend server actually emits 'inventory_history_update')
          // @ts-ignore
          logisticsService.socket?.on('inventory_history_update', (newHistory) => {
             if (mounted) setHistory(newHistory);
          });
        }
      } catch (error) {
        console.error("Failed to load logistics data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();

    return () => {
      mounted = false;
      logisticsService.disconnect();
    };
  }, []);

  if (loading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
           <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#003B6D] border-t-transparent rounded-full animate-spin"></div>
           </div>
        </div>
      </DashboardLayout>
    );
  }

  const chartFilters = [
    { label: '지점', options: data.availableStores || [], defaultValue: '강남본점' },
    { label: '품목', options: data.availableItems || [], defaultValue: '우유' }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
            <div className="space-y-2">
                <div className="flex items-center gap-3 text-[#003B6D] font-black text-[10px] tracking-[0.3em] uppercase opacity-80">
                    <div className="w-12 h-[3px] bg-gradient-to-r from-[#003B6D] to-blue-400 rounded-full" />
                    EDIYA SCM Intelligence
                </div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter">물류 공급망 인사이트</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="px-5 py-2.5 bg-white/50 border border-white/40 rounded-2xl shadow-sm backdrop-blur-md flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Global Logistics Sync</span>
                </div>
            </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: '총 관리 매장', value: data.metrics.totalStores, unit: '개', icon: Package, trend: 'HQ Verified', isUp: true },
            { label: '재고 위험 매장', value: data.metrics.criticalStores, unit: '건', icon: AlertOctagon, trend: 'ACTION REQ', isUp: false },
            { label: '전국 평균 잔여량', value: data.metrics.avgStockLevel, unit: '', icon: TrendingDown, trend: '-2.1%', isUp: false },
            { label: 'AI 자동 발주 건수', value: data.metrics.pendingOrders, unit: '건', icon: Clock, trend: 'Processing', isUp: true }
          ].map((kpi, idx) => (
            <div key={idx} className="group relative border border-white/40 bg-white/60 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#003B6D]/5 rounded-full blur-3xl group-hover:bg-[#003B6D]/10 transition-all duration-700" />
              <div className="flex justify-between items-start z-10">
                <div className={`p-4 ${kpi.trend === 'ACTION REQ' ? 'bg-red-600' : 'bg-[#003B6D]'} text-white rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
                <div className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-tighter ${kpi.isUp ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50'}`}>
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-stretch">
          <div className="xl:col-span-2 flex flex-col">
            <PremiumStockChart 
              title="지점별 원부자재 재고 변동 트렌드"
              data={history}
              filters={chartFilters}
              unit="%"
              height={580}
            />
          </div>
          
          <div className="xl:col-span-1 flex flex-col">
             <div className="bg-[#0B0F1A]/95 border border-white/10 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group h-[725px] flex flex-col justify-between backdrop-blur-2xl">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] group-hover:bg-indigo-600/20 transition-all duration-1000" />
                
                {/* Header */}
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-[#003B6D] to-indigo-600 rounded-2xl shadow-xl ring-4 ring-indigo-500/10 group-hover:rotate-12 transition-transform">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl tracking-tight">SCM OPTIMIZER AI</h4>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest opacity-60">Logistics Core Online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Message Area */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar mb-6 relative z-10">
                    <div className="p-7 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4 hover:bg-white/10 transition-colors cursor-pointer group/card opacity-100 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest">Early Dispatch Advice</p>
                        </div>
                        <p className="text-sm font-medium text-gray-300 leading-relaxed font-sans">
                            캠퍼스 상권의 <span className="text-blue-400 font-black underline underline-offset-4 font-sans">'우유'</span> 수요가 내일 오후 2시부터 급증할 것으로 예측됩니다. 선행 배차 승인을 권장합니다.
                        </p>
                    </div>

                    <div className="p-7 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4 hover:bg-white/10 transition-colors cursor-pointer group/card opacity-100 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            <p className="text-[11px] font-black text-red-400 uppercase tracking-widest">Profitability Alert</p>
                        </div>
                        <p className="text-sm font-medium text-gray-300 leading-relaxed font-sans">
                            최근 '원두' 공급 원가가 5% 하락했습니다. 지점 공급가를 유지할 경우 이번 분기 <span className="text-red-400 font-black font-sans">유통 차익이 약 1,200만원 증가</span>할 것으로 예상됩니다.
                        </p>
                    </div>
                </div>

                {/* Input Area */}
                <div className="relative z-10 pt-4 border-t border-white/5">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="공급망 인사이트 질문 (예: 차익 극대화 방안은?)"
                            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 pr-20 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-gray-600 font-medium"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white text-[#0B0F1A] rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="w-full mt-6 py-4 bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                         자동 발주 프로세스 최종 승인하기
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Updated Table Component with Purchase Cost & Margin */}
        <div className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl rounded-[3rem] overflow-hidden p-8">
            <div className="flex justify-between items-center mb-8 px-4">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">최근 지점 물류 공급 이력</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">HQ Distribution Profit Analysis (Total: 3,000+ Records)</p>
                </div>
                <button className="px-6 py-3 bg-[#0B0F1A] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                    CSV 경영 데이터 추출
                </button>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {['주문ID', '일시', '지점명', '품목명', '수량', '지점공급가', '본사구입가', '유통차익', '상태'].map(col => (
                                <th key={col} className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(data.recentOrders || []).map((order: any, idx: number) => (
                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="px-6 py-5 text-xs font-black text-gray-500">{order.order_id}</td>
                                <td className="px-6 py-5 text-xs font-bold text-gray-400 font-sans">{order.timestamp}</td>
                                <td className="px-6 py-5 text-xs font-black text-gray-800">{order.store_name}</td>
                                <td className="px-6 py-5 text-xs font-bold text-[#003B6D]">{order.item_name}</td>
                                <td className="px-6 py-5 text-xs font-black text-gray-600">{order.qty.toLocaleString()}</td>
                                <td className="px-6 py-5 text-xs font-black text-gray-900">{formatKoreanCurrency(order.total_price)}</td>
                                <td className="px-6 py-5 text-xs font-bold text-gray-500">{formatKoreanCurrency(order.purchase_cost)}</td>
                                <td className="px-6 py-5 text-xs font-black text-blue-600 bg-blue-50/50 group-hover:bg-blue-100/50 transition-colors">{formatKoreanCurrency(order.distribution_margin)}</td>
                                <td className="px-6 py-5">
                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full border border-green-100">
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
