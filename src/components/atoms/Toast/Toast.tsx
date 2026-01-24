import * as ToastPrimitive from '@radix-ui/react-toast';
import { type VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { type ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

const toastVariants = cva(
  [
    'flex',
    'items-start',
    'gap-3',
    'px-4',
    'py-3',
    'rounded-lg',
    'shadow-soft-md',
    'animate-in',
    'slide-in-from-right-full',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:animate-out',
    'data-[swipe=end]:slide-out-to-right-full',
  ],
  {
    variants: {
      variant: {
        success: ['bg-sage', 'text-white'],
        error: ['bg-red-400', 'text-white'],
        info: ['bg-sage-light', 'text-sage-dark'],
        warning: ['bg-honey/80', 'text-amber-900'],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface ToastProps
  extends VariantProps<typeof toastVariants>,
    Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, 'variant'> {
  title?: string;
  description?: string;
  onClose?: () => void;
}

export function Toast({
  variant = 'info',
  title,
  description,
  onClose,
  children,
  ...props
}: ToastProps) {
  return (
    <ToastPrimitive.Root
      className={cn(toastVariants({ variant }))}
      duration={4000}
      {...props}
    >
      <div className="flex-1">
        {title && (
          <ToastPrimitive.Title className="font-ui font-medium text-sm">
            {title}
          </ToastPrimitive.Title>
        )}
        {description && (
          <ToastPrimitive.Description className="font-ui text-sm opacity-90">
            {description}
          </ToastPrimitive.Description>
        )}
        {children}
      </div>
      {onClose && (
        <ToastPrimitive.Action
          altText="Close"
          className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
          asChild
          onClick={onClose}
        >
          <button type="button">
            <X className="h-4 w-4" />
          </button>
        </ToastPrimitive.Action>
      )}
    </ToastPrimitive.Root>
  );
}

// Toast Provider와 Viewport
export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={4000}>
      {children}
      <ToastPrimitive.Viewport
        className={cn(
          'fixed',
          'bottom-0',
          'right-0',
          'z-50',
          'flex',
          'flex-col',
          'gap-2',
          'p-4',
          'max-w-[420px]',
          'w-full',
          'pointer-events-none'
        )}
      />
    </ToastPrimitive.Provider>
  );
}
