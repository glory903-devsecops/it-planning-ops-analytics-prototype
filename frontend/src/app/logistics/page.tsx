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
      <div className="w-full space-y-8 animate-in fade-in duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#003B6D] font-black text-xs tracking-[0.2em] uppercase">
                    <div className="w-8 h-[2px] bg-[#003B6D]" />
                    EDIYA SCM Intelligence
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">물류 공급망 인사이트</h1>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 bg-white/50 px-4 py-2 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                마지막 동기화: {new Date().toLocaleTimeString()}
            </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: '총 관리 매장', value: data.metrics.totalStores, unit: '개', icon: Package, color: 'blue' },
            { label: '재고 위험 매장', value: data.metrics.criticalStores, unit: '건', icon: AlertOctagon, color: 'red', alert: true },
            { label: '전국 평균 잔여량', value: data.metrics.avgStockLevel, unit: '', icon: TrendingDown, color: 'indigo' },
            { label: 'AI 자동 발주 건수', value: data.metrics.pendingOrders, unit: '건', icon: Clock, color: 'green' }
          ].map((kpi, idx) => (
            <div key={idx} className="group relative border border-white/40 bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 rounded-[2rem] p-7 flex items-center justify-between overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: kpi.color === 'red' ? '#ef4444' : '#003B6D' }} />
              <div className="z-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-gray-600 transition-colors">{kpi.label}</p>
                <h3 className={`text-4xl font-black tracking-tight ${kpi.color === 'red' ? 'text-red-600' : 'text-gray-800'}`}>
                    {kpi.value}<span className="text-lg ml-1 font-bold opacity-60">{kpi.unit}</span>
                </h3>
              </div>
              <div className={`p-4 rounded-2xl shadow-inner ring-1 transition-all duration-500 group-hover:scale-110 ${
                kpi.color === 'red' ? 'bg-red-50 ring-red-100 text-red-500' : 
                kpi.color === 'green' ? 'bg-green-50 ring-green-100 text-green-500' : 'bg-blue-50 ring-blue-100 text-[#003B6D]'
              }`}>
                <kpi.icon className={`w-7 h-7 ${kpi.alert ? 'animate-pulse' : ''}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Analytics Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
        {/* Main Analytics Content Container */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="xl:col-span-2 space-y-10">
            {/* Time-series Chart */}
            <PremiumStockChart 
              title="지점별 원부자재 재고 변동 트렌드"
              data={history}
              filters={chartFilters}
              unit="%"
            />
          </div>

          <div className="xl:col-span-1">
             <div className="bg-[#0B0F1A] border border-white/10 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-1000" />
                <div className="relative z-10 space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-[#003B6D] to-blue-500 rounded-2xl shadow-xl ring-4 ring-blue-500/10 group-hover:rotate-12 transition-transform">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl tracking-tight">SCM OPTIMIZER</h4>
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest opacity-60">Logistics Neural Core</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-7 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4 hover:bg-white/10 transition-colors cursor-pointer group/card">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest">Early Dispatch Advice</p>
                            </div>
                            <p className="text-sm font-medium text-gray-300 leading-relaxed font-sans">
                                캠퍼스 상권의 <span className="text-blue-400 font-black underline underline-offset-4 font-sans">'우유'</span> 수요가 내일 오후 2시부터 급증할 것으로 예측됩니다. 선행 배차 승인을 권장합니다.
                            </p>
                        </div>

                        <div className="p-7 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4 hover:bg-white/10 transition-colors cursor-pointer group/card">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                <p className="text-[11px] font-black text-red-400 uppercase tracking-widest">Stock Out Prevention</p>
                            </div>
                            <p className="text-sm font-medium text-gray-300 leading-relaxed font-sans">
                                홍대입구역점의 '종이컵' 재고가 영업 종료 전 소진될 확률이 85%입니다. 인근 화곡 허브에서 긴급 수송이 필요합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-10 z-10 mt-auto">
                    <button className="w-full py-5 bg-white text-[#0B0F1A] rounded-3xl text-[12px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3 group/btn">
                        자동 발주 프로세스 승인
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
          </div>
        </div>

            {/* Inventory Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.inventories.slice(0, 4).map((inv: any, idx: number) => (
                    <div key={idx} className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-8 space-y-6 hover:shadow-2xl transition-all duration-500 group">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xl font-black text-gray-800 group-hover:text-[#003B6D] transition-colors">{inv.storeName}</h4>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="space-y-5">
                            {inv.items.map((item: any, iIdx: number) => {
                                const pct = Math.round((item.stock / item.maxStock) * 100);
                                const isCritical = pct <= item.threshold * 100;
                                return (
                                    <div key={iIdx} className="space-y-2">
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
                                            <span className="text-gray-400">{item.name}</span>
                                            <span className={isCritical ? 'text-red-500 animate-pulse' : 'text-[#003B6D]'}>{pct}%</span>
                                        </div>
                                        <div className="h-3 bg-gray-100/50 rounded-full overflow-hidden p-0.5 shadow-inner">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-1000 shadow-sm ${
                                                    isCritical ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-[#003B6D] to-blue-400'
                                                }`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="xl:col-span-1 space-y-8">
            {/* Real-time Alerts */}
            <div className="border border-red-100/30 bg-white/80 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-red-50 bg-red-50/20 flex items-center justify-between">
                    <h3 className="font-black text-red-800 flex items-center gap-3 text-lg tracking-tight">
                        <span className="relative flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                        </span>
                        실시간 AI 발주 알림
                    </h3>
                </div>
                <div className="p-8 space-y-5 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {alerts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 opacity-20 grayscale">
                            <Package className="w-16 h-16 mb-4 text-gray-400" />
                            <p className="text-gray-500 text-sm font-black tracking-widest">SYSTEM STATUS: OPTIMAL</p>
                        </div>
                    ) : (
                        alerts.map((alert, idx) => (
                            <div key={idx} className="p-6 bg-white border border-red-50 rounded-3xl flex gap-5 animate-in slide-in-from-bottom-4 duration-700 shadow-sm group hover:border-red-200 transition-all">
                                <div className="p-3 bg-red-500 rounded-2xl shrink-0 h-fit text-white shadow-xl shadow-red-200 group-hover:rotate-12 transition-transform">
                                    <AlertOctagon className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-black text-gray-900 text-sm">{alert.store} 지점 <span className="text-red-600">[{alert.item}]</span></p>
                                    <p className="text-xs text-gray-500 font-bold leading-relaxed">
                                        현재 잔여량 <span className="text-red-500 underline underline-offset-4">{Math.round(alert.currentPct * 100)}%</span> 도달. 
                                        차량 자동 배차 프로세스가 생성되었습니다.
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* SCM Master AI - Premium Dark */}
            <div className="bg-[#0B0F1A] border border-white/10 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-1000" />
                <div className="relative z-10 space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-[#003B6D] to-blue-500 rounded-2xl shadow-xl ring-4 ring-blue-500/10">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black text-lg tracking-tight">SCM OPTIMIZER</h4>
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Neural Core</p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] font-black tracking-widest text-white/40">v4.2.0</div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md space-y-4">
                        <p className="text-sm font-medium text-gray-300 leading-relaxed">
                            캠퍼스 상권의 <span className="text-blue-400 font-black underline underline-offset-4 font-sans">'우유'</span> 수요가 내일 오후 2시부터 급증할 것으로 예측됩니다.
                        </p>
                        <div className="h-[1px] bg-white/10 w-full" />
                        <p className="text-xs text-gray-500 font-bold">
                            전국 물류 허브 센터에서 해당 지점의 <span className="text-white">선행 배차</span>를 자동 승인하시겠습니까?
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <button className="py-4 bg-white text-[#0B0F1A] rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-xl">배차 자동 승인</button>
                        <button className="py-4 bg-white/5 border border-white/10 text-white/40 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">수동 확인</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
