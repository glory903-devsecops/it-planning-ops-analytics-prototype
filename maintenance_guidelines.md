# 🛠️ UI/UX Maintenance & Evolution Guide

본 문서는 **이디야 AX 전략 지휘 센터(V3)**의 하이엔드 UI/UX를 유지보수하고 고도화하기 위한 기술 가이드라인입니다. 디자인 시스템의 일관성을 유지하면서 새로운 기능을 추가하시려면 다음의 레이어별 가이드에 따라 코드를 수정하십시오.

---

## 1. 시각적 기초 레이어 (Visual Foundation)
플랫폼 전체의 테마, 색상 및 유리 질감(Glassmorphism)을 수정하려면 이 파일을 가장 먼저 확인하십시오.

- **핵심 파일**: [`frontend/src/app/globals.css`](file:///Users/glory1994/Library/CloudStorage/GoogleDrive-glory.lee903@gmail.com/내 드라이브/99.Develop/it-planning-ops-analytics-prototype/frontend/src/app/globals.css)
- **수정 항목**: 
    - `:root` 변수: 전역 배경색, 강조색(Accent), 글래스 글로우 강도.
    - `.glass-card`: 모든 모듈에 공통 적용되는 투명도 및 블러 효과.
    - `background-image`: 배경의 동적 그라데이션 및 노이즈 텍스처.

## 2. 구조적 레이어 (Layout & Navigation)
사이드바, 헤더, 전역 배경 애니메이션을 수정하려면 이 파일을 확인하십시오.

- **핵심 파일**: [`frontend/src/components/layout/DashboardLayout.tsx`](file:///Users/glory1994/Library/CloudStorage/GoogleDrive-glory.lee903@gmail.com/내 드라이브/99.Develop/it-planning-ops-analytics-prototype/frontend/src/components/layout/DashboardLayout.tsx)
- **수정 항목**:
    - **사이드바**: 메뉴 아이콘, 네비게이션 링크, 활성화된 메뉴의 'Sapphire Glow' 효과.
    - **헤더**: 'Decision Intelligence' 로고 및 알림/검색 영역.
    - **배경 효과**: 맥동하는 원형 글로우(Pulsing Blobs)의 위치와 색상.

## 3. 기능 블록 레이어 (Dashboard Components)
대시보드를 구성하는 개별 '벤토 박스(Bento Box)'들을 수정하려면 이 디렉토리를 확인하십시오.

- **핵심 파일 위치**: `frontend/src/components/dashboard/`
- **주요 컴포넌트**:
    - `ExecutiveSummaryBlock.tsx`: 상단 KPI 카드 및 목표 달성률(Progress Bar).
    - `DecisionStockChart.tsx`: 고해상도 시계열 차트의 그라데이션 및 툴팁 스타일.
    - `SalesStrategyAdvisor.tsx`: tactical 전술 권고 모듈의 레이아웃 및 임팩트 스코어링 시각화.

## 4. 페이지 조립 레이어 (Page Assembly)
각 탭(매출, 물류, 네트워크)의 배치와 데이터 그리드 컬럼을 수정하려면 이 파일을 확인하십시오.

- **파일 경로**:
    - 매출: `frontend/src/app/page.tsx`
    - 물류: `frontend/src/app/logistics/page.tsx`
    - 네트워크: `frontend/src/app/network/page.tsx`
- **수정 항목**: 
    - `salesColumns` / `logisticsColumns`: 데이터 테이블의 컬럼 구성 및 폰트 크기.
    - **그리드 배치**: `grid-cols-12` 기반의 레이아웃 너비 조정.

---

> [!IMPORTANT]
> **가독성(Legibility) 유지를 위한 원칙**:
> 모든 데이터 테이블의 폰트는 `text-sm` 이상을 권장하며, 금융 수치 및 핵심 지표는 `font-black`과 `text-blue-400`(또는 도메인 강조색)을 조합하여 가독성을 확보해야 합니다.

> [!TIP]
> **테마 확장성**: 
> 새로운 도메인 페이지를 추가할 경우, 매출(Blue), 물류(Emerald), 네트워크(Rose)와 같이 고유한 강조색을 `text-{color}-400` 형태로 부여하면 시각적 분류가 훨씬 명확해집니다.
