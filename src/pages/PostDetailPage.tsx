import { useParams } from 'react-router-dom';

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-enter min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <p className="text-text-muted">게시글 상세 #{id} (구현 예정)</p>
      </div>
    </div>
  );
}
