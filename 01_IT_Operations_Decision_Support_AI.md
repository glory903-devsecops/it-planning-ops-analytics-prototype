# IT Operations Decision Support AI
### API Integration Failure Analytics 기반 IT 의사결정 지원 시스템

---

# 1. Executive Summary

본 프로젝트는 프랜차이즈 환경에서 발생하는 주문·배달·ERP 연계 장애를 분석하고,
비즈니스 영향도를 기반으로 대응 우선순위를 제시하는 IT 의사결정 지원 시스템이다.

기존 장애 모니터링 도구는 장애 발생 여부를 보여주는 데 그치지만,
본 시스템은 장애가 실제 매출과 운영에 미치는 영향을 정량화하여
IT 기획 및 운영 의사결정에 활용할 수 있도록 설계되었다.

생성형 AI를 활용하여 장애 원인을 자연어로 설명하고 대응 방안을 제안함으로써
운영자의 분석 부담을 줄이고 MTTR을 단축하는 것을 목표로 한다.

---

# 2. Project Objectives

## 2.1 전략적 목표

운영 장애 데이터를 의사결정 데이터로 변환한다.

장애 대응 시간을 단축한다.

비즈니스 영향 기반 IT 우선순위 체계를 설계한다.

IT 투자 판단 근거 데이터를 생성한다.

운영 리스크를 정량적으로 평가한다.

---

## 2.2 실무적 목표

API 장애 로그를 통합 수집한다.

장애 유형을 자동 분류한다.

장애 영향 매장 범위를 식별한다.

AI 기반 장애 요약을 생성한다.

주간 장애 리포트를 자동 생성한다.

---

# 3. Problem Statement

프랜차이즈 IT 환경은 다양한 시스템이 API로 연결된 구조이다.

POS  
주문 시스템  
배달 플랫폼  
API Gateway  
ERP  
결제 시스템  
물류 시스템  

이러한 구조에서 발생하는 문제는 다음과 같다.

연계 실패로 주문 누락 발생

재고 데이터 불일치 발생

외부 API 스키마 변경으로 오류 발생

로그가 여러 시스템에 분산됨

장애 원인 분석에 시간 소요

장애 영향 범위 파악 어려움

운영자가 로그를 직접 분석해야 하는 구조

---

# 4. Key Insight

API 장애는 기술 문제가 아니라 매출 리스크 이벤트이다.

장애 분석의 목적은 오류 원인 파악이 아니라
운영 안정성 확보이다.

IT 기획의 핵심 역할은 운영 데이터를 의사결정 구조로 변환하는 것이다.

---

# 5. Scope

## 포함 범위

API 연계 장애 데이터 분석

장애 영향도 평가 모델 설계

AI 기반 장애 요약 기능

운영 의사결정 지원 구조 설계

## 제외 범위

실제 ERP 시스템 연동

실제 배달 플랫폼 연동

실제 결제 시스템 연동

대규모 트래픽 처리

---

# 6. Stakeholders

IT 기획자

ERP 운영 담당자

서비스 운영 담당자

개발팀

외부 연동 담당자

경영진

---

# 7. User Scenario

## 시나리오 1

운영 담당자가 장애 발생 여부 확인

대시보드에서 실패율 증가 확인

AI Assistant에게 장애 원인 질문

AI가 장애 요약 제공

우선 대응 항목 확인

---

## 시나리오 2

ERP 연계 실패 발생

영향 매장 범위 확인

주문 누락 여부 확인

운영팀 대응 수행

---

## 시나리오 3

주간 장애 보고서 작성 필요

AI Assistant에게 리포트 생성 요청

Markdown 리포트 생성

---

# 8. Functional Requirements

## 8.1 모니터링

연계 요청 수 조회

성공률 조회

실패율 조회

응답시간 조회

경로별 장애 조회

매장별 장애 조회

채널별 장애 조회

---

## 8.2 분석

장애 유형 분류

에러 코드 분석

지연 시간 분석

재시도 패턴 분석

장애 영향 범위 분석

---

## 8.3 AI Assistant

자연어 질문 처리

장애 요약 생성

원인 가설 생성

대응 방안 제안

리포트 생성

---

## 8.4 리포트

주간 장애 리포트 생성

장애 유형 통계

영향 매장 통계

재발 방지 방안

---

# 9. Non Functional Requirements

응답 시간 3초 이하

직관적인 UI

확장 가능한 구조

모듈화 설계

테스트 가능 구조

---

# 10. System Architecture

## 구성 요소

Frontend

Backend

Database

AI Engine

---

## 데이터 흐름

API 이벤트 발생

Backend 저장

DB 저장

집계 쿼리 수행

AI 분석 요청

결과 반환

Dashboard 표시

---

# 11. Data Model

integration_event

id

timestamp

route

status

http_status

error_code

latency_ms

store_id

channel

order_id

payload_hash

---

store

store_id

region

store_type

---

# 12. Business Impact Model

영향도 계산 요소

영향 주문 수

영향 매장 수

장애 지속 시간

재처리 작업량

---

우선순위 계산 예시

impact_score =
order_count
store_count
duration
retry_count

---

# 13. AI Function Design

get_error_summary

get_top_failure_patterns

get_business_impact

get_raw_logs

suggest_remediation

generate_weekly_report

---

# 14. Prompt Design

역할 정의

ERP 연계 장애 분석 전문가

출력 구조 정의

요약

원인

영향

조치

---

# 15. Technical Stack

Frontend

TypeScript

React

Next.js

Tailwind

Recharts

Backend

Python

FastAPI

SQLAlchemy

Database

PostgreSQL

AI

OpenAI API

Infra

Docker

---

# 16. Observability Design

구조화 로그

JSON 로그 포맷

에러 유형 분류

timeout

auth failure

schema mismatch

external api error

unknown error

---

# 17. KPI Definition

MTTR

장애 발생 빈도

재발률

ERP 반영 지연 시간

주문 누락률

---

# 18. Risk

데이터 정확도

AI 환각 가능성

로그 품질 문제

샘플 데이터 한계

---

# 19. Mitigation

샘플 데이터 표준화

AI 응답 구조 제한

에러 코드 사전 정의

테스트 시나리오 작성

---

# 20. Deliverables

대시보드 프로토타입

API 서버

AI Assistant

README 문서

아키텍처 문서

---

# 21. Expected Outcome

장애 분석 시간 감소

운영 효율 향상

IT 의사결정 지원

운영 가시성 향상

---

# 22. Expansion Roadmap

예측 기반 장애 탐지

Runbook 자동 연결

설정 변경 영향 분석

SLA 기반 경고

ERP 변경 영향 분석

---

# 23. Positioning Message

운영 데이터를 구조화하여

IT 의사결정 비용을 줄이는 구조를 설계하는 것이 목표다.