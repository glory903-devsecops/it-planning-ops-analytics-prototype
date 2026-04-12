"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { logisticsService } from '../../services/logisticsService';
import { formatKoreanCurrency } from '../../lib/formatters';
import { PremiumStockChart } from '../../components/dashboard/PremiumStockChart';
import { KpiGrid } from '../../components/dashboard/KpiGrid';
import { AIStrategyPanel } from '../../components/ai/AIStrategyPanel';
import { DecisionReportModal } from '../../components/dashboard/DecisionReportModal';
import { DataTable } from '../../components/ui/DataTable';
import { useAIChat } from '../../hooks/useAIChat';
import { usePagination } from '../../hooks/usePagination';
import { KpiData, LogisticsOrder } from '../../types/dashboard';

export default function LogisticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // AI Chat Hook
  const { messages, inputValue, setInputValue, sendMessage, isTyping } = useAIChat({
    initialMessages: [
      { role: 'ai', content: "캠퍼스 상권의 '우유' 수요가 내일 오후 2시부터 급증할 것으로 예측됩니다. 선행 배차 승인을 권장합니다." }
    ],
    mode: 'scm'
  });

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const initialData = await logisticsService.getInitialData();
        if (mounted) {
          setData(initialData);
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

  // Pagination & Search Hook
  const {
    displaySearchTerm,
    setDisplaySearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    totalRecords,
    sortConfig,
    toggleSort
  } = usePagination<LogisticsOrder>({
    data: data?.recentOrders || [],
    itemsPerPage: 15,
    searchFields: ['item_name', 'store_name', 'order_id'],
    initialSort: { key: 'timestamp', direction: 'desc' }
  });

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

  const kpis: KpiData[] = [
    { label: '총 관리 매장', value: data.metrics.totalStores, unit: '개', trend: 'HQ Verified', isUp: true, color: 'text-[#003B6D]', bg: 'bg-blue-50/50' },
    { label: '재고 위험 매장', value: data.metrics.criticalStores, unit: '건', trend: 'ACTION REQ', isUp: false, color: 'text-red-600', bg: 'bg-red-50/50' },
    { label: '전국 평균 잔여량', value: '42.8%', unit: '', trend: '-2.1%', isUp: false, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
  ];

  const tableColumns = [
    { header: '주문ID', accessor: 'order_id' as keyof LogisticsOrder, sortable: true, sortKey: 'order_id', className: 'text-gray-500 font-black' },
    { header: '일시', accessor: 'timestamp' as keyof LogisticsOrder, sortable: true, sortKey: 'timestamp', className: 'text-gray-400' },
    { header: '지점명', accessor: 'store_name' as keyof LogisticsOrder, sortable: true, sortKey: 'store_name', className: 'text-gray-800 font-black' },
    { header: '품목명', accessor: 'item_name' as keyof LogisticsOrder, sortable: true, sortKey: 'item_name', className: 'text-[#003B6D] font-bold' },
    { header: '수량', accessor: (item: LogisticsOrder) => item.qty.toLocaleString(), sortable: true, sortKey: 'qty', className: 'text-gray-600 font-black' },
    { header: '지점공급가', accessor: (item: LogisticsOrder) => formatKoreanCurrency(item.total_price), sortable: true, sortKey: 'total_price', className: 'text-gray-900 font-black' },
    { header: '본사구입가', accessor: (item: LogisticsOrder) => formatKoreanCurrency(item.purchase_cost), sortable: true, sortKey: 'purchase_cost', className: 'text-gray-500 font-bold' },
    { header: '유통차익', accessor: (item: LogisticsOrder) => formatKoreanCurrency(item.distribution_margin), sortable: true, sortKey: 'distribution_margin', className: 'text-blue-600 bg-blue-50/30 px-2 py-1 rounded font-black' },
    { header: '상태', accessor: (item: LogisticsOrder) => (
      <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full border border-green-100">{item.status}</span>
    ), sortable: true, sortKey: 'status'}
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
            <div className="space-y-1">
                <div className="flex items-center gap-3 text-[#003B6D] font-black text-[9px] tracking-[0.3em] uppercase opacity-70">
                    <div className="w-10 h-[2px] bg-[#003B6D] rounded-full" /> EDIYA SCM Intelligence
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

        {/* KPI Grid */}
        <KpiGrid kpis={kpis} />

        {/* Main Analytics Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-stretch">
          <div className="xl:col-span-2 flex flex-col">
            <PremiumStockChart 
              title="지점별 원부자재 재고 변동 트렌드"
              data={data.timeSeriesData || []}
              filters={[
                { label: '지점', options: data.availableStores || [], defaultValue: '강남본점' },
                { label: '품목', options: data.availableItems || [], defaultValue: '우유' }
              ]}
              unit="%" height={580}
            />
          </div>
          <div className="xl:col-span-1 flex flex-col">
            <AIStrategyPanel 
              mode="scm"
              messages={messages}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSendMessage={() => sendMessage(inputValue)}
              onOpenReport={() => setIsReportOpen(true)}
              isTyping={isTyping}
            />
          </div>
        </div>

        {/* SCM Logistics Table */}
        <DataTable 
          title="지점별 물류 공급 실적 (SCM Data)"
          subtitle={`HQ Production Analysis (Total: ${totalRecords.toLocaleString()} Records)`}
          data={paginatedData}
          columns={tableColumns}
          searchTerm={displaySearchTerm}
          onSearchChange={setDisplaySearchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalRecords={totalRecords}
          itemsPerPage={15}
          onExportCsv={() => alert('CSV Export Started...')}
          sortConfig={sortConfig}
          onSort={toggleSort}
        />

        {/* Logistics Report Modal */}
        <DecisionReportModal 
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          mode="scm"
          metrics={data.metrics}
        />

      </div>
    </DashboardLayout>
  );
}
