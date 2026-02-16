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
    mutationFn: async (variables: LoginRequest): Promise<LoginResponse> => {
      // 1. 로그인 API 호출
      const loginResponse = await authApi.login(variables);
      setToken(loginResponse.accessToken);

      // 2. 응답에 user 정보가 있으면 사용 (Demo 모드)
      if (loginResponse.user) {
        setAuth(loginResponse.user, loginResponse.accessToken);
        return loginResponse;
      }

      // 3. 실제 백엔드: /me API로 user 정보 가져오기
      try {
        const user = await authApi.getMe();
        setAuth(user, loginResponse.accessToken);
        return loginResponse;
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        // user 정보 가져오기 실패 시 로그인 실패 처리
        // partial auth state 정리
        const authState = useAuthStore.getState();
        authState.logout();
        // mutationFn에서 throw하면 mutation.error에 반영됨
        throw error;
      }
    },
    onSuccess: (data: LoginResponse) => {
      // user 정보는 이미 mutationFn에서 설정됨
      navigate('/posts');
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
