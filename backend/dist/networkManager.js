"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkManager = void 0;
const SERVICES = ['POS 연동 서버', 'ERP 게이트웨이', '배달 플랫폼 API', '모바일 앱 주문 API'];
class NetworkManager {
    constructor() {
        this.recentEvents = [];
        this.history = [];
        this.initHistory();
        // Generate initial events
        const now = Date.now();
        for (let i = 0; i < 30; i++) {
            this.recentEvents.push(this.generateRandomEvent(now - Math.random() * 3600000));
        }
        this.recentEvents.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    }
    initHistory() {
        const now = Date.now();
        for (let i = 24; i >= 0; i--) {
            const time = new Date(now - i * 3600000);
            const snapshot = { time: time.getHours().toString().padStart(2, '0') + ':00' };
            SERVICES.forEach(service => {
                snapshot[service] = 20 + Math.floor(Math.random() * 80);
            });
            this.history.push(snapshot);
        }
    }
    takeSnapshot() {
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        const snapshot = { time: timeStr };
        // Average recent latencies per service for the snapshot
        SERVICES.forEach(service => {
            const serviceEvents = this.recentEvents.filter(e => e.service === service).slice(0, 5);
            const avg = serviceEvents.length > 0
                ? Math.round(serviceEvents.reduce((acc, curr) => acc + curr.latencyMs, 0) / serviceEvents.length)
                : 50;
            snapshot[service] = avg;
        });
        this.history.push(snapshot);
        if (this.history.length > 50)
            this.history.shift();
    }
    generateRandomEvent(timestamp) {
        const isError = Math.random() < 0.05;
        const isLatency = Math.random() < 0.15;
        const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];
        const time = timestamp ? new Date(timestamp) : new Date();
        let latency = 20 + Math.floor(Math.random() * 80); // normal 20~100ms
        let status = '건강(정상)';
        let message = 'HTTP 200 OK';
        if (isError) {
            status = '장애(Timeout/502)';
            latency = 5000;
            message = '연결 시간 초과 (Connection Timeout)';
        }
        else if (isLatency) {
            status = '지연(Latency)';
            latency = 800 + Math.floor(Math.random() * 2000);
            message = 'DB 락킹(Locking)에 의한 지연 응답';
        }
        return {
            timestamp: time.toISOString().replace('T', ' ').substring(0, 19),
            service,
            status,
            latencyMs: latency,
            message
        };
    }
    getNetworkData() {
        const avgLatency = Math.round(this.recentEvents.reduce((acc, curr) => acc + curr.latencyMs, 0) / this.recentEvents.length);
        const errorCount = this.recentEvents.filter(e => e.status.includes('장애')).length;
        return {
            metrics: {
                avgLatencyMs: avgLatency,
                errorRatePct: ((errorCount / this.recentEvents.length) * 100).toFixed(1) + '%',
                totalApis: SERVICES.length,
                systemHealth: errorCount > 3 ? '위험' : '양호'
            },
            recentEvents: this.recentEvents.slice(0, 20)
        };
    }
    tick() {
        const newEvent = this.generateRandomEvent();
        this.recentEvents.unshift(newEvent);
        if (this.recentEvents.length > 50)
            this.recentEvents.pop();
        return newEvent;
    }
}
exports.NetworkManager = NetworkManager;
