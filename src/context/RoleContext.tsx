import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/src/config/navigation';

export type Permission = 'view_cost' | 'edit_project' | 'delete_record' | 'export_data';

interface RoleContextType {
  activeRole: UserRole;
  setRole: (role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = 'applet_user_role';

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null;
      if (saved && ['owner', 'project_manager', 'site_engineer', 'accountant', 'sales'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'owner';
  });

  const setRole = (role: UserRole) => {
    setActiveRole(role);
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    } catch {
      // ignore
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (permission === 'view_cost') {
      // Only owner and project manager have view_cost
      return activeRole === 'owner' || activeRole === 'project_manager';
    }
    // Default open for generic permissions unless specified
    return true;
  };

  return (
    <RoleContext.Provider value={{ activeRole, setRole, hasPermission }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
