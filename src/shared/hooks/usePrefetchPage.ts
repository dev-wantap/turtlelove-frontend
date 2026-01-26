import { useRef } from 'react';

/**
 * 페이지를 미리 로드하기 위한 훅
 * 중복된 import 요청을 방지하여 한 번만 prefetch를 수행합니다.
 */
export function usePrefetchPage() {
  const prefetchedRefs = useRef(new Set<string>());

  return (importFn: () => Promise<any>) => {
    const key = importFn.toString();

    if (!prefetchedRefs.current.has(key)) {
      prefetchedRefs.current.add(key);

      void importFn().catch((error) => {
        // Prefetch 실패 시 refs에서 제거하여 재시도 가능하게
        prefetchedRefs.current.delete(key);

        // 개발용 실패 로그 (production에서는 무시됨)
        console.debug('[usePrefetchPage] Prefetch failed:', {
          key: key.substring(0, 50), // 긴 함수 문자열 방지
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      });
    }
  };
}
