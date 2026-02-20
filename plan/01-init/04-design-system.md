# AnonHeart Design System

## 1. Design Philosophy

### 1.1 Core Aesthetic: "Emotional & Safe"

AnonHeart는 대학생들이 연애 고민을 익명으로 나누는 공간입니다. 디자인은 **따뜻하고, 부드럽고, 안전한** 느낌을 전달해야 합니다.

**Vibe Keywords:**
- Personal Diary (개인 일기장)
- Medium의 독서 경험
- 따뜻한 카페에서 친구와 대화하는 느낌

**Avoid:**
- Tech/Cyber 미학 (네온, 다크 테마, 날카로운 라인)
- 차갑고 기업적인 느낌
- 과도한 시각적 자극

---

## 2. Color Palette

### 2.1 Primary Colors

```css
:root {
  /* Warm Neutrals - 기본 배경과 텍스트 */
  --color-cream: #FAF8F5;           /* 메인 배경 */
  --color-warm-white: #FFFEFB;      /* 카드 배경 */
  --color-soft-gray: #F5F3F0;       /* 섹션 구분 */
  --color-warm-gray: #E8E4DF;       /* 보더, 디바이더 */
  --color-text-primary: #3D3A36;    /* 주요 텍스트 */
  --color-text-secondary: #6B6560;  /* 보조 텍스트 */
  --color-text-muted: #9A9590;      /* 비활성 텍스트 */

  /* Muted Rose - 감정, 따뜻함 */
  --color-rose-light: #F7E8E7;      /* 로즈 배경 */
  --color-rose: #E5B8B7;            /* 메인 로즈 */
  --color-rose-deep: #D4A3A2;       /* 로즈 호버 */
  --color-rose-dark: #B88A89;       /* 로즈 액티브 */

  /* Sage Green - 안정감, 치유 */
  --color-sage-light: #EDF2ED;      /* 세이지 배경 */
  --color-sage: #A8C5A8;            /* 메인 세이지 */
  --color-sage-deep: #8FB38F;       /* 세이지 호버 */
  --color-sage-dark: #6B9A6B;       /* 세이지 액티브 */

  /* Accent Colors - 태그 및 상태 */
  --color-lavender: #C5B8D9;        /* #고민 태그 */
  --color-peach: #F5D0C5;           /* #설렘 태그 */
  --color-sky: #B8D4E3;             /* #조언 태그 */
  --color-honey: #E8D5A8;           /* #이별 태그 */
}
```

### 2.2 Gradient Orbs (익명 아바타)

프로필 사진 대신 사용자의 "무드"를 나타내는 그라디언트 오브를 사용합니다.

```css
/* Gradient Orb Presets */
.orb-sunset {
  background: linear-gradient(135deg, #E5B8B7 0%, #F5D0C5 50%, #E8D5A8 100%);
}
.orb-ocean {
  background: linear-gradient(135deg, #B8D4E3 0%, #A8C5A8 50%, #C5B8D9 100%);
}
.orb-blossom {
  background: linear-gradient(135deg, #F5D0C5 0%, #E5B8B7 50%, #C5B8D9 100%);
}
.orb-forest {
  background: linear-gradient(135deg, #A8C5A8 0%, #8FB38F 50%, #B8D4E3 100%);
}
.orb-dawn {
  background: linear-gradient(135deg, #E8D5A8 0%, #F5D0C5 50%, #E5B8B7 100%);
}
.orb-twilight {
  background: linear-gradient(135deg, #C5B8D9 0%, #E5B8B7 50%, #B8D4E3 100%);
}
```

---

## 3. Typography

### 3.1 Font Stack

```css
:root {
  /* Headers - Clean Sans-serif */
  --font-heading: 'Pretendard', 'Inter', -apple-system, sans-serif;

  /* Body - Elegant Serif (스토리텔링 느낌) */
  --font-body: 'Lora', 'Noto Serif KR', Georgia, serif;

  /* UI Elements - Clean Sans */
  --font-ui: 'Pretendard', 'Inter', sans-serif;
}
```

### 3.2 Type Scale

