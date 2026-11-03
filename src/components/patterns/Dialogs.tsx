import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Warning, Trash } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  size?: DialogSize;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function ModalDialog({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  children,
  footer,
}: ModalDialogProps) {
  const { language, isRTL } = useTranslation();

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
    full: 'max-w-[94vw] h-[90vh]',
  }[size];

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content Box */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPrimitive.Content
            dir={isRTL ? 'rtl' : 'ltr'}
            className={cn(
              'w-full bg-card-bg rounded-[8px] border border-border shadow-dropdown flex flex-col max-h-[90vh] overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 font-sans',
              sizeClasses
            )}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
              <div>
                <DialogPrimitive.Title className="text-sm font-bold text-text-primary">
                  {title}
                </DialogPrimitive.Title>
                {description && (
                  <DialogPrimitive.Description className="text-xs text-text-muted mt-0.5">
                    {description}
                  </DialogPrimitive.Description>
                )}
              </div>
              <DialogPrimitive.Close
                aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
                className="w-7 h-7 rounded text-text-muted hover:text-text-primary hover:bg-page-bg flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" weight="bold" />
              </DialogPrimitive.Close>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 overflow-y-auto flex-1 text-xs text-text-secondary leading-relaxed">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-5 py-3.5 bg-page-bg/50 border-t border-border flex items-center justify-end gap-2.5 shrink-0">
                {footer}
              </div>
            )}
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  isDestructive = true,
  isLoading = false,
}: ConfirmDialogProps) {
  const { language, isRTL } = useTranslation();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPrimitive.Content
            dir={isRTL ? 'rtl' : 'ltr'}
            className="w-full max-w-md bg-card-bg rounded-[8px] border border-border shadow-dropdown p-5 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 font-sans"
          >
            <div className="flex items-start gap-3.5">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                  isDestructive
                    ? 'bg-danger-soft text-danger-action'
                    : 'bg-warning-soft text-warning-700'
                )}
              >
                {isDestructive ? (
                  <Trash className="w-5 h-5" weight="bold" />
                ) : (
                  <Warning className="w-5 h-5" weight="bold" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <DialogPrimitive.Title className="text-sm font-bold text-text-primary">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-xs text-text-secondary mt-1 leading-relaxed">
                  {description}
                </DialogPrimitive.Description>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-border flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="h-8 px-3 rounded-[4px] border border-border bg-card-bg text-text-secondary hover:bg-page-bg text-xs font-semibold transition-colors cursor-pointer"
              >
                {cancelLabel || (language === 'ar' ? 'إلغاء' : 'Cancel')}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
                disabled={isLoading}
                className={cn(
                  'h-8 px-3.5 rounded-[4px] text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5',
                  isDestructive
                    ? 'bg-danger-action hover:bg-danger-700'
                    : 'bg-primary-action hover:bg-primary-700'
                )}
              >
                {isDestructive && <Trash className="w-3.5 h-3.5" />}
                <span>
                  {confirmLabel || (language === 'ar' ? 'تأكيد الحذف' : 'Confirm')}
                </span>
              </button>
            </div>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = 'w-full sm:w-[480px]',
}: DrawerProps) {
  const { language, isRTL } = useTranslation();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          dir={isRTL ? 'rtl' : 'ltr'}
          className={cn(
            'fixed inset-y-0 end-0 z-50 bg-card-bg border-s border-border shadow-2xl flex flex-col h-full focus:outline-none transition-transform duration-250 ease-out font-sans',
            width,
            // Slides from inline-end (end-0)
            isRTL
              ? 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
              : 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
          )}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
            <div>
              <DialogPrimitive.Title className="text-sm font-bold text-text-primary">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="text-xs text-text-muted mt-0.5">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close
              aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
              className="w-7 h-7 rounded text-text-muted hover:text-text-primary hover:bg-page-bg flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" weight="bold" />
            </DialogPrimitive.Close>
          </div>

          {/* Scrollable Body */}
          <div className="p-5 overflow-y-auto flex-1 text-xs text-text-secondary leading-relaxed">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-5 py-3.5 bg-page-bg/50 border-t border-border flex items-center justify-end gap-2.5 shrink-0">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
