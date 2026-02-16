import { authApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/stores';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/stores';
import type { LoginResponse } from '@/features/auth/types';

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setToken = useAuthStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data: LoginResponse, variables) => {
      setToken(data.accessToken);

      // 응답에 user 정보가 있으면 사용 (Demo 모드)
      if (data.user) {
        setAuth(data.user, data.accessToken);
        navigate('/posts');
      } else {
        // 실제 백엔드: /me API로 user 정보 가져오기
        try {
          const user = await authApi.getMe();
          setAuth(user, data.accessToken);
          navigate('/posts');
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          // user 정보 가져오기 실패 시 로그인 실패 처리
          // partial auth state 정리
          const authState = useAuthStore.getState();
          authState.logout();
          // 에러를 다시 던져서 호출자가 처리할 수 있게 함
          throw error;
        }
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // TODO: 에러 처리 (토스트 등)
    },
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
