# TurtleLove Frontend 시스템 설계

## 1. 기술 스택

| 구분 | 기술 | 버전 | 용도 |
|------|------|------|------|
| **Framework** | React.js | 18.x | UI 라이브러리 |
| **Language** | TypeScript | 5.x | 타입 안정성 |
| **Build Tool** | Vite | 5.x | 빠른 개발 서버 및 번들링 |
| **Styling** | Tailwind CSS | 3.x | 유틸리티 기반 스타일링 |
| **State** | Zustand | 4.x | 클라이언트 상태 관리 |
| **Server State** | TanStack Query | 5.x | 서버 상태 관리, 캐싱 |
| **Routing** | React Router | 6.x | SPA 라우팅 |
| **HTTP Client** | Axios | 1.x | API 통신 |
| **WebSocket** | STOMP.js | 2.x | 실시간 채팅 |
| **Form** | React Hook Form | 7.x | 폼 상태 관리 |
| **Validation** | Zod | 3.x | 스키마 기반 유효성 검사 |

---

## 2. 프로젝트 디렉토리 구조

```
src/
├── app/                        # 앱 초기화 및 프로바이더
│   ├── App.tsx                 # 메인 App 컴포넌트
│   ├── providers/              # Context Providers
│   │   ├── QueryProvider.tsx   # TanStack Query 설정
│   │   ├── AuthProvider.tsx    # 인증 상태 관리
│   │   └── index.tsx           # Provider 통합
│   └── router/                 # 라우터 설정
│       ├── routes.tsx          # 라우트 정의
│       ├── ProtectedRoute.tsx  # 인증 필요 라우트 가드
│       └── index.tsx
│
├── components/                 # 재사용 가능한 컴포넌트 (Atomic Design)
│   ├── atoms/                  # 기본 단위 (Button, Input, Badge 등)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Spinner/
│   │   └── index.ts
│   │
│   ├── molecules/              # 조합 단위 (FormField, Card, Toast 등)
│   │   ├── FormField/
│   │   ├── PostCard/
│   │   ├── CommentItem/
│   │   ├── ChatBubble/
│   │   ├── Toast/
│   │   └── index.ts
│   │
│   ├── organisms/              # 복합 컴포넌트 (Header, PostList 등)
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── PostList/
│   │   ├── CommentSection/
│   │   ├── ChatRoom/
│   │   └── index.ts
│   │
│   └── templates/              # 페이지 레이아웃
│       ├── MainLayout/
│       ├── AuthLayout/
│       └── index.ts
│
├── features/                   # 기능별 모듈
│   ├── auth/                   # 인증 관련
│   │   ├── api/                # API 함수
│   │   │   └── authApi.ts
│   │   ├── hooks/              # 커스텀 훅
│   │   │   ├── useLogin.ts
│   │   │   ├── useSignup.ts
│   │   │   └── useAuth.ts
│   │   ├── components/         # 기능 전용 컴포넌트
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── types/              # 타입 정의
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   │
│   ├── posts/                  # 게시글 관련
│   │   ├── api/
│   │   │   └── postsApi.ts
│   │   ├── hooks/
│   │   │   ├── usePosts.ts
│   │   │   ├── usePost.ts
│   │   │   └── useCreatePost.ts
│   │   ├── components/
│   │   │   ├── PostForm.tsx
│   │   │   └── PostDetail.tsx
│   │   ├── types/
│   │   │   └── posts.types.ts
│   │   └── index.ts
│   │
│   ├── comments/               # 댓글 관련
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── components/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── chat/                   # 채팅 관련
│       ├── api/
│       ├── hooks/
│       │   ├── useChatRooms.ts
│       │   └── useChatMessages.ts
│       ├── components/
│       │   ├── ChatList.tsx
│       │   └── ChatRoom.tsx
│       ├── services/           # WebSocket 서비스
│       │   └── chatSocket.ts
│       ├── types/
│       └── index.ts
│
├── pages/                      # 페이지 컴포넌트
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── PostListPage.tsx
│   ├── PostDetailPage.tsx
│   ├── PostCreatePage.tsx
│   ├── PostEditPage.tsx
│   ├── ChatListPage.tsx
│   ├── ChatRoomPage.tsx
│   ├── MyPage.tsx
│   └── NotFoundPage.tsx
│
├── shared/                     # 공유 유틸리티
│   ├── api/                    # API 설정
│   │   ├── client.ts           # Axios 인스턴스
│   │   └── interceptors.ts     # 요청/응답 인터셉터
│   ├── hooks/                  # 공용 훅
│   │   ├── useToast.ts
│   │   └── useModal.ts
│   ├── utils/                  # 유틸리티 함수
│   │   ├── storage.ts          # localStorage 래퍼
│   │   ├── date.ts             # 날짜 포맷팅
│   │   └── validation.ts       # 공통 유효성 검사
│   ├── constants/              # 상수
│   │   └── routes.ts
│   └── types/                  # 공통 타입
│       └── api.types.ts
│
├── stores/                     # Zustand 스토어
│   ├── authStore.ts            # 인증 상태
│   ├── uiStore.ts              # UI 상태 (모달, 토스트)
│   └── index.ts
│
├── styles/                     # 전역 스타일
│   ├── globals.css             # Tailwind 설정
│   └── fonts.css               # 폰트 설정
│
└── main.tsx                    # 앱 진입점
```

