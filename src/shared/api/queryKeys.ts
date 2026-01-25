/**
 * TanStack Query Keys
 *
 * Query Key Factory 패턴을 사용하여 타입 안전한 쿼리 키를 정의합니다.
 * @see https://tkdodo.eu/blog/effective-react-query-keys
 */

export const queryKeys = {
  // 인증
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },

  // 게시글
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: { category?: number; page?: number; size?: number }) =>
      [...queryKeys.posts.lists(), filters] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.posts.details(), id] as const,
  },

  // 댓글
  comments: {
    all: ['comments'] as const,
    byPost: (postId: number) => [...queryKeys.comments.all, 'post', postId] as const,
  },

  // 채팅
  chat: {
    all: ['chat'] as const,
    rooms: () => [...queryKeys.chat.all, 'rooms'] as const,
    room: (roomId: number) => [...queryKeys.chat.rooms(), roomId] as const,
    messages: (roomId: number) => [...queryKeys.chat.all, 'messages', roomId] as const,
  },

  // 마이페이지
  mypage: {
    all: ['mypage'] as const,
    posts: () => [...queryKeys.mypage.all, 'posts'] as const,
    comments: () => [...queryKeys.mypage.all, 'comments'] as const,
  },
} as const;

// 타입 추출 헬퍼
export type QueryKeys = typeof queryKeys;
