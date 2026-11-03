import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { CaretUp, CaretDown, Icon } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import { BidiNumber } from '@/src/components/ui/bidi-number';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: Icon;
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  delta?: {
    value: string | number;
    isPositive: boolean;
    period?: string;
  };
  subtitle?: string;
  chartData?: { val: number }[];
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: IconComp,
  variant = 'primary',
  delta,
  subtitle,
  chartData,
  className,
}: StatCardProps) {
  const { language } = useTranslation();

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          iconBg: 'bg-success-soft text-success-700',
          chartStroke: '#2ca87f',
          chartFill: '#2ca87f',
        };
      case 'warning':
        return {
          iconBg: 'bg-warning-soft text-warning-700',
          chartStroke: '#e58a00',
          chartFill: '#e58a00',
        };
      case 'info':
        return {
          iconBg: 'bg-info-soft text-info-700',
          chartStroke: '#0284c7',
          chartFill: '#0284c7',
        };
      case 'danger':
        return {
          iconBg: 'bg-danger-soft text-danger-700',
          chartStroke: '#dc2626',
          chartFill: '#dc2626',
        };
      default:
        return {
          iconBg: 'bg-primary-soft text-primary-action',
          chartStroke: '#3469e6',
          chartFill: '#3469e6',
        };
    }
  };

  const style = getVariantStyles();

  // Default sparkline dummy points if not supplied
  const sparkData = chartData || [
    { val: 12 },
    { val: 18 },
    { val: 15 },
    { val: 26 },
    { val: 22 },
    { val: 34 },
    { val: 30 },
    { val: 45 },
  ];

  return (
    <div
      className={cn(
        'bg-card-bg border-0 rounded-sm p-6 shadow-card transition-shadow flex flex-col justify-between overflow-hidden relative font-sans',
        className
      )}
    >
      <div>
        {/* Top line: Icon box + Delta badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className={cn('w-10 h-10 rounded-[6px] flex items-center justify-center shrink-0', style.iconBg)}>
            <IconComp className="w-5 h-5" weight="bold" />
          </div>

          {delta && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold font-numeric',
                delta.isPositive
                  ? 'bg-success-soft text-success-700'
                  : 'bg-danger-soft text-danger-700'
              )}
            >
              {delta.isPositive ? (
                <CaretUp className="w-3 h-3" weight="bold" />
              ) : (
                <CaretDown className="w-3 h-3" weight="bold" />
              )}
              <BidiNumber
                value={delta.value}
                sign={delta.isPositive ? '+' : '-'}
                unit={typeof delta.value === 'number' ? '%' : undefined}
              />
            </span>
          )}
        </div>

        {/* Label */}
        <p className="text-xs font-medium text-text-muted mb-1 truncate">{label}</p>

        {/* Large Value */}
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl lg:text-3xl font-bold text-text-primary font-numeric tabular-nums tracking-tight">
            {typeof value === 'number' ? value.toLocaleString('en-US') : value}
          </h3>
        </div>

        {/* Subtitle / Period */}
        {(subtitle || delta?.period) && (
          <p className="text-[11px] text-text-secondary mt-1">
            {subtitle || (delta?.period ? (language === 'ar' ? `مقارنة بـ ${delta.period}` : `vs ${delta.period}`) : '')}
          </p>
        )}
      </div>

      {/* Sparkline Chart */}
      <div className="h-10 w-full mt-3 -mx-2 -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${variant}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={style.chartFill} stopOpacity={0.25} />
                <stop offset="100%" stopColor={style.chartFill} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke={style.chartStroke}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#grad-${variant})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
