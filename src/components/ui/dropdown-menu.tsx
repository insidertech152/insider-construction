import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CaretDown } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { Button, ButtonProps } from './button';

export interface DropdownMenuItemData {
  id?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
  divider?: boolean;
}

export interface DropdownMenuProps {
  trigger?: React.ReactNode;
  items?: DropdownMenuItemData[];
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({
  trigger,
  items,
  align = 'end',
  sideOffset = 4,
  className,
  children,
  open,
  onOpenChange,
}: DropdownMenuProps) {
  if (children) {
    return (
      <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>
        {children}
      </DropdownMenuPrimitive.Root>
    );
  }

  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" endIcon={<CaretDown className="w-3.5 h-3.5" />}>
            خيارات الإجراء
          </Button>
        )}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-card-bg p-1 text-text-primary shadow-dropdown',
            'animate-in fade-in-80 duration-150',
            className
          )}
        >
          {items?.map((item, index) => {
            if (item.divider) {
              return (
                <DropdownMenuPrimitive.Separator
                  key={`sep-${index}`}
                  className="my-1 h-px bg-border-subtle"
                />
              );
            }

            return (
              <DropdownMenuPrimitive.Item
                key={item.id || `item-${index}`}
                disabled={item.disabled}
                onClick={item.onClick}
                className={cn(
                  'relative flex items-center justify-between gap-3 px-3 py-2 text-xs rounded select-none cursor-pointer outline-none transition-colors',
                  'hover:bg-page-bg focus:bg-page-bg',
                  item.destructive && 'text-danger-600 hover:bg-danger-50 focus:bg-danger-50',
                  item.disabled && 'pointer-events-none opacity-40'
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="w-4 h-4 shrink-0 text-text-muted">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-[10px] text-text-muted font-numeric tracking-wider">
                    {item.shortcut}
                  </span>
                )}
              </DropdownMenuPrimitive.Item>
            );
          })}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export interface SplitButtonProps extends Omit<ButtonProps, 'onClick'> {
  mainLabel: React.ReactNode;
  onMainClick?: () => void;
  menuItems: DropdownMenuItemData[];
}

export function SplitButton({
  mainLabel,
  onMainClick,
  menuItems,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  disabled,
  className,
}: SplitButtonProps) {
  const isOutline = variant === 'outline';

  return (
    <div className={cn('inline-flex items-stretch rounded-[4px] shadow-xs', className)}>
      <Button
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        onClick={onMainClick}
        className={cn(
          'flex-1 rounded-e-none focus-visible:z-10 justify-center',
          !isOutline && 'border-e border-black/15'
        )}
      >
        {mainLabel}
      </Button>

      <DropdownMenu
        trigger={
          <Button
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            className={cn(
              'shrink-0 rounded-s-none px-2.5 focus-visible:z-10',
              isOutline && 'border-s-0'
            )}
            aria-label="Toggle dropdown options"
          >
            <CaretDown className="w-3.5 h-3.5" weight="bold" />
          </Button>
        }
        items={menuItems}
      />
    </div>
  );
}

// Composable Radix UI Dropdown Menu Primitives
export const DropdownMenuRoot = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[10rem] overflow-hidden rounded-md border border-border bg-card-bg p-1 text-text-primary shadow-dropdown outline-none font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-150',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded px-2.5 py-1.5 text-xs outline-none transition-colors hover:bg-page-bg focus:bg-page-bg data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'ps-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded py-1.5 ps-7 pe-2.5 text-xs outline-none transition-colors hover:bg-page-bg focus:bg-page-bg data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <span className="w-1.5 h-1.5 rounded-full bg-primary-action" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('my-1 h-px bg-border-subtle', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2.5 py-1.5 text-[11px] font-semibold text-text-muted',
      inset && 'ps-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

