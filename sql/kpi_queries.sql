-- KPI queries for IT Operations Decision Support AI
-- PostgreSQL 기준

SELECT
  COUNT(*) AS total_requests,
  COUNT(*) FILTER (WHERE status = 'FAIL') AS failed_requests,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'FAIL')::numeric / NULLIF(COUNT(*), 0) * 100, 2
  ) AS failure_rate_pct,
  ROUND(AVG(latency_ms), 2) AS avg_latency_ms
FROM integration_event
WHERE "timestamp" >= NOW() - INTERVAL '1 hour';

SELECT
  COUNT(DISTINCT store_id) FILTER (WHERE status = 'FAIL') AS affected_stores,
  COUNT(DISTINCT order_id) FILTER (WHERE status = 'FAIL') AS affected_orders
FROM integration_event
WHERE "timestamp" >= NOW() - INTERVAL '1 hour';

SELECT
  date_trunc('hour', "timestamp") AS hour_bucket,
  COUNT(*) AS total_requests,
  COUNT(*) FILTER (WHERE status = 'FAIL') AS failed_requests,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'FAIL')::numeric / NULLIF(COUNT(*), 0) * 100, 2
  ) AS failure_rate_pct
FROM integration_event
WHERE "timestamp" >= NOW() - INTERVAL '24 hours'
GROUP BY 1
ORDER BY 1;

SELECT
  error_code,
  COUNT(*) AS occurrences
FROM integration_event
WHERE "timestamp" >= NOW() - INTERVAL '24 hours'
  AND status = 'FAIL'
GROUP BY error_code
ORDER BY occurrences DESC
LIMIT 10;

SELECT
  route,
  COUNT(*) AS total_requests,
  ROUND(AVG(latency_ms), 2) AS avg_latency_ms,
  COUNT(*) FILTER (WHERE status = 'FAIL') AS failed_requests,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'FAIL')::numeric / NULLIF(COUNT(*), 0) * 100, 2
  ) AS failure_rate_pct
FROM integration_event
WHERE "timestamp" >= NOW() - INTERVAL '24 hours'
GROUP BY route
ORDER BY failure_rate_pct DESC, avg_latency_ms DESC;

SELECT
  store_id,
  COUNT(*) FILTER (WHERE status = 'FAIL') AS fail_count,
  ROUND(AVG(latency_ms), 2) AS avg_latency_ms,
  COALESCE(SUM(retry_count), 0) AS retry_sum,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'FAIL') * 1.0
    + CASE WHEN AVG(latency_ms) > 1500 THEN 0.5 ELSE 0 END
    + COALESCE(SUM(retry_count), 0) * 0.2,
    2
  ) AS impact_score
FROM integration_event
WHERE "timestamp" >= NOW() - INTERVAL '24 hours'
GROUP BY store_id
ORDER BY impact_score DESC
LIMIT 20;

SELECT
  channel,
  COUNT(DISTINCT order_id) FILTER (WHERE status = 'FAIL') AS affected_orders,
  COUNT(DISTINCT store_id) FILTER (WHERE status = 'FAIL') AS affected_stores,
  COUNT(*) FILTER (WHERE status = 'FAIL') AS failed_events
FROM integration_event
WHERE "timestamp" >= NOW() - INTERVAL '24 hours'
GROUP BY channel
ORDER BY failed_events DESC;

SELECT
  route,
  COUNT(*) AS total_requests,
  COUNT(*) FILTER (WHERE status = 'FAIL') AS failed_requests,
  ROUND(AVG(latency_ms), 2) AS avg_latency_ms,
  MAX("timestamp") AS last_seen_at
FROM integration_event
WHERE "timestamp" >= NOW() - INTERVAL '1 hour'
GROUP BY route
ORDER BY failed_requests DESC, avg_latency_ms DESC;
