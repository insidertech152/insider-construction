import React from 'react';
import { PageHeader } from '@/src/components/ui/page-header';
import { useTranslation } from '@/src/i18n/context';
import { DownloadSimple, Funnel } from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';

export interface ListPageTab {
  id: string;
  labelAr: string;
  labelEn: string;
  count?: number;
}

export interface ListPageTemplateProps {
  title: string;
  description?: string;
  breadcrumbItems?: { label: string; href?: string }[];
  primaryAction?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  statCards?: React.ReactNode;
  summaryCard?: React.ReactNode;
  tabs?: ListPageTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onExport?: () => void;
  children: React.ReactNode;
}

export function ListPageTemplate({
  title,
  description,
  breadcrumbItems,
  primaryAction,
  statCards,
  summaryCard,
  tabs,
  activeTab,
  onTabChange,
  onExport,
  children,
}: ListPageTemplateProps) {
  const { language } = useTranslation();

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Page Header */}
      <PageHeader
        title={title}
        subtitle={description}
        breadcrumbs={breadcrumbItems}
        actions={
          <div className="flex items-center gap-2">
            {onExport && (
              <button
                type="button"
                onClick={onExport}
                className="h-9 px-3 rounded-sm border border-border bg-card-bg text-text-secondary hover:text-text-primary hover:bg-page-bg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <DownloadSimple className="w-4 h-4" />
                <span>{language === 'ar' ? 'تصدير كشف' : 'Export'}</span>
              </button>
            )}
            {primaryAction && (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="h-9 px-3.5 rounded-sm bg-primary-action text-white hover:bg-primary-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {primaryAction.icon}
                <span>{primaryAction.label}</span>
              </button>
            )}
          </div>
        }
      />

      {/* 2. Top Stats Grid: StatCards + SummaryCard */}
      {(statCards || summaryCard) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards}
          {summaryCard && <div className="lg:col-span-1">{summaryCard}</div>}
        </div>
      )}

      {/* 3. Status Tabs with Badges */}
      {tabs && tabs.length > 0 && (
        <div className="border-b border-border flex items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const label = language === 'ar' ? tab.labelAr : tab.labelEn;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange?.(tab.id)}
                className={cn(
                  'pb-3 pt-1 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap',
                  isActive
                    ? 'border-primary-action text-primary-action'
                    : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'
                )}
              >
                <span>{label}</span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      'px-1.5 py-0.2 rounded-full text-[10px] font-numeric',
                      isActive
                        ? 'bg-primary-soft text-primary-action'
                        : 'bg-page-bg border border-border text-text-muted'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Table / Main Content Section */}
      <div>{children}</div>
    </div>
  );
}
