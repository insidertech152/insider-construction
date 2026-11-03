import React from 'react';
import { cn } from './utils';

/**
 * Format a number with thousands separators (e.g. 4,850,000.00) using Western digits 0-9
 */
export function formatThousands(val: number | string, decimals: number = 2): string {
  if (val === '' || val === null || val === undefined) return '';
  const num = typeof val === 'number' ? val : parseFloat(val.toString().replace(/,/g, ''));
  if (isNaN(num)) return val.toString();

  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * BidiNumber: Guarantees that numbers with signs (+, -) or symbols (%)
 * render with correct directionality without punctuation reversal in RTL.
 * E.g. "+12", "8.4%", "+1.3%", "-10%", "+10%"
 */
export interface BidiNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number;
  prefix?: string;
  suffix?: string;
}

export function BidiNumber({
  value,
  prefix = '',
  suffix = '',
  className,
  ...props
}: BidiNumberProps) {
  return (
    <span
      dir="ltr"
      style={{ unicodeBidi: 'isolate' }}
      className={cn('inline-block whitespace-nowrap tabular-nums font-numeric', className)}
      {...props}
    >
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/**
 * BidiCode: Wraps codes and IDs (such as PRJ-EGY-CAI-2026-012 or INV-2026-0894)
 * in an LTR isolate with whitespace: nowrap to prevent breaking across hyphens.
 */
export function BidiCode({
  code,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { code: string }) {
  return (
    <span
      dir="ltr"
      style={{ unicodeBidi: 'isolate' }}
      className={cn('inline-block whitespace-nowrap font-numeric', className)}
      {...props}
    >
      {code}
    </span>
  );
}

/**
 * NumberUnit: Guarantees proper rendering of a number followed by its localized unit
 * with whitespace-nowrap so they never break onto separate lines.
 * In Arabic: [Number in LTR isolate] [Arabic unit] -> "3.2 سنة" or "(1,200 م²)"
 * In English: [Number] [English unit] -> "3.2 years" or "(1,200 m²)"
 */
export interface NumberUnitProps extends React.HTMLAttributes<HTMLSpanElement> {
  number: string | number;
  unit: string;
  isRTL?: boolean;
}

export function NumberUnit({
  number,
  unit,
  isRTL = false,
  className,
  ...props
}: NumberUnitProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 whitespace-nowrap tabular-nums', className)}
      {...props}
    >
      <span dir="ltr" style={{ unicodeBidi: 'isolate' }} className="font-numeric whitespace-nowrap">
        {number}
      </span>
      <span className="whitespace-nowrap">{unit}</span>
    </span>
  );
}

/**
 * BidiIsolate: Isolates any embedded LTR/English segment inside RTL text
 * to prevent punctuation and parentheses flip
 */
export function BidiIsolate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      dir="ltr"
      style={{ unicodeBidi: 'isolate' }}
      className={cn('inline-block whitespace-nowrap', className)}
    >
      {children}
    </span>
  );
}
