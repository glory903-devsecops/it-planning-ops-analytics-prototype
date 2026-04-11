"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Activity, ChevronRight } from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { formatKoreanCurrency } from '../lib/formatters';
import { PremiumStockChart } from '../components/dashboard/PremiumStockChart';
import { RecentIncidents } from '../components/dashboard/RecentIncidents';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState([
    { role: 'ai', content: "현재 대학가 상권(신촌역점, 홍대입구역점)에서 오후 시간대 진입과 함께 '초당옥수수 1인빙수'의 주문량이 급증하고 있습니다." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);

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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessages = [...messages, { role: 'user', content: inputValue }];
    setMessages(newMessages);
    setInputValue('');
    
    // Simulate AI thinking and response
    setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: 'ai', 
            content: `분석 결과, 해당 지점들의 재고 현황은 안정적이나 피크 타임 대비 인력 배치가 부족할 것으로 예상됩니다. 추가 인력 지원 및 모바일 쿠폰 발송을 통한 분산 유도를 제안합니다.` 
        }]);
    }, 1000);
  };

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

  const topKpiData = [
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
    { label: '메뉴', options: ['전체 품목', ...data.availableItems], defaultValue: '전체 품목' },
    { label: '지점', options: ['전체 지점', ...data.availableStores], defaultValue: '전체 지점' },
    { label: '채널', options: ['전체 채널', ...data.availableChannels], defaultValue: '전체 채널' }
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

        {/* KPI Row 1: 핵심 지표 3개 (가로 3단) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topKpiData.map((kpi, idx) => (
            <div key={idx} className={`group relative border border-white/40 ${kpi.bg} backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] p-5 flex flex-col justify-center overflow-hidden h-[88px]`}>
              <div className="flex justify-between items-center z-10">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                  <h3 className={`font-black tracking-tighter truncate ${kpi.color} ${kpi.label.includes('매출액') ? 'text-lg' : 'text-2xl'}`}>
                      {kpi.value}
                      {kpi.unit && <span className="text-sm ml-0.5 font-bold opacity-50">{kpi.unit}</span>}
                  </h3>
                </div>
                <div className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black tracking-tighter ${kpi.isUp ? 'text-green-600 bg-green-100/50' : 'text-red-600 bg-red-100/50'}`}>
                    {kpi.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* KPI Row 2: 최근 인기 품목 Top 5 (와이드 카드) */}
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
            <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black tracking-tighter text-amber-600 bg-amber-100/50">
                BEST
            </div>
          </div>
        </div>

        {/* Main Analytics Content */}
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
             <div className="bg-[#0B0F1A]/95 border border-white/10 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group h-[725px] flex flex-col justify-between backdrop-blur-2xl">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-1000" />
                
                {/* Header */}
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl ring-4 ring-blue-500/10 group-hover:rotate-12 transition-transform">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl tracking-tight">AI STRATEGY LAB</h4>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest opacity-60">Decision Core Online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Message Area (Scrollable) */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar mb-6 relative z-10">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                            <div className={`p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed max-w-[85%] ${msg.role === 'user' ? 'bg-[#003B6D] text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="relative z-10 pt-4 border-t border-white/5">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="AI에게 전략 질문하기..."
                            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 pr-20 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-600 font-medium"
                        />
                        <button 
                            onClick={handleSendMessage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white text-[#0B0F1A] rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl group/btn"
                        >
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    
                    <button 
                        onClick={() => setIsReportOpen(true)}
                        className="w-full mt-6 py-4 bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group"
                    >
                         전략 리포트 정식 생성하기
                         <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                </div>
             </div>
          </div>
        </div>

        {/* Strategy Report Modal */}
        {isReportOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsReportOpen(false)} />
                <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-500">
                    <div className="p-10 border-b border-gray-100 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#003B6D] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-blue-500/10">E</div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">경영 전략 통합 주간 리포트</h2>
                                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">EDIYA AX Decision Core • Confidential</p>
                            </div>
                        </div>
                        <button onClick={() => setIsReportOpen(false)} className="px-6 py-3 bg-gray-100 hover:bg-red-50 hover:text-red-600 font-black rounded-2xl transition-all">CLOSE</button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12">
                        <section className="space-y-6">
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter">I. 총괄 실적 요약</h3>
                            <div className="grid grid-cols-3 gap-8">
                                <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100/50">
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">분석 기간 매출액</p>
                                    <p className="text-3xl font-black text-[#003B6D] tracking-tight">{formatKoreanCurrency(data.metrics.totalSales)}</p>
                                </div>
                                <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100/50">
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">평균 주문 건수</p>
                                    <p className="text-3xl font-black text-emerald-600 tracking-tight">{data.metrics.totalOrders.toLocaleString()}건</p>
                                </div>
                                <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100/50">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">AI 성과 기여도</p>
                                    <p className="text-3xl font-black text-indigo-600 tracking-tight">94.8%</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter">II. 데이터 기반 핵심 전략</h3>
                            <div className="space-y-4">
                                {[
                                    { title: '수요 예측 최적화', content: '강남본점 및 홍대입구역점의 피크 타임 대비 원재료 공급 주기를 15% 단축하여 품절률을 0.2%로 방어했습니다.' },
                                    { title: '디지털 채널 확장', content: '키오스크 비중이 높은 매장의 UI/UX 개선을 통해 주문 리드타임을 평균 12초 단축하는 성과를 거두었습니다.' },
                                    { title: '시즌 메뉴 프로모션', content: '신규 빙수 라인업과 베이커리 결합 상품의 구매 전환율이 전년 대비 18% 상승하며 객단가 방어에 성공했습니다.' }
                                ].map((item, i) => (
                                    <div key={i} className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                                        <h4 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 font-medium leading-relaxed">{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="p-10 border-t border-gray-100 bg-gray-50/50 shrink-0 flex items-center justify-between">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Generated by EDIYA AX Autonomous Intelligence Core v4.2</p>
                        <button className="px-8 py-4 bg-[#003B6D] text-white font-black rounded-2xl shadow-lg hover:shadow-blue-900/30 transition-all flex items-center gap-2">
                            REPORT PRINT / PDF
                        </button>
                    </div>
                </div>
            </div>
        )}

        <RecentIncidents incidents={data.recentSales} />

      </div>
    </DashboardLayout>
  );
}
