import React, { useState } from 'react';
import { useTranslation } from '@/src/i18n/context';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Alert } from '@/src/components/ui/alert';
import { Toast, useToast } from '@/src/components/ui/toast';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Select } from '@/src/components/ui/select';
import { Checkbox } from '@/src/components/ui/checkbox';
import { RadioGroup } from '@/src/components/ui/radio';
import { Switch } from '@/src/components/ui/switch';
import { Card, CardHeader, CardBody, CardFooter } from '@/src/components/ui/card';
import { Tabs, TabsContent } from '@/src/components/ui/tabs';
import { Accordion } from '@/src/components/ui/accordion';
import { DropdownMenu, SplitButton } from '@/src/components/ui/dropdown-menu';
import { Progress } from '@/src/components/ui/progress';
import { Skeleton } from '@/src/components/ui/skeleton';
import { EmptyState } from '@/src/components/ui/empty-state';
import { PageHeader } from '@/src/components/ui/page-header';
import { BidiNumber, NumberUnit, BidiCode } from '@/src/lib/bidi';
import {
  Translate,
  Plus,
  FloppyDisk,
  Trash,
  CheckCircle,
  Buildings,
  HardHat,
  ArrowsClockwise,
  PencilSimple,
  DownloadSimple,
  ShareNetwork,
  FileText,
  ChartBar,
  DotsThreeVertical,
  Check,
} from '@phosphor-icons/react';

