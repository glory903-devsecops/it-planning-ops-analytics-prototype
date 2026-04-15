import React from 'react';
import { Search, Download, ChevronLeft, ChevronRight, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

interface DataTableProps<T> {
  title: string;
  subtitle: string;
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
    sortKey?: keyof T | string;
    sortable?: boolean;
  }[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalRecords: number;
  itemsPerPage: number;
  onExportCsv?: () => void;
  sortConfig?: { key: string; direction: 'asc' | 'desc' };
  onSort?: (key: string) => void;
}

export function DataTable<T>({
  title,
  subtitle,
  data,
  columns,
  searchTerm,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  totalRecords,
  itemsPerPage,
  onExportCsv,
  sortConfig,
  onSort,
}: DataTableProps<T>) {
  return (
    <div className="w-full glass-card rounded-[2.5rem] overflow-hidden transition-all duration-700">
      <div className="p-10 border-b border-white/5 bg-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.3)]" />
              <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">{title}</h2>
            </div>
            {subtitle && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-4">{subtitle}</p>}
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group/search">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within/search:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Filter logs..." 
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-11 pr-5 py-3 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 w-64 transition-all placeholder:text-slate-700"
              />
            </div>
            {onExportCsv && (
               <button 
                onClick={onExportCsv}
                className="px-6 py-3.5 bg-gradient-to-r from-[#003B6D] to-[#001D3D] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,59,109,0.2)] flex items-center gap-2 group/csv"
              >
                <Download className="w-4 h-4 group-hover/csv:animate-bounce" />
                분석 데이터(CSV) 추출
              </button>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mr-2">
                *분석용 시간 차원(Year/Month/Day/...) 포함
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto custom-scrollbar mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col, idx) => {
                const isSortable = col.sortable && onSort && col.sortKey;
                const isSorted = sortConfig?.key === col.sortKey;
                
                return (
                  <th 
                    key={idx} 
                    className={`px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider ${col.className || ''} ${isSortable ? 'cursor-pointer hover:text-[#003B6D] transition-colors' : ''}`}
                    onClick={() => isSortable && onSort(col.sortKey as string)}
                  >
                    <div className="flex items-center gap-2">
                      {col.header}
                      {isSortable && (
                        <div className="flex flex-col">
                          {isSorted ? (
                            sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3 text-[#003B6D]" /> : <ChevronDown className="w-3 h-3 text-[#003B6D]" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-30" />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-blue-50/30 transition-colors group">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`px-6 py-5 text-xs font-medium ${col.className || ''}`}>
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-8 border-t border-gray-50 bg-gray-50/50 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-400 hover:text-[#003B6D] hover:border-[#003B6D] transition-all disabled:opacity-20 translate-y-0 active:translate-y-1 shadow-sm"
          >
            PREV
          </button>
          <div className="flex items-center gap-2">
            {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
              let p = currentPage;
              if (currentPage <= 3) p = i + 1;
              else if (currentPage >= totalPages - 2) p = totalPages - 4 + i;
              else p = currentPage - 2 + i;
              if (p <= 0 || p > totalPages) return null;
              return (
                <button 
                  key={p} 
                  onClick={() => onPageChange(p)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === p ? 'bg-[#003B6D] text-white shadow-lg' : 'bg-white text-gray-400 hover:text-gray-800'}`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-400 hover:text-[#003B6D] hover:border-[#003B6D] transition-all disabled:opacity-20 translate-y-0 active:translate-y-1 shadow-sm"
          >
            NEXT
          </button>
        </div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Showing {totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
          {Math.min(totalRecords, currentPage * itemsPerPage)} of {totalRecords.toLocaleString()} Records
        </div>
      </div>
    </div>
  );
}
