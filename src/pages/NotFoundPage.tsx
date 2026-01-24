import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-semibold text-text-primary">
          404
        </h1>
        <p className="mt-4 font-body text-text-secondary">
          페이지를 찾을 수 없습니다
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-rose px-6 py-3 font-ui text-sm font-medium text-white transition-colors hover:bg-rose-deep"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
