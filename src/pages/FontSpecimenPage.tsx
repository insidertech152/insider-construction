import React, { useState } from 'react';
import {
  TextT,
  ChartLineUp,
  Table as TableIcon,
  Bell,
  Sidebar as SidebarIcon,
  CheckCircle,
  Clock,
  ArrowRight,
  Translate,
} from '@phosphor-icons/react';
import { useTranslation } from '@/src/i18n/context';
import { PageHeader } from '@/src/components/ui/page-header';
import { Card, CardHeader, CardBody } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { cn } from '@/src/lib/utils';

interface FontOption {
  id: string;
  nameAr: string;
  nameEn: string;
  cssFamily: string;
  descriptionAr: string;
  descriptionEn: string;
}

const FONTS: FontOption[] = [
  {
    id: 'almarai',
    nameAr: 'المراعي (Almarai)',
    nameEn: 'Almarai',
    cssFamily: "'Almarai', sans-serif",
    descriptionAr: 'خط هندسي عربي حديث يتميز بالوضوح العالي في واجهات المستخدم وأنظمة البيانات.',
    descriptionEn: 'Modern geometric Arabic font with high legibility for ERP dashboards.',
  },
  {
    id: 'ibm',
    nameAr: 'آي بي إم بليكس (IBM Plex Sans Arabic)',
    nameEn: 'IBM Plex Sans Arabic',
    cssFamily: "'IBM Plex Sans Arabic', sans-serif",
    descriptionAr: 'خط تقني رصين من عائلة بليكس العالمية، متوازن ومثالي للأنظمة المعقدة.',
    descriptionEn: 'Rigorous technical sans-serif from the Plex family, optimized for enterprise apps.',
  },
  {
    id: 'readex',
    nameAr: 'ريديكس برو (Readex Pro)',
    nameEn: 'Readex Pro',
    cssFamily: "'Readex Pro', sans-serif",
    descriptionAr: 'خط مصمم خصيصاً لسهولة القراءة السريعة على الشاشات بمختلف الأحجام.',
    descriptionEn: 'Humanist sans designed for readability across digital interfaces and dense tables.',
  },
  {
    id: 'tajawal',
    nameAr: 'تجوال (Tajawal)',
    nameEn: 'Tajawal',
    cssFamily: "'Tajawal', sans-serif",
    descriptionAr: 'خط عصري رشيق ذو حضور دافئ وودود للأعمال والإنشاءات.',
    descriptionEn: 'Fluid modern sans with warm corporate character suited for construction & interiors.',
  },
  {
    id: 'noto',
    nameAr: 'نوتو سانس عربي (Noto Sans Arabic)',
    nameEn: 'Noto Sans Arabic',
    cssFamily: "'Noto Sans Arabic', sans-serif",
    descriptionAr: 'المعيار العالمي لدقة التشكيل وتناسق الحروف في المحتوى الرقمي.',
    descriptionEn: 'Google universal standard for typography balance and international compatibility.',
  },
  {
    id: 'site-font',
    nameAr: 'خط المنظومة الحالي (Site Font)',
    nameEn: 'Site Font (Current Tokens)',
    cssFamily: 'var(--font-sans)',
    descriptionAr: 'الخط النشط حالياً في المنظومة المطبق عبر توكنز CSS المتغيرة.',
    descriptionEn: 'Currently active token-mapped font in the ERP application shell.',
  },
];

const WEIGHTS = [
  { weight: 300, labelAr: 'خفيف (Light 300)', labelEn: 'Light (300)', className: 'font-light' },
  { weight: 400, labelAr: 'عادي (Regular 400)', labelEn: 'Regular (400)', className: 'font-normal' },
  { weight: 500, labelAr: 'متوسط (Medium 500)', labelEn: 'Medium (500)', className: 'font-medium' },
  { weight: 600, labelAr: 'شبه عريض (Semibold 600)', labelEn: 'Semibold (600)', className: 'font-semibold' },
  { weight: 700, labelAr: 'عريض (Bold 700)', labelEn: 'Bold (700)', className: 'font-bold' },
];

