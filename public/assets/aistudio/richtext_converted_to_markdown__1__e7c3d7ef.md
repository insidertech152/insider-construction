ROUND 5: VISUAL REFINEMENT. No new features. Same anti-bloat rules as

round 4: change SOURCE values only (tokens + base components), delete what

they replace, no arbitrary Tailwind values, no !important, no per-page

overrides. First print a table (item | current | target | file), then

change, then report lines added vs removed.

Reference scale reminder: reference screenshots were taken at 125%

scaling. CSS px = screenshot px / 1.25.

1\. SIDEBAR SCROLLBAR (bug). The nav list shows a visible gray scrollbar

with an arrow. Keep scrolling working but hide the scrollbar

(scrollbar-width: none and ::-webkit-scrollbar display none). Optional:

on hover a 4px overlay thumb rgba(255,255,255,.2). Remove the hairline

under the logo block. The brand block shows only the product name (no

second line of text).

2\. SIDEBAR TYPE. Main items and sub-items use the same size (15px), weight

400; the active parent uses the medium weight (500; if the font has no

500 use the closest available, never 700). Icons 20px with 1.5 stroke

(Phosphor "light" weight) at 80% opacity.

3\. TOPBAR ICONS. All icons use Phosphor light weight (about 1.5 stroke),

22px, color secondary-600, hover secondary-900 with a subtle 6% hover

background. The hamburger uses thin lines. The ⌘K chip: 12px, weight 400,

light gray background, gray-500 text, 4px radius. The user control is an

outline circle-user icon in the same style: no filled avatar, no initials.

The notification badge: 20px circle, success color fill, dark text,

positioned at the top inline-end corner of the bell.

4\. NOTIFICATIONS PANEL: rebuild to match the reference panel.

\- Anchored directly under the topbar, aligned to the inline-end edge of

the content area. Width 452px (on phones calc(100vw - 32px)).

Square or 2px corners, no border, shadow

0 10px 40px rgba(15,23,42,.12).

\- Remove the tabs, the "N new" pill, the unread dots and the vertical

unread bar.

\- Header: title 18px regular + a "mark all as read" link (primary, 14px)

at the opposite end.

\- Group labels: 13px bold, primary color, at the inline start.

\- Each notification is a soft card: background #F7F8FA (use a token),

radius 4px, padding 16px, 12px gap between cards. Inside: a 40px circular

icon with a tinted background at the inline start; title 16px regular

gray-700 and time 13px light gray at the inline end; description 14px

gray-600 with line-height 1.6. Optional action buttons row (small

outline + small solid). Unread = darker title color only.

\- Footer: "clear all notifications" as centered danger-colored text.

\- No visible scrollbar: max-height calc(100vh - 100px) with the hidden

scrollbar technique from item 1.

5\. TABLES. IDs and codes (for example PRJ-2025-03) must never wrap:

white-space: nowrap plus an LTR isolate. Money cells: no background chip,

no color, gray-700, end-aligned with tabular numbers. Color is used only

in status badges and dots.

6\. FONT TOKENS. Add --font-ar and --font-en, and weight tokens

(light 300, regular 400, medium 500, semibold 600, bold 700) used

everywhere. Components must reference only these tokens, so changing the

font family later is one line. Add a route /font-specimen that renders the

same real samples (a stat card, 4 table rows, a notification item, 4

sidebar items) side by side at weights 300 to 700 for: Almarai (current),

IBM Plex Sans Arabic, Readex Pro, Tajawal, Noto Sans Arabic. Add an empty

slot labeled "site font" that I will fill later.

VERIFY on /reference-compare (Arabic and English) and report which numbers

match the targets. WHEN DONE: stop and report.