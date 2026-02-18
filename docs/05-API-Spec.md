## 🌐 공통 사항

모든 요청 앞에 `/api` 를 붙여서 라우팅 구분

- **Base URL:** `https://your-domain.com/api`
- **Content-Type:** `application/json`
- **공통 에러 응답 형식:**JSON

```sql
{
  "code": "ERROR_CODE",
  "message": "에러 상세 메시지",
}
```

## 1. 인증 및 회원가입 (Auth)

### 1-1. 대학 이메일 인증 번호 요청

- **Endpoint:** `POST /auth/email/verify`
- **Description:** `ac.kr` 또는 `edu` 도메인 확인 후 OTP 메일 발송 (Redis 3분 저장)
- **Request:** JSON

```sql
{ "email": "student@university.ac.kr" }
```

- **Error Cases:**
    - `400`: 지원하지 않는 대학 도메인입니다.
    - `409`: 이미 가입된 이메일입니다.

### 1-2. 인증 번호 확인

- **Endpoint:** `POST /auth/email/confirm`
    
- **Request:**JSON
    
    `{ "email": "student@university.ac.kr", "code": "123456" }`
    
- **Error Cases:**
    
    - `400`: 인증 번호가 일치하지 않거나 만료되었습니다.

### 1-3. 회원가입

- **Endpoint:** `POST /auth/signup`
- **Request:**

```sql
{
  "email": "student@university.ac.kr",
  "password": "password123!",
  "nickname": "익명1",
  "university": "서울대학교",
  "gender": "MALE"
}
```

### 1-4. 로그인 (Login)

- **Endpoint:** `POST /auth/login`
- **Request:**

```sql
{
  "email": "student@university.ac.kr",
  "password": "hashed_password"
}
```

- Response:

```sql
{
  "accessToken": "ey...",
  "refreshToken": "ey..."
}
```

**Error Cases:**

- `401`: 이메일 또는 비밀번호가 일치하지 않습니다.

### 1-5. 액세스 토큰 갱신 (Refresh Token)

- **Endpoint:** `POST /auth/refresh`
- **Description:** Access Token이 만료되었을 때, Refresh Token을 보내 새 Access Token을 발급받습니다. (Redis 내 토큰 대조)
- **Request:** `{ "refreshToken": "ey..." }`
- **Response:** `{ "accessToken": "ey...", "refreshToken": "ey..." }`
- **Error Cases:**
    - `401`: Refresh Token이 만료되었거나 유효하지 않습니다. 다시 로그인해야 합니다.

### 1-6. 로그아웃 (Logout)

- **Endpoint:** `POST /auth/logout`
- **Description:** 서버 측 Redis에서 해당 유저의 Refresh Token을 삭제하여 즉시 무효화합니다.
- **Header:** `Authorization: Bearer {accessToken}`

### 1-7. 현재 사용자 정보 조회 (Get Current User)

- **Endpoint:** `GET /auth/me`
- **Description:** 현재 로그인한 사용자의 정보를 반환합니다. JWT 토큰으로 사용자를 식별합니다.
- **Header:** `Authorization: Bearer {accessToken}`

- Response (200 OK):

```sql
{
  "id": 1,
  "email": "student@snu.ac.kr",
  "nickname": "익명1",
  "university": "서울대학교",
  "gender": "MALE"
}
```

**Response Schema:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | Yes | 사용자 고유 ID |
| email | string | Yes | 이메일 주소 |
| nickname | string | Yes | 사용자 닉네임 |
| university | string | Yes | 소속 대학교 (이메일 도메인에서 자동 파싱) |
| gender | string \| null | Yes (may be null) | 성별 ("MALE" 또는 "FEMALE", null 가능) |

**Error Cases:**

- `401`: 인증 토큰이 유효하지 않거나 만료되었습니다.
- `404`: 사용자를 찾을 수 없습니다.

---

## 2. 게시글 및 댓글 (Community)

### 2-1. 게시글 목록 조회 (필터링 로직 포함)

