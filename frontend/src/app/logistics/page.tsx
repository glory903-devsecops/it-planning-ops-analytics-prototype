"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DecisionApplication } from '../../application/useCases';
import { ExecutiveSummaryBlock } from '../../components/dashboard/ExecutiveSummaryBlock';
import { DecisionStockChart } from '../../components/dashboard/DecisionStockChart';
import { AIAssistantPanel } from '../../components/ai/AIAssistantPanel';
import { DataTable } from '../../components/ui/DataTable';
import { usePagination } from '../../hooks/usePagination';

export default function LogisticsInsightPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const {
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    handlePageChange,
    paginatedData,
    totalRecords,
    itemsPerPage
  } = usePagination(data?.inventory || [], 12);

  useEffect(() => {
    async function loadData() {
      const dashboard = await DecisionApplication.getLogisticsDashboard();
      setData(dashboard);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full space-y-8 animate-pulse">
            <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-[6px] border-white/5 rounded-full" />
                <div className="absolute inset-0 border-[6px] border-emerald-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(16,185,129,0.4)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 text-emerald-400" />
                </div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] italic">Synchronizing Logistics Core</h2>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest justify-center">
                    Connecting to SCM Global Data Stream
                </div>
            </div>
        </div>
      </DashboardLayout>
    );
  }

  const aiResults = [
    {
      title: '재고 부족 위험(Stockout Risk) 경보',
      hypothesis: '아메리카노 원두 소진 속도가 예측치보다 25% 빠름. 대학가 상권의 주말 수요 폭증 영향.',
      recommendation: '안암역점 및 홍대입구역점에 원두 50kg 즉시 배차를 승인하고 발주 우선순위를 "Critical"로 조정하세요.',
      metricReference: 'Risk Score 84/100, DoC 1.2 days',
      impactScore: 94
    },
    {
      title: '물류 센터 적재 효율화 제안',
      hypothesis: '시즌 메뉴용 부자재 적재 공간 점유율이 90%에 육박하여 운영 효율 저하 발생.',
      recommendation: '장기 적재중인 비핵심 비품을 인근 예비 창고로 이전하고 피킹(Picking) 경로를 최적화하세요.',
      metricReference: 'Capacity Status 89%, Efficiency -12%',
      impactScore: 78
    }
  ];

  const logisticsColumns = [
    { header: '품목명', accessor: 'item_name' as any, className: 'font-black text-white text-base' },
    { header: '지점명', accessor: 'store_name' as any, className: 'font-bold' },
    { header: '현재고', accessor: (item: any) => `${item.current_stock.toLocaleString()} EA`, className: 'font-black text-emerald-400' },
    { header: '가용재고', accessor: (item: any) => `${item.available_stock.toLocaleString()} EA`, className: 'font-bold text-slate-300' },
    { 
      header: '공급 가능일', 
      accessor: (item: any) => (
        <span className={`font-black tracking-tighter text-base ${item.days_of_cover < 3 ? 'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'text-emerald-400'}`}>
          {item.days_of_cover}일
        </span>
      )
    },
    { 
      header: '공급 위험도', 
      accessor: (item: any) => (
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
             <span>Risk Score</span>
             <span>{item.stockout_risk_score}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                item.stockout_risk_score > 70 ? 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-gradient-to-r from-emerald-500 to-teal-600'
              }`} 
              style={{ width: `${item.stockout_risk_score}%` }} 
            />
          </div>
        </div>
      )
    },
    { 
      header: '우선순위', 
      accessor: (item: any) => (
        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
          item.recommended_order_priority === 'Critical' 
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]' 
            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
        }`}>
          {item.recommended_order_priority}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
                <div className="flex items-center gap-3 text-emerald-400 font-black text-[10px] tracking-[0.3em] uppercase opacity-80">
                    <div className="w-10 h-[1.5px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Strategic Supply Chain Intel
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl italic">물류 공급망 및 재고 통찰</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 glass-card px-5 py-2.5 rounded-2xl shadow-2xl border border-white/5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                LOGISTICS STATUS: <span className="text-white ml-1">OPTIMIZED</span>
            </div>
        </div>

        {/* 1. Executive Summary Block */}
        <ExecutiveSummaryBlock kpis={data.kpis} />

        {/* 2 & 3. Main Chart and AI Panel Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
            <div className="xl:col-span-8 flex flex-col h-full">
                <DecisionStockChart 
                    title="재고 변동 및 공급 압력 지수" 
                    data={Array.from({length: 24}, (_, i) => ({ time: `${i}:00`, value: 80 - (Math.random() * 20) }))} 
                    unit="%"
                />
            </div>
            <div className="xl:col-span-4 flex flex-col h-full">
                <AIAssistantPanel />
            </div>
        </div>

        {/* 4. Operational Data Table */}
        <DataTable 
          title="재고 현황 및 보충 권고 (SCM Snapshot)"
          subtitle="전국 매장 원부자재 가용량 및 품절 위험도 분석"
          data={paginatedData}
          columns={logisticsColumns}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
          itemsPerPage={itemsPerPage}
          onExportCsv={() => DecisionApplication.exportToCSV(data.inventory, 'logistics_analytics_export')}
        />

      </div>
    </DashboardLayout>
  );
}
