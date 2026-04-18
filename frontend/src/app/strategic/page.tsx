'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { 
  Search, ShieldCheck, Target, TrendingUp, AlertTriangle, 
  UserCheck, Activity, BrainCircuit, ArrowUpRight, BarChart3
} from 'lucide-react';
import { ExecutiveKpi, StrategicInsight } from '@/domain/types';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ExecutiveSummaryBlock } from '@/components/dashboard/ExecutiveSummaryBlock';
import { DataDrivenAIPanel } from '@/components/dashboard/DataDrivenAIPanel';

export default function StrategicInsightPage() {
  const [data, setData] = useState<{ kpis: ExecutiveKpi[], insights: StrategicInsight[] } | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<StrategicInsight | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API Fetch from our new /api/strategic/init
    const fetchStrategicData = async () => {
      // In a real env, this would be: fetch('/api/strategic/init')
      // For demo, we'll simulate the response based on the new application logic
      const response = await fetch('http://localhost:4000/api/strategic/init');
      const result = await response.json();
      setData(result);
      if (result.insights.length > 0) setSelectedBranch(result.insights[0]);
    };
    fetchStrategicData();
  }, []);

  const radarData = selectedBranch ? [
    { subject: '매출 성과', A: selectedBranch.sales_performance, fullMark: 100 },
    { subject: '품질 관리', A: selectedBranch.compliance_score, fullMark: 100 },
    { subject: '고객 경험', A: selectedBranch.customer_sentiment, fullMark: 100 },
    { subject: '재고 안정', A: 100 - selectedBranch.inventory_risk, fullMark: 100 },
    { subject: '지역 점유', A: 85, fullMark: 100 },
  ] : [];

  const filteredInsights = data?.insights.filter(i => 
    i.store_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-indigo-400" />
              Strategic Command Center <span className="text-sm font-normal text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded-full uppercase tracking-widest">Enterprise V3</span>
            </h1>
            <p className="text-slate-400 mt-1">HQ Strategic Insight: CRM + Operations + Compliance Integration</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="지사 검색..." 
                className="bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <ExecutiveSummaryBlock kpis={data?.kpis || []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Strategic Map / Health Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target className="w-32 h-32" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                Branch Health Matrix (60 Branches)
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {filteredInsights.map(insight => (
                  <button
                    key={insight.store_id}
                    onClick={() => setSelectedBranch(insight)}
                    className={`h-12 rounded-lg transition-all flex items-center justify-center text-xs font-bold border ${
                      selectedBranch?.store_id === insight.store_id 
                        ? 'border-white scale-110 z-10' 
                        : 'border-white/5 hover:border-white/20'
                    } ${
                      insight.health_score > 85 ? 'bg-emerald-500/30 text-emerald-300' :
                      insight.health_score > 75 ? 'bg-amber-500/30 text-amber-300' :
                      'bg-rose-500/30 text-rose-300'
                    }`}
                    title={`${insight.store_name}: ${insight.health_score}%`}
                  >
                    {insight.health_score}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-6 text-xs text-slate-400 justify-center border-t border-white/10 pt-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500/50 rounded" /> 우수 (85%+)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500/50 rounded" /> 양호 (75%+)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500/50 rounded" /> 집중 관리 (75%-)</div>
              </div>
            </div>

            {/* Selected Branch Detail: Radar & Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  Health Profile
                </h3>
                <p className="text-xs text-slate-400 mb-6">{selectedBranch?.store_name} 전략 분석 프로필</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="지수"
                        dataKey="A"
                        stroke="#818cf8"
                        fill="#818cf8"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-400" />
                  Predictive Analysis
                </h3>
                {selectedBranch ? (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border ${selectedBranch.is_anomaly ? 'bg-rose-500/10 border-rose-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Status Score</span>
                        <span className={`text-lg font-bold ${selectedBranch.is_anomaly ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {selectedBranch.health_score}/100
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {selectedBranch.recommendation}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>예측 수요 대기량</span>
                        <span className="text-white font-medium">84.2%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '84.2%' }}></div>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 group">
                      심층 분석 리포트 생성
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 text-slate-500">지사를 선택해 주세요.</div>
                )}
              </div>
            </div>
          </div>

          {/* AI Strategic Panel */}
          <div className="space-y-6">
            <DataDrivenAIPanel 
              moduleName="HQ Strategy"
              hypothesis="앱 오더(Siren Order) 비중이 높은 지사일수록 배달 지연 임계치가 낮아지며, 이는 고객 충성도(LTV) 하락으로 직결됨."
              recommendations={[
                { id: 1, text: "강남/신촌 지역 앱 오더 폭주 기반 선행 재고 120% 확보 권고", impact: "High" },
                { id: 2, text: "건건성 점수 75점 미만 지사 대상 SV 특별 위생/CS 순회 교육 편성", impact: "Critical" },
                { id: 3, text: "VIP 등급 고객 이탈 방지를 위한 타겟 할인 쿠폰 2만 건 발행 제안", impact: "Medium" }
              ]}
              insightData={[
                { label: 'LTV 추정치', value: '₩142,000' },
                { label: '서비스 가용성', value: '99.9%' }
              ]}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
