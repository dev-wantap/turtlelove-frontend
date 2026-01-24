export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  POSTS: '/posts',
  POST_DETAIL: (id: number) => `/posts/${id}`,
  POST_CREATE: '/posts/new',
  POST_EDIT: (id: number) => `/posts/${id}/edit`,
  CHATS: '/chats',
  CHAT_ROOM: (roomId: number) => `/chats/${roomId}`,
  MYPAGE: '/mypage',
} as const;

export type RouteKey = keyof typeof ROUTES;
