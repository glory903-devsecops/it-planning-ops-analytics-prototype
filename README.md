# ☕ 이디야 AX Decision Intelligence Platform

<div align="center">
  <br />
  <a href="https://glory903-devsecops.github.io/it-planning-ops-analytics-prototype/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_LIVE_DEMO_대시보드_바로가기-002C5F?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <br />
  <br />
</div>

## 📌 프로젝트 개요
**이디야 AX Decision Intelligence Platform**은 마케팅, SCM(물류), IT 운영(네트워크) 등 사내 3대 핵심 조직의 의사결정을 돕기 위해 고안된 통합 데이터 비즈니스 플랫폼입니다. 

현재 프로토타입 1단계로써 마케팅 및 상품기획 부서를 타겟으로 한 **[매출 인사이트 (Sales Insights)]** 모듈이 완벽히 개발되어 데모로 제공되고 있습니다.

---

## ✨ 핵심 기능 (Sales Insights)

### 📈 1. 동적 주식 그래프 (Time-Series View)
단순한 정적 차트를 넘어, **"품목별 보기"** 및 **"지점별 보기"** 동적 토글 버튼을 제공하여 주식 그래프처럼 시간대별 매출 추이를 실시간으로 탐색할 수 있습니다. 
- 품목별 특정 메뉴(예: 'NEW 아메리카노')의 트렌드 파악
- 지점별 특정 오프라인 매장(예: '강남본점') 매출 흐름 추적

### 🤖 2. 마케팅 최적화 AI Assistant (Ops Decision AI)
단순한 차트 렌더링에 그치지 않고 AI가 데이터를 실시간으로 읽고 해석하여 액션 플랜을 제시합니다.
- 대학가 상권 시간대 피크 시 **'세트 할인 푸시 즉시 발송'** 등 업셀링 제안
- 가맹점 재료 소진 전 자동 발주 권고 등 SCM 사전 연계 안내

### 📊 3. 완벽한 상세 결제 로그 (Sales Log)
장애 인시던트가 아닌 순수 매출 비즈니스에 초점을 맞춘 **최근 결제 내역** 테이블을 제공합니다. 
- **[년도, 월, 일, 시간, 품목명, 지점명, 채널, 개수, 결제액]** 컬럼으로 완벽히 분리되어, 엑셀 익스포트 등에 최적화된 경영 데이터 테이블 형식 지원.

---

## ⚙️ 실행 방법 (Local Development)

```bash
# 종속성 설치
npm install

# 프론트엔드 개발 서버 실행
npm run dev
```

> **※ [데이터 시뮬레이션 가이드]**  
> 탑재된 모든 매출 데이터는 `generate_sales_data.js` 스크립트의 알고리즘(실제 상권 및 메뉴 단가별 가중치 적용 로직)을 통해 랜덤하게 생성된 가상 환경 데이터 파일(`frontend/src/data/mock/salesEvents.ts`)에 의해 구동됩니다.
> 언제든 스크립트 재실행을 통해 새로운 패턴의 시뮬레이션 데이터를 주입해 볼 수 있습니다.

---

## 🚫 Disclaimer (데이터 면책 조항)
**본 대시보드 화면 및 리포트 시뮬레이션에 표출되는 메뉴명, 매장명 등은 현장감을 위해 '이디야커피'의 일부 공식 명칭을 차용하였으나, 시스템 내에서 생성되는 모든 매출액 정보, 판매량, 인프라 수치, AI 메시지 등은 실제 영업 데이터와 전혀 무관한 "시스템 시뮬레이션용 가상(Mock) 데이터"입니다.** 
내부 검토 및 아키텍처 역량 검증 용도로만 활용하십시오!
