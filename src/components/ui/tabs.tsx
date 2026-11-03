import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/src/lib/utils';
import { Badge } from './badge';
import { BidiNumber } from '@/src/lib/bidi';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  count?: number | string;
  disabled?: boolean;
}

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  items: TabItem[];
  variant?: 'line' | 'pills' | 'segmented';
  orientation?: 'horizontal' | 'vertical';
  showEdgeFade?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  items,
  variant = 'line',
  orientation = 'horizontal',
  showEdgeFade = true,
  className,
  children,
}: TabsProps) {
  const isPills = variant === 'pills';
  const isSegmented = variant === 'segmented';
  const isVertical = orientation === 'vertical';

  return (
    <TabsPrimitive.Root
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={cn('w-full', isVertical && 'flex gap-6', className)}
    >
      {/* Scrollable container with edge fade overlay so users see more items exist on mobile and small viewports */}
      <div className={cn('relative w-full', !isVertical && 'overflow-hidden')}>
        {!isVertical && showEdgeFade && (
          <div
            className="pointer-events-none absolute end-0 top-0 bottom-0 w-8 sm:w-12 z-10 ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-card-bg to-transparent"
            aria-hidden="true"
          />
        )}

        <TabsPrimitive.List
          className={cn(
            'flex items-center text-sm select-none',
            isVertical && 'flex-col items-stretch border-e border-border pe-4 min-w-[200px]',
            !isVertical && 'max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5 pe-6',
            !isVertical && variant === 'line' && 'border-b border-border gap-6 flex-nowrap min-w-max',
            !isVertical && isPills && 'gap-2 flex-nowrap min-w-max',
            !isVertical && isSegmented && 'p-1 bg-page-bg rounded-sm border border-border gap-1 inline-flex flex-nowrap min-w-max'
          )}
        >
          {items.map((tab) => (
            <TabsPrimitive.Trigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className={cn(
                'group inline-flex items-center justify-center gap-2 font-medium normal-case tracking-normal transition-all duration-200 cursor-pointer whitespace-nowrap',
                'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-action focus-visible:ring-offset-2 rounded-sm',
                // Line variant
                variant === 'line' && !isVertical && [
                  'py-3 border-b-2 border-transparent text-text-secondary hover:text-text-primary -mb-px',
                  'data-[state=active]:border-primary-action data-[state=active]:text-primary-700 font-semibold',
                ],
                // Line vertical variant
                variant === 'line' && isVertical && [
                  'px-4 py-2.5 text-start border-e-2 -me-[17px] border-transparent text-text-secondary hover:text-text-primary',
                  'data-[state=active]:border-primary-action data-[state=active]:text-primary-700 data-[state=active]:bg-primary-50/50 font-semibold',
                ],
                // Pills variant
                isPills && [
                  'px-3.5 py-1.5 rounded-full text-xs text-text-secondary hover:bg-page-bg',
                  'data-[state=active]:bg-primary-action data-[state=active]:text-text-inverse font-semibold shadow-xs',
                ],
                // Segmented variant
                isSegmented && [
                  'px-3 py-1.5 rounded-sm text-xs text-text-secondary hover:text-text-primary',
                  'data-[state=active]:bg-card-bg data-[state=active]:text-text-primary data-[state=active]:shadow-xs font-semibold',
                ],
                tab.disabled && 'pointer-events-none opacity-40'
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span className="whitespace-nowrap">{tab.label}</span>
              {tab.count !== undefined && (
                <Badge
                  variant={isPills ? 'pill' : 'soft'}
                  color="secondary"
                  size="sm"
                  className="group-data-[state=active]:bg-primary-soft group-data-[state=active]:text-primary-700"
                >
                  <BidiNumber value={tab.count} />
                </Badge>
              )}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </div>

      <div className={cn('flex-1 pt-4 min-w-0', isVertical && 'pt-0')}>
        {children}
      </div>
    </TabsPrimitive.Root>
  );
}

export const TabsContent = TabsPrimitive.Content;
