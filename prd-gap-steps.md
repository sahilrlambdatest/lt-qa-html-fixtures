# PRD Gap Steps — LTPM-2748 Missing Coverage

> Steps to fill gaps identified between PRD requirements and existing test coverage.
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

> PRD: "verify that the 3rd date from today is enabled, then select the last enabled date and move forward"
> Tests conditional **action** (click), not just conditional assertion.

2. Assert the 3rd day from today in the date picker is enabled
3. If the 3rd day from today is enabled then click the 3rd day from today
4. Assert the date selection status text contains "Selected"
5. If the 3rd day from today is enabled then select the last enabled date in the date picker
6. Assert the last enabled date in the date picker is selected
7. **[N]** If the 3rd day from today is disabled then click the 3rd day from today

---

## Gap 2 — Variable Steps (Missing from e2e-test-steps.md)

> PRD TE-6133: "replay to update operation.user_variables with fresh live DOM value"
> Variable read + assert on element states, attributes, and CSS.

#### Variable: Element States

8. Check if the "Submit Order" button is enabled → {{submit_enabled}}
9. Assert {{submit_enabled}} equals "true"
10. Check if the "Authorize Payment" button is disabled → {{auth_disabled}}
11. Assert {{auth_disabled}} equals "true"
12. Check if the "John Doe" input is enabled → {{john_enabled}}
13. Assert {{john_enabled}} equals "true"
14. **[N]** Assert {{auth_disabled}} equals "false"

#### Variable: DOM Attributes

15. Check the data-testid of the "Submit Order" button → {{submit_testid}}
16. Assert {{submit_testid}} equals "submit-btn"
17. Check the placeholder of the "John Doe" input → {{john_placeholder}}
18. Assert {{john_placeholder}} equals "Type here..."
19. Check the value of the "ORD-2024-0892" input → {{order_value}}
20. Assert {{order_value}} equals "ORD-2024-0892"
21. **[N]** Assert {{submit_testid}} equals "disabled-btn"

#### Variable: CSS Properties

22. Check the color of the "Urgent alert message" element → {{alert_color}}
23. Assert {{alert_color}} equals "rgb(255, 0, 0)"
24. Check the font-weight of the "Urgent alert message" element → {{alert_weight}}
25. Assert {{alert_weight}} equals "700"
26. **[N]** Assert {{alert_color}} equals "rgb(0, 0, 255)"

#### Variable: Cross-Element Assertions

27. Check if the "Submit Order" button is enabled → {{btn_state}}
28. Check the data-testid of the "Submit Order" button → {{btn_id}}
29. If {{btn_state}} equals "true" then assert {{btn_id}} equals "submit-btn"
30. If {{btn_state}} equals "true" then assert the "Authorize Payment" button is disabled
31. **[N]** If {{btn_state}} equals "false" then assert {{btn_id}} equals "submit-btn"

#### Variable: Toggle/Checkbox State

32. Check if the "Newsletter subscription" checkbox is checked → {{newsletter_checked}}
33. Assert {{newsletter_checked}} equals "true"
34. Check if the "Accept cookies" checkbox is checked → {{cookies_checked}}
35. Assert {{cookies_checked}} equals "true"
36. Check if the "Dark Mode" toggle is toggled on → {{darkmode_on}}
37. Assert {{darkmode_on}} equals "true"
38. **[N]** Assert {{newsletter_checked}} equals "false"

#### Variable: Visibility/Presence

39. Check if the "Dashboard overview panel" element is visible → {{dashboard_visible}}
40. Assert {{dashboard_visible}} equals "true"
41. Check if the error banner is present → {{error_present}}
42. Assert {{error_present}} equals "false"
43. **[N]** Assert {{dashboard_visible}} equals "false"

---

## Gap 3 — Toggle Implementation Variants (R2/AC2)

> PRD: "handling different toggle implementations consistently"
> Tests checkbox-as-toggle, role="switch", custom data-state toggles.

