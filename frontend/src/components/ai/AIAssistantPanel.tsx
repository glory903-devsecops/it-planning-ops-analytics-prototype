import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Bot, Send, ShieldAlert, Zap, TrendingUp } from 'lucide-react';

export function AIAssistantPanel() {
  return (
    <Card className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full bg-white/80 border-slate-100 shadow-xl">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex p-8 flex-row items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-500 blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <Bot className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div>
            <CardTitle className="text-xl font-black tracking-tighter text-slate-900 italic uppercase">Ops Core AI</CardTitle>
            <p className="text-[9px] font-bold text-red-600 uppercase tracking-[0.2em] mt-0.5">Decision Intelligence v4</p>
          </div>
        </div>
        <div className="flex items-center text-[10px] font-black text-[#059669] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
          ACTIVE
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col min-h-0 bg-gradient-to-br from-slate-50/50 to-white">
        {/* Chat / Insights Area */}
        <div className="flex-1 p-8 overflow-y-auto space-y-8 text-sm custom-scrollbar">
          {/* AI Initial Message */}
          <div className="flex items-start space-x-5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0 shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-5 w-full">
              <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] rounded-tl-none p-6 text-slate-600 leading-relaxed">
                <p className="mb-5 font-bold text-slate-900 leading-tight italic tracking-tight underline decoration-red-500/20 underline-offset-4">지능형 분석 결과, 대학가 상권(신촌, 홍대)에서 <span className="text-red-600 font-black tracking-tighter cursor-help">'초당옥수수 1인빙수'</span>의 구매 전환율이 전주 대비 <span className="text-[#059669] font-black">28.5%</span> 급상승했습니다.</p>
                
                <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 my-5 transition-all hover:bg-white hover:shadow-md">
                  <div className="flex items-center font-black text-indigo-700 text-[10px] mb-4 uppercase tracking-[0.2em]">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trend Analysis
                  </div>
                  <ul className="space-y-3 ml-1">
                    <li className="flex items-start gap-3 text-slate-500 text-xs font-bold leading-tight">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-0.5 shrink-0 border-2 border-white shadow-sm"></span>
                      점심 피크 타임 이후 <span className="text-slate-900 font-black">디저트 수요</span> 집중 현상 포착
                    </li>
                    <li className="flex items-start gap-3 text-slate-500 text-xs font-bold leading-tight">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-0.5 shrink-0 border-2 border-white shadow-sm"></span>
                      MZ 세대 선호 메뉴 위주의 <span className="text-slate-900 font-black">바이럴 유효성</span> 확인
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 transition-all hover:bg-white hover:shadow-md">
                  <div className="flex items-center font-black text-[#059669] text-[10px] mb-4 uppercase tracking-[0.2em]">
                    <Zap className="w-4 h-4 mr-2" />
                    Recommended Actions
                  </div>
                  <ul className="space-y-3 ml-1">
                    <li className="flex items-start gap-3 text-slate-500 text-xs font-bold leading-tight">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#059669] mt-0.5 shrink-0 border-2 border-white shadow-sm"></span>
                      대학 상권 대상 <span className="text-slate-900 font-black">타겟 푸시 마케팅</span> 즉시 승인 대기
                    </li>
                    <li className="flex items-start gap-3 text-slate-500 text-xs font-bold leading-tight">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#059669] mt-0.5 shrink-0 border-2 border-white shadow-sm"></span>
                      주요 매장 원재료 <span className="text-slate-900 font-black">우선순위 자동 발주</span> 세팅
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Message */}
          <div className="flex items-start space-x-3 justify-end animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="bg-slate-900 text-white shadow-xl rounded-[1.8rem] rounded-tr-none p-5 max-w-[85%] border border-slate-800">
              <p className="text-sm font-bold leading-tight italic opacity-95">분석이 아주 예리하네. 제안한 대로 대학가 상권 타겟팅 마케팅 즉시 집행하고, 물류 우선순위도 조정 완료해줘.</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8 bg-slate-50/80 border-t border-slate-100">
          <div className="relative group/input">
            <input 
              type="text" 
              placeholder="Ask for deeper strategic analysis..."
              className="w-full pl-7 pr-16 py-5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/20 transition-all shadow-sm placeholder:text-slate-400 font-bold"
            />
            <button className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-lg active:scale-95 border border-white/10 group-hover/input:scale-105">
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
  );
}
