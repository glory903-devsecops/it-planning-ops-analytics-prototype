import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Bot, Send, ShieldAlert, Zap, TrendingUp } from 'lucide-react';

export function AIAssistantPanel() {
  return (
    <Card className="border-none shadow-sm flex flex-col h-full bg-gradient-to-b from-white to-[#f9fafb]">
      <CardHeader className="border-b border-gray-100 flex pb-4 flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-[#4b3832]/10 rounded-lg">
            <Bot className="w-5 h-5 text-[#4b3832]" />
          </div>
          <CardTitle className="text-lg text-gray-800">Ops Decision AI</CardTitle>
        </div>
        <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
          Ready
        </span>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col">
        {/* Chat / Insights Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
          {/* AI Initial Message */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#4b3832] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm p-4 text-gray-700 w-[90%]">
              <p className="mb-2 w-full font-medium">현재 대학가 상권(신촌역점, 홍대입구역점)에서 오후 시간대 진입과 함께 <span className="text-[#003B6D] font-bold">'초당옥수수 1인빙수'</span>의 주문량이 급증하고 있습니다.</p>
              
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 my-3">
                <div className="flex items-center font-medium text-purple-800 mb-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  비즈니스 트렌드 분석
                </div>
                <ul className="list-disc list-inside text-purple-700 space-y-1 ml-1">
                  <li>어제 동시간 대비 초당옥수수 1인빙수 매출액 14% 상승 예상</li>
                  <li>강남 등 오피스 상권은 NEW 아메리카노 등 커피류 위주로 안정적 매출 발생중</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center font-medium text-[#003B6D] mb-1">
                  <Zap className="w-4 h-4 mr-1" />
                  AI 마케팅 & 핵심 액션 제안
                </div>
                <ul className="list-disc list-inside text-[#003B6D]/80 space-y-1 ml-1">
                  <li>대학가 상권 대상 '빙수+베이커리 세트' 앱 푸시 발송 (업셀링 유도)</li>
                  <li>시즌 메뉴 재료(옥수수, 얼음 등) 가맹점 추가 발주 권고 알림</li>
                  <li>저녁 시간대 추가 유입을 위한 마케팅 캠페인 세팅 완료</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* User Mock Message */}
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-[#003B6D] text-white shadow-sm rounded-2xl rounded-tr-sm p-3 w-[80%]">
              <p>분석 훌륭하네. 제안한 대로 대학가 상권 앱 푸시 즉시 발송하고, 각 가맹점에 재료 발주 알림도 보내줘.</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask AI for deeper insights or actions..."
              className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4b3832]/20 focus:border-[#4b3832] transition-shadow shadow-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-[#4b3832] hover:bg-[#3a2b26] text-white rounded-lg transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
