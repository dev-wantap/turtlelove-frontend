import { commentsApi } from '@/features/comments/api/commentsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '@/stores/uiStore';

interface UseDeleteCommentOptions {
  postId: number;
}

export function useDeleteComment({ postId }: UseDeleteCommentOptions) {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  const mutation = useMutation({
    mutationFn: (commentId: number) => commentsApi.delete(commentId),

    onSuccess: (_, commentId) => {
      // 로컬 캐시 업데이트
      queryClient.setQueryData(
        ['posts', 'detail', postId],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            comments: oldData.comments.filter(
              (comment: any) => comment.id !== commentId
            ),
          };
        }
      );

      addToast({
        message: '댓글이 삭제되었습니다.',
        variant: 'success',
      });
    },

    onError: (error: any) => {
      console.error('Delete comment failed:', error);
      addToast({
        message: error.response?.data?.message || '댓글 삭제에 실패했습니다.',
        variant: 'error',
      });
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}
