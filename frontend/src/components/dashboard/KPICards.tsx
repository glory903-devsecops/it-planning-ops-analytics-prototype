import React from 'react';
import { TrendingUp, ShoppingBag, CreditCard, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { SalesMetrics } from '../../data/repositories/DashboardRepository';

export function KPICards({ metrics }: { metrics: SalesMetrics | null }) {
  if (!metrics) return null;

  const cards = [
    {
      title: "일일 총 매출액",
      value: `₩ ${metrics.totalSales.toLocaleString()}`,
      description: "오늘 시뮬레이션 합계",
      icon: <TrendingUp className="w-5 h-5 text-[#003B6D]" />,
      trend: "+12.5%",
      trendUp: true,
      bg: "bg-blue-50"
    },
    {
      title: "총 주문/결제 건수",
      value: `${metrics.totalOrders.toLocaleString()} 건`,
      description: "전일 시뮬레이션 대비",
      icon: <ShoppingBag className="w-5 h-5 text-green-600" />,
      trend: "+8.2%",
      trendUp: true,
      bg: "bg-green-50"
    },
    {
      title: "평균 객단가 (AOV)",
      value: `₩ ${metrics.averageOrderValue.toLocaleString()}`,
      description: "주문 1건당 평균",
      icon: <CreditCard className="w-5 h-5 text-purple-600" />,
      trend: "+₩ 450",
      trendUp: true,
      bg: "bg-purple-50"
    },
    {
      title: "오늘의 베스트셀러",
      value: metrics.bestSeller,
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
        <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight truncate max-w-[200px]" title={card.value}>{card.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl ${card.bg}`}>
                {card.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${card.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {card.trend}
              </span>
              <span className="text-gray-400 ml-2">{card.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
