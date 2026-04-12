import React from 'react';
import { KpiData } from '../../types/dashboard';

interface KpiGridProps {
  kpis: KpiData[];
}

export const KpiGrid: React.FC<KpiGridProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {kpis.map((kpi, idx) => (
        <div 
          key={idx} 
          className={`group relative border border-white/40 ${kpi.bg} backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] p-5 flex flex-col justify-center overflow-hidden h-[88px]`}
        >
          <div className="flex justify-between items-center z-10">
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
              <h3 className={`font-black tracking-tighter truncate ${kpi.color} ${String(kpi.value).length > 10 ? 'text-lg' : 'text-2xl'}`}>
                {kpi.value}
                {kpi.unit && <span className="text-sm ml-0.5 font-bold opacity-50">{kpi.unit}</span>}
              </h3>
            </div>
            <div className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black tracking-tighter ${kpi.isUp ? 'text-green-600 bg-green-100/50' : 'text-red-600 bg-red-100/50'}`}>
              {kpi.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
