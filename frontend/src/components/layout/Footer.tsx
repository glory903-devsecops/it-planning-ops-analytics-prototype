import React from 'react';
import { ShieldCheck, Info, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-20 pt-12 pb-12 border-t border-gray-100/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start opacity-70">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-[#003B6D] to-[#001D3D] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
              E
            </div>
            <span className="font-bold text-base tracking-tight text-[#002C5F]">이디야 AX Intelligence</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-500 font-medium">
            EDIYA AX Decision Platform은 대규모 데이터 처리 아키텍처 및 AI 의사결정 지원 시스템의 기술 검증을 위해 설계된 프로토타입 플랫폼입니다.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Info className="w-3 h-3" /> System Info
          </h4>
          <ul className="text-[11px] font-bold text-gray-500 space-y-2">
            <li className="flex justify-between">
              <span>Engine Version</span>
              <span className="text-[#003B6D]">v2.4.0-Enterprise</span>
            </li>
            <li className="flex justify-between">
              <span>Data Pipeline</span>
              <span className="text-emerald-600">Active (Real-time)</span>
            </li>
            <li className="flex justify-between">
              <span>Reasoning Core</span>
              <span className="text-blue-600">Llama-3-70B Integrated</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Technical Disclaimer
          </h4>
          <p className="text-[10px] leading-relaxed text-gray-400 font-medium border-l-2 border-gray-200 pl-4 py-1 italic">
            실제 영업 데이터와 무관하며, 아키텍처 역량 검증용 가상 시뮬레이션 환경입니다. 표출된 지표와 AI 제안은 실험적 도구로서 활용되어야 합니다.
          </p>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          © {currentYear} Ediya AX Intelligence Platform. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[10px] font-black text-gray-400 hover:text-[#003B6D] transition-colors uppercase tracking-widest">Documentation</a>
          <a href="#" className="text-[10px] font-black text-gray-400 hover:text-[#003B6D] transition-colors uppercase tracking-widest">Privacy Policy</a>
          <a href="https://github.com/glory903-devsecops/it-planning-ops-analytics-prototype" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
