import React, { useState } from 'react';
import { SalesEvent } from '../../types/dashboard';
import { Download, X, Calendar, MapPin } from 'lucide-react';
import { formatKoreanCurrency } from '../../lib/formatters';
import { DataTable } from '../ui/DataTable';
import { usePagination } from '../../hooks/usePagination';

export function RecentIncidents({ incidents }: { incidents: SalesEvent[] }) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  // CSV Filter State
  const [exportYear, setExportYear] = useState('2024');
  const [exportMonth, setExportMonth] = useState('04');
  const [exportDay, setExportDay] = useState('');
  const [exportStore, setExportStore] = useState('전체 지점');

  const {
    displaySearchTerm,
    setDisplaySearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    totalRecords
  } = usePagination<SalesEvent>({
    data: incidents,
    itemsPerPage: 15,
    searchFields: ['menu_name', 'store_name', 'channel']
  });

  const stores = Array.from(new Set(incidents.map(i => i.store_name)));

  const handleDownloadCSV = () => {
    const params = new URLSearchParams({
      year: exportYear,
      month: exportMonth,
      day: exportDay,
      store: exportStore
    });
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const apiUrl = backendUrl.startsWith('http') ? backendUrl : `http://localhost:4000`;
    window.open(`${apiUrl}/api/dashboard/export?${params.toString()}`, '_blank');
    setIsExportModalOpen(false);
  };

  const tableColumns = [
    { 
      header: '일시', 
      accessor: (item: SalesEvent) => {
        const parts = item.timestamp.split(' ');
        const timePiece = parts[1]?.substring(0, 5) || '00:00';
        const datePiece = parts[0]?.split('-').slice(1).join('월 ') + '일';
        return (
          <div className="flex flex-col">
            <span className="text-gray-900 font-black group-hover/row:text-[#003B6D] transition-colors">{timePiece}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{datePiece}</span>
          </div>
        );
      }
    },
    { 
      header: '품목명', 
      accessor: (item: SalesEvent) => (
        <div className="text-gray-800 font-black max-w-[180px] truncate bg-gray-50 group-hover:bg-blue-50/50 px-3 py-1.5 rounded-xl border border-gray-100 transition-all font-sans">
          {item.menu_name}
        </div>
      )
    },
    { 
      header: '지점', 
      accessor: (item: SalesEvent) => (
        <div className="flex items-center gap-2 text-gray-600 font-bold">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          {item.store_name}
        </div>
      )
    },
    { 
      header: '매체', 
      accessor: (item: SalesEvent) => (
        <span className="inline-flex items-center px-4 py-1.5 rounded-2xl text-[10px] font-black tracking-widest uppercase bg-white border border-gray-100 shadow-sm group-hover:border-[#003B6D]/20 group-hover:text-[#003B6D] transition-all">
          {item.channel}
        </span>
      )
    },
    { header: '건수', accessor: 'qty' as keyof SalesEvent, className: 'text-center text-gray-400 font-bold' },
    { 
      header: '결제금액', 
      className: 'text-right',
      accessor: (item: SalesEvent) => (
        <div className="text-[#003B6D] font-black text-xl tracking-tight">
          {formatKoreanCurrency(item.total_price)}
        </div>
      )
    }
  ];

  if (!incidents.length) return null;

  return (
    <div className="relative">
      <DataTable 
        title="최근 결제 내역"
        subtitle={`전체 ${totalRecords.toLocaleString()}건 중 ${currentPage}페이지 (REAL-TIME LOG)`}
        data={paginatedData}
        columns={tableColumns}
        searchTerm={displaySearchTerm}
        onSearchChange={setDisplaySearchTerm}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalRecords={totalRecords}
        itemsPerPage={15}
        onExportCsv={() => setIsExportModalOpen(true)}
      />

      {/* CSV Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0B0F1A]/60 backdrop-blur-sm" onClick={() => setIsExportModalOpen(false)} />
          <div className="relative bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[2.5rem] w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">CSV 데이터 맞춤 추출</h3>
                    <p className="text-sm font-bold text-gray-500">대용량 데이터(30,000건+) 관리를 위한 필터를 설정하세요.</p>
                </div>
                <button onClick={() => setIsExportModalOpen(false)} className="p-3 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all">
                    <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        <Calendar className="w-3 h-3" /> 년도/월
                    </label>
                    <div className="flex gap-2">
                        <select 
                            value={exportYear}
                            onChange={(e) => setExportYear(e.target.value)}
                            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-3 px-4 font-bold text-sm focus:border-[#003B6D] outline-none transition-all"
                        >
                            <option value="2024">2024년</option>
                            <option value="2023">2023년</option>
                        </select>
                        <select 
                            value={exportMonth}
                            onChange={(e) => setExportMonth(e.target.value)}
                            className="w-full bg-white border-2 border-gray-100 rounded-2xl py-3 px-4 font-bold text-sm focus:border-[#003B6D] outline-none transition-all"
                        >
                            {Array.from({length: 12}).map((_, i) => (
                                <option key={i} value={(i+1).toString().padStart(2, '0')}>{i+1}월</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        <Calendar className="w-3 h-3" /> 일자 (선택)
                    </label>
                    <input 
                        type="text" 
                        placeholder="예: 15"
                        value={exportDay}
                        onChange={(e) => setExportDay(e.target.value)}
                        className="w-full bg-white border-2 border-gray-100 rounded-2xl py-3 px-4 font-bold text-sm focus:border-[#003B6D] outline-none transition-all"
                    />
                </div>
                <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        <MapPin className="w-3 h-3" /> 추출 지점
                    </label>
                    <select 
                        value={exportStore}
                        onChange={(e) => setExportStore(e.target.value)}
                        className="w-full bg-white border-2 border-gray-100 rounded-2xl py-3 px-5 font-bold text-sm focus:border-[#003B6D] outline-none transition-all appearance-none"
                    >
                        <option value="전체 지점">📍 전체 지점 점검</option>
                        {stores.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                    <p className="text-[11px] font-bold text-blue-800 leading-relaxed">
                        ⚠️ **주의:** 필터링된 데이터는 서버 사이드에서 실시간 생성됩니다. 필터 기준이 넓을 경우 추출에 시간이 다소 소요될 수 있습니다.
                    </p>
                </div>
                <button 
                  onClick={handleDownloadCSV}
                  className="w-full py-5 bg-[#003B6D] hover:bg-[#002d54] text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-900/20 active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  기록 추출 시작 (CSV)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
