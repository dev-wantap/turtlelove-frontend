import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, type = 'text', ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium font-ui text-text-primary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : helperId}
          className={cn(
            'w-full',
            'px-4',
            'py-3',
            'rounded-sm',
            'bg-warm-white',
            'border',
            'border-warm-gray',
            'font-body',
            'text-base',
            'text-text-primary',
            'placeholder:text-text-muted',
            'transition-all',
            'duration-[var(--duration-fast)]',
            'ease-out',
            'focus:outline-none',
            'focus:border-rose',
            'focus:ring-2',
            'focus:ring-rose/20',
            'disabled:bg-soft-gray',
            'disabled:cursor-not-allowed',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm font-ui text-red-400" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-sm font-ui text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
