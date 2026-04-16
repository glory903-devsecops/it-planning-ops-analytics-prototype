# ☕ Ediya AX Strategic Command Center (V3)

<div align="center">
  <br />
  <img src="https://img.shields.io/badge/Aesthetics-Glassmorphism-blue?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Architecture-Clean_Architecture-003B6D?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Scale-1,000+_Transactions_/_Sec-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-Autonomous_Strategy_Advisor-FF6F61?style=for-the-badge" />
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

## ✨ 핵심 의사결정 모듈

### 📊 1. Sales Intelligence (매출 최적화)
- **What:** 전국 매장/품목/채널별 매출 트렌드 분석.
- **Why:** AI Agent가 오피스 상권과 대학가 상권의 시차별 트래픽 변화 원인 분석.
- **Action:** 피크 타임 인력 재배치 및 원두 재고 선행 보완 권고.

### 📦 2. Logistics Intelligence (SCM & 재고 안정성)
- **What:** 실시간 재고 수준 및 공급 가능일(Days of Cover) 모니터링.
- **Why:** 수요 예측 대비 빠른 소진 속도 감지 및 품절 위험도(Stockout Risk) 산출.
- **Action:** 물류 차량 추가 배차 및 발주 우선순위 조정.

### ⚡ 3. Network Intelligence (인프라 안정성)
- **What:** API 지연시간(Latency) 및 오류율 실시간 추적.
- **Why:** 특정 서비스 및 엔드포인트의 이상 징후(Anomaly) 및 사용자 영향도 분석.
- **Action:** 즉각적인 수동 절체(Failover) 및 장애 복구 전략 제안.

---

## ⚙️ 실행 방법

**데모 사이트 확인:**
👉 [EDIYA AX LIVE DEMO](https://glory903-devsecops.github.io/it-planning-ops-analytics-prototype/)

**로컬 실행:**
```bash
# Frontend 실행
cd frontend && npm install && npm run dev
```

---

## 🚫 Disclaimer
본 플랫폼에 표출되는 모든 수치와 AI 분석 내용은 실제 데이터와 무관한 **시뮬레이션 가상 데이터**입니다. 시스템 아키텍처 및 대규모 데이터 처리 역량 검증용으로만 활용해 주십시오. ☕

---
<div align="center">
  <p><strong>Developed for Ediya AX Digital Transformation Strategy</strong></p>
  <p>© 2026 Ediya AX Intelligence Platform v2.5.0 (Clean Architecture Edition)</p>
</div>
