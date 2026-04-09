# Data Model

---

# 1. integration_event

API 연계 이벤트 저장

id

timestamp

route

source_system

target_system

status

http_status

error_code

latency_ms

store_id

channel

order_id

retry_count

payload_hash

---

# 2. store

매장 정보

store_id

store_name

region

store_type

open_date

status

---

# 3. channel

주문 채널 정보

channel_id

channel_name

channel_type

---

# 4. error_dictionary

에러 코드 정의

error_code

error_type

severity

description

recommended_action

---

# 5. incident_report

장애 리포트 저장

incident_id

created_at

summary

root_cause

impact_scope

recommended_action

---

# 6. relationship

integration_event

many to one

store

integration_event

many to one

channel

integration_event

many to one

error_dictionary

---

# 7. index strategy

timestamp index

route index

store_id index

error_code index

---

# 8. example record

route

ORDER_TO_ERP

error_code

SCHEMA_MISMATCH

latency

2100 ms

store_id

S0012

channel

DELIVERY_APP