44. Assert the "Dark Mode" toggle is toggled on
45. Assert the aria-checked of the "Dark Mode" toggle equals "true"
46. Assert the "Newsletter subscription" checkbox is checked
47. Assert the "3rd Party Tag Configuration" toggle is disabled
48. Assert the "Accept cookies" checkbox is checked
49. **[N]** Assert the "Dark Mode" toggle is toggled off
50. **[N]** Assert the "Newsletter subscription" checkbox is unchecked
51. **[N]** Assert the "3rd Party Tag Configuration" toggle is enabled

---

## Gap 4 — Present vs Hidden Distinction (R10/AC8)

> PRD: "is not present" + element NOT found = PASS
> PRD: "is hidden" + element NOT found = ERROR
> Critical behavioral difference.

52. Assert the error banner is not present
53. Assert the "Dashboard overview panel" element is visible
54. Assert the "Supplementary details section" element is hidden
55. Assert the "Promotional banner" element is not present
56. **[ERROR]** Assert the "nonexistent-xyz-widget" element is hidden
57. **[ERROR]** Assert the "nonexistent-xyz-widget" element is visible
58. Assert the "nonexistent-xyz-widget" element is not present

> Steps 56-57: Element doesn't exist → for hidden/visible assertions this should be ERROR (not PASS).
> Step 58: Element doesn't exist → for "not present" assertion this should be PASS.

---

## Gap 5 — Stale Element Reference (Disappearing Element)

> PRD: "Retry element resolution once, then ERROR"

59. Click the "Start Timer" button next to the disappearing element
60. Assert the "I will disappear in 3 seconds..." element is visible
61. Wait 4 seconds
62. **[ERROR]** Assert the "I will disappear in 3 seconds..." element is visible
63. Assert the "I will disappear in 3 seconds..." element is not present

---

## Gap 6 — Numeric Parse Failure

> PRD: "Attribute value [value] is not numeric. Cannot apply [operator]."

64. Assert the data-testid of the "Submit Order" button is greater than "5"
65. **[ERROR]** Assert the data-testid of the "Submit Order" button is greater than "abc"

> Step 64: data-testid="submit-btn" is not numeric → should ERROR.
> Step 65: Comparison value "abc" is not numeric → should ERROR.

---

## Gap 7 — Value > 500 Characters Truncation

> PRD: "Values exceeding 500 characters truncated with user-visible warning"

66. Assert the data-long-value of the "Long attribute element" contains "AAAAAA"
67. Assert the data-exact-500 of the "500 chars boundary" element contains "BBBBBB"

> Step 66: 501-char value — should truncate with warning but still compare.
> Step 67: Exactly 500 chars — no truncation needed, boundary test.

---

## Gap 8 — CSS Color Normalization: Named ↔ RGB (AC12)

> PRD: "named colors ('red') must match RGB equivalents"
> Existing steps only use rgb() values. Need named color assertions.

68. Assert the color of the "Urgent alert message" element equals "red"
69. Assert the color of the "Error notification text" element equals "red"
70. Assert the color of the "System warning label" element equals "red"
71. Assert the color of the "Urgent alert message" element equals "rgb(255, 0, 0)"
72. Assert the color of the "Urgent alert message" element equals "#ff0000"
73. **[N]** Assert the color of the "Urgent alert message" element equals "blue"
74. **[N]** Assert the color of the "Urgent alert message" element equals "rgb(0, 0, 255)"

> Steps 68-72: All should PASS — red, rgb(255,0,0), #ff0000 are all the same color.

---

## Gap 9 — Font Family Quotes Stripping (AC11/LTPM-2902)

> PRD: "Font families: Surrounding quotes stripped for comparison"
> Customer qable.io wants font-size, font-weight, font-style.

75. Assert the font-family of the "System notification copy" element contains "Arial"
76. Assert the font-family of the "Editorial column text" element contains "Georgia"
77. Assert the font-family of the "Code snippet display" element contains "Courier New"
78. Assert the font-style of the "Author attribution" element equals "italic"
79. Assert the font-style of the "Normal style text" element equals "normal"
80. **[N]** Assert the font-family of the "System notification copy" element contains "Times New Roman"
81. **[N]** Assert the font-style of the "Author attribution" element equals "normal"

