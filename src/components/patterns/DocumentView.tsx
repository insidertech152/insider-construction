import React from 'react';
import {
  Printer,
  DownloadSimple,
  PencilSimple,
  ShareNetwork,
  PaperPlaneTilt,
  Eye,
  CheckCircle,
  Buildings,
  User,
  CalendarBlank,
  FileText,
  ShieldCheck,
  X,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import { BOQItem, formatPiastres } from './EditableItemsTable';

export interface DocumentPartyInfo {
  name: string;
  taxNumber?: string;
  commercialRecord?: string;
  address: string;
  phone: string;
  email?: string;
}

export interface DocumentViewProps {
  documentNumber?: string;
  documentDate?: string;
  validUntil?: string;
  status?: string;
  fromParty?: DocumentPartyInfo;
  toParty?: DocumentPartyInfo;
  items?: BOQItem[];
  subtotalPiastres?: number;
  discountPiastres?: number;
  taxPiastres?: number;
  grandTotalPiastres?: number;
  termsAndConditions?: string[];
  onEdit?: () => void;
  onDownload?: () => void;
  onSend?: () => void;
  onShare?: () => void;
  onCancel?: () => void;
}

export function DocumentView({
  documentNumber = 'QT-2025-0842',
  documentDate = '2025-04-15',
  validUntil = '2025-05-15',
  status = 'معتمد',
  fromParty = {
    name: 'شركة الأفق للمقاولات العامة والتشطيبات الفاخرة',
    taxNumber: '492-310-884',
    commercialRecord: '109283-القاهرة',
    address: 'التجمع الخامس - شارع التسعين الشمالي - مبنى كابيتال برايم',
    phone: '+20 100 234 5678',
    email: 'info@alofok-decor.eg',
  },
  toParty = {
    name: 'م. عمر عبد العزيز الشريف',
    address: 'مشروع فيلا 114 - كمبوند سوديك إيست - مدينة الشروق',
    phone: '+20 122 987 6543',
    email: 'omar.elsharif@gmail.com',
  },
  items = [
    {
      id: 'doc-1',
      name: 'دهان بلاستيك نصف لامع جوتن فينومستك',
      description: 'وشين سيلر + 3 سكينات معجون دايتون + 2 وش تشطيب ناعم ألوان معتمدة',
      workType: 'دهانات وديكورات',
      quantity: 120,
      unit: 'م²',
      unitPricePiastres: 13500, // 135.00 EGP
    },
    {
      id: 'doc-2',
      name: 'تأسيس وتشطيب نقطة كهرباء فينوس',
      description: 'مواسير مصطفى محمود مع أسلاك السويدي أصلية وشاسيه ومفاتيح سانشي',
      workType: 'أعمال كهرباء وإنارة',
      quantity: 35,
      unit: 'نقطة',
      unitPricePiastres: 26000, // 260.00 EGP
    },
    {
      id: 'doc-3',
      name: 'توريد وتركيب سيراميك أرضيات فرز أول كليوباترا',
      description: 'مونة أسمنتية محسنة بالمواد الرابطة وفواصل صليبة 2 مم وسقية معالجة',
      workType: 'سيراميك وبورسلين',
      quantity: 85,
      unit: 'م²',
      unitPricePiastres: 28500, // 285.00 EGP
    },
    {
      id: 'doc-4',
      name: 'قواطع وتجاليد أسقف جبسوم بورد كناوف',
      description: 'شاسيه صاج 0.4 مم مع ألواح مقاومة للرطوبة وتيب وفايبر للمفاصل',
      workType: 'أسقف معلقة وجبس',
      quantity: 40,
      unit: 'م²',
      unitPricePiastres: 24000, // 240.00 EGP
    },
  ],
  subtotalPiastres = 5915000, // 59,150.00 EGP
  discountPiastres = 295750, // 2,957.50 EGP (5%)
  taxPiastres = 786695, // 7,866.95 EGP (14%)
  grandTotalPiastres = 6405945, // 64,059.45 EGP
  termsAndConditions = [
    'مدة تنفيذ الأعمال المتفق عليها: 45 يوماً عمل من تاريخ تسليم الموقع خالي من العوائق.',
    'دفعة مقدمة 40% عند توقيع العقد، و40% مستخلصات مرحلية حسب الإنجاز، و20% عند التسليم النهائي.',
    'ضمان لمدة 12 شهراً على كافة الأعمال المنفذة ضد عيوب الصناعة والتركيب.',
    'الأسعار تشمل التشوين والنقل وإزالة المخلفات أولاً بأول حتى المقالب العمومية.',
  ],
  onEdit,
  onDownload,
  onSend,
  onShare,
  onCancel,
}: DocumentViewProps) {
  const { language, isRTL } = useTranslation();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full space-y-4 font-sans max-w-4xl mx-auto">
      {/* Top Action Icon Bar (Hidden when printing via .no-print) */}
      <div className="no-print bg-card-bg border border-border rounded-[8px] p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-numeric font-bold text-sm text-text-primary">
            {documentNumber}
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-success-soft text-success-700 border border-success-200 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" weight="bold" />
            <span>{status}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="h-8 px-2.5 rounded border border-border bg-card-bg text-text-secondary hover:text-text-primary hover:bg-page-bg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title={language === 'ar' ? 'تعديل الوثيقة' : 'Edit Document'}
            >
              <PencilSimple className="w-3.5 h-3.5 text-info-action" />
              <span className="hidden sm:inline">{language === 'ar' ? 'تعديل' : 'Edit'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePrint}
            className="h-8 px-2.5 rounded border border-border bg-card-bg text-text-secondary hover:text-text-primary hover:bg-page-bg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title={language === 'ar' ? 'طباعة الوثيقة' : 'Print'}
          >
            <Printer className="w-3.5 h-3.5 text-primary-action" />
            <span>{language === 'ar' ? 'طباعة' : 'Print'}</span>
          </button>

          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="h-8 px-2.5 rounded border border-border bg-card-bg text-text-secondary hover:text-text-primary hover:bg-page-bg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title={language === 'ar' ? 'تنزيل PDF' : 'Download PDF'}
            >
              <DownloadSimple className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'ar' ? 'تنزيل PDF' : 'Download'}</span>
            </button>
          )}

          {onSend && (
            <button
              type="button"
              onClick={onSend}
              className="h-8 px-2.5 rounded bg-primary-action text-white hover:bg-primary-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title={language === 'ar' ? 'إرسال للعميل' : 'Send to client'}
            >
              <PaperPlaneTilt className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إرسال' : 'Send'}</span>
            </button>
          )}

          {onShare && (
            <button
              type="button"
              onClick={onShare}
              className="h-8 px-2 rounded border border-border bg-card-bg text-text-secondary hover:text-text-primary hover:bg-page-bg text-xs flex items-center justify-center transition-colors cursor-pointer"
              title={language === 'ar' ? 'مشاركة الرابط' : 'Share link'}
            >
              <ShareNetwork className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Printable Document Page (A4 Paper Aspect) */}
      <div className="print-card bg-card-bg border border-border rounded-[8px] p-6 sm:p-10 shadow-sm font-sans space-y-6">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-border gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-[6px] bg-primary-action text-white flex items-center justify-center font-bold text-lg">
                أ
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  {fromParty.name}
                </h2>
                <p className="text-xs text-text-muted">
                  {language === 'ar' ? 'مقايسة أعمال تشطيبات وديكور رسميّة' : 'Official Finishing Quotation & BOQ'}
                </p>
              </div>
            </div>
          </div>

          <div className="text-end font-numeric space-y-1">
            <div className="text-xs text-text-secondary">
              <span className="font-semibold text-text-primary">{language === 'ar' ? 'رقم العرض: ' : 'Quote #: '}</span>
              <span className="font-bold text-primary-action">{documentNumber}</span>
            </div>
            <div className="text-xs text-text-muted">
              <span>{language === 'ar' ? 'تاريخ الإصدار: ' : 'Date: '}</span>
              <span>{documentDate}</span>
            </div>
            <div className="text-xs text-text-muted">
              <span>{language === 'ar' ? 'صالح حتى: ' : 'Valid Until: '}</span>
              <span>{validUntil}</span>
            </div>
          </div>
        </div>

        {/* From / To Party Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* From Party */}
          <div className="p-4 rounded-[6px] bg-page-bg/60 border border-border-subtle space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-text-primary pb-1 border-b border-border-subtle">
              <Buildings className="w-4 h-4 text-primary-action" />
              <span>{language === 'ar' ? 'جهة التعاقد (المنفذ):' : 'From:'}</span>
            </div>
            <p className="font-bold text-text-primary">{fromParty.name}</p>
            {fromParty.taxNumber && (
              <p className="text-text-secondary font-numeric">
                <span className="text-text-muted">{language === 'ar' ? 'الرقم الضريبي: ' : 'Tax ID: '}</span>
                <span>{fromParty.taxNumber}</span>
              </p>
            )}
            <p className="text-text-secondary">{fromParty.address}</p>
            <p className="text-text-secondary font-numeric">{fromParty.phone}</p>
          </div>

          {/* To Party */}
          <div className="p-4 rounded-[6px] bg-page-bg/60 border border-border-subtle space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-text-primary pb-1 border-b border-border-subtle">
              <User className="w-4 h-4 text-info-action" />
              <span>{language === 'ar' ? 'العميل الكريم:' : 'To:'}</span>
            </div>
            <p className="font-bold text-text-primary">{toParty.name}</p>
            <p className="text-text-secondary">{toParty.address}</p>
            <p className="text-text-secondary font-numeric">{toParty.phone}</p>
            {toParty.email && <p className="text-text-secondary">{toParty.email}</p>}
          </div>
        </div>

        {/* Items Table */}
        <div className="border border-border rounded-[6px] overflow-hidden">
          <table className="w-full text-start border-collapse text-xs">
            <thead className="bg-[#FAFBFD] border-b border-border text-text-secondary select-none font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center w-10">#</th>
                <th className="py-2.5 px-3 text-start min-w-[200px]">
                  {language === 'ar' ? 'بيان الأعمال والمواصفات' : 'Item Description'}
                </th>
                <th className="py-2.5 px-3 text-center w-24">
                  {language === 'ar' ? 'الكمية' : 'Qty'}
                </th>
                <th className="py-2.5 px-3 text-start w-20">
                  {language === 'ar' ? 'الوحدة' : 'Unit'}
                </th>
                <th className="py-2.5 px-3 text-end w-28">
                  {language === 'ar' ? 'سعر الوحدة' : 'Unit Price'}
                </th>
                <th className="py-2.5 px-3 text-end w-32">
                  {language === 'ar' ? 'الإجمالي (ج.م)' : 'Total (EGP)'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle bg-card-bg">
              {items.map((item, idx) => {
                const total = item.quantity * item.unitPricePiastres;
                return (
                  <tr key={item.id}>
                    <td className="py-2.5 px-3 text-center text-text-muted font-numeric">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3">
                      <p className="font-bold text-text-primary">{item.name}</p>
                      <p className="text-[11px] text-text-muted mt-0.5">{item.description}</p>
                    </td>
                    <td className="py-2.5 px-3 text-center font-numeric font-medium">
                      {item.quantity}
                    </td>
                    <td className="py-2.5 px-3 text-text-secondary">
                      {item.unit}
                    </td>
                    <td className="py-2.5 px-3 text-end font-numeric tabular-nums">
                      {formatPiastres(item.unitPricePiastres)}
                    </td>
                    <td className="py-2.5 px-3 text-end font-numeric tabular-nums font-bold text-text-primary">
                      {formatPiastres(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Section Aligned to Inline-End */}
        <div className="flex justify-end">
          <div className="w-full sm:w-80 space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between text-text-secondary">
              <span>{language === 'ar' ? 'المجموع قبل الخصم:' : 'Subtotal:'}</span>
              <span className="font-numeric tabular-nums font-semibold">
                {formatPiastres(subtotalPiastres)} ج.م
              </span>
            </div>
            {discountPiastres > 0 && (
              <div className="flex items-center justify-between text-text-secondary">
                <span>{language === 'ar' ? 'الخصم الممنوح:' : 'Discount:'}</span>
                <span className="font-numeric tabular-nums font-semibold text-danger-action">
                  - {formatPiastres(discountPiastres)} ج.م
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-text-secondary">
              <span>{language === 'ar' ? 'ضريبة القيمة المضافة (14%):' : 'VAT (14%):'}</span>
              <span className="font-numeric tabular-nums font-semibold">
                + {formatPiastres(taxPiastres)} ج.م
              </span>
            </div>
            <div className="pt-2 border-t-2 border-border flex items-center justify-between font-bold text-sm text-text-primary">
              <span className="text-primary-action">{language === 'ar' ? 'الإجمالي العام:' : 'Grand Total:'}</span>
              <span className="font-numeric tabular-nums text-base text-primary-action font-extrabold">
                {formatPiastres(grandTotalPiastres)} ج.م
              </span>
            </div>
          </div>
        </div>

        {/* Notes & Terms Section */}
        {termsAndConditions && termsAndConditions.length > 0 && (
          <div className="p-4 rounded-[6px] bg-[#FAFBFD] border border-border-subtle space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-text-primary">
              <ShieldCheck className="w-4 h-4 text-success-600" />
              <span>{language === 'ar' ? 'الشروط والملاحظات التنفيذية:' : 'Terms & Conditions:'}</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-text-secondary text-[11px] leading-relaxed ps-1">
              {termsAndConditions.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Signatures Row */}
        <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
          <div>
            <p className="font-bold text-text-secondary">{language === 'ar' ? 'توقيع واعتماد العميل' : 'Client Signature'}</p>
            <div className="h-12 border-b border-dashed border-border mt-2" />
          </div>
          <div>
            <p className="font-bold text-text-secondary">{language === 'ar' ? 'ختم وتوقيع الشركة' : 'Company Seal & Stamp'}</p>
            <div className="h-12 border-b border-dashed border-border mt-2" />
          </div>
        </div>

        {/* Footer Print & Cancel buttons (no-print) */}
        <div className="no-print pt-4 border-t border-border flex items-center justify-end gap-2.5">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="h-9 px-4 rounded-[4px] border border-border bg-card-bg text-text-secondary hover:bg-page-bg text-xs font-semibold transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'رجوع' : 'Back'}
            </button>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="h-9 px-4 rounded-[4px] bg-primary-action text-white hover:bg-primary-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'ar' ? 'طباعة الوثيقة الآن (A4)' : 'Print Document Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
