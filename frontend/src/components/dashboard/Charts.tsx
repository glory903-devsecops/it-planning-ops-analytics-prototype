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
  channelDistribution?: any[]; // Kept for backwards compatibility but not used here anymore
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

  // Calculate the absolute maximum Y value for "총매출액" to fix the Y-axis scale
  const maxTotalSales = Math.max(...timeSeriesData.map(d => d['총매출액'] || 0));
  // Add a 10% padding to the top of the max value for better visual headroom
  const yAxisMax = Math.ceil(maxTotalSales * 1.1);

  return (
    <div className="mb-8 w-full">
      {/* Time Series 'Stock' Chart (Full Width) */}
      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white w-full">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 flex flex-col gap-3 py-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold text-[#002C5F] tracking-tight">시간대별 매출 추이 (Stock View)</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-2">
            
            {/* 3 Parallel Dropdowns */}
            <select 
              value={selectedItem}
              onChange={handleItemChange}
              className="text-sm font-medium border border-gray-200 rounded-md focus:ring-[#002C5F] focus:border-[#002C5F] py-1.5 px-3 bg-white shadow-sm flex-1 sm:max-w-[180px]"
            >
              <option value="전체 품목">전체 품목</option>
              {availableItems.map(item => <option key={item} value={item}>{item}</option>)}
            </select>

            <select 
              value={selectedStore}
              onChange={handleStoreChange}
              className="text-sm font-medium border border-gray-200 rounded-md focus:ring-[#002C5F] focus:border-[#002C5F] py-1.5 px-3 bg-white shadow-sm flex-1 sm:max-w-[180px]"
            >
              <option value="전체 지점">전체 지점</option>
              {availableStores.map(store => <option key={store} value={store}>{store}</option>)}
            </select>

            <select 
              value={selectedChannel}
              onChange={handleChannelChange}
              className="text-sm font-medium border border-gray-200 rounded-md focus:ring-[#002C5F] focus:border-[#002C5F] py-1.5 px-3 bg-white shadow-sm flex-1 sm:max-w-[180px]"
            >
              <option value="전체 채널">전체 채널</option>
              {availableChannels.map(channel => <option key={channel} value={channel}>{channel}</option>)}
            </select>

          </div>
        </CardHeader>
        <CardContent className="h-[450px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeSeriesData}
              margin={{ top: 20, right: 40, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#f3f4f6" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false}
                minTickGap={10}
              />
              <YAxis 
                domain={[0, yAxisMax]}
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => value === 0 ? '0' : value >= 10000 ? `${(value/10000).toFixed(0)}만` : value.toLocaleString()}
              />
              <Tooltip 
                cursor={{ stroke: '#003B6D', strokeWidth: 1.5, strokeDasharray: '4 4' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                formatter={(value: any) => [`₩ ${Number(value).toLocaleString()}`, selectedDataKey]}
                labelFormatter={(label) => `시간: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey={selectedDataKey} 
                stroke="#003B6D" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                activeDot={{ r: 7, strokeWidth: 0, fill: '#E85A4F' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