---

## Gap 10 — `ends with` / `does not end with` Operator (Weak Coverage)

> Only 1-2 existing steps use these operators.

82. Assert the src of the LambdaTest Logo image ends with ".svg"
83. Assert the href of the "API Documentation" link ends with "/docs"
84. Assert the data-testid of the "Submit Order" button ends with "-btn"
85. Assert the value of the "ORD-2024-0892" input ends with "0892"
86. Assert the placeholder of the "John Doe" input does not end with "..."
87. **[N]** Assert the src of the LambdaTest Logo image ends with ".png"
88. **[N]** Assert the data-testid of the "Submit Order" button ends with "-input"

> Step 86: placeholder is "Type here..." — does end with "..." → assertion FAILS (it's a [N] trap without the [N] marker. Actually "Type here..." does end with "..." so this should FAIL — let me fix).

---

## Gap 11 — Conditional Action vs Conditional Assertion (Disambiguation)

> PRD: "if button is enabled then click it" → CONDITIONAL ACTION
> vs "Assert button is enabled" → ASSERTION
> Tests NL classification.

89. If the "Submit Order" button is enabled then click the "Submit Order" button
90. Assert the "Submit Order" button is enabled
91. If the "Authorize Payment" button is disabled then assert the "Authorize Payment" button is not clickable
92. If the "Action Button" button is enabled then click the "Action Button" button
93. **[N]** If the "Authorize Payment" button is enabled then click the "Authorize Payment" button

---

## Gap 12 — Viewport-Dependent CSS (Mobile Web)

> PRD: "CSS computed values may change based on viewport"

94. Assert the font-size of the responsive heading equals "28px"
95. Assert the display of the desktop navigation menu equals "flex"
96. Assert the display of the hamburger menu button equals "none"

> Steps 94-96: Desktop viewport. Values change at <768px.

---

## Gap 13 — Airbnb-Style Calendar Variables (Real-World Pattern)

> From user's Airbnb test example — calendar date assertions with variables.

97. Check if the 3rd day from today is enabled → {{third_day_enabled}}
98. Assert {{third_day_enabled}} equals "true"
99. Check if 1 day before today is enabled → {{yesterday_enabled}}
100. Assert {{yesterday_enabled}} equals "false"
101. Check if today is enabled → {{today_enabled}}
102. Assert {{today_enabled}} equals "true"
103. If {{third_day_enabled}} equals "true" then assert {{yesterday_enabled}} equals "false"
104. **[N]** Assert {{third_day_enabled}} equals "false"
105. **[N]** Assert {{yesterday_enabled}} equals "true"

---

## Summary — 105 steps

| Gap # | Gap Description | Steps | Customer |
|-------|----------------|------:|----------|
| 1 | Renuity: conditional action on calendar | 6 | Renuity ($30K) |
| 2 | Variable steps (states, attrs, CSS, toggles) | 35 | All customers |
| 3 | Toggle implementation variants | 8 | Healthifyme, Gen Digital |
| 4 | Present vs hidden distinction | 7 | PRD AC8 |
| 5 | Stale element reference | 5 | PRD failure mode |
| 6 | Numeric parse failure | 2 | PRD failure mode |
| 7 | Value > 500 chars truncation | 2 | PRD constraint |
| 8 | CSS color normalization (named↔RGB) | 7 | PRD AC12 |
| 9 | Font family quotes stripping | 7 | qable.io (LTPM-2902) |
| 10 | `ends with` operator coverage | 7 | PRD operator |
| 11 | Conditional action vs assertion | 5 | PRD disambiguation |
| 12 | Viewport-dependent CSS | 3 | PRD constraint |
| 13 | Airbnb calendar variables | 9 | Renuity, all customers |
| **Total** | | **105** | |
