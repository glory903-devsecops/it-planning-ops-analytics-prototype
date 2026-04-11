import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Bot, Send, ShieldAlert, Zap, TrendingUp } from 'lucide-react';

export function AIAssistantPanel() {
  return (
    <Card className="border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col h-full bg-[#0B0F1A] rounded-[2rem] overflow-hidden text-white group">
      <CardHeader className="bg-gradient-to-b from-white/10 to-transparent border-b border-white/5 flex py-6 px-8 flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg ring-4 ring-blue-500/10">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base font-black tracking-tight text-white/90">Ops Decision AI</CardTitle>
            <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Autonomous Core</p>
          </div>
        </div>
        <div className="flex items-center text-[10px] font-black text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
          ACTIVE
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col min-h-0">
        {/* Chat / Insights Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent">
          {/* AI Initial Message */}
          <div className="flex items-start space-x-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center shrink-0 shadow-xl">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-4 w-full">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl rounded-[1.5rem] rounded-tl-none p-5 text-gray-300 leading-relaxed">
                <p className="mb-4 font-semibold text-white/90">현재 대학가 상권(신촌역점, 홍대입구역점)에서 오후 시간대 진입과 함께 <span className="text-blue-400 font-black tracking-tight">'초당옥수수 1인빙수'</span>의 주문량이 급증하고 있습니다.</p>
                
                <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 my-4 transition-all hover:bg-indigo-500/10 group/item">
                  <div className="flex items-center font-black text-indigo-400 text-xs mb-3 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Business intelligence
                  </div>
                  <ul className="space-y-2 ml-1">
                    <li className="flex items-start gap-2 text-gray-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0"></span>
                      어제 동시간 대비 매출액 <span className="text-white font-bold">14.2%</span> 상승 예상
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0"></span>
                      오피스 상권은 커피류 위주로 안정적 매출 시뮬레이션 중
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 transition-all hover:bg-blue-500/10">
                  <div className="flex items-center font-black text-blue-400 text-xs mb-3 uppercase tracking-wider">
                    <Zap className="w-4 h-4 mr-2" />
                    AI Action Recommendations
                  </div>
                  <ul className="space-y-2 ml-1">
                    <li className="flex items-start gap-2 text-gray-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                      대학가 대상 '빙수+베이커리' 앱 푸시 즉시 발송 제안
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                      가맹점 원재료 추가 발주 권고 알림 세팅 완료
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Mock Message */}
          <div className="flex items-start space-x-3 justify-end animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-gradient-to-br from-[#003B6D] to-[#001D3D] text-white shadow-2xl rounded-3xl rounded-tr-none p-4 w-[85%] border border-white/5">
              <p className="text-sm font-medium leading-relaxed italic">분석 훌륭하네. 제안한 대로 대학가 상권 앱 푸시 즉시 발송하고, 각 가맹점에 재료 발주 알림도 보내줘.</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/5 border-t border-white/5 backdrop-blur-xl">
          <div className="relative group/input">
            <input 
              type="text" 
              placeholder="Ask for deeper strategic actions..."
              className="w-full pl-6 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all shadow-inner group-hover/input:bg-white/10 placeholder:text-gray-600"
            />
            <button className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white rounded-xl transition-all shadow-lg active:scale-95">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
