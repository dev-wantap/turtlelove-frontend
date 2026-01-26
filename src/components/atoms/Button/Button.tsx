import { Slot } from '@radix-ui/react-slot';
import { forwardRef, useId, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  asChild?: boolean;
  /** 명시적인 ARIA 레이블 (아이콘만 있는 버튼용) */
  ariaLabel?: string;
  /** 추가 설명 텍스트 (sr-only로 렌더링되어 스크린 리더에만 제공) */
  ariaDescription?: string;
}

const variantStyles = {
  primary: [
    'bg-gradient-to-br from-rose to-rose-deep',
    'text-white',
    'shadow-rose',
    'hover:shadow-lg',
    'hover:-translate-y-0.5',
    'active:translate-y-0',
    'active:shadow-soft-md',
    'disabled:from-warm-gray',
    'disabled:to-warm-gray',
    'disabled:shadow-none',
    'disabled:translate-y-0',
  ],
  secondary: [
    'bg-sage',
    'text-white',
    'shadow-sage',
    'hover:bg-sage-deep',
    'hover:shadow-lg',
    'hover:-translate-y-0.5',
    'active:translate-y-0',
  ],
  ghost: [
    'bg-transparent',
    'text-text-primary',
    'hover:bg-soft-gray',
    'active:bg-warm-gray',
  ],
  danger: [
    'bg-red-400',
    'text-white',
    'shadow-soft-md',
    'hover:bg-red-500',
  ],
} as const;

const sizeStyles = {
  sm: ['px-4', 'py-2', 'text-sm', 'rounded-sm'],
  md: ['px-6', 'py-3', 'text-base', 'rounded-md'],
  lg: ['px-8', 'py-4', 'text-lg', 'rounded-lg'],
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      asChild = false,
      ariaLabel,
      ariaDescription,
      children,
      ...props
    },
    ref
  ) => {
    // ariaDescription을 위한 고유 ID 생성
    const descriptionId = useId();
    const ariaDescriptionId = ariaDescription ? descriptionId : undefined;

    // Slot(asChild)는 단 하나의 자식만 허용하므로 loading 스피너를 사용할 수 없음
    if (asChild && loading) {
      console.warn(
        'Button: "loading" prop cannot be used with "asChild". ' +
        'Loading spinner will be hidden, but disabled state remains.'
      );
    }

    // asChild일 때는 sr-only 요소를 추가할 수 없음
    if (asChild && ariaDescription) {
      console.warn(
        'Button: "ariaDescription" prop cannot be used with "asChild". ' +
        'Description will not be rendered.'
      );
    }

    const buttonClassName = cn(
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-ui',
      'font-medium',
      'transition-all',
      'duration-[var(--duration-normal)]',
      'ease-out',
      'disabled:cursor-not-allowed',
      'disabled:opacity-60',
      'touch-target',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // asChild일 때는 Slot을 사용하며 children만 전달 (단일 자식 요소만 허용)
    if (asChild) {
      const { type: _, ...restProps } = props;
      return (
        <Slot
          ref={ref}
          className={buttonClassName}
          {...restProps}
        >
          {children}
        </Slot>
      );
    }

    // 일반 버튼일 때는 loading spinner와 children을 함께 렌더링
    return (
      <button
        ref={ref}
        className={buttonClassName}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-label={ariaLabel || (loading ? '로딩 중' : undefined)}
        aria-describedby={ariaDescriptionId}
        {...props}
      >
        {ariaDescription && (
          <span id={descriptionId} className="sr-only">
            {ariaDescription}
          </span>
        )}
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
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
        {/* 로딩 상태일 때 스크린 리더용 텍스트 추가 */}
        {loading && <span className="sr-only">로딩 중...</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
