import React from 'react';
import { cn } from '@/src/lib/utils';

export interface BidiNumberProps {
  value: string | number;
  sign?: '+' | '-' | 'auto';
  unit?: string;
  className?: string;
}

/**
 * Standard BidiNumber component ensuring signed numbers and percentages
 * (+14.2%, -3.1%, +4, 85%) render strictly in LTR order even in deep RTL contexts.
 * Uses unicode <bdi dir="ltr"> isolation to guarantee visual order: [Sign][Value][Unit].
 */
export function BidiNumber({
  value,
  sign,
  unit = '',
  className,
}: BidiNumberProps) {
  let displaySign = '';
  let displayValue = value;

  if (typeof value === 'number') {
    if (sign === 'auto') {
      if (value > 0) displaySign = '+';
      else if (value < 0) {
        displaySign = '-';
        displayValue = Math.abs(value);
      }
    } else if (sign === '+') {
      displaySign = '+';
      displayValue = Math.abs(value);
    } else if (sign === '-') {
      displaySign = '-';
      displayValue = Math.abs(value);
    }
  } else if (typeof value === 'string') {
    const trimmed = value.trim();
    if (sign === '+' && !trimmed.startsWith('+') && !trimmed.startsWith('-')) {
      displaySign = '+';
    } else if (sign === '-' && !trimmed.startsWith('-')) {
      displaySign = '-';
    }
  }

  return (
    <bdi
      dir="ltr"
      className={cn('inline-block font-numeric tabular-nums whitespace-nowrap', className)}
    >
      {displaySign}
      {displayValue}
      {unit}
    </bdi>
  );
}

/**
 * Formats a signed number or percentage as an isolated LTR string
 * with Unicode Left-to-Right Isolate (U+2066) and Pop Directional Isolate (U+2069)
 * for use in toasts, titles, and text strings.
 */
export function formatBidiSignedNumber(
  value: number | string,
  options?: { sign?: '+' | '-' | 'auto'; unit?: string }
): string {
  const signOpt = options?.sign || 'auto';
  const unit = options?.unit || '';
  let sign = '';
  let numStr = String(value);

  if (typeof value === 'number') {
    if (signOpt === 'auto') {
      if (value > 0) sign = '+';
      else if (value < 0) {
        sign = '-';
        numStr = String(Math.abs(value));
      }
    } else if (signOpt === '+') {
      sign = '+';
      numStr = String(Math.abs(value));
    } else if (signOpt === '-') {
      sign = '-';
      numStr = String(Math.abs(value));
    }
  } else if (typeof value === 'string') {
    const trimmed = value.trim();
    if (signOpt === '+' && !trimmed.startsWith('+') && !trimmed.startsWith('-')) {
      sign = '+';
    } else if (signOpt === '-' && !trimmed.startsWith('-')) {
      sign = '-';
    }
  }

  return `\u2066${sign}${numStr}${unit}\u2069`;
}
