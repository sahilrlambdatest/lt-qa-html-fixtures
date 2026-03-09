# Enabled/Disabled Edge Cases — Variables, If/Else & Calendar

> Natural language steps for LLM prompt accuracy testing.
> Every step is a single natural-language instruction (per PRD LTPM-2748).
> Steps marked **[N]** are **negative cases** — assertions expected to FAIL.
>
> **All steps are natural language:**
> - Element states: `Assert the "X" button is enabled/disabled`
> - Attribute checks: `Assert the {attribute} of X equals "Y"`
> - Attribute existence: `Assert X has a {attr} attribute` / `Assert X does not have a {attr} attribute`
> - Negation: `Assert X is NOT disabled`
> - If/Else: `If the "X" button is enabled then assert the "Y" button is disabled`
> - Calendar dates: `Assert the 3rd day from today is enabled`

---

## Test Page

| Page | URL |
|------|-----|
| Element Assertions | https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html |

---

## Navigate

1. Open the URL https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html

---

## Section 18a — Readonly vs Disabled Confusion (`#enabled-disabled-edge-cases`)

#### Readonly vs Disabled State Assertions

2. Assert the "INV-2026-7734" input is enabled
3. Assert the "INV-2026-7734" input has a readonly attribute
4. Assert the "INV-2026-7734" input does not have a disabled attribute
5. **[N]** Assert the "INV-2026-7734" input is disabled
6. **[N]** Assert the "INV-2026-7734" input does not have a readonly attribute

7. Assert the "CLOSED-ACC-001" input is disabled
8. Assert the "CLOSED-ACC-001" input has a disabled attribute
9. Assert the "CLOSED-ACC-001" input does not have a readonly attribute
10. **[N]** Assert the "CLOSED-ACC-001" input is enabled
11. **[N]** Assert the "CLOSED-ACC-001" input has a readonly attribute

12. Assert the "ARCHIVED-2024" input is disabled
13. Assert the "ARCHIVED-2024" input has a readonly attribute
14. Assert the "ARCHIVED-2024" input has a disabled attribute
15. **[N]** Assert the "ARCHIVED-2024" input is enabled

16. Assert the "Edit me freely" input is enabled
17. Assert the "Edit me freely" input does not have a readonly attribute
18. Assert the "Edit me freely" input does not have a disabled attribute
19. **[N]** Assert the "Edit me freely" input is disabled
20. **[N]** Assert the "Edit me freely" input has a readonly attribute

#### If/Else: Readonly vs Disabled Cross-Assertions

21. If the "INV-2026-7734" input is enabled then assert the "INV-2026-7734" input has a readonly attribute
22. If the "INV-2026-7734" input is enabled then assert the "CLOSED-ACC-001" input is disabled
23. **[N]** If the "INV-2026-7734" input is disabled then assert the "CLOSED-ACC-001" input is disabled
24. **[N]** If the "INV-2026-7734" input is disabled then assert the "INV-2026-7734" input has a readonly attribute

25. If the "CLOSED-ACC-001" input is disabled then assert the "CLOSED-ACC-001" input does not have a readonly attribute
26. **[N]** If the "CLOSED-ACC-001" input is enabled then assert the "CLOSED-ACC-001" input has a readonly attribute

27. If the "ARCHIVED-2024" input is disabled then assert the "ARCHIVED-2024" input has a readonly attribute
28. If the "Edit me freely" input is enabled then assert the "Edit me freely" input does not have a disabled attribute

---

## Section 18b — Conditional Enable Chain (`#enabled-disabled-edge-cases`)

> Order Processing Pipeline: Step 1 (Verify Identity) → Step 2 (Approve Order) → Step 3 (Ship Order)
> Only Step 1 is initially enabled. Each step enables the next when clicked.

#### Initial State Assertions (Before Any Clicks)

29. Assert the "Verify Identity" button is enabled
30. Assert the "Approve Order" button is disabled
31. Assert the "Ship Order" button is disabled
32. Assert the data-chain-state of the "Verify Identity" button equals "ready"
33. Assert the data-chain-state of the "Approve Order" button equals "blocked"
34. Assert the data-chain-state of the "Ship Order" button equals "blocked"

#### If/Else: Chain State Logic

35. If the "Verify Identity" button is enabled then assert the "Approve Order" button is disabled
36. If the "Approve Order" button is disabled then assert the "Ship Order" button is disabled
37. **[N]** If the "Verify Identity" button is enabled then assert the "Ship Order" button is enabled
38. **[N]** If the "Approve Order" button is disabled then assert the "Verify Identity" button is disabled

