# Enabled/Disabled Edge Cases — Variables, If/Else & Calendar

> LLM prompt accuracy test steps for enabled/disabled state assertions.
> Uses **variable storage**, **if/else branching**, **calendar date logic**, and **ambiguous states**.
> Steps marked **[N]** are **negative cases** — assertions expected to FAIL.
> Steps marked **[TRAP]** highlight the specific LLM confusion being tested.
>
> **Variable syntax:** `Read X → {{var}}` stores a value, `Assert {{var}} equals "Y"` uses it.
> **If/Else syntax:** `If X then assert Y` — branch only executes if condition is true.

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

### Variable Storage: Read State → Assert

2. Read the disabled state of the "INV-2026-7734" input → {{inv_disabled}}
3. Assert {{inv_disabled}} equals "false"
   > **[TRAP]** Input is readonly, NOT disabled. LLM must not conflate readonly with disabled.

4. Read the readonly attribute of the "INV-2026-7734" input → {{inv_readonly}}
5. Assert {{inv_readonly}} equals "true"

6. Read the disabled state of the "CLOSED-ACC-001" input → {{closed_disabled}}
7. Assert {{closed_disabled}} equals "true"

8. Read the readonly attribute of the "CLOSED-ACC-001" input → {{closed_readonly}}
9. Assert {{closed_readonly}} equals "false"
   > **[TRAP]** Disabled input has no readonly attribute. LLM must check correct attribute.

10. Read the disabled state of the "ARCHIVED-2024" input → {{archived_disabled}}
11. Read the readonly attribute of the "ARCHIVED-2024" input → {{archived_readonly}}
12. Assert {{archived_disabled}} equals "true"
13. Assert {{archived_readonly}} equals "true"
    > **[TRAP]** Both attributes present — rare combo. LLM must report both correctly.

14. Read the disabled state of the "Edit me freely" input → {{editable_disabled}}
15. Read the readonly attribute of the "Edit me freely" input → {{editable_readonly}}
16. Assert {{editable_disabled}} equals "false"
17. Assert {{editable_readonly}} equals "false"

### If/Else: Readonly vs Disabled Cross-Assertions

18. If the "INV-2026-7734" input is enabled then assert the "INV-2026-7734" input has a readonly attribute
    > PASS — readonly inputs ARE enabled. Tests that LLM understands readonly ≠ disabled.

