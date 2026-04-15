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
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans relative">
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse style={{ animationDelay: '2s' }}" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>
      
      {/* Navigation Sidebar (Obsidian Glass) */}
      <aside className={`fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-0'} glass-panel border-r border-white/5 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]`}>
        <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="p-8 h-24 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-2xl border border-white/20">
                  E
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tighter text-white">EDIYA AX</span>
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em] -mt-1">Command Center</span>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-6 space-y-4">
            <div className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Operations</div>
            
            <Link href="/" className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isSales ? 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <TrendingUp className={`w-5 h-5 ${isSales ? 'text-blue-400' : 'group-hover:text-blue-400'}`} />
              <span className={`text-sm tracking-tight ${isSales ? 'font-black' : 'font-bold'}`}>Sales Insight</span>
            </Link>
            
            <Link href="/logistics" className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isLogistics ? 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <Truck className={`w-5 h-5 ${isLogistics ? 'text-indigo-400' : 'group-hover:text-indigo-400'}`} />
              <span className={`text-sm tracking-tight ${isLogistics ? 'font-black' : 'font-bold'}`}>Logistics Hub</span>
            </Link>
            
            <Link href="/network" className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isNetwork ? 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <Network className={`w-5 h-5 ${isNetwork ? 'text-rose-400' : 'group-hover:text-rose-400'}`} />
              <span className={`text-sm tracking-tight ${isNetwork ? 'font-black' : 'font-bold'}`}>Infra Monitoring</span>
            </Link>

            <div className="pt-8 px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Intelligence</div>
            
            <Link href="/strategic" className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isStrategic ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <Zap className={`w-5 h-5 ${isStrategic ? 'text-emerald-400' : 'group-hover:text-emerald-400'}`} />
              <span className={`text-sm tracking-tight ${isStrategic ? 'font-black' : 'font-bold'}`}>Strategic Intelligence</span>
            </Link>
          </nav>
        </div>
        
        <div className="p-8 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">HQ Administrator</span>
                    <span className="text-[10px] text-slate-500 font-medium">Enterprise Tier</span>
                </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        </div>
      </aside>

      {/* Main Command Workspace */}
      <main className={`flex-1 flex flex-col min-w-0 bg-transparent transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isSidebarOpen ? 'pl-72' : 'pl-0'}`}>
        {/* Futuristic Header */}
        <header className="h-20 bg-[#020617]/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-10 z-30 sticky top-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-6 p-2.5 glass-card rounded-xl text-slate-400 hover:text-white transition-all shadow-xl"
            >
              <Menu className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
            <div className="flex flex-col">
                <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Decision Intelligence</h1>
                <div className="flex items-center gap-2 text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20 w-fit">
                    <Database className="w-3 h-3" />
                    Secure Data Stream Active
                </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Query decision matrices..." 
                className="pl-12 pr-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-80 transition-all placeholder:text-slate-600 focus:bg-white/10"
              />
            </div>
            <div className="h-8 w-[1px] bg-white/5 mx-2" />
            <button className="relative p-3 glass-card rounded-2xl text-slate-400 hover:text-blue-400">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617] shadow-lg"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Canvas Area */}
        <div className="flex-1 overflow-auto p-10 custom-scrollbar relative">
          {children}
          <div className="mt-16 opacity-30">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
