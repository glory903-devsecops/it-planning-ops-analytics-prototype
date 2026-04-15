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
    { header: '품목명', accessor: 'item_name' as any, className: 'font-black' },
    { header: '지점명', accessor: 'store_name' as any },
    { header: '현재고', accessor: (item: any) => `${item.current_stock.toLocaleString()} EA`, className: 'font-bold' },
    { header: '가용재고', accessor: (item: any) => `${item.available_stock.toLocaleString()} EA` },
    { header: '안전재고', accessor: (item: any) => `${item.safety_stock.toLocaleString()} EA`, className: 'text-gray-400' },
    { 
      header: '공급 가능일', 
      accessor: (item: any) => (
        <span className={`font-black ${item.days_of_cover < 3 ? 'text-red-600' : 'text-green-600'}`}>
          {item.days_of_cover}일
        </span>
      )
    },
    { 
      header: '위험도', 
      accessor: (item: any) => (
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${item.stockout_risk_score > 70 ? 'bg-red-500' : 'bg-green-500'}`} 
            style={{ width: `${item.stockout_risk_score}%` }} 
          />
        </div>
      )
    },
    { 
      header: '우선순위', 
      accessor: (item: any) => (
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
          item.recommended_order_priority === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-gray-400'
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#003B6D] font-black text-[9px] tracking-[0.2em] uppercase opacity-70">
                    <div className="w-8 h-[2px] bg-[#003B6D]" />
                    EDIYA Logistics Intelligence
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter">물류 공급망 및 재고 통찰</h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 bg-white/50 px-4 py-2 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                시스템 상태: <span className="text-green-600 ml-1">STABLE</span>
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
