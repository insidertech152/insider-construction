import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isValid?: boolean;
  isRequired?: boolean;
  isCurrency?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      isValid,
      isRequired,
      isCurrency = false,
      startIcon,
      endIcon,
      startAddon,
      endAddon,
      disabled,
      className,
      id,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    // Format currency with thousands separators while keeping Western digits (0-9)
    const formatCurrencyValue = (val: string | number | readonly string[] | undefined): string => {
      if (val === undefined || val === null || val === '') return '';
      const stringVal = val.toString();
      // Remove any existing non-digit/non-period characters
      const clean = stringVal.replace(/,/g, '');
      const parts = clean.split('.');
      if (isNaN(Number(parts[0]))) return stringVal;
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };

    const [innerVal, setInnerVal] = useState<string>(() => {
      if (isCurrency) {
        return formatCurrencyValue(value ?? defaultValue ?? '');
      }
      return (value ?? defaultValue ?? '').toString();
    });

    useEffect(() => {
      if (value !== undefined && isCurrency) {
        setInnerVal(formatCurrencyValue(value));
      } else if (value !== undefined) {
        setInnerVal(value.toString());
      }
    }, [value, isCurrency]);

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isCurrency) {
        const raw = e.target.value.replace(/,/g, '');
        // Allow only digits and at most one decimal point
        if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
          const formatted = formatCurrencyValue(raw);
          setInnerVal(formatted);
          if (onChange) {
            e.target.value = formatted;
            onChange(e);
          }
        }
      } else {
        setInnerVal(e.target.value);
        onChange?.(e);
      }
    };

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

        <div className="relative flex items-stretch w-full rounded-sm shadow-xs">
          {startAddon && (
            <div className="inline-flex items-center px-3 text-xs bg-page-bg text-text-secondary border border-e-0 border-border rounded-s-sm select-none shrink-0">
              {startAddon}
            </div>
          )}

          <div className="relative flex-1 flex items-center">
            {startIcon && (
              <span className="absolute start-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none flex items-center justify-center">
                {startIcon}
              </span>
            )}

            <input
              ref={ref}
              id={generatedId}
              disabled={disabled}
              value={isCurrency ? innerVal : (value ?? innerVal)}
              onChange={handleCurrencyChange}
              className={cn(
                'w-full h-10 px-3 py-2 text-sm bg-card-bg text-text-primary placeholder:text-text-placeholder',
                'border border-border rounded-sm transition-colors duration-150',
                'focus:outline-none focus:border-primary-action focus:ring-2 focus:ring-primary-action/25',
                startAddon && 'rounded-s-none',
                endAddon && 'rounded-e-none',
                startIcon && 'ps-9',
                (endIcon || error || isValid) && 'pe-9',
                disabled && 'bg-page-bg text-text-muted border-border cursor-not-allowed opacity-75',
                error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500 bg-danger-50/20 text-danger-900',
                isValid && !error && 'border-success-500 focus:border-success-500 focus:ring-success-500',
                isCurrency && 'font-numeric tabular-nums text-start',
                className
              )}
              {...props}
            />

            {(endIcon || error || isValid) && (
              <span className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                {error ? (
                  <WarningCircle className="w-4 h-4 text-danger-500" weight="fill" />
                ) : isValid ? (
                  <CheckCircle className="w-4 h-4 text-success-500" weight="fill" />
                ) : (
                  <span className="text-text-muted">{endIcon}</span>
                )}
              </span>
            )}
          </div>

          {endAddon && (
            <div className="inline-flex items-center px-3 text-xs bg-page-bg text-text-secondary border border-s-0 border-border rounded-e-sm select-none shrink-0 font-numeric">
              {endAddon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-xs text-danger-600 font-medium flex items-center gap-1">
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-text-muted">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
