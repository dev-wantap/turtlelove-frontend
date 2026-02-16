import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';
import { authApi } from '@/features/auth/api/authApi';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 앱 재시작 시 user 정보 동기화
  useEffect(() => {
    const authState = useAuthStore.getState();
    if (authState.accessToken && (!authState.user || authState.user.id === 0)) {
      authApi
        .getMe()
        .then((user) => {
          authState.setUser(user);
        })
        .catch((error) => {
          console.error('Failed to refresh user info:', error);
          // Token이 만료되었을 수 있으므로 로그아웃
          authState.logout();
        });
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