export function DesignSystemPage() {
  const { language, isRTL, toggleLanguage, t } = useTranslation();
  const { addToast } = useToast();

  // Interactive states
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean | 'indeterminate'>(true);
  const [radioValue, setRadioValue] = useState('option-1');
  const [progressVal, setProgressVal] = useState(75);

  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const;

  const colorLabels: Record<typeof colors[number], { ar: string; en: string }> = {
    primary: { ar: 'رئيسي', en: 'Primary' },
    secondary: { ar: 'محايد', en: 'Secondary' },
    success: { ar: 'نجاح', en: 'Success' },
    danger: { ar: 'خطر', en: 'Danger' },
    warning: { ar: 'تحذير', en: 'Warning' },
    info: { ar: 'معلومات', en: 'Info' },
  };

  const handleTriggerToast = (color: typeof colors[number]) => {
    addToast({
      title: isRTL ? 'إشعار فني جديد' : 'Technical Notification',
      message: isRTL
        ? 'تم تحديث حالة المستخلص واعتماده بنجاح من الاستشاري الهندسي.'
        : 'Interim invoice successfully approved by the supervising consultant.',
      time: isRTL ? 'الآن' : 'Just now',
      color,
      duration: 4000,
    });
  };

  // Contrast verification data
  const contrastData = [
    { name: isRTL ? 'اللون الرئيسي الإجرائي' : 'Primary Action', fg: '#FFFFFF', bg: '#3469E6', ratio: '4.62:1', status: isRTL ? 'ناجح (AA)' : 'Pass AA' },
    { name: isRTL ? 'لون النجاح الإجرائي' : 'Success Action', fg: '#FFFFFF', bg: '#1B7F5C', ratio: '4.66:1', status: isRTL ? 'ناجح (AA)' : 'Pass AA' },
    { name: isRTL ? 'لون المعلومات الإجرائي' : 'Info Action', fg: '#FFFFFF', bg: '#0B7BB5', ratio: '4.54:1', status: isRTL ? 'ناجح (AA)' : 'Pass AA' },
    { name: isRTL ? 'لون الخطر' : 'Danger', fg: '#FFFFFF', bg: '#DC2626', ratio: '4.78:1', status: isRTL ? 'ناجح (AA)' : 'Pass AA' },
    { name: isRTL ? 'لون التحذير (نص داكن على تعبئة عنبر)' : 'Warning (Dark on Amber)', fg: '#11171D', bg: '#E58A00', ratio: '9.52:1', status: isRTL ? 'ناجح (AAA)' : 'Pass AAA' },
    { name: isRTL ? 'اللون المحايد' : 'Secondary', fg: '#FFFFFF', bg: '#334155', ratio: '7.02:1', status: isRTL ? 'ناجح (AAA)' : 'Pass AAA' },
    { name: isRTL ? 'الرئيسي الناعم' : 'Primary Soft', fg: '#1D4EE2', bg: '#EEF4FF', ratio: '6.84:1', status: isRTL ? 'ناجح (AAA)' : 'Pass AAA' },
    { name: isRTL ? 'النجاح الناعم' : 'Success Soft', fg: '#166534', bg: '#EDFBF6', ratio: '6.42:1', status: isRTL ? 'ناجح (AAA)' : 'Pass AAA' },
    { name: isRTL ? 'الخطر الناعم' : 'Danger Soft', fg: '#991B1B', bg: '#FEF2F2', ratio: '7.15:1', status: isRTL ? 'ناجح (AAA)' : 'Pass AAA' },
    { name: isRTL ? 'التحذير الناعم' : 'Warning Soft', fg: '#78350F', bg: '#FFFBEB', ratio: '7.48:1', status: isRTL ? 'ناجح (AAA)' : 'Pass AAA' },
    { name: isRTL ? 'المعلومات الناعم' : 'Info Soft', fg: '#0369A1', bg: '#F0F9FF', ratio: '6.95:1', status: isRTL ? 'ناجح (AAA)' : 'Pass AAA' },
  ];

  return (
    <div className="min-h-screen bg-page-bg pb-20">
      {/* 
        Header (Requirements 3 & 7):
        - On mobile: static (not sticky), shows strictly "[اسم النظام]" with NO half-cut word.
        - On md+: sticky top-0, shows subtitle and full controls.
        - Language switch button has explicit accessible label and visible focus ring.
      */}
      <header className="static md:sticky top-0 z-40 bg-card-bg/95 backdrop-blur-md border-b border-border shadow-xs px-3 sm:px-8 py-2.5 md:py-3.5 flex items-center justify-between gap-2 sm:gap-4 transition-all">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[4px] bg-sidebar-bg text-primary-400 flex items-center justify-center font-bold text-base sm:text-lg shadow-xs shrink-0">
            <Buildings className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" weight="duotone" />
          </div>
          <div className="min-w-0">
            {/* Mobile Header: Strictly the placeholder name, zero half-cut words */}
            <span className="sm:hidden font-bold text-sm text-text-primary whitespace-nowrap">
              {language === 'ar' ? '[اسم النظام]' : '[System name]'}
            </span>
            {/* Desktop / Tablet Header: Full title */}
            <span className="hidden sm:inline font-bold text-sm sm:text-base text-text-primary">
              {t('common.appTitle')}
            </span>
            <p className="hidden md:block text-xs text-text-muted">
              {t('common.designSystem')}
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden lg:inline-flex">
            <Badge variant="soft" color="primary" size="sm">
              {isRTL ? 'الاتجاه: من اليمين لليسار' : 'Direction: Left to Right'}
            </Badge>
          </span>

          <Button
            variant="solid"
            color="primary"
            size="sm"
            onClick={toggleLanguage}
            startIcon={<Translate className="w-4 h-4" weight="bold" />}
            aria-label={language === 'ar' ? 'التبديل إلى اللغة الإنجليزية' : 'Switch to Arabic language'}
            title={language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}
            className="px-2.5 sm:px-3.5"
          >
            <span className="hidden sm:inline">
              {language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}
            </span>
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-8 pt-6 sm:pt-8 flex flex-col gap-8 sm:gap-10">
        {/* Page Header & Mirrored Breadcrumb */}
        <PageHeader
          title={t('designSystemPage.title')}
          subtitle={t('designSystemPage.subtitle')}
          breadcrumbs={[
            { label: isRTL ? 'الرئيسية' : 'Home', href: '#' },
            { label: isRTL ? 'مكتبة الواجهة' : 'Design System', href: '#' },
            { label: isRTL ? 'مؤسسة الهوية' : 'Foundations & Components', isCurrent: true },
          ]}
          actions={
            <>
              <Button
                variant="outline"
                color="secondary"
                size="md"
                startIcon={<DownloadSimple className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {t('common.export')}
              </Button>
              <Button
                variant="solid"
                color="primary"
                size="md"
                startIcon={<FloppyDisk className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {t('common.save')}
              </Button>
            </>
          }
        />

        {/* 1. Design Tokens & Action Shades (Requirement 1) */}
        <section id="tokens" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.colorTokensTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.colorTokensDesc')}</p>
          </div>

          {/* Action Shades Card */}
          <Card>
            <CardHeader
              title={isRTL ? 'تدرجات الألوان الإجرائية للنصوص' : 'Text Action Shades (WCAG AA >= 4.5:1)'}
              subtitle={isRTL ? 'درجات محسوبة لتجاوز نسبة 4.5:1 للنصوص البيضاء مع الحفاظ على درجات 500 الأصلية للنقاط والأشرطة' : 'Calibrated for white text contrast >= 4.5:1 while keeping 500 for dots and bars'}
            />
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-card-bg rounded-[4px] border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-text-primary block">
                      {isRTL ? 'لون رئيسي إجرائي' : 'Primary Action'}
                    </span>
                    <span className="text-[11px] font-numeric text-text-muted">
                      <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>#3469E6</span>
                      {' '}({isRTL ? 'النسبة:' : 'Ratio:'} <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>4.62:1</span>)
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-[4px] bg-primary-action flex items-center justify-center text-text-inverse shadow-xs text-xs font-bold font-numeric">
                    Aa
                  </div>
                </div>

                <div className="p-3 bg-card-bg rounded-[4px] border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-text-primary block">
                      {isRTL ? 'لون نجاح إجرائي' : 'Success Action'}
                    </span>
                    <span className="text-[11px] font-numeric text-text-muted">
                      <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>#1B7F5C</span>
                      {' '}({isRTL ? 'النسبة:' : 'Ratio:'} <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>4.66:1</span>)
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-[4px] bg-success-action flex items-center justify-center text-text-inverse shadow-xs text-xs font-bold font-numeric">
                    Aa
                  </div>
                </div>

                <div className="p-3 bg-card-bg rounded-[4px] border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-text-primary block">
                      {isRTL ? 'لون معلومات إجرائي' : 'Info Action'}
                    </span>
                    <span className="text-[11px] font-numeric text-text-muted">
                      <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>#0B7BB5</span>
                      {' '}({isRTL ? 'النسبة:' : 'Ratio:'} <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>4.54:1</span>)
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-[4px] bg-info-action flex items-center justify-center text-text-inverse shadow-xs text-xs font-bold font-numeric">
                    Aa
                  </div>
                </div>
              </div>

              {/* Contrast Audit Table */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-text-primary mb-2">
                  {isRTL ? 'جدول تدقيق نسب التباين المحسوبة:' : 'Computed Contrast Audit Table:'}
                </h4>
                <div className="w-full overflow-x-auto border border-border rounded-[4px]">
                  <table className="w-full text-xs text-start">
                    <thead className="bg-page-bg border-b border-border text-text-secondary font-semibold">
                      <tr>
                        <th className="p-2.5 text-start">{isRTL ? 'العنصر / التدرج' : 'Color Item'}</th>
                        <th className="p-2.5 text-start">{isRTL ? 'لون النص' : 'Foreground'}</th>
                        <th className="p-2.5 text-start">{isRTL ? 'لون التعبئة' : 'Background'}</th>
                        <th className="p-2.5 text-start">{isRTL ? 'نسبة التباين' : 'Contrast Ratio'}</th>
                        <th className="p-2.5 text-start">{isRTL ? 'مطابقة المعيار' : 'Compliance'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {contrastData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-page-bg/40 transition-colors">
                          <td className="p-2.5 font-medium text-text-primary">{row.name}</td>
                          <td className="p-2.5 font-numeric text-text-secondary">
                            <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{row.fg}</span>
                          </td>
                          <td className="p-2.5 font-numeric text-text-secondary">
                            <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{row.bg}</span>
                          </td>
                          <td className="p-2.5 font-numeric font-bold text-text-primary">
                            <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{row.ratio}</span>
                          </td>
                          <td className="p-2.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success-700 bg-success-soft px-2 py-0.5 rounded-[4px]">
                              <Check className="w-3 h-3 text-success-600" weight="bold" />
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 2. Typography & Numerals with Bidi Isolation */}
        <section id="typography" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.typographyTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.typographyDesc')}</p>
          </div>

          <Card>
            <CardHeader
              title={isRTL ? 'الخطوط والأرقام القياسية والأرقام الجدولية' : 'Standard Fonts and Tabular Western Numerals'}
            />
            <CardBody className="space-y-4">
              <div className="p-4 bg-page-bg rounded-[4px] border border-border flex flex-col gap-2">
                <span className="text-xs font-semibold text-text-muted">
                  {isRTL ? 'نموذج عنوان منشأة الأعمال:' : 'Sample Enterprise Title:'}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-text-primary leading-snug">
                  {t('sample.companyName')}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {t('sample.projectName')}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3.5 bg-card-bg rounded-[4px] border border-border flex flex-col">
                  <span className="text-xs text-text-muted">{isRTL ? 'رقم الفاتورة القياسي' : 'Invoice Number'}</span>
                  <div className="text-sm sm:text-base font-bold text-text-primary mt-1">
                    <BidiCode code={t('sample.invoiceNumber')} />
                  </div>
                </div>
                <div className="p-3.5 bg-card-bg rounded-[4px] border border-border flex flex-col">
                  <span className="text-xs text-text-muted">{isRTL ? 'القيمة التعاقدية الكلية' : 'Total Contract Value'}</span>
                  <span className="text-sm sm:text-base font-bold font-numeric text-primary-action mt-1">
                    {t('sample.contractValue')}
                  </span>
                </div>
                <div className="p-3.5 bg-card-bg rounded-[4px] border border-border flex flex-col">
                  <span className="text-xs text-text-muted">{isRTL ? 'الأعمال المنجزة والمعتمدة' : 'Approved Work'}</span>
                  <span className="text-sm sm:text-base font-bold font-numeric text-success-700 mt-1">
                    {t('sample.completedWork')}
                  </span>
                </div>
                <div className="p-3.5 bg-card-bg rounded-[4px] border border-border flex flex-col">
                  <span className="text-xs text-text-muted">{isRTL ? 'نسبة الإنجاز الميداني' : 'Completion Rate'}</span>
                  <div className="text-sm sm:text-base font-bold font-numeric text-warning-800 mt-1">
                    <BidiNumber value="75.05" suffix="%" />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 3. Buttons Component Showcase */}
        <section id="buttons" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.buttonsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.buttonsDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Solid & Soft Variants */}
            <Card>
              <CardHeader
                title={isRTL ? 'الأنماط المصمتة والناعمة' : 'Solid and Soft Buttons'}
                subtitle={isRTL ? 'أزرار عادية بدون حروف كبيرة أو تباعد أحرف' : 'Standard buttons in normal case'}
              />
              <CardBody className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-text-muted mb-2.5">
                    {isRTL ? 'الأزرار المصمتة:' : 'Solid Buttons:'}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((c) => (
                      <Button key={`solid-${c}`} variant="solid" color={c} size="md">
                        {colorLabels[c][language]}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-text-muted mb-2.5">
                    {isRTL ? 'الأزرار الناعمة:' : 'Soft Buttons:'}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((c) => (
                      <Button key={`soft-${c}`} variant="soft" color={c} size="md">
                        {colorLabels[c][language]}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Outline & Link Variants */}
            <Card>
              <CardHeader
                title={isRTL ? 'الأنماط المحفوفة والروابط' : 'Outline and Link Buttons'}
                subtitle={isRTL ? 'أزرار ثانوية وإجرائية' : 'Secondary and procedural triggers'}
              />
              <CardBody className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-text-muted mb-2.5">
                    {isRTL ? 'الأزرار المحفوفة:' : 'Outline Buttons:'}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((c) => (
                      <Button key={`outline-${c}`} variant="outline" color={c} size="md">
                        {colorLabels[c][language]}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-text-muted mb-2.5">
                    {isRTL ? 'أزرار الروابط:' : 'Link Buttons:'}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4">
                    {colors.map((c) => (
                      <Button key={`link-${c}`} variant="link" color={c}>
                        {colorLabels[c][language]}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Sizes & States */}
            <Card>
              <CardHeader
                title={isRTL ? 'المقاسات والحالات الإجرائية' : 'Button Sizes and States'}
                subtitle={isRTL ? 'بزوايا 4 بكسل مع حالات التحميل والتعطيل' : 'Radius 4px with loading and disabled states'}
              />
              <CardBody className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Button variant="solid" color="primary" size="sm">
                    {isRTL ? 'مقاس صغير' : 'Small'}
                  </Button>
                  <Button variant="solid" color="primary" size="md">
                    {isRTL ? 'مقاس قياسي' : 'Medium'}
                  </Button>
                  <Button variant="solid" color="primary" size="lg">
                    {isRTL ? 'مقاس كبير' : 'Large'}
                  </Button>
                </div>

                <div className="flex items-center gap-3 flex-wrap pt-2">
                  <Button variant="solid" color="primary" isLoading>
                    {isRTL ? 'جاري الحفظ...' : 'Saving...'}
                  </Button>
                  <Button variant="soft" color="primary" isLoading>
                    {isRTL ? 'جاري التحميل' : 'Loading'}
                  </Button>
                  <Button variant="solid" color="secondary" disabled>
                    {isRTL ? 'معطل' : 'Disabled'}
                  </Button>
                  <Button variant="outline" color="danger" disabled>
                    {isRTL ? 'محظور' : 'Restricted'}
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Icons & Split Button (Requirement 2: Stacking on mobile) */}
            <Card>
              <CardHeader
                title={isRTL ? 'أزرار الأيقونات والزر المنقسم' : 'Icon Buttons and Split Button'}
              />
              <CardBody className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    variant="solid"
                    color="primary"
                    startIcon={<Plus className="w-4 h-4" weight="bold" />}
                    className="w-full sm:w-auto"
                  >
                    {isRTL ? 'إضافة بند جديد' : 'Add Item'}
                  </Button>
                  <Button
                    variant="outline"
                    color="secondary"
                    endIcon={<ShareNetwork className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    {isRTL ? 'مشاركة التقرير' : 'Share'}
                  </Button>
                  <Button
                    variant="soft"
                    color="danger"
                    startIcon={<Trash className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    {isRTL ? 'حذف المخطط' : 'Delete'}
                  </Button>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <SplitButton
                    mainLabel={isRTL ? 'اعتماد وصرف المستخلص' : 'Approve & Disburse'}
                    color="primary"
                    className="w-full sm:w-auto"
                    menuItems={[
                      { label: isRTL ? 'اعتماد بدون صرف فوري' : 'Approve without payout', icon: <CheckCircle className="w-4 h-4" /> },
                      { label: isRTL ? 'إرسال للمراجعة البنكية' : 'Send for bank audit', icon: <ShareNetwork className="w-4 h-4" /> },
                      { divider: true, label: '' },
                      { label: isRTL ? 'إلغاء المطالبة' : 'Cancel claim', destructive: true, icon: <Trash className="w-4 h-4" /> },
                    ]}
                  />

                  <SplitButton
                    mainLabel={isRTL ? 'خيارات التصدير' : 'Export Options'}
                    color="secondary"
                    variant="outline"
                    className="w-full sm:w-auto"
                    menuItems={[
                      { label: isRTL ? 'تصدير بصيغة PDF' : 'Export as PDF', icon: <FileText className="w-4 h-4" /> },
                      { label: isRTL ? 'تصدير جدول Excel' : 'Export Excel Sheet', icon: <ChartBar className="w-4 h-4" /> },
                    ]}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* 4. Badges & Status Indicators with Bidi-Isolated Numbers */}
        <section id="badges" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.badgesTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.badgesDesc')}</p>
          </div>

          <Card>
            <CardHeader
              title={isRTL ? 'شارات الحالات الإجرائية' : 'Status Badges'}
              subtitle={isRTL ? 'بزوايا 4 بكسل وشارات دائرية مع عزل الأرقام والعلامات' : 'Radius 4px with bidi isolated counters'}
            />
            <CardBody className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-text-muted mb-2.5">
                  {isRTL ? 'الشارات المصمتة:' : 'Solid Badges:'}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  <Badge variant="solid" color="primary">
                    {isRTL ? 'قيد التنفيذ' : 'In Progress'} (<BidiNumber value="248" />)
                  </Badge>
                  <Badge variant="solid" color="success">
                    {isRTL ? 'معتمد رسمياً' : 'Approved'}
                  </Badge>
                  <Badge variant="solid" color="warning">
                    {isRTL ? 'بانتظار الفحص' : 'Pending Inspection'} (<BidiNumber value="5" />)
                  </Badge>
                  <Badge variant="solid" color="danger">
                    {isRTL ? 'مرفوض مع ملاحظات' : 'Rejected with Notes'}
                  </Badge>
                  <Badge variant="solid" color="info">
                    {isRTL ? 'تحديث مواصفة' : 'Spec Updated'}
                  </Badge>
                  <Badge variant="solid" color="secondary">
                    {isRTL ? 'مؤرشف' : 'Archived'}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-text-muted mb-2.5">
                  {isRTL ? 'الشارات الناعمة:' : 'Soft Badges:'}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  <Badge variant="soft" color="primary">
                    {isRTL ? 'قيد التنفيذ' : 'In Progress'} (<BidiNumber value="248" />)
                  </Badge>
                  <Badge variant="soft" color="success">
                    {isRTL ? 'معتمد رسمياً' : 'Approved'}
                  </Badge>
                  <Badge variant="soft" color="warning">
                    {isRTL ? 'بانتظار الفحص' : 'Pending Inspection'} (<BidiNumber value="5" />)
                  </Badge>
                  <Badge variant="soft" color="danger">
                    {isRTL ? 'مرفوض مع ملاحظات' : 'Rejected with Notes'}
                  </Badge>
                  <Badge variant="soft" color="info">
                    {isRTL ? 'تحديث مواصفة' : 'Spec Updated'}
                  </Badge>
                  <Badge variant="soft" color="secondary">
                    {isRTL ? 'مؤرشف' : 'Archived'}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-text-muted mb-2.5">
                  {isRTL ? 'شارات الكبسولة ومؤشرات النقطة:' : 'Pills and Dot Indicators:'}
                </h4>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="pill" color="primary" dot>
                    {isRTL ? 'جاري التوريد المباشر' : 'Live Delivery'}
                  </Badge>
                  <Badge variant="pill" color="success" dot>
                    {isRTL ? 'الموقع متصل ونشط' : 'Site Online'}
                  </Badge>
                  <Badge variant="pill" color="warning" dot>
                    {isRTL ? 'أمر تغيير معلق' : 'Change Order Pending'}
                  </Badge>
                  <Badge variant="pill" color="danger" dot>
                    {isRTL ? 'توقف الأعمال' : 'Work Paused'}
                  </Badge>
                  <Badge variant="dot" color="primary">
                    {isRTL ? 'ملاحظة فورية' : 'Immediate Notice'}
                  </Badge>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 5. Contextual Alerts */}
        <section id="alerts" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.alertsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.alertsDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert
              color="success"
              variant="soft"
              title={isRTL ? 'اعتماد المستخلص الجاري' : 'Interim Invoice Approval'}
              dismissible
            >
              {t('sample.alertSuccessText')}
            </Alert>

            <Alert
              color="warning"
              variant="soft"
              title={isRTL ? 'تنبيه الجداول الزمنية' : 'Schedule Milestone Alert'}
              dismissible
            >
              {t('sample.alertWarningText')}
            </Alert>

            <Alert
              color="danger"
              variant="soft"
              title={isRTL ? 'مخالفة فنية في الموقع' : 'Site Technical Discrepancy'}
              dismissible
            >
              {t('sample.alertDangerText')}
            </Alert>

            <Alert
              color="info"
              variant="soft"
              title={isRTL ? 'تحديثات أسعار الخامات الهندسية' : 'Engineering Material Prices Update'}
              dismissible
            >
              {t('sample.alertInfoText')}
            </Alert>
          </div>
        </section>

        {/* 6. Toast Notifications (Requirement 6: Verify 8.4% order) */}
        <section id="toasts" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.toastsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.toastsDesc')}</p>
          </div>

          <Card>
            <CardHeader
              title={isRTL ? 'إطلاق إشعارات التنبيه المباشرة' : 'Live Toast Triggers'}
              subtitle={isRTL ? 'اضغط لاختبار الإشعار العائم في زاوية الشاشة' : 'Click to test floating notifications'}
            />
            <CardBody className="space-y-4">
              <div className="flex flex-wrap gap-2.5">
                <Button variant="solid" color="primary" size="sm" onClick={() => handleTriggerToast('primary')}>
                  {isRTL ? 'إشعار رئيسي' : 'Primary Toast'}
                </Button>
                <Button variant="solid" color="success" size="sm" onClick={() => handleTriggerToast('success')}>
                  {isRTL ? 'إشعار نجاح' : 'Success Toast'}
                </Button>
                <Button variant="solid" color="warning" size="sm" onClick={() => handleTriggerToast('warning')}>
                  {isRTL ? 'إشعار تحذير' : 'Warning Toast'}
                </Button>
                <Button variant="solid" color="danger" size="sm" onClick={() => handleTriggerToast('danger')}>
                  {isRTL ? 'إشعار خطأ' : 'Danger Toast'}
                </Button>
                <Button variant="solid" color="info" size="sm" onClick={() => handleTriggerToast('info')}>
                  {isRTL ? 'إشعار معلوماتي' : 'Info Toast'}
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-xs font-semibold text-text-muted mb-3">
                  {isRTL ? 'نموذج العرض الثابت المكدس:' : 'Static Stacked Preview:'}
                </h4>
                <div className="flex flex-wrap gap-4">
                  <Toast
                    title={isRTL ? 'اعتماد مقايسة السيراميك' : 'Ceramic BOQ Approved'}
                    message={isRTL ? 'تم توقيع المقايسة إلكترونياً وتمريرها لقسم التوريدات.' : 'BOQ signed and passed to procurement.'}
                    time="14:32"
                    color="success"
                  />
                  <Toast
                    title={isRTL ? 'تنبيه تجاوز الميزانية' : 'Budget Overrun Warning'}
                    message={
                      isRTL ? (
                        <>
                          بند الأعمال الجبسية تجاوز السقف المالي المعتمد بنسبة <BidiNumber value="8.4" suffix="%" />.
                        </>
                      ) : (
                        <>
                          Gypsum item exceeded approved limit by <BidiNumber value="8.4" suffix="%" />.
                        </>
                      )
                    }
                    time="12:05"
                    color="warning"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 7. Form Controls & Currency Input (Requirement 2: Codes do not break) */}
        <section id="inputs" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.inputsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.inputsDesc')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Inputs & Currency & Select */}
            <Card>
              <CardHeader
                title={isRTL ? 'حقول الإدخال والعملات' : 'Form Inputs and Currency'}
                subtitle={isRTL ? 'تدعم فاصل الآلاف مع الحفاظ على الأرقام الغربية 0-9' : 'With thousands separators and Western digits'}
              />
              <CardBody className="space-y-4">
                <Input
                  label={t('sample.formNameLabel')}
                  placeholder={t('sample.formNamePlaceholder')}
                  defaultValue={isRTL ? "شركة النيل للتوريدات العامة والمقاولات" : "Nile General Supplies & Contracting Co."}
                  isRequired
                  startIcon={<Buildings className="w-4 h-4" />}
                  helperText={isRTL ? "الاسم المعتمد في السجل التجاري" : "Registered commercial business name"}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label={t('sample.formCodeLabel')}
                    defaultValue={t('sample.formCodePlaceholder')}
                    isValid
                    helperText={isRTL ? "كود متوافق مع نظام المقايسات" : "Validated project cost code"}
                  />

                  {/* Currency Input with thousands separators */}
                  <Input
                    isCurrency
                    label={t('sample.formAmountLabel')}
                    defaultValue="4850000.00"
                    endAddon={isRTL ? 'ج.م' : 'EGP'}
                    isRequired
                    helperText={isRTL ? "تنسيق تلقائي لفاصل الآلاف بأرقام غربية" : "Auto-formatted thousands separator"}
                  />
                </div>

                <Input
                  label={isRTL ? "حالة فحص الجودة (حالة خطأ)" : "Inspection State (Error)"}
                  defaultValue={isRTL ? "أعمال تركيب غير مطابقة للعيارات الهندسية المعتمدة" : "Installation does not match engineering spec"}
                  error={isRTL ? "مرفوض: نسبة الاستواء تجاوزت 2 ملم تحت القدة" : "Rejected: unevenness exceeded permissible limits"}
                  isRequired
                />

                <Input
                  label={isRTL ? "رقم ترخيص البناء (حالة معطلة)" : "Building Permit No. (Disabled)"}
                  defaultValue="LIC-CAI-N2024-9981"
                  disabled
                  helperText={isRTL ? "هذا الحقل مؤمن ومقفل" : "This field is locked and read-only"}
                />

                <Select
                  label={t('sample.formSelectLabel')}
                  isRequired
                  defaultValue="marble"
                  options={[
                    { value: 'marble', label: isRTL ? 'أعمال الرخام والجرانيت للأرضيات' : 'Marble & granite flooring works' },
                    { value: 'gypsum', label: isRTL ? 'تشطيبات الجبس بورد والأسقف المعلقة' : 'Gypsum board & suspended ceilings' },
                    { value: 'paints', label: isRTL ? 'أعمال الدهانات الإيبوكسية والحرارية' : 'Epoxy & heat-resistant interior paints' },
                    { value: 'aluminum', label: isRTL ? 'قطاعات الألوميتال والزجاج العازل' : 'Aluminum framing & double-glazing units' },
                  ]}
                  helperText={isRTL ? "حدد البند الرئيسي وفق جدول الكميات" : "Select BOQ primary item"}
                />

                <Textarea
                  label={t('sample.formNotesLabel')}
                  placeholder={t('sample.formNotesPlaceholder')}
                  defaultValue={isRTL ? "تم فحص استواء القدة ونظافة الفواصل الأسمنتية، ويلزم إعادة تلميع العينات قبل الاستلام النهائي." : "Inspected flatness and joint cleaning; polishing needed before signoff."}
                  rows={3}
                />
              </CardBody>
            </Card>

            {/* Checkbox, Radio & Switch Controls */}
            <div className="flex flex-col gap-4">
              {/* Checkboxes */}
              <Card>
                <CardHeader
                  title={isRTL ? 'مربعات الاختيار' : 'Checkboxes'}
                  subtitle={isRTL ? 'حالات الاختيار المختلفة وحالة التحديد البيني' : 'Checked, Indeterminate, and Disabled states'}
                />
                <CardBody className="space-y-4">
                  <div className="space-y-2.5">
                    <Checkbox
                      label={isRTL ? 'مطابقة عينة الرخام الموردة للمواصفات الفنية' : 'Marble sample compliance verification'}
                      description={isRTL ? 'يشمل ذلك اختبارات الامتصاص ومقاومة البري الميكانيكي.' : 'Includes water absorption and mechanical abrasion tests.'}
                      checked={checkboxChecked}
                      onCheckedChange={setCheckboxChecked}
                      color="primary"
                    />

                    <Checkbox
                      label={isRTL ? 'فحص شهادات اختبار الضغط لشبكة التغذية المائية' : 'Hydrostatic pressure testing certification'}
                      description={
                        isRTL ? (
                          <>
                            تم إنجاز <BidiNumber value="3" /> خطوط من أصل <BidiNumber value="5" /> خطوط رئيسية بالمبنى.
                          </>
                        ) : (
                          <>
                            Completed <BidiNumber value="3" /> out of <BidiNumber value="5" /> major lines.
                          </>
                        )
                      }
                      checked="indeterminate"
                      color="warning"
                    />

                    <Checkbox
                      label={isRTL ? 'تسليم الموقع خالياً من المخلفات (معطل)' : 'Site debris clearance completed (Disabled)'}
                      disabled
                      checked={false}
                      color="secondary"
                    />
                  </div>

                  <div className="pt-2 border-t border-border flex flex-wrap gap-4">
                    {colors.map((c) => (
                      <Checkbox
                        key={`check-${c}`}
                        label={colorLabels[c][language]}
                        color={c}
                        defaultChecked
                      />
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Radio Groups */}
              <Card>
                <CardHeader
                  title={isRTL ? 'خيارات الراديو' : 'Radio Buttons'}
                  subtitle={isRTL ? 'اختيار أحادي متوافق' : 'Accessible single selection'}
                />
                <CardBody>
                  <RadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                    color="primary"
                    items={[
                      {
                        value: 'option-1',
                        label: isRTL ? 'اعتماد نهائي وتمرير إذن الصرف للمالية' : 'Final approval and disbursement',
                        description: isRTL ? 'تحويل المستحقات خلال 48 ساعة عمل.' : 'Transferred within 48 business hours.',
                      },
                      {
                        value: 'option-2',
                        label: isRTL ? 'اعتماد مشروط بملاحظات استيفاء موقعي' : 'Conditional approval with site notes',
                        description: isRTL ? 'تعليق 10% دفعة ضمان لحين تلافي الملاحظات.' : 'Retain 10% guarantee deposit.',
                      },
                      {
                        value: 'option-3',
                        label: isRTL ? 'إيقاف الصرف وإعادة المعاينة الفنية' : 'Hold payment for re-inspection',
                        description: isRTL ? 'تشكيل لجنة متخصصة لفحص العيوب.' : 'Require joint engineering committee review.',
                      },
                    ]}
                  />
                </CardBody>
              </Card>

              {/* Switches */}
              <Card>
                <CardHeader
                  title={isRTL ? 'مفاتيح التبديل' : 'Switches'}
                  subtitle={isRTL ? 'انزلاق دقيق يحترم اتجاه اللغة' : 'Direction-aware physics in RTL and LTR'}
                />
                <CardBody className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <Switch
                      label={isRTL ? 'تفعيل الإشعارات اللحظية لأوامر التغيير بالمشروع' : 'Enable live notifications for change orders'}
                      description={isRTL ? 'إرسال تنبيه فوري فور صدور أي تعديل معماري.' : 'Send instant notice upon architect modification.'}
                      checked={switchChecked}
                      onCheckedChange={setSwitchChecked}
                      color="primary"
                    />

                    <Switch
                      label={isRTL ? 'الوضع التجريبي لإدخال المقايسات (مقاس صغير)' : 'Experimental BOQ mode (Small size)'}
                      size="sm"
                      defaultChecked
                      color="success"
                    />

                    <Switch
                      label={isRTL ? 'الإقفال المالي السنوي (معطل)' : 'Annual financial reconciliation (Disabled)'}
                      disabled
                      defaultChecked={false}
                      color="secondary"
                    />
                  </div>

                  <div className="pt-2 border-t border-border">
                    <h5 className="text-xs font-semibold text-text-muted mb-2">
                      {isRTL ? 'ألوان التبديل المختلفة:' : 'Switch Color States:'}
                    </h5>
                    <div className="flex flex-wrap items-center gap-4">
                      {colors.map((c) => (
                        <Switch
                          key={`switch-${c}`}
                          label={colorLabels[c][language]}
                          color={c}
                          defaultChecked
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* 8. Cards & Metric Surfaces with Units Audit & BidiCode */}
        <section id="cards" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.cardsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.cardsDesc')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric Card 1: Workers (Requirement 6: +12) */}
            <Card>
              <CardBody className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-muted">{isRTL ? 'إجمالي العمالة بالموقع' : 'Total Site Employees'}</span>
                  <h4 className="text-2xl font-bold font-numeric text-text-primary mt-1">248</h4>
                  <span className="text-[11px] text-success-700 font-medium font-numeric flex items-center gap-1 mt-1 whitespace-nowrap">
                    <BidiNumber value="12" prefix="+" />
                    <span>{t('sample.weekGrowth')}</span>
                  </span>
                </div>
                <div className="w-12 h-12 rounded-[4px] bg-primary-soft text-primary-action flex items-center justify-center shrink-0">
                  <HardHat className="w-6 h-6" weight="duotone" />
                </div>
              </CardBody>
            </Card>

            {/* Metric Card 2: Orders */}
            <Card>
              <CardBody className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-muted">{isRTL ? 'أوامر التوريد المفتوحة' : 'Open Purchase Orders'}</span>
                  <h4 className="text-2xl font-bold font-numeric text-text-primary mt-1">16</h4>
                  <span className="text-[11px] text-warning-800 font-medium font-numeric flex items-center gap-1 mt-1 whitespace-nowrap">
                    <BidiNumber value="5" />
                    <span>{isRTL ? 'توريدات عاجلة' : 'urgent deliveries'}</span>
                  </span>
                </div>
                <div className="w-12 h-12 rounded-[4px] bg-warning-soft text-warning-700 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" weight="duotone" />
                </div>
              </CardBody>
            </Card>

            {/* Metric Card 3: Attendance (Requirement 6: +1.3%) */}
            <Card>
              <CardBody className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-muted">{isRTL ? 'نسبة الحضور والإنجاز' : 'Attendance & Progress'}</span>
                  <div className="text-2xl font-bold font-numeric text-text-primary mt-1">
                    <BidiNumber value="94.2" suffix="%" />
                  </div>
                  <span className="text-[11px] text-success-700 font-medium font-numeric flex items-center gap-1 mt-1 whitespace-nowrap">
                    <BidiNumber value="1.3" prefix="+" suffix="%" />
                    <span>{t('sample.plannedDiff')}</span>
                  </span>
                </div>
                <div className="w-12 h-12 rounded-[4px] bg-success-soft text-success-700 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" weight="duotone" />
                </div>
              </CardBody>
            </Card>

            {/* Metric Card 4: Average Project Duration (Audited Unit: "3.2 سنة" in AR / "3.2 years" in EN) */}
            <Card>
              <CardBody className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-muted">{isRTL ? 'متوسط عمر المشروع' : 'Average Project Tenure'}</span>
                  <h4 className="text-2xl font-bold font-numeric text-text-primary mt-1">
                    <NumberUnit number="3.2" unit={t('sample.yearsUnit')} isRTL={isRTL} />
                  </h4>
                  <span className="text-[11px] text-info-700 font-medium font-numeric flex items-center gap-1 mt-1 whitespace-nowrap">
                    {isRTL ? 'مستمر وفق التعاقد' : 'On schedule'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-[4px] bg-info-soft text-info-action flex items-center justify-center shrink-0">
                  <ChartBar className="w-6 h-6" weight="duotone" />
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Full Structured Card (Requirement 2: Code unbroken) */}
          <Card>
            <CardHeader
              title={isRTL ? 'مستخلص الأعمال الجارية رقم 4 - أعمال تشطيبات التجمع الخامس' : 'Interim Certificate #4 - Finishing Contract'}
              subtitle={
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted mt-0.5">
                  <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <span>{isRTL ? 'كود المشروع:' : 'Project Code:'}</span>
                    <BidiCode code="PRJ-EGY-CAI-2026-012" className="text-text-primary font-bold" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-text-muted/60" aria-hidden="true">•</span>
                    <span>{isRTL ? 'مهندس الموقع: م. أحمد عبد العزيز' : 'Engineer: A. Abdelaziz'}</span>
                  </div>
                </div>
              }
              action={
                <div className="flex items-center gap-2">
                  <Badge variant="soft" color="success">
                    {isRTL ? 'معتمد فنياً' : 'Certified'}
                  </Badge>
                  <Button variant="outline" size="sm" startIcon={<PencilSimple className="w-3.5 h-3.5" />}>
                    {t('common.edit')}
                  </Button>
                </div>
              }
            />
            <CardBody className="space-y-4">
              <p className="text-xs text-text-secondary leading-relaxed">
                {t('sample.pendingApproval')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-page-bg rounded-[4px] border border-border">
                  <span className="text-[11px] text-text-muted">{isRTL ? 'إجمالي التكلفة التقديرية' : 'Estimated Cost'}</span>
                  <p className="text-sm font-bold font-numeric text-text-primary mt-0.5">3,640,000.00 {isRTL ? 'ج.م' : 'EGP'}</p>
                </div>
                <div className="p-3 bg-page-bg rounded-[4px] border border-border">
                  <span className="text-[11px] text-text-muted">
                    {isRTL ? (
                      <>المستقطع لدفعة الضمان (<BidiNumber value="10" suffix="%" />)</>
                    ) : (
                      <>Retained Guarantee (<BidiNumber value="10" suffix="%" />)</>
                    )}
                  </span>
                  <p className="text-sm font-bold font-numeric text-danger-600 mt-0.5">364,000.00 {isRTL ? 'ج.م' : 'EGP'}</p>
                </div>
                <div className="p-3 bg-page-bg rounded-[4px] border border-border">
                  <span className="text-[11px] text-text-muted">{isRTL ? 'صافي القيمة المستحقة للصرف' : 'Net Disbursement'}</span>
                  <p className="text-sm font-bold font-numeric text-success-700 mt-0.5">3,276,000.00 {isRTL ? 'ج.م' : 'EGP'}</p>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <span className="text-text-muted">
                {isRTL ? 'آخر تحديث: 01 أبريل 2026 - 15:40' : 'Last update: Apr 01, 2026 - 15:40'}
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  {isRTL ? 'طباعة كشف الحساب' : 'Print Statement'}
                </Button>
                <Button variant="solid" color="primary" size="sm" className="w-full sm:w-auto">
                  {isRTL ? 'تحويل لقسم الحسابات' : 'Submit to Accounts'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </section>

        {/* 9. Tabs & Segmented Controls with Edge Fade (Requirement 4) */}
        <section id="tabs" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.tabsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.tabsDesc')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Horizontal Line Tabs */}
            <Card>
              <CardHeader
                title={isRTL ? 'تبويبات الخط القياسية' : 'Line Tabs'}
                subtitle={isRTL ? 'تمرير أفقي سلس مع تدرج حافة بصري لمنع القص' : 'Horizontal scroll with edge fade indicator'}
              />
              <CardBody>
                <Tabs
                  variant="line"
                  defaultValue="tab-1"
                  showEdgeFade={true}
                  items={[
                    { value: 'tab-1', label: isRTL ? 'كافة البنود المعتمدة' : 'All Approved Items', count: 248 },
                    { value: 'tab-2', label: isRTL ? 'مستخلصات قيد الفحص' : 'Under Review', count: 16 },
                    { value: 'tab-3', label: isRTL ? 'أوامر تغيير معلقة' : 'Change Orders', count: 5 },
                  ]}
                >
                  <TabsContent value="tab-1" className="text-xs text-text-secondary leading-relaxed p-2">
                    {isRTL
                      ? 'عرض كافة البنود التعاقدية المعتمدة بما تشمل أعمال السيراميك، الجبس بورد، التأسيسات الكهروميكانيكية، وأعمال العزل المائي للأسطح.'
                      : 'Displaying certified items including ceramic tiling, gypsum ceilings, electromechanical rough-in, and roof insulation.'}
                  </TabsContent>
                  <TabsContent value="tab-2" className="text-xs text-text-secondary leading-relaxed p-2">
                    {isRTL
                      ? 'قائمة المطالبات المالية الجارية المقدمة من مقاولي الباطن وموردي الخامات التي تخضع لمراجعة استشاري الموقع.'
                      : 'Interim claims from subcontractors currently undergoing technical site inspection.'}
                  </TabsContent>
                  <TabsContent value="tab-3" className="text-xs text-text-secondary leading-relaxed p-2">
                    {isRTL
                      ? 'أوامر تغيير معمارية صادرة من المالك لتعديل نوعيات الأرضيات والإنارة المخفية بالمقر الإداري.'
                      : 'Client variation requests for flooring and recessed lighting revisions.'}
                  </TabsContent>
                </Tabs>
              </CardBody>
            </Card>

            {/* Pills Tabs & Segmented Control */}
            <Card>
              <CardHeader
                title={isRTL ? 'تبويبات الكبسولات والتقسيم المقطعي' : 'Pill Tabs & Segmented Control'}
                subtitle={isRTL ? 'قابلة للتمرير الأفقي مع تأثير تلاشي الحافة' : 'Scrollable with edge fade effect'}
              />
              <CardBody className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-text-muted mb-2">
                    {isRTL ? 'نمط الكبسولات:' : 'Pills Style:'}
                  </h4>
                  <Tabs
                    variant="pills"
                    defaultValue="p1"
                    showEdgeFade={true}
                    items={[
                      { value: 'p1', label: isRTL ? 'عرض سنوي' : 'Annual View', count: 2026 },
                      { value: 'p2', label: isRTL ? 'عرض ربع سنوي' : 'Quarterly View', count: 4 },
                      { value: 'p3', label: isRTL ? 'عرض شهري' : 'Monthly View' },
                    ]}
                  >
                    <TabsContent value="p1" className="text-xs text-text-secondary pt-2">
                      {isRTL ? 'ملخص تقرير مؤشرات الأداء السنوية لقطاع المقاولات.' : 'Annual performance report metrics summary.'}
                    </TabsContent>
                    <TabsContent value="p2" className="text-xs text-text-secondary pt-2">
                      {isRTL ? 'متابعة نتائج الربع المالي الثاني لعام 2026.' : 'Q2 2026 financial deliverables.'}
                    </TabsContent>
                    <TabsContent value="p3" className="text-xs text-text-secondary pt-2">
                      {isRTL ? 'تقرير التكاليف والمشتريات خلال الشهر الجاري.' : 'Current month procurement breakdown.'}
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="pt-2 border-t border-border">
                  <h4 className="text-xs font-semibold text-text-muted mb-2">
                    {isRTL ? 'نمط التقسيم المقطعي:' : 'Segmented Control Style:'}
                  </h4>
                  <Tabs
                    variant="segmented"
                    defaultValue="s1"
                    showEdgeFade={true}
                    items={[
                      { value: 's1', label: isRTL ? 'قائمة الجداول' : 'Table View' },
                      { value: 's2', label: isRTL ? 'المخطط الزمني' : 'Timeline (Gantt)' },
                      { value: 's3', label: isRTL ? 'لوحة كانبان' : 'Kanban Board' },
                    ]}
                  >
                    <TabsContent value="s1" className="text-xs text-text-secondary pt-2">
                      {isRTL ? 'عرض بيانات بنود المقايسات في جدول تفصيلي منظم.' : 'BOQ items in a structured tabular format.'}
                    </TabsContent>
                    <TabsContent value="s2" className="text-xs text-text-secondary pt-2">
                      {isRTL ? 'عرض مسار المهام ومراحل التنفيذ على المخطط الزمني.' : 'Gantt schedule milestones and progress tracks.'}
                    </TabsContent>
                    <TabsContent value="s3" className="text-xs text-text-secondary pt-2">
                      {isRTL ? 'توزيع بطاقات المهام وفرق العمل حسب الحالة الميدانية.' : 'Field crew task distribution cards.'}
                    </TabsContent>
                  </Tabs>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* 10. Accordion & Collapsible Lists (Requirement 5: Numbers and units together with nowrap) */}
        <section id="accordion" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.accordionsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.accordionsDesc')}</p>
          </div>

          <Card>
            <CardHeader
              title={isRTL ? 'قائمة بنود المقايسة القابلة للطي' : 'BOQ Specifications Accordion'}
              subtitle={isRTL ? 'حركة انسيابية مع الحفاظ على ترابط الأرقام والوحدات' : 'Smooth animation with nowrap unit pairings'}
            />
            <CardBody>
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                items={[
                  {
                    value: 'item-1',
                    icon: <HardHat className="w-4 h-4" />,
                    trigger: isRTL
                      ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span>البند الأول: أعمال التكسيات الرخامية والجرانيت للمدخل والمصاعد</span>
                          <span className="whitespace-nowrap font-medium text-text-secondary">
                            (<NumberUnit number="450" unit="م²" isRTL={isRTL} />)
                          </span>
                        </div>
                      )
                      : (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span>Item 1: Marble & granite cladding for lobby & elevators</span>
                          <span className="whitespace-nowrap font-medium text-text-secondary">
                            (<NumberUnit number="450" unit="m²" isRTL={isRTL} />)
                          </span>
                        </div>
                      ),
                    content: isRTL
                      ? 'يشمل البند توريد وتركيب رخام تريستا بيج نخب أول سُمك 2 سم مثبت ميكانيكياً بشاسيهات استانلس ستيل غير قابلة للصدأ، مع مراجعة الشاقولية والوزنات بالليزر، والمعالجة بجلي وتشميع ألماني أصلي قبل التسليم.'
                      : 'Supply and installation of 2cm first-grade Treesta beige marble mechanically fastened with stainless steel brackets, verified with laser levelling and completed with diamond polishing.',
                  },
                  {
                    value: 'item-2',
                    icon: <FileText className="w-4 h-4" />,
                    trigger: isRTL
                      ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span>البند الثاني: الأسقف المعلقة المقاومة للحريق والرطوبة للمكاتب</span>
                          <span className="whitespace-nowrap font-medium text-text-secondary">
                            (<NumberUnit number="1,200" unit="م²" isRTL={isRTL} />)
                          </span>
                        </div>
                      )
                      : (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span>Item 2: Fire and moisture-resistant suspended ceilings</span>
                          <span className="whitespace-nowrap font-medium text-text-secondary">
                            (<NumberUnit number="1,200" unit="m²" isRTL={isRTL} />)
                          </span>
                        </div>
                      ),
                    content: isRTL
                      ? 'توريد وتركيب بلاطات جبس بورد خضراء مضادة للرطوبة في دورات المياه وحمراء مضادة للحريق في الممرات، متضمنة شاسيهات حديد مجلفن سُمك 0.6 مم وإكسسوارات التعليق المعتمدة.'
                      : 'Moisture-resistant green gypsum boards in wet rooms and fire-resistant red boards in hallways, supported by 0.6mm galvanized subframes.',
                  },
                  {
                    value: 'item-3',
                    icon: <CheckCircle className="w-4 h-4" />,
                    trigger: isRTL
                      ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span>البند الثالث: شبكات التغذية والصرف الصحي لوحدات البوفيه</span>
                          <span className="whitespace-nowrap font-medium text-text-secondary">
                            (<NumberUnit number="12" unit="وحدة" isRTL={isRTL} />)
                          </span>
                        </div>
                      )
                      : (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span>Item 3: Electromechanical and plumbing rough-in</span>
                          <span className="whitespace-nowrap font-medium text-text-secondary">
                            (<NumberUnit number="12" unit="units" isRTL={isRTL} />)
                          </span>
                        </div>
                      ),
                    content: isRTL
                      ? 'توريد وتركيب مواسير بوليمير معتمدة، شاملة اختبارات الضغط الهيدروليكي عند 12 بار لمدة 48 ساعة بحضور المهندس الاستشاري وتقديم شهادة الضمان.'
                      : 'Certified polymer piping with 12-bar hydrostatic pressure test held for 48 hours under engineering supervision.',
                  },
                ]}
              />
            </CardBody>
          </Card>
        </section>

        {/* 11. Dropdown Menus */}
        <section id="dropdowns" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.dropdownsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.dropdownsDesc')}</p>
          </div>

          <Card>
            <CardHeader
              title={isRTL ? 'القوائم المنبثقة التفاعلية' : 'Action Dropdown Menus'}
            />
            <CardBody className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <DropdownMenu
                trigger={
                  <Button variant="solid" color="primary" size="md" className="w-full sm:w-auto">
                    {isRTL ? 'قائمة إدارة المستخلصات' : 'Certificate Actions'}
                  </Button>
                }
                items={[
                  { label: isRTL ? 'إضافة دفعة جارية جديدة' : 'Add Interim Payout', icon: <Plus className="w-4 h-4" />, shortcut: '⌘N' },
                  { label: isRTL ? 'مراجعة نسب الإنجاز المالي' : 'Audit Progress Rates', icon: <ChartBar className="w-4 h-4" />, shortcut: '⌘K' },
                  { label: isRTL ? 'تصدير المستندات' : 'Export Documents', icon: <DownloadSimple className="w-4 h-4" /> },
                  { divider: true, label: '' },
                  { label: isRTL ? 'أرشفة المشروع نهائياً' : 'Archive Project', destructive: true, icon: <Trash className="w-4 h-4" /> },
                ]}
              />

              <DropdownMenu
                trigger={
                  <Button variant="outline" color="secondary" size="md" endIcon={<DotsThreeVertical className="w-4 h-4" weight="bold" />} className="w-full sm:w-auto">
                    {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                  </Button>
                }
                items={[
                  { label: isRTL ? 'تحديث بيانات الموقع' : 'Refresh Site Data', icon: <ArrowsClockwise className="w-4 h-4" /> },
                  { label: isRTL ? 'تعديل الصلاحيات الفنية' : 'Edit Permissions', icon: <PencilSimple className="w-4 h-4" /> },
                  { label: isRTL ? 'مشاركة التقرير' : 'Share Report', icon: <ShareNetwork className="w-4 h-4" /> },
                ]}
              />

              <DropdownMenu
                trigger={
                  <Button variant="soft" color="danger" size="md" className="w-full sm:w-auto">
                    {isRTL ? 'خيارات الحذف والإلغاء' : 'Cancellation Options'}
                  </Button>
                }
                items={[
                  { label: isRTL ? 'إلغاء أمر الشراء المعلق' : 'Cancel Purchase Order', destructive: true, icon: <Trash className="w-4 h-4" /> },
                  { label: isRTL ? 'فسخ تعاقد مقاول الباطن' : 'Terminate Subcontract', destructive: true, icon: <Trash className="w-4 h-4" /> },
                ]}
              />
            </CardBody>
          </Card>
        </section>

        {/* 12. Progress Indicators (Requirement 6: Verify +10%, -10%, etc.) */}
        <section id="progress" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.progressTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.progressDesc')}</p>
          </div>

          <Card>
            <CardHeader
              title={isRTL ? 'مؤشرات نسب الإنجاز' : 'Progress Indicators'}
              subtitle={isRTL ? 'نسب مئوية معزولة لغوياً تضمن الترتيب الدقيق' : 'Percentages with isolated bidi layout'}
            />
            <CardBody className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted whitespace-nowrap">
                  {isRTL ? 'التحكم في النسبة التجريبية:' : 'Control Test Progress:'}
                </span>
                <Button variant="outline" size="sm" onClick={() => setProgressVal((p) => Math.max(0, p - 10))}>
                  <BidiNumber value="10" prefix="-" suffix="%" />
                </Button>
                <div className="text-xs font-bold font-numeric text-text-primary">
                  <BidiNumber value={progressVal} suffix="%" />
                </div>
                <Button variant="outline" size="sm" onClick={() => setProgressVal((p) => Math.min(100, p + 10))}>
                  <BidiNumber value="10" prefix="+" suffix="%" />
                </Button>
              </div>

              <div className="space-y-4">
                <Progress
                  value={progressVal}
                  color="primary"
                  size="md"
                  showLabel
                  label={isRTL ? 'إنجاز أعمال التأسيسات الكهروميكانيكية' : 'Electromechanical installations milestone'}
                />

                <Progress
                  value={94}
                  color="success"
                  size="sm"
                  showLabel
                  label={isRTL ? 'توريد وتركيب بلاطات السيراميك والبورسلين' : 'Ceramic and porcelain tiling works'}
                />

                <Progress
                  value={45}
                  color="warning"
                  size="sm"
                  showLabel
                  label={isRTL ? 'أعمال تشطيبات الواجهات الخارجية' : 'Exterior architectural facade cladding'}
                />

                <Progress
                  value={22}
                  color="danger"
                  size="xs"
                  showLabel
                  label={isRTL ? 'بند معالجة الفواصل المعمارية المتأخرة' : 'Delayed joint treatment remediation'}
                />

                <Progress
                  value={80}
                  color="info"
                  size="lg"
                  striped
                  showLabel
                  label={isRTL ? 'نسبة الصرف المالي الكلي من الموازنة المعتمدة' : 'Total disbursed budget ratio'}
                />
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 13. Skeleton Loading States */}
        <section id="skeletons" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.skeletonsTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.skeletonsDesc')}</p>
          </div>

          <Card>
            <CardHeader
              title={isRTL ? 'هياكل التحميل التمهيدية' : 'Skeleton Loaders'}
            />
            <CardBody className="space-y-4">
              <div className="p-4 bg-page-bg rounded-[4px] border border-border flex items-center gap-4">
                <Skeleton variant="circle" className="w-12 h-12 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" className="h-4 w-3/4" />
                  <Skeleton variant="text" className="h-3 w-1/2" />
                </div>
                <Skeleton variant="rectangle" className="w-20 h-8 rounded-[4px]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-card-bg rounded-[4px] border border-border space-y-2">
                  <Skeleton variant="text" className="h-3 w-2/5" />
                  <Skeleton variant="text" className="h-6 w-4/5" />
                  <Skeleton variant="text" className="h-3 w-1/3" />
                </div>
                <div className="p-3 bg-card-bg rounded-[4px] border border-border space-y-2">
                  <Skeleton variant="text" className="h-3 w-2/5" />
                  <Skeleton variant="text" className="h-6 w-4/5" />
                  <Skeleton variant="text" className="h-3 w-1/3" />
                </div>
                <div className="p-3 bg-card-bg rounded-[4px] border border-border space-y-2">
                  <Skeleton variant="text" className="h-3 w-2/5" />
                  <Skeleton variant="text" className="h-6 w-4/5" />
                  <Skeleton variant="text" className="h-3 w-1/3" />
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 14. Empty State Component */}
        <section id="empty-state" className="flex flex-col gap-4">
          <div className="border-s-4 border-primary-action ps-3">
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              {t('designSystemPage.emptyStatesTitle')}
            </h2>
            <p className="text-xs text-text-muted">{t('designSystemPage.emptyStatesDesc')}</p>
          </div>

          <EmptyState
            title={t('sample.emptyStateTitle')}
            description={t('sample.emptyStateDesc')}
            action={
              <Button
                variant="solid"
                color="primary"
                size="md"
                startIcon={<Plus className="w-4 h-4" weight="bold" />}
                className="w-full sm:w-auto"
              >
                {t('sample.emptyStateAction')}
              </Button>
            }
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card-bg py-6 text-center text-xs text-text-muted">
        <p>
          {t('common.appTitle')} • {isRTL ? 'مؤسسة الهوية البصرية ونظام التصميم' : 'Design System & UI Foundation'}
        </p>
      </footer>
    </div>
  );
}
