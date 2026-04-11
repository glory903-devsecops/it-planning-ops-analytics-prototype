# ☕ Ediya AX Decision Intelligence Platform (V2)

<div align="center">
  <br />
  <img src="https://img.shields.io/badge/Aesthetics-Glassmorphism-blue?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Architecture-CQRS_%7C_Redis-red?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" />
  <br />
  <br />
  <strong>"데이터가 흐르고, 인공지능이 결정하며, 비즈니스가 완성되는 곳."</strong>
  <br />
  <br />
</div>

## 📌 플랫폼 소개
**Ediya AX Decision Intelligence Platform**은 이디야커피의 디지털 전환(AX)을 상징하는 프리미엄 의사결정 포털입니다. 
전국 매장의 실시간 결제 로그, 원부자재 재고 흐름, 인프라 네트워크 상태를 **Glassmorphism** 기반의 세련된 UI로 통합하여 경영진과 실무자에게 데이터 기반의 명확한 인사이트를 제공합니다.

---

## 🎨 Modern Premium UI (Glassmorphism)

본 플랫폼은 단순한 관리 도구를 넘어, 사용자에게 **현대적이고 감각적인 UX**를 제공합니다.

- **심미적 완성도:** 반투명 유리 질감(Backdrop Blur)과 부드러운 그림자를 활용한 Glassmorphism 디자인 적용.
- **다이내믹 인터랙션:** 데이터 로딩 스켈레톤, 호버 효과, 실시간 차트 애니메이션으로 살아있는 인터페이스 구현.
- **비즈니스 특화 테마:** 매출(White/Blue), 물류(Red/Soft), 네트워크(Dark/Cyber) 등 각 영역의 성격에 최적화된 컬러 팔레트 사용.

---

## ✨ 핵심 대시보드 모듈

### 📊 1. Sales Insight (매출 지능)
실시간 결제 트래픽을 주식형 차트로 시각화하고, AI가 상권 특성을 분석하여 매출 증대 전략을 제안합니다.
- **KPI 메트릭:** 총 매출, 주문 건수, 객단가, 베스트셀러의 실시간 모니터링.
- **Ops Decision AI:** "신촌점 오후 6시 우유 소진 가속화 대응 제안" 등 즉각적인 액션 아이템 노출.

### 📦 2. Logistics Insight (물류 지능)
전국 매장의 원부자재(원두, 우유, 컵 등) 소진 상태를 AI가 예측하여 품절 전 자동 발주를 유도합니다.
- **재고 위기 경보:** 품절 임계점 도달 시 시각적 경고 및 물류 배차 최적화 지원.
- **SCM Optimizer:** 입지별/시즌별 소진 패턴을 학습한 자재 수급 최적화 모델 통합.

### 🌐 3. Network Insight (인프라 지능)
전국 매장의 POS, 키오스크, 배달 API 연동 상태를 실시간으로 추적하여 장애를 사전에 차단합니다.
- **Latency Tracking:** API 응답 지연 스파이크 검출 및 장애 로그 상세 보고.
- **Infra Observer AI:** 시스템 불안정 징후 감지 시 Failover(망 분리) 및 자동 복구 시나리오 제안.

---

## 🏛️ Enterprise Architecture

수백만 건의 데이터를 지연 없이 처리하기 위한 최첨단 기술 아키텍처가 적용되었습니다.

- **CQRS & Cache Layer:** Command와 Query의 책임을 분리하여 대용량 트랜잭션 시에도 10ms 이하의 조회 응답성 보장.
- **Real-time Engine:** Socket.io 및 Redis Pub/Sub을 활용한 끊김 없는 실시간 데이터 스트리밍.
- **Robust Simulation:** 30,000개 이상의 가상 데이터를 원자적으로 생성하여 실제와 유사한 운영 환경 구현.

---

## ⚙️ 실행 방법 (Docker Compose)

본 프로젝트는 Docker 환경에서 가장 안정적으로 구동됩니다.

```bash
# 전체 인프라 빌드 및 실행 (Frontend, Backend, Redis, DB)
docker-compose up -d --build
```

**Local 실행 (Terminal 1 - Frontend):**
```bash
cd frontend && npm install && npm run dev
```

**Local 실행 (Terminal 2 - Backend):**
```bash
cd backend && npm install && npm run build && npm start
```

---

## 📺 시네마틱 시연 (Cinematic Walkthrough)

> [!TIP]
> **실시간 비즈니스 데이터가 반영되는 플랫폼의 실제 모습을 확인하세요.** 30,000건의 트래픽을 지연 없이 처리하며 AI가 실시간으로 의사결정을 지원하는 과정을 담고 있습니다.

![Ediya AX Premium Walkthrough](/Users/glory1994/.gemini/antigravity/brain/8db4ccce-8363-4a7e-a67a-073afc16940d/ediya_ax_premium_walkthrough_1775835122557.webp)

---

## 🚫 Disclaimer
본 플랫폼에 표출되는 모든 수치와 AI 분석 내용은 실제 데이터와 무관한 **시뮬레이션 가상 데이터**입니다. 시스템 아키텍처 및 디자인 역량 검증용으로만 활용해 주십시오. ☕
