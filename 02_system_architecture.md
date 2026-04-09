# System Architecture
### IT Operations Decision Support AI

---

# 1. Architecture Overview

본 시스템은 API 연계 이벤트를 수집하고,
장애 패턴을 분석하며,
AI를 활용하여 운영 의사결정을 지원하는 구조로 설계된다.

구성 레이어:

Presentation Layer
Application Layer
Data Layer
AI Layer

---

# 2. Logical Architecture

[ User ]
   ↓
Dashboard UI
   ↓
Backend API
   ↓
Analytics Engine
   ↓
Database

AI Assistant
   ↘
   OpenAI API

---

# 3. Component Description

## Frontend

기능

대시보드 화면

KPI 표시

장애 로그 테이블

AI Assistant 채팅 인터페이스

기술

React

TypeScript

Tailwind

Recharts

---

## Backend

기능

이벤트 수집

데이터 집계

로그 조회

AI 요청 처리

리포트 생성

기술

FastAPI

Python

SQLAlchemy

---

## Database

기능

이벤트 저장

로그 저장

집계 데이터 저장

기술

PostgreSQL

---

## AI Engine

기능

장애 요약 생성

원인 분석

대응 방안 제안

리포트 생성

기술

OpenAI API

---

# 4. Data Flow

1 이벤트 발생

2 Backend API 호출

3 이벤트 저장

4 집계 수행

5 AI 분석 요청

6 결과 반환

7 UI 표시

---

# 5. Deployment Architecture

frontend

vercel

backend

render

database

neon postgres

---

# 6. Security Consideration

API 인증 구조

환경변수 관리

AI 함수 호출 제한

민감 데이터 제거

---

# 7. Scalability

모듈 구조 확장 가능

데이터 모델 확장 가능

AI 기능 확장 가능

다양한 API 연계 추가 가능