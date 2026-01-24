```sql
-- 1. 사용자 테이블 (Users)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,       -- 대학 이메일
    password VARCHAR(255) NOT NULL,           -- 암호화된 비밀번호
    nickname VARCHAR(50) NOT NULL,            -- 익명 닉네임
    university VARCHAR(50) NOT NULL,          -- 학교 명칭 (예: 서울대학교)
    gender ENUM('MALE', 'FEMALE'),            -- MySQL에서는 ENUM이 효율적입니다
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. 게시글 카테고리 (Categories)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. 게시글 테이블 (Posts)
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    -- 공개 범위 설정
    visibility_type ENUM('ALL', 'HIDE_SAME_UNI') DEFAULT 'ALL',
    target_gender ENUM('MALE', 'FEMALE', 'ALL') DEFAULT 'ALL', 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- 외래키 설정
    CONSTRAINT fk_post_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_post_category FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. 댓글 테이블 (Comments)
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_filtered BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. 1:1 채팅방 테이블 (ChatRooms)
CREATE TABLE chat_rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    comment_id BIGINT NOT NULL,
    initiator_id BIGINT NOT NULL, -- 글쓴이
    receiver_id BIGINT NOT NULL,  -- 댓글 작성자
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- 복합 유니크 제약 조건: 동일한 맥락에서 중복 채팅방 생성 방지
    UNIQUE KEY uk_chat_context (post_id, comment_id, initiator_id),
    CONSTRAINT fk_room_post FOREIGN KEY (post_id) REFERENCES posts(id),
    CONSTRAINT fk_room_comment FOREIGN KEY (comment_id) REFERENCES comments(id),
    CONSTRAINT fk_room_initiator FOREIGN KEY (initiator_id) REFERENCES users(id),
    CONSTRAINT fk_room_receiver FOREIGN KEY (receiver_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. 채팅 메시지 테이블 (ChatMessages) - 클러스터링 최적화
CREATE TABLE chat_messages (
    room_id BIGINT NOT NULL,
    id BIGINT NOT NULL AUTO_INCREMENT, -- 전체 메시지 순서
    sender_id BIGINT NOT NULL,
    message_type ENUM('TEXT', 'IMAGE', 'VOICE') DEFAULT 'TEXT',
    content TEXT,                    -- 일반 텍스트
    file_url VARCHAR(512),           -- 이미지/음성 파일 경로
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- room_id를 앞에 둔 복합 PK로 클러스터링 유도
    PRIMARY KEY (room_id, id),
   
    -- (InnoDB의 특수한 제약 조건을 해결하기 위해 id 단독 인덱스 추가)
    KEY (id), 
    
    CONSTRAINT fk_msg_room FOREIGN KEY (room_id) REFERENCES chat_rooms (id) ON DELETE CASCADE,
    CONSTRAINT fk_msg_sender FOREIGN KEY (sender_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```