#### After Step 1 Click — State Changes

39. Click the "Verify Identity" button
40. Assert the "Verify Identity" button is disabled
41. Assert the "Approve Order" button is enabled
42. Assert the "Ship Order" button is disabled
43. Assert the data-chain-state of the "Verify Identity" button equals "done"
44. Assert the data-chain-state of the "Approve Order" button equals "ready"

45. If the "Approve Order" button is enabled then assert the "Ship Order" button is disabled
46. If the data-chain-state of the "Verify Identity" button equals "done" then assert the "Approve Order" button is enabled
47. **[N]** If the data-chain-state of the "Verify Identity" button equals "done" then assert the "Ship Order" button is enabled

#### After Step 2 Click

48. Click the "Approve Order" button
49. Assert the "Verify Identity" button is disabled
50. Assert the "Approve Order" button is disabled
51. Assert the "Ship Order" button is enabled
52. Assert the data-chain-state of the "Ship Order" button equals "ready"

53. If the data-chain-state of the "Ship Order" button equals "ready" then assert the "Approve Order" button is disabled
54. **[N]** If the "Ship Order" button is enabled then assert the "Approve Order" button is enabled

---

## Section 18c — Inherited Disabled (`#enabled-disabled-edge-cases`)

> Fieldset with disabled attribute — children inherit disabled state.
> "Cancel Payment" button is OUTSIDE the fieldset.

#### Fieldset Inheritance

55. Assert the "4111-XXXX-XXXX" input is disabled
56. Assert the "Process Payment" button is disabled
57. Assert the "Cancel Payment" button is enabled
58. **[N]** Assert the "Cancel Payment" button is disabled

59. If the "4111-XXXX-XXXX" input is disabled then assert the "Cancel Payment" button is enabled
60. **[N]** If the "4111-XXXX-XXXX" input is disabled then assert the "Cancel Payment" button is disabled
61. If the "Process Payment" button is disabled then assert the "Cancel Payment" button is enabled

#### Aria-Disabled vs Disabled

62. Assert the "View Report" button is enabled
63. Assert the aria-disabled of the "View Report" button equals "true"
64. Assert the "View Report" button does not have a disabled attribute
65. **[N]** Assert the "View Report" button is disabled

66. If the "View Report" button is enabled then assert the aria-disabled of the "View Report" button equals "true"
67. **[N]** If the aria-disabled of the "View Report" button equals "true" then assert the "View Report" button is disabled

---

## Section 18d — Calendar Date Edge Cases (`#enabled-disabled-edge-cases`)

> Booking calendar with dynamic dates. Today's date determines past/future.
> Past dates: disabled. Today & future dates: enabled.
> 3rd day from today: has data-special="3rd-from-today".
> 7th day from today: has data-special="7th-from-today".

#### Today, Yesterday, Tomorrow

68. Assert today's date in the booking calendar is enabled
69. Assert the data-date-state of today's date in the booking calendar equals "today"
70. Assert yesterday's date in the booking calendar is disabled
71. Assert the data-date-state of yesterday in the booking calendar equals "past"
72. Assert tomorrow's date in the booking calendar is enabled
73. Assert the data-date-state of tomorrow in the booking calendar equals "future"
74. **[N]** Assert yesterday's date in the booking calendar is enabled
75. **[N]** Assert the data-date-state of yesterday in the booking calendar equals "future"
76. **[N]** Assert today's date in the booking calendar is disabled

#### Nth Day From Today

77. Assert the 3rd day from today in the booking calendar is enabled
78. Assert the data-special of the 3rd day from today in the booking calendar equals "3rd-from-today"
79. Assert the 7th day from today in the booking calendar is enabled
80. Assert the data-special of the 7th day from today in the booking calendar equals "7th-from-today"
81. **[N]** Assert the 3rd day from today in the booking calendar is disabled
82. **[N]** Assert the data-special of the 3rd day from today equals "7th-from-today"
83. **[N]** Assert the data-date-state of the 3rd day from today equals "past"

#### If/Else: Date State Drives Assertion

84. If today's date in the booking calendar is enabled then assert tomorrow is enabled
85. If the data-date-state of today's date equals "today" then assert today is enabled
86. If the data-date-state of yesterday equals "past" then assert yesterday is disabled
87. If the 3rd day from today is enabled then assert the data-special of the 3rd day from today equals "3rd-from-today"
88. If yesterday is disabled then assert the data-date-state of yesterday equals "past"

