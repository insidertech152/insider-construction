import React, { useState, useMemo } from 'react';
import {
  MagnifyingGlass,
  Eye,
  PencilSimple,
  Trash,
  DotsThreeVertical,
  CaretLeft,
  CaretRight,
  User,
  MapPin,
  CalendarBlank,
  CurrencyCircleDollar,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/src/components/ui/dropdown-menu';

export interface EntityItem {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  avatarBg?: string;
  secondaryInfo?: {
    client?: string;
    location?: string;
    date?: string;
    amount?: number | string;
    code?: string;
  };
  statusBadge: {
    label: string;
    variant: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'info';
  };
  extraMeta?: React.ReactNode;
}

export interface EntityListProps {
  items: EntityItem[];
  filterChips?: { id: string; labelAr: string; labelEn: string; count?: number }[];
  activeFilterChip?: string;
  onFilterChipChange?: (chipId: string) => void;
  onItemView?: (item: EntityItem) => void;
  onItemEdit?: (item: EntityItem) => void;
  onItemDelete?: (item: EntityItem) => void;
  pageSize?: number;
  searchPlaceholderAr?: string;
  searchPlaceholderEn?: string;
}

export function EntityList({
  items,
  filterChips,
  activeFilterChip,
  onFilterChipChange,
  onItemView,
  onItemEdit,
  onItemDelete,
  pageSize = 5,
  searchPlaceholderAr = 'بحث في قائمة الكيانات والمشاريع...',
  searchPlaceholderEn = 'Search entity list...',
}: EntityListProps) {
  const { language, isRTL } = useTranslation();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchClient = item.secondaryInfo?.client?.toLowerCase().includes(q);
      const matchLoc = item.secondaryInfo?.location?.toLowerCase().includes(q);
      const matchCode = item.secondaryInfo?.code?.toLowerCase().includes(q);
      return matchName || matchClient || matchLoc || matchCode;
    });
  }, [items, search]);

  // Pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getBadgeStyle = (variant: EntityItem['statusBadge']['variant']) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-soft text-primary-action border-primary-200';
      case 'success':
        return 'bg-success-soft text-success-action border-success-200';
      case 'warning':
        return 'bg-warning-soft text-warning-700 border-warning-200';
      case 'danger':
        return 'bg-danger-soft text-danger-action border-danger-200';
      case 'info':
        return 'bg-info-soft text-info-action border-info-200';
      default:
        return 'bg-secondary-soft text-secondary-soft-text border-secondary-200';
    }
  };

  return (
    <div className="w-full space-y-4 font-sans">
      {/* Top Search & Filter Bar */}
      <div className="bg-card-bg border border-border rounded-[8px] p-3.5 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass
            className="w-4 h-4 text-text-muted absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none"
            weight="bold"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={language === 'ar' ? searchPlaceholderAr : searchPlaceholderEn}
            className="w-full h-9 ps-9 pe-3 bg-page-bg border border-border rounded-[4px] text-xs font-normal text-text-primary placeholder:text-text-placeholder focus:bg-card-bg focus:border-primary-action outline-none transition-all"
          />
        </div>

        {filterChips && filterChips.length > 0 && (
          <div className="flex items-center gap-1.5 p-0.5 bg-page-bg border border-border-subtle rounded-[6px] overflow-x-auto">
            {filterChips.map((chip) => {
              const isActive = activeFilterChip === chip.id;
              const label = language === 'ar' ? chip.labelAr : chip.labelEn;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    onFilterChipChange?.(chip.id);
                    setCurrentPage(1);
                  }}
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
      </div>

      {/* Cards List: Each row is a separate white card */}
      <div className="space-y-3">
        {paginatedItems.length === 0 ? (
          <div className="bg-card-bg border border-border rounded-[8px] p-12 text-center shadow-sm">
            <p className="text-sm font-bold text-text-primary">
              {language === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching results'}
            </p>
            <p className="text-xs text-text-muted mt-1">
              {language === 'ar' ? 'جرب البحث بكلمات مختلفة أو تغيير التصفية' : 'Try searching with different terms'}
            </p>
          </div>
        ) : (
          paginatedItems.map((item) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={cn(
                  'bg-card-bg border rounded-[8px] p-4 shadow-sm hover:shadow-card transition-all flex flex-col md:flex-row md:items-center justify-between gap-4',
                  isSelected ? 'border-primary-action bg-primary-soft/10 ring-1 ring-primary-action/20' : 'border-border'
                )}
              >
                {/* Left / Start: Checkbox + Avatar + Titles */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 rounded border-border text-primary-action focus:ring-primary-action/30 cursor-pointer accent-primary-action shrink-0"
                    aria-label={`Select ${item.name}`}
                  />

                  {/* Avatar / Icon circle */}
                  <div
                    className={cn(
                      'w-11 h-11 rounded-[8px] flex items-center justify-center font-bold text-sm shrink-0 border border-border/40',
                      item.avatarBg || 'bg-primary-soft text-primary-action'
                    )}
                  >
                    {item.initials || item.name.slice(0, 2)}
                  </div>

                  {/* Name + Secondary Meta */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-text-primary truncate">{item.name}</h4>
                      {item.secondaryInfo?.code && (
                        <span className="font-numeric text-[11px] px-1.5 py-0.5 rounded bg-page-bg border border-border text-text-muted">
                          {item.secondaryInfo.code}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-x-4 gap-y-1 flex-wrap text-xs text-text-muted mt-1">
                      {item.secondaryInfo?.client && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-text-muted" />
                          <span className="text-text-secondary">{item.secondaryInfo.client}</span>
                        </span>
                      )}
                      {item.secondaryInfo?.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-text-muted" />
                          <span>{item.secondaryInfo.location}</span>
                        </span>
                      )}
                      {item.secondaryInfo?.date && (
                        <span className="flex items-center gap-1 font-numeric">
                          <CalendarBlank className="w-3.5 h-3.5 text-text-muted" />
                          <span>{item.secondaryInfo.date}</span>
                        </span>
                      )}
                      {item.secondaryInfo?.amount !== undefined && (
                        <span className="flex items-center gap-1 font-numeric font-semibold text-text-primary">
                          <CurrencyCircleDollar className="w-3.5 h-3.5 text-success-600" />
                          <span>
                            {typeof item.secondaryInfo.amount === 'number'
                              ? item.secondaryInfo.amount.toLocaleString('en-US')
                              : item.secondaryInfo.amount}{' '}
                            ج.م
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right / End: Status Badge + Actions */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border-subtle">
                  {/* Status Badge */}
                  <span
                    className={cn(
                      'px-2.5 py-1 rounded-[4px] text-xs font-semibold border flex items-center gap-1.5',
                      getBadgeStyle(item.statusBadge.variant)
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                    <span>{item.statusBadge.label}</span>
                  </span>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1">
                    {onItemView && (
                      <button
                        type="button"
                        onClick={() => onItemView(item)}
                        className="p-1.5 rounded text-text-muted hover:text-primary-action hover:bg-primary-soft transition-colors cursor-pointer"
                        title={language === 'ar' ? 'عرض' : 'View'}
                        aria-label={language === 'ar' ? 'عرض' : 'View'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    {onItemEdit && (
                      <button
                        type="button"
                        onClick={() => onItemEdit(item)}
                        className="p-1.5 rounded text-text-muted hover:text-info-action hover:bg-info-soft transition-colors cursor-pointer"
                        title={language === 'ar' ? 'تعديل' : 'Edit'}
                        aria-label={language === 'ar' ? 'تعديل' : 'Edit'}
                      >
                        <PencilSimple className="w-4 h-4" />
                      </button>
                    )}
                    {onItemDelete && (
                      <button
                        type="button"
                        onClick={() => onItemDelete(item)}
                        className="p-1.5 rounded text-text-muted hover:text-danger-action hover:bg-danger-soft transition-colors cursor-pointer"
                        title={language === 'ar' ? 'حذف' : 'Delete'}
                        aria-label={language === 'ar' ? 'حذف' : 'Delete'}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    )}

                    {/* Overflow menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-page-bg transition-colors cursor-pointer"
                          aria-label={language === 'ar' ? 'خيارات' : 'Options'}
                        >
                          <DotsThreeVertical className="w-4 h-4" weight="bold" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-40">
                        <DropdownMenuItem onClick={() => onItemView?.(item)}>
                          <Eye className="w-4 h-4 me-2 text-primary-action" />
                          <span>{language === 'ar' ? 'عرض الملف' : 'View item'}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onItemEdit?.(item)}>
                          <PencilSimple className="w-4 h-4 me-2 text-info-action" />
                          <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-danger-action focus:text-danger-action focus:bg-danger-soft"
                          onClick={() => onItemDelete?.(item)}
                        >
                          <Trash className="w-4 h-4 me-2 text-danger-action" />
                          <span>{language === 'ar' ? 'حذف' : 'Delete'}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer */}
      {totalItems > pageSize && (
        <div className="bg-card-bg border border-border rounded-[8px] p-3 shadow-sm flex items-center justify-between text-xs text-text-secondary font-numeric">
          <span>
            {language === 'ar'
              ? `الصفحة ${currentPage} من ${totalPages} (إجمالي ${totalItems} عنصر)`
              : `Page ${currentPage} of ${totalPages} (${totalItems} items)`}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="h-7 px-2 rounded border border-border bg-card-bg hover:bg-page-bg disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {isRTL ? <CaretRight className="w-3.5 h-3.5" /> : <CaretLeft className="w-3.5 h-3.5" />}
              <span>{language === 'ar' ? 'السابق' : 'Previous'}</span>
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="h-7 px-2 rounded border border-border bg-card-bg hover:bg-page-bg disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'ar' ? 'التالي' : 'Next'}</span>
              {isRTL ? <CaretLeft className="w-3.5 h-3.5" /> : <CaretRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
