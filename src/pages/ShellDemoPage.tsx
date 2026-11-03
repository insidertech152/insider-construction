import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/src/i18n/context';
import { AppShell } from '@/src/components/shell/AppShell';
import { PageHeader } from '@/src/components/ui/page-header';
import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { UserRole } from '@/src/config/navigation';
import { ArrowSquareOut, Sparkle } from '@phosphor-icons/react';

export function ShellDemoPage() {
  const { language } = useTranslation();
  const [activeRole, setActiveRole] = useState<UserRole>('owner');
  const [currentRoute, setCurrentRoute] = useState('/shell-demo');

  return (
    <AppShell
      activeRole={activeRole}
      onRoleChange={setActiveRole}
      currentRoute={currentRoute}
      onNavigate={(route) => setCurrentRoute(route)}
    >
      <div className="space-y-6">
        {/* Page Header with Mirrored Breadcrumb */}
        <PageHeader
          title={language === 'ar' ? 'هيكل النظام ولوحة التحكم' : 'Application Shell & Dashboard'}
          subtitle={
            language === 'ar'
              ? 'معاينة القائمة الجانبية المعتمدة وشريط الأدوات العلوي مع توزيع الصلاحيات التفاعلي'
              : 'Interactive preview of approved Sidebar, Topbar, and Role-Based Access Control'
          }
          breadcrumbs={[
            { label: language === 'ar' ? 'الرئيسية' : 'Home', href: '/shell-demo' },
            { label: language === 'ar' ? 'لوحة التحكم' : 'Dashboard', isCurrent: true },
          ]}
          actions={
            <Link to="/design-system">
              <Button
                variant="outline"
                color="secondary"
                size="sm"
                endIcon={<ArrowSquareOut className="w-3.5 h-3.5" />}
              >
                {language === 'ar' ? 'مكتبة عناصر الواجهة' : 'Design System'}
              </Button>
            </Link>
          }
        />

        {/* Empty Content Area Placeholder Card (Strictly adhering to Phase 2 limits) */}
        <Card className="min-h-[360px] flex flex-col justify-center items-center text-center p-8 bg-card-bg border-dashed border-2 border-border shadow-xs">
          <div className="w-14 h-14 rounded-full bg-primary-soft text-primary-action flex items-center justify-center mb-4 shadow-xs">
            <Sparkle className="w-7 h-7" weight="duotone" />
          </div>
          <h3 className="text-base font-bold text-text-primary">
            {language === 'ar' ? 'مساحة العمل ومحتوى الشاشة' : 'Screen Workspace Content Area'}
          </h3>
          <p className="text-xs text-text-muted max-w-md mt-1.5 leading-relaxed">
            {language === 'ar'
              ? 'تم تشييد وتأكيد هيكل التطبيق (القائمة الجانبية والشريط العلوي) بنجاح. لا توجد جداول أو شاشات أعمال في هذه المرحلة وفقاً للتعليمات الصارمة.'
              : 'The application shell (Sidebar and Topbar) is built and verified. No business tables or screens are included in this phase.'}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link to="/design-system">
              <Button variant="solid" color="primary" size="sm">
                {language === 'ar' ? 'معاينة مكتبة التصميم (/design-system)' : 'Explore Design System (/design-system)'}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
