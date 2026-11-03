import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Table,
  SquaresFour,
  ChartLineUp,
  Browser,
  Rows,
  Receipt,
  FileText,
  ShieldCheck,
  CheckCircle,
  WarningCircle,
  Clock,
  Plus,
  Trash,
  Eye,
  PencilSimple,
  DownloadSimple,
  SlidersHorizontal,
  CurrencyCircleDollar,
  Buildings,
  HardHat,
  ArrowsClockwise,
  Coins,
  Handshake,
  Check,
} from '@phosphor-icons/react';

import { AppShell } from '@/src/components/shell/AppShell';
import { useTranslation } from '@/src/i18n/context';
import { useRole } from '@/src/context/RoleContext';
import { UserRole, USER_ROLES } from '@/src/config/navigation';

import { DataTable, TableDensity, ExtendedColumnDef } from '@/src/components/patterns/DataTable';
import { EntityList, EntityItem } from '@/src/components/patterns/EntityList';
import { StatCard } from '@/src/components/patterns/StatCard';
import { SummaryCard } from '@/src/components/patterns/SummaryCard';
import { ListPageTemplate } from '@/src/components/patterns/ListPageTemplate';
import { ModalDialog, ConfirmDialog, Drawer } from '@/src/components/patterns/Dialogs';
import {
  FormField,
  FormActionBar,
  Stepper,
  DatePicker,
  FileUploader,
  CurrencyInput,
  UploadedFileItem,
} from '@/src/components/patterns/FormPatterns';
import {
  EditableItemsTable,
  BOQItem,
  formatPiastres,
} from '@/src/components/patterns/EditableItemsTable';
import { DocumentView } from '@/src/components/patterns/DocumentView';
import { PermissionGate } from '@/src/components/patterns/PermissionGate';
import { useToast } from '@/src/components/ui/toast';
import { cn } from '@/src/lib/utils';

// ==========================================
// Mock Data for Finishing & Decor Company (Egypt)
// ==========================================
interface ProjectContractRow {
  id: string;
  code: string;
  projectName: string;
  clientName: string;
  workType: string;
  location: string;
  costPiastres: number; // in piastres
  contractPiastres: number; // in piastres
  completionRate: number;
  status: 'active' | 'completed' | 'pending_payment' | 'suspended';
  statusAr: string;
  statusEn: string;
  startDate: string;
}

const MOCK_CONTRACTS: ProjectContractRow[] = [
  {
    id: 'pr-1',
    code: 'PRJ-2025-01',
    projectName: 'تشطيب فيلا الياسمين (مودرن فاخر)',
    clientName: 'م. أحمد حسني عبد المنعم',
    workType: 'تشطيب متكامل',
    location: 'القاهرة الجديدة - التجمع الأول',
    costPiastres: 34500000, // 345,000 EGP
    contractPiastres: 52000000, // 520,000 EGP
    completionRate: 85,
    status: 'active',
    statusAr: 'قيد التنفيذ',
    statusEn: 'In Progress',
    startDate: '2025-01-10',
  },
  {
    id: 'pr-2',
    code: 'PRJ-2025-02',
    projectName: 'تجهيز مقر شركة استشارات هندسية',
    clientName: 'شركة النماء للاستثمار',
    workType: 'أعمال ديكور ومكتبي',
    location: 'العاصمة الإدارية - الحي المالي',
    costPiastres: 58000000, // 580,000 EGP
    contractPiastres: 89000000, // 890,000 EGP
    completionRate: 60,
    status: 'active',
    statusAr: 'قيد التنفيذ',
    statusEn: 'In Progress',
    startDate: '2025-02-01',
  },
  {
    id: 'pr-3',
    code: 'PRJ-2025-03',
    projectName: 'تجديد دوبلكس حي البنفسج',
    clientName: 'د. سارة وجدي إبراهيم',
    workType: 'دهانات وأرضيات',
    location: 'التجمع الخامس - البنفسج 4',
    costPiastres: 19500000, // 195,000 EGP
    contractPiastres: 31000000, // 310,000 EGP
    completionRate: 100,
    status: 'completed',
    statusAr: 'مكتمل ومسلّم',
    statusEn: 'Completed',
    startDate: '2024-11-15',
  },
  {
    id: 'pr-4',
    code: 'PRJ-2025-04',
    projectName: 'أعمال سباكة وكهرباء كمبوند ميفيدا',
    clientName: 'أ. طارق عبد الرازق',
    workType: 'تأسيس بنية تحتية',
    location: 'التجمع الخامس - ميفيدا',
    costPiastres: 16000000, // 160,000 EGP
    contractPiastres: 24500000, // 245,000 EGP
    completionRate: 95,
    status: 'pending_payment',
    statusAr: 'بانتظار المستخلص',
    statusEn: 'Pending Certificate',
    startDate: '2025-01-20',
  },
  {
    id: 'pr-5',
    code: 'PRJ-2025-05',
    projectName: 'تشطيب واجهة وبنتهاوس بالم هيلز',
    clientName: 'م. شريف الكردي',
    workType: 'واجهات وبورسلين',
    location: 'مدينة 6 أكتوبر',
    costPiastres: 42000000, // 420,000 EGP
    contractPiastres: 65000000, // 650,000 EGP
    completionRate: 35,
    status: 'suspended',
    statusAr: 'معلق بطلب العميل',
    statusEn: 'Suspended',
    startDate: '2025-02-18',
  },
  {
    id: 'pr-6',
    code: 'PRJ-2025-06',
    projectName: 'تأسيس وتشطيب عيادة تخصصية',
    clientName: 'د. حازم القاضي',
    workType: 'عزل وأسقف وأرضيات طبية',
    location: 'المعادي - دجلة',
    costPiastres: 28000000, // 280,000 EGP
    contractPiastres: 44000000, // 440,000 EGP
    completionRate: 75,
    status: 'active',
    statusAr: 'قيد التنفيذ',
    statusEn: 'In Progress',
    startDate: '2025-03-01',
  },
];

