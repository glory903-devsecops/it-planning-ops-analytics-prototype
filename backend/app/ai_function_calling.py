from typing import Any, Dict, List, Optional
from openai import OpenAI
import json

client = OpenAI()

SYSTEM_PROMPT = """
당신은 주문·배달·ERP 연계 장애 분석 전문가다.
운영자가 이해하기 쉬운 한국어로 답변하라.
확인되지 않은 원인을 단정하지 말고, 원인 가설과 근거를 분리하라.
응답 구조는 다음 순서를 따른다:
1) 장애 요약
2) 원인 가설
3) 영향 범위
4) 우선 조치 항목
"""

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_error_summary",
            "description": "시간 구간과 라우트 기준 장애 요약 조회",
            "parameters": {
                "type": "object",
                "properties": {
                    "time_window": {"type": "string"},
                    "route": {"type": "string"},
                    "store_id": {"type": "string"}
                },
                "required": ["time_window"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_top_failure_patterns",
            "description": "상위 장애 패턴 조회",
            "parameters": {
                "type": "object",
                "properties": {
                    "time_window": {"type": "string"},
                    "group_by": {"type": "string"}
                },
                "required": ["time_window", "group_by"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_business_impact",
            "description": "비즈니스 영향 범위 조회",
            "parameters": {
                "type": "object",
                "properties": {
                    "error_type": {"type": "string"},
                    "time_window": {"type": "string"}
                },
                "required": ["error_type", "time_window"]
            }
        }
    }
]

def get_error_summary(time_window: str, route: Optional[str] = None, store_id: Optional[str] = None) -> Dict[str, Any]:
    return {
        "time_window": time_window,
        "route": route or "ALL",
        "store_id": store_id or "ALL",
        "failed_requests": 23,
        "failure_rate_pct": 3.42,
        "avg_latency_ms": 1380,
        "top_error_code": "TIMEOUT"
    }

def get_top_failure_patterns(time_window: str, group_by: str) -> Dict[str, Any]:
    return {
        "time_window": time_window,
        "group_by": group_by,
        "patterns": [
            {"key": "TIMEOUT", "count": 14},
            {"key": "SCHEMA_MISMATCH", "count": 8},
            {"key": "AUTH_FAIL", "count": 6}
        ]
    }

def get_business_impact(error_type: str, time_window: str) -> Dict[str, Any]:
    return {
        "error_type": error_type,
        "time_window": time_window,
        "affected_orders": 51,
        "affected_stores": 12,
        "estimated_risk_level": "HIGH"
    }

AVAILABLE_FUNCTIONS = {
    "get_error_summary": get_error_summary,
    "get_top_failure_patterns": get_top_failure_patterns,
    "get_business_impact": get_business_impact
}

def run_assistant(question: str) -> str:
    messages: List[Dict[str, Any]] = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": question}
    ]

    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=messages,
        tools=TOOLS,
        tool_choice="auto"
    )

    message = response.choices[0].message
    tool_calls = getattr(message, "tool_calls", None)

    if tool_calls:
        messages.append(message)
        for call in tool_calls:
            fn_name = call.function.name
            arguments = json.loads(call.function.arguments)
            result = AVAILABLE_FUNCTIONS[fn_name](**arguments)

            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": call.id,
                    "name": fn_name,
                    "content": json.dumps(result, ensure_ascii=False)
                }
            )

        final_response = client.chat.completions.create(
            model="gpt-4.1",
            messages=messages
        )
        return final_response.choices[0].message.content or ""

    return message.content or ""

if __name__ == "__main__":
    sample_question = "지난 1시간 동안 가장 영향이 큰 장애와 우선 조치 항목을 알려줘."
    print(run_assistant(sample_question))
