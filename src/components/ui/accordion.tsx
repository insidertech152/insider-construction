import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { CaretDown } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';

export interface AccordionItemData {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  items: AccordionItemData[];
  className?: string;
}

export function Accordion({
  type = 'single',
  collapsible = true,
  defaultValue,
  items,
  className,
}: AccordionProps) {
  return (
    // @ts-expect-error Radix accordion types conditional props
    <AccordionPrimitive.Root
      type={type}
      collapsible={collapsible}
      defaultValue={defaultValue}
      className={cn('w-full divide-y divide-border rounded-lg border border-border bg-card-bg overflow-hidden', className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className="group focus-within:relative focus-within:z-10"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                'flex flex-1 items-center justify-between p-4 text-xs font-semibold text-text-primary text-start transition-all duration-200 cursor-pointer',
                'hover:bg-page-bg/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                'data-[state=open]:text-primary-600',
                item.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              <div className="flex items-center gap-2.5">
                {item.icon && <span className="shrink-0 text-text-muted group-data-[state=open]:text-primary-500">{item.icon}</span>}
                <span>{item.trigger}</span>
              </div>
              <CaretDown
                className="w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
                weight="bold"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content
            className={cn(
              'overflow-hidden text-xs text-text-secondary leading-relaxed transition-all duration-200',
              'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
            )}
          >
            <div className="p-4 pt-0 border-t border-border-subtle/60">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
