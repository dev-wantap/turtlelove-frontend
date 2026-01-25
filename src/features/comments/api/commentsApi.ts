import { apiClient } from '@/shared/api/client';
import type {
  CreateCommentRequest,
  CreateCommentResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  DeleteCommentResponse,
} from '../types/comments.types';

export const commentsApi = {
  /**
   * 댓글 작성
   * POST /posts/{postId}/comments
   */
  create: async (postId: number, data: CreateCommentRequest): Promise<CreateCommentResponse> => {
    const response = await apiClient.post<CreateCommentResponse>(
      `/posts/${postId}/comments`,
      data
    );
    return response.data;
  },

  /**
   * 댓글 수정
   * PUT /comments/{commentId}
   */
  update: async (commentId: number, data: UpdateCommentRequest): Promise<UpdateCommentResponse> => {
    const response = await apiClient.put<UpdateCommentResponse>(
      `/comments/${commentId}`,
      data
    );
    return response.data;
  },

  /**
   * 댓글 삭제
   * DELETE /comments/{commentId}
   */
  delete: async (commentId: number): Promise<DeleteCommentResponse> => {
    const response = await apiClient.delete<DeleteCommentResponse>(
      `/comments/${commentId}`
    );
    return response.data;
  },
};
