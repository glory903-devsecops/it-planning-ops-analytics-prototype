import React, { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";

type Kpi = {
  totalRequests: number;
  failureRate: number;
  affectedStores: number;
  avgLatencyMs: number;
};

type FailureTrend = {
  hour: string;
  failureRate: number;
};

type ErrorDistribution = {
  errorCode: string;
  count: number;
};

const kpi: Kpi = {
  totalRequests: 1824,
  failureRate: 3.42,
  affectedStores: 27,
  avgLatencyMs: 842,
};

const failureTrend: FailureTrend[] = [
  { hour: "09:00", failureRate: 1.2 },
  { hour: "10:00", failureRate: 1.8 },
  { hour: "11:00", failureRate: 2.7 },
  { hour: "12:00", failureRate: 4.1 },
  { hour: "13:00", failureRate: 3.6 },
  { hour: "14:00", failureRate: 2.9 },
  { hour: "15:00", failureRate: 3.4 },
];

const errorDistribution: ErrorDistribution[] = [
  { errorCode: "TIMEOUT", count: 14 },
  { errorCode: "SCHEMA_MISMATCH", count: 8 },
  { errorCode: "AUTH_FAIL", count: 6 },
  { errorCode: "EXTERNAL_API_ERROR", count: 4 },
];

const recentIncidents = [
  {
    timestamp: "2026-04-08 14:03",
    route: "DELIVERY_TO_ERP",
    status: "FAIL",
    errorCode: "TIMEOUT",
    severity: "HIGH",
    impactedStore: "S0012",
  },
  {
    timestamp: "2026-04-08 13:57",
    route: "ORDER_TO_ERP",
    status: "FAIL",
    errorCode: "SCHEMA_MISMATCH",
    severity: "MEDIUM",
    impactedStore: "S0041",
  },
  {
    timestamp: "2026-04-08 13:41",
    route: "POS_TO_ERP",
    status: "SUCCESS",
    errorCode: "-",
    severity: "LOW",
    impactedStore: "S0009",
  },
];

function KpiCard({ title, value, suffix = "" }: { title: string; value: string | number; suffix?: string }) {
  return (
    <div className="rounded-2xl shadow-sm border bg-white p-5">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold">
        {value}{suffix}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const headline = useMemo(() => {
    if (kpi.failureRate >= 3) return "현재 주요 장애는 즉시 조치가 필요한 수준입니다.";
    return "현재 운영 상태는 비교적 안정적입니다.";
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Franchise IT Operations Control Center</h1>
            <p className="text-sm text-gray-500">API Integration Monitoring & Decision Support Dashboard</p>
          </div>
          <div className="text-sm text-gray-500">Environment: Demo</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <section className="mb-6 rounded-2xl bg-white p-5 shadow-sm border">
          <div className="text-lg font-semibold">Executive Summary</div>
          <p className="mt-2 text-gray-700">{headline}</p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="Total Requests" value={kpi.totalRequests} />
          <KpiCard title="Failure Rate" value={kpi.failureRate} suffix="%" />
          <KpiCard title="Affected Stores" value={kpi.affectedStores} />
          <KpiCard title="Avg Latency" value={kpi.avgLatencyMs} suffix=" ms" />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-4 text-lg font-semibold">Failure Trend</div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={failureTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="failureRate" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-4 text-lg font-semibold">Error Distribution</div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={errorDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="errorCode" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-4 text-lg font-semibold">Recent Incidents</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-3 pr-4">Timestamp</th>
                  <th className="py-3 pr-4">Route</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Error Code</th>
                  <th className="py-3 pr-4">Severity</th>
                  <th className="py-3 pr-4">Impacted Store</th>
                </tr>
              </thead>
              <tbody>
                {recentIncidents.map((row) => (
                  <tr key={`${row.timestamp}-${row.route}`} className="border-b last:border-b-0">
                    <td className="py-3 pr-4">{row.timestamp}</td>
                    <td className="py-3 pr-4">{row.route}</td>
                    <td className="py-3 pr-4">{row.status}</td>
                    <td className="py-3 pr-4">{row.errorCode}</td>
                    <td className="py-3 pr-4">{row.severity}</td>
                    <td className="py-3 pr-4">{row.impactedStore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold">AI Assistant Prompt Examples</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
            <li>지난 1시간 동안 가장 영향이 큰 장애는 무엇인가?</li>
            <li>DELIVERY_TO_ERP 실패의 주요 원인과 영향 매장을 알려줘.</li>
            <li>지금 가장 먼저 조치해야 할 항목과 근거를 요약해줘.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
