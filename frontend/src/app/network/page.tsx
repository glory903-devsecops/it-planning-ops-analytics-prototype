"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DecisionApplication } from '../../application/useCases';
import { ExecutiveSummaryBlock } from '../../components/dashboard/ExecutiveSummaryBlock';
import { DecisionStockChart } from '../../components/dashboard/DecisionStockChart';
import { AIAssistantPanel } from '../../components/ai/AIAssistantPanel';
import { DataTable } from '../../components/ui/DataTable';
import { usePagination } from '../../hooks/usePagination';

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
                <div className="absolute inset-0 border-[6px] border-white/5 rounded-full" />
                <div className="absolute inset-0 border-[6px] border-rose-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(244,63,94,0.4)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 text-rose-400" />
                </div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] italic">Synthesizing Network Fabric</h2>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest justify-center">
                    Analyzing Global Endpoint Topologies
                </div>
            </div>
        </div>
      </DashboardLayout>
    );
  }

  const aiResults = [
    {
      title: '결제 모듈 Latency Spike 탐지',
      hypothesis: '최근 배포된 /api/payment 로직의 특정 조건에서 DB 커넥션 풀 누수 발생 가능성.',
      recommendation: '모든 매장의 결제 트래픽을 즉시 마포 예비 센터(Ma-po DR)로 수동 절체(Failover)하고 핫픽스를 배포하세요.',
      metricReference: 'Latency 1,450ms (Avg 200ms), Impact Score 92',
      impactScore: 96
    },
    {
      title: '인접 매장 동시 통신 장애 분석',
      hypothesis: '강남구 일대 특정 ISP(인터넷 서비스 제공자)의 백본 장비 장애로 인한 통신 순회(Route flapping) 발생.',
      recommendation: '해당 지역 매장에 오프라인 POS 모드 전환을 공지하고 LTE 벡업 라인 가동 유무를 점검하세요.',
      metricReference: 'Impacted Stores 12, Availability 99.82%',
      impactScore: 72
    }
  ];

  const networkColumns = [
    { 
      header: '결제일자', 
      accessor: (item: any) => `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`,
      className: 'font-black text-slate-300'
    },
    { 
      header: '결제시간', 
      accessor: (item: any) => `${String(item.hour).padStart(2, '0')}:${String(item.minute).padStart(2, '0')}`,
      className: 'font-mono text-rose-400'
    },
    { header: '엔드포인트', accessor: 'endpoint_name' as any, className: 'font-black text-white text-base' },
    { header: 'API 경로', accessor: 'api_route' as any, className: 'text-slate-500 font-mono text-[10px] opacity-70' },
    { 
      header: '지연시간', 
      accessor: (item: any) => (
        <span className={`font-black text-lg ${item.latency_ms > 1000 ? 'text-rose-500 animate-pulse drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'text-emerald-400'}`}>
          {item.latency_ms}ms
        </span>
      )
    },
    { 
      header: '영향 지수', 
      accessor: (item: any) => (
        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
          item.impact_score > 50 
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]' 
            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
        }`}>
          Score: {item.impact_score.toFixed(0)}
        </span>
      )
    },
    { 
      header: 'Anomaly', 
      accessor: (item: any) => item.anomaly_flag ? (
        <span className="flex h-3 w-3 shadow-[0_0_15px_rgba(244,63,94,0.6)]">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
        </span>
      ) : <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">Normal</span>
    }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
                <div className="flex items-center gap-3 text-rose-400 font-black text-[10px] tracking-[0.3em] uppercase opacity-80">
                    <div className="w-10 h-[1.5px] bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                    Strategic Network Observability
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl italic">인프라 운영 및 이상 탐지</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-rose-400 glass-card px-5 py-2.5 rounded-2xl shadow-2xl border border-rose-500/20">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                SURVEILLANCE MODE: <span className="text-white ml-1 font-black">ACTIVE MONITORING</span>
            </div>
        </div>

        {/* 1. Executive Summary Block */}
        <ExecutiveSummaryBlock kpis={data.kpis} />

        {/* 2 & 3. Main Chart and AI Panel Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
            <div className="xl:col-span-8 flex flex-col h-full">
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
