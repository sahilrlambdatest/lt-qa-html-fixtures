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
> - Variables: `Check if the "X" button is enabled → {{var_name}}` / `Assert {{var_name}} equals "true"`
> - Calendar dates: `Check if the 3rd day from today is enabled → {{var_name}}`

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

#### Readonly vs Disabled — Direct Assertions

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

#### Readonly vs Disabled — Variable Steps

21. Check if the "INV-2026-7734" input is enabled → {{inv_enabled}}
22. Assert {{inv_enabled}} equals "true"
23. Check if the "INV-2026-7734" input is disabled → {{inv_disabled}}
24. Assert {{inv_disabled}} equals "false"
25. **[N]** Assert {{inv_disabled}} equals "true"

26. Check if the "CLOSED-ACC-001" input is enabled → {{closed_enabled}}
27. Assert {{closed_enabled}} equals "false"
28. Check if the "CLOSED-ACC-001" input is disabled → {{closed_disabled}}
29. Assert {{closed_disabled}} equals "true"
30. **[N]** Assert {{closed_enabled}} equals "true"

31. Check if the "ARCHIVED-2024" input is disabled → {{archived_disabled}}
32. Assert {{archived_disabled}} equals "true"
33. Check if the "ARCHIVED-2024" input has a readonly attribute → {{archived_readonly}}
34. Assert {{archived_readonly}} equals "true"

35. Check if the "Edit me freely" input is disabled → {{editable_disabled}}
36. Assert {{editable_disabled}} equals "false"
37. Check if the "Edit me freely" input has a readonly attribute → {{editable_readonly}}
38. Assert {{editable_readonly}} equals "false"

#### If/Else with Variables: Readonly vs Disabled

39. If {{inv_enabled}} equals "true" then assert the "INV-2026-7734" input has a readonly attribute
40. If {{inv_disabled}} equals "false" then assert the "CLOSED-ACC-001" input is disabled
41. **[N]** If {{inv_disabled}} equals "true" then assert the "CLOSED-ACC-001" input is disabled
42. **[N]** If {{closed_enabled}} equals "true" then assert the "CLOSED-ACC-001" input has a readonly attribute

#### If/Else: Readonly vs Disabled Cross-Assertions

43. If the "INV-2026-7734" input is enabled then assert the "INV-2026-7734" input has a readonly attribute
44. If the "INV-2026-7734" input is enabled then assert the "CLOSED-ACC-001" input is disabled
45. **[N]** If the "INV-2026-7734" input is disabled then assert the "CLOSED-ACC-001" input is disabled
46. **[N]** If the "INV-2026-7734" input is disabled then assert the "INV-2026-7734" input has a readonly attribute

47. If the "CLOSED-ACC-001" input is disabled then assert the "CLOSED-ACC-001" input does not have a readonly attribute
48. **[N]** If the "CLOSED-ACC-001" input is enabled then assert the "CLOSED-ACC-001" input has a readonly attribute

49. If the "ARCHIVED-2024" input is disabled then assert the "ARCHIVED-2024" input has a readonly attribute
50. If the "Edit me freely" input is enabled then assert the "Edit me freely" input does not have a disabled attribute

---

## Section 18b — Conditional Enable Chain (`#enabled-disabled-edge-cases`)

> Order Processing Pipeline: Step 1 (Verify Identity) → Step 2 (Approve Order) → Step 3 (Ship Order)
> Only Step 1 is initially enabled. Each step enables the next when clicked.

#### Initial State — Direct Assertions

51. Assert the "Verify Identity" button is enabled
52. Assert the "Approve Order" button is disabled
53. Assert the "Ship Order" button is disabled
54. Assert the data-chain-state of the "Verify Identity" button equals "ready"
55. Assert the data-chain-state of the "Approve Order" button equals "blocked"
56. Assert the data-chain-state of the "Ship Order" button equals "blocked"

#### Initial State — Variable Steps

57. Check if the "Verify Identity" button is enabled → {{step1_enabled}}
58. Assert {{step1_enabled}} equals "true"
59. Check if the "Approve Order" button is enabled → {{step2_enabled}}
60. Assert {{step2_enabled}} equals "false"
61. Check if the "Ship Order" button is enabled → {{step3_enabled}}
62. Assert {{step3_enabled}} equals "false"
63. **[N]** Assert {{step2_enabled}} equals "true"
64. **[N]** Assert {{step3_enabled}} equals "true"

