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
        <div className="flex items-center justify-center h-full">
           <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#003B6D] border-t-transparent rounded-full animate-spin"></div>
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
    { header: '시각', accessor: (item: any) => `${item.hour}:${item.minute}`, className: 'font-bold' },
    { header: '엔드포인트', accessor: 'endpoint_name' as any, className: 'font-black' },
    { header: 'API 경로', accessor: 'api_route' as any, className: 'text-gray-400 font-mono text-[10px]' },
    { 
      header: '지연시간', 
      accessor: (item: any) => (
        <span className={`font-black ${item.latency_ms > 1000 ? 'text-red-600' : 'text-[#003B6D]'}`}>
          {item.latency_ms}ms
        </span>
      )
    },
    { header: '상태코드', accessor: 'status_code' as any },
    { 
      header: '영향 지수', 
      accessor: (item: any) => (
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
          item.impact_score > 50 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-gray-400'
        }`}>
          Score: {item.impact_score.toFixed(0)}
        </span>
      )
    },
    { 
      header: 'Anomaly', 
      accessor: (item: any) => item.anomaly_flag ? (
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
      ) : <span className="text-green-500 font-black">NORMAL</span>
    }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-red-600 font-black text-[9px] tracking-[0.2em] uppercase opacity-70">
                    <div className="w-8 h-[2px] bg-red-600" />
                    EDIYA Network Infrastructure Intelligence
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter">인프라 운영 및 이상 탐지</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-red-600 bg-red-50 px-4 py-2 rounded-2xl border border-red-100 shadow-sm backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                장애 관측 모드: <span className="font-black ml-1 uppercase">Active Monitoring</span>
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
