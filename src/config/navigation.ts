import React from 'react';
import {
  Gauge,
  Handshake,
  Calculator,
  FileText,
  Buildings,
  HardHat,
  GitDiff,
  ShoppingCart,
  Warehouse,
  Users,
  Coins,
  SealCheck,
  ChartBar,
  Gear,
  SquaresFour,
  Palette,
  Ruler,
  Icon,
} from '@phosphor-icons/react';

export type UserRole = 'owner' | 'project_manager' | 'site_engineer' | 'accountant' | 'sales';

export interface RoleInfo {
  id: UserRole;
  labelAr: string;
  labelEn: string;
}

export const USER_ROLES: RoleInfo[] = [
  { id: 'owner', labelAr: 'المالك / المدير التنفيذي', labelEn: 'Owner / Executive' },
  { id: 'project_manager', labelAr: 'مدير المشاريع', labelEn: 'Project Manager' },
  { id: 'site_engineer', labelAr: 'مهندس الموقع', labelEn: 'Site Engineer' },
  { id: 'accountant', labelAr: 'المحاسب المالي', labelEn: 'Accountant' },
  { id: 'sales', labelAr: 'مسؤول المبيعات والتعاقدات', labelEn: 'Sales Specialist' },
];

export interface NavChildItem {
  id: string;
  labelAr: string;
  labelEn: string;
  route: string;
  allowedRoles?: UserRole[];
}

export interface NavItem {
  id: string;
  labelAr: string;
  labelEn: string;
  icon: Icon;
  route?: string;
  badge?: number | string;
  children?: NavChildItem[];
  allowedRoles: UserRole[];
}

export interface NavGroup {
  id: string;
  titleAr?: string;
  titleEn?: string;
  items: NavItem[];
}

