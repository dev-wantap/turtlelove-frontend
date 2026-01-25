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

    onSuccess: (response, variables) => {
      // 로컬 캐시 업데이트
      queryClient.setQueryData(
        ['posts', 'detail', postId],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            comments: [
              ...oldData.comments,
              {
                id: response.id,
                user_id: 0, // 현재 사용자 ID는 백엔드에서 처리
                content: variables.content,
                is_filtered: response.is_filtered,
                is_mine: true,
                created_at: new Date().toISOString(),
              },
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
