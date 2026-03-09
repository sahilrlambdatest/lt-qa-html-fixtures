# PRD Gap Steps — LTPM-2748 Missing Coverage

> Steps that are NOT covered in `e2e-test-steps.md` or `enabled-disabled-edge-case-steps.md`.
> Use on: https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html
> Steps marked **[N]** are **negative cases** — assertions expected to FAIL.
> Steps marked **[ERROR]** should result in an error (element/attribute not found).

---

## Test Page

| Page | URL |
|------|-----|
| Element Assertions | https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html |

---

## Navigate

1. Open the URL https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html

---

## Gap 1 — Renuity: Conditional Action on Calendar (Customer Blocker)

> Customer wants: "if 3rd date is enabled, select the last enabled date and move forward"
> Tests conditional **action** (click), not just conditional assertion. Not covered anywhere.

2. If the 3rd day from today is enabled then click the 3rd day from today
3. Assert the date selection status text contains "Selected"
4. If the 3rd day from today is enabled then select the last enabled date in the date picker
5. Assert the last enabled date in the date picker is selected
6. **[N]** If the 3rd day from today is disabled then click the 3rd day from today

---

## Gap 2 — Toggle: Dark Mode State (Existing tests have it toggled off)

> e2e-test-steps has "Assert Dark Mode toggle is toggled off". Need the ON assertion.

7. Assert the "Dark Mode" toggle is toggled on
8. Assert the aria-checked of the "Dark Mode" toggle equals "true"
9. **[N]** Assert the "Newsletter subscription" checkbox is unchecked

---

## Gap 3 — Present vs Hidden: Nonexistent Element Behavior

> PRD: "is hidden" on missing element = ERROR, "is not present" on missing element = PASS.
> e2e-test-steps only tests "completely-fake-element is visible". Need "is hidden" + "is not present" on same missing element.

10. **[ERROR]** Assert the "nonexistent-xyz-widget" element is hidden
11. **[ERROR]** Assert the "nonexistent-xyz-widget" element is visible
12. Assert the "nonexistent-xyz-widget" element is not present

---

## Gap 4 — Stale Element: Assert "not present" After Disappear

> e2e-test-steps uses "not visible" after disappear. PRD distinction: "not present" should PASS when element is removed from DOM.

13. Click the "Start Timer" button next to the disappearing element
14. Wait 4 seconds
15. Assert the "I will disappear in 3 seconds..." element is not present

---

## Gap 5 — Numeric Parse Failure

> PRD: non-numeric value with numeric operator should ERROR. Not tested anywhere.

16. **[ERROR]** Assert the data-testid of the "Submit Order" button is greater than "5"
17. **[ERROR]** Assert the data-testid of the "Submit Order" button is greater than "abc"

---

## Gap 6 — Value > 500 Characters Truncation

> PRD: values > 500 chars truncated with warning. Not tested anywhere.

18. Assert the data-long-value of the "Long attribute element" contains "AAAAAA"
19. Assert the data-exact-500 of the "500 chars boundary" element contains "BBBBBB"

---

## Gap 7 — CSS Color Normalization: Named Color & Hex (AC12)

> Existing steps only use rgb(). Need "equals red" and "equals #ff0000" on same elements.

20. Assert the color of the "Urgent alert message" element equals "red"
21. Assert the color of the "Error notification text" element equals "red"
22. Assert the color of the "System warning label" element equals "red"
23. Assert the color of the "Urgent alert message" element equals "#ff0000"
24. **[N]** Assert the color of the "Urgent alert message" element equals "blue"

---

## Gap 8 — Font Family & Style Edge Cases (LTPM-2902)

> Existing tests cover "contains Arial/Georgia/Courier New" and "italic". Need normal font-style and negative on wrong font.

25. Assert the font-style of the "Normal style text" element equals "normal"
26. **[N]** Assert the font-family of the "System notification copy" element contains "Times New Roman"

---

## Gap 9 — `ends with` / `does not end with` (Weak Coverage)

> Only 2 existing steps use these operators. Need more variety.

27. Assert the href of the "API Documentation" link ends with "/docs"
28. Assert the data-testid of the "Submit Order" button ends with "-btn"
29. Assert the value of the "ORD-2024-0892" input ends with "0892"
30. Assert the value of the "ORD-2024-0892" input does not end with "1234"
31. **[N]** Assert the data-testid of the "Submit Order" button ends with "-input"

---

## Gap 10 — Conditional Action vs Conditional Assertion (Disambiguation)

> PRD: "if button is enabled then click it" → CONDITIONAL ACTION. Not tested as action.

32. If the "Submit Order" button is enabled then click the "Submit Order" button
33. If the "Authorize Payment" button is disabled then assert the "Authorize Payment" button is not clickable
34. If the "Action Button" button is enabled then click the "Action Button" button
35. **[N]** If the "Authorize Payment" button is enabled then click the "Authorize Payment" button

---

## Gap 11 — Viewport-Dependent CSS (Mobile Web)

> PRD: "CSS computed values may change based on viewport". Need display CSS check.

36. Assert the display of the desktop navigation menu equals "flex"
37. Assert the display of the hamburger menu button equals "none"

---

## Gap 12 — Calendar: Unique Date Assertions

> These specific calendar assertions are not in the other files.

38. Assert the 7th day from today in the booking calendar is enabled
39. Assert the data-date-state of today equals "today"
40. Assert the data-date-state of yesterday equals "past"
41. Assert the data-date-state of tomorrow equals "future"
42. If yesterday is disabled then assert 1 day before today is disabled
43. If the 3rd day from today is enabled then assert the 7th day from today is enabled
44. **[N]** If the 3rd day from today is enabled then assert yesterday is enabled

---

## Summary — 44 steps (all unique)

| Gap # | Gap Description | Steps | Source |
|-------|----------------|------:|--------|
| 1 | Renuity: conditional action on calendar | 5 | Customer blocker |
| 2 | Toggle: Dark Mode ON state | 3 | PRD R2/AC2 |
| 3 | Present vs hidden on nonexistent element | 3 | PRD AC8 |
| 4 | Stale element: "not present" after disappear | 3 | PRD failure mode |
| 5 | Numeric parse failure | 2 | PRD failure mode |
| 6 | Value > 500 chars truncation | 2 | PRD constraint |
| 7 | CSS color: named "red" & hex "#ff0000" | 5 | PRD AC12 |
| 8 | Font-style normal & wrong font-family | 2 | qable.io |
| 9 | `ends with` / `does not end with` | 5 | PRD operator |
| 10 | Conditional action (click) vs assertion | 4 | PRD disambiguation |
| 11 | Viewport-dependent CSS display | 2 | PRD constraint |
| 12 | Calendar: unique date assertions | 7 | Renuity |
| **Total** | | **44** | |
