import React, { useState, useRef } from 'react';
import {
  CalendarBlank,
  UploadSimple,
  Trash,
  Check,
  CaretLeft,
  CaretRight,
  FileText,
  FloppyDisk,
  PaperPlaneTilt,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/src/components/ui/popover';

// ==========================================
// 1. FormField Wrapper
// ==========================================
export interface FormFieldProps {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function FormField({
  label,
  required,
  helperText,
  error,
  children,
  className,
  id,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5 font-sans', className)}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-text-primary select-none"
      >
        <span>{label}</span>
        {required && <span className="text-danger-action ms-0.5">*</span>}
      </label>

      <div>{children}</div>

      {helperText && !error && (
        <p className="text-[11px] text-text-muted mt-1">{helperText}</p>
      )}

      {error && (
        <p className="text-[11px] text-danger-action font-medium mt-1 animate-in fade-in-50">
          {error}
        </p>
      )}
    </div>
  );
}

// ==========================================
// 2. Form Footer Action Bar
// ==========================================
export interface FormActionBarProps {
  onSave?: () => void;
  onSaveAndSend?: () => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
  saveLabel?: string;
  saveAndSendLabel?: string;
  deleteLabel?: string;
}

export function FormActionBar({
  onSave,
  onSaveAndSend,
  onDelete,
  isSubmitting = false,
  saveLabel,
  saveAndSendLabel,
  deleteLabel,
}: FormActionBarProps) {
  const { language } = useTranslation();

  return (
    <div className="bg-card-bg border border-border rounded-[8px] p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
      {/* Delete button on start */}
      <div>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isSubmitting}
            className="h-9 px-3.5 rounded-[4px] bg-danger-soft text-danger-action hover:bg-danger-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Trash className="w-4 h-4" />
            <span>{deleteLabel || (language === 'ar' ? 'حذف النموذج' : 'Delete')}</span>
          </button>
        )}
      </div>

      {/* Save and Save & Send on end */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            disabled={isSubmitting}
            className="h-9 px-4 rounded-[4px] border border-border bg-card-bg text-text-primary hover:bg-page-bg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <FloppyDisk className="w-4 h-4 text-text-muted" />
            <span>{saveLabel || (language === 'ar' ? 'حفظ مسودة' : 'Save Draft')}</span>
          </button>
        )}
        {onSaveAndSend && (
          <button
            type="button"
            onClick={onSaveAndSend}
            disabled={isSubmitting}
            className="h-9 px-4 rounded-[4px] bg-primary-action text-white hover:bg-primary-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            <PaperPlaneTilt className="w-4 h-4" />
            <span>{saveAndSendLabel || (language === 'ar' ? 'حفظ وإرسال للعميل' : 'Save & Send')}</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. Stepper / Wizard with Progress Bar
// ==========================================
export interface StepItem {
  id: string | number;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (index: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const { language } = useTranslation();
  const progressPercent = ((currentStep) / Math.max(steps.length - 1, 1)) * 100;

  return (
    <div className="w-full bg-card-bg border border-border rounded-[8px] p-4 shadow-sm font-sans space-y-4">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-page-bg border border-border-subtle rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-action transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const title = language === 'ar' ? step.titleAr : step.titleEn;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick?.(idx)}
              disabled={!onStepClick}
              className={cn(
                'flex items-center gap-2.5 text-xs text-start transition-all',
                onStepClick ? 'cursor-pointer' : 'cursor-default'
              )}
            >
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center font-numeric font-bold text-xs shrink-0 transition-colors',
                  isCompleted
                    ? 'bg-success-action text-white'
                    : isCurrent
                    ? 'bg-primary-action text-white ring-4 ring-primary-soft'
                    : 'bg-page-bg border border-border text-text-muted'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" weight="bold" /> : idx + 1}
              </div>

              <div className="min-w-0">
                <p
                  className={cn(
                    'font-semibold truncate text-xs',
                    isCurrent ? 'text-primary-action' : isCompleted ? 'text-text-primary' : 'text-text-muted'
                  )}
                >
                  {title}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 4. DatePicker (Gregorian + Western Digits + Egypt Week Start: Saturday)
// ==========================================
export interface DatePickerProps {
  value?: string; // YYYY-MM-DD
  onChange?: (date: string) => void;
  weekStart?: number; // 0=Sunday, 6=Saturday (Egyptian standard)
  placeholder?: string;
  disabled?: boolean;
}

const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];
const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS_AR = ['سبت', 'أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];
const WEEKDAYS_EN = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export function DatePicker({
  value,
  onChange,
  weekStart = 6, // default Saturday for Egypt
  placeholder,
  disabled = false,
}: DatePickerProps) {
  const { language, isRTL } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Parse current or selected date
  const parsedDate = value ? new Date(value) : new Date();
  const [viewYear, setViewYear] = useState(parsedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsedDate.getMonth());

  // Generate calendar days
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday, 6 is Saturday

  // Calculate day offset based on weekStart (default 6 = Saturday)
  const offset = (firstDayOfWeek - weekStart + 7) % 7;

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${viewYear}-${mm}-${dd}`;
    onChange?.(dateStr);
    setIsOpen(false);
  };

  const monthLabel = language === 'ar' ? MONTHS_AR[viewMonth] : MONTHS_EN[viewMonth];
  const weekdayLabels = language === 'ar' ? WEEKDAYS_AR : WEEKDAYS_EN;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'w-full h-9 px-3 bg-page-bg border border-border rounded-[4px] text-xs font-normal text-start flex items-center justify-between text-text-primary hover:bg-card-bg focus:border-primary-action outline-none transition-colors cursor-pointer disabled:opacity-50',
            !value && 'text-text-placeholder'
          )}
        >
          <span className="font-numeric">{value || placeholder || (language === 'ar' ? 'اختر التاريخ...' : 'Select date...')}</span>
          <CalendarBlank className="w-4 h-4 text-text-muted shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent align={isRTL ? 'start' : 'end'} className="w-64 p-3 bg-card-bg border border-border rounded-[8px] shadow-dropdown">
        {/* Month & Year Bar */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-border-subtle">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 rounded hover:bg-page-bg text-text-secondary cursor-pointer"
          >
            {isRTL ? <CaretRight className="w-3.5 h-3.5" /> : <CaretLeft className="w-3.5 h-3.5" />}
          </button>
          <span className="text-xs font-bold font-numeric text-text-primary">
            {monthLabel} {viewYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 rounded hover:bg-page-bg text-text-secondary cursor-pointer"
          >
            {isRTL ? <CaretLeft className="w-3.5 h-3.5" /> : <CaretRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Weekday headers starting Saturday */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {weekdayLabels.map((w, idx) => (
            <span key={idx} className="text-[10px] font-semibold text-text-muted">
              {w}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center font-numeric">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`empty-${i}`} className="h-7" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const currentStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isSelected = value === currentStr;

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => handleSelectDay(dayNum)}
                className={cn(
                  'h-7 w-7 rounded flex items-center justify-center text-xs font-medium cursor-pointer transition-colors',
                  isSelected
                    ? 'bg-primary-action text-white font-bold'
                    : 'text-text-primary hover:bg-page-bg'
                )}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ==========================================
// 5. FileUploader (UI & Preview)
// ==========================================
export interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress?: number;
}

export interface FileUploaderProps {
  files?: UploadedFileItem[];
  onRemoveFile?: (id: string) => void;
  onAddFiles?: (fileNames: string[]) => void;
  acceptTextAr?: string;
  acceptTextEn?: string;
  maxSizeText?: string;
}

export function FileUploader({
  files = [],
  onRemoveFile,
  onAddFiles,
  acceptTextAr = 'المخططات الهندسية، ملفات CAD، صور الموقع، وثائق PDF',
  acceptTextEn = 'Engineering drawings, CAD files, site photos, PDF docs',
  maxSizeText = 'بحد أقصى 25 ميجابايت',
}: FileUploaderProps) {
  const { language } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      onAddFiles?.(names);
    }
  };

  return (
    <div className="space-y-3 font-sans">
      {/* Drag & Drop Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border hover:border-primary-action/60 bg-page-bg/50 hover:bg-primary-soft/10 rounded-[8px] p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="w-10 h-10 rounded-full bg-primary-soft text-primary-action flex items-center justify-center">
          <UploadSimple className="w-5 h-5" weight="bold" />
        </div>
        <p className="text-xs font-bold text-text-primary">
          {language === 'ar' ? 'انقر لرفع المستندات أو اسحب الملفات هنا' : 'Click to upload documents or drag & drop'}
        </p>
        <p className="text-[11px] text-text-muted">
          {language === 'ar' ? acceptTextAr : acceptTextEn} ({maxSizeText})
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-card-bg border border-border rounded-[6px] p-2.5 flex items-center justify-between gap-3 text-xs shadow-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-primary-action shrink-0" weight="bold" />
                <span className="font-medium text-text-primary truncate">{file.name}</span>
                <span className="font-numeric text-text-muted text-[11px]">({file.size})</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {file.progress !== undefined && file.progress < 100 && (
                  <span className="font-numeric text-primary-action text-[11px] font-bold">
                    {file.progress}%
                  </span>
                )}
                {onRemoveFile && (
                  <button
                    type="button"
                    onClick={() => onRemoveFile(file.id)}
                    className="p-1 rounded text-text-muted hover:text-danger-action hover:bg-danger-soft transition-colors cursor-pointer"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. CurrencyInput
// ==========================================
export interface CurrencyInputProps {
  value: number; // in whole pounds or piastres
  onChange: (val: number) => void;
  currencySymbolAr?: string;
  currencySymbolEn?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function CurrencyInput({
  value,
  onChange,
  currencySymbolAr = 'ج.م',
  currencySymbolEn = 'EGP',
  placeholder = '0.00',
  disabled = false,
}: CurrencyInputProps) {
  const { language } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non digits except dot
    const clean = e.target.value.replace(/[^0-9.]/g, '');
    const num = parseFloat(clean);
    onChange(isNaN(num) ? 0 : num);
  };

  return (
    <div className="relative font-sans">
      <input
        type="text"
        disabled={disabled}
        value={value ? value.toLocaleString('en-US') : ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-9 ps-3 pe-12 bg-page-bg border border-border rounded-[4px] text-xs font-numeric tabular-nums text-text-primary focus:bg-card-bg focus:border-primary-action outline-none transition-colors disabled:opacity-50"
      />
      <div className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-muted pointer-events-none">
        {language === 'ar' ? currencySymbolAr : currencySymbolEn}
      </div>
    </div>
  );
}
