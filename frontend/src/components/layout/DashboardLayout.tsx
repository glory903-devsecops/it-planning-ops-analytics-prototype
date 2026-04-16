import React, { useState } from 'react';
import { Search, Menu, TrendingUp, Truck, Network, Bell, X, Target, LayoutDashboard, Database, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isSales = pathname === '/';
  const isLogistics = pathname?.startsWith('/logistics');
  const isNetwork = pathname?.startsWith('/network');
  const isStrategic = pathname?.startsWith('/strategic');

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans relative">
      {/* Immersive Light Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/5 blur-[120px] rounded-full animate-pulse style={{ animationDelay: '2s' }}" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>
      
      {/* Navigation Sidebar (Clean Light Glass) */}
      <aside className={`fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-0'} glass-panel border-r border-slate-200/50 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] shadow-xl`}>
        <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="p-8 h-24 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-gradient-to-br from-orange-400 via-red-600 to-teal-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg border border-white/20">
                  E
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tighter text-slate-900">EDIYA AX</span>
                <span className="text-[9px] font-bold text-red-600 uppercase tracking-[0.2em] -mt-1">Command Center</span>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-6 space-y-4">
            <div className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Operations</div>
            
            <Link href="/" className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isSales ? 'bg-slate-100/80 text-foreground ring-1 ring-slate-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-foreground'}`}>
              <TrendingUp className={`w-5 h-5 ${isSales ? 'text-red-600' : 'group-hover:text-red-600'}`} />
              <span className={`text-sm tracking-tight ${isSales ? 'font-black' : 'font-bold'}`}>Sales Insight</span>
            </Link>
            
            <Link href="/logistics" className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isLogistics ? 'bg-slate-100/80 text-foreground ring-1 ring-slate-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-foreground'}`}>
              <Truck className={`w-5 h-5 ${isLogistics ? 'text-teal-600' : 'group-hover:text-teal-600'}`} />
              <span className={`text-sm tracking-tight ${isLogistics ? 'font-black' : 'font-bold'}`}>Logistics Hub</span>
            </Link>
            
            <Link href="/network" className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isNetwork ? 'bg-slate-100/80 text-foreground ring-1 ring-slate-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-foreground'}`}>
              <Network className={`w-5 h-5 ${isNetwork ? 'text-rose-600' : 'group-hover:text-rose-600'}`} />
              <span className={`text-sm tracking-tight ${isNetwork ? 'font-black' : 'font-bold'}`}>Infra Monitoring</span>
            </Link>

            <div className="pt-8 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Intelligence</div>
            
            <Link href="/strategic" className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isStrategic ? 'bg-slate-100/80 text-foreground ring-1 ring-slate-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-foreground'}`}>
              <Zap className={`w-5 h-5 ${isStrategic ? 'text-orange-500' : 'group-hover:text-orange-500'}`} />
              <span className={`text-sm tracking-tight ${isStrategic ? 'font-black' : 'font-bold'}`}>Strategic Intelligence</span>
            </Link>
          </nav>
        </div>
        
        <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">HQ Administrator</span>
                    <span className="text-[10px] text-slate-500 font-medium">Enterprise Tier</span>
                </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
        </div>
      </aside>

      {/* Main Command Workspace */}
      <main className={`flex-1 flex flex-col min-w-0 bg-transparent transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isSidebarOpen ? 'pl-72' : 'pl-0'}`}>
        {/* Futureristic Header */}
        <header className="h-20 bg-background/60 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-10 z-30 sticky top-0 shadow-sm">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-6 p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm"
            >
              <Menu className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
            <div className="flex flex-col">
                <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Decision Intelligence</h1>
                <div className="flex items-center gap-2 text-[9px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-md border border-red-100 w-fit">
                    <Database className="w-3 h-3" />
                    Secure Data Stream Active
                </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Query decision matrices..." 
                className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 w-80 transition-all placeholder:text-slate-400 focus:bg-white"
              />
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <button className="relative p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-red-600 shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-600 rounded-full border-2 border-white shadow-lg"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Canvas Area */}
        <div className="flex-1 overflow-auto p-10 custom-scrollbar relative">
          {children}
          <div className="mt-16 opacity-50">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