19. **[N]** If the "INV-2026-7734" input is disabled then assert the "INV-2026-7734" input has a readonly attribute
    > Condition is FALSE (it's readonly, not disabled) → branch should NOT execute.

20. If the "CLOSED-ACC-001" input is disabled then assert the "CLOSED-ACC-001" input does not have a readonly attribute
    > PASS — it's disabled, and has no readonly.

21. **[N]** If the "CLOSED-ACC-001" input is enabled then assert the "CLOSED-ACC-001" input has a readonly attribute
    > Condition is FALSE (it IS disabled) → branch should NOT execute.

### Variable Comparison Across Elements

22. Read the disabled state of the "INV-2026-7734" input → {{ro_input_disabled}}
23. Read the disabled state of the "CLOSED-ACC-001" input → {{dis_input_disabled}}
24. If {{ro_input_disabled}} equals "false" then assert {{dis_input_disabled}} equals "true"
    > PASS — readonly is not disabled, closed-acc IS disabled. Cross-variable conditional.

25. **[N]** If {{ro_input_disabled}} equals "true" then assert {{dis_input_disabled}} equals "true"
    > Condition is FALSE (readonly input is not disabled) → branch should NOT execute.

---

## Section 18b — Conditional Enable Chain (`#enabled-disabled-edge-cases`)

### Initial State Assertions (Before Any Clicks)

26. Assert the "Verify Identity" button is enabled
27. Assert the "Approve Order" button is disabled
28. Assert the "Ship Order" button is disabled

29. Read the data-chain-state of the "Verify Identity" button → {{step1_state}}
30. Assert {{step1_state}} equals "ready"

31. Read the data-chain-state of the "Approve Order" button → {{step2_state}}
32. Assert {{step2_state}} equals "blocked"

33. Read the data-chain-state of the "Ship Order" button → {{step3_state}}
34. Assert {{step3_state}} equals "blocked"

### If/Else: Chain State Logic

35. If the "Verify Identity" button is enabled then assert the "Approve Order" button is disabled
    > PASS — Step 1 enabled means Step 2 is still blocked.

36. If the "Approve Order" button is disabled then assert the "Ship Order" button is disabled
    > PASS — Step 2 blocked means Step 3 must also be blocked.

37. **[N]** If the "Verify Identity" button is enabled then assert the "Ship Order" button is enabled
    > Condition TRUE but assertion FAILS — Step 3 can't be enabled before Step 2.

38. **[N]** If the "Approve Order" button is disabled then assert the "Verify Identity" button is disabled
    > Condition TRUE but assertion FAILS — Step 1 is enabled (it's the starting point).

### After Step 1 Click — State Changes

39. Click the "Verify Identity" button
40. Assert the "Verify Identity" button is disabled
41. Assert the "Approve Order" button is enabled
42. Assert the "Ship Order" button is disabled

43. Read the data-chain-state of the "Verify Identity" button → {{step1_after}}
44. Assert {{step1_after}} equals "done"

45. Read the data-chain-state of the "Approve Order" button → {{step2_after}}
46. Assert {{step2_after}} equals "ready"

47. If {{step1_after}} equals "done" then assert the "Approve Order" button is enabled
    > PASS — Step 1 done enables Step 2.

48. **[N]** If {{step1_after}} equals "done" then assert the "Ship Order" button is enabled
    > Condition TRUE but assertion FAILS — Step 3 still blocked until Step 2 done.

### After Step 2 Click

49. Click the "Approve Order" button
50. Assert the "Verify Identity" button is disabled
51. Assert the "Approve Order" button is disabled
52. Assert the "Ship Order" button is enabled

53. Read the data-chain-state of the "Ship Order" button → {{step3_final}}
54. Assert {{step3_final}} equals "ready"

55. If {{step3_final}} equals "ready" then assert the "Approve Order" button is disabled
    > PASS — Step 2 is done, Step 3 is the only active step.

---

## Section 18c — Inherited Disabled (`#enabled-disabled-edge-cases`)

### Fieldset Inheritance

56. Assert the "4111-XXXX-XXXX" input is disabled
57. Assert the "Process Payment" button is disabled
58. Assert the "Cancel Payment" button is enabled
    > **[TRAP]** "Cancel Payment" is OUTSIDE the disabled fieldset. LLM must check DOM hierarchy.

59. Read the disabled state of the "4111-XXXX-XXXX" input → {{card_disabled}}
60. Read the disabled state of the "Cancel Payment" button → {{cancel_disabled}}
61. Assert {{card_disabled}} equals "true"
62. Assert {{cancel_disabled}} equals "false"

63. If the "4111-XXXX-XXXX" input is disabled then assert the "Cancel Payment" button is enabled
    > PASS — fieldset disabled doesn't affect elements outside it.

64. **[N]** If the "4111-XXXX-XXXX" input is disabled then assert the "Cancel Payment" button is disabled
    > Condition TRUE but assertion FAILS — Cancel is outside the fieldset.

### Aria-Disabled vs Disabled

65. Assert the "View Report" button is enabled
    > **[TRAP]** It has aria-disabled="true" but NO disabled attribute. DOM-wise it's enabled.

66. Read the aria-disabled attribute of the "View Report" button → {{report_aria_disabled}}
67. Assert {{report_aria_disabled}} equals "true"

68. Read the disabled state of the "View Report" button → {{report_disabled}}
69. Assert {{report_disabled}} equals "false"
    > **[TRAP]** aria-disabled ≠ disabled. LLM must distinguish.

70. If the "View Report" button is enabled then assert the aria-disabled of the "View Report" button equals "true"
    > PASS — enabled in DOM but semantically disabled for assistive tech.

71. **[N]** If the aria-disabled of the "View Report" button equals "true" then assert the "View Report" button is disabled
    > Condition TRUE but assertion FAILS — aria-disabled doesn't make it functionally disabled.

---

## Section 18d — Calendar Date Edge Cases (`#enabled-disabled-edge-cases`)

> Calendar generates dates dynamically. Today's date determines which dates are past/future.
> All assertions use relative date references ("3rd day from today", "yesterday", etc.).

### Basic Date State Variables

72. Read the enabled state of today's date in the booking calendar → {{today_enabled}}
73. Assert {{today_enabled}} equals "true"

74. Read the data-date-state of today's date in the booking calendar → {{today_state}}
75. Assert {{today_state}} equals "today"

76. Read the enabled state of yesterday's date in the booking calendar → {{yesterday_enabled}}
77. Assert {{yesterday_enabled}} equals "false"
    > Yesterday is past → disabled.

78. Read the data-date-state of yesterday's date in the booking calendar → {{yesterday_state}}
79. Assert {{yesterday_state}} equals "past"

80. Read the enabled state of tomorrow's date in the booking calendar → {{tomorrow_enabled}}
81. Assert {{tomorrow_enabled}} equals "true"

82. Read the data-date-state of tomorrow's date in the booking calendar → {{tomorrow_state}}
83. Assert {{tomorrow_state}} equals "future"

### Nth Day From Today — Variable Read

84. Read the enabled state of the 3rd day from today in the booking calendar → {{third_day_enabled}}
85. Assert {{third_day_enabled}} equals "true"
    > 3rd day from today is always future → enabled.

86. Read the data-special attribute of the 3rd day from today → {{third_day_special}}
87. Assert {{third_day_special}} equals "3rd-from-today"

88. Read the enabled state of the 7th day from today in the booking calendar → {{seventh_day_enabled}}
89. Assert {{seventh_day_enabled}} equals "true"

90. Read the data-special attribute of the 7th day from today → {{seventh_day_special}}
91. Assert {{seventh_day_special}} equals "7th-from-today"

### Negative: Wrong Assertions on Dates

92. **[N]** Read the enabled state of the 3rd day from today → {{third_day_neg}}
93. **[N]** Assert {{third_day_neg}} equals "false"
    > FAIL — 3rd day from today is always enabled (future date).

94. **[N]** Read the enabled state of yesterday → {{yesterday_neg}}
95. **[N]** Assert {{yesterday_neg}} equals "true"
    > FAIL — yesterday is always disabled (past date).

96. **[N]** Assert the data-date-state of yesterday equals "future"
    > FAIL — yesterday is "past", not "future".

### If/Else: Date State Drives Assertion

97. If the data-date-state of today's date equals "today" then assert today's date is enabled
    > PASS — today is enabled.

98. If the data-date-state of yesterday's date equals "past" then assert yesterday is disabled
    > PASS — past dates are disabled.

99. If the 3rd day from today is enabled then assert the data-special of the 3rd day from today equals "3rd-from-today"
    > PASS — 3rd day is enabled and has special marker.

100. **[N]** If the 3rd day from today is enabled then assert the data-date-state of the 3rd day from today equals "past"
     > Condition TRUE but assertion FAILS — it's "future", not "past".

101. If yesterday is disabled then assert the data-date-state of yesterday equals "past"
     > PASS — disabled because it's past.

102. **[N]** If yesterday is disabled then assert yesterday is enabled
     > Condition TRUE but assertion FAILS — contradicts the condition itself. LLM logic trap.

### Calendar Variables + Cross-Element If/Else

103. Read the enabled state of the 3rd day from today → {{cal_3rd}}
104. If {{cal_3rd}} equals "true" then assert the "Submit Order" button is enabled
     > PASS — both are true (different elements, same state).

105. Read the disabled state of yesterday → {{cal_yesterday_dis}}
106. If {{cal_yesterday_dis}} equals "true" then assert the "Authorize Payment" button is disabled
     > PASS — cross-element: calendar past date disabled, Authorize Payment also disabled.

107. **[N]** If {{cal_3rd}} equals "true" then assert the "Authorize Payment" button is enabled
     > Condition TRUE but assertion FAILS — Authorize Payment is disabled regardless of calendar.

### Weekend Edge Cases

108. Read the data-weekend attribute of the next Saturday in the booking calendar → {{sat_weekend}}
109. Assert {{sat_weekend}} equals "true"

110. If the next Saturday is in the future then assert the next Saturday is enabled
     > PASS — weekends in the future are still enabled (no weekend-blocking rule).

111. If the data-weekend of the next Saturday equals "true" then assert the next Saturday has data-date-state equal to "future"
     > PASS (if Saturday is in the future).

### Month Boundary Edge Cases

112. Read the data-month-boundary of the 1st of the current month → {{first_day_boundary}}
113. Assert {{first_day_boundary}} equals "first"

114. Read the data-month-boundary of the last day of the current month → {{last_day_boundary}}
115. Assert {{last_day_boundary}} equals "last"

116. If the 1st of the current month is in the past then assert the 1st of the current month is disabled
     > Conditional — depends on today's date. If today > 1st, this PASSES.

117. If the last day of the current month is in the future then assert the last day of the current month is enabled
     > Conditional — depends on today's date. Usually PASSES (unless it's the last day).

---

## Section 18e — Toggle State Capture (`#enabled-disabled-edge-cases`)

### Before Toggle

118. Read the data-state of the "Notifications: ON" button → {{notif_state}}
119. Assert {{notif_state}} equals "enabled"
     > **[TRAP]** data-state="enabled" is a CUSTOM attribute, not the HTML disabled property.

120. Assert the "Notifications: ON" button is enabled
     > PASS — the button itself is enabled (clickable). data-state is separate.

121. Read the data-visible of the notification preferences panel → {{panel_visible}}
122. Assert {{panel_visible}} equals "true"

123. If {{notif_state}} equals "enabled" then assert {{panel_visible}} equals "true"
     > PASS — when notifications ON, panel is visible.

### After Toggle Click

124. Click the "Notifications: ON" button
125. Read the data-state of the "Notifications: OFF" button → {{notif_state_after}}
126. Assert {{notif_state_after}} equals "disabled"
     > **[TRAP]** data-state changed to "disabled" but the BUTTON is still enabled (clickable). LLM must not confuse custom attr with DOM state.

127. Assert the "Notifications: OFF" button is enabled
     > PASS — button remains clickable even though data-state="disabled".

128. Read the data-visible of the notification preferences panel → {{panel_visible_after}}
129. Assert {{panel_visible_after}} equals "false"

130. If {{notif_state_after}} equals "disabled" then assert {{panel_visible_after}} equals "false"
     > PASS — when notifications OFF, panel is hidden.

131. **[N]** If {{notif_state_after}} equals "disabled" then assert the "Notifications: OFF" button is disabled
     > Condition TRUE but assertion FAILS — data-state="disabled" ≠ HTML disabled attribute.

132. Read the data-toggle-count of the notifications button → {{toggle_count}}
133. Assert {{toggle_count}} equals "1"

### Quantity Stepper Boundaries

134. Read the enabled state of the minus button → {{minus_enabled}}
135. Read the enabled state of the plus button → {{plus_enabled}}
136. Assert {{minus_enabled}} equals "true"
137. Assert {{plus_enabled}} equals "true"
     > At qty=1, both buttons are enabled.

138. Read the value of the quantity input → {{qty_value}}
139. Assert {{qty_value}} equals "1"

140. Assert the quantity input has a readonly attribute
     > **[TRAP]** The input is readonly (not disabled). LLM must check readonly, not disabled.

141. **[N]** Assert the quantity input is disabled
     > FAIL — it's readonly, not disabled.

142. Click the minus button
143. Read the value of the quantity input → {{qty_after_minus}}
144. Assert {{qty_after_minus}} equals "0"

145. Assert the minus button is disabled
     > At qty=0, minus is disabled (reached min).

146. Assert the plus button is enabled
     > Plus is still enabled at qty=0.

147. If {{qty_after_minus}} equals "0" then assert the minus button is disabled
     > PASS — at minimum, minus is disabled.

148. **[N]** If {{qty_after_minus}} equals "0" then assert the minus button is enabled
     > Condition TRUE but assertion FAILS — at min, minus is disabled.

---

## Section 18f — Ambiguous State Patterns (`#enabled-disabled-edge-cases`)

### CSS Fake Disabled vs Real Disabled

149. Assert the "Generate Report" button is enabled
     > **[TRAP]** Looks disabled (opacity 0.4, cursor not-allowed) but has NO disabled attribute.

150. Read the disabled state of the "Generate Report" button → {{gen_report_disabled}}
151. Assert {{gen_report_disabled}} equals "false"

152. Assert the "Submit Application" button is disabled
     > **[TRAP]** Looks enabled (opacity 1, accent color, cursor pointer) but HAS disabled attribute.

153. Read the disabled state of the "Submit Application" button → {{submit_app_disabled}}
154. Assert {{submit_app_disabled}} equals "true"

155. If the "Generate Report" button is enabled then assert the "Submit Application" button is disabled
     > PASS — CSS appearance is irrelevant to DOM state.

156. **[N]** If the "Generate Report" button is disabled then assert the "Submit Application" button is enabled
     > Condition FALSE — Generate Report IS enabled despite looking disabled.

### data-disabled vs disabled

157. Assert the "Archive Project" button is enabled
     > **[TRAP]** Has data-disabled="true" but NO disabled attribute. Functionally enabled.

158. Read the data-disabled of the "Archive Project" button → {{archive_data_disabled}}
159. Assert {{archive_data_disabled}} equals "true"

160. Read the disabled state of the "Archive Project" button → {{archive_disabled}}
161. Assert {{archive_disabled}} equals "false"

162. If {{archive_data_disabled}} equals "true" then assert the "Archive Project" button is enabled
     > PASS — data-disabled is custom, doesn't affect DOM enabled state.

163. **[N]** If {{archive_data_disabled}} equals "true" then assert the "Archive Project" button is disabled
     > Condition TRUE but assertion FAILS — data-disabled ≠ disabled.

### disabled="" vs disabled="false" — Boolean Attribute Trap

164. Assert the "Paused Task" button is disabled
     > disabled="" → disabled (boolean attribute, presence = true).

165. Assert the "Flagged Item" button is disabled
     > **[TRAP]** disabled="false" → STILL disabled! Boolean attribute ignores value.

166. Read the disabled state of the "Flagged Item" button → {{flagged_disabled}}
167. Assert {{flagged_disabled}} equals "true"
     > **[TRAP]** LLM might think disabled="false" means enabled. It doesn't.

168. **[N]** Assert the "Flagged Item" button is enabled
     > FAIL — disabled="false" still means disabled in HTML.

169. If the "Flagged Item" button is disabled then assert the "Paused Task" button is disabled
     > PASS — both are disabled (boolean attr present on both).

170. **[N]** If the "Flagged Item" button is enabled then assert the "Paused Task" button is enabled
     > Condition FALSE (Flagged IS disabled) → branch should NOT execute.

---

## Airbnb-Style Calendar Prompts (Dynamic Dates)

> These steps simulate the Airbnb calendar pattern: "Check if Nth date is enabled".
> They use the booking calendar in Section 18d.

171. Check if the 3rd day from today is enabled → {{third_from_today_enabled}}
172. Assert {{third_from_today_enabled}} equals "true"

173. Check if the 6th day from today is enabled → {{sixth_from_today_enabled}}
174. Assert {{sixth_from_today_enabled}} equals "true"
     > Future date → always enabled.

175. Read the enabled state of 1 day before today → {{one_before_enabled}}
176. Assert {{one_before_enabled}} equals "false"
     > Past date → disabled.

177. Read the disabled state of 1 day before today → {{one_before_disabled}}
178. Assert {{one_before_disabled}} equals "true"

179. **[N]** Read the enabled state of 3rd day from today → {{third_neg}}
180. **[N]** Assert {{third_neg}} equals "false"
     > FAIL — 3rd day from today is future → enabled.

181. **[N]** Read the disabled state of 1 day before today → {{one_before_neg}}
182. **[N]** Assert {{one_before_neg}} equals "false"
     > FAIL — yesterday is past → disabled is true.

183. If the 3rd day from today is enabled then assert the 7th day from today is enabled
     > PASS — both are future dates.

184. **[N]** If the 3rd day from today is enabled then assert yesterday is enabled
     > Condition TRUE but assertion FAILS — yesterday is past.

185. Read the data-date-state of the 3rd day from today → {{third_state}}
186. If {{third_state}} equals "future" then assert the 3rd day from today is enabled
     > PASS — future dates are enabled.

187. Read the data-date-state of yesterday → {{yest_state}}
188. If {{yest_state}} equals "past" then assert yesterday is disabled
     > PASS — past dates are disabled.

189. **[N]** If {{yest_state}} equals "past" then assert yesterday is enabled
     > Condition TRUE but assertion FAILS — past = disabled.

190. If today is enabled then if tomorrow is enabled then assert the 3rd day from today is enabled
     > Nested if: all conditions TRUE, all assertions TRUE → PASS.

191. **[N]** If today is enabled then if yesterday is enabled then assert tomorrow is enabled
     > Nested if: outer TRUE, inner FALSE (yesterday disabled) → branch should NOT execute.

---

## Summary — 191 steps

| Category | Example Format | Steps |
|----------|---------------|------:|
| Readonly vs Disabled | `Read disabled state → {{var}}, Assert {{var}} equals "false"` | ~25 |
| Conditional Enable Chain | `If Step 1 done then assert Step 2 enabled` | ~30 |
| Inherited Disabled | `Assert fieldset child is disabled, Assert outside button is enabled` | ~16 |
| Calendar Date Logic | `Read enabled state of 3rd day from today → {{var}}` | ~30 |
| Toggle State Capture | `Read data-state → {{var}}, Assert button is still enabled` | ~16 |
| Ambiguous States | `CSS fake disabled, data-disabled, disabled="false"` | ~22 |
| Airbnb-Style Calendar | `Check if Nth day from today is enabled → {{var}}` | ~21 |
| Negative **[N]** (included above) | Expected to FAIL | ~35 |
| **Total** | | **191** |

---

## LLM Trap Categories

| Trap | What It Tests | Steps |
|------|--------------|-------|
| Readonly ≠ Disabled | Most common LLM confusion | 2-25 |
| Boolean attr semantics | `disabled=""` and `disabled="false"` both = disabled | 164-170 |
| aria-disabled ≠ disabled | Semantic vs functional disabled | 65-71 |
| data-disabled ≠ disabled | Custom attr vs HTML attr | 157-163 |
| data-state="disabled" ≠ disabled | Custom state attr vs DOM property | 118-133 |
| CSS appearance ≠ DOM state | Opacity/cursor don't affect enabled state | 149-156 |
| Inherited disabled (fieldset) | Children disabled, siblings not | 56-64 |
| Variable-driven branching | If {{var}} equals "X" then assert Y | 24-25, 47-48, 103-107 |
| Nested if conditions | If A then if B then assert C | 190-191 |
| Dead branch detection | False condition → branch must not execute | 19, 21, 25, 156, 170 |
| Calendar date state | Past=disabled, future=enabled, today=enabled | 72-117 |
| Contradictory assertions | Same element, opposite assertions | 92-96, 102 |
