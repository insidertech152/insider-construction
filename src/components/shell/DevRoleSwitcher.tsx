import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Buildings,
  HardHat,
  Coins,
  Handshake,
  Check,
  CaretUp,
  CaretDown,
  X,
  Code,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import { UserRole, USER_ROLES } from '@/src/config/navigation';

import { useRole } from '@/src/context/RoleContext';

export interface DevRoleSwitcherProps {
  activeRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export function DevRoleSwitcher({ activeRole: propActiveRole, onRoleChange: propOnRoleChange }: DevRoleSwitcherProps) {
  const { language, isRTL } = useTranslation();
  const roleContext = useRole();
  const activeRole = propActiveRole ?? roleContext.activeRole;
  const onRoleChange = propOnRoleChange ?? roleContext.setRole;
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDev = Boolean(import.meta.env.DEV);
    const searchParams = new URLSearchParams(window.location.search);
    const hasDevParam = searchParams.get('dev') === '1';

    if (isDev || hasDevParam) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  const currentRoleInfo = USER_ROLES.find((r) => r.id === activeRole) || USER_ROLES[0];
  const roleLabel = language === 'ar' ? currentRoleInfo.labelAr : currentRoleInfo.labelEn;

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'owner':
        return <ShieldCheck className="w-3.5 h-3.5 text-primary-action" weight="bold" />;
      case 'project_manager':
        return <Buildings className="w-3.5 h-3.5 text-info-action" weight="bold" />;
      case 'site_engineer':
        return <HardHat className="w-3.5 h-3.5 text-warning-700" weight="bold" />;
      case 'accountant':
        return <Coins className="w-3.5 h-3.5 text-success-700" weight="bold" />;
      case 'sales':
        return <Handshake className="w-3.5 h-3.5 text-primary-600" weight="bold" />;
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="fixed bottom-4 end-4 z-50 flex flex-col items-end gap-2 font-sans select-none"
    >
      {/* Expanded Panel */}
      {isExpanded && (
        <div className="w-72 bg-card-bg border border-border rounded-[8px] shadow-dropdown p-3 animate-in fade-in-90 slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-border-subtle mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
              <Code className="w-4 h-4 text-primary-action" weight="bold" />
              <span>{language === 'ar' ? 'مبدل الأدوار (Dev Mode)' : 'Role Switcher (Dev Mode)'}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="w-5 h-5 rounded hover:bg-black/5 text-text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
              aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X className="w-3.5 h-3.5" weight="bold" />
            </button>
          </div>

          <div className="space-y-1">
            {USER_ROLES.map((role) => {
              const isSelected = activeRole === role.id;
              const label = language === 'ar' ? role.labelAr : role.labelEn;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    onRoleChange(role.id);
                  }}
                  className={cn(
                    'w-full px-2.5 py-1.5 rounded-[4px] text-xs font-medium flex items-center justify-between transition-colors cursor-pointer text-start',
                    isSelected
                      ? 'bg-primary-soft text-primary-action font-bold'
                      : 'text-text-secondary hover:bg-page-bg hover:text-text-primary'
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getRoleIcon(role.id)}
                    <span className="truncate">{label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary-action shrink-0" weight="bold" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Toggle Pill */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="h-8 px-3 rounded-full bg-[#222E3C] text-white hover:bg-[#2C3B4D] border border-[#2A3746] shadow-lg flex items-center gap-2 text-xs font-medium cursor-pointer transition-transform hover:scale-102 active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action"
        aria-expanded={isExpanded}
        aria-label={language === 'ar' ? 'فتح مبدل الأدوار للمطور' : 'Toggle Dev Role Switcher'}
      >
        <span className="px-1.5 py-0.2 rounded bg-primary-action text-white text-[10px] font-bold tracking-wider uppercase">
          DEV
        </span>
        <span className="text-white/90 text-xs font-medium truncate max-w-[130px]">
          {roleLabel}
        </span>
        {isExpanded ? (
          <CaretDown className="w-3 h-3 text-white/70" weight="bold" />
        ) : (
          <CaretUp className="w-3 h-3 text-white/70" weight="bold" />
        )}
      </button>
    </div>
  );
}
