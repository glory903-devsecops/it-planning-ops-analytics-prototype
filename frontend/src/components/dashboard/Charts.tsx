import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ChartProps {
  timeSeriesData: any[];
  availableItems?: string[];
  availableStores?: string[];
  channelDistribution: any[];
}

const COLORS = ['#003B6D', '#E85A4F', '#E9B000', '#8F9779', '#4B3832'];

export function DashboardCharts({ timeSeriesData, availableItems = [], availableStores = [], channelDistribution }: ChartProps) {
  const [filterMode, setFilterMode] = useState<'item' | 'store'>('item');
  const [selectedFilter, setSelectedFilter] = useState('총매출액');

  if (!timeSeriesData.length || !channelDistribution.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Time Series 'Stock' Chart */}
      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden mb-6 lg:mb-0 bg-white">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 flex flex-col gap-3 py-4">
          <CardTitle className="text-lg font-bold text-[#002C5F] tracking-tight">시간대별 매출 추이 (Stock View)</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Parallel Buttons */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => { setFilterMode('item'); setSelectedFilter('총매출액'); }}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${filterMode === 'item' ? 'bg-white text-[#002C5F] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                품목별 보기
              </button>
              <button 
                onClick={() => { setFilterMode('store'); setSelectedFilter('총매출액'); }}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${filterMode === 'store' ? 'bg-white text-[#002C5F] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                지점별 보기
              </button>
            </div>

            {/* Dynamic Dropdown */}
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-md focus:ring-[#002C5F] focus:border-[#002C5F] py-1.5 px-3 bg-white shadow-sm flex-1 max-w-[200px]"
            >
              <option value="총매출액">종합 총액 (All)</option>
              {filterMode === 'item' 
                ? availableItems.map(item => <option key={item} value={item}>{item}</option>)
                : availableStores.map(store => <option key={store} value={store}>{store}</option>)
              }
            </select>
          </div>
        </CardHeader>
        <CardContent className="h-[340px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeSeriesData}
              margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => value >= 1000 ? `${(value/10000).toFixed(0)}만` : value}
              />
              <Tooltip 
                cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '3 3' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => [`₩ ${Number(value).toLocaleString()}`, selectedFilter]}
                labelFormatter={(label) => `시간: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey={selectedFilter} 
                stroke="#003B6D" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#E85A4F' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel Distribution Pie Chart */}
      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-4">
          <CardTitle className="text-lg font-bold text-[#002C5F] tracking-tight">주문/결제 채널별 매출 비중</CardTitle>
        </CardHeader>
        <CardContent className="h-[340px] pt-6 pb-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelDistribution}
                cx="50%"
                cy="45%"
                innerRadius="50%"
                outerRadius="75%"
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {channelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => [`₩ ${Number(value).toLocaleString()}`, '매출액']}
              />
              <Legend 
                verticalAlign="bottom" 
                align="center" 
                layout="horizontal" 
                wrapperStyle={{ fontSize: '13px', fontWeight: 500 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
