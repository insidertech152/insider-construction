PHASE 3: PATTERNS. Generic building blocks only. No real business screens,

no database, no Firebase. Mock data only.

FIRST, small fixes (from round 2b):

1\. User avatar initials overflow the circle: center, size, truncate to 2

letters.

2\. Drawer footer: remove the invented "v1.2 experimental version" text and

green dot. The nav list must scroll inside the drawer and the last group

(Finance & Admin, 4 items) must be reachable on small phones. Keep the

footer outside the scroll area.

3\. Below lg: search is an icon button opening a search overlay

(placeholder). On lg+ keep the full input with the ⌘K hint.

4\. Group chevron: collapsed points to the inline end (‹ in RTL, › in LTR),

open points down.

5\. Dev role switcher: a small collapsible panel pinned to a corner, only

when import.meta.env.DEV is true or ?dev=1. Not in the page body.

6\. Drawer: Esc closes it and returns focus to the toggle; Tab stays inside.

THEN build, inside the existing shell, a new route /patterns-demo with one

section per pattern:

A. DataTable (TanStack Table, typed generics): column sort, global search,

filter chips, pagination with "Showing x to y of z" and page-size select,

row selection (checkbox column), row actions (view, edit, delete icons

plus an overflow menu), column visibility menu, sticky header, five

densities (xl, lg, default, sm, xs), numeric columns end-aligned with

tabular-nums and Western digits, status badge cells, optional totals

footer row (light blue background), loading (skeleton), empty and error

states. Phone: horizontal scroll. Each column accepts an optional

\`permission\` prop: if the current role lacks it, the column is not

rendered.

B. EntityList variant: each row is a separate white card (avatar, name,

secondary line, status badge, row actions).

C. StatCard (icon box, label, big number, delta badge, count, Recharts

sparkline) and a colored SummaryCard with a progress bar.

D. ListPage template: PageHeader + a row of StatCards + SummaryCard + Tabs

with count badges + toolbar (search, filters, export button) + DataTable.

E. Dialog and Drawer (Radix): sizes, header/body/footer, a destructive

ConfirmDialog. The Drawer slides from the inline end and flips in RTL.

F. Form patterns with React Hook Form + Zod: FormField (label above, red

dot for required, helper text, error text), two-column grid, form footer

action bar (Save = outline, Save & Send = primary, Delete = soft danger),

a Stepper/wizard with a progress bar, a DatePicker whose week start is a

setting (default Saturday) using Gregorian dates and Western digits, a

FileUploader (UI only), a currency input.

G. EditableItemsTable (the quote / bill-of-quantities editor pattern): rows

with name, description, work type (select, required), quantity, unit,

unit price, line total (computed), delete. "Add item" soft button,

Enter in the last cell adds a row, keyboard-friendly. A totals block

(subtotal, discount %, tax %, grand total) that updates live. Keep money

in integer piastres internally to avoid rounding errors, display with

thousands separators and 2 decimals. Unknown cost shows "margin unknown".

Cost and margin columns use the \`permission\` prop.

H. DocumentView (read-only document page): action icon bar (edit, view,

download, print, send, share), "from / to" boxes, items table, totals

aligned to the inline end, notes, print and cancel buttons. A print

stylesheet: A4, hides the shell, RTL Arabic.

I. PermissionGate component and useRole hook (reads the dev role switcher).

Roles: owner, project manager, site engineer, accountant, sales. Only

owner and project manager have \`view\_cost\`.

RULES: tokens only, logical Tailwind classes only, Western digits, visible

focus rings, 4.5:1 contrast, reduced motion respected (150-250ms), each

component shows loading / empty / error / no-permission states where it

applies. Realistic Arabic mock data for a finishing company (quote items

like دهان بلاستيك, نقطة كهرباء, تركيب سيراميك).

Verify Arabic RTL and English LTR, on phone and desktop widths.

WHEN DONE: stop and report what you built and what you could not do.