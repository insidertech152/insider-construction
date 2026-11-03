PHASE 2: APP SHELL. Do not build tables, forms or business screens.

FIRST, fix these 4 small leftovers:

a) In the contrast audit table, hex codes render as "FFFFFF#" in Arabic.

Wrap every hex code in an LTR isolate so it reads "#FFFFFF".

b) In Arabic mode there is English again in the color section ("Action

Shades", "Primary Action", "Ratio: ...", "Computed Contrast Audit Table",

"Pass AA"). Arabic mode must be Arabic-only. English only in English mode.

c) A stray "|" appears before the project code when the line wraps. Remove

the separator when it starts a line.

d) The split buttons on mobile show a button over half the width with an empty

white box beside it. Make them full width or content width, never mixed.

THEN build the app shell.

ROUTES: keep /design-system. Add /shell-demo, a page that uses the shell

with an empty content area (PageHeader + breadcrumb + a placeholder card).

SIDEBAR (the approved design)

\- Width 260px, background = sidebar token (#222E3C). Placed at the inline

start: on the right in RTL, on the left in LTR. Soft shadow towards the

content.

\- Top block 72px: logo square 32px (radius 8, primary) + "\[اسم النظام\]" /

"\[System name\]".

\- Group labels: 11px, bold, color #93A1B1, padding 20px 20px 8px.

\- Item: 40px high, padding 0 20px, icon 20px (Phosphor, outline, 1.6

stroke), gap 12px, 14px text, color #A9B7C6. Hover: white text and a

background of rgba(255,255,255,.05). A chevron (16px) at the end if the

item has children, rotating when open. Optional count badge: pill, 20px

high, white 11px bold text on #3469E6.

\- Open group: background rgba(0,0,0,.18) and a 3px primary border on the

inline-start edge. The parent is white and bold.

\- Sub-items: 36px high, 13px, padding-inline-start 52px. The active sub-item

is #6F9BFF bold with a 2px x 16px primary bar at its inline-start.

\- Content (Arabic / English):

Home: لوحة التحكم / Dashboard

Sales & Contracts (المبيعات والتعاقد): المبيعات والعملاء / Sales &

Clients; التقدير والتسعير / Estimating & Pricing with children لوحة

التقدير, المقايسات, عروض الأسعار, مكتبة البنود; العقود والدفعات /

Contracts & Payments.

Execution & Operations (التنفيذ والتشغيل): المشاريع / Projects (badge 12,

with 2 placeholder children); التنفيذ بالموقع / Site Execution; أوامر

التغيير / Change Orders (badge 3); المشتريات / Purchasing; المخازن /

Inventory; المقاولون والعمالة / Contractors & Labor.

Finance & Admin (المالية والإدارة): المالية والحسابات / Finance (with 2

placeholder children); الجودة والتسليم / Quality & Handover; التقارير /

Reports; الإعدادات / Settings.

\- Build the menu from a config file (id, labelKey, icon, route, badge,

children, allowedRoles). Add a dev-only role switcher on /shell-demo

(owner, project manager, site engineer, accountant, sales) so I can see

that each role sees only its own items. Owner sees all. Site engineer sees

Dashboard, Projects, Site Execution, Change Orders. Accountant sees

Dashboard, Finance, Purchasing, Reports. Sales sees Sales & Clients,

Estimating, Contracts.

\- Collapse to icons only (72px) on desktop with a tooltip per item and a

flyout for items with children. Remember the state in localStorage.

\- Below the lg breakpoint the sidebar is an off-canvas drawer from the

inline-start edge with an overlay, focus trap, and Esc to close.

TOPBAR (64px, transparent over the page background)

\- Toggle button (collapse on desktop, drawer on mobile), search button with

a "⌘K" hint (a placeholder only, no search yet), language switch, a

notifications bell with a green count badge that opens a panel (tabs with

counts, grouped Today / Yesterday, colored icon circles, unread bar at the

inline start; 6 mock items), and a user menu (name, role, sign out).

\- No dark mode and no theme toggle in this phase.

RULES: logical Tailwind classes only (start/end), tokens only (no hard-coded

colors), focus rings, aria-current on the active item, aria-expanded on

groups, reduced-motion respected, transitions 150-250ms.

Verify Arabic RTL and English LTR, on phone and desktop widths.

WHEN DONE: stop and report.