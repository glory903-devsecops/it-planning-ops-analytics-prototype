"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DecisionApplication } from '../../application/useCases';
import { ExecutiveSummaryBlock } from '../../components/dashboard/ExecutiveSummaryBlock';
import { DecisionStockChart } from '../../components/dashboard/DecisionStockChart';
import { AIAssistantPanel } from '../../components/ai/AIAssistantPanel';
import { DataTable } from '../../components/ui/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Zap } from 'lucide-react';

export default function NetworkInsightPage() {
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
  } = usePagination(data?.events || [], 12);

  useEffect(() => {
    async function loadData() {
      const dashboard = await DecisionApplication.getNetworkDashboard();
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
                <div className="absolute inset-0 border-[6px] border-[#DC2626] border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(220,38,38,0.1)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-[#DC2626]" />
                </div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-[0.3em] italic">Synthesizing Network Fabric</h2>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest justify-center">
                    Analyzing Global Endpoint Topologies
                </div>
            </div>
        </div>
      </DashboardLayout>
    );
  }

  const networkColumns = [
    { 
      header: '일자', 
      accessor: (item: any) => `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`,
      className: 'font-bold text-slate-400'
    },
    { 
      header: '시간', 
      accessor: (item: any) => `${String(item.hour).padStart(2, '0')}:${String(item.minute).padStart(2, '0')}`,
      className: 'font-mono text-slate-900 font-black'
    },
    { header: '엔드포인트', accessor: 'endpoint_name' as any, className: 'font-black text-slate-900 text-base' },
    { header: 'API 경로', accessor: 'api_route' as any, className: 'text-slate-400 font-mono text-[10px] font-bold' },
    { 
      header: '지연시간', 
      accessor: (item: any) => (
        <span className={`font-black text-lg ${item.latency_ms > 1000 ? 'text-[#DC2626] animate-pulse' : 'text-[#059669]'}`}>
          {item.latency_ms}ms
        </span>
      )
    },
    { 
      header: '영향 지수', 
      accessor: (item: any) => (
        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
          item.impact_score > 50 
            ? 'bg-red-50 text-[#DC2626] border-red-100 shadow-sm' 
            : 'bg-slate-50 text-slate-400 border-slate-200'
        }`}>
          Score: {item.impact_score.toFixed(0)}
        </span>
      )
    },
    { 
      header: 'Anomaly', 
      accessor: (item: any) => item.anomaly_flag ? (
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]"></span>
        </span>
      ) : <span className="text-[#059669] font-black text-[10px] uppercase tracking-widest">Normal</span>
    }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#DC2626] font-black text-[10px] tracking-[0.3em] uppercase">
                    <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-red-600 rounded-full" />
                    Strategic Network Observability
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">인프라 운영 및 이상 탐지</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-[#DC2626] bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                SURVEILLANCE MODE: <span className="text-slate-900 ml-1 font-black">ACTIVE MONITORING</span>
            </div>
        </div>

        {/* 1. Executive Summary Block */}
        <ExecutiveSummaryBlock kpis={data.kpis} />

        {/* 2 & 3. Main Chart and AI Panel Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch">
            <div className="xl:col-span-8 flex flex-col h-full bg-white/80 rounded-[3rem] p-1 shadow-sm overflow-hidden border border-slate-100">
                <DecisionStockChart 
                    title="API 응답 지연 및 가용성 트렌드 (ms)" 
                    data={Array.from({length: 24}, (_, i) => ({ time: `${i}:00`, value: 100 + (Math.random() * 900) }))} 
                    unit="ms"
                />
            </div>
            <div className="xl:col-span-4 flex flex-col h-full">
                <AIAssistantPanel />
            </div>
        </div>

        {/* 4. Operational Data Table */}
        <DataTable 
          title="네트워크 이벤트 및 장애 로그 (Observability Logs)"
          subtitle="실시간 API 통신 품질 및 트랜잭션 영향 범위 추적"
          data={paginatedData}
          columns={networkColumns}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
          itemsPerPage={itemsPerPage}
          onExportCsv={() => DecisionApplication.exportToCSV(data.events, 'network_analytics_export')}
        />

      </div>
    </DashboardLayout>
  );
}
