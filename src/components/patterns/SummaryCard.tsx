import React from 'react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import { BidiNumber } from '@/src/components/ui/bidi-number';

export interface SummaryCardProps {
  title: string;
  subtitle?: string;
  progressValue: number; // 0 to 100
  progressLabel?: string;
  metrics: {
    label: string;
    value: string | number;
    color?: string; // e.g. 'bg-success-action' or 'text-warning-500'
  }[];
  variant?: 'dark' | 'primary' | 'white';
  className?: string;
}

export function SummaryCard({
  title,
  subtitle,
  progressValue,
  progressLabel,
  metrics,
  variant = 'dark',
  className,
}: SummaryCardProps) {
  const { language } = useTranslation();

  const isDark = variant === 'dark';
  const isPrimary = variant === 'primary';

  return (
    <div
      className={cn(
        'rounded-sm p-6 shadow-card font-sans flex flex-col justify-between transition-shadow border-0',
        isDark && 'bg-[#222E3C] text-white',
        isPrimary && 'bg-gradient-to-br from-primary-600 to-primary-800 text-white',
        variant === 'white' && 'bg-card-bg text-text-primary',
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold tracking-tight">{title}</h4>
            {subtitle && (
              <p
                className={cn(
                  'text-xs mt-0.5',
                  isDark ? 'text-slate-400' : isPrimary ? 'text-primary-100' : 'text-text-muted'
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          <span
            className={cn(
              'font-numeric font-bold text-lg px-2 py-0.5 rounded',
              isDark ? 'bg-white/10 text-white' : isPrimary ? 'bg-white/20 text-white' : 'bg-primary-soft text-primary-action'
            )}
          >
            <BidiNumber value={progressValue} unit="%" />
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span
              className={cn(
                'text-[11px] font-medium',
                isDark ? 'text-slate-300' : isPrimary ? 'text-primary-100' : 'text-text-secondary'
              )}
            >
              {progressLabel || (language === 'ar' ? 'نسبة الإنجاز الإجمالية' : 'Overall Completion')}
            </span>
          </div>
          <div
            className={cn(
              'h-2 w-full rounded-full overflow-hidden',
              isDark ? 'bg-slate-700' : isPrimary ? 'bg-primary-900/50' : 'bg-page-bg border border-border'
            )}
          >
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                isDark ? 'bg-primary-400' : isPrimary ? 'bg-white' : 'bg-primary-action'
              )}
              style={{ width: `${Math.min(Math.max(progressValue, 0), 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div
        className={cn(
          'mt-5 pt-3.5 border-t grid grid-cols-2 sm:grid-cols-3 gap-3',
          isDark ? 'border-slate-700/60' : isPrimary ? 'border-white/20' : 'border-border-subtle'
        )}
      >
        {metrics.map((item, idx) => (
          <div key={idx} className="min-w-0">
            <p
              className={cn(
                'text-[11px] truncate',
                isDark ? 'text-slate-400' : isPrimary ? 'text-primary-200' : 'text-text-muted'
              )}
            >
              {item.label}
            </p>
            <p className="font-numeric font-bold text-sm mt-0.5 truncate">
              {typeof item.value === 'string' && (item.value.includes('%') || item.value.startsWith('+') || item.value.startsWith('-')) ? (
                <BidiNumber value={item.value} />
              ) : (
                item.value
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
