# PRD Gap Steps — LTPM-2748 Missing Coverage

> Steps to fill gaps identified between PRD requirements and existing test coverage.
> Use on: https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html
> Steps marked **[N]** are **negative cases** — assertions expected to FAIL.
> Steps marked **[ERROR]** should result in an error (element/attribute not found).
>
> **All steps are natural language (per PRD LTPM-2748):**
> - Element states: `Assert the "X" button is enabled/disabled`
> - Attribute checks: `Assert the {attribute} of X equals "Y"`
> - CSS properties: `Assert the color of X equals "red"`
> - Negation: `Assert X is NOT disabled`
> - If/Else: `If the "X" button is enabled then assert the "Y" button is disabled`
> - Conditional action: `If the "X" button is enabled then click the "X" button`

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

> PRD: "verify that the 3rd date from today is enabled, then select the last enabled date and move forward"

2. Assert the 3rd day from today in the date picker is enabled
3. If the 3rd day from today is enabled then click the 3rd day from today
4. Assert the date selection status text contains "Selected"
5. If the 3rd day from today is enabled then select the last enabled date in the date picker
6. Assert the last enabled date in the date picker is selected
7. **[N]** If the 3rd day from today is disabled then click the 3rd day from today

---

## Gap 2 — Toggle Implementation Variants (R2/AC2)

> PRD: "handling different toggle implementations consistently"

8. Assert the "Dark Mode" toggle is toggled on
9. Assert the aria-checked of the "Dark Mode" toggle equals "true"
10. Assert the "Newsletter subscription" checkbox is checked
11. Assert the "3rd Party Tag Configuration" toggle is disabled
12. Assert the "Accept cookies" checkbox is checked
13. **[N]** Assert the "Dark Mode" toggle is toggled off
14. **[N]** Assert the "Newsletter subscription" checkbox is unchecked
15. **[N]** Assert the "3rd Party Tag Configuration" toggle is enabled

---

## Gap 3 — Present vs Hidden Distinction (R10/AC8)

> PRD: "is not present" + element NOT found = PASS
> PRD: "is hidden" + element NOT found = ERROR

16. Assert the error banner is not present
17. Assert the "Dashboard overview panel" element is visible
18. Assert the "Supplementary details section" element is hidden
19. Assert the "Promotional banner" element is not present
20. **[ERROR]** Assert the "nonexistent-xyz-widget" element is hidden
21. **[ERROR]** Assert the "nonexistent-xyz-widget" element is visible
22. Assert the "nonexistent-xyz-widget" element is not present

---

## Gap 4 — Stale Element Reference (Disappearing Element)

> PRD: "Retry element resolution once, then ERROR"

23. Click the "Start Timer" button next to the disappearing element
24. Assert the "I will disappear in 3 seconds..." element is visible
25. Wait 4 seconds
26. **[ERROR]** Assert the "I will disappear in 3 seconds..." element is visible
27. Assert the "I will disappear in 3 seconds..." element is not present

---

## Gap 5 — Numeric Parse Failure

> PRD: "Attribute value [value] is not numeric. Cannot apply [operator]."

28. **[ERROR]** Assert the data-testid of the "Submit Order" button is greater than "5"
29. **[ERROR]** Assert the data-testid of the "Submit Order" button is greater than "abc"

---

## Gap 6 — Value > 500 Characters Truncation

> PRD: "Values exceeding 500 characters truncated with user-visible warning"

30. Assert the data-long-value of the "Long attribute element" contains "AAAAAA"
31. Assert the data-exact-500 of the "500 chars boundary" element contains "BBBBBB"

---

## Gap 7 — CSS Color Normalization: Named ↔ RGB (AC12)

> PRD: "named colors ('red') must match RGB equivalents"

32. Assert the color of the "Urgent alert message" element equals "red"
33. Assert the color of the "Error notification text" element equals "red"
34. Assert the color of the "System warning label" element equals "red"
35. Assert the color of the "Urgent alert message" element equals "rgb(255, 0, 0)"
36. Assert the color of the "Urgent alert message" element equals "#ff0000"
37. **[N]** Assert the color of the "Urgent alert message" element equals "blue"
38. **[N]** Assert the color of the "Urgent alert message" element equals "rgb(0, 0, 255)"

---

## Gap 8 — Font Family Quotes Stripping (AC11/LTPM-2902)