---

## 3. 컴포넌트 설계 (Atomic Design)

### 3.1 Atoms (원자)

가장 작은 단위의 UI 요소. 더 이상 분해할 수 없는 기본 컴포넌트.

| 컴포넌트 | 설명 | Props |
|---------|------|-------|
| `Button` | 버튼 | `variant`, `size`, `loading`, `disabled` |
| `Input` | 텍스트 입력 | `type`, `placeholder`, `error` |
| `Textarea` | 여러 줄 입력 | `rows`, `placeholder`, `error` |
| `Badge` | 상태 뱃지 | `variant`, `children` |
| `Avatar` | 사용자 아바타 | `src`, `fallback`, `size` |
| `Spinner` | 로딩 스피너 | `size` |
| `Skeleton` | 로딩 플레이스홀더 | `width`, `height` |

### 3.2 Molecules (분자)

Atoms를 조합한 그룹. 하나의 기능을 수행하는 단위.

| 컴포넌트 | 구성 | 설명 |
|---------|------|------|
| `FormField` | Input + Label + Error | 폼 필드 묶음 |
| `PostCard` | Avatar + Text + Badge | 게시글 카드 |
| `CommentItem` | Avatar + Content + Actions | 댓글 아이템 |
| `ChatBubble` | Avatar + Message + Time | 채팅 메시지 |
| `Toast` | Icon + Message | 알림 토스트 |

### 3.3 Organisms (유기체)

Molecules를 조합한 독립적인 UI 섹션.

| 컴포넌트 | 설명 |
|---------|------|
| `Header` | 네비게이션 헤더 |
| `Footer` | 푸터 |
| `PostList` | 게시글 목록 (무한스크롤) |
| `CommentSection` | 댓글 목록 + 입력폼 |
| `ChatRoom` | 채팅방 UI (메시지 목록 + 입력) |
| `LoginForm` | 로그인 폼 전체 |
| `SignupForm` | 회원가입 폼 (스텝 포함) |

### 3.4 Templates (템플릿)

페이지 레이아웃 구조.

| 템플릿 | 구성 | 사용처 |
|-------|------|-------|
| `MainLayout` | Header + Content + Footer | 메인 페이지들 |
| `AuthLayout` | 중앙 정렬 컨텐츠 | 로그인, 회원가입 |

---

## 4. 상태 관리 설계

### 4.1 Zustand Store 구조

```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

// stores/uiStore.ts
interface UIState {
  // Toast
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Modal
  activeModal: string | null;
  modalProps: Record<string, unknown>;
  openModal: (name: string, props?: Record<string, unknown>) => void;
  closeModal: () => void;
}
```

### 4.2 TanStack Query 활용

서버 상태는 TanStack Query로 관리:

