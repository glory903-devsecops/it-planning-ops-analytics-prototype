import React from 'react';
import { Brain, ChevronRight, Target, Lightbulb, Activity, ArrowUpRight } from 'lucide-react';

interface AIResult {
  title: string;
  hypothesis: string;
  recommendation: string;
  metricReference: string;
  impactScore: number;
}

interface Props {
  results: AIResult[];
}

export function DataDrivenAIPanel({ results }: Props) {
  return (
    <div className="bg-[#0B0F1A] border border-white/10 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group h-full flex flex-col">
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-1000" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl ring-4 ring-blue-500/10 group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-black text-xl tracking-tight uppercase">AI Decision Agent</h4>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] opacity-60">Strategic Reasoning Core</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[9px] font-black text-blue-400 animate-pulse">ANALYZING REAL-TIME DATA</span>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-grow">
          {results.map((res, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer group/card border-l-4 border-l-blue-500"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Insight #{idx + 1}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black text-green-400 bg-green-400/10 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3 h-3" />
                  {res.impactScore}% Impact
                </div>
              </div>

              <h5 className="text-sm font-black mb-3 text-white group-hover/card:text-blue-300 transition-colors uppercase tracking-tight">{res.title}</h5>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Target className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                  <p className="text-xs text-gray-300 leading-relaxed italic opacity-80">
                    "가설: {res.hypothesis}"
                  </p>
                </div>
                
                <div className="flex gap-3 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Recommended Action</p>
                    <p className="text-xs font-medium text-blue-50 leading-relaxed font-sans">
                      {res.recommendation}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Data Reference:</span>
                  <span className="text-[10px] font-bold text-gray-300 bg-white/5 px-2 py-1 rounded-md">{res.metricReference}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-8 mt-auto">
          <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-[2rem] text-[12px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 group/btn border border-white/10">
            의사결정 리포트 생성
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
