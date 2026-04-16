import React from 'react';
import { ExecutiveKpi } from '../../domain/types';
import { TrendingUp, TrendingDown, Minus, Info, AlertCircle } from 'lucide-react';

interface Props {
  kpis: ExecutiveKpi[];
}

export function ExecutiveSummaryBlock({ kpis }: Props) {
  const formatValue = (val: string) => {
    // Check if it's a number (currency or count)
    const num = parseFloat(val.replace(/[^0-9.-]+/g,""));
    if (isNaN(num)) return { number: val, unit: '' };
    
    const formatted = new Intl.NumberFormat('ko-KR').format(num);
    const unit = val.includes('원') ? '원' : val.includes('%') ? '%' : '';
    return { number: formatted, unit };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {kpis.map((kpi) => {
        const { number, unit } = formatValue(kpi.value);
        return (
          <div 
            key={kpi.id}
            className="relative group glass-card rounded-[2.5rem] p-8 overflow-hidden bg-white/70"
          >
            {/* Status Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-[0.08] transition-all group-hover:opacity-20 -mr-10 -mt-10 ${
              kpi.status === 'critical' ? 'bg-red-500' : kpi.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
            }`} />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{kpi.label}</span>
                  <div className="h-1 w-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full" />
                </div>
                <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm ${
                  kpi.status === 'critical' ? 'text-red-600' : kpi.status === 'warning' ? 'text-amber-600' : 'text-blue-600'
                }`}>
                  {kpi.status === 'critical' ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <h3 className="text-4xl font-black gradient-text tracking-tighter">
                  {number}
                </h3>
                {unit && <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{unit}</span>}
                {kpi.subValue && <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-2">{kpi.subValue}</span>}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border transition-all ${
                  kpi.trendDirection === 'up' ? 'bg-emerald-50 text-[#059669] border-emerald-100 shadow-sm' : 
                  kpi.trendDirection === 'down' ? 'bg-red-50 text-[#DC2626] border-red-100 shadow-sm' : 
                  'bg-slate-50 text-slate-400 border-slate-100'
                }`}>
                  {kpi.trendDirection === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : 
                   kpi.trendDirection === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : 
                   <Minus className="w-3.5 h-3.5" />}
                  {Math.abs(kpi.trend)}%
                </div>
                
                <div className="h-6 w-[1px] bg-slate-100" />
                
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                      <span>Reliability</span>
                      <span className="text-slate-900">{kpi.confidenceScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                      <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                              kpi.status === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.2)]' :
                              kpi.status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.2)]' :
                              'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.2)]'
                          }`}
                          style={{ width: `${kpi.confidenceScore}%` }} 
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
