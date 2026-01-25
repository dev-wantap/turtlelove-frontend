import { commentsApi } from '@/features/comments/api/commentsApi';
import type { UpdateCommentRequest } from '@/features/comments/types/comments.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '@/stores/uiStore';

interface UseUpdateCommentOptions {
  postId: number;
}

export function useUpdateComment({ postId }: UseUpdateCommentOptions) {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  const mutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number } & UpdateCommentRequest) =>
      commentsApi.update(commentId, { content }),

    onSuccess: (response, variables) => {
      const commentId = variables.commentId;

      // 로컬 캐시 업데이트
      queryClient.setQueryData(
        ['posts', 'detail', postId],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            comments: oldData.comments.map((comment: any) =>
              comment.id === commentId
                ? {
                    ...comment,
                    content: response.content,
                    is_filtered: response.is_filtered,
                    updated_at: response.updated_at,
                  }
                : comment
            ),
          };
        }
      );

      addToast({
        message: response.is_filtered
          ? '댓글이 수정되었지만 AI 필터링되었습니다.'
          : '댓글이 수정되었습니다.',
        variant: response.is_filtered ? 'warning' : 'success',
      });
    },

    onError: (error: any) => {
      console.error('Update comment failed:', error);
      addToast({
        message: error.response?.data?.message || '댓글 수정에 실패했습니다.',
        variant: 'error',
      });
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}
