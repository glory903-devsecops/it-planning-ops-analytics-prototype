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
                <div className="absolute inset-0 border-[6px] border-slate-100 rounded-full" />
                <div className="absolute inset-0 border-[6px] border-[#059669] border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(16,185,129,0.1)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="w-10 h-10 text-[#059669]" />
                </div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-[0.3em] italic">Synchronizing Logistics Core</h2>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest justify-center">
                    Connecting to SCM Global Data Stream
                </div>
            </div>
        </div>
      </DashboardLayout>
    );
  }

  const logisticsColumns = [
    { header: '품목명', accessor: 'item_name' as any, className: 'font-black text-slate-900 text-base' },
    { header: '지점명', accessor: 'store_name' as any, className: 'font-bold text-slate-500' },
    { header: '현재고', accessor: (item: any) => `${item.current_stock.toLocaleString()} EA`, className: 'font-black text-[#059669]' },
    { header: '가용재고', accessor: (item: any) => `${item.available_stock.toLocaleString()} EA`, className: 'font-bold text-slate-400' },
    { 
      header: '공급 가능일', 
      accessor: (item: any) => (
        <span className={`font-black tracking-tighter text-base ${item.days_of_cover < 3 ? 'text-[#DC2626]' : 'text-[#059669]'}`}>
          {item.days_of_cover}일
        </span>
      )
    },
    { 
      header: '공급 위험도', 
      accessor: (item: any) => (
        <div className="w-full flex flex-col gap-1.5 min-w-[120px]">
          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
             <span>Risk Score</span>
             <span className="text-slate-900">{item.stockout_risk_score}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                item.stockout_risk_score > 70 ? 'bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.2)]' : 'bg-[#059669]'
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
            ? 'bg-red-50 text-[#DC2626] border-red-100 shadow-sm' 
            : 'bg-slate-50 text-slate-400 border-slate-200'
        }`}>
          {item.recommended_order_priority}
        </span>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#059669] font-black text-[10px] tracking-[0.3em] uppercase">
                    <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full" />
                    Strategic Supply Chain Intelligence
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">물류 공급망 및 재고 통찰</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-2 h-2 bg-[#059669] rounded-full animate-pulse" />
                SCM CORE STATUS: <span className="text-slate-900 ml-1">OPTIMIZED</span>
            </div>
        </div>

        {/* 1. Executive Summary Block */}
        <ExecutiveSummaryBlock kpis={data.kpis} />

        {/* 2 & 3. Main Chart and AI Panel Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch">
            <div className="xl:col-span-8 flex flex-col h-full bg-white/80 rounded-[3rem] p-1 shadow-sm overflow-hidden border border-slate-100">
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
  );
}
