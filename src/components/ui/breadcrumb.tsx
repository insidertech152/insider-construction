import React from 'react';
import { CaretRight } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumb({
  items,
  separator,
  className,
  ...props
}: BreadcrumbProps) {
  const defaultSeparator = (
    <CaretRight
      className="w-3 h-3 text-text-muted shrink-0 transition-transform duration-150 rtl:rotate-180"
      weight="bold"
      aria-hidden="true"
    />
  );

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)} {...props}>
      <ol className="flex items-center gap-1.5 text-xs text-text-muted flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li key={index} className="flex items-center gap-1.5 text-xs">
              {index > 0 && <span className="flex items-center">{separator || defaultSeparator}</span>}
              {isLast ? (
                <span
                  className="font-normal text-text-muted/75"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="text-text-secondary hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-text-secondary">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