89. **[N]** If the 3rd day from today is enabled then assert the data-date-state of the 3rd day from today equals "past"
90. **[N]** If yesterday is disabled then assert yesterday is enabled
91. **[N]** If the data-date-state of yesterday equals "past" then assert yesterday is enabled

#### Calendar + Cross-Element If/Else

92. If the 3rd day from today is enabled then assert the "Submit Order" button is enabled
93. If yesterday is disabled then assert the "Authorize Payment" button is disabled
94. **[N]** If the 3rd day from today is enabled then assert the "Authorize Payment" button is enabled
95. **[N]** If yesterday is disabled then assert the "Submit Order" button is disabled

#### Nested If on Calendar

96. If today is enabled then if tomorrow is enabled then assert the 3rd day from today is enabled
97. **[N]** If today is enabled then if yesterday is enabled then assert tomorrow is enabled

#### Weekend Edge Cases

98. Assert the next Saturday in the booking calendar has data-weekend equal to "true"
99. If the next Saturday is in the future then assert the next Saturday in the booking calendar is enabled
100. If the data-weekend of the next Saturday equals "true" then assert the next Saturday has data-date-state equal to "future"

#### Month Boundary Edge Cases

101. Assert the data-month-boundary of the 1st of the current month equals "first"
102. Assert the data-month-boundary of the last day of the current month equals "last"
103. If the 1st of the current month is in the past then assert the 1st is disabled
104. If the last day of the current month is in the future then assert the last day is enabled

---

## Section 18e — Toggle State Capture (`#enabled-disabled-edge-cases`)

> Feature toggle button has data-state="enabled"/"disabled" (custom attr, NOT HTML disabled).
> Quantity stepper has min=0, max=5 with boundary-driven button disabling.

#### Before Toggle

105. Assert the "Notifications: ON" button is enabled
106. Assert the data-state of the "Notifications: ON" button equals "enabled"
107. Assert the notification preferences panel is visible
108. Assert the data-visible of the notification preferences panel equals "true"
109. **[N]** Assert the "Notifications: ON" button is disabled

110. If the data-state of the "Notifications: ON" button equals "enabled" then assert the notification preferences panel is visible

#### After Toggle Click

111. Click the "Notifications: ON" button
112. Assert the "Notifications: OFF" button is enabled
113. Assert the data-state of the "Notifications: OFF" button equals "disabled"
114. Assert the notification preferences panel is not visible
115. Assert the data-visible of the notification preferences panel equals "false"
116. Assert the data-toggle-count of the notifications button equals "1"

117. **[N]** Assert the "Notifications: OFF" button is disabled
118. If the data-state of the "Notifications: OFF" button equals "disabled" then assert the "Notifications: OFF" button is enabled
119. **[N]** If the data-state of the "Notifications: OFF" button equals "disabled" then assert the "Notifications: OFF" button is disabled

#### Quantity Stepper Boundaries

120. Assert the minus button is enabled
121. Assert the plus button is enabled
122. Assert the quantity input has a readonly attribute
123. Assert the value of the quantity input equals "1"
124. **[N]** Assert the quantity input is disabled

125. Click the minus button
126. Assert the value of the quantity input equals "0"
127. Assert the minus button is disabled
128. Assert the plus button is enabled
129. **[N]** Assert the minus button is enabled

130. If the value of the quantity input equals "0" then assert the minus button is disabled
131. If the minus button is disabled then assert the plus button is enabled
132. **[N]** If the value of the quantity input equals "0" then assert the minus button is enabled

---

## Section 18f — Ambiguous State Patterns (`#enabled-disabled-edge-cases`)

> Elements that look disabled but aren't (CSS tricks), or look enabled but are disabled.
> Custom attrs like data-disabled, and boolean attribute traps.

#### CSS Fake Disabled vs Real Disabled

133. Assert the "Generate Report" button is enabled
134. Assert the "Generate Report" button does not have a disabled attribute
135. **[N]** Assert the "Generate Report" button is disabled

136. Assert the "Submit Application" button is disabled
137. Assert the "Submit Application" button has a disabled attribute
138. **[N]** Assert the "Submit Application" button is enabled

139. If the "Generate Report" button is enabled then assert the "Submit Application" button is disabled
140. **[N]** If the "Generate Report" button is disabled then assert the "Submit Application" button is enabled

