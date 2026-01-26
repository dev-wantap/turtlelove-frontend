import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePrefetchPage } from '../usePrefetchPage';
import { createWrapper } from '@/test/test-utils';

describe('usePrefetchPage 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('정상 동작', () => {
    it('importFn을 처음 호출하면 실행되어야 함', async () => {
      const mockImport = vi.fn(() => Promise.resolve({ default: {} }));
      const { result } = renderHook(() => usePrefetchPage(), {
        wrapper: createWrapper(),
      });

      result.current(mockImport);

      await waitFor(() => {
        expect(mockImport).toHaveBeenCalledTimes(1);
      });
    });

    it('동일한 importFn은 두 번 호출되지 않아야 함', async () => {
      const mockImport = vi.fn(() => Promise.resolve({ default: {} }));
      const { result } = renderHook(() => usePrefetchPage(), {
        wrapper: createWrapper(),
      });

      // 첫 번째 호출
      result.current(mockImport);
      // 두 번째 호출 (같은 함수)
      result.current(mockImport);

      await waitFor(() => {
        expect(mockImport).toHaveBeenCalledTimes(1);
      });
    });

  });

  describe('에러 처리', () => {
    it('importFn 실패 시 console.debug가 호출되어야 함', async () => {
      const mockError = new Error('Network error');
      const mockImport = vi.fn(() => Promise.reject(mockError));
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      const { result } = renderHook(() => usePrefetchPage(), {
        wrapper: createWrapper(),
      });

      result.current(mockImport);

      await waitFor(() => {
        expect(debugSpy).toHaveBeenCalledWith(
          '[usePrefetchPage] Prefetch failed:',
          expect.objectContaining({
            error: 'Network error',
          })
        );
      });

      debugSpy.mockRestore();
    });

    it('importFn 실패 후 재시도가 가능해야 함', async () => {
      const mockImport = vi.fn(() => Promise.reject(new Error('Failed')));
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      const { result } = renderHook(() => usePrefetchPage(), {
        wrapper: createWrapper(),
      });

      // 첫 번째 호출 (실패)
      result.current(mockImport);

      await waitFor(
        () => {
          expect(debugSpy).toHaveBeenCalled();
        },
        { timeout: 1000 }
      );

      // 두 번째 호출 (실패 후 재시도)
      result.current(mockImport);

      await waitFor(
        () => {
          expect(mockImport).toHaveBeenCalledTimes(2);
        },
        { timeout: 1000 }
      );

      debugSpy.mockRestore();
    });

    it('성공한 importFn은 재시도되지 않아야 함', async () => {
      const mockImport = vi.fn(() => Promise.resolve({ default: {} }));
      const { result } = renderHook(() => usePrefetchPage(), {
        wrapper: createWrapper(),
      });

      // 첫 번째 호출 (성공)
      result.current(mockImport);

      await waitFor(() => {
        expect(mockImport).toHaveBeenCalledTimes(1);
      });

      // 두 번째 호출 (중복 방지)
      result.current(mockImport);

      await waitFor(() => {
        expect(mockImport).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('로그 형식', () => {
    it('console.debug에 key의 일부분이 포함되어야 함', async () => {
      const mockImport = vi.fn(() => Promise.reject(new Error('Test error')));
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      const { result } = renderHook(() => usePrefetchPage(), {
        wrapper: createWrapper(),
      });

      result.current(mockImport);

      await waitFor(
        () => {
          expect(debugSpy).toHaveBeenCalled();
          const callArgs = debugSpy.mock.calls[0];
          expect(callArgs[1]).toHaveProperty('key');
          expect(callArgs[1].key.length).toBeLessThanOrEqual(50);
        },
        { timeout: 1000 }
      );

      debugSpy.mockRestore();
    });

    it('에러가 Error 인스턴스가 아닌 경우 Unknown error로 표시되어야 함', async () => {
      const mockImport = vi.fn(() => Promise.reject('String error'));
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      const { result } = renderHook(() => usePrefetchPage(), {
        wrapper: createWrapper(),
      });

      result.current(mockImport);

      await waitFor(
        () => {
          expect(debugSpy).toHaveBeenCalledWith(
            '[usePrefetchPage] Prefetch failed:',
            expect.objectContaining({
              error: 'Unknown error',
            })
          );
        },
        { timeout: 1000 }
      );

      debugSpy.mockRestore();
    });
  });
});
