import React from 'react';
import { Activity, Clock, ChevronRight } from 'lucide-react';
import { ChatMessage } from '../../types/dashboard';

interface AIStrategyPanelProps {
  mode: 'sales' | 'scm';
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onOpenReport: () => void;
  isTyping?: boolean;
}

export const AIStrategyPanel: React.FC<AIStrategyPanelProps> = ({
  mode,
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  onOpenReport,
  isTyping = false,
}) => {
  const isSales = mode === 'sales';
  const themeColor = isSales ? 'blue' : 'indigo';
  const themeHex = isSales ? '#003B6D' : '#003B6D'; // Using consistent brand navy but for icons/accents
  
  return (
    <div className="bg-[#0B0F1A]/95 border border-white/10 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group h-[725px] flex flex-col justify-between backdrop-blur-2xl">
      <div className={`absolute -right-20 -top-20 w-80 h-80 bg-${themeColor}-600/10 rounded-full blur-[100px] group-hover:bg-${themeColor}-600/20 transition-all duration-1000`} />
      
      {/* Header */}
      <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                  <div className={`p-4 bg-gradient-to-br from-${themeColor}-600 to-indigo-600 rounded-2xl shadow-xl ring-4 ring-${themeColor}-500/10 group-hover:rotate-12 transition-transform`}>
                      {isSales ? <Activity className="w-6 h-6 text-white" /> : <Clock className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                      <h4 className="font-black text-xl tracking-tight uppercase">
                        {isSales ? 'AI Strategy Lab' : 'SCM Optimizer AI'}
                      </h4>
                      <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 bg-${themeColor}-400 rounded-full animate-pulse`} />
                          <p className={`text-[10px] font-black text-${themeColor}-400 uppercase tracking-widest opacity-60`}>Decision Core Online</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Chat Message Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar mb-6 relative z-10">
          {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                  <div className={`p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed max-w-[85%] ${msg.role === 'user' ? 'bg-[#003B6D] text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'}`}>
                      {msg.content}
                  </div>
              </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-pulse">
               <div className="p-4 bg-white/5 border border-white/10 text-gray-500 rounded-2xl text-[10px] font-black tracking-widest uppercase">AI is analyzing...</div>
            </div>
          )}
      </div>

      {/* Input Area */}
      <div className="relative z-10 pt-4 border-t border-white/5">
          <div className="relative">
              <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                  placeholder={isSales ? "AI에게 전략 질문하기..." : "SCM 궁금점 질문하기..."}
                  className={`w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 pr-20 text-sm focus:outline-none focus:ring-4 focus:ring-${themeColor}-500/20 focus:border-${themeColor}-500/50 transition-all placeholder:text-gray-600 font-medium`}
              />
              <button 
                  onClick={onSendMessage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white text-[#0B0F1A] rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl group/btn"
              >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
          </div>
          
          <button 
              onClick={onOpenReport}
              className="w-full mt-6 py-4 bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group"
          >
               {isSales ? '전략 리포트 정식 생성하기' : 'SCM 수익성 분석 리포트 생성'}
               <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
      </div>
    </div>
  );
};
