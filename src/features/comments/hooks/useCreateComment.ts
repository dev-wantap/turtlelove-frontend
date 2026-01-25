import { commentsApi } from '@/features/comments/api/commentsApi';
import type { CreateCommentRequest } from '@/features/comments/types/comments.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '@/stores/uiStore';

interface UseCreateCommentOptions {
  postId: number;
}

export function useCreateComment({ postId }: UseCreateCommentOptions) {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  const mutation = useMutation({
    mutationFn: (data: CreateCommentRequest) => commentsApi.create(postId, data),

    onSuccess: (response) => {
      // 로컬 캐시 업데이트 - 서버 응답을 그대로 사용
      queryClient.setQueryData(
        ['posts', 'detail', postId],
        (oldData: any) => {
          if (!oldData || !oldData.comments) return oldData;
          return {
            ...oldData,
            comments: [
              ...oldData.comments,
              response,
            ],
          };
        }
      );

      // 성공 토스트
      addToast({
        message: response.is_filtered
          ? '댓글이 작성되었지만 AI 필터링되었습니다.'
          : '댓글이 작성되었습니다.',
        variant: response.is_filtered ? 'warning' : 'success',
      });
    },

    onError: (error: any) => {
      console.error('Create comment failed:', error);
      addToast({
        message: error.response?.data?.message || '댓글 작성에 실패했습니다.',
        variant: 'error',
      });
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}
