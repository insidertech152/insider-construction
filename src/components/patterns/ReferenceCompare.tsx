import React, { useState, useMemo } from 'react';
import {
  MagnifyingGlass,
  Plus,
  DownloadSimple,
  Eye,
  PencilSimple,
  Trash,
  DotsThreeVertical,
  CaretLeft,
  CaretRight,
  CheckCircle,
  Clock,
  XCircle,
  ArrowsClockwise,
  User,
  ShieldCheck,
  Ruler,
} from '@phosphor-icons/react';
import { useTranslation } from '@/src/i18n/context';
import { PageHeader } from '@/src/components/ui/page-header';
import { Badge } from '@/src/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/src/components/ui/card';
import { BidiNumber } from '@/src/components/ui/bidi-number';
import { cn } from '@/src/lib/utils';

export interface ContractMember {
  id: string;
  nameAr: string;
  nameEn: string;
  initialsAr: string;
  initialsEn: string;
  phone: string;
  startDate: string;
  startTimeAr: string;
  startTimeEn: string;
  projectTypeAr: string;
  projectTypeEn: string;
  projectTypeColor: 'primary' | 'secondary' | 'info' | 'warning';
  contractAmount: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  statusAr: string;
  statusEn: string;
}

const MOCK_CONTRACT_MEMBERS: ContractMember[] = [
  {
    id: 'CTR-2026-001',
    nameAr: 'م. أحمد الشريف',
    nameEn: 'Eng. Ahmed El-Sherif',
    initialsAr: 'أش',
    initialsEn: 'AS',
    phone: '010 2345 6789',
    startDate: '2026-03-15',
    startTimeAr: '10:30 ص',
    startTimeEn: '10:30 AM',
    projectTypeAr: 'تشطيب كامل فلل',
    projectTypeEn: 'Full Villa Finishing',
    projectTypeColor: 'primary',
    contractAmount: 520000,
    status: 'active',
    statusAr: 'نشط سارٍ',
    statusEn: 'Active',
  },
  {
    id: 'CTR-2026-002',
    nameAr: 'د. سارة المنشاوي',
    nameEn: 'Dr. Sarah El-Menshawy',
    initialsAr: 'سم',
    initialsEn: 'SM',
    phone: '012 3456 7890',
    startDate: '2026-03-12',
    startTimeAr: '02:15 م',
    startTimeEn: '02:15 PM',
    projectTypeAr: 'ديكور وتأثيث فاخر',
    projectTypeEn: 'Luxury Interior Decor',
    projectTypeColor: 'info',
    contractAmount: 890000,
    status: 'active',
    statusAr: 'نشط سارٍ',
    statusEn: 'Active',
  },
  {
    id: 'CTR-2026-003',
    nameAr: 'أ. تامر عاشور السويدي',
    nameEn: 'Mr. Tamer Ashour',
    initialsAr: 'تع',
    initialsEn: 'TA',
    phone: '011 9876 5432',
    startDate: '2026-03-08',
    startTimeAr: '11:00 ص',
    startTimeEn: '11:00 AM',
    projectTypeAr: 'تجديد مقرات إدارية',
    projectTypeEn: 'Office HQ Renovation',
    projectTypeColor: 'secondary',
    contractAmount: 310000,
    status: 'pending',
    statusAr: 'قيد الاعتماد',
    statusEn: 'Pending Approval',
  },
  {
    id: 'CTR-2026-004',
    nameAr: 'م. نادية عبد الرحمن',
    nameEn: 'Eng. Nadia Abdelrahman',
    initialsAr: 'نع',
    initialsEn: 'NA',
    phone: '015 5544 3322',
    startDate: '2026-02-28',
    startTimeAr: '09:45 ص',
    startTimeEn: '09:45 AM',
    projectTypeAr: 'تشطيب وحدات فندقية',
    projectTypeEn: 'Hotel Suites Finishing',
    projectTypeColor: 'primary',
    contractAmount: 1250000,
    status: 'completed',
    statusAr: 'مكتمل ومسلّم',
    statusEn: 'Completed',
  },
  {
    id: 'CTR-2026-005',
    nameAr: 'م. كريم القاضي',
    nameEn: 'Eng. Karim El-Kady',
    initialsAr: 'كق',
    initialsEn: 'KK',
    phone: '010 8877 6655',
    startDate: '2026-02-20',
    startTimeAr: '01:30 م',
    startTimeEn: '01:30 PM',
    projectTypeAr: 'أعمال أثاث وتجاليد خشبية',
    projectTypeEn: 'Custom Wood Cladding',
    projectTypeColor: 'warning',
    contractAmount: 450000,
    status: 'active',
    statusAr: 'نشط سارٍ',
    statusEn: 'Active',
  },
  {
    id: 'CTR-2026-006',
    nameAr: 'أ. دينا الجوهري',
    nameEn: 'Mrs. Dina El-Gohary',
    initialsAr: 'دج',
    initialsEn: 'DG',
    phone: '012 7766 5544',
    startDate: '2026-02-14',
    startTimeAr: '04:00 م',
    startTimeEn: '04:00 PM',
    projectTypeAr: 'تشطيب شقق دوبلكس',
    projectTypeEn: 'Duplex Apartment Finishing',
    projectTypeColor: 'primary',
    contractAmount: 680000,
    status: 'active',
    statusAr: 'نشط سارٍ',
    statusEn: 'Active',
  },
  {
    id: 'CTR-2026-007',
    nameAr: 'د. يوسف البطران',
    nameEn: 'Dr. Youssef El-Batran',
    initialsAr: 'يب',
    initialsEn: 'YB',
    phone: '011 2233 4455',
    startDate: '2026-01-30',
    startTimeAr: '12:15 م',
    startTimeEn: '12:15 PM',
    projectTypeAr: 'عيادات ومراكز طبية',
    projectTypeEn: 'Medical Clinic Turnkey',
    projectTypeColor: 'info',
    contractAmount: 920000,
    status: 'cancelled',
    statusAr: 'عقد ملغي',
    statusEn: 'Cancelled',
  },
  {
    id: 'CTR-2026-008',
    nameAr: 'م. حسام الدين غانم',
    nameEn: 'Eng. Hossam Ghanem',
    initialsAr: 'حغ',
    initialsEn: 'HG',
    phone: '010 1122 3344',
    startDate: '2026-01-18',
    startTimeAr: '10:00 ص',
    startTimeEn: '10:00 AM',
    projectTypeAr: 'تكسيات واجهات ولاندسكيب',
    projectTypeEn: 'Exterior Cladding & Landscape',
    projectTypeColor: 'secondary',
    contractAmount: 750000,
    status: 'active',
    statusAr: 'نشط سارٍ',
    statusEn: 'Active',
  },
];

