# 1. 기술 스택

|구분|기술|버전/상세|비고|
|---|---|---|---|
|**Frontend**|React.js (또는 Vue)|TypeScript|SPA (Single Page Application)|
|**Backend**|**Java Spring Boot**|3.x|메인 API, WebSocket 서버|
|**AI Backend**|**Python FastAPI**|최신 버전|댓글 비속어 필터링 (내부 전용)|
|**Database**|**MySQL**|8.x+|회원, 게시글, 채팅 기록 저장|
|**Cache**|**Redis**|7.x+|OTP(인증), Refresh Token 저장|
|**Web Server**|Nginx|최신 버전|리버스 프록스, 정적 파일 서빙|
|**Container**|Docker Compose|2.x+|VPS 내 컨테이너 배포/관리|

# 2. 아키텍처

```
[ Internet ]
      |
      v
+---------------------------------------------------+
| Nginx (Container)                                 |
| - 80/443 (외부 노출)                              |
| - /api/* -> Spring Boot                           |
| - /ws/* -> Spring Boot (WebSocket)                |
| - /      -> Frontend (SPA)                        |
+---------------------------------------------------+
      |
      v (Docker Internal Network)
+---------------------------------------------------+
| Spring Boot (App Server)                          |
| - Port: 8080 (내부/외부 연결)                     |
|   1. Auth API (Login/Signup - JWT)                |
|   2. Post/Comment API (CRUD + Scope Logic)        |
|   3. Chat API (WebSocket/STOMP + Simple Broker)  |
|   4. AI Client (FastAPI 호출)                     |
+---------------------------------------------------+
      |                       |              |
      |(MySQL)                |(Redis)       |(HTTP Internal)
      v                       v              v
+------------+         +------------+  +-------------+
| MySQL      |         | Redis      |  | FastAPI      |
| - Users    |         | - OTP      |  | - AI Filter  |
| - Posts    |         | - Token    |  | (No External)|
| - Chats    |         | - Cache    |  +-------------+
+------------+         +------------+

```

# 3. 주요 컴포넌트 역할

## 3-1. Spring Boot (메인 서버)

- **인증:** Spring Security + JWT를 사용하여 API 보안 처리.
- **이메일 인증:** SMTP(Gmail 등)를 통해 / Resend 등 API를 통해 이메일 발송, Redis에 OTP 저장 및 검증 로직 처리.
- **공개 범위 필터링:** 게시글 조회 시 요청자의 대학/성별을 기반으로 쿼리를 동적으로 생성하여 노출 제어.
- **채팅:** **Spring WebSocket + STOMP + Simple Broker(In-Memory)**를 사용하여 1:1 채팅 처리. Redis를 채팅 브로커로 사용하지 않음 (단일 서버 최적화).
- **AI 연동:** 댓글 작성 시 내용을 FastAPI 컨테이너로 전송하여 부적절 여부 판단 후 저장.

## 3-2. FastAPI (AI 서버)

- **역할:** 비속어 및 혐오 표현 감지 AI 모델 실행.
- **특징:** **외부 포트 미노출** (`expose: 8000` 내부만). Spring Boot(`app` 컨테이너)에서만 `http://fastapi:8000`으로 접근 가능.
- **인터페이스:** `POST /predict` (텍스트 입력 -> `is_toxic`: boolean 반환).

## 3-3. Redis

- **OTP 관리:** 이메일 인증 번호 저장 (Key: `email_auth:{email}`, TTL: 3분).
- **토큰 관리:** Refresh Token 저장소 및 블랙리스트 처리.
- **캐싱:** 추후 성능 최적화를 위한 게시글 캐싱 사용 가능.