#### If/Else: Chain State Logic

65. If the "Verify Identity" button is enabled then assert the "Approve Order" button is disabled
66. If the "Approve Order" button is disabled then assert the "Ship Order" button is disabled
67. If {{step1_enabled}} equals "true" then assert the "Approve Order" button is disabled
68. **[N]** If the "Verify Identity" button is enabled then assert the "Ship Order" button is enabled
69. **[N]** If the "Approve Order" button is disabled then assert the "Verify Identity" button is disabled
70. **[N]** If {{step2_enabled}} equals "false" then assert {{step1_enabled}} equals "false"

#### After Step 1 Click — State Changes

71. Click the "Verify Identity" button
72. Assert the "Verify Identity" button is disabled
73. Assert the "Approve Order" button is enabled
74. Assert the "Ship Order" button is disabled
75. Assert the data-chain-state of the "Verify Identity" button equals "done"
76. Assert the data-chain-state of the "Approve Order" button equals "ready"

77. Check if the "Approve Order" button is enabled → {{step2_after_click}}
78. Assert {{step2_after_click}} equals "true"
79. Check if the "Ship Order" button is enabled → {{step3_after_step1}}
80. Assert {{step3_after_step1}} equals "false"
81. **[N]** Assert {{step3_after_step1}} equals "true"

82. If the "Approve Order" button is enabled then assert the "Ship Order" button is disabled
83. If the data-chain-state of the "Verify Identity" button equals "done" then assert the "Approve Order" button is enabled
84. If {{step2_after_click}} equals "true" then assert {{step3_after_step1}} equals "false"
85. **[N]** If the data-chain-state of the "Verify Identity" button equals "done" then assert the "Ship Order" button is enabled

#### After Step 2 Click

86. Click the "Approve Order" button
87. Assert the "Verify Identity" button is disabled
88. Assert the "Approve Order" button is disabled
89. Assert the "Ship Order" button is enabled
90. Assert the data-chain-state of the "Ship Order" button equals "ready"

91. Check if the "Ship Order" button is enabled → {{step3_final}}
92. Assert {{step3_final}} equals "true"

93. If the data-chain-state of the "Ship Order" button equals "ready" then assert the "Approve Order" button is disabled
94. If {{step3_final}} equals "true" then assert the "Approve Order" button is disabled
95. **[N]** If the "Ship Order" button is enabled then assert the "Approve Order" button is enabled

---

## Section 18c — Inherited Disabled (`#enabled-disabled-edge-cases`)

> Fieldset with disabled attribute — children inherit disabled state.
> "Cancel Payment" button is OUTSIDE the fieldset.

#### Fieldset Inheritance — Direct Assertions

96. Assert the "4111-XXXX-XXXX" input is disabled
97. Assert the "Process Payment" button is disabled
98. Assert the "Cancel Payment" button is enabled
99. **[N]** Assert the "Cancel Payment" button is disabled

#### Fieldset Inheritance — Variable Steps

100. Check if the "4111-XXXX-XXXX" input is disabled → {{card_disabled}}
101. Assert {{card_disabled}} equals "true"
102. Check if the "Cancel Payment" button is enabled → {{cancel_enabled}}
103. Assert {{cancel_enabled}} equals "true"
104. **[N]** Assert {{cancel_enabled}} equals "false"

105. If {{card_disabled}} equals "true" then assert {{cancel_enabled}} equals "true"
106. **[N]** If {{card_disabled}} equals "true" then assert {{cancel_enabled}} equals "false"

#### Fieldset Inheritance — If/Else

107. If the "4111-XXXX-XXXX" input is disabled then assert the "Cancel Payment" button is enabled
108. **[N]** If the "4111-XXXX-XXXX" input is disabled then assert the "Cancel Payment" button is disabled
109. If the "Process Payment" button is disabled then assert the "Cancel Payment" button is enabled

#### Aria-Disabled vs Disabled — Direct Assertions

110. Assert the "View Report" button is enabled
111. Assert the aria-disabled of the "View Report" button equals "true"
112. Assert the "View Report" button does not have a disabled attribute
113. **[N]** Assert the "View Report" button is disabled

