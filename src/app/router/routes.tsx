import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { MainLayout } from '@/components/templates/MainLayout';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { PostListPage } from '@/pages/PostListPage';
import { PostDetailPage } from '@/pages/PostDetailPage';
import { PostCreatePage } from '@/pages/PostCreatePage';
import { PostEditPage } from '@/pages/PostEditPage';
import { ChatListPage } from '@/pages/ChatListPage';
import { ChatRoomPage } from '@/pages/ChatRoomPage';
import { MyPage } from '@/pages/MyPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth Layout - 로그인/회원가입 */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Main Layout - 메인 콘텐츠 */}
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/new" element={<PostCreatePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/:id/edit" element={<PostEditPage />} />
          <Route path="/chats" element={<ChatListPage />} />
          <Route path="/chats/:roomId" element={<ChatRoomPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);