```css
:root {
  /* Mobile-first 기준 */
  --text-xs: 0.75rem;     /* 12px - 캡션 */
  --text-sm: 0.875rem;    /* 14px - 보조 텍스트 */
  --text-base: 1rem;      /* 16px - 본문 (최소 기준) */
  --text-lg: 1.125rem;    /* 18px - 강조 본문 */
  --text-xl: 1.25rem;     /* 20px - 소제목 */
  --text-2xl: 1.5rem;     /* 24px - 제목 */
  --text-3xl: 1.875rem;   /* 30px - 대제목 */
  --text-4xl: 2.25rem;    /* 36px - 히어로 */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;  /* 본문 읽기용 */
}
```

### 3.3 Typography Styles

```css
/* 제목 - Sans-serif, 깔끔하게 */
.heading-1 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

/* 본문 - Serif, 소설처럼 */
.body-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
}

/* UI 요소 - Sans-serif */
.ui-text {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.01em;
}
```

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

### 4.2 Border Radius

모든 요소에 부드러운 라운딩을 적용하여 친근한 느낌을 줍니다.

```css
:root {
  --radius-sm: 12px;    /* 작은 요소 (버튼, 인풋) */
  --radius-md: 16px;    /* 중간 요소 (칩, 배지) */
  --radius-lg: 20px;    /* 큰 요소 (카드) */
  --radius-xl: 24px;    /* 매우 큰 요소 (모달) */
  --radius-2xl: 32px;   /* 특별한 요소 (FAB) */
  --radius-full: 9999px; /* 완전 둥근 (아바타, 태그) */
}
```

### 4.3 Shadows

부드럽고 확산된 그림자로 깊이감을 표현합니다.

```css
:root {
  /* Soft, diffused shadows */
  --shadow-sm: 0 2px 8px -2px rgba(61, 58, 54, 0.08);
  --shadow-md: 0 4px 16px -4px rgba(61, 58, 54, 0.10);
  --shadow-lg: 0 8px 32px -8px rgba(61, 58, 54, 0.12);
  --shadow-xl: 0 16px 48px -12px rgba(61, 58, 54, 0.15);

  /* Colored glow for interactive elements */
  --shadow-rose: 0 8px 24px -8px rgba(229, 184, 183, 0.4);
  --shadow-sage: 0 8px 24px -8px rgba(168, 197, 168, 0.4);
}
```

---

## 5. Components

### 5.1 Post Card

```tsx
interface PostCardProps {
  id: number;
  title: string;
  preview: string;
  tags: string[];
  authorOrb: 'sunset' | 'ocean' | 'blossom' | 'forest' | 'dawn' | 'twilight';
  warmthLevel: number; // 0-100
  createdAt: string;
}
```

**스타일 특징:**
- `border-radius: 20px`
- 부드러운 그림자 (`shadow-md`)
- 호버 시 살짝 떠오르는 효과
- 본문 텍스트는 Serif 폰트

### 5.2 Chip Tags

카테고리/감정 태그를 표시하는 칩 컴포넌트.

```css
.chip {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
}

.chip-crush { background: var(--color-rose-light); color: var(--color-rose-dark); }
.chip-breakup { background: var(--color-lavender); color: #7B6B9A; }
.chip-dating { background: var(--color-peach); color: #B8846B; }
.chip-advice { background: var(--color-sage-light); color: var(--color-sage-dark); }
```

### 5.3 Gradient Orb Avatar

익명 사용자 아이덴티티를 위한 그라디언트 오브.

```css
.orb {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.orb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent);
}
```

### 5.4 Warmth Meter

조회수 대신 게시글의 "열기"를 보여주는 온도계.

```tsx
interface WarmthMeterProps {
  level: number; // 0-100
  size?: 'sm' | 'md';
}
```

```css
.warmth-meter {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.warmth-bar {
  width: 60px;
  height: 6px;
  background: var(--color-warm-gray);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.warmth-fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--color-sage) 0%, var(--color-rose) 50%, #E8A08F 100%);
  transition: width 0.3s ease;
}
```

### 5.5 Floating Action Button (FAB)

글쓰기 버튼. 그라디언트 배경과 부드러운 그림자.

