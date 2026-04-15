import React from 'react';
import { ExecutiveKpi } from '../../domain/types';
import { TrendingUp, TrendingDown, Minus, Info, AlertCircle } from 'lucide-react';

interface Props {
  kpis: ExecutiveKpi[];
}

export function ExecutiveSummaryBlock({ kpis }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {kpis.map((kpi) => (
        <div 
          key={kpi.id}
          className="relative group glass-card rounded-[2.5rem] p-8 overflow-hidden"
        >
          {/* Status Glow */}
          <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 transition-all group-hover:opacity-30 -mr-10 -mt-10 ${
            kpi.status === 'critical' ? 'bg-rose-500' : kpi.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
          }`} />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{kpi.label}</span>
                <div className="h-0.5 w-6 bg-blue-500 rounded-full opacity-50" />
              </div>
              <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-xl ${
                kpi.status === 'critical' ? 'text-rose-400' : kpi.status === 'warning' ? 'text-amber-400' : 'text-blue-400'
              }`}>
                {kpi.status === 'critical' ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {kpi.value}
              </h3>
              {kpi.subValue && <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{kpi.subValue}</span>}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border transition-all ${
                kpi.trendDirection === 'up' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
                kpi.trendDirection === 'down' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 
                'bg-slate-500/10 text-slate-400 border-slate-500/20'
              }`}>
                {kpi.trendDirection === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : 
                 kpi.trendDirection === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : 
                 <Minus className="w-3.5 h-3.5" />}
                {Math.abs(kpi.trend)}%
              </div>
              
              <div className="h-6 w-[1px] bg-white/5" />
              
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Confidence</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">{kpi.confidenceScore}%</span>
                    <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden self-center">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${kpi.confidenceScore}%` }} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
