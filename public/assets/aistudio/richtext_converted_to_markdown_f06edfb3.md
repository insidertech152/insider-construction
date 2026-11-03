ROUND 4: VISUAL FIDELITY REFACTOR. No new features.

GOAL: make the shell, cards, tables and typography match the reference

screenshots (reference folder images: Membership list page and the

Analytics dashboard). We are NOT adding styles on top. We change the

SOURCE values once (tokens + base components) and delete what they replace.

SCALE: the reference screenshots were captured at 125% display scaling.

CSS px = screenshot px / 1.25. The reference sidebar is 330px in the image

\= 264 CSS px. Use it as your ruler.

PROCEDURE (follow in order)

1\. Print a table: item | current value | target value | file to change.

Do not write code before printing it.

2\. Apply the changes in the token file and base components only.

3\. Delete every class, style or override that is no longer used.

4\. Report: lines added vs lines removed, files changed, and any value you

could not determine.

TARGETS (approximate, verify against the reference images)

Topbar: 74px high, background = page background at about 70% with

backdrop-blur about 7px, no border, no shadow, sticky. Search = icon button

\+ small "⌘K" chip (no input box; it opens a search modal placeholder).

Language, notifications, user = plain icon buttons (about 22px icons,

about 48px pitch, no borders, no text labels). User = small circle that

opens a menu (name and role inside the menu). Notification badge stays green.

Sidebar: 264px, logo block 74px, group label 11px bold near-white, items

44px, sub-items 36px. Open group: DARKER background rgba(0,0,0,.18) plus a

3-4px primary bar on the inline-start edge covering the whole group.

Active leaf: no background, primary-light text, 2x16px bar. No lighter

highlight block anywhere. Shadow toward the content about

0 0 24px rgba(15,23,42,.18).

Page header: title first (about 20px, medium weight), breadcrumb BELOW it

(13px, muted, last crumb lighter). No card around the title.

Page container: fluid, 40px side padding, no max-width, no wrapper cards.

Cards: radius 4px, no border, shadow 0 1px 2px rgba(15,23,42,.04),

header and body padding 24px, header divider 1px very light, card title

14-15px semibold.

Tables: body 14px regular, secondary cells gray-600, only the primary cell

(name) darker; header row 44px, light gray background, 12px bold (Arabic

13px bold); cell padding 14px 20px; row separators 1px very light; no zebra;

action icons 20px gray-500. Color is used ONLY in status badges/dots. Remove

colored or bold money cells. Default density row height 56px.

Typography: Arabic uses Almarai 400 for body and 700 only for titles and

table headers; English uses Inter 400/500/600. Add the type tokens

(size/weight/color) in the token file and use only those.

ANTI-BLOAT RULES

\- No arbitrary Tailwind values such as text-\[13px\], rounded-\[6px\],

border-\[#...\] outside the token file. Count them before and after.

\- No !important. No per-page overrides. No duplicated wrappers.

\- Do not keep old and new versions of a component.

VERIFICATION: add a route /reference-compare that rebuilds the layout of

the reference "Membership list" page using our components and OUR own mock

data (contract clients, Arabic names): avatar + name, phone, start date

(date and time stacked), status (dot + text), project type badge, row

actions, entries-per-page select, search field, pagination. Do not copy any

reference markup or assets. Report on this page whether the numbers above

match.

WHEN DONE: stop and report.