import React, { forwardRef } from 'react';
import { cn } from '@/src/lib/utils';
import { WarningCircle } from '@phosphor-icons/react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      isRequired,
      disabled,
      className,
      rows = 3,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-start">
        {label && (
          <label
            htmlFor={generatedId}
            className="text-xs font-semibold text-text-primary flex items-center gap-1 select-none"
          >
            <span>{label}</span>
            {isRequired && <span className="text-danger-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={generatedId}
            rows={rows}
            disabled={disabled}
            className={cn(
              'w-full p-3 text-sm bg-card-bg text-text-primary placeholder:text-text-placeholder',
              'border border-border rounded-[4px] transition-colors duration-150 resize-y min-h-[80px]',
              'focus:outline-none focus:border-primary-action focus:ring-2 focus:ring-primary-action/25',
              disabled && 'bg-page-bg text-text-muted border-border cursor-not-allowed opacity-75',
              error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500 bg-danger-50/20 text-danger-900',
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-xs text-danger-600 font-medium flex items-center gap-1">
            <WarningCircle className="w-3.5 h-3.5 shrink-0" weight="fill" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-text-muted">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
