export function SignupPage() {
  return (
    <div className="page-enter flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-2xl bg-warm-white p-8 shadow-soft-md">
        <h1 className="font-heading text-center text-2xl font-semibold text-text-primary">
          회원가입
        </h1>
        <p className="mt-2 text-center text-sm text-text-muted">
          대학생만 이용할 수 있는 커뮤니티
        </p>
        <div className="mt-8">
          {/* TODO: SignupForm 컴포넌트 구현 */}
          <p className="text-center text-sm text-text-muted">
            회원가입 폼 (구현 예정)
          </p>
        </div>
      </div>
    </div>
  );
}
