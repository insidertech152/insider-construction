import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import {
  Bell,
  SealCheck,
  Package,
  GitDiff,
  Coins,
  HardHat,
  CalendarCheck,
} from '@phosphor-icons/react';
import { cn } from '@/src/lib/utils';
import { useTranslation } from '@/src/i18n/context';

export interface NotificationItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  timeAr: string;
  timeEn: string;
  isRead: boolean;
  group: 'today' | 'yesterday';
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  actionAr?: string;
  actionEn?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    titleAr: 'اعتماد عينة الرخام الإيطالي',
    titleEn: 'Italian Marble Sample Approved',
    descAr: 'تم اعتماد عينة رخام الكرارا لمشروع فيلا 402 - التجمع الخامس من قِبل الاستشاري العام.',
    descEn: 'Carrara marble sample approved for Villa 402 - New Cairo by supervising consultant.',
    timeAr: 'منذ 15 دقيقة',
    timeEn: '15 mins ago',
    isRead: false,
    group: 'today',
    icon: SealCheck,
    iconBg: 'bg-emerald-50 text-emerald-600',
    iconColor: 'text-emerald-600',
    actionAr: 'عرض شهادة الاعتماد',
    actionEn: 'View Approval Certificate',
  },
  {
    id: 'notif-2',
    titleAr: 'وصول توريدات بند العزل المائي',
    titleEn: 'Waterproofing Supply Batch Delivered',
    descAr: 'تم تسليم شحنة لفائف العزل لموقع مشروع كمبوند زايد ومطابقتها للمواصفات الفنية والاشتراطات الهندسية.',
    descEn: 'Waterproofing insulation batch delivered and inspected at Zayed Compound site per engineering specs.',
    timeAr: 'منذ ساعة',
    timeEn: '1 hour ago',
    isRead: false,
    group: 'today',
    icon: Package,
    iconBg: 'bg-blue-50 text-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    id: 'notif-3',
    titleAr: 'طلب أمر تغيير رقم 3 - قواطع جبسيوم',
    titleEn: 'Change Order #3 - Gypsum Partitions',
    descAr: 'العميل يطلب إضافة قاطع ديكوري وعزل صوت إضافي بقيمة 45,000 ج.م شامل التوريد والتركيب.',
    descEn: 'Client requested decorative partition and acoustic insulation worth 45,000 EGP including installation.',
    timeAr: 'منذ 3 ساعات',
    timeEn: '3 hours ago',
    isRead: false,
    group: 'today',
    icon: GitDiff,
    iconBg: 'bg-amber-50 text-amber-600',
    iconColor: 'text-amber-600',
    actionAr: 'مراجعة أمر التغيير',
    actionEn: 'Review Change Order',
  },
  {
    id: 'notif-4',
    titleAr: 'اعتماد المستخلص الجاري رقم 4',
    titleEn: 'Interim Certificate #4 Approved',
    descAr: 'تمت مصادقة الإدارة المالية على صرف دفعة مقاولي الباطن لمرحلة التأسيس بقيمة 280,000 ج.م.',
    descEn: 'Finance approved disbursement of subcontractor batch worth 280,000 EGP for roughing stage.',
    timeAr: 'منذ 5 ساعات',
    timeEn: '5 hours ago',
    isRead: false,
    group: 'today',
    icon: Coins,
    iconBg: 'bg-emerald-50 text-emerald-600',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'notif-5',
    titleAr: 'اكتمال صب وتسوية أرضيات اللياسة',
    titleEn: 'Floor Screed Pour Completed',
    descAr: 'أنهى فريق التنفيذ بالموقع أعمال التسوية بمبنى B وجاري بدء مرحلة المعالجة المائية للاختبار.',
    descEn: 'Site execution team completed leveling at Building B; water curing stage started for inspection.',
    timeAr: 'أمس 04:30 م',
    timeEn: 'Yesterday 04:30 PM',
    isRead: true,
    group: 'yesterday',
    icon: HardHat,
    iconBg: 'bg-cyan-50 text-cyan-600',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'notif-6',
    titleAr: 'تحديث موعد تسليم الدفعة الخشبية',
    titleEn: 'Carpentry Delivery Schedule Updated',
    descAr: 'تم ترحيل توريد أبواب القشرة الخشبية ليوم الخميس بناءً على طلب الورشة المركزية لضمان جودة الدهان.',
    descEn: 'Veneer doors delivery rescheduled to Thursday per central workshop request to ensure paint curing.',
    timeAr: 'أمس 11:15 ص',
    timeEn: 'Yesterday 11:15 AM',
    isRead: true,
    group: 'yesterday',
    icon: CalendarCheck,
    iconBg: 'bg-slate-100 text-slate-600',
    iconColor: 'text-slate-600',
  },
];