export const NAVIGATION_CONFIG: NavGroup[] = [
  {
    id: 'home',
    items: [
      {
        id: 'reference_compare',
        labelAr: 'مطابقة المرجع (Round 4)',
        labelEn: 'Reference Compare (R4)',
        icon: Ruler,
        route: '/reference-compare',
        allowedRoles: ['owner', 'project_manager', 'site_engineer', 'accountant', 'sales'],
      },
      {
        id: 'patterns_demo',
        labelAr: 'مكتبة الأنماط (Phase 3)',
        labelEn: 'Patterns (Phase 3)',
        icon: SquaresFour,
        route: '/patterns-demo',
        allowedRoles: ['owner', 'project_manager', 'site_engineer', 'accountant', 'sales'],
      },
      {
        id: 'dashboard',
        labelAr: 'لوحة التحكم (الهيكل)',
        labelEn: 'Dashboard (Shell)',
        icon: Gauge,
        route: '/shell-demo',
        allowedRoles: ['owner', 'project_manager', 'site_engineer', 'accountant', 'sales'],
      },
      {
        id: 'font_specimen',
        labelAr: 'معرض الخطوط (Round 5)',
        labelEn: 'Font Specimen (R5)',
        icon: Ruler,
        route: '/font-specimen',
        allowedRoles: ['owner', 'project_manager', 'site_engineer', 'accountant', 'sales'],
      },
      {
        id: 'design_system',
        labelAr: 'دليل التصميم (Tokens)',
        labelEn: 'Design Tokens',
        icon: Palette,
        route: '/design-system',
        allowedRoles: ['owner', 'project_manager', 'site_engineer', 'accountant', 'sales'],
      },
    ],
  },
  {
    id: 'sales_contracts',
    titleAr: 'المبيعات والتعاقد',
    titleEn: 'Sales & Contracts',
    items: [
      {
        id: 'sales_clients',
        labelAr: 'المبيعات والعملاء',
        labelEn: 'Sales & Clients',
        icon: Handshake,
        route: '/sales-clients',
        allowedRoles: ['owner', 'sales'],
      },
      {
        id: 'estimating_pricing',
        labelAr: 'التقدير والتسعير',
        labelEn: 'Estimating & Pricing',
        icon: Calculator,
        allowedRoles: ['owner', 'sales'],
        children: [
          {
            id: 'estimating_board',
            labelAr: 'لوحة التقدير',
            labelEn: 'Estimating Dashboard',
            route: '/estimating/board',
          },
          {
            id: 'estimating_boq',
            labelAr: 'المقايسات',
            labelEn: 'Bills of Quantities (BOQs)',
            route: '/estimating/boq',
          },
          {
            id: 'estimating_quotes',
            labelAr: 'عروض الأسعار',
            labelEn: 'Quotations',
            route: '/estimating/quotes',
          },
          {
            id: 'estimating_library',
            labelAr: 'مكتبة البنود',
            labelEn: 'Items Library',
            route: '/estimating/library',
          },
        ],
      },
      {
        id: 'contracts_payments',
        labelAr: 'العقود والدفعات',
        labelEn: 'Contracts & Payments',
        icon: FileText,
        route: '/contracts-payments',
        allowedRoles: ['owner', 'sales'],
      },
    ],
  },
  {
    id: 'execution_operations',
    titleAr: 'التنفيذ والتشغيل',
    titleEn: 'Execution & Operations',
    items: [
      {
        id: 'projects',
        labelAr: 'المشاريع',
        labelEn: 'Projects',
        icon: Buildings,
        badge: 12,
        allowedRoles: ['owner', 'project_manager', 'site_engineer'],
        children: [
          {
            id: 'projects_list',
            labelAr: 'قائمة المشاريع',
            labelEn: 'Projects List',
            route: '/projects/list',
          },
          {
            id: 'projects_schedule',
            labelAr: 'جداول التنفيذ',
            labelEn: 'Execution Schedules',
            route: '/projects/schedule',
          },
        ],
      },
      {
        id: 'site_execution',
        labelAr: 'التنفيذ بالموقع',
        labelEn: 'Site Execution',
        icon: HardHat,
        route: '/site-execution',
        allowedRoles: ['owner', 'project_manager', 'site_engineer'],
      },
      {
        id: 'change_orders',
        labelAr: 'أوامر التغيير',
        labelEn: 'Change Orders',
        icon: GitDiff,
        badge: 3,
        route: '/change-orders',
        allowedRoles: ['owner', 'project_manager', 'site_engineer'],
      },
      {
        id: 'purchasing',
        labelAr: 'المشتريات',
        labelEn: 'Purchasing',
        icon: ShoppingCart,
        route: '/purchasing',
        allowedRoles: ['owner', 'project_manager', 'accountant'],
      },
      {
        id: 'inventory',
        labelAr: 'المخازن',
        labelEn: 'Inventory',
        icon: Warehouse,
        route: '/inventory',
        allowedRoles: ['owner', 'project_manager'],
      },
      {
        id: 'contractors_labor',
        labelAr: 'المقاولون والعمالة',
        labelEn: 'Contractors & Labor',
        icon: Users,
        route: '/contractors-labor',
        allowedRoles: ['owner', 'project_manager'],
      },
    ],
  },
  {
    id: 'finance_admin',
    titleAr: 'المالية والإدارة',
    titleEn: 'Finance & Admin',
    items: [
      {
        id: 'finance',
        labelAr: 'المالية والحسابات',
        labelEn: 'Finance',
        icon: Coins,
        allowedRoles: ['owner', 'accountant'],
        children: [
          {
            id: 'finance_receipts',
            labelAr: 'المقبوضات والمصروفات',
            labelEn: 'Receipts & Expenses',
            route: '/finance/receipts',
          },
          {
            id: 'finance_certificates',
            labelAr: 'المستخلصات',
            labelEn: 'Payment Certificates',
            route: '/finance/certificates',
          },
        ],
      },
      {
        id: 'quality_handover',
        labelAr: 'الجودة والتسليم',
        labelEn: 'Quality & Handover',
        icon: SealCheck,
        route: '/quality-handover',
        allowedRoles: ['owner', 'project_manager'],
      },
      {
        id: 'reports',
        labelAr: 'التقارير',
        labelEn: 'Reports',
        icon: ChartBar,
        route: '/reports',
        allowedRoles: ['owner', 'project_manager', 'accountant'],
      },
      {
        id: 'settings',
        labelAr: 'الإعدادات',
        labelEn: 'Settings',
        icon: Gear,
        route: '/settings',
        allowedRoles: ['owner'],
      },
    ],
  },
];
