ROUND 6: FINAL VISUAL FIXES. No new features. Same anti-bloat rules:

change source values only, delete what they replace, no arbitrary

Tailwind values, no !important, no per-page overrides. Report lines added

vs removed.

1\. SIGNED NUMBERS. Delta badges render "14.2%+", "3.1%-", "4+" in Arabic.

They must read "+14.2%", "-3.1%", "+4". Apply the BidiNumber helper (LTR

isolate) to EVERY signed or percent number in StatCard, SummaryCard,

badges, tables and toasts. Add a test that renders these in RTL and

asserts the visual order.

2\. TABLE LAYOUT (desktop 1920 and below).

\- Money cells: amount and currency on ONE line (white-space: nowrap),

end-aligned, tabular numbers.

\- Status badge cells: nowrap. A badge never wraps onto two lines.

\- Column min-widths as tokens: code 130, project name 260 (two lines max:

name + location), client 180, money 150, progress 160, status 140,

actions 120. If the container is narrower than the sum, the table

scrolls horizontally. Never squeeze a column below its min-width.

\- No row may exceed two text lines. Remove the empty wide actions column;

actions size to content.

\- Totals row: label spans the columns before the first numeric column and

does not wrap; amounts nowrap.

3\. BUTTON ICONS. Replace any "+" text character in buttons with the Phosphor

Plus icon placed at the inline start. Check every button that has an icon.

4\. ARABIC-ONLY IN ARABIC MODE on /patterns-demo and everywhere else:

remove English from headings, dialog buttons and descriptions such as

"(Small Dialog)", "(Drawer)", "ConfirmDialog", "Pattern G: ...(...)".

English text only in English mode. Technical identifiers such as

view\_cost go in a code chip with dir="ltr".

5\. NOTIFICATIONS PANEL. Align the panel's outer edge with the topbar content

padding (the same inline offset as the outermost topbar icon), not with

the viewport edge. Make the bell badge text meet 4.5:1 (dark text on the

green fill or a darker green fill).

6\. COST COLUMN MARKER in EditableItemsTable: remove the yellow background and

orange text. Use neutral styling plus a lock icon and the label

"خاص بالإدارة" / "Management only" in the column header.

7\. REPORT the final font family names and weights used (Arabic and

English) and whether the tokens from round 5 are the only place where

fonts are set.

VERIFY at 1920 and 1366 widths, Arabic RTL and English LTR. WHEN DONE: stop

and report.