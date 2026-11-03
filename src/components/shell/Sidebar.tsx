import React, { useState, useEffect, useRef } from 'react';
import { CaretDown, CaretRight, CaretLeft, Buildings } from '@phosphor-icons/react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Popover from '@radix-ui/react-popover';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';
import {
  NAVIGATION_CONFIG,
  NavItem,
  NavChildItem,
  UserRole,
} from '@/src/config/navigation';

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  activeRole: UserRole;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  toggleButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  activeRole,
  currentRoute = '/shell-demo',
  onNavigate,
  toggleButtonRef,
}: SidebarProps) {
  const { isRTL, language } = useTranslation();
  const [openGroupIds, setOpenGroupIds] = useState<Record<string, boolean>>({
    estimating_pricing: false,
    projects: true, // Default open for demonstration
    finance: false,
  });

  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close and return focus to toggle button
  const handleCloseAndReturnFocus = () => {
    onCloseMobile();
    toggleButtonRef?.current?.focus();
  };

  // Keyboard navigation inside mobile drawer: Esc to close & strict Tab trap
  useEffect(() => {
    if (!isMobileOpen) return;

    // Focus first interactive element inside drawer on open
    const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseAndReturnFocus();
        return;
      }

      if (e.key === 'Tab' && sidebarRef.current) {
        const elements = sidebarRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (elements.length === 0) return;

        const firstEl = elements[0];
        const lastEl = elements[elements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: if on first element, wrap to last
          if (document.activeElement === firstEl || !sidebarRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab: if on last element, wrap to first
          if (document.activeElement === lastEl || !sidebarRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const toggleGroup = (itemId: string) => {
    setOpenGroupIds((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children && item.children.length > 0) {
      toggleGroup(item.id);
    } else if (item.route) {
      onNavigate?.(item.route);
      if (isMobileOpen) {
        handleCloseAndReturnFocus();
      }
    }
  };

  const handleSubItemClick = (child: NavChildItem) => {
    onNavigate?.(child.route);
    if (isMobileOpen) {
      handleCloseAndReturnFocus();
    }
  };

  // Filter groups and items based on role
  const filteredGroups = NAVIGATION_CONFIG.map((group) => {
    const items = group.items.filter((item) => {
      if (activeRole === 'owner') return true;
      return item.allowedRoles.includes(activeRole);
    });
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  return (
    <Tooltip.Provider delayDuration={150}>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          role="presentation"
          onClick={handleCloseAndReturnFocus}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-200 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        ref={sidebarRef}
        aria-label={language === 'ar' ? 'شريط التنقل الجانبي' : 'Sidebar Navigation'}
        className={cn(
          'fixed inset-y-0 start-0 z-50 flex flex-col h-full bg-sidebar-bg text-sidebar-text border-e border-sidebar-border shadow-sidebar transition-all duration-200 ease-out select-none',
          // Desktop width: 264px (ruler from reference) or collapsed 72px
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-[264px]',
          // Mobile responsive: off-canvas drawer
          'w-[264px]',
          isMobileOpen
            ? 'translate-x-0'
            : isRTL
            ? 'translate-x-full lg:translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Top Header Block: 74px (matching topbar height exactly) - hairline under logo removed */}
        <div className="h-[74px] shrink-0 flex items-center px-5 gap-3">
          <div className="w-8 h-8 rounded-md bg-primary-action text-white flex items-center justify-center shrink-0 shadow-xs">
            <Buildings className="w-5 h-5 text-white" weight="bold" />
          </div>

          {(!isCollapsed || isMobileOpen) && (
            <div className="flex-1 min-w-0">
              <span className="block font-medium text-[15px] text-white tracking-wide truncate">
                {language === 'ar' ? 'منظومة التشطيبات' : 'Finishing & Decor ERP'}
              </span>
            </div>
          )}
        </div>

        {/* 
          Scrollable Navigation Items:
          flex-1 min-h-0 with overscroll-contain and pb-16
          hidden scrollbar while keeping native smooth scroll
        */}
        <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-2 pb-16 focus:outline-none scrollbar-hidden">
          {filteredGroups.map((group, groupIndex) => {
            const showGroupTitle = !isCollapsed || isMobileOpen;

            return (
              <div key={group.id} className="mb-2">
                {/* Group Label: 11px bold near-white #F8FAFC */}
                {group.titleAr && (
                  showGroupTitle ? (
                    <div className="pt-5 px-5 pb-2 text-[11px] font-bold tracking-wider text-slate-100 uppercase">
                      {language === 'ar' ? group.titleAr : group.titleEn}
                    </div>
                  ) : (
                    groupIndex > 0 && <div className="mx-4 my-2 border-t border-sidebar-border/60" />
                  )
                )}

                {/* Items in Group */}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isOpen = Boolean(openGroupIds[item.id]);
                    const isActive = Boolean(
                      item.route === currentRoute ||
                      (hasChildren && item.children?.some((c) => c.route === currentRoute))
                    );

                    const IconComp = item.icon;
                    const itemLabel = language === 'ar' ? item.labelAr : item.labelEn;

                    // When collapsed on desktop
                    if (isCollapsed && !isMobileOpen) {
                      return (
                        <CollapsedSidebarItem
                          key={item.id}
                          item={item}
                          isActive={isActive}
                          isRTL={isRTL}
                          language={language}
                          currentRoute={currentRoute}
                          onNavigate={onNavigate}
                        />
                      );
                    }

                    // Expanded / Standard View: 15px font-normal, active parent 500
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          'relative transition-colors',
                          // Open group container: Darker background rgba(0,0,0,0.18) with 3-4px primary bar covering whole group container
                          isOpen && 'bg-black/[0.18] border-s-[3px] border-primary-action'
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => handleItemClick(item)}
                          aria-expanded={hasChildren ? isOpen : undefined}
                          aria-current={isActive && !hasChildren ? 'page' : undefined}
                          className={cn(
                            'group w-full h-11 px-5 flex items-center justify-between text-[15px] transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action focus-visible:ring-inset',
                            // Item root row styling (44px height = h-11): 15px, weight 400 normal; active/open uses medium 500 (never 700)
                            isOpen
                              ? 'text-white font-medium'
                              : isActive && !hasChildren
                              ? 'text-white font-medium border-s-[3px] border-primary-action -ms-[3px] ps-[17px]'
                              : 'text-sidebar-text hover:text-white hover:bg-white/5 font-normal'
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <IconComp
                              className={cn(
                                'w-5 h-5 shrink-0 opacity-80 transition-colors',
                                isOpen || isActive ? 'text-primary-400 opacity-100' : 'text-sidebar-text group-hover:text-white'
                              )}
                              weight="light"
                            />
                            <span className="truncate">{itemLabel}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Optional Pill Count Badge */}
                            {item.badge !== undefined && (
                              <span className="h-5 px-2 rounded-full bg-primary-action text-white text-[11px] font-bold font-numeric flex items-center justify-center shadow-xs">
                                {item.badge}
                              </span>
                            )}

                            {/* 
                              Group Chevron:
                              - Collapsed points to inline end (‹ in RTL, › in LTR)
                              - Open points down
                            */}
                            {hasChildren && (
                              <span className="text-sidebar-muted group-hover:text-white flex items-center justify-center transition-colors">
                                {isOpen ? (
                                  <CaretDown className="w-4 h-4" weight="light" />
                                ) : isRTL ? (
                                  <CaretLeft className="w-4 h-4" weight="light" />
                                ) : (
                                  <CaretRight className="w-4 h-4" weight="light" />
                                )}
                              </span>
                            )}
                          </div>
                        </button>

                        {/* Sub-items (Children) - Same 15px font-normal, active leaf uses medium 500 (never 700) */}
                        {hasChildren && isOpen && (
                          <div className="py-1">
                            {item.children!.map((child) => {
                              const isChildActive = child.route === currentRoute;
                              const childLabel = language === 'ar' ? child.labelAr : child.labelEn;

                              return (
                                <button
                                  key={child.id}
                                  type="button"
                                  onClick={() => handleSubItemClick(child)}
                                  aria-current={isChildActive ? 'page' : undefined}
                                  className={cn(
                                    'relative w-full h-9 ps-12 pe-5 flex items-center justify-between text-[15px] transition-colors duration-150 cursor-pointer text-start focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-action',
                                    // Active leaf: NO background, primary-light text, weight 500, 2x16px bar
                                    isChildActive
                                      ? 'text-sidebar-leaf-active font-medium bg-transparent'
                                      : 'text-sidebar-text hover:text-white hover:bg-white/[0.03] font-normal'
                                  )}
                                >
                                  {/* Active sub-item indicator bar: 2px x 16px at inline-start */}
                                  {isChildActive && (
                                    <span
                                      className="absolute start-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary-action rounded-e-xs"
                                      aria-hidden="true"
                                    />
                                  )}
                                  <span className="truncate">{childLabel}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </Tooltip.Provider>
  );
}

/**
 * Collapsed state item on desktop: 72px with tooltip and flyout popover for children
 */
function CollapsedSidebarItem({
  item,
  isActive,
  isRTL,
  language,
  currentRoute,
  onNavigate,
}: {
  item: NavItem;
  isActive: boolean;
  isRTL: boolean;
  language: 'ar' | 'en';
  currentRoute: string;
  onNavigate?: (route: string) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const IconComp = item.icon;
  const itemLabel = language === 'ar' ? item.labelAr : item.labelEn;

  if (hasChildren) {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            aria-label={itemLabel}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative w-full h-10 flex items-center justify-center transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action',
              isActive
                ? 'bg-white/10 text-white border-s-[3px] border-primary-action text-primary-400'
                : 'text-sidebar-text hover:text-white hover:bg-white/5 border-s-[3px] border-transparent'
            )}
          >
            <IconComp className="w-5 h-5 shrink-0 opacity-80" weight="light" />
            {item.badge !== undefined && (
              <span className="absolute top-1.5 end-3 w-2 h-2 rounded-full bg-primary-action ring-1 ring-sidebar-bg" />
            )}
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side={isRTL ? 'left' : 'right'}
            sideOffset={8}
            align="start"
            className="z-50 min-w-[200px] bg-sidebar-bg text-white rounded-md border border-sidebar-border shadow-dropdown p-2 animate-in fade-in-90 duration-150"
          >
            <div className="px-3 py-1.5 font-medium text-xs text-sidebar-muted border-b border-sidebar-border/60 mb-1 flex items-center justify-between">
              <span>{itemLabel}</span>
              {item.badge !== undefined && (
                <span className="h-4 px-1.5 rounded-full bg-primary-action text-white text-[10px] font-bold font-numeric flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="space-y-0.5">
              {item.children!.map((child) => {
                const isChildActive = child.route === currentRoute;
                const childLabel = language === 'ar' ? child.labelAr : child.labelEn;

                return (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => onNavigate?.(child.route)}
                    className={cn(
                      'relative w-full px-3 py-1.5 rounded-sm text-xs text-start transition-colors flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-action',
                      isChildActive
                        ? 'text-sidebar-leaf-active font-medium bg-white/[0.08]'
                        : 'text-sidebar-text hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    <span>{childLabel}</span>
                  </button>
                );
              })}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          onClick={() => item.route && onNavigate?.(item.route)}
          aria-label={itemLabel}
          aria-current={isActive ? 'page' : undefined}
          className={cn(
            'relative w-full h-10 flex items-center justify-center transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action',
            isActive
              ? 'bg-white/10 text-white border-s-[3px] border-primary-action text-primary-400'
              : 'text-sidebar-text hover:text-white hover:bg-white/5 border-s-[3px] border-transparent'
          )}
        >
          <IconComp className="w-5 h-5 shrink-0 opacity-80" weight="light" />
          {item.badge !== undefined && (
            <span className="absolute top-1.5 end-3 w-2 h-2 rounded-full bg-primary-action ring-1 ring-sidebar-bg" />
          )}
        </button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content
          side={isRTL ? 'left' : 'right'}
          sideOffset={8}
          className="z-50 px-2.5 py-1 text-xs font-medium text-white bg-dark-800 border border-sidebar-border rounded-sm shadow-dropdown flex items-center gap-2 animate-in fade-in-90 duration-150"
        >
          <span>{itemLabel}</span>
          {item.badge !== undefined && (
            <span className="h-4 px-1 rounded-full bg-primary-action text-white text-[10px] font-bold font-numeric flex items-center justify-center">
              {item.badge}
            </span>
          )}
          <Tooltip.Arrow className="fill-dark-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
