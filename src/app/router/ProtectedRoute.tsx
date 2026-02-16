import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores';
import { useEffect, useState } from 'react';
import { authApi } from '@/features/auth/api/authApi';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  // 앱 재시작 시 user 정보 동기화
  useEffect(() => {
    const authState = useAuthStore.getState();
    if (authState.accessToken && (!authState.user || authState.user.id === 0)) {
      setIsLoadingUser(true);
      authApi
        .getMe()
        .then((user) => {
          authState.setUser(user);
        })
        .catch((error) => {
          console.error('Failed to refresh user info:', error);
          // Token이 만료되었을 수 있으므로 로그아웃
          authState.logout();
        })
        .finally(() => {
          setIsLoadingUser(false);
        });
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // user 정보 로딩 중일 때는 로딩 표시
  if (isLoadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-rose mx-auto" />
          <p className="text-sm font-ui text-text-muted">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