> PRD: "Font families: Surrounding quotes stripped for comparison"
> Customer qable.io wants font-size, font-weight, font-style.

39. Assert the font-family of the "System notification copy" element contains "Arial"
40. Assert the font-family of the "Editorial column text" element contains "Georgia"
41. Assert the font-family of the "Code snippet display" element contains "Courier New"
42. Assert the font-style of the "Author attribution" element equals "italic"
43. Assert the font-style of the "Normal style text" element equals "normal"
44. **[N]** Assert the font-family of the "System notification copy" element contains "Times New Roman"
45. **[N]** Assert the font-style of the "Author attribution" element equals "normal"

---

## Gap 9 — `ends with` / `does not end with` Operator (Weak Coverage)

46. Assert the src of the LambdaTest Logo image ends with ".svg"
47. Assert the href of the "API Documentation" link ends with "/docs"
48. Assert the data-testid of the "Submit Order" button ends with "-btn"
49. Assert the value of the "ORD-2024-0892" input ends with "0892"
50. Assert the value of the "ORD-2024-0892" input does not end with "1234"
51. **[N]** Assert the src of the LambdaTest Logo image ends with ".png"
52. **[N]** Assert the data-testid of the "Submit Order" button ends with "-input"

---

## Gap 10 — Conditional Action vs Conditional Assertion (Disambiguation)

> PRD: "if button is enabled then click it" → CONDITIONAL ACTION
> vs "Assert button is enabled" → ASSERTION

53. If the "Submit Order" button is enabled then click the "Submit Order" button
54. Assert the "Submit Order" button is enabled
55. If the "Authorize Payment" button is disabled then assert the "Authorize Payment" button is not clickable
56. If the "Action Button" button is enabled then click the "Action Button" button
57. **[N]** If the "Authorize Payment" button is enabled then click the "Authorize Payment" button

---

## Gap 11 — Viewport-Dependent CSS (Mobile Web)

> PRD: "CSS computed values may change based on viewport"

58. Assert the font-size of the responsive heading equals "28px"
59. Assert the display of the desktop navigation menu equals "flex"
60. Assert the display of the hamburger menu button equals "none"

---

## Gap 12 — Calendar Date Assertions (Airbnb/Renuity Pattern)

> Natural language date assertions on the booking calendar.

61. Assert today's date in the booking calendar is enabled
62. Assert yesterday's date in the booking calendar is disabled
63. Assert tomorrow's date in the booking calendar is enabled
64. Assert the 3rd day from today in the booking calendar is enabled
65. Assert the 7th day from today in the booking calendar is enabled
66. Assert 1 day before today is disabled
67. Assert 2 days before today is disabled
68. Assert the data-date-state of today equals "today"
69. Assert the data-date-state of yesterday equals "past"
70. Assert the data-date-state of tomorrow equals "future"
71. If today is enabled then assert tomorrow is enabled
72. If yesterday is disabled then assert 1 day before today is disabled
73. If the 3rd day from today is enabled then assert the 7th day from today is enabled
74. **[N]** Assert the 3rd day from today in the booking calendar is disabled
75. **[N]** Assert yesterday's date in the booking calendar is enabled
76. **[N]** Assert 1 day before today is enabled
77. **[N]** If the 3rd day from today is enabled then assert yesterday is enabled
78. **[N]** If today is enabled then if yesterday is enabled then assert tomorrow is enabled

---

## Summary — 78 steps

| Gap # | Gap Description | Steps | Customer |
|-------|----------------|------:|----------|
| 1 | Renuity: conditional action on calendar | 6 | Renuity ($30K) |
| 2 | Toggle implementation variants | 8 | Healthifyme, Gen Digital |
| 3 | Present vs hidden distinction | 7 | PRD AC8 |
| 4 | Stale element reference | 5 | PRD failure mode |
| 5 | Numeric parse failure | 2 | PRD failure mode |
| 6 | Value > 500 chars truncation | 2 | PRD constraint |
| 7 | CSS color normalization (named↔RGB) | 7 | PRD AC12 |
| 8 | Font family quotes stripping | 7 | qable.io (LTPM-2902) |
| 9 | `ends with` operator coverage | 7 | PRD operator |
| 10 | Conditional action vs assertion | 5 | PRD disambiguation |
| 11 | Viewport-dependent CSS | 3 | PRD constraint |
| 12 | Calendar date assertions | 18 | Renuity, all customers |
| **Total** | | **78** | |
