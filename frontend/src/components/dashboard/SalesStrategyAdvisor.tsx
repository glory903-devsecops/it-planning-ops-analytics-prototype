import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Zap, Target, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export function SalesStrategyAdvisor() {
  const directives = [
    {
      id: 'D-001',
      title: 'Targeted Morning Promotion: Cold Brew Series',
      context: 'Office district traffic is peaking 15 mins earlier than usual.',
      action: 'Trigger push notifications for Membership Gold+ within 500m of Gangnam/Yeouido branches.',
      impact: '+12.5%',
      risk: 'Low',
      status: 'Ready'
    },
    {
      id: 'D-002',
      title: 'Inventory Rebalancing: Single-Person Shaved Ice',
      context: 'Temperature spike predicted (+3°C) for University areas (Hongdae/Sinchon).',
      action: 'Redirect logic to prioritize SKU-902 stock to University hotspots.',
      impact: '+8.2%',
      risk: 'Medium',
      status: 'Executing'
    }
  ];

  return (
    <Card className="glass-card rounded-[2.5rem] overflow-hidden bg-[#020617]/40 border-white/5 shadow-2xl h-full flex flex-col">
      <CardHeader className="p-8 border-b border-white/5 bg-gradient-to-r from-blue-500/10 to-transparent">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                    <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <CardTitle className="text-xl font-black text-white tracking-tighter uppercase italic">Sales Strategy Advisor</CardTitle>
                    <p className="text-[10px] font-black text-blue-400/60 uppercase tracking-[0.2em] mt-0.5">Tactical Operational Directives</p>
                </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">AI Core Accuracy:</span>
                <span className="text-xs font-black text-emerald-400">98.4%</span>
            </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        {directives.map((directive, idx) => (
          <div 
            key={directive.id} 
            className="relative group p-6 rounded-[1.8rem] bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-600 bg-black/40 px-2 py-1 rounded-md border border-white/5">{directive.id}</span>
                    <h4 className="text-sm font-black text-white tracking-tight">{directive.title}</h4>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    directive.status === 'Executing' ? 'bg-emerald-500/10 text-emerald-400 animate-pulse' : 'bg-blue-500/10 text-blue-400'
                }`}>
                    {directive.status}
                </div>
            </div>

            <p className="text-xs text-slate-400 mb-5 leading-relaxed font-medium">
                <span className="text-blue-400 font-black mr-2">CONTEXT:</span>
                {directive.context}
            </p>

            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 mb-6">
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">
                    <Zap className="w-3 h-3" /> Recommended Action
                </div>
                <p className="text-xs font-bold text-slate-200 leading-snug">{directive.action}</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Impact</span>
                        <span className="text-xs font-black text-emerald-400">{directive.impact}</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/5" />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Risk</span>
                        <span className={`text-xs font-black ${directive.risk === 'Low' ? 'text-blue-400' : 'text-amber-400'}`}>{directive.risk}</span>
                    </div>
                </div>
                <button className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-[10px] font-black uppercase transition-all shadow-xl active:scale-95">
                    Authorize Commit
                </button>
            </div>
          </div>
        ))}

        <div className="mt-auto p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Autonomous Guardrails Active</span>
            </div>
            <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#020617] bg-slate-800" />
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