```css
.fab {
  position: fixed;
  bottom: calc(var(--space-8) + env(safe-area-inset-bottom));
  right: var(--space-6);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-2xl);
  background: linear-gradient(135deg, var(--color-rose) 0%, var(--color-rose-deep) 100%);
  box-shadow: var(--shadow-rose);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.fab:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 32px -8px rgba(229, 184, 183, 0.5);
}

.fab:active {
  transform: translateY(0) scale(0.98);
}
```

---

## 6. Motion & Interactions

### 6.1 Animation Tokens

```css
:root {
  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;

  /* Easings */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 6.2 Page Transitions

페이지 진입 시 콘텐츠가 부드럽게 나타납니다.

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeInUp var(--duration-slow) var(--ease-out) forwards;
}
```

### 6.3 Card Interactions

```css
.post-card {
  transition:
    transform var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.post-card:active {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

---

## 7. Mobile-First Breakpoints

```css
:root {
  /* Mobile First - 320px 기준 */
  --breakpoint-sm: 375px;   /* Small Mobile */
  --breakpoint-md: 768px;   /* Tablet */
  --breakpoint-lg: 1024px;  /* Desktop */
  --breakpoint-xl: 1280px;  /* Large Desktop */
}
```

### 7.1 Layout Grid

```css
.container {
  width: 100%;
  max-width: 640px;       /* 모바일 콘텐츠 최대 너비 */
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
    padding: 0 var(--space-6);
  }
}
```

---

## 8. Accessibility

### 8.1 Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-rose);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### 8.2 Color Contrast

모든 텍스트는 WCAG 2.1 AA 기준(4.5:1)을 충족합니다:
- `--color-text-primary` (#3D3A36) on `--color-cream` (#FAF8F5): 7.2:1
- `--color-text-secondary` (#6B6560) on `--color-warm-white` (#FFFEFB): 5.1:1

### 8.3 Touch Targets

모바일에서 최소 터치 영역 44px 보장.

```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

---

## 9. Tailwind CSS Configuration

```js
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        'warm-white': '#FFFEFB',
        'soft-gray': '#F5F3F0',
        'warm-gray': '#E8E4DF',
        rose: {
          light: '#F7E8E7',
          DEFAULT: '#E5B8B7',
          deep: '#D4A3A2',
          dark: '#B88A89',
        },
        sage: {
          light: '#EDF2ED',
          DEFAULT: '#A8C5A8',
          deep: '#8FB38F',
          dark: '#6B9A6B',
        },
        lavender: '#C5B8D9',
        peach: '#F5D0C5',
        sky: '#B8D4E3',
        honey: '#E8D5A8',
      },
      fontFamily: {
        heading: ['Pretendard', 'Inter', 'sans-serif'],
        body: ['Lora', 'Noto Serif KR', 'Georgia', 'serif'],
        ui: ['Pretendard', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(61, 58, 54, 0.08)',
        'soft-md': '0 4px 16px -4px rgba(61, 58, 54, 0.10)',
        'soft-lg': '0 8px 32px -8px rgba(61, 58, 54, 0.12)',
        'soft-xl': '0 16px 48px -12px rgba(61, 58, 54, 0.15)',
        'rose': '0 8px 24px -8px rgba(229, 184, 183, 0.4)',
        'sage': '0 8px 24px -8px rgba(168, 197, 168, 0.4)',
      },
    },
  },
  plugins: [],
};
```

---

## 10. Implementation Checklist

### Phase 1: 기본 설정
- [ ] Google Fonts 연결 (Pretendard, Lora, Noto Serif KR)
- [ ] CSS 변수 설정
- [ ] Tailwind 커스텀 테마 적용

### Phase 2: Atoms
- [ ] Button (primary, secondary, ghost)
- [ ] Input, Textarea
- [ ] Chip (태그)
- [ ] GradientOrb (아바타)
- [ ] WarmthMeter

### Phase 3: Molecules
- [ ] PostCard
- [ ] CommentItem
- [ ] FormField

### Phase 4: Organisms
- [ ] Header (with gradient orb)
- [ ] PostList (카드 그리드)
- [ ] FAB (글쓰기)
