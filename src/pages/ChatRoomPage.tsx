import { useParams } from 'react-router-dom';

export function ChatRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div className="page-enter min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <p className="text-text-muted">채팅방 #{roomId} (구현 예정)</p>
      </div>
    </div>
  );
}
