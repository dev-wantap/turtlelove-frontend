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
      importFn(); // Vite가 prefetch를 트리거
    }
  };
}
