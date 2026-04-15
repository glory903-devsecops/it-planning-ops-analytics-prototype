import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface ErrorLogTableProps {
  incidents: any[];
}

export function ErrorLogTable({ incidents }: ErrorLogTableProps) {
  return (
    <div className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden transition-all duration-300 h-full">
        <div className="p-8 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/80 to-transparent flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-red-50 rounded-2xl">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl font-black text-gray-800 tracking-tight">이상 징후 추적 (Anomaly Logs)</h3>
            </div>
        </div>
        <div className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black border-b border-gray-100">
                    <tr>
                        <th className="py-6 px-10">탐지 시각</th>
                        <th className="py-6 px-10">대상 서비스</th>
                        <th className="py-6 px-10">장애 유형</th>
                        <th className="py-6 px-10">상세 보고</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {incidents.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-20 text-center">
                                <div className="flex flex-col items-center justify-center opacity-20 grayscale">
                                    <ShieldCheck className="w-12 h-12 mb-4 text-green-500" />
                                    <p className="text-gray-500 text-xs font-black tracking-widest uppercase">현재 위협 요소 없음</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        incidents.map((incident, idx) => (
                            <tr key={idx} className="group hover:bg-white transition-all duration-300">
                                <td className="py-6 px-10">
                                    <div className="flex flex-col">
                                        <span className="text-gray-900 font-black group-hover:text-[#003B6D] transition-colors">{incident.timestamp.split(' ')[1]}</span>
                                        <span className="text-[10px] text-gray-400 font-bold">{incident.timestamp.split(' ')[0]}</span>
                                    </div>
                                </td>
                                <td className="py-6 px-10 text-gray-800 font-black tracking-tight">{incident.service}</td>
                                <td className="py-6 px-10">
                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                        incident.status.includes('Timeout') 
                                            ? 'bg-red-50 text-red-600 border border-red-100 shadow-sm' 
                                            : 'bg-orange-50 text-orange-600 border border-orange-100 shadow-sm'
                                    }`}>
                                        {incident.status}
                                    </span>
                                </td>
                                <td className="py-6 px-10 text-gray-500 font-bold text-xs leading-relaxed max-w-sm">{incident.message}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
