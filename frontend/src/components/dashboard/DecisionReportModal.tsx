import React from 'react';
import { formatKoreanCurrency } from '../../lib/formatters';

interface DecisionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'sales' | 'scm';
  metrics: {
    totalSales: number;
    totalOrders: number;
    [key: string]: any;
  };
}

export const DecisionReportModal: React.FC<DecisionReportModalProps> = ({
  isOpen,
  onClose,
  mode,
  metrics,
}) => {
  if (!isOpen) return null;

  const isSales = mode === 'sales';
  const themeColor = isSales ? 'blue' : 'indigo';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
        <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-500">
            <div className="p-10 border-b border-gray-100 flex items-center justify-between shrink-0 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${isSales ? '[#003B6D]' : 'indigo-600'} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-indigo-500/10`}>
                      {isSales ? 'E' : 'S'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                          {isSales ? '경영 전략 통합 주간 리포트' : 'SCM 수익성 및 공급망 최적화 리포트'}
                        </h2>
                        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                          EDIYA AX {isSales ? 'Decision Core' : 'Logistics Suite'} • Confidential
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="px-6 py-3 bg-gray-100 hover:bg-red-50 hover:text-red-600 font-black rounded-2xl transition-all">CLOSE</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12 bg-white">
                <section className="space-y-6">
                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter">I. {isSales ? '총괄 실적 요약' : '분기별 유통 차익 성과'}</h3>
                    <div className={`grid ${isSales ? 'grid-cols-3' : 'grid-cols-2'} gap-8`}>
                        <div className={`p-8 bg-${themeColor}-50/50 rounded-[2.5rem] border border-${themeColor}-100/50`}>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">
                              {isSales ? '분석 기간 매출액' : '누적 유통 총 차익 (Est.)'}
                            </p>
                            <p className={`text-3xl font-black text-${isSales ? '[#003B6D]' : 'indigo-600'} tracking-tight`}>
                              {formatKoreanCurrency(isSales ? metrics.totalSales : 14250000)}
                            </p>
                            {!isSales && <p className="text-xs font-bold text-indigo-400 mt-2">+5.2% against last month</p>}
                        </div>
                        <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100/50">
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">
                              {isSales ? '평균 주문 건수' : '공급망 효율 지수'}
                            </p>
                            <p className="text-3xl font-black text-emerald-600 tracking-tight">
                              {isSales ? `${metrics.totalOrders.toLocaleString()}건` : '98.2 pt'}
                            </p>
                            {!isSales && <p className="text-xs font-bold text-emerald-400 mt-2">Optimal Efficiency Range</p>}
                        </div>
                        {isSales && (
                          <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100/50">
                              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">AI 성과 기여도</p>
                              <p className="text-3xl font-black text-indigo-600 tracking-tight">94.8%</p>
                          </div>
                        )}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-1 bg-indigo-600 rounded-full" />
                        <h3 className="text-4xl font-black text-gray-900 tracking-tighter">
                          II. {isSales ? '데이터 기반 핵심 전략' : 'SCM 최적화 제안'}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {(isSales ? [
                            { title: '수요 예측 최적화', content: '강남본점 및 홍대입구역점의 피크 타임 대비 원재료 공급 주기를 15% 단축하여 품절률을 0.2%로 방어했습니다.' },
                            { title: '디지털 채널 확장', content: '키오스크 비중이 높은 매장의 UI/UX 개선을 통해 주문 리드타임을 평균 12초 단축하는 성과를 거두었습니다.' },
                            { title: '시즌 메뉴 프로모션', content: '신규 빙수 라인업과 베이커리 결합 상품의 구매 전환율이 전년 대비 18% 상승하며 객단가 방어에 성공했습니다.' }
                        ] : [
                            { title: '원유 수급 다변화', content: '현재 특정 공급사 의존도를 15% 낮추고 지역별 로컬 파트너십을 체결하여 배송 지연 리스크를 22% 감소시켰습니다.' },
                            { title: '원두 원가 절감 반영', desc: '국제 원두 시세 하락을 반영하여 가맹점 공급가를 동결하되, 물류 효율화를 통해 유통 수익을 보전했습니다.' },
                            { title: '친환경 부자재 도입', desc: '종이컵 및 리드의 환경 분담금 발생분을 AI 예측 기반 선매입을 통해 원가 상승분을 전액 상쇄했습니다.' }
                        ]).map((item: any, i) => (
                            <div key={i} className="group p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-indigo-600 text-xs shadow-sm">{i+1}</div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 font-medium leading-relaxed">
                                          {item.content || item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="p-10 border-t border-gray-100 bg-gray-50/50 shrink-0 flex items-center justify-between">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Generated by EDIYA AX Autonomous Intelligence Core v4.2
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-[#003B6D] text-white font-black rounded-2xl shadow-lg hover:shadow-blue-900/30 transition-all flex items-center gap-2">
                    {isSales ? 'REPORT PRINT / PDF' : 'PRINT STRATEGY'}
                  </button>
                </div>
            </div>
        </div>
    </div>
  );
};
