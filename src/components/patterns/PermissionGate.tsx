import React from 'react';
import { useRole } from '@/src/context/RoleContext';
import { useTranslation } from '@/src/i18n/context';
import { ShieldWarning } from '@phosphor-icons/react';

export interface PermissionGateProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
  showNotice?: boolean;
}

export function PermissionGate({
  permission,
  fallback,
  children,
  showNotice = false,
}: PermissionGateProps) {
  const { hasPermission } = useRole();
  const { language } = useTranslation();
  const isAllowed = hasPermission(permission);

  if (isAllowed) {
    return <>{children}</>;
  }

  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  if (showNotice) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-soft text-text-muted text-xs border border-border-subtle">
        <ShieldWarning className="w-3.5 h-3.5 text-warning-600" />
        <span>
          {language === 'ar' ? 'صلاحية غير متوفرة لرتبتك' : 'Permission restricted for your role'}
        </span>
      </div>
    );
  }

  return null;
}
