# Enabled/Disabled Edge Cases — Variables, If/Else & Calendar

> Natural language steps for LLM prompt accuracy testing.
> Steps marked **[N]** are **negative cases** — assertions expected to FAIL.
>
> **Step formats:**
> - Direct: `Assert the "X" button is enabled`
> - Variable: `Check if the "X" button is enabled → {{var}}` / `Assert {{var}} equals "true"`
> - If/Else: `If the "X" button is enabled then assert the "Y" button is disabled`
> - If/Else + Variable: `If {{var}} equals "true" then assert the "Y" button is disabled`

---

## Test Page

| Page | URL |
|------|-----|
| Element Assertions | https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html |

---

## Navigate

1. Open the URL https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html

---

## Section 18a — Readonly vs Disabled (`#enabled-disabled-edge-cases`)

2. Assert the "INV-2026-7734" input is enabled
3. Assert the "INV-2026-7734" input has a readonly attribute
4. **[N]** Assert the "INV-2026-7734" input is disabled
5. Check if the "INV-2026-7734" input is disabled → {{inv_disabled}}
6. Assert {{inv_disabled}} equals "false"
7. Assert the "CLOSED-ACC-001" input is disabled
8. Assert the "CLOSED-ACC-001" input does not have a readonly attribute
9. **[N]** Assert the "CLOSED-ACC-001" input has a readonly attribute
10. Check if the "CLOSED-ACC-001" input is enabled → {{closed_enabled}}
11. Assert {{closed_enabled}} equals "false"
12. **[N]** Assert {{closed_enabled}} equals "true"
13. Assert the "ARCHIVED-2024" input is disabled
14. Assert the "ARCHIVED-2024" input has a readonly attribute
15. If the "INV-2026-7734" input is enabled then assert the "INV-2026-7734" input has a readonly attribute
16. If {{inv_disabled}} equals "false" then assert the "CLOSED-ACC-001" input is disabled
17. **[N]** If the "INV-2026-7734" input is disabled then assert the "CLOSED-ACC-001" input is disabled

---

## Section 18b — Conditional Enable Chain (`#enabled-disabled-edge-cases`)

> Pipeline: Verify Identity → Approve Order → Ship Order. Only Step 1 starts enabled.

18. Assert the "Verify Identity" button is enabled
19. Assert the "Approve Order" button is disabled
20. Assert the "Ship Order" button is disabled
21. Check if the "Ship Order" button is enabled → {{step3_enabled}}
22. Assert {{step3_enabled}} equals "false"
23. If the "Verify Identity" button is enabled then assert the "Approve Order" button is disabled
24. **[N]** If the "Verify Identity" button is enabled then assert the "Ship Order" button is enabled
25. **[N]** Assert {{step3_enabled}} equals "true"
26. Click the "Verify Identity" button
27. Assert the "Verify Identity" button is disabled
28. Assert the "Approve Order" button is enabled
29. Assert the "Ship Order" button is disabled
30. Check if the "Approve Order" button is enabled → {{step2_after}}
31. Assert {{step2_after}} equals "true"
32. If {{step2_after}} equals "true" then assert the "Ship Order" button is disabled
33. **[N]** If the data-chain-state of the "Verify Identity" button equals "done" then assert the "Ship Order" button is enabled
34. Click the "Approve Order" button
35. Assert the "Ship Order" button is enabled
36. Check if the "Ship Order" button is enabled → {{step3_final}}
37. Assert {{step3_final}} equals "true"
38. If {{step3_final}} equals "true" then assert the "Approve Order" button is disabled

---

## Section 18c — Inherited & Aria Disabled (`#enabled-disabled-edge-cases`)

39. Assert the "4111-XXXX-XXXX" input is disabled
40. Assert the "Process Payment" button is disabled
41. Assert the "Cancel Payment" button is enabled
42. **[N]** Assert the "Cancel Payment" button is disabled
43. Check if the "Cancel Payment" button is enabled → {{cancel_enabled}}
44. Assert {{cancel_enabled}} equals "true"
45. If the "4111-XXXX-XXXX" input is disabled then assert the "Cancel Payment" button is enabled
46. **[N]** If the "4111-XXXX-XXXX" input is disabled then assert the "Cancel Payment" button is disabled
47. Assert the "View Report" button is enabled
48. Assert the aria-disabled of the "View Report" button equals "true"
49. **[N]** Assert the "View Report" button is disabled
50. Check if the "View Report" button is enabled → {{report_enabled}}
51. Assert {{report_enabled}} equals "true"
52. If the "View Report" button is enabled then assert the aria-disabled of the "View Report" button equals "true"
53. **[N]** If the aria-disabled of the "View Report" button equals "true" then assert the "View Report" button is disabled

---

## Section 18d — Calendar Date Edge Cases (`#enabled-disabled-edge-cases`)

