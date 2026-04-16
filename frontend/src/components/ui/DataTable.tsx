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
    <div className="w-full glass-card rounded-[3rem] overflow-hidden transition-all duration-700 shadow-xl relative bg-white/80">
      <div className="p-10 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-red-600 rounded-full shadow-sm" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{title}</h2>
            </div>
            {subtitle && (
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500/30 rounded-full" />
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-5">
            <div className="relative group/search">
              <Search className="w-5 h-5 text-slate-300 absolute left-5 top-1/2 transform -translate-y-1/2 group-focus-within/search:text-red-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search operational logs..." 
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/20 w-80 transition-all placeholder:text-slate-300 shadow-sm"
              />
            </div>
            {onExportCsv && (
               <div className="flex flex-col items-end gap-2">
                <button 
                  onClick={onExportCsv}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 border border-white/10 group/csv"
                >
                  <Download className="w-4.5 h-4.5 group-hover/csv:animate-bounce" />
                  EXPORT STRATEGIC DATA
                </button>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">*Standardized CSV Protocol</span>
               </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Table Workspace */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              {columns.map((col, idx) => {
                const isSortable = col.sortable && onSort && col.sortKey;
                const isSorted = sortConfig?.key === col.sortKey;
                
                return (
                  <th 
                    key={idx} 
                    className={`px-10 py-8 text-left text-xs font-black text-slate-400 uppercase tracking-[0.25em] ${col.className || ''} ${isSortable ? 'cursor-pointer hover:text-slate-900 transition-all' : ''}`}
                    onClick={() => isSortable && onSort(col.sortKey as string)}
                  >
                    <div className="flex items-center gap-3">
                      {col.header}
                      {isSortable && (
                        <div className="flex flex-col">
                          {isSorted ? (
                            sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-red-600" /> : <ChevronDown className="w-4 h-4 text-red-600" />
                          ) : (
                            <ArrowUpDown className="w-4 h-4 opacity-20" />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-50/50 transition-all duration-300 group">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`px-10 py-7 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors ${col.className || ''}`}>
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-10 py-32 text-center text-slate-300 font-extrabold uppercase tracking-[0.3em] italic">
                  No records identified in current matrix
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Command Deck */}
      <div className="flex items-center justify-between px-10 py-10 border-t border-slate-100 bg-slate-50/30">
        <div className="flex items-center gap-5">
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all disabled:opacity-20 shadow-sm active:scale-95"
          >
            PREV DECK
          </button>
          <div className="flex items-center gap-3">
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
                  className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${currentPage === p ? 'bg-slate-800 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all disabled:opacity-20 shadow-sm active:scale-95"
          >
            NEXT DECK
          </button>
        </div>
        <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
          DATA VIEW: <span className="text-slate-900">{totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>
          <span className="mx-2 text-slate-200">—</span>
          <span className="text-slate-900">{Math.min(totalRecords, currentPage * itemsPerPage)}</span> OF {totalRecords.toLocaleString()} ENTRIES
        </div>
      </div>
    </div>
  );
}
