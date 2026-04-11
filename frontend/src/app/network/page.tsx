"use client";

import React, { useEffect, useState, useRef } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Server, Activity, ArrowDownCircle, Settings, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { networkService } from '../../services/networkService';
import { PremiumStockChart } from '../../components/dashboard/PremiumStockChart';

export default function NetworkPage() {
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<any[]>([]);
  const incidentSet = useRef(new Set<string>());

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const initialData = await networkService.getInitialData();
        if (mounted) {
          setData(initialData);
          setHistory(initialData.timeSeriesData || []);

          networkService.connectSocket(
            (updatedData) => {
              if (mounted) setData({ ...updatedData });
            },
            (newIncident) => {
              if (mounted) {
                const key = `${newIncident.timestamp}-${newIncident.service}`;
                if (!incidentSet.current.has(key)) {
                  incidentSet.current.add(key);
                  setIncidents(prev => [newIncident, ...prev].slice(0, 10));
                }
              }
            }
          );

          // Listen for history updates
          // @ts-ignore
          networkService.socket?.on('network_history_update', (newHistory) => {
            if (mounted) setHistory(newHistory);
          });
        }
      } catch (error) {
        console.error("Failed to load network data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();

    return () => {
      mounted = false;
      networkService.disconnect();
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
    { label: '서비스', options: data.availableServices || [], defaultValue: 'POS 연동 서버' }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#003B6D] font-black text-[9px] tracking-[0.2em] uppercase opacity-70">
                    <div className="w-8 h-[2px] bg-[#003B6D]" />
                    EDIYA NETWORK Intelligence
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">인프라 운영 인사이트</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 bg-white/50 px-4 py-1.5 rounded-xl border border-white/40 shadow-sm backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                시스템 상태: <span className="text-green-600 ml-1">{data.metrics.systemHealth === '건강(정상)' ? '최적화' : '주의'}</span>
            </div>
        </div>

        {/* KPI Cards - 2x2 High Density Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: '시스템 헬스', value: data.metrics.systemHealth, unit: '', color: data.metrics.systemHealth === '위험' ? 'text-red-600' : 'text-green-600', bg: data.metrics.systemHealth === '위험' ? 'bg-red-50/50' : 'bg-green-50/50' },
            { label: '평균 응답 지연', value: data.metrics.avgLatencyMs, unit: 'ms', color: 'text-blue-600', bg: 'bg-blue-50/50' },
            { label: '연동 에러율 (1h)', value: data.metrics.errorRatePct, unit: '', color: 'text-orange-600', bg: 'bg-orange-50/50' },
            { label: '운영 연계 API', value: data.metrics.totalApis, unit: 'EA', color: 'text-indigo-600', bg: 'bg-indigo-50/50' }
          ].map((kpi, idx) => (
            <div key={idx} className={`group relative border border-white/40 ${kpi.bg} backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] p-5 flex flex-col justify-center overflow-hidden h-24`}>
              <div className="flex justify-between items-center z-10">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                  <h3 className={`text-2xl font-black tracking-tighter truncate ${kpi.color}`}>
                      {kpi.value}
                      {kpi.unit && <span className="text-sm ml-0.5 font-bold opacity-50">{kpi.unit}</span>}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & AI Insights Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="xl:col-span-2 space-y-10">
            <PremiumStockChart 
              title="API 응답 지연(Latency) 트렌드"
              data={history}
              filters={chartFilters}
              unit="ms"
            />
          </div>

          <div className="xl:col-span-1">
             <div className="bg-[#0B0F1A] border border-white/10 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] group-hover:bg-red-600/20 transition-all duration-1000" />
                <div className="relative z-10 space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-xl ring-4 ring-red-500/10 group-hover:rotate-12 transition-transform">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl tracking-tight uppercase">Infra Observer AI</h4>
                                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest opacity-60">Anomaly Detection Core</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-7 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4 hover:bg-white/10 transition-colors cursor-pointer group/card">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                <p className="text-[11px] font-black text-red-400 uppercase tracking-widest">Latency Spike Detected</p>
                            </div>
                            <p className="text-sm font-medium text-gray-300 leading-relaxed font-sans">
                                ⚠️ <span className="text-red-400 font-black underline underline-offset-4 font-sans">'배달 플랫폼 API'</span> 지연시간이 폭증하고 있습니다 (Avg 1,450ms). Failover 실행을 권장합니다.
                            </p>
                        </div>

                        <div className="p-7 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4 hover:bg-white/10 transition-colors cursor-pointer group/card">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                <p className="text-[11px] font-black text-orange-400 uppercase tracking-widest">Network Congestion</p>
                            </div>
                            <p className="text-sm font-medium text-gray-300 leading-relaxed font-sans">
                                서초 데이터센터 백본 스위치에서 패킷 드롭이 감지되었습니다. 트래픽을 즉시 마포 예비 센터로 절체하시겠습니까?
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-10 z-10 mt-auto">
                    <button className="w-full py-5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-3xl text-[12px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-red-500/30 flex items-center justify-center gap-3 group/btn">
                        FAILOVER 즉시 실행
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Error Log Table */}
        <div className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden transition-all duration-300">
            <div className="p-8 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/80 to-transparent flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="p-2.5 bg-red-50 rounded-2xl">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800 tracking-tight">이상 징후 로깅 추적 (Anomaly Logs)</h3>
                </div>
            </div>
            <div className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black border-b border-gray-100">
                        <tr>
                            <th className="py-6 px-10">탐지 시각</th>
                            <th className="py-6 px-10">대상 서비스</th>
                            <th className="py-6 px-10">장애 유형</th>
                            <th className="py-6 px-10">상세 보고</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {incidents.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center opacity-20 grayscale">
                                        <ShieldCheck className="w-12 h-12 mb-4 text-green-500" />
                                        <p className="text-gray-500 text-xs font-black tracking-widest uppercase">현재 위협 요소 없음</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            incidents.map((incident, idx) => (
                                <tr key={idx} className="group hover:bg-white transition-all duration-300">
                                    <td className="py-6 px-10">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-black group-hover:text-[#003B6D] transition-colors">{incident.timestamp.split(' ')[1]}</span>
                                            <span className="text-[10px] text-gray-400 font-bold">{incident.timestamp.split(' ')[0]}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-10 text-gray-800 font-black tracking-tight">{incident.service}</td>
                                    <td className="py-6 px-10">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                            incident.status.includes('Timeout') 
                                                ? 'bg-red-50 text-red-600 border border-red-100 shadow-sm' 
                                                : 'bg-orange-50 text-orange-600 border border-orange-100 shadow-sm'
                                        }`}>
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-10 text-gray-500 font-bold text-xs leading-relaxed max-w-sm">{incident.message}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Sub Metric Card */}
        <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/60 shadow-xl flex flex-col items-center justify-center text-center group hover:shadow-2xl transition-all duration-500 max-w-sm mx-auto">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 transition-all group-hover:rotate-[360deg] duration-1000 shadow-inner">
                <ArrowDownCircle className="w-10 h-10 text-[#003B6D]" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Infrastructure Data</p>
            <h4 className="text-lg font-black text-gray-800 tracking-tight">운영 안전성 리포트 (Weekly)</h4>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-black text-[#003B6D] opacity-40 group-hover:opacity-100 transition-opacity">
                DOWNLOAD PDF <ChevronRight className="w-4 h-4" />
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ChevronRight(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
  }
