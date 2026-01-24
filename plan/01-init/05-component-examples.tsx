/**
 * TurtleLove Component Examples
 *
 * 이 파일은 디자인 시스템 구현 참고용 예시 코드입니다.
 * 실제 구현 시 이 패턴을 참고하세요.
 */

import { type ReactNode, type ComponentProps, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

// ============================================================
// 1. GRADIENT ORB - 익명 아바타
// ============================================================

const orbVariants = cva(
  'relative rounded-full overflow-hidden shadow-soft-sm',
  {
    variants: {
      size: {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
      },
      mood: {
        sunset: 'bg-gradient-to-br from-rose to-peach to-honey',
        ocean: 'bg-gradient-to-br from-sky to-sage to-lavender',
        blossom: 'bg-gradient-to-br from-peach to-rose to-lavender',
        forest: 'bg-gradient-to-br from-sage to-sage-deep to-sky',
        dawn: 'bg-gradient-to-br from-honey to-peach to-rose',
        twilight: 'bg-gradient-to-br from-lavender to-rose to-sky',
      },
    },
    defaultVariants: {
      size: 'md',
      mood: 'sunset',
    },
  }
);

interface GradientOrbProps extends VariantProps<typeof orbVariants> {
  className?: string;
}

export function GradientOrb({ size, mood, className }: GradientOrbProps) {
  return (
    <div className={cn(orbVariants({ size, mood }), className)}>
      {/* Highlight overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent)]" />
    </div>
  );
}

// ============================================================
// 2. CHIP - 태그
// ============================================================

const chipVariants = cva(
  'inline-flex items-center px-4 py-2 rounded-full font-ui text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        crush: 'bg-rose-light text-rose-dark hover:bg-rose/20',
        breakup: 'bg-lavender/30 text-[#7B6B9A] hover:bg-lavender/40',
        dating: 'bg-peach/40 text-[#B8846B] hover:bg-peach/50',
        advice: 'bg-sage-light text-sage-dark hover:bg-sage/20',
        default: 'bg-soft-gray text-text-secondary hover:bg-warm-gray',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ChipProps extends VariantProps<typeof chipVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Chip({ variant, children, className, onClick }: ChipProps) {
  return (
    <span
      className={cn(chipVariants({ variant }), className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </span>
  );
}

// ============================================================
// 3. WARMTH METER - 온도계
// ============================================================

interface WarmthMeterProps {
  level: number; // 0-100
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export function WarmthMeter({
  level,
  size = 'md',
  showLabel = true,
  className
}: WarmthMeterProps) {
  const clampedLevel = Math.min(100, Math.max(0, level));

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Temperature icon */}
      <svg
        className={cn(
          'text-rose-deep',
          size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
        )}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C10.34 2 9 3.34 9 5v8.59c-1.22.73-2 2.07-2 3.57 0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.5-.78-2.84-2-3.57V5c0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1v9.59l.5.29c.79.47 1.5 1.27 1.5 2.28 0 1.1-.9 2-2 2s-2-.9-2-2c0-1.01.71-1.81 1.5-2.28l.5-.29V5c0-.55.45-1 1-1z"/>
      </svg>

      {/* Bar */}
      <div
        className={cn(
          'bg-warm-gray rounded-full overflow-hidden',
          size === 'sm' ? 'w-12 h-1.5' : 'w-16 h-2'
        )}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-sage via-rose to-[#E8A08F] transition-all duration-300"
          style={{ width: `${clampedLevel}%` }}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <span className={cn(
          'font-ui text-text-muted',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}>
          {clampedLevel}°
        </span>
      )}
    </div>
  );
}

// ============================================================
// 4. POST CARD - 게시글 카드
// ============================================================

interface PostCardProps {
  id: number;
  title: string;
  preview: string;
  tags: Array<{ label: string; variant: 'crush' | 'breakup' | 'dating' | 'advice' }>;
  authorMood: 'sunset' | 'ocean' | 'blossom' | 'forest' | 'dawn' | 'twilight';
  warmthLevel: number;
  createdAt: string;
  onClick?: () => void;
}

export function PostCard({
  title,
  preview,
  tags,
  authorMood,
  warmthLevel,
  createdAt,
  onClick,
}: PostCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        'bg-warm-white rounded-lg p-6 cursor-pointer',
        'shadow-soft-md hover:shadow-soft-lg',
        'transform transition-all duration-250 ease-out',
        'hover:-translate-y-1 active:-translate-y-0.5',
        'border border-warm-gray/50'
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <GradientOrb mood={authorMood} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-xl font-semibold text-text-primary leading-tight mb-1 line-clamp-2">
            {title}
          </h3>
          <time className="font-ui text-sm text-text-muted">
            {createdAt}
          </time>
        </div>
      </div>

      {/* Preview */}
      <p className="font-body text-base text-text-secondary leading-relaxed line-clamp-3 mb-4">
        {preview}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Chip key={index} variant={tag.variant}>
              #{tag.label}
            </Chip>
          ))}
        </div>

        {/* Warmth */}
        <WarmthMeter level={warmthLevel} size="sm" showLabel={false} />
      </div>
    </article>
  );
}

