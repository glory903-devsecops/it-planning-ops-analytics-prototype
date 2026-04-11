import React, { useState } from 'react';
import { Search, Menu, TrendingUp, Truck, Network, Bell, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isSales = pathname === '/';
  const isLogistics = pathname?.startsWith('/logistics');
  const isNetwork = pathname?.startsWith('/network');

  return (
    <div className="flex h-screen bg-[#001D3D] text-gray-900 overflow-hidden font-sans font-light relative">
      {/* Premium Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay bg-cover bg-center bg-no-repeat fixed"
        style={{ backgroundImage: `url('/images/dashboard_bg.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#001D3D]/80 via-transparent to-black/20 pointer-events-none" />
      
      {/* Sidebar with Sliding Animation */}
      <aside className={`fixed inset-y-0 left-0 z-30 transform ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'} bg-white/90 backdrop-blur-xl border-r border-white/50 flex flex-col shadow-[4px_0_24px_-10px_rgba(0,0,0,0.05)] justify-between transition-all duration-300 ease-in-out`}>
        <div className={isSidebarOpen ? 'opacity-100 transition-opacity delay-100' : 'opacity-0 pointer-events-none'}>
          <div className="p-6 mb-4 h-20 flex items-center justify-between bg-gradient-to-br from-white/60 to-transparent border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#003B6D] to-[#001D3D] text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xl shadow-md tracking-wider">
                E
              </div>
              <span className="font-bold text-lg tracking-tight text-[#002C5F]">이디야 AX</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="px-4 space-y-2 mt-4">
            <Link href="/" className={`group flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isSales ? 'bg-gradient-to-r from-blue-50 to-transparent text-[#003B6D] shadow-sm ring-1 ring-blue-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
              <div className={`p-1.5 rounded-lg transition-colors ${isSales ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                 <TrendingUp className={`w-5 h-5 transition-transform ${isSales ? 'text-[#003B6D] scale-110' : 'text-gray-400 group-hover:text-blue-500 group-hover:scale-110'}`} />
              </div>
              <span className={isSales ? 'font-bold' : ''}>매출 인사이트</span>
            </Link>
            <Link href="/logistics" className={`group flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isLogistics ? 'bg-gradient-to-r from-blue-50 to-transparent text-[#003B6D] shadow-sm ring-1 ring-blue-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
              <div className={`p-1.5 rounded-lg transition-colors ${isLogistics ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                 <Truck className={`w-5 h-5 transition-transform ${isLogistics ? 'text-[#003B6D] scale-110' : 'text-gray-400 group-hover:text-blue-500 group-hover:scale-110'}`} />
              </div>
              <span className={isLogistics ? 'font-bold' : ''}>물류 인사이트</span>
            </Link>
            <Link href="/network" className={`group flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isNetwork ? 'bg-gradient-to-r from-blue-50 to-transparent text-[#003B6D] shadow-sm ring-1 ring-blue-100/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
              <div className={`p-1.5 rounded-lg transition-colors ${isNetwork ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                 <Network className={`w-5 h-5 transition-transform ${isNetwork ? 'text-[#003B6D] scale-110' : 'text-gray-400 group-hover:text-blue-500 group-hover:scale-110'}`} />
              </div>
              <span className={isNetwork ? 'font-bold' : ''}>네트워크 인사이트</span>
            </Link>
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

      {/* Main Content Area - Transitions margin when sidebar slides */}
      <main className={`flex-1 flex flex-col min-w-0 bg-[#F4F7FC] transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
        {/* Top Header */}
        <header className="h-16 bg-white/70 backdrop-blur-lg border-b border-white flex items-center justify-between px-6 z-20 shrink-0 sticky top-0 shadow-[0_4px_24px_-10px_rgba(0,0,0,0.03)]">
          <div className="flex items-center text-gray-800">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 hover:bg-gray-100 p-2 rounded-lg transition-colors group"
            >
              <Menu className={`w-6 h-6 text-gray-500 group-hover:text-[#003B6D] transition-transform ${isSidebarOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
            <div className={`flex items-center gap-2 transition-all duration-300 ${isSidebarOpen ? 'opacity-0 -translate-x-4 pointer-events-none w-0 overflow-hidden' : 'opacity-100 translate-x-0 w-auto'}`}>
              <div className="bg-[#003B6D] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-sm">E</div>
              <span className="font-bold text-base tracking-tight text-[#002C5F]">이디야 AX</span>
            </div>
            {!isSidebarOpen && <div className="w-[1px] h-6 bg-gray-200 mx-4" />}
            <h1 className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 drop-shadow-sm">AX Decision Platform</h1>
          </div>
          
          <div className="flex items-center space-x-5">
            <div className="relative hidden md:block group">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="인사이트 통합 검색..." 
                className="pl-11 pr-4 py-2.5 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#003B6D]/30 focus:border-[#003B6D] w-72 transition-all bg-white/50 backdrop-blur shadow-inner group-hover:border-gray-300"
              />
            </div>
            <button className="relative p-2.5 text-gray-500 hover:text-[#003B6D] hover:bg-blue-50 rounded-xl transition-all hover:scale-105 active:scale-95 bg-white shadow-sm border border-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 animate-pulse rounded-full border-2 border-white shadow-sm"></span>
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