54. Assert today's date in the booking calendar is enabled
55. Assert yesterday's date in the booking calendar is disabled
56. Assert tomorrow's date in the booking calendar is enabled
57. **[N]** Assert yesterday's date in the booking calendar is enabled
58. **[N]** Assert today's date in the booking calendar is disabled
59. Check if today's date in the booking calendar is enabled → {{today_enabled}}
60. Assert {{today_enabled}} equals "true"
61. Check if yesterday's date in the booking calendar is enabled → {{yesterday_enabled}}
62. Assert {{yesterday_enabled}} equals "false"
63. **[N]** Assert {{yesterday_enabled}} equals "true"
64. Assert the 3rd day from today in the booking calendar is enabled
65. Assert the data-special of the 3rd day from today equals "3rd-from-today"
66. **[N]** Assert the 3rd day from today in the booking calendar is disabled
67. Check if the 3rd day from today is enabled → {{third_day_enabled}}
68. Assert {{third_day_enabled}} equals "true"
69. **[N]** Assert {{third_day_enabled}} equals "false"
70. Check if 1 day before today is enabled → {{one_before_enabled}}
71. Assert {{one_before_enabled}} equals "false"
72. **[N]** Assert {{one_before_enabled}} equals "true"
73. If the 3rd day from today is enabled then assert the data-special of the 3rd day from today equals "3rd-from-today"
74. If yesterday is disabled then assert the data-date-state of yesterday equals "past"
75. If {{third_day_enabled}} equals "true" then assert {{one_before_enabled}} equals "false"
76. **[N]** If {{third_day_enabled}} equals "true" then assert {{one_before_enabled}} equals "true"
77. **[N]** If yesterday is disabled then assert yesterday is enabled
78. If today is enabled then if tomorrow is enabled then assert the 3rd day from today is enabled
79. **[N]** If today is enabled then if yesterday is enabled then assert tomorrow is enabled
80. Assert the next Saturday in the booking calendar has data-weekend equal to "true"
81. Assert the data-month-boundary of the 1st of the current month equals "first"

---

## Section 18e — Toggle & Stepper (`#enabled-disabled-edge-cases`)

82. Assert the "Notifications: ON" button is enabled
83. Assert the data-state of the "Notifications: ON" button equals "enabled"
84. Click the "Notifications: ON" button
85. Assert the "Notifications: OFF" button is enabled
86. Assert the data-state of the "Notifications: OFF" button equals "disabled"
87. **[N]** Assert the "Notifications: OFF" button is disabled
88. Check if the "Notifications: OFF" button is enabled → {{notif_off_enabled}}
89. Assert {{notif_off_enabled}} equals "true"
90. If the data-state of the "Notifications: OFF" button equals "disabled" then assert the "Notifications: OFF" button is enabled
91. **[N]** If the data-state of the "Notifications: OFF" button equals "disabled" then assert the "Notifications: OFF" button is disabled
92. Assert the quantity input has a readonly attribute
93. **[N]** Assert the quantity input is disabled
94. Click the minus button
95. Assert the minus button is disabled
96. Assert the plus button is enabled
97. **[N]** Assert the minus button is enabled

---

## Section 18f — Ambiguous States (`#enabled-disabled-edge-cases`)

98. Assert the "Generate Report" button is enabled
99. **[N]** Assert the "Generate Report" button is disabled
100. Assert the "Submit Application" button is disabled
101. **[N]** Assert the "Submit Application" button is enabled
102. Assert the "Archive Project" button is enabled
103. Assert the data-disabled of the "Archive Project" button equals "true"
104. **[N]** Assert the "Archive Project" button is disabled
105. If the data-disabled of the "Archive Project" button equals "true" then assert the "Archive Project" button is enabled
106. **[N]** If the data-disabled of the "Archive Project" button equals "true" then assert the "Archive Project" button is disabled
107. Assert the "Paused Task" button is disabled
108. Assert the "Flagged Item" button is disabled
109. **[N]** Assert the "Flagged Item" button is enabled
110. Check if the "Flagged Item" button is enabled → {{flagged_enabled}}
111. Assert {{flagged_enabled}} equals "false"
112. **[N]** Assert {{flagged_enabled}} equals "true"

---

## Summary — 112 steps

| Category | Format Mix | Steps |
|----------|-----------|------:|
| Readonly vs Disabled | Direct + Variable + If/Else | 16 |
| Conditional Enable Chain | Direct + Variable + If/Else + Click | 21 |
| Inherited & Aria Disabled | Direct + Variable + If/Else | 15 |
| Calendar Dates | Direct + Variable + If/Else + Nested If | 28 |
| Toggle & Stepper | Direct + Variable + If/Else + Click | 16 |
| Ambiguous States | Direct + Variable + If/Else | 15 |
| Negative **[N]** (included above) | Expected to FAIL | ~32 |
| **Total** | | **112** |

---

## LLM Trap Coverage

| Trap | What It Tests |
|------|--------------|
| Readonly ≠ Disabled | Readonly input is enabled, not disabled |
| Boolean attr `disabled="false"` | Still disabled — boolean attr ignores value |
| aria-disabled ≠ disabled | Semantically disabled but functionally enabled |
| data-disabled ≠ disabled | Custom attr doesn't affect DOM state |
| data-state="disabled" ≠ disabled | Custom toggle state vs HTML disabled |
| CSS appearance ≠ DOM state | Looks disabled (opacity) but isn't |
| Inherited disabled (fieldset) | Children disabled, outside sibling enabled |
| Sequential enable chain | Click enables next step only, not all |
| Variable consistency | `{{var}}` must match element state |
| Variable in if/else | `If {{var}} equals "X" then assert Y` |
| Nested if | `If A then if B then assert C` |
| Dead branch | False condition → branch must not execute |
| Calendar past/future | Past=disabled, future=enabled |
| Min/max boundary | Stepper disables buttons at limits |