```typescript
// Query Keys
const queryKeys = {
  posts: {
    all: ['posts'] as const,
    list: (filters: PostFilters) => ['posts', 'list', filters] as const,
    detail: (id: number) => ['posts', 'detail', id] as const,
  },
  comments: {
    byPost: (postId: number) => ['comments', 'post', postId] as const,
  },
  chat: {
    rooms: ['chat', 'rooms'] as const,
    messages: (roomId: number) => ['chat', 'messages', roomId] as const,
  },
  mypage: {
    posts: ['mypage', 'posts'] as const,
    comments: ['mypage', 'comments'] as const,
  },
};

// 캐시 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5분
      gcTime: 1000 * 60 * 30,    // 30분
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

---

## 5. API 레이어 설계

### 5.1 Axios 인스턴스 설정

```typescript
// shared/api/client.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 첨부
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 처리 및 토큰 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh Token으로 재시도 로직
    }
    return Promise.reject(error);
  }
);
```

### 5.2 API 함수 패턴

```typescript
// features/posts/api/postsApi.ts
export const postsApi = {
  getList: (params: PostListParams) =>
    apiClient.get<PostListResponse>('/posts', { params }),

  getDetail: (id: number) =>
    apiClient.get<PostDetailResponse>(`/posts/${id}`),

  create: (data: CreatePostRequest) =>
    apiClient.post<CreatePostResponse>('/posts', data),

  update: (id: number, data: UpdatePostRequest) =>
    apiClient.put<UpdatePostResponse>(`/posts/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`/posts/${id}`),
};
```

---

## 6. 라우팅 설계

### 6.1 라우트 정의

```typescript
// app/router/routes.tsx
export const routes = [
  // Public Routes
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },

  // Protected Routes (인증 필요)
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/posts', element: <PostListPage /> },
      { path: '/posts/new', element: <PostCreatePage /> },
      { path: '/posts/:id', element: <PostDetailPage /> },
      { path: '/posts/:id/edit', element: <PostEditPage /> },
      { path: '/chats', element: <ChatListPage /> },
      { path: '/chats/:roomId', element: <ChatRoomPage /> },
      { path: '/mypage', element: <MyPage /> },
    ],
  },

  // 404
  { path: '*', element: <NotFoundPage /> },
];
```

### 6.2 라우트 상수

```typescript
// shared/constants/routes.ts
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
```

---

## 7. WebSocket 설계 (채팅)

### 7.1 STOMP 클라이언트 서비스

```typescript
// features/chat/services/chatSocket.ts
class ChatSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client = new Client({
        brokerURL: import.meta.env.VITE_WS_URL,
        connectHeaders: { Authorization: `Bearer ${token}` },
        onConnect: () => resolve(),
        onStompError: (frame) => reject(frame),
      });
      this.client.activate();
    });
  }

  subscribeToRoom(roomId: number, callback: (message: ChatMessage) => void) {
    const destination = `/topic/chat/${roomId}`;
    const subscription = this.client?.subscribe(destination, (msg) => {
      callback(JSON.parse(msg.body));
    });
    if (subscription) {
      this.subscriptions.set(destination, subscription);
    }
  }

  sendMessage(roomId: number, content: string) {
    this.client?.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify({ content }),
    });
  }

  disconnect() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();
    this.client?.deactivate();
  }
}

export const chatSocket = new ChatSocketService();
```

---

## 8. 디자인 시스템

> 상세 디자인 가이드라인은 **[04-design-system.md](./04-design-system.md)** 참조

### 8.1 Design Philosophy: "Emotional & Safe"

TurtleLove는 대학생 익명 상담 커뮤니티로, **따뜻하고 안전한** 느낌을 전달하는 것이 핵심입니다.

- **Vibe**: Personal Diary, Medium 앱의 독서 경험
- **Avoid**: Tech/Cyber 미학, 네온, 날카로운 라인

### 8.2 Color Palette

| 역할 | 색상 | HEX |
|------|------|-----|
| 메인 배경 | Cream | `#FAF8F5` |
| 카드 배경 | Warm White | `#FFFEFB` |
| Primary | Muted Rose | `#E5B8B7` |
| Secondary | Sage Green | `#A8C5A8` |
| Text Primary | Warm Dark | `#3D3A36` |

### 8.3 Typography

| 용도 | 폰트 | 특징 |
|------|------|------|
| 헤더 | Pretendard / Inter | Sans-serif, 깔끔함 |
| 본문 | Lora / Noto Serif KR | Serif, 소설처럼 읽히는 느낌 |
| UI | Pretendard / Inter | Sans-serif |

### 8.4 Key Design Tokens

```css
/* Border Radius - 부드럽고 친근한 느낌 */
--radius-lg: 20px;      /* 카드 */
--radius-2xl: 32px;     /* FAB */

/* Shadows - 부드럽고 확산된 그림자 */
--shadow-soft: 0 4px 16px -4px rgba(61, 58, 54, 0.10);

/* Font Size - 편안한 읽기 (최소 16px) */
--text-base: 1rem;      /* 16px */
```

### 8.5 Unique Components

| 컴포넌트 | 설명 |
|---------|------|
| **Gradient Orb** | 프로필 사진 대신 사용자 "무드"를 나타내는 그라디언트 구 |
| **Warmth Meter** | 조회수 대신 게시글 "열기"를 보여주는 온도계 |
| **Chip Tags** | #Crush, #Breakup 등 감정 태그 |
| **FAB** | 그라디언트 배경의 글쓰기 버튼 |
