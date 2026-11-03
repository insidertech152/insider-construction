import React from 'react';
import { cn } from '@/src/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export function Card({
  className,
  bordered = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-card-bg rounded-sm shadow-card text-text-primary border-0 transition-all duration-200',
        bordered && 'border border-border/40',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  divider?: boolean;
}

export function CardHeader({
  title,
  subtitle,
  action,
  divider = true,
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        'px-6 py-5 flex flex-col gap-1',
        divider && 'border-b border-border/40',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          {title && <h3 className="font-semibold text-sm sm:text-[15px] text-text-primary">{title}</h3>}
          {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
      </div>
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 text-sm', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  divider = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { divider?: boolean }) {
  return (
    <div
      className={cn(
        'px-6 py-4 bg-page-bg/40 rounded-b-sm flex items-center justify-between gap-3 text-xs',
        divider && 'border-t border-border/40',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
