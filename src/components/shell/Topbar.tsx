import React, { useState, useEffect, useRef } from 'react';
import {
  List,
  MagnifyingGlass,
  Translate,
  UserCircle,
  SignOut,
  SlidersHorizontal,
  X,
  User,
} from '@phosphor-icons/react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import { NotificationsPanel } from './NotificationsPanel';
import { UserRole, USER_ROLES } from '@/src/config/navigation';

export interface TopbarProps {
  onToggleSidebar: () => void;
  activeRole: UserRole;
  onRoleChange?: (role: UserRole) => void;
  toggleButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export function Topbar({
  onToggleSidebar,
  activeRole,
  toggleButtonRef,
}: TopbarProps) {
  const { language, isRTL, toggleLanguage } = useTranslation();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentRoleInfo = USER_ROLES.find((r) => r.id === activeRole) || USER_ROLES[0];
  const roleLabel = language === 'ar' ? currentRoleInfo.labelAr : currentRoleInfo.labelEn;

  // Auto focus mobile search input on open & handle Escape
  useEffect(() => {
    if (isMobileSearchOpen) {
      searchInputRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileSearchOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMobileSearchOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 h-[74px] bg-page-bg/70 backdrop-blur-[7px] border-0 shadow-none px-4 sm:px-8 flex items-center justify-between gap-4 transition-colors">
        {/* Start Section: Sidebar Toggle & Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-md">
          {/* Toggle Button (Collapse on desktop, Drawer on mobile): Thin hamburger line */}
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={onToggleSidebar}
            aria-label={language === 'ar' ? 'تبديل القائمة الجانبية' : 'Toggle Sidebar'}
            className="w-11 h-11 rounded-sm text-secondary-600 hover:text-secondary-900 hover:bg-black/[0.06] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action cursor-pointer shrink-0"
          >
            <List className="w-[22px] h-[22px]" weight="light" />
          </button>

          {/* Search Button: Icon button + ⌘K chip (12px, weight 400, bg-slate-100, gray-500, 4px radius) */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(true)}
            aria-label={language === 'ar' ? 'البحث السريع (⌘K)' : 'Quick Search (⌘K)'}
            title={language === 'ar' ? 'البحث السريع (⌘K)' : 'Quick Search (⌘K)'}
            className="group flex items-center gap-2 h-10 px-2 rounded-sm text-secondary-600 hover:text-secondary-900 hover:bg-black/[0.06] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action"
          >
            <MagnifyingGlass className="w-[22px] h-[22px] text-secondary-600 group-hover:text-secondary-900 transition-colors" weight="light" />
            <kbd
              dir="ltr"
              className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-normal text-gray-500 bg-slate-100 rounded-sm"
            >
              ⌘K
            </kbd>
          </button>
        </div>

        {/* End Section: Language Switch, Notifications, User Profile (~48px pitch, plain icon buttons) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Language Switch: 22px icon, light weight, secondary-600, 6% hover bg */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === 'ar' ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
            title={language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}
            className="w-11 h-11 rounded-sm text-secondary-600 hover:text-secondary-900 hover:bg-black/[0.06] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action cursor-pointer"
          >
            <Translate className="w-[22px] h-[22px]" weight="light" />
          </button>

          {/* Notifications Popover */}
          <NotificationsPanel />

          {/* User Profile Menu: Outline circle-user icon in the same style (no filled avatar, no initials) */}
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button
                type="button"
                aria-label={language === 'ar' ? 'قائمة حساب المستخدم' : 'User account menu'}
                className="w-11 h-11 rounded-sm text-secondary-600 hover:text-secondary-900 hover:bg-black/[0.06] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action cursor-pointer select-none"
              >
                <UserCircle className="w-[22px] h-[22px] text-secondary-600 hover:text-secondary-900 transition-colors" weight="light" />
              </button>
            </DropdownMenuPrimitive.Trigger>

            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align={isRTL ? 'start' : 'end'}
                sideOffset={8}
                className="z-50 min-w-[220px] overflow-hidden rounded-[2px] border border-border bg-card-bg p-1 text-text-primary shadow-dropdown animate-in fade-in-90 duration-150"
              >
                <div className="px-3.5 py-2.5 border-b border-border-subtle bg-page-bg/50">
                  <p className="text-sm font-medium text-text-primary">
                    {language === 'ar' ? 'م. هاني شاكر' : 'Eng. Hany Shaker'}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {roleLabel}
                  </p>
                </div>

                <DropdownMenuPrimitive.Item className="relative flex items-center gap-2.5 px-3 py-2 text-xs rounded-sm select-none cursor-pointer outline-none hover:bg-page-bg focus:bg-page-bg text-text-primary transition-colors">
                  <User className="w-4 h-4 text-text-muted shrink-0" weight="light" />
                  <span>{language === 'ar' ? 'الملف الشخصي' : 'User Profile'}</span>
                </DropdownMenuPrimitive.Item>

                <DropdownMenuPrimitive.Item className="relative flex items-center gap-2.5 px-3 py-2 text-xs rounded-sm select-none cursor-pointer outline-none hover:bg-page-bg focus:bg-page-bg text-text-primary transition-colors">
                  <SlidersHorizontal className="w-4 h-4 text-text-muted shrink-0" weight="light" />
                  <span>{language === 'ar' ? 'إعدادات الحساب' : 'Account Settings'}</span>
                </DropdownMenuPrimitive.Item>

                <DropdownMenuPrimitive.Separator className="my-1 h-px bg-border-subtle" />

                <DropdownMenuPrimitive.Item className="relative flex items-center gap-2.5 px-3 py-2 text-xs rounded-sm select-none cursor-pointer outline-none hover:bg-danger-50 focus:bg-danger-50 text-danger-600 transition-colors">
                  <SignOut className="w-4 h-4 text-danger-500 shrink-0" weight="light" />
                  <span>{language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                </DropdownMenuPrimitive.Item>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </header>

      {/* Mobile Search Overlay Modal (Placeholder Only) */}
      {isMobileSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={language === 'ar' ? 'نافذة البحث السريع' : 'Quick Search Modal'}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col p-4 sm:p-6 lg:hidden animate-in fade-in-95 duration-150"
        >
          <div className="bg-card-bg rounded-[8px] border border-border shadow-dropdown overflow-hidden flex flex-col max-h-[80vh]">
            {/* Input Header */}
            <div className="p-3 border-b border-border flex items-center gap-3">
              <MagnifyingGlass className="w-5 h-5 text-text-muted shrink-0" weight="bold" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={
                  language === 'ar' ? 'البحث في المشاريع والبنود والمستخلصات...' : 'Search projects, items, certificates...'
                }
                className="flex-1 text-sm bg-transparent border-0 outline-none text-text-primary placeholder:text-text-placeholder"
              />
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                className="w-8 h-8 rounded hover:bg-black/5 text-text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
                aria-label={language === 'ar' ? 'إغلاق البحث' : 'Close search'}
              >
                <X className="w-4 h-4" weight="bold" />
              </button>
            </div>

            {/* Placeholder Empty Content */}
            <div className="p-6 text-center text-xs text-text-muted">
              {language === 'ar'
                ? 'البحث السريع نموذج تجريبي فقط (Placeholder) للمرحلة القادمة.'
                : 'Quick search is a placeholder prototype for upcoming phases.'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