// ============================================================
// 5. BUTTON - 버튼
// ============================================================

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-ui font-medium transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-rose text-white',
          'hover:bg-rose-deep active:bg-rose-dark',
          'shadow-rose hover:shadow-lg',
        ],
        secondary: [
          'bg-sage text-white',
          'hover:bg-sage-deep active:bg-sage-dark',
          'shadow-sage hover:shadow-lg',
        ],
        ghost: [
          'bg-transparent text-text-primary',
          'hover:bg-soft-gray active:bg-warm-gray',
        ],
        outline: [
          'bg-transparent border-2 border-rose text-rose',
          'hover:bg-rose-light active:bg-rose/20',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-sm',
        md: 'h-11 px-6 text-base rounded-md',
        lg: 'h-14 px-8 text-lg rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================
// 6. FAB - Floating Action Button
// ============================================================

interface FABProps {
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}

export function FAB({ onClick, icon, className }: FABProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed z-50',
        'bottom-8 right-6',
        'w-14 h-14 rounded-2xl',
        'bg-gradient-to-br from-rose to-rose-deep',
        'text-white shadow-rose',
        'flex items-center justify-center',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:shadow-xl',
        'active:translate-y-0 active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2',
        // Safe area for mobile
        'pb-[env(safe-area-inset-bottom)]',
        className
      )}
      aria-label="새 글 작성"
    >
      {icon || (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  );
}

// ============================================================
// 7. INPUT - 텍스트 입력
// ============================================================

interface InputProps extends ComponentProps<'input'> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block font-ui text-sm font-medium text-text-primary mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full h-12 px-4',
            'bg-warm-white border border-warm-gray rounded-sm',
            'font-body text-base text-text-primary',
            'placeholder:text-text-muted',
            'transition-all duration-200',
            'hover:border-rose/50',
            'focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 font-ui text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ============================================================
// 8. TEXTAREA - 여러 줄 입력
// ============================================================

interface TextareaProps extends ComponentProps<'textarea'> {
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block font-ui text-sm font-medium text-text-primary mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={cn(
            'w-full px-4 py-3',
            'bg-warm-white border border-warm-gray rounded-lg',
            'font-body text-base text-text-primary leading-relaxed',
            'placeholder:text-text-muted',
            'transition-all duration-200',
            'hover:border-rose/50',
            'focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20',
            'resize-none',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 font-ui text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ============================================================
// USAGE EXAMPLES
// ============================================================

/**
 * 사용 예시:
 *
 * ```tsx
 * // Gradient Orb
 * <GradientOrb mood="sunset" size="lg" />
 *
 * // Chips
 * <Chip variant="crush">#짝사랑</Chip>
 * <Chip variant="breakup">#이별</Chip>
 *
 * // Warmth Meter
 * <WarmthMeter level={75} />
 *
 * // Post Card
 * <PostCard
 *   id={1}
 *   title="첫사랑이 잊히지 않아요"
 *   preview="3년 전 헤어진 첫사랑이 아직도 생각나요. 어떻게 해야 할까요..."
 *   tags={[{ label: '짝사랑', variant: 'crush' }]}
 *   authorMood="twilight"
 *   warmthLevel={82}
 *   createdAt="2시간 전"
 *   onClick={() => navigate(`/posts/1`)}
 * />
 *
 * // FAB
 * <FAB onClick={() => navigate('/posts/new')} />
 *
 * // Button
 * <Button variant="primary">등록하기</Button>
 * <Button variant="ghost" size="sm">취소</Button>
 *
 * // Input
 * <Input
 *   label="이메일"
 *   placeholder="university@ac.kr"
 *   error={errors.email?.message}
 * />
 *
 * // Textarea
 * <Textarea
 *   label="내용"
 *   placeholder="고민을 자유롭게 적어주세요..."
 *   rows={6}
 * />
 * ```
 */
