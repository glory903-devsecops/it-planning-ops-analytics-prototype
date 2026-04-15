import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ChartProps {
  timeSeriesData: any[];
  availableItems?: string[];
  availableStores?: string[];
  availableChannels?: string[];
}

export function DashboardCharts({ 
  timeSeriesData, 
  availableItems = [], 
  availableStores = [], 
  availableChannels = [] 
}: ChartProps) {
  const [selectedItem, setSelectedItem] = useState('전체 품목');
  const [selectedStore, setSelectedStore] = useState('전체 지점');
  const [selectedChannel, setSelectedChannel] = useState('전체 채널');
  const [selectedDataKey, setSelectedDataKey] = useState('총매출액');

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedItem(val);
    setSelectedStore('전체 지점');
    setSelectedChannel('전체 채널');
    setSelectedDataKey(val === '전체 품목' ? '총매출액' : val);
  };

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedStore(val);
    setSelectedItem('전체 품목');
    setSelectedChannel('전체 채널');
    setSelectedDataKey(val === '전체 지점' ? '총매출액' : val);
  };

  const handleChannelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedChannel(val);
    setSelectedItem('전체 품목');
    setSelectedStore('전체 지점');
    setSelectedDataKey(val === '전체 채널' ? '총매출액' : val);
  };

  if (!timeSeriesData.length) return null;

  const maxTotalSales = Math.max(...timeSeriesData.map(d => d['총매출액'] || 0));
  const yAxisMax = Math.ceil(maxTotalSales * 1.1);

  return (
    <div className="w-full group h-full">
      <Card className="glass-card rounded-[2.5rem] overflow-hidden transition-all duration-700 h-full flex flex-col">
        <CardHeader className="border-b border-white/5 flex flex-col gap-6 p-8 shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.4)]" />
              <CardTitle className="text-xl font-black text-white tracking-tighter uppercase italic">Time-Series Trends</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse mr-1" />
                LIVE STREAM
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">Menu Asset</label>
              <select 
                value={selectedItem}
                onChange={handleItemChange}
                className="w-full text-xs font-bold border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/30 py-3 px-5 bg-white/5 text-slate-300 appearance-none cursor-pointer hover:bg-white/10 transition-all"
              >
                <option value="전체 품목">✨ All Menu Assets</option>
                {availableItems.map(item => <option key={item} value={item} className="bg-[#020617]">{item}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">Operational Store</label>
              <select 
                value={selectedStore}
                onChange={handleStoreChange}
                className="w-full text-xs font-bold border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/30 py-3 px-5 bg-white/5 text-slate-300 appearance-none cursor-pointer hover:bg-white/10 transition-all"
              >
                <option value="전체 지점">📍 All Global Stores</option>
                {availableStores.map(store => <option key={store} value={store} className="bg-[#020617]">{store}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">Sales Channel</label>
              <select 
                value={selectedChannel}
                onChange={handleChannelChange}
                className="w-full text-xs font-bold border border-white/5 rounded-xl focus:ring-2 focus:ring-blue-500/30 py-3 px-5 bg-white/5 text-slate-300 appearance-none cursor-pointer hover:bg-white/10 transition-all"
              >
                <option value="전체 채널">📱 All Analytics Channels</option>
                {availableChannels.map(channel => <option key={channel} value={channel} className="bg-[#020617]">{channel}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-8 pt-10 min-h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} 
                axisLine={false} 
                tickLine={false}
                minTickGap={30}
                dy={15}
              />
              <YAxis 
                domain={[0, yAxisMax]}
                tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => value === 0 ? '0' : value >= 10000 ? `${(value/10000).toFixed(0)}M` : value.toLocaleString()}
                dx={-15}
              />
              <Tooltip 
                cursor={{ stroke: 'rgba(56,189,248,0.2)', strokeWidth: 2 }}
                contentStyle={{ 
                  borderRadius: '1.5rem', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
                  padding: '20px',
                  fontWeight: 'black',
                  color: '#fff'
                }}
                itemStyle={{ color: '#38bdf8' }}
                formatter={(value: any) => [`₩ ${Number(value).toLocaleString()}`, selectedDataKey]}
                labelStyle={{ color: '#64748b', marginBottom: '8px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Line 
                type="monotone" 
                dataKey={selectedDataKey} 
                stroke="#38bdf8" 
                strokeWidth={5}
                dot={false}
                activeDot={{ r: 6, fill: '#38bdf8', stroke: '#020617', strokeWidth: 4, shadow: '0 0 20px rgba(56,189,248,0.8)' }}
                animationDuration={2000}
                fill="url(#colorSales)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
