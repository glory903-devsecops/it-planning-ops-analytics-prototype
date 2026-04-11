/**
 * 숫자를 한국형 금액 포맷으로 변환합니다.
 * 예: 153003300 -> "1억 5,300만 3,300"
 */
export const formatKoreanCurrency = (value: number): string => {
  if (value === 0) return '0원';

  const units = [
    { label: '억', value: 100_000_000 },
    { label: '천', value: 10_000_000 },
    { label: '백', value: 1_000_000 },
  ];

  let remaining = Math.floor(value);
  let result = '';

  for (const unit of units) {
    const count = Math.floor(remaining / unit.value);
    if (count > 0) {
      result += `${count}${unit.label} `;
      remaining %= unit.value;
    }
  }

  if (remaining > 0 || result === '') {
    result += `${remaining.toLocaleString()}원`;
  } else {
    result = result.trim() + '원';
  }

  return result;
};

/**
 * 숫자를 짧은 한글 단위로 변환합니다 (차트 Y축용)
 * 예: 150000000 -> "1.5억"
 */
export function formatShortKorean(value: number): string {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(1)}억`;
  }
  if (value >= 10000) {
    return `${(value / 1000).toFixed(0)}만`;
  }
  return value.toLocaleString();
}
