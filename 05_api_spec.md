# API Specification

---

# 1. GET events

/api/events

description

연계 이벤트 목록 조회

query parameters

start_time

end_time

route

store_id

status

response

list of integration_event

---

# 2. GET metrics

/api/metrics

description

KPI 데이터 조회

response

total_requests

failure_rate

avg_latency

affected_stores

---

# 3. GET error summary

/api/error-summary

description

에러 유형 요약

response

error_code

count

percentage

---

# 4. GET impact analysis

/api/impact

description

비즈니스 영향 분석

response

affected_orders

affected_stores

estimated_impact

---

# 5. POST ai query

/api/ai/query

description

AI 질의 요청

request

question

time_window

route

response

summary

root_cause

impact

action

---

# 6. GET report

/api/report/weekly

description

주간 장애 리포트 생성

response

markdown report

---

# 7. health check

/api/health

status

ok

---

# 8. metrics endpoint

/api/metrics/system

cpu usage

memory usage

request count