#### Aria-Disabled vs Disabled — Variable Steps

114. Check if the "View Report" button is enabled → {{report_enabled}}
115. Assert {{report_enabled}} equals "true"
116. Check if the "View Report" button is disabled → {{report_disabled}}
117. Assert {{report_disabled}} equals "false"
118. **[N]** Assert {{report_disabled}} equals "true"

119. If {{report_enabled}} equals "true" then assert the aria-disabled of the "View Report" button equals "true"
120. **[N]** If {{report_disabled}} equals "true" then assert the "View Report" button is disabled

#### Aria-Disabled vs Disabled — If/Else

121. If the "View Report" button is enabled then assert the aria-disabled of the "View Report" button equals "true"
122. **[N]** If the aria-disabled of the "View Report" button equals "true" then assert the "View Report" button is disabled

---

## Section 18d — Calendar Date Edge Cases (`#enabled-disabled-edge-cases`)

> Booking calendar with dynamic dates. Today's date determines past/future.
> Past dates: disabled. Today & future dates: enabled.
> 3rd day from today: has data-special="3rd-from-today".
> 7th day from today: has data-special="7th-from-today".

#### Today, Yesterday, Tomorrow — Direct Assertions

123. Assert today's date in the booking calendar is enabled
124. Assert the data-date-state of today's date in the booking calendar equals "today"
125. Assert yesterday's date in the booking calendar is disabled
126. Assert the data-date-state of yesterday in the booking calendar equals "past"
127. Assert tomorrow's date in the booking calendar is enabled
128. Assert the data-date-state of tomorrow in the booking calendar equals "future"
129. **[N]** Assert yesterday's date in the booking calendar is enabled
130. **[N]** Assert the data-date-state of yesterday in the booking calendar equals "future"
131. **[N]** Assert today's date in the booking calendar is disabled

#### Today, Yesterday, Tomorrow — Variable Steps

132. Check if today's date in the booking calendar is enabled → {{today_enabled}}
133. Assert {{today_enabled}} equals "true"
134. Check if yesterday's date in the booking calendar is enabled → {{yesterday_enabled}}
135. Assert {{yesterday_enabled}} equals "false"
136. **[N]** Assert {{yesterday_enabled}} equals "true"
137. Check if tomorrow's date in the booking calendar is enabled → {{tomorrow_enabled}}
138. Assert {{tomorrow_enabled}} equals "true"
139. **[N]** Assert {{today_enabled}} equals "false"

#### Nth Day From Today — Direct Assertions

140. Assert the 3rd day from today in the booking calendar is enabled
141. Assert the data-special of the 3rd day from today in the booking calendar equals "3rd-from-today"
142. Assert the 7th day from today in the booking calendar is enabled
143. Assert the data-special of the 7th day from today in the booking calendar equals "7th-from-today"
144. **[N]** Assert the 3rd day from today in the booking calendar is disabled
145. **[N]** Assert the data-special of the 3rd day from today equals "7th-from-today"
146. **[N]** Assert the data-date-state of the 3rd day from today equals "past"

#### Nth Day From Today — Variable Steps

147. Check if the 3rd day from today is enabled → {{third_day_enabled}}
148. Assert {{third_day_enabled}} equals "true"
149. **[N]** Assert {{third_day_enabled}} equals "false"
150. Check if the 7th day from today is enabled → {{seventh_day_enabled}}
151. Assert {{seventh_day_enabled}} equals "true"
152. Check if 1 day before today is enabled → {{one_before_enabled}}
153. Assert {{one_before_enabled}} equals "false"
154. **[N]** Assert {{one_before_enabled}} equals "true"
155. Check if 2 days before today is disabled → {{two_before_disabled}}
156. Assert {{two_before_disabled}} equals "true"

#### If/Else with Variables: Calendar

157. If {{third_day_enabled}} equals "true" then assert {{seventh_day_enabled}} equals "true"
158. If {{yesterday_enabled}} equals "false" then assert {{one_before_enabled}} equals "false"
159. If {{today_enabled}} equals "true" then assert {{tomorrow_enabled}} equals "true"
160. **[N]** If {{third_day_enabled}} equals "true" then assert {{one_before_enabled}} equals "true"
161. **[N]** If {{yesterday_enabled}} equals "false" then assert {{third_day_enabled}} equals "false"
162. **[N]** If {{today_enabled}} equals "true" then assert {{yesterday_enabled}} equals "true"

