ROUND 3: SMALL FIXES ONLY. Do not add new features.

1\. Contrast. White text on the current fills fails 4.5:1: primary #4680FF

(about 3.6), success #2CA87F (about 3.0), info #00BCD4 (about 2.3).

Add "action" shades used for ANY fill that carries text (buttons, solid

badges, toasts): primary-action #3469E6, success-action #1B7F5C,

info-action #0B7BB5. Keep the current 500 shades for accents, dots,

progress bars, icon backgrounds, charts and soft fills. Warning keeps

dark text on amber. Danger #DC2626 is fine. Show the action shades in the

color section of /design-system and put a computed contrast table

(foreground, background, ratio) in your report.

2\. No bad wrapping. Button labels stay on one line (on small screens stack

buttons full width). Codes and IDs such as PRJ-EGY-CAI-2026-012 must not

break: wrap in an LTR isolate with white-space: nowrap and let the

container truncate or scroll.

3\. Mobile header: show only "\[اسم النظام\]" (no half-cut word).

4\. Scrollable tab and capsule rows: add an edge fade so users can see

more items exist.

5\. Keep number+unit together in titles, for example "(1,200 م²)", with

nowrap.

6\. Re-check in Arabic that "8.4%" in the toast text, the "+10%" and "-10%"

buttons and "+1.3%" read in the correct order. Fix if not.

7\. The language switch icon button needs an accessible label. Verify a

visible focus ring on every interactive component.

Verify everything in Arabic RTL and English LTR. When done, stop and report.