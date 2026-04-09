import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { SalesEvent } from '../../data/mock/salesEvents';

export function RecentIncidents({ incidents }: { incidents: SalesEvent[] }) {
  if (!incidents.length) return null;

  return (
    <Card className="border-none shadow-sm flex-1 mb-8 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg text-gray-800 tracking-tight">최근 결제 내역 (Sales Log)</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-500 bg-gray-50 uppercase border-y border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium">년도</th>
                <th className="px-4 py-3 font-medium">월</th>
                <th className="px-4 py-3 font-medium">일</th>
                <th className="px-4 py-3 font-medium">시간</th>
                <th className="px-4 py-3 font-medium">품목명</th>
                <th className="px-4 py-3 font-medium">지점</th>
                <th className="px-4 py-3 font-medium">채널</th>
                <th className="px-4 py-3 font-medium text-center">개수</th>
                <th className="px-4 py-3 font-medium text-right">금액</th>
              </tr>
            </thead>
            <tbody>
              {incidents.slice(0, 10).map((incident, i) => {
                const [datePart, timePart] = incident.timestamp.split(' ');
                const [yy, mm, dd] = datePart.split('-');
                const time = timePart.substring(0, 5); // HH:mm
                
                return (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-gray-500">{yy}</td>
                    <td className="px-4 py-4 text-gray-500">{mm}</td>
                    <td className="px-4 py-4 text-gray-500">{dd}</td>
                    <td className="px-4 py-4 text-gray-900 font-medium">{time}</td>
                    <td className="px-4 py-4 text-gray-600 truncate max-w-[150px]" title={incident.menu_name}>
                      {incident.menu_name}
                    </td>
                    <td className="px-4 py-4 text-gray-600 font-medium">{incident.store_name}</td>
                    <td className="px-4 py-4">
                      <span className="bg-blue-100 text-[#003B6D] px-2 py-1 rounded text-xs">
                        {incident.channel}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 text-center">1</td>
                    <td className="px-4 py-4 font-bold text-[#003B6D] text-right">
                      ₩ {incident.total_price.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