#### If/Else: Date State Drives Assertion

163. If today's date in the booking calendar is enabled then assert tomorrow is enabled
164. If the data-date-state of today's date equals "today" then assert today is enabled
165. If the data-date-state of yesterday equals "past" then assert yesterday is disabled
166. If the 3rd day from today is enabled then assert the data-special of the 3rd day from today equals "3rd-from-today"
167. If yesterday is disabled then assert the data-date-state of yesterday equals "past"

168. **[N]** If the 3rd day from today is enabled then assert the data-date-state of the 3rd day from today equals "past"
169. **[N]** If yesterday is disabled then assert yesterday is enabled
170. **[N]** If the data-date-state of yesterday equals "past" then assert yesterday is enabled

#### Calendar + Cross-Element If/Else

171. If the 3rd day from today is enabled then assert the "Submit Order" button is enabled
172. If yesterday is disabled then assert the "Authorize Payment" button is disabled
173. If {{third_day_enabled}} equals "true" then assert the "Submit Order" button is enabled
174. **[N]** If the 3rd day from today is enabled then assert the "Authorize Payment" button is enabled
175. **[N]** If yesterday is disabled then assert the "Submit Order" button is disabled
176. **[N]** If {{one_before_enabled}} equals "false" then assert the "Submit Order" button is disabled

#### Nested If on Calendar

177. If today is enabled then if tomorrow is enabled then assert the 3rd day from today is enabled
178. If {{today_enabled}} equals "true" then if {{tomorrow_enabled}} equals "true" then assert the 3rd day from today is enabled
179. **[N]** If today is enabled then if yesterday is enabled then assert tomorrow is enabled
180. **[N]** If {{today_enabled}} equals "true" then if {{yesterday_enabled}} equals "true" then assert tomorrow is enabled

#### Weekend Edge Cases

181. Assert the next Saturday in the booking calendar has data-weekend equal to "true"
182. Check if the next Saturday is enabled → {{saturday_enabled}}
183. If the next Saturday is in the future then assert the next Saturday in the booking calendar is enabled
184. If the data-weekend of the next Saturday equals "true" then assert the next Saturday has data-date-state equal to "future"

#### Month Boundary Edge Cases

185. Assert the data-month-boundary of the 1st of the current month equals "first"
186. Assert the data-month-boundary of the last day of the current month equals "last"
187. If the 1st of the current month is in the past then assert the 1st is disabled
188. If the last day of the current month is in the future then assert the last day is enabled

---

## Section 18e — Toggle State Capture (`#enabled-disabled-edge-cases`)

> Feature toggle button has data-state="enabled"/"disabled" (custom attr, NOT HTML disabled).
> Quantity stepper has min=0, max=5 with boundary-driven button disabling.

#### Before Toggle — Direct Assertions

189. Assert the "Notifications: ON" button is enabled
190. Assert the data-state of the "Notifications: ON" button equals "enabled"
191. Assert the notification preferences panel is visible
192. Assert the data-visible of the notification preferences panel equals "true"
193. **[N]** Assert the "Notifications: ON" button is disabled

#### Before Toggle — Variable Steps

194. Check if the "Notifications: ON" button is enabled → {{notif_btn_enabled}}
195. Assert {{notif_btn_enabled}} equals "true"
196. Check the data-state of the "Notifications: ON" button → {{notif_data_state}}
197. Assert {{notif_data_state}} equals "enabled"
198. **[N]** Assert {{notif_btn_enabled}} equals "false"

199. If {{notif_data_state}} equals "enabled" then assert the notification preferences panel is visible
200. If the data-state of the "Notifications: ON" button equals "enabled" then assert the notification preferences panel is visible

#### After Toggle Click

201. Click the "Notifications: ON" button
202. Assert the "Notifications: OFF" button is enabled
203. Assert the data-state of the "Notifications: OFF" button equals "disabled"
204. Assert the notification preferences panel is not visible
205. Assert the data-visible of the notification preferences panel equals "false"
206. Assert the data-toggle-count of the notifications button equals "1"

