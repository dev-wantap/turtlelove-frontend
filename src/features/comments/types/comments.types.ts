import type { Comment } from '@/features/posts/types/posts.types';

// Request Types
export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

// Response Types
export interface CreateCommentResponse {
  id: number;
  is_filtered: boolean;
}

export interface UpdateCommentResponse {
  id: number;
  content: string;
  is_filtered: boolean;
  updated_at: string;
}

export interface DeleteCommentResponse {
  message: string;
  commentId: number;
}

// Re-export Comment type from posts for convenience
export type { Comment };
