import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Bot, Send, ShieldAlert, Zap, TrendingUp } from 'lucide-react';

export function AIAssistantPanel() {
  return (
    <Card className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full bg-[#020617]/40 ring-1 ring-white/5">
      <CardHeader className="bg-gradient-to-b from-white/5 to-transparent border-b border-white/5 flex p-8 flex-row items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl border border-white/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-xl font-black tracking-tighter text-white italic uppercase">Ops Core AI</CardTitle>
            <p className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em] mt-0.5">Decision Intelligence v3</p>
          </div>
        </div>
        <div className="flex items-center text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
          READY
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col min-h-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.03),_transparent)]">
        {/* Chat / Insights Area */}
        <div className="flex-1 p-8 overflow-y-auto space-y-8 text-sm custom-scrollbar">
          {/* AI Initial Message */}
          <div className="flex items-start space-x-5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 shadow-2xl">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-5 w-full">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-[2rem] rounded-tl-none p-6 text-slate-300 leading-relaxed ring-1 ring-white/5">
                <p className="mb-5 font-bold text-white leading-tight">지능형 분석 결과, 대학가 상권(신촌, 홍대)에서 <span className="text-blue-400 font-black tracking-tight">'초당옥수수 1인빙수'</span>의 구매 전환율이 전주 대비 <span className="text-emerald-400 font-black">28.5%</span> 급상승했습니다.</p>
                
                <div className="p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 my-5 transition-all hover:bg-indigo-500/10">
                  <div className="flex items-center font-black text-indigo-400 text-[10px] mb-4 uppercase tracking-[0.2em]">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trend Analysis
                  </div>
                  <ul className="space-y-3 ml-1">
                    <li className="flex items-start gap-3 text-slate-400 text-xs">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                      점심 피크 타임 이후 <span className="text-white font-black">디저트 수요</span> 집중 현상 포착
                    </li>
                    <li className="flex items-start gap-3 text-slate-400 text-xs">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                      MZ 세대 선호 메뉴 위주의 <span className="text-white font-black">바이럴 유효성</span> 확인
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 transition-all hover:bg-blue-500/10">
                  <div className="flex items-center font-black text-blue-400 text-[10px] mb-4 uppercase tracking-[0.2em]">
                    <Zap className="w-4 h-4 mr-2" />
                    Recommended Actions
                  </div>
                  <ul className="space-y-3 ml-1">
                    <li className="flex items-start gap-3 text-slate-400 text-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></span>
                      대학 상권 대상 <span className="text-white font-black">타겟 푸시 마케팅</span> 즉시 승인 대기
                    </li>
                    <li className="flex items-start gap-3 text-slate-400 text-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></span>
                      주요 매장 원재료 <span className="text-white font-black">우선순위 자동 발주</span> 세팅
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Message */}
          <div className="flex items-start space-x-3 justify-end animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl rounded-[1.8rem] rounded-tr-none p-5 max-w-[85%] border border-white/10 ring-1 ring-white/10">
              <p className="text-sm font-bold leading-tight italic opacity-90">분석이 아주 예리하네. 제안한 대로 대학가 상권 타겟팅 마케팅 즉시 집행하고, 물류 우선순위도 조정 완료해줘.</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8 bg-white/5 border-t border-white/5 backdrop-blur-3xl">
          <div className="relative group/input">
            <input 
              type="text" 
              placeholder="Ask for deeper strategic analysis..."
              className="w-full pl-7 pr-16 py-4.5 bg-slate-900/50 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all shadow-2xl placeholder:text-slate-600"
            />
            <button className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white rounded-xl transition-all shadow-2xl active:scale-95 border border-white/10 group-hover/input:scale-105">
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
