import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { useAuth } from '@/features/auth/hooks';
import { GradientOrb } from '@/components/atoms/GradientOrb';
import { Button } from '@/components/atoms/Button';
import { ROUTES } from '@/shared/constants/routes';

const navItems = [
  { label: '홈', path: ROUTES.HOME },
  { label: '게시글', path: ROUTES.POSTS },
  { label: '채팅', path: ROUTES.CHATS },
];

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-warm-gray/50 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        {/* 로고 */}
        <Link
          to="/"
          className="flex items-center gap-2 font-heading text-xl font-semibold text-text-primary"
        >
          <span className="text-rose">Turtle</span>
          <span>Love</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'rounded-lg px-4 py-2 font-ui text-sm font-medium transition-colors',
                isActive(item.path)
                  ? 'bg-rose-light text-rose-dark'
                  : 'text-text-secondary hover:bg-soft-gray hover:text-text-primary'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 우측 영역 */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* 마이페이지 */}
              <Link
                to={ROUTES.MYPAGE}
                className="hidden items-center gap-2 rounded-full bg-soft-gray px-3 py-1.5 transition-colors hover:bg-warm-gray md:flex"
              >
                <GradientOrb variant="sunset" size="sm" />
                <span className="font-ui text-sm font-medium text-text-primary">
                  {user?.nickname ?? '익명'}
                </span>
              </Link>

              {/* 로그아웃 버튼 (데스크톱) */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden md:inline-flex"
              >
                로그아웃
              </Button>
            </>
          ) : (
            <div className="hidden gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link to={ROUTES.LOGIN}>로그인</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to={ROUTES.SIGNUP}>회원가입</Link>
              </Button>
            </div>
          )}

          {/* 모바일 메뉴 버튼 */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-soft-gray md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="border-t border-warm-gray/50 bg-cream md:hidden">
          <nav className="mx-auto max-w-3xl space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block rounded-lg px-4 py-3 font-ui text-base font-medium transition-colors',
                  isActive(item.path)
                    ? 'bg-rose-light text-rose-dark'
                    : 'text-text-secondary hover:bg-soft-gray'
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="my-4 border-t border-warm-gray/50" />

            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.MYPAGE}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-soft-gray"
                >
                  <GradientOrb variant="sunset" size="sm" />
                  <span className="font-ui text-base font-medium text-text-primary">
                    마이페이지
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg px-4 py-3 text-left font-ui text-base font-medium text-text-secondary transition-colors hover:bg-soft-gray"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <div className="flex gap-3 px-4">
                <Button variant="ghost" className="flex-1" asChild>
                  <Link to={ROUTES.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                    로그인
                  </Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link to={ROUTES.SIGNUP} onClick={() => setIsMobileMenuOpen(false)}>
                    회원가입
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
