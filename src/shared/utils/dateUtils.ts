import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 상대적인 시간으로 포맷팅합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 상대적인 시간 문자열 (예: "5분 전", "2시간 전")
 */
export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: ko,
  });
}