export function FontSpecimenPage() {
  const { language, isRTL, toggleLanguage } = useTranslation();
  const [selectedFontId, setSelectedFontId] = useState<string>('all');
  const [selectedWeight, setSelectedWeight] = useState<number | 'all'>('all');

  const displayedFonts =
    selectedFontId === 'all'
      ? FONTS
      : FONTS.filter((f) => f.id === selectedFontId);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={language === 'ar' ? 'معرض مقارنة الخطوط العربية' : 'Arabic Font Specimen & Comparison'}
        subtitle={
          language === 'ar'
            ? 'مقارنة حية جنباً إلى جنب لعائلات الخطوط العربية الخمس المعتمدة مع خط المنظومة عبر عينات فعلية وأوزان 300 إلى 700'
            : 'Side-by-side specimen comparison of 5 Arabic font families + site font across weights 300 to 700 with real ERP components'
        }
        breadcrumbs={[
          { label: language === 'ar' ? 'الرئيسية' : 'Home', href: '/reference-compare' },
          { label: language === 'ar' ? 'نظام التصميم' : 'Design System', href: '/design-system' },
          { label: language === 'ar' ? 'معرض الخطوط' : 'Font Specimen', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="h-9 px-3 rounded-sm border border-border bg-card-bg text-text-secondary hover:text-text-primary text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Translate className="w-4 h-4" />
              <span>{language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
            </button>
          </div>
        }
      />

      {/* Control Filters Toolbar */}
      <Card className="border-0 shadow-card bg-card-bg rounded-sm">
        <CardBody className="p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Font Selector Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-text-secondary">
              {language === 'ar' ? 'اختر الخط:' : 'Font:'}
            </span>
            <button
              type="button"
              onClick={() => setSelectedFontId('all')}
              className={cn(
                'h-8 px-3 rounded-sm text-xs font-medium transition-colors cursor-pointer',
                selectedFontId === 'all'
                  ? 'bg-primary-action text-white shadow-xs'
                  : 'bg-page-bg text-text-secondary hover:text-text-primary'
              )}
            >
              {language === 'ar' ? 'عرض الكل جنباً إلى جنب' : 'Show All Side-by-Side'}
            </button>
            {FONTS.map((font) => (
              <button
                key={font.id}
                type="button"
                onClick={() => setSelectedFontId(font.id)}
                className={cn(
                  'h-8 px-3 rounded-sm text-xs font-medium transition-colors cursor-pointer',
                  selectedFontId === font.id
                    ? 'bg-primary-action text-white shadow-xs'
                    : 'bg-page-bg text-text-secondary hover:text-text-primary'
                )}
              >
                {language === 'ar' ? font.nameAr : font.nameEn}
              </button>
            ))}
          </div>

          {/* Weight Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-text-secondary">
              {language === 'ar' ? 'الوزن:' : 'Weight:'}
            </span>
            <button
              type="button"
              onClick={() => setSelectedWeight('all')}
              className={cn(
                'h-7 px-2.5 rounded-sm text-xs font-medium transition-colors cursor-pointer',
                selectedWeight === 'all'
                  ? 'bg-secondary-800 text-white'
                  : 'bg-page-bg text-text-secondary hover:text-text-primary'
              )}
            >
              {language === 'ar' ? 'كل الأوزان' : 'All'}
            </button>
            {WEIGHTS.map((w) => (
              <button
                key={w.weight}
                type="button"
                onClick={() => setSelectedWeight(w.weight)}
                className={cn(
                  'h-7 px-2 rounded-sm text-xs font-numeric font-medium transition-colors cursor-pointer',
                  selectedWeight === w.weight
                    ? 'bg-secondary-800 text-white'
                    : 'bg-page-bg text-text-secondary hover:text-text-primary'
                )}
              >
                {w.weight}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Font Comparison Grid */}
      <div
        className={cn(
          'grid gap-6',
          selectedFontId === 'all' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
        )}
      >
        {displayedFonts.map((font) => (
          <FontSpecimenCard
            key={font.id}
            font={font}
            language={language}
            selectedWeight={selectedWeight}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Single Font Specimen Container
 * Renders:
 * 1. Font Header & Description
 * 2. Weight Scale Ladder (300 to 700)
 * 3. Stat Card (Real Sample 1)
 * 4. 4 Table Rows (Real Sample 2 with non-wrapping codes & neutral money cell)
 * 5. Notification Soft Card (Real Sample 3)
 * 6. 4 Sidebar Navigation Items (Real Sample 4)
 */
function FontSpecimenCard({
  font,
  language,
  selectedWeight,
}: {
  font: FontOption;
  language: 'ar' | 'en';
  selectedWeight: number | 'all';
}) {
  const fontStyle = { fontFamily: font.cssFamily };

  return (
    <Card className="border-0 shadow-card bg-card-bg rounded-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-border/40 bg-page-bg/40 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TextT className="w-5 h-5 text-primary-action" weight="bold" />
            <h3 className="text-base font-bold text-text-primary" style={fontStyle}>
              {language === 'ar' ? font.nameAr : font.nameEn}
            </h3>
          </div>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            {language === 'ar' ? font.descriptionAr : font.descriptionEn}
          </p>
        </div>

        <span className="text-[11px] font-mono font-numeric px-2 py-1 rounded bg-slate-100 text-slate-700 shrink-0">
          {font.id}
        </span>
      </div>

      <div className="p-5 space-y-6 flex-1" style={fontStyle}>
        {/* 1. Weight Ladder Specimen */}
        <div>
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
            {language === 'ar' ? 'تدرج الأوزان (Weights 300 - 700)' : 'Weight Ladder (300 - 700)'}
          </h4>
          <div className="space-y-2 p-3 bg-page-bg/40 rounded-sm">
            {WEIGHTS.filter((w) => selectedWeight === 'all' || selectedWeight === w.weight).map((w) => (
              <div key={w.weight} className="flex items-baseline justify-between gap-4 text-xs">
                <span className="text-[11px] font-mono text-text-muted w-28 shrink-0">
                  {w.weight} ({w.labelEn.split(' ')[0]})
                </span>
                <p
                  className={cn('flex-1 truncate text-text-primary', w.className)}
                  style={{ fontWeight: w.weight }}
                >
                  {language === 'ar'
                    ? 'منظومة التشطيبات والديكور للمقاولات 450,000 ج.م'
                    : 'Finishing & Interior Contracting ERP 450,000 EGP'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Real Sample 1: Stat Card */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
            <ChartLineUp className="w-4 h-4 text-primary-action" />
            <span>{language === 'ar' ? 'العينة 1: بطاقة المؤشرات (Stat Card)' : 'Sample 1: Stat Card'}</span>
          </div>

          <div className="p-4 bg-page-bg/70 rounded-sm border border-border/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-normal text-text-secondary">
                {language === 'ar' ? 'إجمالي تعاقدات الربع الحالي' : 'Total Q2 Active Contracts'}
              </span>
              <span className="text-[11px] font-numeric font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                +18.4%
              </span>
            </div>
            <div className="mt-2 text-2xl font-normal font-numeric tabular-nums text-text-primary">
              4,850,000 <span className="text-sm text-text-muted">{language === 'ar' ? 'ج.م' : 'EGP'}</span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">
              {language === 'ar'
                ? 'مقارنة بقيمة 4,100,000 ج.م في الربع السابق'
                : 'Compared to 4,100,000 EGP in previous quarter'}
            </p>
          </div>
        </div>

        {/* 3. Real Sample 2: 4 Table Rows */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
            <TableIcon className="w-4 h-4 text-primary-action" />
            <span>{language === 'ar' ? 'العينة 2: جدول بيانات (4 Table Rows)' : 'Sample 2: Table Rows'}</span>
          </div>

          <div className="border border-border/40 rounded-sm overflow-x-auto">
            <table className="w-full text-start border-collapse text-xs">
              <thead className="bg-[#F8FAFC] border-b border-border/40">
                <tr className="h-10">
                  <th className="py-2 px-3 text-start font-medium text-text-primary">
                    {language === 'ar' ? 'الكود' : 'Code'}
                  </th>
                  <th className="py-2 px-3 text-start font-medium text-text-primary">
                    {language === 'ar' ? 'المشروع' : 'Project'}
                  </th>
                  <th className="py-2 px-3 text-end font-medium text-text-primary">
                    {language === 'ar' ? 'التعاقد' : 'Value'}
                  </th>
                  <th className="py-2 px-3 text-start font-medium text-text-primary">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 bg-card-bg">
                {[
                  {
                    code: 'PRJ-2025-01',
                    nameAr: 'فيلا الياسمين - تشطيب مودرن',
                    nameEn: 'Al-Yasmeen Villa Modern',
                    val: '520,000 ج.م',
                    statusAr: 'قيد التنفيذ',
                    statusEn: 'In Progress',
                    statusColor: 'text-success-800',
                    dotColor: 'bg-success-500',
                  },
                  {
                    code: 'PRJ-2025-02',
                    nameAr: 'مقر شركة النماء للاستثمار',
                    nameEn: 'Al-Namaa HQ Offices',
                    val: '890,000 ج.م',
                    statusAr: 'قيد التنفيذ',
                    statusEn: 'In Progress',
                    statusColor: 'text-success-800',
                    dotColor: 'bg-success-500',
                  },
                  {
                    code: 'PRJ-2025-03',
                    nameAr: 'دوبلكس حي البنفسج 4',
                    nameEn: 'Al-Banafsaj Duplex 4',
                    val: '310,000 ج.م',
                    statusAr: 'مكتمل ومسلّم',
                    statusEn: 'Completed',
                    statusColor: 'text-primary-700',
                    dotColor: 'bg-primary-500',
                  },
                  {
                    code: 'PRJ-2025-04',
                    nameAr: 'سباكة وكهرباء كمبوند ميفيدا',
                    nameEn: 'Mivida Plumbing & MEP',
                    val: '450,000 ج.م',
                    statusAr: 'قيد الاعتماد',
                    statusEn: 'Pending',
                    statusColor: 'text-warning-900',
                    dotColor: 'bg-warning-500',
                  },
                ].map((row) => (
                  <tr key={row.code} className="h-11 hover:bg-page-bg/40">
                    <td className="py-2 px-3 whitespace-nowrap font-numeric font-normal text-gray-700">
                      <bdi dir="ltr">{row.code}</bdi>
                    </td>
                    <td className="py-2 px-3 font-normal text-text-primary truncate max-w-[140px]">
                      {language === 'ar' ? row.nameAr : row.nameEn}
                    </td>
                    <td className="py-2 px-3 text-end font-numeric tabular-nums font-normal text-gray-700 whitespace-nowrap">
                      {row.val}
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-normal', row.statusColor)}>
                        <span className={cn('w-2 h-2 rounded-full shrink-0', row.dotColor)} />
                        <span>{language === 'ar' ? row.statusAr : row.statusEn}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Real Sample 3: Notification Soft Card */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
            <Bell className="w-4 h-4 text-primary-action" />
            <span>{language === 'ar' ? 'العينة 3: إشعار سوفت كارد (Notification Card)' : 'Sample 3: Notification Card'}</span>
          </div>

          <div className="bg-[#F7F8FA] rounded-sm p-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" weight="light" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h5 className="text-[16px] font-normal text-gray-800 truncate">
                  {language === 'ar' ? 'اعتماد عينة الرخام الإيطالي' : 'Italian Marble Sample Approved'}
                </h5>
                <span className="text-[13px] text-gray-400 font-numeric shrink-0">
                  {language === 'ar' ? 'منذ 15 دقيقة' : '15 mins ago'}
                </span>
              </div>
              <p className="text-[14px] text-gray-600 leading-[1.6] mt-1">
                {language === 'ar'
                  ? 'تم اعتماد عينة رخام الكرارا لمشروع فيلا 402 - التجمع الخامس من قِبل الاستشاري العام.'
                  : 'Carrara marble sample approved for Villa 402 - New Cairo by supervising consultant.'}
              </p>
            </div>
          </div>
        </div>

        {/* 5. Real Sample 4: 4 Sidebar Navigation Items */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
            <SidebarIcon className="w-4 h-4 text-primary-action" />
            <span>{language === 'ar' ? 'العينة 4: عناصر القائمة الجانبية (4 Sidebar Items)' : 'Sample 4: Sidebar Items'}</span>
          </div>

          <div className="bg-sidebar-bg text-sidebar-text rounded-sm p-2 space-y-1">
            {/* Item 1: Inactive normal */}
            <div className="h-10 px-4 flex items-center justify-between text-[15px] font-normal text-sidebar-text hover:text-white rounded-sm">
              <span>{language === 'ar' ? 'لوحة التحكم والمتابعة' : 'Executive Dashboard'}</span>
              <span className="text-xs text-sidebar-muted">›</span>
            </div>

            {/* Item 2: Active parent (3px bar, medium 500, never 700) */}
            <div className="bg-black/[0.18] border-s-[3px] border-primary-action rounded-sm overflow-hidden">
              <div className="h-10 px-4 flex items-center justify-between text-[15px] font-medium text-white">
                <span>{language === 'ar' ? 'المشاريع والتعاقدات' : 'Contracts & Projects'}</span>
                <span className="text-xs text-sidebar-muted">ˇ</span>
              </div>
              {/* Sub-item leaf */}
              <div className="h-8 ps-8 pe-4 flex items-center justify-between text-[15px] font-medium text-sidebar-leaf-active">
                <span>{language === 'ar' ? 'عقود العملاء الجارية' : 'Client Contracts'}</span>
              </div>
            </div>

            {/* Item 3: Normal with badge */}
            <div className="h-10 px-4 flex items-center justify-between text-[15px] font-normal text-sidebar-text hover:text-white rounded-sm">
              <span>{language === 'ar' ? 'المقايسات وجداول الكميات' : 'BOQ Estimations'}</span>
              <span className="h-5 px-2 rounded-full bg-primary-action text-white text-[11px] font-bold font-numeric flex items-center justify-center">
                4
              </span>
            </div>

            {/* Item 4: Normal */}
            <div className="h-10 px-4 flex items-center justify-between text-[15px] font-normal text-sidebar-text hover:text-white rounded-sm">
              <span>{language === 'ar' ? 'المستخلصات والمالية' : 'Financial Certificates'}</span>
              <span className="text-xs text-sidebar-muted">›</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
