import React, { useState } from 'react';
import {
  Plus,
  Trash,
  Calculator,
  CurrencyCircleDollar,
  Percent,
  Lock,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import { useRole } from '@/src/context/RoleContext';
import { BidiNumber } from '@/src/components/ui/bidi-number';

export interface BOQItem {
  id: string;
  name: string;
  description: string;
  workType: string;
  quantity: number;
  unit: string;
  // Internal monetary values in integer piastres (1 EGP = 100 piastres)
  costPiastres?: number;
  unitPricePiastres: number;
}

export const WORK_TYPES_AR = [
  'دهانات وديكورات',
  'أعمال كهرباء وإنارة',
  'سيراميك وبورسلين',
  'سباكة وصحي',
  'نجارة وأبواب',
  'أسقف معلقة وجبس',
  'عزل مائي وحراري',
  'ألوميتال وواجهات',
];

export const WORK_TYPES_EN = [
  'Painting & Finishes',
  'Electrical & Lighting',
  'Ceramics & Porcelain',
  'Plumbing & Sanitary',
  'Carpentry & Doors',
  'Suspended Ceilings & Gypsum',
  'Waterproofing & Insulation',
  'Alumil & Glass',
];

export const UNITS_AR = ['م²', 'م.ط', 'نقطة', 'عدد', 'مقطوعية'];
export const UNITS_EN = ['m²', 'l.m', 'point', 'unit', 'lump sum'];

export interface EditableItemsTableProps {
  initialItems?: BOQItem[];
  onChange?: (items: BOQItem[]) => void;
  taxRatePercent?: number; // e.g. 14 for 14% VAT
  discountPercent?: number;
  onDiscountPercentChange?: (discount: number) => void;
  readOnly?: boolean;
}

// Helper to format integer piastres into standard currency format
export function formatPiastres(piastres?: number): string {
  if (piastres === undefined || isNaN(piastres)) return '0.00';
  const egp = piastres / 100;
  return egp.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function EditableItemsTable({
  initialItems,
  onChange,
  taxRatePercent = 14,
  discountPercent = 0,
  onDiscountPercentChange,
  readOnly = false,
}: EditableItemsTableProps) {
  const { language } = useTranslation();
  const { hasPermission } = useRole();
  const canViewCost = hasPermission('view_cost');

  const [items, setItems] = useState<BOQItem[]>(() => {
    if (initialItems && initialItems.length > 0) return initialItems;
    return [
      {
        id: 'boq-1',
        name: 'دهان بلاستيك نصف لامع جوتن فينومستك',
        description: 'وشين سيلر + 3 سكينات معجون دايتون + 2 وش تشطيب ناعم',
        workType: 'دهانات وديكورات',
        quantity: 120,
        unit: 'م²',
        costPiastres: 8500, // 85.00 EGP cost
        unitPricePiastres: 13500, // 135.00 EGP sell
      },
      {
        id: 'boq-2',
        name: 'تأسيس وتشطيب نقطة كهرباء فينوس',
        description: 'مواسير مصطفى محمود مع أسلاك السويدي أصلية وشاسيه ومفاتيح',
        workType: 'أعمال كهرباء وإنارة',
        quantity: 35,
        unit: 'نقطة',
        costPiastres: 18000, // 180.00 EGP
        unitPricePiastres: 26000, // 260.00 EGP
      },
      {
        id: 'boq-3',
        name: 'توريد وتركيب سيراميك أرضيات فرز أول كليوباترا',
        description: 'مونة أسمنتية محسنة بالمواد الرابطة وفواصل صليبة 2 مم',
        workType: 'سيراميك وبورسلين',
        quantity: 85,
        unit: 'م²',
        costPiastres: 19500, // 195.00 EGP
        unitPricePiastres: 28500, // 285.00 EGP
      },
      {
        id: 'boq-4',
        name: 'قواطع وتجاليد أسقف جبسوم بورد كناوف',
        description: 'شاسيه صاج 0.4 مم مع ألواح مقاومة للرطوبة وتيب وفايبر للمفاصل',
        workType: 'أسقف معلقة وجبس',
        quantity: 40,
        unit: 'م²',
        costPiastres: undefined, // cost unknown for demo of "margin unknown"
        unitPricePiastres: 24000, // 240.00 EGP
      },
    ];
  });

  const [discount, setDiscount] = useState<number>(discountPercent);

  const updateItems = (newItems: BOQItem[]) => {
    setItems(newItems);
    onChange?.(newItems);
  };

  const handleRowChange = (index: number, field: keyof BOQItem, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    updateItems(next);
  };

  const handleAddItem = () => {
    const newItem: BOQItem = {
      id: `boq-${Date.now()}`,
      name: '',
      description: '',
      workType: language === 'ar' ? WORK_TYPES_AR[0] : WORK_TYPES_EN[0],
      quantity: 1,
      unit: language === 'ar' ? UNITS_AR[0] : UNITS_EN[0],
      costPiastres: undefined,
      unitPricePiastres: 0,
    };
    const next = [...items, newItem];
    updateItems(next);
  };

  const handleDeleteItem = (index: number) => {
    if (items.length <= 1) return;
    const next = items.filter((_, i) => i !== index);
    updateItems(next);
  };

  // Keyboard navigation: Enter in unit price field creates a new row!
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' && index === items.length - 1 && !readOnly) {
      e.preventDefault();
      handleAddItem();
    }
  };

  // Live Totals Calculations (in piastres)
  const subtotalPiastres = items.reduce((acc, item) => {
    const lineTotal = item.quantity * item.unitPricePiastres;
    return acc + (isNaN(lineTotal) ? 0 : lineTotal);
  }, 0);

  const discountPiastres = Math.round((subtotalPiastres * (discount || 0)) / 100);
  const afterDiscountPiastres = Math.max(0, subtotalPiastres - discountPiastres);
  const taxPiastres = Math.round((afterDiscountPiastres * taxRatePercent) / 100);
  const grandTotalPiastres = afterDiscountPiastres + taxPiastres;

  // Margin calculation
  const totalCostPiastres = items.reduce((acc, item) => {
    if (item.costPiastres !== undefined) {
      return acc + item.quantity * item.costPiastres;
    }
    return acc;
  }, 0);

  return (
    <div className="w-full space-y-4 font-sans">
      {/* Table Container */}
      <div className="bg-card-bg border border-border rounded-[8px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-w-[750px]">
          <table className="w-full text-start border-collapse text-xs">
            <thead className="bg-[#FAFBFD] border-b border-border text-text-secondary select-none">
              <tr>
                <th className="py-2.5 px-3 text-start font-semibold w-12">#</th>
                <th className="py-2.5 px-3 text-start font-semibold min-w-[180px]">
                  <span>{language === 'ar' ? 'البند وتفاصيل العمل' : 'Item & Description'}</span>
                  <span className="text-danger-action ms-0.5">*</span>
                </th>
                <th className="py-2.5 px-3 text-start font-semibold w-36">
                  <span>{language === 'ar' ? 'نوع البند' : 'Work Type'}</span>
                  <span className="text-danger-action ms-0.5">*</span>
                </th>
                <th className="py-2.5 px-3 text-center font-semibold w-24">
                  {language === 'ar' ? 'الكمية' : 'Qty'}
                </th>
                <th className="py-2.5 px-3 text-start font-semibold w-24">
                  {language === 'ar' ? 'الوحدة' : 'Unit'}
                </th>
                {canViewCost && (
                  <th className="py-2.5 px-3 text-end font-semibold min-w-[140px] text-text-secondary bg-[#FAFBFD]">
                    <div className="flex items-center justify-end gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-text-muted" weight="bold" />
                      <span>{language === 'ar' ? 'التكلفة (خاص بالإدارة)' : 'Cost (Management only)'}</span>
                    </div>
                  </th>
                )}
                <th className="py-2.5 px-3 text-end font-semibold w-32">
                  <span>{language === 'ar' ? 'سعر الوحدة (ج.م)' : 'Unit Price (EGP)'}</span>
                  <span className="text-danger-action ms-0.5">*</span>
                </th>
                <th className="py-2.5 px-3 text-end font-semibold w-32">
                  {language === 'ar' ? 'الإجمالي (ج.م)' : 'Line Total (EGP)'}
                </th>
                {canViewCost && (
                  <th className="py-2.5 px-3 text-center font-semibold min-w-[100px] text-text-secondary bg-[#FAFBFD]">
                    <div className="flex items-center justify-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-text-muted" weight="bold" />
                      <span>{language === 'ar' ? 'الهامش %' : 'Margin %'}</span>
                    </div>
                  </th>
                )}
                {!readOnly && (
                  <th className="py-2.5 px-2 text-center font-semibold w-10"></th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-border-subtle bg-card-bg">
              {items.map((item, idx) => {
                const lineTotalPiastres = item.quantity * item.unitPricePiastres;

                // Compute Margin %
                let marginText = language === 'ar' ? 'هامش غير محدد' : 'margin unknown';
                let marginPercent: number | null = null;
                if (item.costPiastres !== undefined && item.unitPricePiastres > 0) {
                  const profit = item.unitPricePiastres - item.costPiastres;
                  marginPercent = Math.round((profit / item.unitPricePiastres) * 100);
                  marginText = `${marginPercent}%`;
                }

                return (
                  <tr key={item.id} className="hover:bg-page-bg/40 transition-colors">
                    {/* Index */}
                    <td className="py-2.5 px-3 text-text-muted font-numeric text-center">
                      {idx + 1}
                    </td>

                    {/* Name & Description */}
                    <td className="py-2.5 px-3 min-w-[200px]">
                      {readOnly ? (
                        <div>
                          <p className="font-bold text-text-primary">{item.name}</p>
                          <p className="text-[11px] text-text-muted mt-0.5">{item.description}</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleRowChange(idx, 'name', e.target.value)}
                            placeholder={language === 'ar' ? 'اسم البند (مثال: دهان بلاستيك جوتن)...' : 'Item name...'}
                            className="w-full h-7 px-2 bg-page-bg/70 border border-border rounded text-xs text-text-primary focus:bg-card-bg focus:border-primary-action outline-none"
                          />
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleRowChange(idx, 'description', e.target.value)}
                            placeholder={language === 'ar' ? 'مواصفات التنفيذ والمواد المستخدمة...' : 'Execution specs...'}
                            className="w-full h-6 px-2 bg-page-bg/50 border border-border-subtle rounded text-[11px] text-text-secondary focus:bg-card-bg focus:border-primary-action outline-none"
                          />
                        </div>
                      )}
                    </td>

                    {/* Work Type Select */}
                    <td className="py-2.5 px-3">
                      {readOnly ? (
                        <span className="px-2 py-0.5 rounded bg-secondary-soft text-text-secondary text-[11px]">
                          {item.workType}
                        </span>
                      ) : (
                        <select
                          value={item.workType}
                          onChange={(e) => handleRowChange(idx, 'workType', e.target.value)}
                          className="w-full h-7 px-1.5 bg-page-bg/70 border border-border rounded text-xs text-text-primary focus:border-primary-action outline-none cursor-pointer"
                        >
                          {(language === 'ar' ? WORK_TYPES_AR : WORK_TYPES_EN).map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    {/* Quantity */}
                    <td className="py-2.5 px-3">
                      {readOnly ? (
                        <span className="font-numeric font-semibold text-center block">
                          {item.quantity}
                        </span>
                      ) : (
                        <input
                          type="number"
                          min="0.01"
                          step="any"
                          value={item.quantity || ''}
                          onChange={(e) =>
                            handleRowChange(idx, 'quantity', parseFloat(e.target.value) || 0)
                          }
                          className="w-full h-7 px-2 text-center font-numeric tabular-nums bg-page-bg/70 border border-border rounded text-xs text-text-primary focus:bg-card-bg focus:border-primary-action outline-none"
                        />
                      )}
                    </td>

                    {/* Unit Select */}
                    <td className="py-2.5 px-3">
                      {readOnly ? (
                        <span className="text-text-secondary">{item.unit}</span>
                      ) : (
                        <select
                          value={item.unit}
                          onChange={(e) => handleRowChange(idx, 'unit', e.target.value)}
                          className="w-full h-7 px-1.5 bg-page-bg/70 border border-border rounded text-xs text-text-primary focus:border-primary-action outline-none cursor-pointer"
                        >
                          {(language === 'ar' ? UNITS_AR : UNITS_EN).map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    {/* Cost Price (Guarded by permission="view_cost") - Neutral Styling */}
                    {canViewCost && (
                      <td className="py-2.5 px-3">
                        {readOnly ? (
                          <span className="font-numeric tabular-nums text-end block text-gray-700 whitespace-nowrap">
                            {formatPiastres(item.costPiastres)}
                          </span>
                        ) : (
                          <input
                            type="number"
                            min="0"
                            step="any"
                            placeholder="0.00"
                            value={
                              item.costPiastres !== undefined
                                ? item.costPiastres / 100
                                : ''
                            }
                            onChange={(e) => {
                              const val = e.target.value;
                              const num = parseFloat(val);
                              handleRowChange(
                                idx,
                                'costPiastres',
                                isNaN(num) ? undefined : Math.round(num * 100)
                              );
                            }}
                            className="w-full h-7 px-2 text-end font-numeric tabular-nums bg-page-bg/70 border border-border rounded text-xs text-text-primary focus:bg-card-bg focus:border-primary-action outline-none"
                          />
                        )}
                      </td>
                    )}

                    {/* Unit Price (in Piastres internally) */}
                    <td className="py-2.5 px-3">
                      {readOnly ? (
                        <span className="font-numeric tabular-nums font-semibold text-end block text-text-primary whitespace-nowrap">
                          {formatPiastres(item.unitPricePiastres)}
                        </span>
                      ) : (
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={
                            item.unitPricePiastres ? item.unitPricePiastres / 100 : ''
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            const num = parseFloat(val);
                            handleRowChange(
                              idx,
                              'unitPricePiastres',
                              isNaN(num) ? 0 : Math.round(num * 100)
                            );
                          }}
                          onKeyDown={(e) => handleKeyDown(e, idx)}
                          className="w-full h-7 px-2 text-end font-numeric tabular-nums bg-page-bg/70 border border-border rounded text-xs text-text-primary focus:bg-card-bg focus:border-primary-action outline-none"
                        />
                      )}
                    </td>

                    {/* Line Total */}
                    <td className="py-2.5 px-3 text-end font-numeric tabular-nums font-bold text-text-primary whitespace-nowrap">
                      {formatPiastres(lineTotalPiastres)}
                    </td>

                    {/* Margin % (Guarded by permission="view_cost") - Neutral badge with BidiNumber */}
                    {canViewCost && (
                      <td className="py-2.5 px-3 text-center">
                        {marginPercent !== null ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-numeric text-text-secondary bg-slate-100">
                            <BidiNumber value={marginPercent} unit="%" />
                          </span>
                        ) : (
                          <span className="text-[11px] text-text-muted italic">
                            {marginText}
                          </span>
                        )}
                      </td>
                    )}

                    {/* Delete action */}
                    {!readOnly && (
                      <td className="py-2.5 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(idx)}
                          disabled={items.length <= 1}
                          className="p-1 rounded text-text-muted hover:text-danger-action hover:bg-danger-soft transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                          title={language === 'ar' ? 'حذف البند' : 'Delete item'}
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Item Action Bar */}
        {!readOnly && (
          <div className="p-3 border-t border-border bg-page-bg/30 flex items-center justify-between">
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1.5 rounded-[4px] bg-primary-soft text-primary-action hover:bg-primary-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" weight="bold" />
              <span>{language === 'ar' ? 'إضافة بند جديد للمقايسة' : 'Add new item'}</span>
            </button>
            <span className="text-[11px] text-text-muted hidden sm:inline">
              {language === 'ar'
                ? 'نصيحة: اضغط Enter في آخر خلية لإضافة صف تلقائياً'
                : 'Tip: Press Enter in the last cell to auto-add row'}
            </span>
          </div>
        )}
      </div>

      {/* Totals Block (Aligned to inline-end) */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        {/* Cost & Profit Analytics (guarded by permission="view_cost") */}
        {canViewCost && (
          <div className="bg-card-bg border border-border rounded-[8px] p-4 shadow-sm w-full sm:max-w-xs space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-text-secondary font-bold pb-1.5 border-b border-border-subtle">
              <Calculator className="w-4 h-4 text-primary-action" />
              <span>{language === 'ar' ? 'تحليل الأرباح والتكلفة (خاص بالإدارة)' : 'Cost & Margin Summary'}</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>{language === 'ar' ? 'إجمالي التكلفة المقدرة:' : 'Total Estimated Cost:'}</span>
              <span className="font-numeric font-semibold text-text-primary tabular-nums">
                {formatPiastres(totalCostPiastres)} ج.م
              </span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>{language === 'ar' ? 'صافي الربح المتوقع:' : 'Expected Net Profit:'}</span>
              <span className="font-numeric font-bold text-success-700">
                {formatPiastres(Math.max(0, afterDiscountPiastres - totalCostPiastres))} ج.م
              </span>
            </div>
          </div>
        )}

        {/* Quotation Official Totals Block */}
        <div className="bg-card-bg border border-border rounded-[8px] p-4 shadow-sm w-full sm:max-w-md ms-auto space-y-2.5 text-xs font-sans">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-text-secondary">
            <span>{language === 'ar' ? 'مجموع بنود الأعمال (قبل الخصم):' : 'Subtotal:'}</span>
            <span className="font-numeric tabular-nums font-semibold text-text-primary">
              {formatPiastres(subtotalPiastres)} ج.م
            </span>
          </div>

          {/* Discount % */}
          <div className="flex items-center justify-between text-text-secondary">
            <div className="flex items-center gap-2">
              <span>{language === 'ar' ? 'خصم تجاري (%):' : 'Discount (%):'}</span>
              {!readOnly && (
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount || ''}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 0;
                    setDiscount(v);
                    onDiscountPercentChange?.(v);
                  }}
                  className="w-14 h-6 px-1.5 text-center font-numeric border border-border rounded text-xs bg-page-bg text-text-primary"
                />
              )}
            </div>
            <span className="font-numeric tabular-nums font-semibold text-danger-action">
              - {formatPiastres(discountPiastres)} ج.م
            </span>
          </div>

          {/* VAT / Tax */}
          <div className="flex items-center justify-between text-text-secondary">
            <span>
              {language === 'ar'
                ? `ضريبة القيمة المضافة (${taxRatePercent}%):`
                : `VAT Tax (${taxRatePercent}%):`}
            </span>
            <span className="font-numeric tabular-nums font-semibold text-text-primary">
              + {formatPiastres(taxPiastres)} ج.م
            </span>
          </div>

          {/* Grand Total */}
          <div className="pt-2.5 border-t-2 border-border flex items-center justify-between text-sm font-bold text-text-primary bg-primary-soft/30 -mx-4 -mb-4 p-4 rounded-b-[8px]">
            <span className="text-primary-action">
              {language === 'ar' ? 'الإجمالي النهائي المطلوب:' : 'Grand Total:'}
            </span>
            <span className="font-numeric tabular-nums text-base text-primary-action font-extrabold">
              {formatPiastres(grandTotalPiastres)} ج.م
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
