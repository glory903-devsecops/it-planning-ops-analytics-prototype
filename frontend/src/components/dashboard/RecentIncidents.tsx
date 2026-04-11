import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { SalesEvent } from '../../data/mock/salesEvents';
import { Search, Download, ArrowUpDown, ChevronDown, Check, X, Calendar, MapPin } from 'lucide-react';
import { formatKoreanCurrency } from '../../lib/formatters';

interface SortConfig {
  key: keyof SalesEvent | 'time';
  direction: 'asc' | 'desc';
}

export function RecentIncidents({ incidents }: { incidents: SalesEvent[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'time', direction: 'desc' });
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  // CSV Filter State
  const [exportYear, setExportYear] = useState('2024');
  const [exportMonth, setExportMonth] = useState('04');
  const [exportDay, setExportDay] = useState('');
  const [exportStore, setExportStore] = useState('전체 지점');

  const stores = useMemo(() => Array.from(new Set(incidents.map(i => i.store_name))), [incidents]);

  const filteredAndSortedIncidents = useMemo(() => {
    let result = [...incidents];
    
    // Filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(i => 
        i.menu_name.toLowerCase().includes(lower) || 
        i.store_name.toLowerCase().includes(lower) ||
        i.channel.toLowerCase().includes(lower)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aVal: any = a[sortConfig.key as keyof SalesEvent];
      let bVal: any = b[sortConfig.key as keyof SalesEvent];

      if (sortConfig.key === 'time') {
        aVal = a.timestamp;
        bVal = b.timestamp;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [incidents, searchTerm, sortConfig]);

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDownloadCSV = () => {
    // Construct the API URL with filters
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

  if (!incidents.length) return null;

  return (
    <div className="relative">
      <Card className="border border-white/40 bg-white/60 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden mb-8 transition-all duration-300">
        <CardHeader className="p-8 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-3">
              최근 결제 내역
              <span className="text-[10px] font-black tracking-widest text-[#003B6D] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                REAL-TIME LOG
              </span>
            </CardTitle>
            <p className="text-xs font-bold text-gray-400 tracking-wide uppercase">{filteredAndSortedIncidents.length}건의 데이터가 발견되었습니다</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#003B6D] transition-colors" />
              <input 
                type="text" 
                placeholder="품목, 지점, 매체 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-6 py-3 bg-white/80 border-none rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:ring-4 focus:ring-[#003B6D]/5 w-64 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all"
              />
            </div>
            <button 
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#003B6D] hover:bg-[#002d54] text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-blue-900/10 active:scale-95 group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              CSV 추출
            </button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-gray-400 bg-gray-50/30 uppercase tracking-[0.15em] font-black border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 cursor-pointer hover:text-[#003B6D] transition-colors group" onClick={() => handleSort('time')}>
                    <div className="flex items-center gap-2">일시 <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                  <th className="px-8 py-5 cursor-pointer hover:text-[#003B6D] transition-colors group" onClick={() => handleSort('menu_name')}>
                    <div className="flex items-center gap-2">품목명 <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                  <th className="px-8 py-5 cursor-pointer hover:text-[#003B6D] transition-colors group" onClick={() => handleSort('store_name')}>
                    <div className="flex items-center gap-2">지점 <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                  <th className="px-8 py-5 cursor-pointer hover:text-[#003B6D] transition-colors group" onClick={() => handleSort('channel')}>
                    <div className="flex items-center gap-2">매체 <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                  <th className="px-8 py-5 text-center">건수</th>
                  <th className="px-8 py-5 text-right cursor-pointer hover:text-[#003B6D] transition-colors group" onClick={() => handleSort('total_price')}>
                    <div className="flex items-center justify-end gap-2">결제금액 <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50">
                {filteredAndSortedIncidents.slice(0, 10).map((incident, i) => {
                  const timestampParts = (incident.timestamp || '').split(' ');
                  const datePart = timestampParts[0] || '';
                  const timePart = timestampParts[1] || '';
                  const [yy, mm, dd] = datePart.split('-');
                  const time = timePart.substring(0, 5);
                  
                  return (
                    <tr key={i} className="hover:bg-white transition-all duration-300 group/row">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-black group-hover/row:text-[#003B6D] transition-colors">{time || '00:00'}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{mm && dd ? `${mm}월 ${dd}일` : '-'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-gray-800 font-black max-w-[180px] truncate bg-gray-50 group-hover/row:bg-blue-50/50 px-3 py-1.5 rounded-xl border border-gray-100 transition-all font-sans" title={incident.menu_name || (incident as any).item_name || (incident as any).name || '알 수 없음'}>
                          {incident.menu_name || (incident as any).item_name || (incident as any).name || '알 수 없음'}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-600 font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            {incident.store_name || (incident as any).branch_name || (incident as any).store || '전체 지점'}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-2xl text-[10px] font-black tracking-widest uppercase bg-white border border-gray-100 shadow-sm group-hover/row:border-[#003B6D]/20 group-hover/row:text-[#003B6D] transition-all">
                          {incident.channel || (incident as any).platform || (incident as any).source || '매장'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-gray-400 font-bold text-center">{incident.qty || 1}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="text-[#003B6D] font-black text-xl tracking-tight">
                          {formatKoreanCurrency(Number(incident.total_price || (incident as any).price || (incident as any).amount || 0))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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
