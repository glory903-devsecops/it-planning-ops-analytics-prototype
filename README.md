# AX 기반 매장 운영 데이터 통합 분석 및 의사결정 시스템 (V3)

<div align="center">
  <br />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <br />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <br />
  <br />
  <a href="https://glory903-devsecops.github.io/it-planning-ops-analytics-prototype/">
    <img src="https://img.shields.io/badge/ENTER_STRATEGIC_COMMAND_CENTER-LIVE_DEMO-003B6D?style=for-the-badge&logo=rocket" height="40" />
  </a>
  <br />
  <br />
</div>

## 📌 플랫폼 소개
**Ediya AX Decision Intelligence Platform**은 이디야커피의 디지털 전환(AX)을 상징하는 프리미엄 의사결정 포털입니다. 
기존의 단순 모니터링 대시보드를 넘어, **Clean Architecture** 기반의 안정적인 설계와 **Data-Driven AI Reasoning**을 결합하여 경영진에게 "무슨 일이 왜 일어났는지, 어떤 행동을 취해야 하는지"를 명확히 제시합니다.

---

## 🏛️ 하이엔드 기술 아키텍처 (Technical Pillars)

본 플랫폼은 엔터프라이즈 급 확장성과 유지보수성을 위해 다음과 같은 핵심 설계 원칙을 준수합니다.

### 1. Clean Architecture implementation
비즈니스 로직과 UI 레이어를 엄격히 분리하여 변화에 유연한 구조를 구축했습니다.
- **Domain Layer (`src/domain`):** Sales, Logistics, Network의 핵심 엔티티와 비즈니스 수식 정의.
- **Application Layer (`src/application`):** 복잡한 데이터 집계 및 분석용 CSV 익스포트 로직(시간 차원 분해 포함).
- **Infrastructure Layer (`src/infrastructure`):** 로컬 고성능 시뮤뮬레이션 엔진(60개 지점, 30개 메뉴 데이터 실시간 생성).
- **Presentation Layer (`src/presentation`):** 고해상도 시계열 차트 및 AI 전략 패널.

### 2. High-Fidelity UI/UX Standard
- **Stock-style Analytics:** 주식 시장 포털 수준의 고해상도 시계열 차트(`DecisionStockChart`)를 통한 추세 분석.
- **Executive Summary Block:** 경영진 보고용 KPI(변화율, 영향 범위, 신뢰도 점수) 시각화.
- **Operational Data Table:** 피벗 분석을 위한 **CSV 추출 최적화**(데이터의 년/월/일/시/분/초 분할).

---

## ✨ 핵심 의사결정 모듈 (v4 - 리팩토링 완료)

### 📊 1. Sales Intelligence (매출 최적화) ⭐ REFACTORED
**데시보드 기능 강화:**
- **Real-time Payment Insights:** 최근 30건 결제 내역 자동 집계 및 패턴 분석
  - 결제액(Net Sales), 결제 상태(완료/실패), 결제 채널별 분류
  - 멤버십 등급(VIP/Gold/Silver) 기반 고객 세분화
- **Executive KPI Dashboard:** 4가지 전략 지표 실시간 제공
  - 총 매출 지수 (연간 증감율 기반)
  - 최고 성장 품목 (MoM 성장률)
  - 완료 주문 수 (성공률)
  - 이상 징후 탐지 (Timeout 감지)
- **Time-Series Aggregation:** 시간대별 매출액 집계 (HH:00 포맷)
- **Advanced CSV Export:** 연/월/일/요일/시/분/초 분해 기반 피벗 분석

**What:** 전국 매장/품목/채널별 매출 트렌드 분석.
- **Why:** AI Agent가 오피스 상권과 대학가 상권의 시차별 트래픽 변화 원인 분석.
- **Action:** 피크 타임 인력 재배치 및 원두 재고 선행 보완 권고.

