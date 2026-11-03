import React, { createContext, useContext, useState } from 'react';
import {
  CheckCircle,
  WarningCircle,
  XCircle,
  Info,
  X,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { ButtonColor } from './button';

export interface ToastItem {
  id: string;
  title: string;
  message?: React.ReactNode;
  description?: React.ReactNode;
  time?: string;
  color?: ButtonColor;
  variant?: ButtonColor;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastIcons: Record<ButtonColor, React.ReactNode> = {
  primary: <Info className="w-5 h-5 text-primary-500 shrink-0" weight="fill" />,
  secondary: <Info className="w-5 h-5 text-secondary-500 shrink-0" weight="fill" />,
  success: <CheckCircle className="w-5 h-5 text-success-600 shrink-0" weight="fill" />,
  danger: <XCircle className="w-5 h-5 text-danger-600 shrink-0" weight="fill" />,
  warning: <WarningCircle className="w-5 h-5 text-warning-500 shrink-0" weight="fill" />,
  info: <Info className="w-5 h-5 text-info-500 shrink-0" weight="fill" />,
};

export interface ToastProps {
  title: string;
  message?: React.ReactNode;
  description?: React.ReactNode;
  time?: string;
  color?: ButtonColor;
  variant?: ButtonColor;
  onClose?: () => void;
  className?: string;
}

export function Toast({
  title,
  message,
  description,
  time = 'منذ دقيقة',
  color,
  variant,
  onClose,
  className,
}: ToastProps) {
  const activeColor = variant || color || 'primary';
  const content = message || description;

  return (
    <div
      role="status"
      className={cn(
        'w-80 max-w-full bg-card-bg rounded-lg border border-border shadow-toast p-3.5 flex flex-col gap-1.5 transition-all duration-200',
        'border-s-4',
        activeColor === 'primary' && 'border-s-primary-500',
        activeColor === 'secondary' && 'border-s-secondary-500',
        activeColor === 'success' && 'border-s-success-500',
        activeColor === 'danger' && 'border-s-danger-500',
        activeColor === 'warning' && 'border-s-warning-500',
        activeColor === 'info' && 'border-s-info-500',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {toastIcons[activeColor]}
          <span className="font-semibold text-sm text-text-primary">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {time && <span className="text-[11px] text-text-muted font-numeric">{time}</span>}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-text-muted hover:text-text-primary p-0.5 rounded hover:bg-page-bg transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      {content && (
        <p className="text-xs text-text-secondary leading-relaxed ps-7">{content}</p>
      )}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToast = (item: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...item, id }]);
    const duration = item.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container pinned to bottom-end (RTL bottom-start / LTR bottom-end) */}
      <div
        aria-live="polite"
        className="fixed bottom-5 end-5 z-50 flex flex-col gap-2.5 max-w-[calc(100vw-2.5rem)] pointer-events-none"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              title={toast.title}
              message={toast.message}
              time={toast.time}
              color={toast.color}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
