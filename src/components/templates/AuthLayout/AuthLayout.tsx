import { Outlet, Link } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* 심플 헤더 */}
      <header className="py-6">
        <div className="mx-auto max-w-md px-4">
          <Link
            to="/"
            className="inline-block font-heading text-xl font-semibold text-text-primary"
          >
            <span className="text-rose">Turtle</span>
            <span>Love</span>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="page-enter w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* 심플 푸터 */}
      <footer className="py-6">
        <div className="mx-auto max-w-md px-4 text-center">
          <p className="font-ui text-xs text-text-muted">
            &copy; {new Date().getFullYear()} TurtleLove
          </p>
        </div>
      </footer>
    </div>
  );
}