// Entity list items mock
const MOCK_ENTITY_ITEMS: EntityItem[] = [
  {
    id: 'ent-1',
    name: 'فيلا الياسمين - تشطيب مودرن كامل',
    initials: 'يل',
    avatarBg: 'bg-primary-soft text-primary-action',
    secondaryInfo: {
      client: 'م. أحمد حسني',
      location: 'التجمع الأول - القاهرة الجديدة',
      date: '2025-04-12',
      amount: 520000,
      code: 'PRJ-01',
    },
    statusBadge: {
      label: 'قيد التنفيذ (85%)',
      variant: 'primary',
    },
  },
  {
    id: 'ent-2',
    name: 'مقر شركة النماء للاستثمار',
    initials: 'نم',
    avatarBg: 'bg-info-soft text-info-action',
    secondaryInfo: {
      client: 'شركة النماء',
      location: 'العاصمة الإدارية الجديدة',
      date: '2025-04-05',
      amount: 890000,
      code: 'PRJ-02',
    },
    statusBadge: {
      label: 'مستخلص جاري (60%)',
      variant: 'warning',
    },
  },
  {
    id: 'ent-3',
    name: 'دوبلكس حي البنفسج 4',
    initials: 'بن',
    avatarBg: 'bg-success-soft text-success-action',
    secondaryInfo: {
      client: 'د. سارة وجدي',
      location: 'التجمع الخامس',
      date: '2025-03-28',
      amount: 310000,
      code: 'PRJ-03',
    },
    statusBadge: {
      label: 'تم التسليم النهائي',
      variant: 'success',
    },
  },
  {
    id: 'ent-4',
    name: 'بنتهاوس كمبوند بالم هيلز',
    initials: 'به',
    avatarBg: 'bg-secondary-soft text-secondary-soft-text',
    secondaryInfo: {
      client: 'م. شريف الكردي',
      location: 'مدينة 6 أكتوبر',
      date: '2025-03-15',
      amount: 650000,
      code: 'PRJ-05',
    },
    statusBadge: {
      label: 'معلق بطلب العميل',
      variant: 'danger',
    },
  },
];

