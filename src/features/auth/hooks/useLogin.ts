import { authApi } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/stores';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      // TODO: 유저 정보 가져오기 (임시 처리)
      setAuth(
        {
          id: 0,
          email: '',
          nickname: '',
          university: '',
          gender: null,
        },
        data.accessToken
      );
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
