import React from 'react';
import { Search, Menu, TrendingUp, Truck, Network, Bell } from 'lucide-react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm justify-between">
        <div>
          <div className="p-6 border-b border-gray-200 mb-4 h-16 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-[#002C5F] text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xl shadow-sm tracking-widest">
                E
              </div>
              <span className="font-bold text-xl tracking-tight text-[#002C5F]">이디야 AX</span>
            </div>
          </div>
          
          <nav className="px-4 space-y-1">
            <a href="#" className="flex items-center space-x-3 bg-blue-50 text-[#003B6D] px-3 py-2.5 rounded-lg font-medium transition-colors">
              <TrendingUp className="w-5 h-5 text-[#003B6D]" />
              <span>매출 인사이트</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium transition-colors">
              <Truck className="w-5 h-5 text-gray-400" />
              <span>물류 인사이트</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg font-medium transition-colors">
              <Network className="w-5 h-5 text-gray-400" />
              <span>네트워크 인사이트</span>
            </a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex justify-center">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/glory903-devsecops/it-planning-ops-analytics-prototype.git" className="p-2 text-gray-400 hover:text-[#002C5F] hover:bg-gray-100 rounded-full transition-colors" title="GitHub Repository">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm shrink-0">
          <div className="flex items-center text-gray-800">
            <button className="mr-4 lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold tracking-tight">AX Decision Intelligence Platform</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="인사이트 검색..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003B6D]/20 focus:border-[#003B6D] w-64 transition-shadow bg-gray-50"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar relative flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          {/* Disclaimer Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center pb-2">
            <p className="text-xs text-gray-500 font-medium">
              ※ 본 대시보드에 표출되는 메뉴명, 매장명은 이디야커피의 일부 명칭을 차용하였으나, 모든 매출액 정보, 판매량, 에러 수치 등은 실제 영업과 무관한 시스템 시뮬레이션용 가상 데이터입니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
