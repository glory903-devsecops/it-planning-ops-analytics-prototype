"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DecisionApplication } from '../application/useCases';
import { ExecutiveSummaryBlock } from '../components/dashboard/ExecutiveSummaryBlock';
import { DecisionStockChart } from '../components/dashboard/DecisionStockChart';
import { AIAssistantPanel } from '../components/ai/AIAssistantPanel';
import { SalesStrategyAdvisor } from '../components/dashboard/SalesStrategyAdvisor';
import { DataTable } from '../components/ui/DataTable';
import { usePagination } from '../hooks/usePagination';
import { Database, ShieldAlert, Cpu } from 'lucide-react';

export default function SalesInsightPage() {
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
  } = usePagination(data?.recentSales || [], 12);

  useEffect(() => {
    async function loadData() {
      const dashboard = await DecisionApplication.getSalesDashboard();
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
                <div className="absolute inset-0 border-[6px] border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(56,189,248,0.4)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-blue-400" />
                </div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] italic">Initializing Intelligence Core</h2>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest justify-center">
                    <Database className="w-3 h-3" />
                    Connecting to Ediya AX Secure Stream
                </div>
            </div>
        </div>
      </DashboardLayout>
    );
  }

  const aiResults = [
    {
      title: '메트로 지역 매출 급증 분석',
      hypothesis: '아메리카노 할인 프로모션이 오피스 밀집 지역의 점심 피크 타임 트래픽을 유도함.',
      recommendation: '강남 및 여의도 지역 매장에 원두 재고를 15% 선제 보완하고 파트너 배치를 조정하세요.',
      metricReference: 'Trend Index +12.5%, Metro Revenue +18%',
      impactScore: 85
    },
    {
      title: '계절 메뉴 이상 주문 감지',
      hypothesis: '초당옥수수 빙수의 SNS 바이럴로 인해 대학가 상권(안암, 홍대)에서 재고 부족 위험 발생.',
      recommendation: '해당 상권의 물류 우선순위를 "Critical"로 격상하고 물류 차량을 추가 배차하세요.',
      metricReference: 'Item Growth +42%, Inventory Pressure High',
      impactScore: 92
    }
  ];

  const salesColumns = [
    { 
      header: '결제일자', 
      accessor: (item: any) => `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`,
      className: 'font-black text-slate-200'
    },
    { 
      header: '결제시간', 
      accessor: (item: any) => `${String(item.hour).padStart(2, '0')}:${String(item.minute).padStart(2, '0')}:${String(item.second).padStart(2, '0')}`,
      className: 'font-mono text-blue-400'
    },
    { header: '지점명', accessor: 'store_name' as any, className: 'font-bold' },
    { 
      header: '품목명', 
      accessor: 'item_name' as any, 
      className: 'font-black text-white' 
    },
    { 
      header: '멤버십', 
      accessor: (item: any) => {
        const tiers = ['VIP', 'Gold', 'Silver'];
        const tier = tiers[Math.abs(item.transaction_id.hashCode ? item.transaction_id.hashCode() : item.quantity) % 3];
        return (
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border ${
            tier === 'VIP' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
            tier === 'Gold' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
            'bg-slate-500/10 text-slate-400 border-slate-500/20'
          }`}>
            {tier}
          </span>
        );
      }
    },
    { 
      header: '결제수단', 
      accessor: (item: any) => {
        const methods = ['이디야페이', '신용카드', '삼성페이'];
        const method = methods[Math.abs(item.net_sales) % 3];
        return <span className="text-xs font-bold text-slate-400">{method}</span>;
      }
    },
    { 
      header: '순매출액', 
      accessor: (item: any) => `₩${item.net_sales.toLocaleString()}`,
      className: 'font-black text-blue-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] text-base'
    },
    { 
      header: '상태', 
      accessor: (item: any) => (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
          item.status === '완료' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        }`}>
          {item.status}
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
                <div className="flex items-center gap-3 text-blue-400 font-black text-[10px] tracking-[0.3em] uppercase opacity-80">
                    <div className="w-10 h-[1.5px] bg-blue-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                    Strategic Sales Intel
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl italic">판매 실적 및 지능형 통찰</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 glass-card px-5 py-2.5 rounded-2xl shadow-2xl border border-white/5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                INTELLIGENCE STATUS: <span className="text-white ml-1">SYNCHRONIZED</span>
            </div>
        </div>

        {/* 1. Executive Summary Block */}
        <ExecutiveSummaryBlock kpis={data.kpis} />

        {/* 2. Tactical Strategic Advisor (NEW Concentrate Focus) */}
        <div className="w-full">
            <SalesStrategyAdvisor />
        </div>

        {/* 3 & 4. Main Chart and AI Panel Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
            <div className="xl:col-span-8 flex flex-col h-full">
                <DecisionStockChart 
                    title="전사 매출 실시간 변동 추이" 
                    data={data.timeSeries} 
                    unit="₩"
                />
            </div>
            <div className="xl:col-span-4 flex flex-col h-full">
                <AIAssistantPanel />
            </div>
        </div>

        {/* 4. Operational Data Table */}
        <DataTable 
          title="원천 트랜잭션 데이터 (Operational Logs)"
          subtitle="전국 매장 실시간 결제 로그 및 분석 지표"
          data={paginatedData}
          columns={salesColumns}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
          itemsPerPage={itemsPerPage}
          onExportCsv={() => DecisionApplication.exportToCSV(data.recentSales, 'sales_analytics_export')}
        />

      </div>
    </DashboardLayout>
  );
}