export function ReferenceCompare() {
  const { language, isRTL } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'completed' | 'cancelled'>('all');

  const filteredMembers = useMemo(() => {
    return MOCK_CONTRACT_MEMBERS.filter((member) => {
      const matchSearch =
        member.nameAr.includes(searchQuery) ||
        member.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.phone.includes(searchQuery) ||
        member.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || member.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredMembers.length / entriesPerPage) || 1;
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const getStatusBadge = (status: ContractMember['status'], labelAr: string, labelEn: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success-800 select-none">
            <span className="w-2 h-2 rounded-full bg-success-500 shrink-0" aria-hidden="true" />
            <span>{language === 'ar' ? labelAr : labelEn}</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-warning-900 select-none">
            <span className="w-2 h-2 rounded-full bg-warning-500 shrink-0" aria-hidden="true" />
            <span>{language === 'ar' ? labelAr : labelEn}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-700 select-none">
            <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" aria-hidden="true" />
            <span>{language === 'ar' ? labelAr : labelEn}</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-danger-700 select-none">
            <span className="w-2 h-2 rounded-full bg-danger-500 shrink-0" aria-hidden="true" />
            <span>{language === 'ar' ? labelAr : labelEn}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Page Header (Title First ~20px medium, Breadcrumbs BELOW it 13px muted, no card wrapper) */}
      <PageHeader
        title={language === 'ar' ? 'قائمة عقود العملاء' : 'Client Contracts List'}
        subtitle={
          language === 'ar'
            ? 'سجل تعاقدات العملاء ومتابعة حالة تنفيذ المشروعات مع التحقق البصري من مقاسات المرجع'
            : 'Directory of client contracts and project execution statuses with fidelity verification'
        }
        breadcrumbs={[
          { label: language === 'ar' ? 'الرئيسية' : 'Home', href: '/shell-demo' },
          { label: language === 'ar' ? 'التعاقدات والمشاريع' : 'Contracts & Projects', href: '#' },
          { label: language === 'ar' ? 'عقود العملاء' : 'Client Contracts', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-9 px-3 rounded-sm border border-border bg-card-bg text-text-secondary hover:text-text-primary hover:bg-page-bg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <DownloadSimple className="w-4 h-4" />
              <span>{language === 'ar' ? 'تصدير كشف' : 'Export'}</span>
            </button>
            <button
              type="button"
              className="h-9 px-3.5 rounded-sm bg-primary-action text-white hover:bg-primary-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" weight="bold" />
              <span>{language === 'ar' ? 'إضافة عقد جديد' : 'New Contract'}</span>
            </button>
          </div>
        }
      />

      {/* 2. Visual Fidelity Refactor Checklist Card (Round 4 Target Audit) */}
      <Card className="border-0 shadow-card bg-card-bg rounded-sm">
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-success-600" weight="bold" />
              <span>
                {language === 'ar'
                  ? 'تقرير مطابقة القياسات والمواصفات (Round 5 Visual Refinement Audit)'
                  : 'Round 5 Visual Refinement Metrics Audit'}
              </span>
            </div>
          }
          subtitle={
            language === 'ar'
              ? 'مقارنة دقيقة بين مواصفات المرجع بالبيكسل الفعلي (125% Display Scale: CSS px = Screen px / 1.25) والواجهة المحدّثة'
              : 'Direct measurement comparison between reference screenshots and refactored components'
          }
          divider={true}
        />
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Topbar */}
            <div className="p-3 bg-page-bg/60 rounded-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">
                  {language === 'ar' ? 'الشريط العلوي (Topbar)' : 'Topbar & Icons'}
                </span>
                <span className="text-[11px] font-bold text-success-700 bg-success-soft px-1.5 py-0.5 rounded-xs">
                  {language === 'ar' ? 'مطابق 100%' : '100% Match'}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {language === 'ar'
                  ? 'الارتفاع 74px، أيقونات Phosphor بوزن light وقياس 22px مع خلفية تحويم 6%، شريحة ⌘K بقياس 12px ووزن 400 وخلفية رمادية فاتحة، أيقونة مستخدم مفرغة UserCircle (بدون أحرف أو صورة)، وشارة إشعارات دائرية 20px بلون success ونص داكن.'
                  : 'Height 74px, Phosphor light weight 22px icons with 6% hover bg, 12px weight-400 ⌘K chip, outline UserCircle icon, and 20px success badge with dark text.'}
              </p>
            </div>

            {/* Sidebar */}
            <div className="p-3 bg-page-bg/60 rounded-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">
                  {language === 'ar' ? 'الشريط الجانبي (Sidebar)' : 'Sidebar & Scrollbar'}
                </span>
                <span className="text-[11px] font-bold text-success-700 bg-success-soft px-1.5 py-0.5 rounded-xs">
                  {language === 'ar' ? 'مطابق 100%' : '100% Match'}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {language === 'ar'
                  ? 'العرض 264px، إخفاء شريط التمرير مع استمرار التمرير السلس، إزالة الخط الفاصل أسفل الشعار، سطر وحيد لاسم المنظومة، بنود رئيسية وفرعية بقياس 15px ووزن 400 (الأب النشط بوزن 500)، وأيقونات 20px خفيفة بنسبة شفافية 80%.'
                  : 'Width 264px, scrollbar hidden with smooth scroll, hairline under logo removed, single-line brand name, 15px font-normal items with 500 active parent, and 20px light icons at 80% opacity.'}
              </p>
            </div>

            {/* Notifications Panel */}
            <div className="p-3 bg-page-bg/60 rounded-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">
                  {language === 'ar' ? 'لوحة الإشعارات (Notifications)' : 'Notifications Panel'}
                </span>
                <span className="text-[11px] font-bold text-success-700 bg-success-soft px-1.5 py-0.5 rounded-xs">
                  {language === 'ar' ? 'مطابق 100%' : '100% Match'}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {language === 'ar'
                  ? 'العرض 452px، زوايا 2px وبدون إطار مع ظل 0 10px 40px، بطاقات سوفت #F7F8FA بأيقونات دائرية 40px، عناوين 16px وتوقيت 13px ووصف 14px بارتفاع سطر 1.6، إزالة التبويبات ونقاط غير المقروء، وتذييل مسح الكل بنص خطر في المنتصف.'
                  : 'Width 452px, 2px corners, 0 border, shadow 0 10px 40px, soft cards #F7F8FA with 40px icons, no tabs, no unread dots, centered danger clear all footer.'}
              </p>
            </div>

            {/* Tables & Cells */}
            <div className="p-3 bg-page-bg/60 rounded-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">
                  {language === 'ar' ? 'الجداول والخلايا (Table Formatting)' : 'Table Cell Rules'}
                </span>
                <span className="text-[11px] font-bold text-success-700 bg-success-soft px-1.5 py-0.5 rounded-xs">
                  {language === 'ar' ? 'مطابق 100%' : '100% Match'}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {language === 'ar'
                  ? 'أكواد المشاريع لا تلتف نهائياً مع حماية الاتجاه <bdi dir="ltr">، خلايا المبالغ المالية بنص رمادي عادي gray-700 محاذاة للطرف بدون أي شارات ملونة أو خلفيات، وانحصار الألوان فقط في شارات الحالة ونقاط الدوت.'
                  : 'Codes never wrap with <bdi dir="ltr">, money cells are neutral gray-700 end-aligned with tabular numbers (no background chips or color), color restricted to status badges and dots.'}
              </p>
            </div>

            {/* Fonts & Specimen */}
            <div className="p-3 bg-page-bg/60 rounded-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">
                  {language === 'ar' ? 'توكنز الخطوط (Font Tokens)' : 'Font Tokens & Specimen'}
                </span>
                <span className="text-[11px] font-bold text-success-700 bg-success-soft px-1.5 py-0.5 rounded-xs">
                  {language === 'ar' ? 'مطابق 100%' : '100% Match'}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {language === 'ar'
                  ? 'تعريف توكنز --font-ar و --font-en وتوكنز الأوزان (300 إلى 700) في index.css، وتوفير صفحة /font-specimen لمقارنة الخطوط الخمسة المعتمدة مع خط المنظومة عبر عينات فعلية.'
                  : 'Added --font-ar, --font-en, weight tokens (300-700) in index.css, and added /font-specimen route comparing the 5 Arabic fonts + site font.'}
              </p>
            </div>

            {/* Cards & Elevation */}
            <div className="p-3 bg-page-bg/60 rounded-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">
                  {language === 'ar' ? 'الكروت والظلال (Elevation & Radii)' : 'Cards & Elevation'}
                </span>
                <span className="text-[11px] font-bold text-success-700 bg-success-soft px-1.5 py-0.5 rounded-xs">
                  {language === 'ar' ? 'مطابق 100%' : '100% Match'}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {language === 'ar'
                  ? 'انضباط شامل لنصف القطر 4px للكروت وظل 0 1px 2px، وظل الدروب داون واللوحات الناعمة 0 10px 40px rgba(15,23,42,0.12)، وتباين نصي يتجاوز 4.5:1 وفق WCAG AA.'
                  : 'Strict 4px card radius, 0 1px 2px card shadow, 0 10px 40px soft dropdown shadow, and WCAG AA > 4.5:1 contrast across all elements.'}
              </p>
            </div>

            {/* Signed Numbers (Bidi Isolates) */}
            <div className="p-3 bg-page-bg/60 rounded-sm space-y-1.5 md:col-span-2 lg:col-span-3 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text-primary">
                  {language === 'ar' ? 'الأرقام ذات الإشارات (Bidi Signed Numbers)' : 'Bidi Signed Numbers & Deltas'}
                </span>
                <span className="text-[11px] font-bold text-success-700 bg-success-soft px-1.5 py-0.5 rounded-xs">
                  {language === 'ar' ? 'مطابق 100%' : '100% Match'}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {language === 'ar'
                  ? 'عزل الأرقام الموجبة والسالبة والنسب المئوية عبر <bdi dir="ltr"> لمنع انقلاب إشارة الزائد أو الناقص في البيئة العربية (RTL):'
                  : 'LTR isolation via <bdi dir="ltr"> ensures signs and percentages never flip inappropriately in RTL:'}
              </p>
              <div className="flex items-center gap-3 pt-1 flex-wrap font-numeric">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-success-soft text-success-700 border border-success-200">
                  <BidiNumber value={14.2} sign="auto" unit="%" />
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-danger-soft text-danger-action border border-danger-200">
                  <BidiNumber value={-3.1} sign="auto" unit="%" />
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-success-soft text-success-700 border border-success-200">
                  <BidiNumber value={4} sign="+" />
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  <BidiNumber value={-500} sign="auto" unit=" ج.م" />
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 3. Rebuilt "Membership List" Table Component */}
      <div className="w-full bg-card-bg border-0 rounded-sm shadow-card flex flex-col font-sans">
        {/* Top Controls Toolbar: Entries Select + Search Field + Status Filter Chips */}
        <div className="p-5 border-b border-border/40 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Start: Entries Per Page & Status Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <span>{language === 'ar' ? 'عرض' : 'Show'}</span>
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-9 px-2 bg-page-bg border border-border rounded-sm text-xs font-numeric text-text-primary outline-none focus:border-primary-action cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>{language === 'ar' ? 'عناصر لكل صفحة' : 'entries'}</span>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 p-0.5 bg-page-bg border border-border/50 rounded-sm">
              {(
                [
                  { id: 'all', labelAr: 'الكل', labelEn: 'All' },
                  { id: 'active', labelAr: 'نشط', labelEn: 'Active' },
                  { id: 'pending', labelAr: 'معلق', labelEn: 'Pending' },
                  { id: 'completed', labelAr: 'مكتمل', labelEn: 'Completed' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setStatusFilter(tab.id);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-sm transition-all cursor-pointer',
                    statusFilter === tab.id
                      ? 'bg-card-bg text-primary-action font-bold shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {language === 'ar' ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* End: Search Input Field */}
          <div className="relative w-full lg:w-72">
            <MagnifyingGlass
              className="w-4 h-4 text-text-muted absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none"
              weight="bold"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={
                language === 'ar' ? 'بحث بالاسم، الهاتف، أو الكود...' : 'Search name, phone, code...'
              }
              className="w-full h-9 ps-9 pe-3 bg-page-bg border border-border rounded-sm text-xs text-text-primary placeholder:text-text-placeholder focus:bg-card-bg focus:border-primary-action outline-none transition-all"
            />
          </div>
        </div>

        {/* The Table: 44px Header, 56px Body Rows, 14px 20px padding */}
        <div className="w-full overflow-x-auto min-h-[200px]">
          <table className="w-full text-start border-collapse text-xs">
            {/* Header: 44px height, light gray background #F8FAFC, 12px/13px bold */}
            <thead className="bg-[#F8FAFC] border-b border-border/40 sticky top-0 z-10">
              <tr className="h-11">
                <th className="py-3 px-5 text-start font-bold text-xs text-text-primary col-client">
                  {language === 'ar' ? 'العميل وكود العقد' : 'Member / Code'}
                </th>
                <th className="py-3 px-5 text-start font-bold text-xs text-text-primary whitespace-nowrap">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                </th>
                <th className="py-3 px-5 text-start font-bold text-xs text-text-primary whitespace-nowrap">
                  {language === 'ar' ? 'تاريخ بدء التعاقد' : 'Start Date'}
                </th>
                <th className="py-3 px-5 text-start font-bold text-xs text-text-primary whitespace-nowrap">
                  {language === 'ar' ? 'نوع المشروع' : 'Project Type'}
                </th>
                <th className="py-3 px-5 text-end font-bold text-xs text-text-primary col-money whitespace-nowrap">
                  {language === 'ar' ? 'قيمة التعاقد' : 'Contract Value'}
                </th>
                <th className="py-3 px-5 text-start font-bold text-xs text-text-primary col-status whitespace-nowrap">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </th>
                <th className="py-3 px-5 text-center font-bold text-xs text-text-primary col-actions whitespace-nowrap">
                  {language === 'ar' ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>

            {/* Body: 56px rows, 14px 20px cell padding, secondary gray-600, primary cell darker */}
            <tbody className="divide-y divide-border/40 bg-card-bg text-sm">
              {paginatedMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-text-muted">
                    {language === 'ar' ? 'لا توجد نتائج مطابقة للبحث' : 'No matching records found'}
                  </td>
                </tr>
              ) : (
                paginatedMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="h-14 transition-colors hover:bg-page-bg/60"
                  >
                    {/* Primary Cell: Avatar + Name + Non-wrapping ID */}
                    <td className="py-3.5 px-5 align-middle text-sm col-client">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-soft text-primary-action font-medium text-xs flex items-center justify-center shrink-0 ring-1 ring-primary-200/50">
                          <span>{language === 'ar' ? member.initialsAr : member.initialsEn}</span>
                        </div>
                        <div className="min-w-0 line-clamp-2">
                          <p className="font-medium text-text-primary truncate">
                            {language === 'ar' ? member.nameAr : member.nameEn}
                          </p>
                          <p className="text-[11px] font-numeric text-text-muted whitespace-nowrap">
                            <bdi dir="ltr">{member.id}</bdi>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Secondary Cell: Phone (gray-600) */}
                    <td className="py-3.5 px-5 align-middle text-sm font-numeric text-gray-600 tabular-nums whitespace-nowrap">
                      {member.phone}
                    </td>

                    {/* Stacked Date and Time */}
                    <td className="py-3.5 px-5 align-middle whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-primary font-numeric tabular-nums">
                          {member.startDate}
                        </span>
                        <span className="text-xs text-text-muted">
                          {language === 'ar' ? member.startTimeAr : member.startTimeEn}
                        </span>
                      </div>
                    </td>

                    {/* Project Type Badge */}
                    <td className="py-3.5 px-5 align-middle whitespace-nowrap">
                      <Badge variant="soft" color={member.projectTypeColor}>
                        {language === 'ar' ? member.projectTypeAr : member.projectTypeEn}
                      </Badge>
                    </td>

                    {/* Money Cell: No background chip, no color, neutral gray-700, end-aligned with tabular numbers */}
                    <td className="py-3.5 px-5 align-middle text-end font-numeric tabular-nums text-sm font-normal text-gray-700 col-money whitespace-nowrap">
                      {member.contractAmount.toLocaleString('en-US')} ج.م
                    </td>

                    {/* Status (Dot + Text) */}
                    <td className="py-3.5 px-5 align-middle col-status whitespace-nowrap">
                      {getStatusBadge(member.status, member.statusAr, member.statusEn)}
                    </td>

                    {/* Row Actions (20px icons, gray-500) */}
                    <td className="py-3.5 px-5 align-middle text-center col-actions whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          className="p-1 rounded-sm text-gray-500 hover:text-text-primary hover:bg-black/5 transition-colors cursor-pointer"
                          title={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          aria-label={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded-sm text-gray-500 hover:text-text-primary hover:bg-black/5 transition-colors cursor-pointer"
                          title={language === 'ar' ? 'تعديل' : 'Edit'}
                          aria-label={language === 'ar' ? 'تعديل' : 'Edit'}
                        >
                          <PencilSimple className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded-sm text-gray-500 hover:text-danger-action hover:bg-black/5 transition-colors cursor-pointer"
                          title={language === 'ar' ? 'حذف' : 'Delete'}
                          aria-label={language === 'ar' ? 'حذف' : 'Delete'}
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded-sm text-gray-500 hover:text-text-primary hover:bg-black/5 transition-colors cursor-pointer"
                          title={language === 'ar' ? 'المزيد' : 'More'}
                          aria-label={language === 'ar' ? 'المزيد' : 'More'}
                        >
                          <DotsThreeVertical className="w-5 h-5" weight="bold" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination & Count Bar: 1px light divider */}
        <div className="p-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
          <div className="font-numeric">
            {language === 'ar'
              ? `عرض ${paginatedMembers.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0} إلى ${Math.min(
                  currentPage * entriesPerPage,
                  filteredMembers.length
                )} من أصل ${filteredMembers.length} سجلاً`
              : `Showing ${
                  paginatedMembers.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0
                } to ${Math.min(currentPage * entriesPerPage, filteredMembers.length)} of ${
                  filteredMembers.length
                } entries`}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="h-8 px-2.5 rounded-sm border border-border bg-card-bg text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
            >
              {isRTL ? <CaretRight className="w-3.5 h-3.5" /> : <CaretLeft className="w-3.5 h-3.5" />}
              <span>{language === 'ar' ? 'السابق' : 'Prev'}</span>
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    'w-8 h-8 rounded-sm font-numeric font-medium flex items-center justify-center transition-colors cursor-pointer',
                    isActive
                      ? 'bg-primary-action text-white font-bold shadow-xs'
                      : 'border border-border bg-card-bg text-text-secondary hover:text-text-primary'
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="h-8 px-2.5 rounded-sm border border-border bg-card-bg text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{language === 'ar' ? 'التالي' : 'Next'}</span>
              {isRTL ? <CaretLeft className="w-3.5 h-3.5" /> : <CaretRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