### 📦 2. Logistics Intelligence (SCM & 재고 안정성) ⭐ REFACTORED
**개선된 재고 모니터링:**
- 정규화된 InventorySnapshot 필드 (년/월/일/시/분 추가)
- 예약 재고(Reserved Stock) 및 사용 가능 재고 구분
- 긴급 보충 필요 품목 자동 감지 (Critical Priority)
- 재고 건전성 점수 (Average Safety Index) 실시간 계산

- **What:** 실시간 재고 수준 및 공급 가능일(Days of Cover) 모니터링.
- **Why:** 수요 예측 대비 빠른 소진 속도 감지 및 품절 위험도(Stockout Risk) 산출.
- **Action:** 물류 차량 추가 배차 및 발주 우선순위 조정.

### ⚡ 3. Network Intelligence (인프라 안정성) ⭐ REFACTORED
**네트워크 상태 모니터링:**
- P99 지연시간 (Latency) 실시간 추적
- 시스템 가용성 (SLA) 모니터링
- 실시간 에러율 계산 (4xx/5xx 상태 코드)
- 인프라 비용 최적화 지표

- **What:** API 지연시간(Latency) 및 오류율 실시간 추적.
- **Why:** 특정 서비스 및 엔드포인트의 이상 징후(Anomaly) 및 사용자 영향도 분석.
- **Action:** 즉각적인 수동 절체(Failover) 및 장애 복구 전략 제안.

---

## 🔧 v4 엔지니어링 개선사항 (Refactoring Highlights)

### Backend Architecture Optimization
백엔드 코드 리팩토링으로 매출 인사이트 중심의 데이터 파이프라인을 완전히 재구성했습니다.

#### 1. DashboardUseCases 재구조화
```typescript
// ✅ Before: 중복된 KPI 생성 로직
const kpis = [
  { id: 'S1', label: '..', value: formatCurrency(...), ... },
  { id: 'S2', label: '..', value: '...', ... }
]

// ✨ After: KPI 빌더 패턴
const kpi = this.createKpi({
  id: 'S1',
  label: '총 매출 지수',
  value: this.formatCurrency(totalRevenue),
  ...
})
```

#### 2. Recent Payments 목록 추가
- 최근 30건의 결제 내역 자동 집계
- 트랜잭션 ID, 일시, 지점, 품목, 결제액, 상태, 채널 포함
- 프론트엔드에서 즉시 사용 가능한 구조화된 데이터 제공

#### 3. 타입 안전성 강화
- `SalesFilters` 인터페이스 도입 (store, item 필터링)
- `InventorySnapshot` 필드 정규화 (year, month, day, hour, minute)
- CSV 내보내기 쿼리 파라미터 타입 검증

### Quality Assurance
**Unit Test 결과: 11/11 PASS ✅**
```
✓ SimulationService (4/4 tests)
  - generate requested number of sales records
  - valid currency consistency (net_sales = gross_sales - discount)
  - generate unique transaction IDs
  - generate data with valid datetime within recent 30 days

✓ DashboardUseCases (7/7 tests)
  - return 4 executive KPI blocks
  - aggregate net sales by hour correctly
  - format CSV with correct headers
  - apply store filters to CSV data
  - return Strategic Insights with Health Scores (V3)
  - return Logistics Insights with inventory snapshots
  - return Network Insights with event logs
```

### Development Workflow Enhancement
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts",
    "build": "tsc",
    "test": "vitest run",          // ✨ NEW
    "test:watch": "vitest"          // ✨ NEW
  }
}
```

---

## 📺 Dashboard 사용 시나리오

### 화면 1️⃣ : Sales Intelligence (판매 실적 및 지능형 분석)
**URL:** `http://localhost:3001/`

**주요 구성:**
1. **Executive KPI Block** - 4가지 핵심 지표
   - 총 매출 지수: ₩OOO.OM (연간 변화율)
   - 최고 성장 품목: 초당옥수수 1인빙수 (+42% MoM)
   - 완료 주문 수: X,XXX건 (성공률)
   - 이상 징후 탐지: N건 (Timeout 감지)

