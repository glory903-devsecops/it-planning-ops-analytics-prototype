import React from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps<T> {
  title: string;
  subtitle: string;
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
  }[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalRecords: number;
  itemsPerPage: number;
  onExportCsv?: () => void;
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
}: DataTableProps<T>) {
  return (
    <div className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl rounded-[3rem] overflow-hidden p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 px-4 gap-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="검색어 입력..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-bold w-72 focus:ring-4 focus:ring-[#003B6D]/5 transition-all shadow-inner"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
          </div>
          {onExportCsv && (
            <button 
              onClick={onExportCsv}
              className="px-6 py-3.5 bg-[#003B6D] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              CSV 데이터 추출
            </button>
          )}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto custom-scrollbar mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-wider ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
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
