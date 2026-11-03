import React from 'react';
import { cn } from '@/src/lib/utils';
import { Files } from '@phosphor-icons/react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center bg-card-bg rounded-lg border border-dashed border-border',
        className
      )}
      {...props}
    >
      <div className="w-12 h-12 rounded-full bg-primary-soft text-primary-600 flex items-center justify-center mb-4">
        {icon || <Files className="w-6 h-6" weight="duotone" />}
      </div>
      <h4 className="text-base font-semibold text-text-primary mb-1.5">{title}</h4>
      {description && (
        <p className="text-xs text-text-muted max-w-sm leading-relaxed mb-5">
          {description}
        </p>
      )}
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