2. **Sales Strategy Advisor** - AI 기반 전략 제안
   - 채널별 매출 분석 (POS, 키오스크, 배달앱)
   - 시간대별 트렌드 분석
   - 품목 카테고리별 성장률

3. **Revenue Time-Series Chart** - 실시간 매출 변동 추이
   - 시간대별 누적 매출액 시각화 (₩ 단위)
   - 트렌드 라인 및 이동 평균

4. **AI Assistant Panel** - 실시간 Q&A
   - 의사결정 지원 질의응답
   - 데이터 기반 인사이트 제공

5. **Recent Payment History** ⭐ NEW
   - 최근 30건 결제 내역 테이블
   - 페이지네이션 (12개/페이지)
   - 요일, 시간, 지점, 품목, 결제액, 상태, 채널 표시
   - 멤버십 등급 시각화 (VIP/Gold/Silver)
   - CSV 내보내기 기능

6. **Operational Data Export**
   - 필터링: 지점명, 품목명별 선별
   - CSV 포맷: YYYY-MM-DD HH:MM:SS + 상세 분류 정보

---

### 화면 2️⃣ : Strategic Insights (전사 브랜드 건강)
**URL:** `http://localhost:3001/strategic`

**지점별 성과 관리:**
- 건강 지수 (Health Score): 40% 매출 + 30% 품질 + 20% 고객만족 + 10% 장비
- 판매 성과 (Sales Performance): 목표 대비 달성도
- 재고 리스크 (Inventory Risk): 재고 부족 예측
- 고객 감정도 (Customer Sentiment): 앱 트래픽 기반

---

### 화면 3️⃣ : Logistics Insights (SCM & 재고)
**URL:** `http://localhost:3001/logistics`

**KPI 지표:**
- 물류 가용성 지수: 94.2%
- 긴급 보충 필요 품목: N건
- 평균 재고 회전 일수: 4.2일
- 재고 건전성 점수: NN/100

---

### 화면 4️⃣ : Network Insights (인프라 안정성)
**URL:** `http://localhost:3001/network`

**성능 모니터링:**
- P99 지연시간: XXXms
- SLA 가용성: 99.98%
- 실시간 에러율: X.XX%
- 인프라 비용 최적화: ₩XX.XM

---

Docker Desktop이 설치되어 있다면, 터미널에 아래 **3줄의 명령어**를 복사해 붙여넣는 것만으로 모든 시스템(Frontend, Backend, DB, Redis)이 즉시 자동 가동됩니다.

```bash
git clone https://github.com/glory903-devsecops/it-planning-ops-analytics-prototype.git
cd it-planning-ops-analytics-prototype
chmod +x ax-boot.sh && ./ax-boot.sh
```

