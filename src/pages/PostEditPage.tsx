import { useParams } from 'react-router-dom';

export function PostEditPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-enter min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-2xl font-semibold text-text-primary">
          게시글 수정
        </h1>
        <p className="mt-4 text-text-muted">게시글 수정 #{id} (구현 예정)</p>
      </div>
    </div>
  );
}