// Zod Schema for Pattern F Form
const projectFormSchema = z.object({
  clientName: z.string().min(3, { message: 'اسم العميل يجب ألا يقل عن 3 أحرف' }),
  projectTitle: z.string().min(5, { message: 'عنوان المشروع إلزامي (5 أحرف على الأقل)' }),
  workType: z.string().min(1, { message: 'يرجى اختيار نوع الأعمال' }),
  contractValue: z.number().min(1000, { message: 'قيمة العقد يجب ألا تقل عن 1,000 ج.م' }),
  expectedDays: z.number().min(1, { message: 'مدة التنفيذ يجب أن تكون يوماً واحداً على الأقل' }),
  startDate: z.string().min(1, { message: 'تاريخ بدء الأعمال إلزامي' }),
  siteNotes: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export function PatternsDemoPage() {
  const { language, isRTL } = useTranslation();
  const { activeRole, setRole, hasPermission } = useRole();
  const { addToast } = useToast();

  // Active Showcase Tab
  const [activeShowcaseSection, setActiveShowcaseSection] = useState<string>('all');

  // Pattern A DataTable state
  const [tableDensity, setTableDensity] = useState<TableDensity>('default');
  const [tableFilterChip, setTableFilterChip] = useState('all');
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState(false);
  const [tableEmpty, setTableEmpty] = useState(false);

  // Pattern E Dialogs state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSize, setDialogSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pattern F Form with React Hook Form + Zod
  const [formFiles, setFormFiles] = useState<UploadedFileItem[]>([
    { id: 'f-1', name: 'المخطط_المعماري_المعتمد.pdf', size: '4.2 MB', progress: 100 },
    { id: 'f-2', name: 'مقايسة_الكهرباء_والصحي.dwg', size: '12.8 MB', progress: 100 },
  ]);
  const [stepperStep, setStepperStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      clientName: 'م. أحمد حسني عبد المنعم',
      projectTitle: 'تشطيب فيلا الياسمين - التجمع الأول',
      workType: 'تشطيب متكامل',
      contractValue: 520000,
      expectedDays: 45,
      startDate: '2025-05-01',
      siteNotes: 'يرجى مراعاة عزل الحمامات واستخدام دهانات جوتن نصف لامع في الريسبشن.',
    },
  });

  const onFormSubmit = (data: ProjectFormValues) => {
    addToast({
      title: language === 'ar' ? 'تم حفظ النموذج بنجاح' : 'Form Saved Successfully',
      description: language === 'ar' ? `مشروع: ${data.projectTitle}` : `Project: ${data.projectTitle}`,
      variant: 'success',
    });
  };

  // Pattern A DataTable Column Definitions (Guarded by permission='view_cost' where applicable)
  const columns = useMemo<ExtendedColumnDef<ProjectContractRow>[]>(
    () => [
      {
        accessorKey: 'code',
        header: language === 'ar' ? 'كود المشروع' : 'Code',
        cell: ({ getValue }: any) => (
          <span className="font-numeric font-normal text-gray-700 whitespace-nowrap">
            <bdi dir="ltr">{String(getValue())}</bdi>
          </span>
        ),
      },
      {
        accessorKey: 'projectName',
        header: language === 'ar' ? 'اسم المشروع والموقع' : 'Project & Site',
        cell: ({ row }: any) => (
          <div>
            <p className="font-medium text-text-primary">{row.original.projectName}</p>
            <p className="text-[11px] text-text-muted mt-0.5">{row.original.location}</p>
          </div>
        ),
      },
      {
        accessorKey: 'clientName',
        header: language === 'ar' ? 'العميل' : 'Client',
      },
      {
        accessorKey: 'costPiastres',
        permission: 'view_cost', // ONLY owner and project_manager see this!
        header: language === 'ar' ? 'التكلفة المقدرة' : 'Est. Cost',
        isNumeric: true,
        cell: ({ getValue }: any) => (
          <span className="font-numeric tabular-nums text-end block text-gray-700 font-normal">
            {formatPiastres(getValue() as number)} ج.م
          </span>
        ),
      },
      {
        accessorKey: 'contractPiastres',
        header: language === 'ar' ? 'قيمة التعاقد' : 'Contract Value',
        isNumeric: true,
        cell: ({ getValue }: any) => (
          <span className="font-numeric tabular-nums text-end block text-gray-700 font-normal">
            {formatPiastres(getValue() as number)} ج.م
          </span>
        ),
      },
      {
        accessorKey: 'completionRate',
        header: language === 'ar' ? 'نسبة الإنجاز' : 'Progress',
        cell: ({ getValue }: any) => {
          const val = getValue() as number;
          return (
            <div className="flex items-center gap-2 min-w-[100px]">
              <div className="h-1.5 flex-1 bg-page-bg border border-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-action rounded-full"
                  style={{ width: `${val}%` }}
                />
              </div>
              <span className="font-numeric text-[11px] font-bold text-text-secondary">
                {val}%
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: language === 'ar' ? 'الحالة' : 'Status',
        cell: ({ row }: any) => {
          const st = row.original.status;
          const label = language === 'ar' ? row.original.statusAr : row.original.statusEn;
          switch (st) {
            case 'active':
              return (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-soft text-primary-action border border-primary-200">
                  {label}
                </span>
              );
            case 'completed':
              return (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-success-soft text-success-700 border border-success-200">
                  {label}
                </span>
              );
            case 'pending_payment':
              return (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-warning-soft text-warning-700 border border-warning-200">
                  {label}
                </span>
              );
            case 'suspended':
              return (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-danger-soft text-danger-action border border-danger-200">
                  {label}
                </span>
              );
          }
        },
      },
    ],
    [language]
  );

  // Filtered rows for Pattern A
  const filteredContracts = useMemo(() => {
    if (tableEmpty) return [];
    if (tableFilterChip === 'all') return MOCK_CONTRACTS;
    return MOCK_CONTRACTS.filter((c) => c.status === tableFilterChip);
  }, [tableFilterChip, tableEmpty]);

  // Totals for Pattern A
  const totalsData = useMemo(() => {
    const totalCost = filteredContracts.reduce((acc: number, c: ProjectContractRow) => acc + c.costPiastres, 0);
    const totalContract = filteredContracts.reduce((acc: number, c: ProjectContractRow) => acc + c.contractPiastres, 0);
    return {
      projectName: language === 'ar' ? 'الإجمالي الكلي للبنود المعروضة:' : 'Total of items:',
      costPiastres: `${formatPiastres(totalCost)} ج.م`,
      contractPiastres: `${formatPiastres(totalContract)} ج.م`,
    };
  }, [filteredContracts, language]);

  return (
    <AppShell currentRoute="/patterns-demo">
      <div className="space-y-8 font-sans pb-16">
        {/* Page Showcase Title & Role Banner */}
        <div className="bg-card-bg border border-border rounded-[8px] p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary-action text-white text-[10px] font-bold tracking-wider uppercase">
                PHASE 3
              </span>
              <h1 className="text-lg font-bold text-text-primary">
                {language === 'ar'
                  ? 'مكتبة أنماط ومكونات المنظومة'
                  : 'Design System Patterns Showcase'}
              </h1>
            </div>
            <p className="text-xs text-text-muted mt-1">
              {language === 'ar'
                ? 'استعراض تفاعلي كامل للأنماط مع إدارة الصلاحيات وحسابات العملات وقواعد الواجهة العربية.'
                : 'Interactive showcase for Patterns A through I with RBAC permissions, piastres currency calculations, and RTL compliance.'}
            </p>
          </div>

          {/* Quick Role Switcher Pill in Top Banner for Live Testing */}
          <div className="flex items-center gap-2 bg-page-bg border border-border p-1.5 rounded-[6px]">
            <span className="text-[11px] font-medium text-text-secondary ps-1">
              {language === 'ar' ? 'الرتبة النشطة:' : 'Role:'}
            </span>
            <div className="flex items-center gap-1">
              {USER_ROLES.map((r) => {
                const isSelected = activeRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      addToast({
                        title: language === 'ar' ? 'تم تبديل الرتبة' : 'Role Updated',
                        description: language === 'ar' ? `الرتبة الحالية: ${r.labelAr}` : `Current Role: ${r.labelEn}`,
                        variant: 'primary',
                      });
                    }}
                    className={cn(
                      'px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-primary-action text-white font-bold shadow-xs'
                        : 'text-text-secondary hover:text-text-primary hover:bg-card-bg'
                    )}
                  >
                    {language === 'ar' ? r.labelAr.split(' ')[0] : r.labelEn.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pattern Navigation Tabs */}
        <div className="border-b border-border flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', labelAr: 'عرض جميع الأنماط', labelEn: 'All Patterns' },
            { id: 'pattern-a', labelAr: 'A. جدول البيانات', labelEn: 'A. DataTable' },
            { id: 'pattern-b', labelAr: 'B. قائمة الكروت', labelEn: 'B. EntityList' },
            { id: 'pattern-c', labelAr: 'C. كروت الإحصائيات', labelEn: 'C. StatCards' },
            { id: 'pattern-d', labelAr: 'D. صفحة القائمة', labelEn: 'D. ListPage' },
            { id: 'pattern-e', labelAr: 'E. النوافذ والدروج', labelEn: 'E. Dialogs' },
            { id: 'pattern-f', labelAr: 'F. النماذج والمدخلات', labelEn: 'F. Forms' },
            { id: 'pattern-g', labelAr: 'G. جدول المقايسة', labelEn: 'G. BOQ Table' },
            { id: 'pattern-h', labelAr: 'H. وثيقة العرض', labelEn: 'H. DocumentView' },
            { id: 'pattern-i', labelAr: 'I. بوابات الصلاحيات', labelEn: 'I. RBAC' },
          ].map((tab) => {
            const isActive = activeShowcaseSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveShowcaseSection(tab.id)}
                className={cn(
                  'px-3 py-2 text-xs font-semibold rounded-t-[6px] border-b-2 transition-all cursor-pointer whitespace-nowrap',
                  isActive
                    ? 'border-primary-action text-primary-action bg-card-bg border-t border-s border-e border-border'
                    : 'border-transparent text-text-muted hover:text-text-primary'
                )}
              >
                {language === 'ar' ? tab.labelAr : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* PATTERN A: DataTable                                    */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-a') && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
              <div>
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Table className="w-4 h-4 text-primary-action" />
                  <span>
                    {language === 'ar'
                      ? 'النمط أ: جدول البيانات المتقدم'
                      : 'Pattern A: DataTable (TanStack Table Typed Generics)'}
                  </span>
                </h3>
                <div className="text-xs text-text-muted mt-0.5">
                  {language === 'ar' ? (
                    <span>
                      بحث عام، تصفية شرائح، ترتيب، إخفاء أعمدة، 5 درجات كثافة، ترقيم، عمود التكلفة محمي بصلاحية{' '}
                      <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        view_cost
                      </code>
                    </span>
                  ) : (
                    <span>
                      Global search, filter chips, sorting, column visibility, 5 densities, pagination, cost column guarded by{' '}
                      <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        view_cost
                      </code>
                    </span>
                  )}
                </div>
              </div>

              {/* State Toggles (Loading / Error / Empty) */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setTableLoading((prev) => !prev);
                    setTableError(false);
                  }}
                  className={cn(
                    'h-7 px-2.5 rounded text-[11px] font-medium border transition-colors cursor-pointer',
                    tableLoading
                      ? 'bg-primary-soft text-primary-action border-primary-action'
                      : 'border-border bg-card-bg text-text-secondary hover:bg-page-bg'
                  )}
                >
                  {language === 'ar' ? 'تبديل وضع التحميل' : 'Toggle Loading'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTableError((prev) => !prev);
                    setTableLoading(false);
                  }}
                  className={cn(
                    'h-7 px-2.5 rounded text-[11px] font-medium border transition-colors cursor-pointer',
                    tableError
                      ? 'bg-danger-soft text-danger-action border-danger-action'
                      : 'border-border bg-card-bg text-text-secondary hover:bg-page-bg'
                  )}
                >
                  {language === 'ar' ? 'تبديل حالة الخطأ' : 'Toggle Error'}
                </button>
                <button
                  type="button"
                  onClick={() => setTableEmpty((prev) => !prev)}
                  className={cn(
                    'h-7 px-2.5 rounded text-[11px] font-medium border transition-colors cursor-pointer',
                    tableEmpty
                      ? 'bg-warning-soft text-warning-700 border-warning-600'
                      : 'border-border bg-card-bg text-text-secondary hover:bg-page-bg'
                  )}
                >
                  {language === 'ar' ? 'تبديل الحالة الفارغة' : 'Toggle Empty'}
                </button>
              </div>
            </div>

            <DataTable
              data={filteredContracts}
              columns={columns}
              density={tableDensity}
              onDensityChange={setTableDensity}
              isLoading={tableLoading}
              isError={tableError}
              onRetry={() => {
                setTableError(false);
                setTableLoading(false);
              }}
              filterChips={[
                { id: 'all', labelAr: 'جميع العقود', labelEn: 'All Contracts', count: 6 },
                { id: 'active', labelAr: 'قيد التنفيذ', labelEn: 'In Progress', count: 3 },
                { id: 'completed', labelAr: 'مكتملة', labelEn: 'Completed', count: 1 },
                { id: 'pending_payment', labelAr: 'بانتظار الصرف', labelEn: 'Pending', count: 1 },
                { id: 'suspended', labelAr: 'معلقة', labelEn: 'Suspended', count: 1 },
              ]}
              activeFilterChip={tableFilterChip}
              onFilterChipChange={setTableFilterChip}
              showTotalsRow={true}
              totalsData={totalsData}
              onRowView={(row) => {
                addToast({
                  title: language === 'ar' ? 'عرض تفاصيل العقد' : 'View Contract',
                  description: `${row.code} - ${row.projectName}`,
                  variant: 'info',
                });
              }}
              onRowEdit={(row) => {
                addToast({
                  title: language === 'ar' ? 'تعديل بيانات المشروع' : 'Edit Project',
                  description: `${row.projectName}`,
                  variant: 'primary',
                });
              }}
              onRowDelete={(row) => {
                setConfirmOpen(true);
              }}
            />
          </section>
        )}

        {/* ======================================================== */}
        {/* PATTERN B: EntityList                                    */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-b') && (
          <section className="space-y-4">
            <div className="pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Rows className="w-4 h-4 text-info-action" />
                <span>
                  {language === 'ar'
                    ? 'النمط ب: قائمة الكروت المستقلة'
                    : 'Pattern B: EntityList Variant (Individual White Cards)'}
                </span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {language === 'ar'
                  ? 'كل صف عبارة عن كرت أبيض منفصل يحتوي على الصورة الرمزية، العنوان، البيانات الثانوية، شارة الحالة، والإجراءات.'
                  : 'Each row is a distinct white card featuring avatar initials, title, secondary details, status badge, and action buttons.'}
              </p>
            </div>

            <EntityList
              items={MOCK_ENTITY_ITEMS}
              filterChips={[
                { id: 'all', labelAr: 'الكل', labelEn: 'All', count: 4 },
                { id: 'active', labelAr: 'جاري', labelEn: 'Active', count: 2 },
                { id: 'done', labelAr: 'منتهي', labelEn: 'Done', count: 1 },
              ]}
              onItemView={(it) => {
                addToast({
                  title: language === 'ar' ? 'معاينة المشروع' : 'View Item',
                  description: it.name,
                  variant: 'info',
                });
              }}
              onItemEdit={(it) => {
                addToast({
                  title: language === 'ar' ? 'تعديل المشروع' : 'Edit Item',
                  description: it.name,
                  variant: 'primary',
                });
              }}
              onItemDelete={(it) => {
                setConfirmOpen(true);
              }}
            />
          </section>
        )}

        {/* ======================================================== */}
        {/* PATTERN C: StatCard & SummaryCard                        */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-c') && (
          <section className="space-y-4">
            <div className="pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <ChartLineUp className="w-4 h-4 text-success-700" />
                <span>
                  {language === 'ar'
                    ? 'النمط ج: كروت الإحصائيات والمؤشرات'
                    : 'Pattern C: StatCard with Recharts Sparkline & SummaryCard'}
                </span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {language === 'ar'
                  ? 'كروت إحصائية تحتوي على أرقام غربية، شارات تغير مئوية، ومخطط مساحي مصغر.'
                  : 'Statistical cards featuring Western numerals, percentage deltas, and smooth Recharts area sparklines.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label={language === 'ar' ? 'إجمالي عقود التشطيب (ج.م)' : 'Total Contracts (EGP)'}
                value="3,150,000"
                icon={CurrencyCircleDollar}
                variant="primary"
                delta={{ value: '+14.2%', isPositive: true, period: language === 'ar' ? 'الشهر الماضي' : 'last month' }}
                subtitle={language === 'ar' ? '18 مشروعاً قيد التنفيذ' : '18 active projects'}
                chartData={[{ val: 10 }, { val: 18 }, { val: 24 }, { val: 20 }, { val: 32 }, { val: 28 }, { val: 45 }]}
              />

              <StatCard
                label={language === 'ar' ? 'المستخلصات المصروفة' : 'Paid Certificates'}
                value="1,890,000"
                icon={CheckCircle}
                variant="success"
                delta={{ value: '+8.5%', isPositive: true, period: language === 'ar' ? 'الربع الحالي' : 'this quarter' }}
                subtitle={language === 'ar' ? 'تم تحصيل 12 مستخلصاً' : '12 certificates collected'}
                chartData={[{ val: 15 }, { val: 22 }, { val: 19 }, { val: 30 }, { val: 38 }, { val: 42 }, { val: 50 }]}
              />

              <StatCard
                label={language === 'ar' ? 'مستخلصات قيد الاعتماد' : 'Pending Approvals'}
                value="420,000"
                icon={Clock}
                variant="warning"
                delta={{ value: '-3.1%', isPositive: false, period: language === 'ar' ? 'الأسبوع الماضي' : 'last week' }}
                subtitle={language === 'ar' ? '3 دفعات تنتظر توقيع العميل' : '3 invoices awaiting signature'}
                chartData={[{ val: 40 }, { val: 35 }, { val: 38 }, { val: 25 }, { val: 28 }, { val: 20 }, { val: 18 }]}
              />

              <SummaryCard
                title={language === 'ar' ? 'مؤشر كفاءة تسليم المواقع' : 'Site Delivery Efficiency'}
                subtitle={language === 'ar' ? 'المشاريع الجارية لشهر مايو' : 'May active projects'}
                progressValue={78}
                progressLabel={language === 'ar' ? 'نسبة الالتزام بالجدول الزمني' : 'Schedule Adherence'}
                variant="dark"
                metrics={[
                  { label: language === 'ar' ? 'في الموعد' : 'On-track', value: '14' },
                  { label: language === 'ar' ? 'متأخر' : 'Delayed', value: '3' },
                  { label: language === 'ar' ? 'تسليم اليوم' : 'Due today', value: '1' },
                ]}
              />
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* PATTERN D: ListPage Template                             */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-d') && (
          <section className="space-y-4">
            <div className="pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Browser className="w-4 h-4 text-primary-action" />
                <span>
                  {language === 'ar'
                    ? 'النمط د: قالب صفحة القائمة المتكاملة'
                    : 'Pattern D: ListPage Template (Full View Pattern)'}
                </span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {language === 'ar'
                  ? 'قالب صفحة متكامل يجمع رأس الصفحة، صف كروت الإحصائيات، الكرت الملون، التبويبات، والجدول.'
                  : 'Integrated list page combining PageHeader, StatCards row, SummaryCard, count tabs, and DataTable.'}
              </p>
            </div>

            <ListPageTemplate
              title={language === 'ar' ? 'إدارة عقود ومقايسات التشطيب' : 'Finishing Quotes & Contracts'}
              description={
                language === 'ar'
                  ? 'متابعة كافة عروض الأسعار والمقايسات التنفيذية وحالة التعاقدات والمستخلصات المالية.'
                  : 'Track all quotes, BOQs, contract execution, and payment certificates.'
              }
              breadcrumbItems={[
                { label: language === 'ar' ? 'الرئيسية' : 'Home', href: '/shell-demo' },
                { label: language === 'ar' ? 'المشاريع' : 'Projects' },
                { label: language === 'ar' ? 'العقود والمقايسات' : 'Contracts' },
              ]}
              primaryAction={{
                label: language === 'ar' ? 'إنشاء مقايسة جديدة' : 'New BOQ Quote',
                icon: <Plus className="w-4 h-4" weight="bold" />,
                onClick: () => {
                  setDrawerOpen(true);
                },
              }}
              onExport={() => {
                addToast({
                  title: language === 'ar' ? 'جاري تصدير التقرير' : 'Exporting Data',
                  description: language === 'ar' ? 'تم تجهيز ملف Excel للتحميل' : 'Excel file ready for download',
                  variant: 'success',
                });
              }}
              statCards={
                <>
                  <StatCard
                    label={language === 'ar' ? 'العقود السارية' : 'Active Contracts'}
                    value="42"
                    icon={Buildings}
                    variant="primary"
                    delta={{ value: '+12%', isPositive: true }}
                    subtitle={language === 'ar' ? 'بقيمة 8.4 مليون ج.م' : 'Valued at 8.4M EGP'}
                  />
                  <StatCard
                    label={language === 'ar' ? 'مهندسو المواقع' : 'Site Engineers'}
                    value="9"
                    icon={HardHat}
                    variant="info"
                    subtitle={language === 'ar' ? 'موزعون على 14 موقعاً' : 'Across 14 sites'}
                  />
                  <StatCard
                    label={language === 'ar' ? 'المستخلصات الجاهزة' : 'Ready Invoices'}
                    value="7"
                    icon={Receipt}
                    variant="success"
                    delta={{ value: '+4', isPositive: true }}
                    subtitle={language === 'ar' ? 'بقيمة 640 ألف ج.م' : 'Valued at 640K EGP'}
                  />
                </>
              }
              summaryCard={
                <SummaryCard
                  title={language === 'ar' ? 'معدل الإنتاجية الإجمالي' : 'Overall Productivity'}
                  progressValue={82}
                  variant="primary"
                  metrics={[
                    { label: language === 'ar' ? 'مواقع نشطة' : 'Active', value: '18' },
                    { label: language === 'ar' ? 'نسبة الإنجاز' : 'Done %', value: '82%' },
                  ]}
                />
              }
              tabs={[
                { id: 'all', labelAr: 'جميع المشاريع', labelEn: 'All Projects', count: 6 },
                { id: 'active', labelAr: 'مواقع تعمل', labelEn: 'Active Sites', count: 3 },
                { id: 'completed', labelAr: 'منتهية', labelEn: 'Completed', count: 1 },
              ]}
              activeTab={tableFilterChip}
              onTabChange={setTableFilterChip}
            >
              <DataTable
                data={filteredContracts.slice(0, 3)}
                columns={columns}
                density="default"
                showSelection={false}
                showTotalsRow={false}
              />
            </ListPageTemplate>
          </section>
        )}

        {/* ======================================================== */}
        {/* PATTERN E: Dialog & Drawer (Radix UI)                    */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-e') && (
          <section className="space-y-4">
            <div className="pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <SquaresFour className="w-4 h-4 text-warning-700" />
                <span>
                  {language === 'ar'
                    ? 'النمط هـ: النوافذ المنبثقة والدرج الجانبي'
                    : 'Pattern E: Radix Dialog, ConfirmDialog, and Inline-End Drawer'}
                </span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {language === 'ar'
                  ? 'أحجام النوافذ، نافذة تأكيد الحذف، والدرج الجانبي المنبثق من نهاية الصفحة (ينعكس تلقائياً في اتجاه الواجهة).'
                  : 'Radix Dialog modal sizes, destructive ConfirmDialog, and inline-end Drawer (auto-flips in RTL).'}
              </p>
            </div>

            <div className="bg-card-bg border border-border rounded-[8px] p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setDialogSize('sm');
                    setDialogOpen(true);
                  }}
                  className="h-9 px-3 rounded-[4px] border border-border bg-card-bg hover:bg-page-bg text-xs font-semibold text-text-primary transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'نافذة صغيرة' : 'Small Dialog'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDialogSize('md');
                    setDialogOpen(true);
                  }}
                  className="h-9 px-3 rounded-[4px] border border-border bg-card-bg hover:bg-page-bg text-xs font-semibold text-text-primary transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'نافذة متوسطة' : 'Medium Dialog'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDialogSize('xl');
                    setDialogOpen(true);
                  }}
                  className="h-9 px-3 rounded-[4px] border border-border bg-card-bg hover:bg-page-bg text-xs font-semibold text-text-primary transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'نافذة عريضة' : 'Large Dialog'}
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className="h-9 px-3.5 rounded-[4px] bg-danger-soft text-danger-action hover:bg-danger-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash className="w-4 h-4" />
                  <span>{language === 'ar' ? 'نافذة تأكيد الحذف' : 'Open Confirm Dialog'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="h-9 px-3.5 rounded-[4px] bg-primary-action text-white hover:bg-primary-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Browser className="w-4 h-4" />
                  <span>{language === 'ar' ? 'فتح الدرج الجانبي' : 'Open Inline-End Drawer'}</span>
                </button>
              </div>
            </div>

            {/* Standard Modal Dialog Instance */}
            <ModalDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              size={dialogSize}
              title={language === 'ar' ? 'تفاصيل بند التشطيب والاعتماد الفني' : 'Finishing Specification & Approval'}
              description={language === 'ar' ? 'مواصفات توريد وتركيب المواد وطريقة الدفع' : 'Material supply specs and payment terms'}
              footer={
                <>
                  <button
                    type="button"
                    onClick={() => setDialogOpen(false)}
                    className="h-8 px-3 rounded border border-border bg-card-bg text-xs font-semibold text-text-secondary hover:bg-page-bg cursor-pointer"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDialogOpen(false);
                      addToast({
                        title: language === 'ar' ? 'تم حفظ التعديلات' : 'Changes Saved',
                        variant: 'success',
                      });
                    }}
                    className="h-8 px-3.5 rounded bg-primary-action text-white text-xs font-semibold hover:bg-primary-700 cursor-pointer"
                  >
                    {language === 'ar' ? 'اعتماد وحفظ' : 'Approve & Save'}
                  </button>
                </>
              }
            >
              <div className="space-y-3">
                <p>
                  {language === 'ar'
                    ? 'يتم تنفيذ أعمال الدهانات وفقاً للأصول الفنية المعتمدة مع عمل سيلر مقاوم للرطوبة، وثلاث سكينات معجون دايتون ناعم، ووشين تشطيب نصف لامع جوتن فينومستك بالألوان المحددة من العميل.'
                    : 'All painting works must adhere to standard specifications including anti-humidity primer, 3 coats of putty, and 2 finish coats of Jotun Fenomastic.'}
                </p>
                <div className="p-3 bg-page-bg rounded-[6px] border border-border space-y-1 font-numeric">
                  <p className="font-bold text-text-primary">
                    {language === 'ar' ? 'معلومات التوريد:' : 'Supply Details:'}
                  </p>
                  <p className="text-text-secondary">{language === 'ar' ? 'الكمية الإجمالية: 120 م²' : 'Total quantity: 120 m²'}</p>
                  <p className="text-text-secondary">{language === 'ar' ? 'سعر المتر المعتمد: 135.00 ج.م' : 'Approved rate: 135.00 EGP'}</p>
                </div>
              </div>
            </ModalDialog>

            {/* Confirm Dialog Instance */}
            <ConfirmDialog
              open={confirmOpen}
              onOpenChange={setConfirmOpen}
              title={language === 'ar' ? 'هل أنت متأكد من حذف هذا السجل نهائياً؟' : 'Are you sure you want to delete?'}
              description={
                language === 'ar'
                  ? 'سيتم حذف بند المقايسة والبيانات المالية المرتبطة به بصورة نهائية، ولا يمكن التراجع عن هذا الإجراء بعد تنفيذه.'
                  : 'This item and all associated data will be permanently removed. This action cannot be undone.'
              }
              onConfirm={() => {
                addToast({
                  title: language === 'ar' ? 'تم الحذف بنجاح' : 'Item Deleted',
                  description: language === 'ar' ? 'تم إزالة البند من المقايسة' : 'Record removed successfully',
                  variant: 'danger',
                });
              }}
            />

            {/* Inline-End Drawer Instance */}
            <Drawer
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              title={language === 'ar' ? 'إضافة مقايسة سريعة جديدة' : 'Add New Quick Quotation'}
              description={
                language === 'ar'
                  ? 'درج جانبي ينزلق من نهاية الصفحة مع محتوى قابل للتمرير وأزرار إجراءات.'
                  : 'Inline-end drawer sliding smoothly with scrollable body and sticky action footer.'
              }
              footer={
                <>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="h-8 px-3 rounded border border-border bg-card-bg text-xs font-semibold text-text-secondary hover:bg-page-bg cursor-pointer"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      addToast({
                        title: language === 'ar' ? 'تم حفظ المقايسة بنجاح' : 'Quotation Saved',
                        variant: 'success',
                      });
                    }}
                    className="h-8 px-3.5 rounded bg-primary-action text-white text-xs font-semibold hover:bg-primary-700 cursor-pointer"
                  >
                    {language === 'ar' ? 'حفظ المقايسة' : 'Save Quote'}
                  </button>
                </>
              }
            >
              <div className="space-y-4">
                <FormField label={language === 'ar' ? 'اسم العميل' : 'Client Name'} required>
                  <input
                    type="text"
                    defaultValue="م. أحمد حسني"
                    className="w-full h-8 px-2.5 bg-page-bg border border-border rounded text-xs text-text-primary focus:bg-card-bg outline-none"
                  />
                </FormField>
                <FormField label={language === 'ar' ? 'موقع المشروع' : 'Site Location'} required>
                  <input
                    type="text"
                    defaultValue="التجمع الأول - القاهرة الجديدة"
                    className="w-full h-8 px-2.5 bg-page-bg border border-border rounded text-xs text-text-primary focus:bg-card-bg outline-none"
                  />
                </FormField>
                <FormField label={language === 'ar' ? 'تاريخ المعاينة' : 'Inspection Date'}>
                  <DatePicker value="2025-05-10" />
                </FormField>
                <FormField label={language === 'ar' ? 'ملاحظات المعاينة' : 'Notes'}>
                  <textarea
                    rows={3}
                    defaultValue="الموقع جاهز لأعمال التأسيس والسباكة، ومفتاح الفيلا مع الحارس."
                    className="w-full p-2 bg-page-bg border border-border rounded text-xs text-text-primary focus:bg-card-bg outline-none"
                  />
                </FormField>
              </div>
            </Drawer>
          </section>
        )}

        {/* ======================================================== */}
        {/* PATTERN F: Form Patterns (React Hook Form + Zod)        */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-f') && (
          <section className="space-y-4">
            <div className="pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <FileText className="w-4 h-4 text-info-action" />
                <span>
                  {language === 'ar'
                    ? 'النمط و: منظومة النماذج والمدخلات'
                    : 'Pattern F: Form Patterns (React Hook Form + Zod, Stepper, DatePicker, FileUploader, CurrencyInput)'}
                </span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {language === 'ar'
                  ? 'نموذج كامل متوافق مع Zod، شبكة من عمودين، مدقق تاريخ يبدأ بالسبت، رافع ملفات، حقل عملة، وشريط إجراءات.'
                  : 'Full Zod-validated responsive form, Saturday-week-start DatePicker, drag & drop uploader, currency input, and action bar.'}
              </p>
            </div>

            {/* Stepper / Wizard */}
            <Stepper
              steps={[
                { id: '1', titleAr: 'بيانات العميل والموقع', titleEn: 'Client & Site Info' },
                { id: '2', titleAr: 'بنود المقايسة والأسعار', titleEn: 'BOQ Items & Rates' },
                { id: '3', titleAr: 'الشروط والاعتماد', titleEn: 'Terms & Approval' },
              ]}
              currentStep={stepperStep}
              onStepClick={setStepperStep}
            />

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
              <div className="bg-card-bg border border-border rounded-[8px] p-5 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client Name */}
                  <FormField
                    label={language === 'ar' ? 'اسم العميل' : 'Client Name'}
                    required
                    error={errors.clientName?.message}
                    helperText={language === 'ar' ? 'الاسم الثلاثي كما يظهر في العقد' : 'Full legal client name'}
                  >
                    <input
                      type="text"
                      {...register('clientName')}
                      className="w-full h-9 px-3 bg-page-bg border border-border rounded-[4px] text-xs text-text-primary focus:bg-card-bg focus:border-primary-action outline-none"
                    />
                  </FormField>

                  {/* Project Title */}
                  <FormField
                    label={language === 'ar' ? 'عنوان المشروع' : 'Project Title'}
                    required
                    error={errors.projectTitle?.message}
                  >
                    <input
                      type="text"
                      {...register('projectTitle')}
                      className="w-full h-9 px-3 bg-page-bg border border-border rounded-[4px] text-xs text-text-primary focus:bg-card-bg focus:border-primary-action outline-none"
                    />
                  </FormField>

                  {/* Work Type */}
                  <FormField
                    label={language === 'ar' ? 'نوع الأعمال الرئيسية' : 'Primary Work Type'}
                    required
                    error={errors.workType?.message}
                  >
                    <select
                      {...register('workType')}
                      className="w-full h-9 px-2 bg-page-bg border border-border rounded-[4px] text-xs text-text-primary focus:bg-card-bg focus:border-primary-action outline-none cursor-pointer"
                    >
                      <option value="تشطيب متكامل">{language === 'ar' ? 'تشطيب متكامل' : 'Turnkey Finishing'}</option>
                      <option value="دهانات وديكور">{language === 'ar' ? 'دهانات وديكور' : 'Painting & Decor'}</option>
                      <option value="تأسيس كهرباء وسباكة">{language === 'ar' ? 'تأسيس كهرباء وسباكة' : 'Electrical & Plumbing'}</option>
                      <option value="أرضيات وسيراميك">{language === 'ar' ? 'أرضيات وسيراميك' : 'Flooring & Ceramics'}</option>
                    </select>
                  </FormField>

                  {/* Contract Value with CurrencyInput */}
                  <FormField
                    label={language === 'ar' ? 'قيمة العقد المتوقعة' : 'Contract Value'}
                    required
                    error={errors.contractValue?.message}
                    helperText={language === 'ar' ? 'بالجنيه المصري (أرقام غربية 0-9)' : 'In EGP (Western digits)'}
                  >
                    <Controller
                      name="contractValue"
                      control={control}
                      render={({ field }) => (
                        <CurrencyInput
                          value={field.value}
                          onChange={field.onChange}
                          currencySymbolAr="ج.م"
                          currencySymbolEn="EGP"
                        />
                      )}
                    />
                  </FormField>

                  {/* Expected Days */}
                  <FormField
                    label={language === 'ar' ? 'مدة التنفيذ (أيام عمل)' : 'Execution Duration (Days)'}
                    required
                    error={errors.expectedDays?.message}
                  >
                    <input
                      type="number"
                      {...register('expectedDays', { valueAsNumber: true })}
                      className="w-full h-9 px-3 bg-page-bg border border-border rounded-[4px] text-xs font-numeric text-text-primary focus:bg-card-bg focus:border-primary-action outline-none"
                    />
                  </FormField>

                  {/* Start Date with Saturday week start */}
                  <FormField
                    label={language === 'ar' ? 'تاريخ بدء الأعمال' : 'Start Date (Saturday week start)'}
                    required
                    error={errors.startDate?.message}
                    helperText={language === 'ar' ? 'التقويم الميلادي بأرقام غربية' : 'Gregorian date with Western digits'}
                  >
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          weekStart={6} // Saturday default for Egypt
                        />
                      )}
                    />
                  </FormField>
                </div>

                {/* Site Notes */}
                <FormField
                  label={language === 'ar' ? 'ملاحظات الموقع والشروط الخاصة' : 'Site Notes & Conditions'}
                  helperText={language === 'ar' ? 'أي اشتراطات خاصة بالكمبوند أو مواعيد العمل' : 'Any special compound rules'}
                >
                  <textarea
                    rows={3}
                    {...register('siteNotes')}
                    className="w-full p-2.5 bg-page-bg border border-border rounded-[4px] text-xs text-text-primary focus:bg-card-bg focus:border-primary-action outline-none"
                  />
                </FormField>

                {/* File Uploader */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    {language === 'ar' ? 'المرفقات والمخططات الهندسية' : 'Engineering Drawings & Attachments'}
                  </label>
                  <FileUploader
                    files={formFiles}
                    onRemoveFile={(id) => setFormFiles((f) => f.filter((x) => x.id !== id))}
                    onAddFiles={(names) => {
                      const newOnes = names.map((name, i) => ({
                        id: `f-${Date.now()}-${i}`,
                        name,
                        size: '2.1 MB',
                        progress: 100,
                      }));
                      setFormFiles((prev) => [...prev, ...newOnes]);
                    }}
                  />
                </div>
              </div>

              {/* Form Footer Action Bar */}
              <FormActionBar
                onSave={() => {
                  addToast({
                    title: language === 'ar' ? 'تم حفظ المسودة' : 'Draft Saved',
                    description: language === 'ar' ? 'تم حفظ مسودة المشروع محلياً' : 'Project draft saved',
                    variant: 'secondary',
                  });
                }}
                onSaveAndSend={handleSubmit(onFormSubmit)}
                onDelete={() => {
                  setConfirmOpen(true);
                }}
                isSubmitting={isSubmitting}
                saveLabel={language === 'ar' ? 'حفظ كمسودة' : 'Save Draft'}
                saveAndSendLabel={language === 'ar' ? 'حفظ واعتماد النموذج' : 'Save & Approve'}
                deleteLabel={language === 'ar' ? 'حذف النموذج' : 'Delete Form'}
              />
            </form>
          </section>
        )}

        {/* ======================================================== */}
        {/* PATTERN G: EditableItemsTable (Quote / BOQ Editor)       */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-g') && (
          <section className="space-y-4">
            <div className="pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Receipt className="w-4 h-4 text-primary-action" />
                <span>
                  {language === 'ar'
                    ? 'النمط ز: جدول المقايسة التفاعلي وقائمة الكميات'
                    : 'Pattern G: EditableItemsTable (Quote & Bill of Quantities Editor)'}
                </span>
              </h3>
              <div className="text-xs text-text-muted mt-0.5">
                {language === 'ar' ? (
                  <span>
                    جدول مقايسة تشطيبات واقعية (دهان، كهرباء، سيراميك)، حفظ داخلي بالقروش، حساب مباشر للهامش % والضريبة 14%، إضافة بالضغط على Enter، حماية عمودي التكلفة والهامش بصلاحية{' '}
                    <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      view_cost
                    </code>
                  </span>
                ) : (
                  <span>
                    Real Egyptian finishing BOQ editor, piastres integer precision, live totals, margin %, Enter-key auto-row,{' '}
                    <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      view_cost
                    </code>{' '}
                    permission protection.
                  </span>
                )}
              </div>
            </div>

            <EditableItemsTable
              taxRatePercent={14}
              discountPercent={5}
            />
          </section>
        )}

        {/* ======================================================== */}
        {/* PATTERN H: DocumentView                                  */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-h') && (
          <section className="space-y-4">
            <div className="pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <FileText className="w-4 h-4 text-success-700" />
                <span>
                  {language === 'ar'
                    ? 'النمط ح: وثيقة العرض الرسمية ومعاينة الطباعة'
                    : 'Pattern H: DocumentView (Official Quotation & A4 Print Preview)'}
                </span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {language === 'ar'
                  ? 'عرض وثيقة رسمية للقراءة والطباعة، شريط أدوات علوي (تعديل، تنزيل، طباعة، إرسال)، مربعات بيانات الطرفين، إجماليات في نهاية الصفحة، ونمط طباعة A4 نظيف يخفي القوائم.'
                  : 'Read-only document layout with action bar, from/to party cards, A4 @media print stylesheet hiding shell.'}
              </p>
            </div>

            <DocumentView
              onEdit={() => {
                addToast({
                  title: language === 'ar' ? 'فتح وضع التعديل' : 'Edit Mode Opened',
                  variant: 'info',
                });
              }}
              onDownload={() => {
                addToast({
                  title: language === 'ar' ? 'جاري تجهيز ملف PDF' : 'Generating PDF',
                  variant: 'primary',
                });
              }}
              onSend={() => {
                addToast({
                  title: language === 'ar' ? 'تم إرسال العرض للعميل عبر البريد وواتساب' : 'Quote Sent via Email & WhatsApp',
                  variant: 'success',
                });
              }}
              onShare={() => {
                addToast({
                  title: language === 'ar' ? 'تم نسخ رابط المقايسة' : 'Link Copied',
                  variant: 'secondary',
                });
              }}
            />
          </section>
        )}

        {/* ======================================================== */}
        {/* PATTERN I: PermissionGate & RBAC Demonstration           */}
        {/* ======================================================== */}
        {(activeShowcaseSection === 'all' || activeShowcaseSection === 'pattern-i') && (
          <section className="space-y-4">
            <div className="pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-action" />
                <span>
                  {language === 'ar'
                    ? 'النمط ط: بوابات الصلاحيات وإدارة الوصول'
                    : 'Pattern I: PermissionGate Component & useRole Hook'}
                </span>
              </h3>
              <div className="text-xs text-text-muted mt-0.5">
                {language === 'ar' ? (
                  <span>
                    التحكم في ظهور العناصر حسب رتبة المستخدم. صلاحية{' '}
                    <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      view_cost
                    </code>{' '}
                    متاحة فقط للمالك ومدير المشاريع.
                  </span>
                ) : (
                  <span>
                    Role-based access control. The{' '}
                    <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      view_cost
                    </code>{' '}
                    permission is strictly limited to owner and project_manager.
                  </span>
                )}
              </div>
            </div>

            <div className="bg-card-bg border border-border rounded-[8px] p-5 shadow-sm space-y-4">
              <div className="p-3 bg-page-bg rounded-[6px] border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-text-muted">{language === 'ar' ? 'الرتبة المحددة حالياً:' : 'Active Role:'}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-sm text-text-primary">
                      {USER_ROLES.find((r) => r.id === activeRole)?.labelAr}
                    </span>
                    <span className="font-numeric text-xs px-2 py-0.5 rounded bg-primary-soft text-primary-action font-semibold">
                      {activeRole}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted">
                    {language === 'ar' ? (
                      <span>
                        حالة صلاحية{' '}
                        <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          view_cost
                        </code>
                        :
                      </span>
                    ) : (
                      <span>
                        <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          view_cost
                        </code>{' '}
                        status:
                      </span>
                    )}
                  </span>
                  {hasPermission('view_cost') ? (
                    <span className="px-2.5 py-1 rounded bg-success-soft text-success-700 text-xs font-bold border border-success-200 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" weight="bold" />
                      <span>{language === 'ar' ? 'مصرّح بها' : 'Granted'}</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-danger-soft text-danger-action text-xs font-bold border border-danger-200 flex items-center gap-1">
                      <WarningCircle className="w-4 h-4" weight="bold" />
                      <span>{language === 'ar' ? 'محجوبة' : 'Restricted'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Live PermissionGate Demo Component */}
              <div className="p-4 border border-dashed border-border rounded-[6px] space-y-3">
                <p className="text-xs font-bold text-text-secondary">
                  {language === 'ar' ? (
                    <span>
                      معاينة مباشرة لبوابة الصلاحية{' '}
                      <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        view_cost
                      </code>
                      :
                    </span>
                  ) : (
                    <span>
                      Live demo of{' '}
                      <code dir="ltr" className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        view_cost
                      </code>{' '}
                      permission gate:
                    </span>
                  )}
                </p>

                <PermissionGate
                  permission="view_cost"
                  showNotice={true}
                  fallback={
                    <div className="p-3 bg-secondary-soft rounded border border-border text-xs text-text-muted flex items-center gap-2">
                      <WarningCircle className="w-4 h-4 text-warning-600" />
                      <span>
                        {language === 'ar'
                          ? 'هذا المحتوى محمي: يتطلب رتبة المالك أو مدير المشاريع للاطلاع على تكاليف وهوامش الأرباح.'
                          : 'Restricted content: Requires owner or project_manager role to view costs and profit margins.'}
                      </span>
                    </div>
                  }
                >
                  <div className="p-3 bg-success-50/50 rounded border border-success-200 text-xs text-success-900 flex items-center justify-between">
                    <div>
                      <p className="font-bold">
                        {language === 'ar' ? 'بيانات التكلفة السرية متاحة لرتبتك:' : 'Confidential Cost Data Accessible:'}
                      </p>
                      <p className="text-success-700 mt-0.5">
                        {language === 'ar'
                          ? 'إجمالي تكاليف التوريد لهذا الشهر: 1,420,000 ج.م - صافي هامش الأرباح: 32%'
                          : 'Monthly material supply cost: 1,420,000 EGP - Net profit margin: 32%'}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-success-action text-white font-bold text-[10px]">
                      {language === 'ar' ? 'سري وخاص' : 'CONFIDENTIAL'}
                    </span>
                  </div>
                </PermissionGate>
              </div>
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