**사전 준비 (Prerequisites):**
- **Docker Desktop** 설치 및 실행 상태 확인
- (데모 사이트 확인: [EDIYA AX LIVE DEMO](https://glory903-devsecops.github.io/it-planning-ops-analytics-prototype/))

---

## � 프로젝트 구조

```
it-planning-ops-analytics-prototype/
├── backend/
│   ├── src/
│   │   ├── domain/               # 비즈니스 엔티티 및 타입 정의
│   │   │   └── types.ts          # SalesTransaction, InventorySnapshot, NetworkEvent, ExecutiveKpi
│   │   ├── application/          # 비즈니스 로직 및 유스케이스
│   │   │   ├── dashboardUseCases.ts    # ✨ REFACTORED: KPI 빌더, 시계열 집계, recentPayments
│   │   │   └── dashboardUseCases.test.ts # 7개 테스트 통과 ✅
│   │   ├── infrastructure/       # 데이터 생성 및 시뮬레이션
│   │   │   ├── simulationService.ts     # 60개 지점 × 30개 메뉴 데이터 생성
│   │   │   └── simulationService.test.ts # 4개 테스트 통과 ✅
│   │   ├── presentation/         # REST API 엔드포인트
│   │   │   ├── router.ts              # /api/sales/init, /api/strategic/init, ...
│   │   │   └── dashboardController.ts # 요청 핸들링 및 응답
│   │   └── server.ts             # Express 서버 및 WebSocket 설정
│   ├── dist/                      # 컴파일된 JavaScript (자동 생성)
│   ├── package.json               # npm test, npm run dev 추가 ⭐
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                 # Sales Intelligence 대시보드
│   │   │   ├── strategic/page.tsx       # Strategic Insights 페이지
│   │   │   ├── logistics/page.tsx       # Logistics Intelligence 페이지
│   │   │   └── network/page.tsx         # Network Intelligence 페이지
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── ExecutiveSummaryBlock.tsx   # 4가지 KPI 시각화
│   │   │   │   ├── DecisionStockChart.tsx      # 시계열 차트 (주식 포털 스타일)
│   │   │   │   └── SalesStrategyAdvisor.tsx    # AI 기반 전략 제안
│   │   │   ├── ui/
│   │   │   │   └── DataTable.tsx               # ⭐ Recent Payments 테이블 (NEW)
│   │   │   └── ai/
│   │   │       └── AIAssistantPanel.tsx        # 실시간 Q&A
│   │   ├── services/
│   │   │   └── dashboardService.ts    # 백엔드 API 호출 및 WebSocket
│   │   ├── application/
│   │   │   └── useCases.ts           # 프론트엔드 비즈니스 로직
│   │   └── hooks/
│   │       └── usePagination.ts      # 페이지네이션 훅
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── LICENSE
└── README.md
```

---

## 🔗 API 명세

### 1️⃣ Sales Dashboard
```http
GET /api/sales/init
```
**Response:**
```json
{
  "kpis": [
    {
      "id": "S1",
      "label": "총 매출 지수(Trend Index)",
      "value": "₩OOO.OM",
      "trend": 12.5,
      "trendDirection": "up",
      "confidenceScore": 98,
      "status": "normal"
    }
  ],
  "timeSeries": [
    { "time": "00:00", "value": 5000000 },
    { "time": "01:00", "value": 4500000 }
  ],
  "recentSales": [...],
  "recentPayments": [        // ⭐ NEW: 최근 30건 결제 내역
    {
      "transaction_id": "TRX-...",
      "datetime": "2026-04-18T14:35:00Z",
      "store_name": "여의도역점",
      "item_name": "카페라떼",
      "item_category": "에스프레소 커피",
      "net_sales": 4200,
      "status": "완료",
      "channel": "POS"
    }
  ]
}
```

### CSV Export
```http
GET /api/sales/export?store=강남본점&item=아메리카노
```
**Response:** 시간 분해 기반 CSV (ID, Year, Month, Day, DayOfWeek, Hour, Minute, ...)

### 2️⃣ Strategic Dashboard
```http
GET /api/strategic/init
```

### 3️⃣ Logistics Dashboard
```http
GET /api/logistics/init
```

### 4️⃣ Network Dashboard
```http
GET /api/network/init
```

---
## 🚫 Disclaimer
본 플랫폼에 표출되는 모든 수치와 AI 분석 내용은 실제 데이터와 무관한 **시뮬레이션 가상 데이터**입니다. 시스템 아키텍처 및 대규모 데이터 처리 역량 검증용으로만 활용해 주십시오. ☕

---
<div align="center">
  <p><strong>Developed for Ediya AX Digital Transformation Strategy</strong></p>
  <p>© 2026 Ediya AX Intelligence Platform v3.0.0 (Backend Refactoring Edition)</p>
  <p style="font-size: 12px; color: #666;">
    v3.0: Dashboard Architecture Refactoring ✨ | KPI Builder Pattern | Recent Payments Integration | Type Safety | Tests 11/11 ✅
  </p>
</div>