export function NotificationsPanel() {
  const { isRTL, language } = useTranslation();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const todayItems = notifications.filter((n) => n.group === 'today');
  const yesterdayItems = notifications.filter((n) => n.group === 'yesterday');

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        {/* Trigger Button: 22px Phosphor light bell, 6% hover, 20px success badge with high contrast text >= 4.5:1 */}
        <button
          type="button"
          aria-label={isRTL ? `الإشعارات، يوجد ${unreadCount} غير مقروءة` : `Notifications, ${unreadCount} unread`}
          className="relative w-11 h-11 rounded-sm text-secondary-600 hover:text-secondary-900 hover:bg-black/[0.06] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-action cursor-pointer"
        >
          <Bell className="w-[22px] h-[22px]" weight="light" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-[#15803d] text-white text-[11px] font-bold font-numeric flex items-center justify-center ring-2 ring-white shadow-xs"
              aria-hidden="true"
            >
              {unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align={isRTL ? 'start' : 'end'}
          alignOffset={-50}
          sideOffset={8}
          collisionPadding={{ top: 8, left: 16, right: 16, bottom: 8 }}
          className="z-50 w-[452px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-100px)] bg-card-bg rounded-[2px] border-0 shadow-[0_10px_40px_rgba(15,23,42,0.12)] flex flex-col overflow-hidden animate-in fade-in-95 duration-150"
        >
          {/* Header: title 18px regular + 'mark all as read' link (primary 14px) at opposite end */}
          <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between gap-4 bg-card-bg">
            <h3 className="text-[18px] font-normal text-slate-800">
              {isRTL ? 'الإشعارات' : 'Notifications'}
            </h3>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="text-[14px] text-primary-action hover:underline font-normal cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-action rounded"
              >
                {isRTL ? 'تحديد الكل كمقروء' : 'Mark all as read'}
              </button>
            )}
          </div>

          {/* Scrollable List with Hidden Scrollbar */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-220px)] scrollbar-hidden">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-sm">
                {isRTL ? 'لا توجد إشعارات جديدة' : 'No notifications'}
              </div>
            ) : (
              <>
                {/* Today Group */}
                {todayItems.length > 0 && (
                  <div>
                    {/* Group Label: 13px bold, primary color at inline start */}
                    <div className="text-[13px] font-bold text-primary-action text-start mb-2 px-1">
                      {isRTL ? 'اليوم' : 'Today'}
                    </div>

                    <div className="space-y-3">
                      {todayItems.map((item) => (
                        <NotificationCard
                          key={item.id}
                          item={item}
                          language={language}
                          onToggleRead={() => handleToggleRead(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Yesterday Group */}
                {yesterdayItems.length > 0 && (
                  <div className="pt-1">
                    {/* Group Label: 13px bold, primary color at inline start */}
                    <div className="text-[13px] font-bold text-primary-action text-start mb-2 px-1">
                      {isRTL ? 'أمس' : 'Yesterday'}
                    </div>

                    <div className="space-y-3">
                      {yesterdayItems.map((item) => (
                        <NotificationCard
                          key={item.id}
                          item={item}
                          language={language}
                          onToggleRead={() => handleToggleRead(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer: 'clear all notifications' centered danger text */}
          {notifications.length > 0 && (
            <div className="border-t border-slate-100 bg-card-bg">
              <button
                type="button"
                onClick={handleClearAll}
                className="w-full py-3 text-center text-[14px] font-medium text-danger-600 hover:text-danger-700 hover:bg-danger-50/40 transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-danger-500"
              >
                {isRTL ? 'مسح كافة الإشعارات' : 'Clear all notifications'}
              </button>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

/**
 * Soft card matching reference:
 * - Background: #F7F8FA
 * - Radius: 4px
 * - Padding: 16px
 * - Icon: 40px circular with tinted bg
 * - Title: 16px regular gray-700 (darker gray-900 if unread)
 * - Time: 13px light gray at inline end
 * - Description: 14px gray-600, line-height 1.6
 * - Optional action buttons row
 * - No tabs, no pills, no unread dots, no vertical bar
 */
function NotificationCard({
  item,
  language,
  onToggleRead,
}: {
  item: NotificationItem;
  language: 'ar' | 'en';
  onToggleRead: () => void;
}) {
  const IconComp = item.icon;

  return (
    <div
      onClick={onToggleRead}
      className="bg-[#F7F8FA] rounded-sm p-4 flex items-start gap-3.5 transition-colors cursor-pointer select-none hover:bg-slate-100/80"
    >
      {/* 40px circular icon with tinted background */}
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-xs',
          item.iconBg
        )}
      >
        <IconComp className="w-5 h-5" weight="light" />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        {/* Header row: title 16px and time 13px at inline end */}
        <div className="flex items-baseline justify-between gap-2">
          <h4
            className={cn(
              'text-[16px] leading-snug truncate',
              !item.isRead ? 'font-medium text-gray-900' : 'font-normal text-gray-700'
            )}
          >
            {language === 'ar' ? item.titleAr : item.titleEn}
          </h4>
          <span className="text-[13px] text-gray-400 font-numeric shrink-0">
            {language === 'ar' ? item.timeAr : item.timeEn}
          </span>
        </div>

        {/* Description: 14px gray-600 line-height 1.6 */}
        <p className="text-[14px] text-gray-600 leading-[1.6] mt-1.5">
          {language === 'ar' ? item.descAr : item.descEn}
        </p>

        {/* Optional Action Button Row */}
        {(item.actionAr || item.actionEn) && (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="px-3 py-1.5 rounded-sm bg-primary-soft text-primary-action text-xs font-medium hover:bg-primary-100 transition-colors cursor-pointer"
            >
              {language === 'ar' ? item.actionAr : item.actionEn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
