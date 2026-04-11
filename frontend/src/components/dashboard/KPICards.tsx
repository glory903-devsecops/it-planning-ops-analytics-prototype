import React from 'react';
import { TrendingUp, ShoppingBag, CreditCard, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { SalesMetrics } from '../../data/repositories/DashboardRepository';

export function KPICards({ metrics }: { metrics: SalesMetrics | null }) {
  if (!metrics) return null;

  const cards = [
    {
      title: "일일 총 매출액",
      value: `₩ ${(metrics?.totalSales || 0).toLocaleString()}`,
      description: "오늘 시뮬레이션 합계",
      icon: <TrendingUp className="w-5 h-5 text-[#003B6D]" />,
      trend: "+12.5%",
      trendUp: true,
      bg: "bg-blue-50"
    },
    {
      title: "총 주문/결제 건수",
      value: `${(metrics?.totalOrders || 0).toLocaleString()} 건`,
      description: "전일 시뮬레이션 대비",
      icon: <ShoppingBag className="w-5 h-5 text-green-600" />,
      trend: "+8.2%",
      trendUp: true,
      bg: "bg-green-50"
    },
    {
      title: "평균 객단가 (AOV)",
      value: `₩ ${(metrics?.averageOrderValue || 0).toLocaleString()}`,
      description: "주문 1건당 평균",
      icon: <CreditCard className="w-5 h-5 text-purple-600" />,
      trend: "+₩ 450",
      trendUp: true,
      bg: "bg-purple-50"
    },
    {
      title: "오늘의 베스트셀러",
      value: metrics?.bestSeller || "데이터 수집 중",
      description: "최다 판매 메뉴",
      icon: <Star className="w-5 h-5 text-yellow-600" />,
      trend: "인기폭발",
      trendUp: true,
      bg: "bg-yellow-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <Card key={idx} className="border border-white/40 bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{card.title}</p>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-800 tracking-tight truncate max-w-[180px]" title={card.value}>{card.value}</h3>
              </div>
              <div className={`p-3 rounded-2xl ${card.bg} shadow-inner`}>
                {card.icon}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${card.trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {card.trend}
              </div>
              <span className="text-[10px] font-medium text-gray-400 italic">{card.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
