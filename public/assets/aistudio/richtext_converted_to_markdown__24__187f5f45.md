ROUND 2: FIXES ONLY. Do not add new features. Do not build the sidebar,

data tables or forms in this round.

1\. Branding. Remove every mention of "Admindek" (page title, subtitle,

footer, the "Admindek Theme" label). Use the placeholder name

"\[اسم النظام\]" in Arabic and "\[System name\]" in English. Remove the

footer claims ("WCAG 2.1 AA Compliant", etc.).

2\. Arabic bidi bugs.

\- Numbers with % or +/- render reversed ("%8.4", "12+", "1.3%+").

Wrap such numbers in an LTR isolate ( or

unicode-bidi: isolate) so they show "8.4%", "+12", "+1.3%".

\- Colons and parentheses around English words are displaced

(":Solid Badges", "Form Inputs &) ... (Controls"). In Arabic mode show

Arabic-only headings and labels. English labels appear only in the

English mode. If mixed text is unavoidable, isolate the English part.

\- The card "years 3.2" must read "3.2 سنة". Audit every unit string

for order and translation and add a number+unit helper.

3\. The sticky page header uses about a third of a phone screen. On small

screens make it one compact line (truncated title, the language switch

as a small icon button, no subtitle) and not sticky below the md

breakpoint.

4\. The segmented control and any tab list wider than the screen are

clipped. Make them horizontally scrollable (with an edge fade) or wrap.

5\. Match the reference more closely: radius 4px for buttons, inputs and

badges, 6px for cards, a very light shadow. Button labels in normal

case, no uppercase, no letter spacing (including link buttons).

6\. Colors. Keep the reference hues for fills (success green, danger red,

warning yellow, info light blue: measure them from the screenshots).

Reach 4.5:1 by using dark text on yellow and light fills instead of

darkening the fill. Keep the primary #4680FF scale.

7\. Currency input: show thousands separators (4,850,000.00) while

keeping Western digits.

8\. Verify every fix in both Arabic RTL and English LTR.

Answers to your questions (for the next phase, do not build yet):

\- Sidebar: fixed 260px, collapsible to icons only. On the right in RTL, on

the left in LTR. An off-canvas drawer on mobile. Not floating.

\- Data tables: yes, TanStack Table.

\- Forms: yes, React Hook Form + Zod.

\- i18n: keep the Context approach for now, but keep the dictionaries

structured so moving to i18next later is easy.

WHEN DONE: stop and report the changes and anything you could not fix.