- **Endpoint:** `GET /posts?category={id}&page=0&size=20`
- **Description:** 서버 내부에서 유저 정보를 확인하여 **같은 학교 숨기기 / 성별 제한** 로직이 적용된 결과만 반환합니다.
- **Response:**

```sql
{
  "content": [
    {
      "id": 10,
      "title": "고민 상담합니다"
      "created_at": "2026-01-12T14:00:00"
    }
  ]
}
```

### 2-2. 게시글 작성

- **Endpoint:** `POST /posts`
- **Request:**

```sql
{
  "title": "상담 요청글",
  "content": "본문 내용입니다.",
  "category_id": 1,
  "visibility_type": "HIDE_SAME_UNI", // ALL, HIDE_SAME_UNI
  "target_gender": "ALL" 
}
```

### 2-3. 게시글 수정

- **Endpoint:** `PUT /posts/{postId}`
- **Description:** 본인이 쓴 글만 수정 가능합니다.
- **Request:**

```sql
{
  "title": "수정된 제목",
  "content": "수정된 본문 내용",
  "visibility_type": "ALL",
  "target_gender": null
}
```

- **Error Cases:**
    - `403`: 본인의 게시글이 아닙니다.
    - `404`: 존재하지 않는 게시글입니다.

### 2-4. 게시글 삭제

- **Endpoint:** `DELETE /posts/{postId}`
- **Description:** 게시글을 삭제합니다. 관련 댓글도 모두 함께 삭제(Cascade) 처리됩니다.

### 2-5. 게시글 상세 조회 (Post Detail)

**Endpoint:** `GET /posts/{postId}`

**Description:** 게시글의 상세 내용과 해당 게시글에 달린 모든 댓글 리스트를 함께 반환합니다.

Response Body:

```sql
{
  "id": 10,
  "title": "익명 고민 상담입니다",
  "content": "상담 내용 본문...",
  "category": "연애",
  "is_mine": true,         // 내가 쓴 글인지 여부 (수정/삭제 버튼 노출용)
  "created_at": "2026-01-12T14:00:00",
  "comments": [
    {
      "id": 101,
      "user_id": 55,       // 채팅 시작 시 필요
      "content": "정말 힘드시겠어요.",
      "is_filtered": false, // AI 필터링 여부
      "is_mine": false,
      "created_at": "2026-01-12T14:10:00"
    },
    {
      "id": 102,
      "user_id": 60,
      "content": "부적절한 표현으로 가려진 댓글입니다.",
      "is_filtered": true,
      "is_mine": false,
      "created_at": "2026-01-12T14:15:00"
    }
  ]
}
```

### 2-5. 댓글 작성 (AI 필터링 적용)

- **Endpoint:** `POST /posts/{postId}/comments`
- **Description:** FastAPI AI 서버와 연동하여 비속어 감지 시 `is_filtered: true`로 저장됩니다.
- **Response:**

```sql
{
  "id": 101,
  "user_id": 55,
  "content": "정말 힘드시겠어요.",
  "is_filtered": false,
  "is_mine": true,
  "created_at": "2026-01-12T14:10:00"
}
```

### 2-6. 댓글 수정 (Update Comment)

**Endpoint:** `PUT /comments/{commentId}`

**Description:** 본인이 작성한 댓글의 내용을 수정합니다. 수정 시에도 **AI 필터링**이 다시 작동합니다.

**Request Body:**

```sql
{
  "content": "수정하려는 댓글 내용입니다."
}
```

**Response Body:**

```sql
{
  "id": 101,
  "content": "수정하려는 댓글 내용입니다.",
  "is_filtered": false,
  "updated_at": "2026-01-12T15:00:00"
}
```

### 2-7. 댓글 삭제 (Delete Comment)

**Endpoint:** `DELETE /comments/{commentId}`

**Description:** 본인이 작성한 댓글을 삭제합니다.

**Response Body:**

```sql
{
  "message": "댓글이 성공적으로 삭제되었습니다.",
  "commentId": 101
}
```

**Error Cases:**

- `403 Forbidden`: 본인이 작성한 댓글이 아닙니다.
- `404 Not Found`: 존재하지 않는 댓글입니다.

---

## 3. 1:1 채팅 (Chat)

