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
                <div className="absolute inset-0 border-[6px] border-slate-100 rounded-full" />
                <div className="absolute inset-0 border-[6px] border-red-600 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(220,38,38,0.1)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-red-600" />
                </div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-[0.3em] italic">Initializing Intelligence Core</h2>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest justify-center">
                    <Database className="w-3 h-3" />
                    Connecting to Ediya AX Secure Stream
                </div>
            </div>
        </div>
      </DashboardLayout>
    );
  }

  const salesColumns = [
    { 
      header: '시간', 
      accessor: (item: any) => `${String(item.hour).padStart(2, '0')}:${String(item.minute).padStart(2, '0')}`,
      className: 'font-mono text-indigo-600 font-black'
    },
    { 
      header: '요일', 
      accessor: (item: any) => {
        const date = new Date(item.year, item.month - 1, item.day);
        return ['일','월','화','수','목','금','토'][date.getDay()] + '요일';
      },
      className: 'font-bold text-slate-500'
    },
    { 
      header: '일', 
      accessor: (item: any) => `${item.day}일`,
      className: 'font-black text-slate-900'
    },
    { 
      header: '월', 
      accessor: (item: any) => `${item.month}월`,
      className: 'font-bold text-slate-400'
    },
    { 
      header: '년', 
      accessor: (item: any) => item.year,
      className: 'font-bold text-slate-400'
    },
    { header: '지점명', accessor: 'store_name' as any, className: 'font-black text-slate-900' },
    { 
      header: '품목명', 
      accessor: 'item_name' as any, 
      className: 'font-bold text-slate-600' 
    },
    { 
      header: '멤버십', 
      accessor: (item: any) => {
        const tiers = ['VIP', 'Gold', 'Silver'];
        const tier = tiers[Math.abs(item.transaction_id.hashCode ? item.transaction_id.hashCode() : item.quantity) % 3];
        return (
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border ${
            tier === 'VIP' ? 'bg-purple-50 text-purple-700 border-purple-100' :
            tier === 'Gold' ? 'bg-amber-50 text-amber-700 border-amber-100' :
            'bg-slate-50 text-slate-500 border-slate-200'
          }`}>
            {tier}
          </span>
        );
      }
    },
    { 
      header: '결제액', 
      accessor: (item: any) => `₩${item.net_sales.toLocaleString()}`,
      className: 'font-black text-slate-900 text-base tabular-nums text-right'
    },
    { 
      header: '상태', 
      accessor: (item: any) => (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
          item.status === '완료' ? 'bg-emerald-50 text-[#059669] border-emerald-100' : 'bg-red-50 text-[#DC2626] border-red-100'
        }`}>
          {item.status}
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
                <div className="flex items-center gap-3 text-red-600 font-black text-[10px] tracking-[0.3em] uppercase">
                    <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-red-600 rounded-full" />
                    Strategic Sales Intelligence
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">판매 실적 및 지능형 분석</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                V4 CORE STATUS: <span className="text-slate-900 ml-1">OPTIMIZED</span>
            </div>
        </div>

        {/* 1. Executive Summary Block */}
        <ExecutiveSummaryBlock kpis={data.kpis} />

        {/* 2. Tactical Strategic Advisor */}
        <div className="w-full">
            <SalesStrategyAdvisor />
        </div>

        {/* 3 & 4. Main Chart and AI Panel Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch">
            <div className="xl:col-span-8 flex flex-col h-full bg-white/80 rounded-[3rem] p-1 shadow-sm overflow-hidden border border-slate-100">
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
          subtitle="전국 매장 실시간 결제 로그 및 상세 분석 지표"
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
