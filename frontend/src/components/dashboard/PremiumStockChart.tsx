import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatShortKorean, formatKoreanCurrency } from '../../lib/formatters';

interface FilterOption {
  label: string;
  options: string[];
  defaultValue: string;
}

interface PremiumChartProps {
  title: string;
  data: any[];
  filters: FilterOption[];
  dataKeyPrefix?: string; // e.g., for logistics "Store - Item"
  unit?: string; // e.g., "₩", "%", "ms"
  valueFormatter?: (val: number) => string;
  height?: number;
}

export function PremiumStockChart({
  title,
  data,
  filters,
  unit = '',
  valueFormatter,
  height = 400
}: PremiumChartProps) {
  // Use a map to handle multiple dynamic filter states
  const [filterStates, setFilterStates] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    filters.forEach(f => {
      initial[f.label] = f.defaultValue;
    });
    return initial;
  });

  const handleFilterChange = (label: string, value: string) => {
    setFilterStates(prev => ({ ...prev, [label]: value }));
  };

  if (!data.length) return null;

  // Resolve which dataKey to use based on filters
  let activeDataKey = '총매출액'; // default for sales
  
  if (title.includes('물류')) {
    activeDataKey = `${filterStates['지점']} - ${filterStates['품목']}`;
  } else if (title.includes('네트워크')) {
    activeDataKey = filterStates['서비스'];
  } else {
    // Sales Logic
    const item = filterStates['메뉴'];
    const store = filterStates['지점'];
    const channel = filterStates['채널'];
    if (item && item !== '전체 품목') activeDataKey = item;
    else if (store && store !== '전체 지점') activeDataKey = store;
    else if (channel && channel !== '전체 채널') activeDataKey = channel;
  }

  // Find max for YAxis scaling
  // Flattening logic for nested data (e.g., Logistics)
  const processedData = useMemo(() => {
    if (!title.includes('물류')) return data;
    
    return data.map(point => {
        const flat: any = { time: point.time };
        // Flatten "Branch": { "Item": val } into "Branch - Item": val
        Object.keys(point).forEach(branch => {
            if (branch === 'time') return;
            if (typeof point[branch] === 'object') {
                Object.keys(point[branch]).forEach(item => {
                    flat[`${branch} - ${item}`] = point[branch][item];
                });
            }
        });
        return flat;
    });
  }, [data, title]);

  const maxVal = Math.max(...processedData.map(d => Number(d[activeDataKey] || 0)));
  const yAxisMax = Math.ceil((maxVal || 100) * 1.2);

  const defaultFormatter = (val: number) => {
    if (unit === '₩') return formatKoreanCurrency(val);
    if (unit === '%') return `${val}%`;
    if (unit === 'ms') return `${val}ms`;
    return val.toLocaleString();
  };

  const finalFormatter = valueFormatter || defaultFormatter;

  return (
    <div className="mb-8 w-full group">
      <Card className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500">
        <CardHeader className="bg-gradient-to-r from-gray-50/80 to-transparent border-b border-gray-100/50 flex flex-col gap-4 p-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-8 bg-gradient-to-b from-[#003B6D] to-blue-400 rounded-full shadow-[0_0_15px_rgba(0,59,109,0.3)]" />
              <CardTitle className="text-xl font-black text-gray-800 tracking-tight">{title}</CardTitle>
            </div>
            <span className="text-[10px] font-black tracking-widest text-[#003B6D] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                LIVE ANALYTICS
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {filters.map((f, idx) => (
              <div key={idx} className="space-y-1.5">
                <label className="text-[9px] uppercase font-black text-gray-400 ml-1 tracking-wider opacity-70">{f.label}</label>
                <div className="relative group/select">
                    <select 
                        value={filterStates[f.label]}
                        onChange={(e) => handleFilterChange(f.label, e.target.value)}
                        className="w-full text-xs font-bold border-none rounded-xl focus:ring-4 focus:ring-[#003B6D]/5 py-3 px-4 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.02),inset_0_2px_4px_rgba(0,0,0,0.01)] appearance-none cursor-pointer transition-all hover:bg-gray-50/50 text-gray-700"
                    >
                        {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-hover/select:text-[#003B6D] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div style={{ height: `${height}px` }} className="w-full flex items-center justify-center">
            {processedData.length === 0 ? (
                <div className="flex flex-col items-center gap-4 opacity-30">
                    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-xs font-black tracking-widest uppercase">실시간 데이터 수집 중...</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={processedData} margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                        dataKey="time" 
                        tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} 
                        axisLine={false} 
                        tickLine={false}
                        minTickGap={30}
                        dy={10}
                    />
                    <YAxis 
                        domain={[0, yAxisMax]}
                        tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} 
                        axisLine={false} 
                        tickLine={false}
                        tickFormatter={(value) => unit === '₩' ? formatShortKorean(value) : `${value}${unit}`}
                        dx={-10}
                    />
                    <Tooltip 
                        cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                        contentStyle={{ 
                            borderRadius: '24px', 
                            border: 'none', 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            backdropFilter: 'blur(20px)',
                            padding: '20px',
                            fontWeight: '800',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value: any) => [finalFormatter(Number(value)), activeDataKey]}
                        labelStyle={{ color: '#003B6D', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    />
                    <Legend 
                        verticalAlign="top" 
                        align="right" 
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey={activeDataKey} 
                        stroke="#003B6D" 
                        strokeWidth={4}
                        dot={{ r: 4, fill: '#003B6D', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8, fill: '#003B6D', stroke: '#fff', strokeWidth: 4 }}
                        animationDuration={1500}
                    />
                    </LineChart>
                </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
