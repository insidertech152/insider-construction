import React, { useState } from 'react';
import {
  CheckCircle,
  WarningCircle,
  XCircle,
  Info,
  X,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { ButtonColor } from './button';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ButtonColor;
  variant?: 'soft' | 'solid' | 'outline';
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const defaultIcons: Record<ButtonColor, React.ReactNode> = {
  primary: <Info className="w-5 h-5 shrink-0" weight="fill" />,
  secondary: <Info className="w-5 h-5 shrink-0" weight="fill" />,
  success: <CheckCircle className="w-5 h-5 shrink-0" weight="fill" />,
  danger: <XCircle className="w-5 h-5 shrink-0" weight="fill" />,
  warning: <WarningCircle className="w-5 h-5 shrink-0" weight="fill" />,
  info: <Info className="w-5 h-5 shrink-0" weight="fill" />,
};

const variantStyles: Record<'soft' | 'solid' | 'outline', Record<ButtonColor, string>> = {
  soft: {
    primary: 'bg-primary-soft text-primary-900 border-s-4 border-primary-500',
    secondary: 'bg-secondary-soft text-secondary-900 border-s-4 border-secondary-500',
    success: 'bg-success-soft text-success-900 border-s-4 border-success-500',
    danger: 'bg-danger-soft text-danger-900 border-s-4 border-danger-500',
    warning: 'bg-warning-soft text-warning-900 border-s-4 border-warning-500',
    info: 'bg-info-soft text-info-900 border-s-4 border-info-500',
  },
  solid: {
    primary: 'bg-primary-500 text-text-inverse',
    secondary: 'bg-secondary-600 text-text-inverse',
    success: 'bg-success-600 text-text-inverse',
    danger: 'bg-danger-600 text-text-inverse',
    warning: 'bg-warning-500 text-text-inverse',
    info: 'bg-info-600 text-text-inverse',
  },
  outline: {
    primary: 'bg-card-bg border border-primary-300 text-primary-900',
    secondary: 'bg-card-bg border border-secondary-300 text-secondary-900',
    success: 'bg-card-bg border border-success-300 text-success-900',
    danger: 'bg-card-bg border border-danger-300 text-danger-900',
    warning: 'bg-card-bg border border-warning-300 text-warning-900',
    info: 'bg-card-bg border border-info-300 text-info-900',
  },
};

export function Alert({
  color = 'primary',
  variant = 'soft',
  title,
  icon,
  dismissible = false,
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const handleDismiss = () => {
    setIsOpen(false);
    onDismiss?.();
  };

  const currentIcon = icon !== undefined ? icon : defaultIcons[color];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start p-4 rounded-md text-sm gap-3 transition-opacity duration-200',
        variantStyles[variant][color],
        className
      )}
      {...props}
    >
      {currentIcon && <span className="shrink-0 mt-0.5">{currentIcon}</span>}
      <div className="flex-1 min-w-0">
        {title && <h5 className="font-bold text-sm mb-1 leading-snug">{title}</h5>}
        <div className="text-xs/relaxed opacity-95">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 ms-2 p-1 rounded hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current transition-colors cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
