import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { lazy, Suspense, type ReactNode } from 'react';

import { MainLayout } from '@/components/templates/MainLayout';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';

// HomePage는 SEO를 위해 eager loading
import { HomePage } from '@/pages/HomePage';

// 나머지 페이지는 lazy loading
const LoginPage = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('@/pages/SignupPage').then(m => ({ default: m.SignupPage })));
const PostListPage = lazy(() => import('@/pages/PostListPage').then(m => ({ default: m.PostListPage })));
const PostDetailPage = lazy(() => import('@/pages/PostDetailPage').then(m => ({ default: m.PostDetailPage })));
const PostCreatePage = lazy(() => import('@/pages/PostCreatePage').then(m => ({ default: m.PostCreatePage })));
const PostEditPage = lazy(() => import('@/pages/PostEditPage').then(m => ({ default: m.PostEditPage })));
const ChatListPage = lazy(() => import('@/pages/ChatListPage').then(m => ({ default: m.ChatListPage })));
const ChatRoomPage = lazy(() => import('@/pages/ChatRoomPage').then(m => ({ default: m.ChatRoomPage })));
const MyPage = lazy(() => import('@/pages/MyPage').then(m => ({ default: m.MyPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// PageLoader 컴포넌트
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
        <p className="mt-4 font-ui text-sm text-text-muted animate-pulse">
          페이지를 불러오는 중...
        </p>
      </div>
    </div>
  );
}

// Suspense wrapper
function SuspenseWrapper({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth Layout - 로그인/회원가입 */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SuspenseWrapper><LoginPage /></SuspenseWrapper>} />
        <Route path="/signup" element={<SuspenseWrapper><SignupPage /></SuspenseWrapper>} />
      </Route>

      {/* Main Layout - 메인 콘텐츠 */}
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/posts" element={<SuspenseWrapper><PostListPage /></SuspenseWrapper>} />
          <Route path="/posts/new" element={<SuspenseWrapper><PostCreatePage /></SuspenseWrapper>} />
          <Route path="/posts/:id" element={<SuspenseWrapper><PostDetailPage /></SuspenseWrapper>} />
          <Route path="/posts/:id/edit" element={<SuspenseWrapper><PostEditPage /></SuspenseWrapper>} />
          <Route path="/chats" element={<SuspenseWrapper><ChatListPage /></SuspenseWrapper>} />
          <Route path="/chats/:roomId" element={<SuspenseWrapper><ChatRoomPage /></SuspenseWrapper>} />
          <Route path="/mypage" element={<SuspenseWrapper><MyPage /></SuspenseWrapper>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<SuspenseWrapper><NotFoundPage /></SuspenseWrapper>} />
      </Route>
    </>
  )
);
