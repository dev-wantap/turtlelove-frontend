export function LoginPage() {
  return (
    <div className="page-enter flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-2xl bg-warm-white p-8 shadow-soft-md">
        <h1 className="font-heading text-center text-2xl font-semibold text-text-primary">
          로그인
        </h1>
        <p className="mt-2 text-center text-sm text-text-muted">
          TurtleLove에 다시 오신 것을 환영합니다
        </p>
        <div className="mt-8">
          {/* TODO: LoginForm 컴포넌트 구현 */}
          <p className="text-center text-sm text-text-muted">로그인 폼 (구현 예정)</p>
        </div>
      </div>
    </div>
  );
}
