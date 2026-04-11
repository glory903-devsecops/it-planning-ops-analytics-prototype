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
    <div className="mb-8 w-full group">
      <Card className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500">
        <CardHeader className="bg-gradient-to-r from-gray-50/80 to-transparent border-b border-gray-100/50 flex flex-col gap-4 p-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-8 bg-gradient-to-b from-[#003B6D] to-blue-400 rounded-full" />
              <CardTitle className="text-xl font-black text-gray-800 tracking-tight">시간대별 매출 트렌드</CardTitle>
            </div>
            <span className="text-xs font-bold text-[#003B6D] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">REAL-TIME</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Menu Filter</label>
              <select 
                value={selectedItem}
                onChange={handleItemChange}
                className="w-full text-sm font-semibold border-none rounded-xl focus:ring-2 focus:ring-[#003B6D]/20 py-2.5 px-4 bg-white/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] appearance-none cursor-pointer transition-all hover:bg-white"
              >
                <option value="전체 품목">✨ 전체 품목 점검</option>
                {availableItems.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Store Filter</label>
              <select 
                value={selectedStore}
                onChange={handleStoreChange}
                className="w-full text-sm font-semibold border-none rounded-xl focus:ring-2 focus:ring-[#003B6D]/20 py-2.5 px-4 bg-white/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] appearance-none cursor-pointer transition-all hover:bg-white"
              >
                <option value="전체 지점">📍 전체 지점 현황</option>
                {availableStores.map(store => <option key={store} value={store}>{store}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Channel Filter</label>
              <select 
                value={selectedChannel}
                onChange={handleChannelChange}
                className="w-full text-sm font-semibold border-none rounded-xl focus:ring-2 focus:ring-[#003B6D]/20 py-2.5 px-4 bg-white/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] appearance-none cursor-pointer transition-all hover:bg-white"
              >
                <option value="전체 채널">📱 전체 채널 분석</option>
                {availableChannels.map(channel => <option key={channel} value={channel}>{channel}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[480px] p-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData} margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
                axisLine={false} 
                tickLine={false}
                minTickGap={20}
                dy={10}
              />
              <YAxis 
                domain={[0, yAxisMax]}
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => value === 0 ? '0' : value >= 10000 ? `${(value/10000).toFixed(0)}만` : value.toLocaleString()}
                dx={-10}
              />
              <Tooltip 
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                contentStyle={{ 
                  borderRadius: '20px', 
                  border: 'none', 
                  backgroundColor: 'rgba(255,255,255,0.9)', 
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
                  padding: '16px',
                  fontWeight: 'bold'
                }}
                formatter={(value: any) => [`₩ ${Number(value).toLocaleString()}`, selectedDataKey]}
                labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase' }}
              />
              <Line 
                type="natural" 
                dataKey={selectedDataKey} 
                stroke="#003B6D" 
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 8, fill: '#003B6D', stroke: '#fff', strokeWidth: 3 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
