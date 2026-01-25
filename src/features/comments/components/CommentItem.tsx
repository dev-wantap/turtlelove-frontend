import { useState, useEffect } from 'react';
import type { Comment } from '@/features/posts/types/posts.types';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { GradientOrb } from '@/components/atoms/GradientOrb';
import { formatRelativeTime } from '@/shared/utils/dateUtils';

interface CommentItemProps {
  comment: Comment;
  isPostAuthor: boolean;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  onChatRequest?: (comment: Comment) => void;
}

export function CommentItem({
  comment,
  isPostAuthor,
  onEdit,
  onDelete,
  onChatRequest,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  // Sync editContent when comment.content changes from external source
  // Only sync when not editing to preserve user's current work
  useEffect(() => {
    if (!isEditing) {
      setEditContent(comment.content);
    }
  }, [comment.content, isEditing]);

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onEdit(comment.id, editContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      onDelete(comment.id);
    }
  };

  const handleChatRequest = () => {
    if (onChatRequest) {
      onChatRequest(comment);
    }
  };

  return (
    <div className="group relative animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex gap-3 p-4 rounded-2xl bg-warm-white/50 hover:bg-warm-white/80 transition-colors">
        {/* 익명 아바타 */}
        <div className="flex-shrink-0">
          <GradientOrb size="sm" />
        </div>

        {/* 댓글 내용 */}
        <div className="flex-1 min-w-0">
          {/* AI 필터링 배지 */}
          {comment.is_filtered && (
            <div className="mb-2">
              <Badge variant="warning">
                AI 필터링됨
              </Badge>
            </div>
          )}

          {/* 댓글 내용 또는 수정 폼 */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full min-h-[80px] p-3 rounded-xl border-2 border-warm-gray/30 focus:border-rose-200 focus:ring-2 focus:ring-rose-100 outline-none resize-none transition-all bg-white"
                placeholder="댓글을 수정하세요..."
              />
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="text-warm-gray hover:text-warm-brown"
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={!editContent.trim()}
                  className="bg-rose-400 hover:bg-rose-500"
                >
                  저장
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-warm-brown leading-relaxed whitespace-pre-wrap break-words">
                {comment.content}
              </p>

              {/* 작성 시간 */}
              <div className="mt-2 flex items-center gap-3 text-xs text-warm-gray">
                <span>{formatRelativeTime(comment.created_at)}</span>

                {/* 액션 버튼들 */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* 채팅 요청 버튼 - 게시글 작성자에게만 표시 */}
                  {isPostAuthor && !comment.is_mine && !comment.is_filtered && onChatRequest && (
                    <button
                      onClick={handleChatRequest}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50 text-rose-400 hover:text-rose-500 transition-colors"
                      title="채팅 요청"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>채팅</span>
                    </button>
                  )}

                  {/* 수정 버튼 - 본인 댓글에만 표시 */}
                  {comment.is_mine && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-2 py-1 rounded-lg hover:bg-sage-50 text-sage-400 hover:text-sage-500 transition-colors"
                      >
                        수정
                      </button>
                      <button
                        onClick={handleDelete}
                        className="px-2 py-1 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
