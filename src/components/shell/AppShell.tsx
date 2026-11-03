import React, { useState, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DevRoleSwitcher } from './DevRoleSwitcher';
import { UserRole } from '@/src/config/navigation';
import { cn } from '@/src/lib/utils';

import { useRole } from '@/src/context/RoleContext';

export interface AppShellProps {
  children: React.ReactNode;
  activeRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

const STORAGE_KEY = 'applet_sidebar_collapsed';

export function AppShell({
  children,
  activeRole: propActiveRole,
  onRoleChange: propOnRoleChange,
  currentRoute = '/shell-demo',
  onNavigate,
}: AppShellProps) {
  const roleContext = useRole();
  const activeRole = propActiveRole ?? roleContext.activeRole;
  const onRoleChange = propOnRoleChange ?? roleContext.setRole;
  // Read collapse state from localStorage with fallback to false
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Sync collapse state with localStorage
  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Fallback for private mode
      }
      return next;
    });
  };

  // Toggle button in topbar:
  // - On desktop (>= 1024px): toggle collapsed 72px / 260px
  // - On mobile (< 1024px): open off-canvas drawer
  const handleTopbarToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsMobileOpen((prev) => !prev);
    } else {
      handleToggleCollapse();
    }
  };

  return (
    <div className="min-h-screen bg-page-bg text-text-primary flex flex-col">
      {/* Sidebar Component */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        activeRole={activeRole}
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        toggleButtonRef={toggleButtonRef}
      />

      {/* Main Content Area: dynamically adjusted by sidebar width (264px or 72px) */}
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-all duration-200 ease-out',
          isCollapsed ? 'lg:ps-[72px]' : 'lg:ps-[264px]'
        )}
      >
        <Topbar
          onToggleSidebar={handleTopbarToggle}
          activeRole={activeRole}
          onRoleChange={onRoleChange}
          toggleButtonRef={toggleButtonRef}
        />

        {/* Fluid Page Container: 40px side padding, no max-w-7xl */}
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 w-full">
          {children}
        </main>
      </div>

      {/* Dev Role Switcher: small collapsible panel pinned to corner, dev only */}
      <DevRoleSwitcher
        activeRole={activeRole}
        onRoleChange={onRoleChange || (() => {})}
      />
    </div>
  );
}
