import React, { useState, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  RowSelectionState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  CaretUp,
  CaretDown,
  CaretUpDown,
  MagnifyingGlass,
  Funnel,
  SlidersHorizontal,
  DotsThreeVertical,
  Eye,
  PencilSimple,
  Trash,
  CaretLeft,
  CaretRight,
  Check,
  WarningCircle,
  Clock,
  CheckCircle,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import { useRole } from '@/src/context/RoleContext';
import { Skeleton } from '@/src/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/src/components/ui/dropdown-menu';

export type TableDensity = 'xl' | 'lg' | 'default' | 'sm' | 'xs';

export type ExtendedColumnDef<TData, TValue = any> = {
  id?: string;
  accessorKey?: string;
  header: any;
  cell?: any;
  permission?: string;
  isNumeric?: boolean;
  enableSorting?: boolean;
  enableHiding?: boolean;
  minWidthClass?: string;
  size?: number;
};

export function getColumnWidthClass(colId: string, customClass?: string): string {
  if (customClass) return customClass;
  const id = colId.toLowerCase();
  if (id === 'select') return 'w-10 min-w-10 max-w-10';
  if (id.includes('code') || id === 'id') return 'col-code';
  if (id.includes('project') || id.includes('name') || id.includes('title')) return 'col-project';
  if (id.includes('client') || id.includes('customer')) return 'col-client';
  if (
    id.includes('cost') ||
    id.includes('contract') ||
    id.includes('amount') ||
    id.includes('price') ||
    id.includes('total') ||
    id.includes('budget') ||
    id.includes('revenue') ||
    id.includes('balance') ||
    id.includes('paid')
  ) {
    return 'col-money';
  }
  if (id.includes('progress') || id.includes('rate') || id.includes('completion')) return 'col-progress';
  if (id.includes('status')) return 'col-status';
  if (id.includes('action')) return 'col-actions';
  return '';
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ExtendedColumnDef<TData, any>[];
  filterChips?: { id: string; labelAr: string; labelEn: string; count?: number }[];
  activeFilterChip?: string;
  onFilterChipChange?: (chipId: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  density?: TableDensity;
  onDensityChange?: (density: TableDensity) => void;
  showTotalsRow?: boolean;
  totalsData?: Record<string, string | number>;
  onRowView?: (row: TData) => void;
  onRowEdit?: (row: TData) => void;
  onRowDelete?: (row: TData) => void;
  rowIdAccessor?: (row: TData) => string;
  pageSizeOptions?: number[];
  initialPageSize?: number;
  emptyTitleAr?: string;
  emptyTitleEn?: string;
  emptyDescriptionAr?: string;
  emptyDescriptionEn?: string;
  showSelection?: boolean;
  showColumnVisibility?: boolean;
  showDensitySelector?: boolean;
  searchPlaceholderAr?: string;
  searchPlaceholderEn?: string;
}

export function DataTable<TData extends Record<string, any>>({
  data,
  columns,
  filterChips,
  activeFilterChip,
  onFilterChipChange,
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry,
  density = 'default',
  onDensityChange,
  showTotalsRow = false,
  totalsData,
  onRowView,
  onRowEdit,
  onRowDelete,
  rowIdAccessor = (r) => (r as any).id || Math.random().toString(),
  pageSizeOptions = [5, 10, 20, 50],
  initialPageSize = 10,
  emptyTitleAr = 'لا توجد بيانات متاحة',
  emptyTitleEn = 'No data available',
  emptyDescriptionAr = 'لم يتم العثور على أي نتائج تطابق معايير البحث الحالية.',
  emptyDescriptionEn = 'No results match your current search or filter criteria.',
  showSelection = true,
  showColumnVisibility = true,
  showDensitySelector = true,
  searchPlaceholderAr = 'بحث سريع في الجدول...',
  searchPlaceholderEn = 'Quick search...',
}: DataTableProps<TData>) {
  const { language, isRTL } = useTranslation();
  const { hasPermission } = useRole();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // 1. Filter out columns where the current role lacks the required permission
  const allowedColumns = useMemo(() => {
    return columns.filter((col) => {
      if (col.permission && !hasPermission(col.permission)) {
        return false;
      }
      return true;
    });
  }, [columns, hasPermission]);

  // 2. Build full columns including selection and row actions
  const tableColumns = useMemo<ColumnDef<TData, any>[]>(() => {
    const cols: any[] = [];

    // Row selection checkbox column
    if (showSelection) {
      cols.push({
        id: 'select',
        header: ({ table }: any) => (
          <div className="flex items-center justify-center w-8">
            <input
              type="checkbox"
              aria-label={language === 'ar' ? 'تحديد الكل' : 'Select all'}
              checked={table.getIsAllPageRowsSelected()}
              ref={(el) => {
                if (el) el.indeterminate = table.getIsSomePageRowsSelected();
              }}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              className="w-4 h-4 rounded border-border text-primary-action focus:ring-primary-action/30 cursor-pointer accent-primary-action"
            />
          </div>
        ),
        cell: ({ row }: any) => (
          <div className="flex items-center justify-center w-8">
            <input
              type="checkbox"
              aria-label={language === 'ar' ? `تحديد الصف ${row.index + 1}` : `Select row ${row.index + 1}`}
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              className="w-4 h-4 rounded border-border text-primary-action focus:ring-primary-action/30 cursor-pointer accent-primary-action"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    // Add user defined columns
    allowedColumns.forEach((col) => {
      const colId = col.id || col.accessorKey || 'col';
      cols.push({
        ...col,
        id: colId,
        header: col.header as any,
        cell: (col as any).cell
          ? (col as any).cell
          : ({ getValue }: any) => {
              const val = getValue();
              if (val === null || val === undefined) return '-';
              if (col.isNumeric) {
                return (
                  <span className="font-numeric tabular-nums text-end block">
                    {typeof val === 'number' ? val.toLocaleString('en-US') : String(val)}
                  </span>
                );
              }
              return String(val);
            },
      });
    });

    // Row actions column if any handler provided
    if (onRowView || onRowEdit || onRowDelete) {
      cols.push({
        id: 'actions',
        header: () => (
          <span className="text-center block text-xs font-semibold text-text-secondary">
            {language === 'ar' ? 'الإجراءات' : 'Actions'}
          </span>
        ),
        cell: ({ row }: any) => {
          const item = row.original;
          return (
            <div className="flex items-center justify-center gap-1">
              {onRowView && (
                <button
                  type="button"
                  onClick={() => onRowView(item)}
                  className="p-1 rounded-sm text-gray-500 hover:text-text-primary hover:bg-black/5 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  aria-label={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                >
                  <Eye className="w-5 h-5" />
                </button>
              )}
              {onRowEdit && (
                <button
                  type="button"
                  onClick={() => onRowEdit(item)}
                  className="p-1 rounded-sm text-gray-500 hover:text-text-primary hover:bg-black/5 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'تعديل' : 'Edit'}
                  aria-label={language === 'ar' ? 'تعديل' : 'Edit'}
                >
                  <PencilSimple className="w-5 h-5" />
                </button>
              )}
              {onRowDelete && (
                <button
                  type="button"
                  onClick={() => onRowDelete(item)}
                  className="p-1 rounded-sm text-gray-500 hover:text-danger-action hover:bg-black/5 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'حذف' : 'Delete'}
                  aria-label={language === 'ar' ? 'حذف' : 'Delete'}
                >
                  <Trash className="w-5 h-5" />
                </button>
              )}

              {/* Overflow Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="p-1 rounded-sm text-gray-500 hover:text-text-primary hover:bg-black/5 transition-colors cursor-pointer"
                    aria-label={language === 'ar' ? 'خيارات إضافية' : 'More options'}
                  >
                    <DotsThreeVertical className="w-5 h-5" weight="bold" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-40">
                  <DropdownMenuItem onClick={() => onRowView?.(item)}>
                    <Eye className="w-4 h-4 me-2 text-primary-action" />
                    <span>{language === 'ar' ? 'عرض السجل' : 'View record'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRowEdit?.(item)}>
                    <PencilSimple className="w-4 h-4 me-2 text-info-action" />
                    <span>{language === 'ar' ? 'تعديل البيانات' : 'Edit data'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-danger-action focus:text-danger-action focus:bg-danger-soft"
                    onClick={() => onRowDelete?.(item)}
                  >
                    <Trash className="w-4 h-4 me-2 text-danger-action" />
                    <span>{language === 'ar' ? 'حذف نهائي' : 'Delete'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      });
    }

    return cols;
  }, [
    showSelection,
    allowedColumns,
    language,
    isRTL,
    onRowView,
    onRowEdit,
    onRowDelete,
  ]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: rowIdAccessor,
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  });

  // Density styles - Default density 56px row height with 14px 20px padding
  const densityPadding = useMemo(() => {
    switch (density) {
      case 'xl':
        return 'py-5 px-6 text-sm';
      case 'lg':
        return 'py-4 px-5 text-sm';
      case 'default':
        return 'py-3.5 px-5 text-sm';
      case 'sm':
        return 'py-2 px-3.5 text-xs';
      case 'xs':
        return 'py-1 px-2.5 text-xs';
    }
  }, [density]);

  const densityHeaderPadding = useMemo(() => {
    switch (density) {
      case 'xl':
        return 'h-12 px-6 py-3.5 text-xs font-bold';
      case 'lg':
        return 'h-11 px-5 py-3 text-xs font-bold';
      case 'default':
        return 'h-11 px-5 py-3 text-xs font-bold';
      case 'sm':
        return 'h-9 px-3.5 py-2 text-xs font-bold';
      case 'xs':
        return 'h-8 px-2.5 py-1.5 text-xs font-bold';
    }
  }, [density]);

  // Pagination calculation
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="w-full bg-card-bg border-0 rounded-sm shadow-card flex flex-col font-sans">
      {/* Top Toolbar: Search + Filter Chips + Controls */}
      <div className="p-4 border-b border-border/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left / Start: Search Box */}
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass
            className="w-4 h-4 text-text-muted absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none"
            weight="bold"
          />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={language === 'ar' ? searchPlaceholderAr : searchPlaceholderEn}
            className="w-full h-9 ps-9 pe-3 bg-page-bg border border-border rounded-[4px] text-xs font-normal text-text-primary placeholder:text-text-placeholder focus:bg-card-bg focus:border-primary-action focus:ring-1 focus:ring-primary-action outline-none transition-all"
          />
        </div>

        {/* Right / End: Filter Chips, Density, Column Visibility */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Optional Filter Chips */}
          {filterChips && filterChips.length > 0 && (
            <div className="flex items-center gap-1.5 p-0.5 bg-page-bg border border-border-subtle rounded-[6px] overflow-x-auto">
              {filterChips.map((chip) => {
                const isActive = activeFilterChip === chip.id;
                const label = language === 'ar' ? chip.labelAr : chip.labelEn;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => onFilterChipChange?.(chip.id)}
                    className={cn(
                      'px-2.5 py-1 text-xs font-medium rounded-[4px] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5',
                      isActive
                        ? 'bg-card-bg text-primary-action font-bold shadow-xs border border-border/60'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    <span>{label}</span>
                    {chip.count !== undefined && (
                      <span
                        className={cn(
                          'px-1.5 py-0.2 rounded-full text-[10px] font-numeric',
                          isActive ? 'bg-primary-soft text-primary-action' : 'bg-border/60 text-text-muted'
                        )}
                      >
                        {chip.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Density Selector */}
          {showDensitySelector && onDensityChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="h-9 px-2.5 rounded-[4px] border border-border bg-card-bg text-text-secondary hover:text-text-primary hover:bg-page-bg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'كثافة العرض' : 'Table density'}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-text-muted" />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'الكثافة' : 'Density'}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-36">
                <DropdownMenuLabel>
                  {language === 'ar' ? 'اختر الكثافة' : 'Row Density'}
                </DropdownMenuLabel>
                {(['xl', 'lg', 'default', 'sm', 'xs'] as TableDensity[]).map((d) => (
                  <DropdownMenuItem
                    key={d}
                    onClick={() => onDensityChange(d)}
                    className={cn(
                      'flex items-center justify-between text-xs',
                      density === d ? 'text-primary-action font-bold bg-primary-soft/50' : ''
                    )}
                  >
                    <span className="uppercase">{d}</span>
                    {density === d && <Check className="w-3.5 h-3.5 text-primary-action" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Column Visibility Menu */}
          {showColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="h-9 px-2.5 rounded-[4px] border border-border bg-card-bg text-text-secondary hover:text-text-primary hover:bg-page-bg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Funnel className="w-3.5 h-3.5 text-text-muted" />
                  <span className="hidden sm:inline">
                    {language === 'ar' ? 'الأعمدة' : 'Columns'}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-48 max-h-60 overflow-y-auto">
                <DropdownMenuLabel>
                  {language === 'ar' ? 'إظهار / إخفاء الأعمدة' : 'Toggle Columns'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllLeafColumns()
                  .filter((column: any) => column.id !== 'select' && column.id !== 'actions')
                  .map((column: any) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(val: any) => column.toggleVisibility(!!val)}
                        className="text-xs"
                      >
                        {typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Row Selection Banner */}
      {selectedCount > 0 && (
        <div className="bg-primary-soft border-b border-primary-200 px-4 py-2 flex items-center justify-between text-xs text-primary-action">
          <div className="flex items-center gap-2">
            <span className="font-bold">
              {language === 'ar'
                ? `تم تحديد ${selectedCount} صفوف من أصل ${totalRows}`
                : `${selectedCount} of ${totalRows} rows selected`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setRowSelection({})}
            className="underline font-medium hover:text-primary-700 cursor-pointer"
          >
            {language === 'ar' ? 'إلغاء التحديد' : 'Clear selection'}
          </button>
        </div>
      )}

      {/* Main Table Container: Scrollable horizontally on mobile */}
      <div className="w-full overflow-x-auto relative min-h-[180px]">
        <table className="w-full text-start border-collapse text-xs">
          {/* Sticky Header: 44px, light gray background #F8FAFC, 12px bold (Arabic 13px bold) */}
          <thead className="bg-[#F8FAFC] border-b border-border/40 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const isNumeric = Boolean((header.column.columnDef as any).isNumeric);
                  const widthClass = getColumnWidthClass(
                    header.column.id,
                    (header.column.columnDef as any).minWidthClass
                  );

                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'font-bold text-xs select-none border-b border-border/40 text-text-primary',
                        isNumeric ? 'text-end' : 'text-start',
                        widthClass,
                        densityHeaderPadding,
                        canSort ? 'cursor-pointer hover:bg-black/2' : ''
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className={cn('flex items-center gap-1.5', isNumeric ? 'justify-end' : 'justify-between')}>
                        <span className="truncate">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {canSort && (
                          <span className="shrink-0 text-text-muted">
                            {sortDir === 'asc' ? (
                              <CaretUp className="w-3.5 h-3.5 text-primary-action" weight="bold" />
                            ) : sortDir === 'desc' ? (
                              <CaretDown className="w-3.5 h-3.5 text-primary-action" weight="bold" />
                            ) : (
                              <CaretUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Table Body: 14px regular, secondary cells gray-600, primary cell darker */}
          <tbody className="divide-y divide-border/40 bg-card-bg text-sm">
            {isLoading ? (
              // Loading Skeleton State
              Array.from({ length: 5 }).map((_, rIdx) => (
                <tr key={`loading-${rIdx}`} className="animate-pulse">
                  {table.getVisibleLeafColumns().map((col: any, cIdx: number) => {
                    const widthClass = getColumnWidthClass(
                      col.id,
                      (col.columnDef as any).minWidthClass
                    );
                    return (
                      <td key={`loading-${rIdx}-${cIdx}`} className={cn(densityPadding, widthClass)}>
                        <Skeleton className="h-4 w-full max-w-[120px]" />
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : isError ? (
              // Error State
              <tr>
                <td colSpan={table.getVisibleLeafColumns().length} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <WarningCircle className="w-8 h-8 text-danger-action" weight="bold" />
                    <p className="text-sm font-bold text-text-primary">
                      {errorMessage || (language === 'ar' ? 'حدث خطأ أثناء تحميل البيانات' : 'Error loading data')}
                    </p>
                    {onRetry && (
                      <button
                        type="button"
                        onClick={onRetry}
                        className="mt-2 px-3 py-1.5 bg-primary-action text-white text-xs font-semibold rounded-sm hover:bg-primary-700 transition-colors cursor-pointer"
                      >
                        {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={table.getVisibleLeafColumns().length} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto px-4">
                    <div className="w-12 h-12 rounded-full bg-page-bg border border-border flex items-center justify-center text-text-muted">
                      <MagnifyingGlass className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-text-primary">
                      {language === 'ar' ? emptyTitleAr : emptyTitleEn}
                    </p>
                    <p className="text-xs text-text-muted">
                      {language === 'ar' ? emptyDescriptionAr : emptyDescriptionEn}
                    </p>
                    {globalFilter && (
                      <button
                        type="button"
                        onClick={() => setGlobalFilter('')}
                        className="mt-2 px-3 py-1 text-xs text-primary-action hover:underline font-medium cursor-pointer"
                      >
                        {language === 'ar' ? 'مسح عبارة البحث' : 'Clear search'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // Render Table Rows (no zebra, 1px light separator, neutral styling)
              table.getRowModel().rows.map((row: any) => {
                const isSelected = row.getIsSelected();
                return (
                  <tr
                    key={row.id}
                    className={cn(
                      'transition-colors hover:bg-page-bg/60',
                      isSelected ? 'bg-primary-soft/30' : ''
                    )}
                  >
                    {row.getVisibleCells().map((cell: any, cIdx: number) => {
                      const isPrimaryCell = cIdx === (showSelection ? 1 : 0);
                      const isNumeric = Boolean((cell.column.columnDef as any).isNumeric);
                      const widthClass = getColumnWidthClass(
                        cell.column.id,
                        (cell.column.columnDef as any).minWidthClass
                      );
                      const isStatus = cell.column.id === 'status';

                      return (
                        <td
                          key={cell.id}
                          className={cn(
                            'align-middle text-sm',
                            isPrimaryCell ? 'text-text-primary font-medium' : 'text-gray-600 font-normal',
                            isNumeric ? 'text-end font-numeric tabular-nums whitespace-nowrap' : '',
                            isStatus ? 'whitespace-nowrap' : '',
                            widthClass,
                            densityPadding
                          )}
                        >
                          <div className={cn(isStatus || isNumeric ? 'whitespace-nowrap' : 'line-clamp-2')}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Optional Totals Footer Row: Spanning label before first numeric column, non-wrapping amounts */}
          {showTotalsRow && totalsData && !isLoading && !isError && totalRows > 0 && (() => {
            const visibleCols = table.getVisibleLeafColumns();
            const firstNumIdx = visibleCols.findIndex((col: any) => Boolean((col.columnDef as any).isNumeric));
            const colSpan = firstNumIdx > 0 ? firstNumIdx : 1;
            const remainingCols = visibleCols.slice(colSpan);
            const totalLabel =
              totalsData._label ||
              totalsData.label ||
              totalsData.projectName ||
              (language === 'ar' ? 'الإجمالي العام:' : 'Grand Total:');

            return (
              <tfoot className="bg-primary-soft/60 border-t-2 border-primary-200 font-bold text-text-primary">
                <tr>
                  <td
                    colSpan={colSpan}
                    className={cn(densityPadding, 'align-middle whitespace-nowrap font-bold text-start')}
                  >
                    {totalLabel}
                  </td>
                  {remainingCols.map((column: any) => {
                    const val = totalsData[column.id];
                    const isNum = Boolean((column.columnDef as any).isNumeric);
                    const widthClass = getColumnWidthClass(
                      column.id,
                      (column.columnDef as any).minWidthClass
                    );
                    return (
                      <td
                        key={column.id}
                        className={cn(
                          'align-middle whitespace-nowrap',
                          densityPadding,
                          isNum ? 'text-end font-numeric tabular-nums' : 'text-start',
                          widthClass
                        )}
                      >
                        {val !== undefined ? (
                          typeof val === 'number' ? (
                            <span className="font-numeric tabular-nums">{val.toLocaleString('en-US')}</span>
                          ) : (
                            val
                          )
                        ) : (
                          ''
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            );
          })()}
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && !isError && totalRows > 0 && (
        <div className="p-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
          {/* Showing x to y of z */}
          <div className="flex items-center gap-4">
            <span className="font-numeric">
              {language === 'ar'
                ? `عرض ${startRow} إلى ${endRow} من إجمالي ${totalRows} سجل`
                : `Showing ${startRow} to ${endRow} of ${totalRows} entries`}
            </span>

            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5">
              <span>{language === 'ar' ? 'صفوف لكل صفحة:' : 'Rows per page:'}</span>
              <select
                aria-label={language === 'ar' ? 'صفوف لكل صفحة' : 'Rows per page'}
                value={pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="h-7 px-2 bg-page-bg border border-border rounded text-xs font-numeric text-text-primary focus:border-primary-action outline-none cursor-pointer"
              >
                {pageSizeOptions.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Page Navigation Buttons */}
          <div className="flex items-center gap-1 font-numeric">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 px-2.5 rounded border border-border bg-card-bg text-text-secondary hover:bg-page-bg hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
              aria-label={language === 'ar' ? 'الصفحة السابقة' : 'Previous page'}
            >
              {isRTL ? <CaretRight className="w-3.5 h-3.5" /> : <CaretLeft className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">
                {language === 'ar' ? 'السابق' : 'Previous'}
              </span>
            </button>

            {/* Page numbers preview */}
            <div className="flex items-center gap-1 px-1">
              <span className="px-2 py-1 rounded bg-primary-action text-white font-bold">
                {pageIndex + 1}
              </span>
              <span>/</span>
              <span>{table.getPageCount() || 1}</span>
            </div>

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 px-2.5 rounded border border-border bg-card-bg text-text-secondary hover:bg-page-bg hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
              aria-label={language === 'ar' ? 'الصفحة التالية' : 'Next page'}
            >
              <span className="hidden sm:inline">
                {language === 'ar' ? 'التالي' : 'Next'}
              </span>
              {isRTL ? <CaretLeft className="w-3.5 h-3.5" /> : <CaretRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
