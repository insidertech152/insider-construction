import React from 'react';
import { cn } from '@/src/lib/utils';
import { Breadcrumb, BreadcrumbItem } from './breadcrumb';

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6',
        className
      )}
      {...props}
    >
      <div className="min-w-0">
        <h1 className="text-xl font-medium text-text-primary tracking-tight">
          {title}
        </h1>

        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mt-1">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}

        {subtitle && (
          <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