207. Check if the "Notifications: OFF" button is enabled → {{notif_off_enabled}}
208. Assert {{notif_off_enabled}} equals "true"
209. Check the data-state of the "Notifications: OFF" button → {{notif_off_data_state}}
210. Assert {{notif_off_data_state}} equals "disabled"

211. **[N]** Assert the "Notifications: OFF" button is disabled
212. **[N]** Assert {{notif_off_enabled}} equals "false"

213. If {{notif_off_data_state}} equals "disabled" then assert {{notif_off_enabled}} equals "true"
214. If the data-state of the "Notifications: OFF" button equals "disabled" then assert the "Notifications: OFF" button is enabled
215. **[N]** If the data-state of the "Notifications: OFF" button equals "disabled" then assert the "Notifications: OFF" button is disabled
216. **[N]** If {{notif_off_data_state}} equals "disabled" then assert {{notif_off_enabled}} equals "false"

#### Quantity Stepper — Direct Assertions

217. Assert the minus button is enabled
218. Assert the plus button is enabled
219. Assert the quantity input has a readonly attribute
220. Assert the value of the quantity input equals "1"
221. **[N]** Assert the quantity input is disabled

#### Quantity Stepper — Variable Steps

222. Check if the minus button is enabled → {{minus_enabled}}
223. Assert {{minus_enabled}} equals "true"
224. Check if the plus button is enabled → {{plus_enabled}}
225. Assert {{plus_enabled}} equals "true"
226. Check if the quantity input is disabled → {{qty_disabled}}
227. Assert {{qty_disabled}} equals "false"
228. Check if the quantity input has a readonly attribute → {{qty_readonly}}
229. Assert {{qty_readonly}} equals "true"

#### Quantity Stepper — After Click to Min

230. Click the minus button
231. Assert the value of the quantity input equals "0"
232. Assert the minus button is disabled
233. Assert the plus button is enabled
234. **[N]** Assert the minus button is enabled

235. Check if the minus button is enabled → {{minus_at_zero}}
236. Assert {{minus_at_zero}} equals "false"
237. Check if the plus button is enabled → {{plus_at_zero}}
238. Assert {{plus_at_zero}} equals "true"
239. **[N]** Assert {{minus_at_zero}} equals "true"

240. If the value of the quantity input equals "0" then assert the minus button is disabled
241. If {{minus_at_zero}} equals "false" then assert {{plus_at_zero}} equals "true"
242. If the minus button is disabled then assert the plus button is enabled
243. **[N]** If the value of the quantity input equals "0" then assert the minus button is enabled
244. **[N]** If {{minus_at_zero}} equals "false" then assert {{plus_at_zero}} equals "false"

---

## Section 18f — Ambiguous State Patterns (`#enabled-disabled-edge-cases`)

> Elements that look disabled but aren't (CSS tricks), or look enabled but are disabled.
> Custom attrs like data-disabled, and boolean attribute traps.

#### CSS Fake Disabled vs Real Disabled — Direct Assertions

245. Assert the "Generate Report" button is enabled
246. Assert the "Generate Report" button does not have a disabled attribute
247. **[N]** Assert the "Generate Report" button is disabled

248. Assert the "Submit Application" button is disabled
249. Assert the "Submit Application" button has a disabled attribute
250. **[N]** Assert the "Submit Application" button is enabled

#### CSS Fake Disabled vs Real Disabled — Variable Steps

251. Check if the "Generate Report" button is enabled → {{gen_report_enabled}}
252. Assert {{gen_report_enabled}} equals "true"
253. **[N]** Assert {{gen_report_enabled}} equals "false"

254. Check if the "Submit Application" button is enabled → {{submit_app_enabled}}
255. Assert {{submit_app_enabled}} equals "false"
256. **[N]** Assert {{submit_app_enabled}} equals "true"

257. If {{gen_report_enabled}} equals "true" then assert {{submit_app_enabled}} equals "false"
258. **[N]** If {{gen_report_enabled}} equals "false" then assert {{submit_app_enabled}} equals "true"

259. If the "Generate Report" button is enabled then assert the "Submit Application" button is disabled
260. **[N]** If the "Generate Report" button is disabled then assert the "Submit Application" button is enabled

