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

export function DecisionStockChart({ 
  timeSeriesData, 
  availableItems = [], 
  availableStores = [], 
  availableChannels = [],
  title = "Time-Series Trends",
  unit = "₩"
}: ChartProps & { title?: string; unit?: string }) {
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
      <Card className="glass-card rounded-[2.5rem] overflow-hidden transition-all duration-700 h-full flex flex-col bg-white">
        <CardHeader className="border-b border-slate-100 flex flex-col gap-6 p-8 shrink-0 bg-slate-50/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-1.5 h-8 bg-gradient-to-b from-orange-400 to-red-600 rounded-full shadow-sm" />
              <CardTitle className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">{title}</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-[#059669] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-1" />
                LIVE INTELLIGENCE STREAM
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em] ml-1">Menu Asset</label>
              <select 
                value={selectedItem}
                onChange={handleItemChange}
                className="w-full text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/10 py-3 px-5 bg-white text-slate-800 appearance-none cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
              >
                <option value="전체 품목">✨ All Menu Assets</option>
                {availableItems.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em] ml-1">Operational Store</label>
              <select 
                value={selectedStore}
                onChange={handleStoreChange}
                className="w-full text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/10 py-3 px-5 bg-white text-slate-800 appearance-none cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
              >
                <option value="전체 지점">📍 All Global Stores</option>
                {availableStores.map(store => <option key={store} value={store}>{store}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em] ml-1">Sales Channel</label>
              <select 
                value={selectedChannel}
                onChange={handleChannelChange}
                className="w-full text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/10 py-3 px-5 bg-white text-slate-800 appearance-none cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
              >
                <option value="전체 채널">📱 All Analytics Channels</option>
                {availableChannels.map(channel => <option key={channel} value={channel}>{channel}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-8 pt-10 min-h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#AF002D" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#AF002D" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(15,23,36,0.05)" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                axisLine={false} 
                tickLine={false}
                minTickGap={30}
                dy={15}
              />
              <YAxis 
                domain={[0, yAxisMax]}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => value === 0 ? '0' : value >= 10000 ? `${(value/10000).toFixed(0)}M` : value.toLocaleString()}
                dx={-15}
              />
              <Tooltip 
                cursor={{ stroke: 'rgba(175,0,45,0.1)', strokeWidth: 2 }}
                contentStyle={{ 
                  borderRadius: '1.5rem', 
                  border: '1px solid rgba(15,23,36,0.1)', 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 20px 40px -10px rgba(15, 23, 36, 0.15)', 
                  padding: '20px',
                  fontWeight: 'black',
                  color: '#0F1724'
                }}
                itemStyle={{ color: '#AF002D' }}
                formatter={(value: any) => [`${unit} ${Number(value).toLocaleString()}`, selectedDataKey]}
                labelStyle={{ color: '#94a3b8', marginBottom: '8px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Line 
                type="monotone" 
                dataKey={selectedDataKey} 
                stroke="#AF002D" 
                strokeWidth={5}
                dot={false}
                activeDot={{ r: 6, fill: '#AF002D', stroke: '#fff', strokeWidth: 4, shadow: '0 10px 20px rgba(175,0,45,0.2)' }}
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
  );
}
