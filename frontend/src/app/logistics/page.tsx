"use client";

import React, { useEffect, useState, useRef } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Clock, ChevronRight, Search, Download } from 'lucide-react';
import { logisticsService } from '../../services/logisticsService';
import { formatKoreanCurrency } from '../../lib/formatters';
import { PremiumStockChart } from '../../components/dashboard/PremiumStockChart';

export default function LogisticsPage() {
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "캠퍼스 상권의 '우유' 수요가 내일 오후 2시부터 급증할 것으로 예측됩니다. 선행 배차 승인을 권장합니다." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Pagination & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [displaySearchTerm, setDisplaySearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const initialData = await logisticsService.getInitialData();
        if (mounted) {
          setData(initialData);
          setHistory(initialData.timeSeriesData || []);
          logisticsService.connectSocket(
            (updatedData) => { if (mounted) setData({ ...updatedData }); },
            () => {}
          );
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

  useEffect(() => {
    const timer = setTimeout(() => {
        setSearchTerm(displaySearchTerm);
        setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [displaySearchTerm]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessages = [...messages, { role: 'user', content: inputValue }];
    setMessages(newMessages);
    setInputValue('');
    
    setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: 'ai', 
            content: `분석 결과, 현재 원두 공급 가격 하락 시점을 고려하여 주요 오피스 지점의 비축량을 20% 상향할 것을 제안합니다. 물류 비용 대비 기대 이익 상승률은 4.2%입니다.` 
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

  const chartFilters = [
    { label: '지점', options: data.availableStores || [], defaultValue: '강남본점' },
    { label: '품목', options: data.availableItems || [], defaultValue: '우유' }
  ];

  const filteredOrders = (data.recentOrders || []).filter((order: any) => {
    if (!searchTerm) return true;
    const lower = searchTerm.toLowerCase();
    return order.item_name.toLowerCase().includes(lower) || 
           order.store_name.toLowerCase().includes(lower) ||
           order.order_id.toLowerCase().includes(lower);
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <DashboardLayout>
      <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
            <div className="space-y-1">
                <div className="flex items-center gap-3 text-[#003B6D] font-black text-[9px] tracking-[0.3em] uppercase opacity-70">
                    <div className="w-10 h-[2px] bg-[#003B6D] rounded-full" />
                    EDIYA SCM Intelligence
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter">물류 공급망 인사이트</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 bg-white/50 border border-white/40 rounded-xl shadow-sm backdrop-blur-md flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Logistics Sync</span>
                </div>
            </div>
        </div>

        {/* KPI Row 1: 핵심 지표 3개 (가로 3단) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: '총 관리 매장', value: data.metrics.totalStores, unit: '개', trend: 'HQ Verified', isUp: true, color: 'text-[#003B6D]', bg: 'bg-blue-50/50' },
            { label: '재고 위험 매장', value: data.metrics.criticalStores, unit: '건', trend: 'ACTION REQ', isUp: false, color: 'text-red-600', bg: 'bg-red-50/50' },
            { label: '전국 평균 잔여량', value: '42.8%', unit: '', trend: '-2.1%', isUp: false, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
          ].map((kpi, idx) => (
            <div key={idx} className={`group relative border border-white/40 ${kpi.bg} backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] p-5 flex flex-col justify-center overflow-hidden h-[88px]`}>
              <div className="flex justify-between items-center z-10">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                  <h3 className={`text-2xl font-black tracking-tighter truncate ${kpi.color}`}>
                      {kpi.value}
                      {kpi.unit && <span className="text-sm ml-0.5 font-bold opacity-50">{kpi.unit}</span>}
                  </h3>
                </div>
                <div className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black tracking-tighter ${kpi.isUp ? 'text-blue-600 bg-blue-100/50' : 'text-red-600 bg-red-100/50'}`}>
                    {kpi.trend}
                </div>
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
                            placeholder="SCM 궁금점 질문하기..."
                            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 pr-20 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-gray-600 font-medium"
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
                         SCM 수익성 분석 리포트 생성
                         <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                </div>
             </div>
          </div>
        </div>

        {/* Logistics Table with Pagination & Search */}
        <div className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl rounded-[3rem] overflow-hidden p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 px-4 gap-6">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">지점별 물류 공급 실적 (SCM Data)</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">HQ Production Analysis (Total: {filteredOrders.length.toLocaleString()} Records)</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="지점, 품목, 주문ID 검색..."
                            value={displaySearchTerm}
                            onChange={(e) => setDisplaySearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-bold w-72 focus:ring-4 focus:ring-[#003B6D]/5 transition-all shadow-inner"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    </div>
                    <button className="px-6 py-3.5 bg-[#003B6D] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        CSV 데이터 추출
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar mb-8">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {['주문ID', '일시', '지점명', '품목명', '수량', '지점공급가', '본사구입가', '유통차익', '상태'].map(col => (
                                <th key={col} className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginatedOrders.map((order: any, idx: number) => (
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

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-8 border-t border-gray-50 bg-gray-50/50 rounded-b-3xl">
                <div className="flex items-center gap-3">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-400 hover:text-[#003B6D] hover:border-[#003B6D] transition-all disabled:opacity-20 translate-y-0 active:translate-y-1 shadow-sm"
                    >
                        PREV
                    </button>
                    <div className="flex items-center gap-2">
                        {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                            let p = currentPage;
                            if (currentPage <= 3) p = i + 1;
                            else if (currentPage >= totalPages - 2) p = totalPages - 4 + i;
                            else p = currentPage - 2 + i;
                            if (p <= 0 || p > totalPages) return null;
                            return (
                                <button 
                                    key={p} 
                                    onClick={() => setCurrentPage(p)}
                                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === p ? 'bg-[#003B6D] text-white shadow-lg' : 'bg-white text-gray-400 hover:text-gray-800'}`}
                                >
                                    {p}
                                </button>
                            );
                        })}
                    </div>
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-400 hover:text-[#003B6D] hover:border-[#003B6D] transition-all disabled:opacity-20 translate-y-0 active:translate-y-1 shadow-sm"
                    >
                        NEXT
                    </button>
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    SCM Record {Math.min(filteredOrders.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredOrders.length, currentPage * itemsPerPage)} of {filteredOrders.length.toLocaleString()}
                </div>
            </div>
        </div>

        {/* Logistics Report Modal */}
        {isReportOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsReportOpen(false)} />
                <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-500">
                    <div className="p-10 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-indigo-500/10">S</div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">SCM 수익성 및 공급망 최적화 리포트</h2>
                                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">EDIYA AX Logistics Suite • Data Verified</p>
                            </div>
                        </div>
                        <button onClick={() => setIsReportOpen(false)} className="px-6 py-3 bg-gray-100 hover:bg-red-50 hover:text-red-600 font-black rounded-2xl transition-all font-sans">CLOSE</button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12 bg-white">
                        <section className="space-y-6">
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter">I. 분기별 유통 차익 성과</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-10 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100/50">
                                    <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-2 font-sans">누적 유통 총 차익 (Est.)</p>
                                    <p className="text-4xl font-black text-indigo-600 tracking-tight">₩14,250,000</p>
                                    <p className="text-xs font-bold text-indigo-400 mt-2">+5.2% against last month</p>
                                </div>
                                <div className="p-10 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50">
                                    <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-2 font-sans">공급망 효율 지수</p>
                                    <p className="text-4xl font-black text-blue-600 tracking-tight">98.2 pt</p>
                                    <p className="text-xs font-bold text-blue-400 mt-2">Optimal Efficiency Range</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1 bg-indigo-600 rounded-full" />
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">II. SCM 최적화 제안</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { title: '원유 수급 다변화', desc: '현재 특정 공급사 의존도를 15% 낮추고 지역별 로컬 파트너십을 체결하여 배송 지연 리스크를 22% 감소시켰습니다.' },
                                    { title: '원두 원가 절감 반영', desc: '국제 원두 시세 하락을 반영하여 가맹점 공급가를 동결하되, 물류 효율화를 통해 유통 수익을 보전했습니다.' },
                                    { title: '친환경 부자재 도입', desc: '종이컵 및 리드의 환경 분담금 발생분을 AI 예측 기반 선매입을 통해 원가 상승분을 전액 상쇄했습니다.' }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-gray-50 border border-gray-100 rounded-[2rem] hover:bg-white hover:border-indigo-200 transition-all group">
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-indigo-600 text-xs shadow-sm">{i+1}</div>
                                            <div className="space-y-1">
                                                <h4 className="font-black text-lg text-gray-900">{item.title}</h4>
                                                <p className="text-gray-500 font-medium leading-relaxed font-sans">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="p-10 border-t border-gray-100 bg-gray-50 shrink-0 flex items-center justify-between">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-sans">HQ Logistics System Powered by EDIYA AX Autonomous Core</p>
                        <div className="flex gap-4">
                             <button className="px-8 py-4 bg-white border border-gray-200 text-gray-600 font-black rounded-2xl hover:bg-gray-100 transition-all font-sans">DOWNLOAD CSV</button>
                             <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:shadow-indigo-900/30 transition-all flex items-center gap-2 font-sans">
                                PRINT STRATEGY
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </DashboardLayout>
  );
}