### 3-1. 채팅방 생성 (상담 시작)

- **Endpoint:** `POST /chats/rooms`
- **Description:** **게시글 작성자만** 댓글 작성자에게 채팅을 시도할 수 있습니다.
- **Request:**

```sql
{
  "post_id": 10,
  "comment_id": 101,
  "receiver_id": 55 // 댓글 작성자 ID
}
```

**Error Cases:**

- `403`: 게시글 작성자만 채팅을 시작할 수 있습니다.

### 3-2. 채팅 메시지 내역 조회

- **Endpoint:** `GET /chats/rooms/{roomId}/messages?lastMessageId={id}&size=50`

### 3-3. 실시간 채팅 (아직 고민중)

### 3-4. 채팅방 나가기

- **Endpoint:** `DELETE /chats/rooms/{roomId}/leave`
- **Description:** 현재 사용자가 채팅방에서 나갑니다. 나간 사용자에게만 채팅방 목록에서 제외되며, 상대방에게는 계속 표시됩니다. 양쪽 모두 나가면 채팅방이 완전히 삭제됩니다.
- **Header:** `Authorization: Bearer {accessToken}`

**Response Body (200 OK):**

```sql
{
  "message": "채팅방에서 나갔습니다.",
  "room_id": 1
}
```

**Error Cases:**

- `403 Forbidden`: 채팅방 참여자가 아닙니다.
- `404 Not Found`: 존재하지 않는 채팅방입니다.

---

## **4. 마이페이지 (MyPage)** (페이징을 넣을지 말지 고민중)

### 4-1. 내가 쓴 글 조회

**Endpoint:** `GET /mypage/posts`

**Description:** 로그인한 사용자가 작성한 게시글 목록을 최신순으로 조회합니다. **Response Body:**

```sql
[
  {
    "id": 10,
    "title": "익명 고민 상담입니다",
    "category": "연애",
    "comment_count": 5,
    "created_at": "2026-01-12T14:00:00"
  },
  {
    "id": 8,
    "title": "취업 준비가 너무 힘드네요",
    "category": "취업",
    "comment_count": 12,
    "created_at": "2026-01-10T11:30:00"
  }
]
```

### 4-2. 내가 쓴 댓글 조회

**Endpoint:** `GET /mypage/comments`

**Description:** 내가 작성한 댓글 목록을 조회합니다. 프론트엔드에서 원문 게시글로 바로 이동할 수 있도록 게시글 정보(`post`)를 포함합니다. **Response Body:**

```sql
[
  {
    "id": 101,
    "content": "정말 공감되는 글이네요!",
    "created_at": "2026-01-12T15:00:00",
    "post": {
      "id": 15,
      "title": "학교 근처 맛집 추천해주세요",
      "category": "자유"
    }
  },
  {
    "id": 98,
    "content": "저도 같은 고민 중인데 혹시 쪽지 드려도 될까요?",
    "created_at": "2026-01-11T09:20:00",
    "post": {
      "id": 12,
      "title": "복학하고 친구 사귀기 어렵네요",
      "category": "친목"
    }
  }
]
```

### 4-3. 참여 중인 채팅방 목록 조회

**Endpoint:** `GET /chats/rooms`

**Description:** 내가 참여 중인 모든 활성화된 1:1 채팅방 리스트를 가져옵니다. 마지막 메시지를 포함합니다. **Response Body:**

```sql
[
  {
    "room_id": 1,
    "last_message": "네, 내일 뵙겠습니다!",
    "last_message_at": "2026-01-12T16:30:00",
    "unread_count": 2,            // 안 읽은 메시지 수
    "post_info": {                // 연결된 게시글 정보 (게시글 삭제 시 null)
      "id": 10,
      "title": "익명 고민 상담입니다"
    }
  },
  {
    "room_id": 2,
    "opponent_nickname": "익명1",
    "last_message": "사진을 보냈습니다.",
    "last_message_at": "2026-01-12T12:00:00",
    "unread_count": 0,
    "post_info": {
      "id": 5,
      "title": "전과 고민 들어주실 분"
    }
  }
]
```