#### data-disabled vs disabled

141. Assert the "Archive Project" button is enabled
142. Assert the data-disabled of the "Archive Project" button equals "true"
143. Assert the "Archive Project" button does not have a disabled attribute
144. **[N]** Assert the "Archive Project" button is disabled

145. If the data-disabled of the "Archive Project" button equals "true" then assert the "Archive Project" button is enabled
146. **[N]** If the data-disabled of the "Archive Project" button equals "true" then assert the "Archive Project" button is disabled

#### disabled="" vs disabled="false" — Boolean Attribute Trap

147. Assert the "Paused Task" button is disabled
148. Assert the "Flagged Item" button is disabled
149. **[N]** Assert the "Flagged Item" button is enabled
150. **[N]** Assert the "Paused Task" button is enabled

151. If the "Flagged Item" button is disabled then assert the "Paused Task" button is disabled
152. **[N]** If the "Flagged Item" button is enabled then assert the "Paused Task" button is enabled

---

## Airbnb-Style Calendar Prompts (Dynamic Dates)

> Simulates the Airbnb calendar pattern using the Section 18d booking calendar.
> Natural language date references: "3rd day from today", "1 day before today", etc.

153. Assert the 3rd day from today is enabled
154. Assert the 6th day from today is enabled
155. Assert 1 day before today is disabled
156. Assert the 3rd day from today has data-date-state equal to "future"
157. Assert 1 day before today has data-date-state equal to "past"

158. **[N]** Assert the 3rd day from today is disabled
159. **[N]** Assert 1 day before today is enabled
160. **[N]** Assert the 3rd day from today has data-date-state equal to "past"
161. **[N]** Assert 1 day before today has data-date-state equal to "future"

162. If the 3rd day from today is enabled then assert the 7th day from today is enabled
163. If 1 day before today is disabled then assert 2 days before today is disabled
164. **[N]** If the 3rd day from today is enabled then assert 1 day before today is enabled
165. **[N]** If 1 day before today is disabled then assert the 3rd day from today is disabled

166. If today is enabled then if the 3rd day from today is enabled then assert the 7th day from today is enabled
167. **[N]** If today is enabled then if 1 day before today is enabled then assert tomorrow is enabled

---

## Summary — 167 steps

| Category | Example Format | Steps |
|----------|---------------|------:|
| Readonly vs Disabled | `Assert the "INV-2026-7734" input is enabled` | ~27 |
| Conditional Enable Chain | `If the "Verify Identity" button is enabled then assert the "Approve Order" button is disabled` | ~26 |
| Inherited Disabled | `Assert the "Cancel Payment" button is enabled` | ~13 |
| Calendar Date Logic | `Assert the 3rd day from today is enabled` | ~37 |
| Toggle & Stepper | `Assert the data-state of the "Notifications: ON" button equals "enabled"` | ~28 |
| Ambiguous States | `Assert the "Generate Report" button is enabled` | ~20 |
| Airbnb Calendar | `Assert the 3rd day from today is enabled` | ~15 |
| Negative **[N]** (included above) | Expected to FAIL | ~45 |
| **Total** | | **167** |

---

## LLM Trap Categories

| Trap | What It Tests | Steps |
|------|--------------|-------|
| Readonly ≠ Disabled | Readonly input asserted as disabled | 2-28 |
| Boolean attr semantics | `disabled=""` and `disabled="false"` both = disabled | 147-152 |
| aria-disabled ≠ disabled | Semantic vs functional disabled | 62-67 |
| data-disabled ≠ disabled | Custom attr vs HTML attr | 141-146 |
| data-state="disabled" ≠ disabled | Custom toggle state vs DOM property | 105-119 |
| CSS appearance ≠ DOM state | Looks disabled but isn't (and vice versa) | 133-140 |
| Inherited disabled (fieldset) | Children disabled, outside sibling enabled | 55-61 |
| Sequential enable chain | Click Step 1 → enables Step 2, not Step 3 | 29-54 |
| Nested if conditions | `If A then if B then assert C` | 96-97, 166-167 |
| Dead branch detection | False condition → branch must not execute | 23-24, 26, 60, 67, 97 |
| Calendar past/future | Past=disabled, future=enabled, today=enabled | 68-104, 153-167 |
| Min/max boundary | Stepper disables buttons at 0 and 5 | 120-132 |
