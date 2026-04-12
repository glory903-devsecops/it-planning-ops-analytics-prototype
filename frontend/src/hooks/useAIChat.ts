import { useState, useCallback } from 'react';
import { ChatMessage } from '../types/dashboard';

interface UseAIChatProps {
  initialMessages?: ChatMessage[];
  apiEndpoint?: string; // Future use: connect to real AI API
  mode: 'sales' | 'scm';
}

export function useAIChat({ initialMessages = [], mode }: UseAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and response
    // In a real app, this would be a fetch to /api/ai
    setTimeout(() => {
      let aiContent = "";
      if (mode === 'sales') {
        aiContent = `분석 결과, 해당 지점들의 재고 현황은 안정적이나 피크 타임 대비 인력 배치가 부족할 것으로 예상됩니다. 추가 인력 지원 및 모바일 쿠폰 발송을 통한 분산 유도를 제안합니다.`;
      } else {
        aiContent = `분석 결과, 현재 원두 공급 가격 하락 시점을 고려하여 주요 오피스 지점의 비축량을 20% 상향할 것을 제안합니다. 물류 비용 대비 기대 이익 상승률은 4.2%입니다.`;
      }
      
      const aiMessage: ChatMessage = { role: 'ai', content: aiContent };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  }, [mode]);

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    sendMessage,
  };
}