#### data-disabled vs disabled

261. Assert the "Archive Project" button is enabled
262. Assert the data-disabled of the "Archive Project" button equals "true"
263. Assert the "Archive Project" button does not have a disabled attribute
264. **[N]** Assert the "Archive Project" button is disabled

265. Check if the "Archive Project" button is enabled → {{archive_enabled}}
266. Assert {{archive_enabled}} equals "true"
267. Check the data-disabled of the "Archive Project" button → {{archive_data_disabled}}
268. Assert {{archive_data_disabled}} equals "true"
269. **[N]** Assert {{archive_enabled}} equals "false"

270. If {{archive_data_disabled}} equals "true" then assert {{archive_enabled}} equals "true"
271. **[N]** If {{archive_data_disabled}} equals "true" then assert {{archive_enabled}} equals "false"

272. If the data-disabled of the "Archive Project" button equals "true" then assert the "Archive Project" button is enabled
273. **[N]** If the data-disabled of the "Archive Project" button equals "true" then assert the "Archive Project" button is disabled

#### disabled="" vs disabled="false" — Boolean Attribute Trap

274. Assert the "Paused Task" button is disabled
275. Assert the "Flagged Item" button is disabled
276. **[N]** Assert the "Flagged Item" button is enabled
277. **[N]** Assert the "Paused Task" button is enabled

278. Check if the "Flagged Item" button is enabled → {{flagged_enabled}}
279. Assert {{flagged_enabled}} equals "false"
280. **[N]** Assert {{flagged_enabled}} equals "true"

281. If the "Flagged Item" button is disabled then assert the "Paused Task" button is disabled
282. If {{flagged_enabled}} equals "false" then assert the "Paused Task" button is disabled
283. **[N]** If the "Flagged Item" button is enabled then assert the "Paused Task" button is enabled
284. **[N]** If {{flagged_enabled}} equals "true" then assert the "Paused Task" button is enabled

---

## Airbnb-Style Calendar Prompts (Dynamic Dates)

> Simulates the Airbnb calendar pattern using the Section 18d booking calendar.
> Natural language date references: "3rd day from today", "1 day before today", etc.

#### Direct Assertions

285. Assert the 3rd day from today is enabled
286. Assert the 6th day from today is enabled
287. Assert 1 day before today is disabled
288. Assert the 3rd day from today has data-date-state equal to "future"
289. Assert 1 day before today has data-date-state equal to "past"

290. **[N]** Assert the 3rd day from today is disabled
291. **[N]** Assert 1 day before today is enabled
292. **[N]** Assert the 3rd day from today has data-date-state equal to "past"
293. **[N]** Assert 1 day before today has data-date-state equal to "future"

#### Variable Steps

294. Check if the 3rd day from today is enabled → {{airbnb_3rd_enabled}}
295. Assert {{airbnb_3rd_enabled}} equals "true"
296. **[N]** Assert {{airbnb_3rd_enabled}} equals "false"

297. Check if the 6th day from today is enabled → {{airbnb_6th_enabled}}
298. Assert {{airbnb_6th_enabled}} equals "true"

299. Check if 1 day before today is enabled → {{airbnb_1_before}}
300. Assert {{airbnb_1_before}} equals "false"
301. **[N]** Assert {{airbnb_1_before}} equals "true"

302. Check if 1 day before today is disabled → {{airbnb_1_before_disabled}}
303. Assert {{airbnb_1_before_disabled}} equals "true"
304. **[N]** Assert {{airbnb_1_before_disabled}} equals "false"

#### If/Else with Variables

305. If {{airbnb_3rd_enabled}} equals "true" then assert {{airbnb_6th_enabled}} equals "true"
306. If {{airbnb_1_before}} equals "false" then assert {{airbnb_1_before_disabled}} equals "true"
307. **[N]** If {{airbnb_3rd_enabled}} equals "true" then assert {{airbnb_1_before}} equals "true"
308. **[N]** If {{airbnb_1_before}} equals "false" then assert {{airbnb_3rd_enabled}} equals "false"

#### If/Else Direct

309. If the 3rd day from today is enabled then assert the 7th day from today is enabled
310. If 1 day before today is disabled then assert 2 days before today is disabled
311. **[N]** If the 3rd day from today is enabled then assert 1 day before today is enabled
312. **[N]** If 1 day before today is disabled then assert the 3rd day from today is disabled

#### Nested If

313. If today is enabled then if the 3rd day from today is enabled then assert the 7th day from today is enabled
314. If {{today_enabled}} equals "true" then if {{airbnb_3rd_enabled}} equals "true" then assert {{airbnb_6th_enabled}} equals "true"
315. **[N]** If today is enabled then if 1 day before today is enabled then assert tomorrow is enabled
316. **[N]** If {{today_enabled}} equals "true" then if {{airbnb_1_before}} equals "true" then assert {{tomorrow_enabled}} equals "true"

---

## Summary — 316 steps

| Category | Example Format | Steps |
|----------|---------------|------:|
| Readonly vs Disabled (direct) | `Assert the "INV-2026-7734" input is enabled` | ~19 |
| Readonly vs Disabled (variable) | `Check if the "INV-2026-7734" input is enabled → {{inv_enabled}}` | ~22 |
| Conditional Enable Chain (direct) | `Assert the "Approve Order" button is disabled` | ~20 |
| Conditional Enable Chain (variable) | `Check if the "Approve Order" button is enabled → {{step2_enabled}}` | ~25 |
| Inherited Disabled (direct) | `Assert the "Cancel Payment" button is enabled` | ~10 |
| Inherited Disabled (variable) | `Check if the "View Report" button is enabled → {{report_enabled}}` | ~17 |
| Calendar Dates (direct) | `Assert the 3rd day from today is enabled` | ~32 |
| Calendar Dates (variable) | `Check if the 3rd day from today is enabled → {{third_day_enabled}}` | ~24 |
| Toggle & Stepper (direct) | `Assert the data-state of the "Notifications: ON" button equals "enabled"` | ~18 |
| Toggle & Stepper (variable) | `Check if the minus button is enabled → {{minus_enabled}}` | ~22 |
| Ambiguous States (direct) | `Assert the "Generate Report" button is enabled` | ~16 |
| Ambiguous States (variable) | `Check if the "Flagged Item" button is enabled → {{flagged_enabled}}` | ~24 |
| Airbnb Calendar (direct) | `Assert the 3rd day from today is enabled` | ~13 |
| Airbnb Calendar (variable) | `Check if 1 day before today is enabled → {{airbnb_1_before}}` | ~22 |
| Nested If | `If today is enabled then if tomorrow is enabled then assert 3rd day is enabled` | ~8 |
| Negative **[N]** (included above) | Expected to FAIL | ~80 |
| **Total** | | **316** |

---

## LLM Trap Categories

| Trap | What It Tests | Steps |
|------|--------------|-------|
| Readonly ≠ Disabled | Readonly input asserted as disabled | 2-50 |
| Boolean attr semantics | `disabled=""` and `disabled="false"` both = disabled | 274-284 |
| aria-disabled ≠ disabled | Semantic vs functional disabled | 110-122 |
| data-disabled ≠ disabled | Custom attr vs HTML attr | 261-273 |
| data-state="disabled" ≠ disabled | Custom toggle state vs DOM property | 189-216 |
| CSS appearance ≠ DOM state | Looks disabled but isn't (and vice versa) | 245-260 |
| Inherited disabled (fieldset) | Children disabled, outside sibling enabled | 96-109 |
| Sequential enable chain | Click Step 1 → enables Step 2, not Step 3 | 51-95 |
| Variable consistency | `{{var}}` must match element state exactly | 21-38, 57-64, 100-106 |
| Variable in if/else condition | `If {{var}} equals "X" then assert Y` | 39-42, 67-70, 157-162 |
| Cross-variable assertions | `If {{var_a}} then assert {{var_b}}` | 84, 105-106, 241, 257-258 |
| Nested if with variables | `If {{a}} then if {{b}} then assert {{c}}` | 178, 180, 314, 316 |
| Dead branch detection | False condition → branch must not execute | 41-42, 45-46, 48, 69-70 |
| Calendar past/future | Past=disabled, future=enabled, today=enabled | 123-188, 285-316 |
| Min/max boundary | Stepper disables buttons at 0 and 5 | 217-244 |
