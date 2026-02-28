# E2E Test Steps — Element Assertions & Realistic App

> Natural language steps across 2 pages for KaneAI testing.
> Every value verified against actual HTML source code.
> Steps marked **[N]** are **negative cases** — assertions expected to FAIL.
>
> **All steps are natural language (per PRD LTPM-2748):**
> - Element states: `Assert X is enabled/disabled/checked/unchecked`
> - Visual states: `Assert X is visible/hidden/present/clickable/toggled on/off`
> - CSS properties: `Assert the {property} of X equals "Y"`
> - HTML/ARIA/data attributes: `Assert the {attribute} of X equals/contains/starts with "Y"`
> - Attribute existence: `Assert X has a {attr} attribute`
> - Negation: `Assert X is NOT disabled` / `Assert the href does not contain "staging"`
> - Numeric: `Assert the data-count is greater than "5"` / `is at least "5"`
>
> **Supported CSS properties:** color, background-color, border-color, font-size, font-family, font-weight, font-style, display, visibility, opacity

---

## Test Pages

| Page | URL |
|------|-----|
| Page 1 | https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html |
| Page 2 | https://lt-qa-html-fixtures-pages.vercel.app/realistic-app.html |

---

# PAGE 1: Element Assertions

> **URL**: https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html

### Navigate

1. Open the URL https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html

---

### Section 1 — Element States (`#element-states`)

#### Enabled / Disabled

2. Assert the "Submit Order" button is enabled
3. Assert the "Authorize Payment" button is disabled
4. Assert the "John Doe" input is enabled
5. Assert the "ORD-2024-0892" input is disabled
6. Assert the "Enterprise Plan" select is disabled
7. Assert the "2024-02-15T08:30:00Z" input has a readonly attribute
8. **[N]** Assert the "Submit Order" button is disabled
9. **[N]** Assert the "Authorize Payment" button is enabled
10. **[N]** Assert the "ORD-2024-0892" input is enabled
11. **[N]** Assert the "Enterprise Plan" select is enabled

#### Visible / Hidden

12. Assert the "Dashboard overview panel" element is visible
13. Assert the "Supplementary details section" element is not visible
14. Assert the "Off-screen helper content" element is not visible
15. Assert the "Background overlay layer" element is not visible
16. **[N]** Assert the "Dashboard overview panel" element is not visible
17. **[N]** Assert the "Supplementary details section" element is visible
18. **[N]** Assert the "Off-screen helper content" element is visible

#### Clickable / Not Clickable

19. Assert the "Click Me" button is clickable
20. Assert the "View Only" button is not clickable
21. Assert the "Archived Action" button is not clickable
22. **[N]** Assert the "View Only" button is clickable
23. **[N]** Assert the "Archived Action" button is clickable

#### Present / Not Present

24. Assert the "Account summary widget" element is present
25. Assert the error banner is not present
26. Assert the "Promotional banner" element is present
27. Click the "Toggle Presence" button
28. Assert the "Promotional banner" element is not present
29. Click the "Toggle Presence" button
30. Assert the "Promotional banner" element is present
31. **[N]** Assert the error banner is present
32. **[N]** Assert the "Account summary widget" element is not present

#### Checked / Unchecked

33. Assert the "I agree to terms" checkbox is checked
34. Assert the "Subscribe to newsletter" checkbox is not checked
35. Assert the "Accept cookies" checkbox is checked
36. Assert the "Accept cookies" checkbox is disabled
37. Assert the "Pro Plan" radio button is checked
38. Assert the "Free Plan" radio button is not checked
39. **[N]** Assert the "I agree to terms" checkbox is not checked
40. **[N]** Assert the "Subscribe to newsletter" checkbox is checked
41. **[N]** Assert the "Pro Plan" radio button is not checked
42. **[N]** Assert the "Free Plan" radio button is checked

#### Toggle Switches

43. Assert the Notifications toggle is toggled on
44. Assert the Dark Mode toggle is toggled off
45. Assert the "3rd Party Tag Configuration" toggle is disabled
46. **[N]** Assert the Notifications toggle is toggled off
47. **[N]** Assert the Dark Mode toggle is toggled on
48. **[N]** Assert the "3rd Party Tag Configuration" toggle is enabled

#### Interactive State Changes

49. Assert the "Submit Form" button is enabled
50. Click the "Submit Form" button
51. Assert the "Submit Form" button is disabled
52. Wait for 4 seconds
53. Assert the "Now Enabled!" button is enabled
54. Assert the "Proceed to Checkout" conflicting target button is enabled
55. **[N]** Assert the "Proceed to Checkout" conflicting target button is disabled
56. **[N]** Assert the "Submit Form" button is enabled

---

### Section 2 — DOM Attributes (`#dom-attributes`)

#### ARIA Attributes

57. Assert the aria-expanded of the "Accordion Header (Expanded)" equals "true"
58. Assert the aria-expanded of the "Accordion Header (Collapsed)" equals "false"
59. Click the "Accordion Header (Collapsed)"
60. Assert the aria-expanded of that accordion header equals "true"
61. Assert the role of the "Error: Invalid input" element equals "alert"
62. Assert the aria-label of the Close button equals "Close dialog"
63. **[N]** Assert the aria-expanded of the "Accordion Header (Expanded)" equals "false"
64. **[N]** Assert the role of the "Error: Invalid input" element equals "button"
65. **[N]** Assert the aria-label of the Close button equals "Open dialog"

#### Data Attributes   //////////////////////////////this is pending

66. Assert the data-testid of the "Project workspace" element equals "main-content"
67. Assert the data-status of the "Sprint tracker widget" element equals "active"
68. Assert the data-count of the "Cart summary" element is greater than "5"                                                    
69. Assert the data-index of the "Navigation breadcrumb" element is less than "10"
70. Assert the data-score of the "Review rating" element equals "5"
71. Assert the data-score of the "Review rating" element is at least "5"
72. Assert the data-score of the "Review rating" element is at most "5"
73. Assert the data-count of the "Cart summary" element is at least "8"
74. Assert the data-index of the "Navigation breadcrumb" element is at most "3"
75. Assert the data-priority of the "Task queue item" element is at least "1"
76. Assert the data-priority of the "Task queue item" element is at most "5"
77. **[N]** Assert the data-score of the "Review rating" element is at least "6"
78. **[N]** Assert the data-index of the "Navigation breadcrumb" element is at most "2"
79. **[N]** Assert the data-score of the "Review rating" element is greater than "5"
80. **[N]** Assert the data-testid of the "Project workspace" element equals "sidebar"
81. **[N]** Assert the data-status of the "Sprint tracker widget" element equals "inactive"
82. **[N]** Assert the data-count of the "Cart summary" element is less than "5"

#### Standard HTML Attributes

83. Assert the placeholder of the "Search products..." input contains "Search"
84. Assert the href of the "Go to Dashboard" link contains "/dashboard"
85. Assert the href of the "Go to Dashboard" link starts with "https://"                                                     
86. Assert the href of the "Pricing" link does not contain "staging"
87. Assert the src of the LambdaTest Logo image ends with ".svg"                                                            
88. Assert the alt of the LambdaTest Logo image equals "LambdaTest Logo"
89. Assert the type of the text input equals "text"
90. Assert the type of the text input does not equal "password"
91. Assert the name of the csrf hidden input equals "csrf_token"
92. **[N]** Assert the placeholder of the "Search products..." input contains "Filter"
93. **[N]** Assert the alt of the LambdaTest Logo image equals "Google Logo"
94. **[N]** Assert the type of the text input equals "password"
95. **[N]** Assert the href of the "Go to Dashboard" link starts with "http://"
96. **[N]** Assert the src of the LambdaTest Logo image ends with ".png"

---

### Section 3 — CSS Property Assertions (`#css-properties`)

#### Color Normalization

97. Assert the color of the "Urgent alert message" element equals "rgb(255, 0, 0)"
98. Assert the color of the "Error notification text" element equals "rgb(255, 0, 0)"
99. Assert the color of the "System warning label" element equals "rgb(255, 0, 0)"
100. Assert the border-color of the "Validated input container" element contains "rgb(0, 128, 0)"
101. Assert the background-color of the "Notification banner" element equals "rgb(0, 0, 255)"
102. Assert the background-color of the "Notification banner" element equals "blue"
103. **[N]** Assert the color of the "System warning label" element equals "rgb(0, 0, 255)"
104. **[N]** Assert the border-color of the "Validated input container" element contains "rgb(255, 0, 0)"
105. **[N]** Assert the background-color of the "Notification banner" element equals "red"

#### Typography

106. Assert the font-size of the "Standard paragraph content" element equals "16px"
107. Assert the font-size of the "Section heading text" element equals "24px"
108. Assert the font-family of the "System notification copy" element contains "Arial"
109. Assert the font-weight of the "Terms and conditions text" element equals "400"
110. Assert the font-weight of the "Important announcement" element equals "700"
111. Assert the font-style of the "Author attribution" element equals "italic"
112. **[N]** Assert the font-size of the "Standard paragraph content" element equals "24px"
113. **[N]** Assert the font-weight of the "Important announcement" element equals "400"
114. **[N]** Assert the font-style of the "Author attribution" element equals "normal"
115. **[N]** Assert the font-family of the "System notification copy" element contains "Georgia"

#### Display & Visibility

116. Assert the display of the "Feature description panel" element equals "block"
117. Assert the display of the "Dashboard Layout" element equals "flex"
118. Assert the visibility of the "Dashboard metrics area" element equals "visible"
119. Assert the visibility of the "Supplementary layer" element equals "hidden"
120. **[N]** Assert the display of the "Feature description panel" element equals "flex"
121. **[N]** Assert the visibility of the "Dashboard metrics area" element equals "hidden"

#### Opacity

122. Assert the opacity of the "Watermark layer" element equals "0.5"
123. Assert the opacity of the "Tracking beacon element" element equals "0"
124. Assert the opacity of the "Primary action zone" element equals "1"
125. **[N]** Assert the opacity of the "Watermark layer" element equals "1"

---

### Section 4 — Negation Operators (`#negation`)

126. Assert the "Run Analysis" button is not disabled
127. Assert the "Opt-in for beta" checkbox is not checked
128. Assert the "Background service status" element is not visible
129. Assert the type of the text input does not equal "password"
130. Assert the href of the "Production Link" does not contain "staging"
131. Assert the href of the "Secure Link" does not start with "http://"
132. Assert the src of the LambdaTest Logo image does not end with ".png"
133. Assert the href of the "Go to Dashboard" link does not end with ".html"
134. **[N]** Assert the src of the LambdaTest Logo image does not end with ".svg"
135. **[N]** Assert the href of the "Secure Link" does not start with "https://"
136. **[N]** Assert the "Run Analysis" button is disabled
137. **[N]** Assert the "Opt-in for beta" checkbox is checked
138. **[N]** Assert the type of the text input does not equal "text"
139. **[N]** Assert the href of the "Production Link" does not contain "lambdatest"

---

### Section 5 — Date Picker (`#date-picker`)

140. Assert the date picker month heading is visible
141. Click the next month button in the date picker
142. Assert the date picker month heading updated
143. Assert the 3rd date from today is enabled
144. **[N]** Assert a past date in the date picker is enabled

---

### Section 6 — Edge Cases (`#edge-cases`)

#### Empty / Unicode / Special Attributes

145. Assert the data-value of the "Empty attribute" element equals ""
146. Assert the data-label of the "Unicode text" element contains "Café"
147. Assert the data-emoji of the "Emoji data" element contains "🚀"
148. Assert the data-content of the "Entities text" element contains "$99"
149. **[N]** Assert the data-value of the "Empty attribute" element equals "something"
150. **[N]** Assert the data-label of the "Unicode text" element contains "Tokyo"

#### Dynamic Elements

151. Click the "Load Content" button
152. Wait for 3 seconds
153. Assert the AJAX loaded content is visible
154. Assert the "I will disappear in 3 seconds..." element is visible
155. Click the "Start Timer" button
156. Wait for 4 seconds
157. Assert the "I will disappear in 3 seconds..." element is not visible
158. Click the "Simulate Page Navigation" button
159. Wait for 2 seconds
160. Assert the post-navigation element is present

#### XSS Safety

161. Assert the data-content of the "XSS test element" contains "script"

---

### Section 7 — Modal Assertions (`#modal-assertions`)

162. Click the "Open Modal" button
163. Assert the modal submit button is enabled
164. Assert the data-action of the modal submit button equals "submit"
165. Assert the data-context of the modal input equals "modal"
166. Assert the data-status of the modal status element equals "open"
167. Click the "Cancel" button in the modal
168. **[N]** Assert the data-action of the modal submit button equals "cancel"
169. **[N]** Assert the data-status of the modal status element equals "closed"

---

### Section 8 — Iframe Assertions (`#iframe-assertions`)

170. Assert the enabled button inside the iframe is enabled
171. Assert the disabled button inside the iframe is disabled
172. Assert the placeholder of the iframe input equals "Iframe input field"
173. Assert the data-context of the iframe input equals "iframe"
174. Assert the role of the iframe status element equals "status"
175. Assert the data-status of the iframe status element equals "active"
176. **[N]** Assert the disabled button inside the iframe is enabled
177. **[N]** Assert the data-context of the iframe input equals "main"
178. **[N]** Assert the data-status of the iframe status element equals "inactive"

---

### Section 9 — Shadow DOM (`#shadow-dom-assertions`)

179. Assert the enabled button inside the shadow DOM is enabled
180. Assert the disabled button inside the shadow DOM is disabled
181. **[N]** Assert the disabled button inside the shadow DOM is enabled

---

### Section 10 — Failure Conditions (`#failure-conditions`)

182. **[N]** Assert the "Finalize Order" button is enabled
183. **[N]** Assert the "Approve Changes" disabled button is enabled
184. Click the "Send Feedback" button

#### Error Scenarios (PRD AC7)

185. **[ERROR]** Read the data-testid of the "I have no data-testid attribute" element
186. **[ERROR]** Assert the "nonexistent-element-xyz" button is enabled
187. **[ERROR]** Assert the "completely-fake-element" element is visible

---

### Section 11 — Mixed Multi-Attribute (`#mixed-assertions`)

188. Assert the "Add to Cart" button is enabled
189. Assert the data-action of the "Add to Cart" button equals "primary"
190. Assert the aria-label of the "Add to Cart" button equals "Add to cart"
191. Assert the font-size of the "Add to Cart" button equals "14px"
192. Assert the font-weight of the "Add to Cart" button equals "600"
193. **[N]** Assert the "Add to Cart" button is disabled
194. **[N]** Assert the data-action of the "Add to Cart" button equals "secondary"
195. **[N]** Assert the font-size of the "Add to Cart" button equals "20px"

---

### Section 12 — Consecutive Assertions (`#consecutive`)

196. Assert the "Deploy Changes" element is enabled
197. Assert the data-value of the "Configuration preset" element equals "alpha"
198. Assert the "Enable logging" checkbox is checked
199. Assert the "Sync Repository" button is not disabled
200. Assert the data-count of the "Notification center" element is greater than "10"
201. **[N]** Assert the data-value of the "Configuration preset" element equals "beta"
202. **[N]** Assert the "Enable logging" checkbox is not checked
203. **[N]** Assert the data-count of the "Notification center" element is less than "10"

---

### Section 13 — Variable Resolution (`#variables`)

204. Assert the placeholder of the variable placeholder input contains "Search here"
205. Assert the data-value of the empty variable test input equals "something"
206. Assert the data-attr of the "Test Value" element equals "test-value"
207. **[N]** Assert the placeholder of the variable placeholder input contains "Filter"

---

### Section 14 — Conditional vs Assertion (`#disambiguation`)

208. Assert the "Action Button" is enabled
209. Click the "Action Button"
210. Assert the "Looks Enabled" element is visible
211. Assert the opacity of the "Looks Enabled" element equals "1"
212. Assert the visibility of the "Looks Enabled" element equals "visible"
213. Assert the "Page content area" element is present
214. **[N]** Assert the "Looks Enabled" element is not visible

---

### Section 15 — Renuity Customer Journey (`#renuity-journey`)

215. Assert the address input is enabled
216. Assert the placeholder of the address input contains "home address"
217. Assert the data-step of the address input equals "1"
218. Assert the data-validation of the address input equals "required"
219. Type "123 Main Street" in the address input
220. Assert the service type dropdown is enabled
221. Assert the "Next" button for step 2 is disabled
222. Select "Bathroom Remodel" from the service type dropdown
223. Assert the "Next" button for step 2 is enabled
224. Assert the data-booking-status of the confirmation panel equals "pending"
225. Assert the "Confirm Appointment" button is disabled
226. Assert the data-action of the "Confirm Appointment" button equals "confirm"
227. **[N]** Assert the "Next" button for step 2 is enabled before selecting a service
228. **[N]** Assert the "Confirm Appointment" button is enabled

---

### Section 16 — Mobile Web (`#mobile-web`)

> Desktop viewport assertions (>768px)

229. Assert the desktop navigation is visible
230. Assert the data-context of the desktop navigation equals "desktop"
231. Assert the hamburger menu button is not visible
232. Assert the mobile-only banner is not visible
233. Assert the font-size of the "Responsive Title" heading equals "28px"
234. Assert the font-size of the responsive card text equals "16px"
235. Assert the sidebar content is visible
236. Assert the display of the sidebar equals "block"
237. Assert the data-mobile of the hamburger button equals "true"
238. Assert the aria-label of the hamburger button equals "Open navigation menu"
239. Assert the aria-expanded of the hamburger button equals "false"
240. Assert the data-device of the mobile-only banner equals "mobile"
241. Assert the role of the mobile-only banner equals "banner"
242. **[N]** Assert the hamburger menu button is visible
243. **[N]** Assert the mobile-only banner is visible
244. **[N]** Assert the desktop navigation is not visible

---

### Section 17 — RFC Coverage (`#element-states` bottom)

#### Media Elements

245. Assert the Sample video has a controls attribute
246. Assert the Background video has an autoplay attribute
247. Assert the Background video has a loop attribute
248. Assert the Background video has a muted attribute
249. Assert the Background video does not have a controls attribute
250. **[N]** Assert the Sample video does not have a controls attribute

#### Inherited Disabled (Fieldset)

251. Assert the "Update Payment" button inside the disabled fieldset is disabled
252. Assert the input inside the disabled fieldset is disabled
253. Assert the select inside the disabled fieldset is disabled
254. **[N]** Assert the "Update Payment" button inside the disabled fieldset is enabled

#### Boolean Attributes

255. Assert the Search input has an autofocus attribute
256. Assert the Select skills select has a multiple attribute
257. Assert the Company Logo image has an alt attribute
258. Assert the NoAlt image does not have an alt attribute
259. Assert the "Enter company name" input has a required attribute
260. Assert the "TF-2024-RELEASE" input has a readonly attribute
261. Assert the "Publish Draft" button has a disabled attribute
262. **[N]** Assert the NoAlt image has an alt attribute
263. **[N]** Assert the Search input does not have an autofocus attribute

#### Extended ARIA

264. Assert the aria-label of the "ARIA Button" equals "Close dialog"
265. Assert the aria-expanded of the "ARIA Button" equals "false"
266. Assert the aria-haspopup of the "ARIA Button" equals "true"
267. Assert the aria-invalid of the email with error input equals "true"
268. Assert the aria-hidden of the "This is aria-hidden" element equals "true"
269. **[N]** Assert the aria-label of the "ARIA Button" equals "Open dialog"
270. **[N]** Assert the aria-haspopup of the "ARIA Button" equals "false"
271. **[N]** Assert the aria-invalid of the email with error input equals "false"

#### Roles

272. Assert the role of the navigation element equals "navigation"
273. Assert the role of the "Error: Something went wrong!" element equals "alert"
274. **[N]** Assert the role of the "Error: Something went wrong!" element equals "status"
275. **[N]** Assert the role of the navigation element equals "banner"

#### Data Attributes

276. Assert the data-testid of the "Data Attributes Button" equals "action-button"
277. Assert the data-value of the "Data Attributes Button" equals "42"
278. Assert the data-cy of the "Data Attributes Button" equals "submit-action"
279. **[N]** Assert the data-testid of the "Data Attributes Button" equals "delete-button"
280. **[N]** Assert the data-value of the "Data Attributes Button" equals "99"

#### Select Dropdown

281. Assert the value of the Country dropdown equals "India"
282. **[N]** Assert the value of the Country dropdown equals "USA"

#### Toggle Checkboxes

283. Assert the Dark mode toggle checkbox is checked
284. Assert the Notifications toggle checkbox is not checked
285. **[N]** Assert the Dark mode toggle checkbox is not checked
286. **[N]** Assert the Notifications toggle checkbox is checked

#### DOM Attributes — Links & Form

287. Assert the href of the Login link equals "/login"
288. Assert the title of the Login link equals "Go to login page"
289. Assert the href of the Contact Us link equals "mailto:test@example.com"
290. Assert the action of the Signup form equals "/api/signup"
291. Assert the method of the Signup form equals "POST"
292. Assert the placeholder of the Name input equals "Enter your name"
293. Assert the value of the Name input equals "John Doe"
294. Assert the type of the Email input equals "email"
295. Assert the name of the Password input equals "password"
296. **[N]** Assert the href of the Login link equals "/logout"
297. **[N]** Assert the method of the Signup form equals "GET"
298. **[N]** Assert the value of the Name input equals "Jane Doe"
299. **[N]** Assert the type of the Email input equals "text"

#### Element States (Eval)

300. Assert the Submit button is enabled
301. Assert the "Publish Draft" button is disabled
302. Assert the Username input is enabled
303. Assert the team email input is disabled
304. Assert the Accept terms checkbox is checked
305. Assert the Subscribe newsletter checkbox is not checked
306. Assert the Credit card radio button is checked
307. Assert the Debit card radio button is not checked
308. **[N]** Assert the Submit button is disabled
309. **[N]** Assert the "Publish Draft" button is enabled
310. **[N]** Assert the Accept terms checkbox is not checked
311. **[N]** Assert the Credit card radio button is not checked

#### CSS Color Targets

312. Assert the color of the "Priority notification" text equals "rgb(37, 99, 235)"
313. Assert the color of the "Overdue task warning" text equals "rgb(239, 68, 68)"
314. Assert the background-color of the "Caution advisory panel" equals "rgb(253, 224, 71)"
315. Assert the background-color of the "Feature highlight banner" equals "rgb(99, 102, 241)"
316. Assert the border-color of the "Validation error field" contains "rgb(239, 68, 68)"
317. Assert the font-size of the "Section heading content" equals "24px"
318. Assert the font-size of the "Footnote disclaimer" equals "12px"
319. Assert the font-family of the "Editorial column text" contains "Georgia"
320. Assert the font-family of the "Code snippet display" contains "Courier New"
321. Assert the font-weight of the "Key announcement" equals "700"
322. Assert the font-weight of the "Standard description copy" equals "400"
323. Assert the font-style of the "Author attribution" equals "italic"
324. Assert the opacity of the "Watermark overlay" element equals "0.5"
325. Assert the display of the "Content section panel" equals "block"
326. **[N]** Assert the font-size of the "Section heading content" equals "12px"
327. **[N]** Assert the font-weight of the "Key announcement" equals "300"

#### Media Source

328. Assert the src of the video source element contains "mov_bbb.mp4"
329. **[N]** Assert the src of the video source element contains "sample.webm"

---

# PAGE 2: Realistic App (TeamFlow Dashboard)

> **URL**: https://lt-qa-html-fixtures-pages.vercel.app/realistic-app.html

### Navigate

330. Open the URL https://lt-qa-html-fixtures-pages.vercel.app/realistic-app.html

---

### Media Elements
> Onboarding & Resources section → "Getting Started"

331. Assert the Product onboarding tutorial video has a controls attribute
332. Assert the ambient promo video has an autoplay attribute
333. Assert the ambient promo video has a loop attribute
334. Assert the ambient promo video has a muted attribute
335. Assert the standup audio player has a controls attribute
336. Assert the alt of the TeamFlow Logo image equals "TeamFlow Logo"
337. **[N]** Assert the Product onboarding tutorial video does not have a controls attribute
338. **[N]** Assert the alt of the TeamFlow Logo image equals "App Logo"

---

### Account Settings — Profile Form (`#profile-fieldset`)

339. Assert the action of the profile form equals "/api/profile"
340. Assert the method of the profile form equals "POST"
341. Assert the Full Name input has a required attribute
342. Assert the Bio input has a readonly attribute
343. Assert the skills select has a multiple attribute
344. **[N]** Assert the action of the profile form equals "/api/settings"
345. **[N]** Assert the method of the profile form equals "GET"

---

### Notification Toggles (`#notifications-fieldset`)

346. Assert the Email Notifications toggle is checked
347. Assert the Push Notifications toggle is not checked
348. Assert the Dark Mode toggle is checked
349. Assert the Sound Alerts toggle is not checked
350. Assert the Auto-assign Tasks toggle is checked
351. **[N]** Assert the Email Notifications toggle is not checked
352. **[N]** Assert the Push Notifications toggle is checked
353. **[N]** Assert the Dark Mode toggle is not checked

---

### Disabled Billing Fieldset (`#billing-fieldset`)

354. Assert the Current Plan input inside the Billing fieldset is disabled
355. Assert the Seats input inside the Billing fieldset is disabled
356. Assert the "Upgrade Plan" button inside the Billing fieldset is disabled
357. Assert the billing cycle select inside the Billing fieldset is disabled
358. **[N]** Assert the Current Plan input inside the Billing fieldset is enabled
359. **[N]** Assert the "Upgrade Plan" button inside the Billing fieldset is enabled

---

### System Status Alerts
> Account Settings → "System Status" sub-section

360. Assert the role of the "Database connection timeout" error alert equals "alert"
361. Assert the role of the "Deployment v2.14.3 completed successfully" success alert equals "status"
362. Assert the aria-live of the "Deployment v2.14.3 completed" success alert equals "polite"
363. Assert the role of the "API rate limit at 85%" warning alert equals "alert"
364. Assert the aria-live of the "API rate limit" warning alert equals "assertive"
365. **[N]** Assert the role of the "Database connection timeout" error alert equals "status"
366. **[N]** Assert the role of the "Deployment completed" success alert equals "alert"

---

### ARIA Dropdown & Bookmark
> Account Settings → "Actions" sub-section

367. Assert the aria-haspopup of the "More Actions" button equals "true"
368. Assert the aria-expanded of the "More Actions" button equals "false"
369. Assert the data-testid of the "More Actions" button equals "actions-dropdown"
370. Click the "More Actions" button
371. Assert the aria-expanded of the "More Actions" button equals "true"
372. **[N]** Assert the aria-haspopup of the "More Actions" button equals "false"
373. **[N]** Assert the data-testid of the "More Actions" button equals "main-dropdown"

---

### Navigation & Accessibility
> Account Settings → Accessibility Targets

374. Assert the role of the settings navigation equals "navigation"
375. Assert the aria-hidden of the hidden helper element equals "true"
376. Assert the aria-invalid of the error field input equals "true"
377. **[N]** Assert the role of the settings navigation equals "banner"
378. **[N]** Assert the aria-hidden of the hidden helper element equals "false"

---

### Typography & Fonts
> Design System section

379. Assert the font-family of the "Editorial excerpt" text contains "Georgia"
380. Assert the font-family of the "Log output display" text contains "Courier New"
381. Assert the font-family of the "Navigation label" text contains "Arial"
382. Assert the font-weight of the "Key metric label" equals "700"
383. Assert the font-weight of the "Description paragraph" equals "400"
384. Assert the font-weight of the "Supplementary note" equals "300"
385. Assert the font-style of the "Author attribution" equals "italic"
386. Assert the font-style of the "Body content copy" equals "normal"
387. Assert the font-size of the "Section heading" equals "24px"
388. Assert the font-size of the "Legal disclaimer" equals "12px"
389. Assert the font-size of the "Subtitle content" equals "18px"
390. **[N]** Assert the font-family of the "Editorial excerpt" text contains "Arial"
391. **[N]** Assert the font-weight of the "Key metric label" equals "400"
392. **[N]** Assert the font-style of the "Author attribution" equals "normal"
393. **[N]** Assert the font-size of the "Section heading" equals "12px"

---

### Color Assertion Targets
> Design System → Color Palette

394. Assert the color of the "Priority notification" text equals "rgb(37, 99, 235)"
395. Assert the color of the "Overdue deadline alert" text equals "rgb(239, 68, 68)"
396. Assert the color of the "Build passed message" text equals "rgb(22, 163, 74)"
397. Assert the background-color of the "Warning advisory card" equals "rgb(253, 224, 71)"
398. Assert the background-color of the "Feature highlight panel" equals "rgb(99, 102, 241)"
399. Assert the border-color of the "Invalid field container" contains "rgb(239, 68, 68)"
400. Assert the border-color of the "Verified field container" contains "rgb(22, 163, 74)"
401. Assert the display of the "Content section" equals "block"
402. Assert the display of the "Tag chip" equals "inline"
403. Assert the visibility of the "Dashboard configuration" equals "visible"
404. Assert the opacity of the "Watermark overlay" element equals "0.5"
405. Assert the opacity of the "Featured section" element equals "1"
406. **[N]** Assert the color of the "Priority notification" text equals "rgb(239, 68, 68)"
407. **[N]** Assert the background-color of the "Warning advisory card" equals "rgb(99, 102, 241)"
408. **[N]** Assert the display of the "Content section" equals "inline"
409. **[N]** Assert the opacity of the "Watermark overlay" element equals "1"

---

### If/Else — Role Permissions
> Account Settings → Role Permissions

410. Select "Viewer" from the User Role dropdown
411. If the role badge text equals "Viewer" then assert the Read permission has data-perm equal to "true"
412. If the role badge text equals "Viewer" then assert the Write permission has data-perm equal to "false"
413. If the role badge text equals "Viewer" then assert the Delete permission has data-perm equal to "false"
414. If the role badge text equals "Viewer" then assert the Admin Panel permission has data-perm equal to "false"
415. Select "Admin" from the User Role dropdown
416. If the role badge text equals "Admin" then assert the Write permission has data-perm equal to "true"
417. If the role badge text equals "Admin" then assert the Delete permission has data-perm equal to "true"
418. If the role badge text equals "Admin" then assert the Admin Panel permission has data-perm equal to "true"
419. Select "Editor" from the User Role dropdown
420. If the role badge text equals "Editor" then assert the Write permission has data-perm equal to "true"
421. If the role badge text equals "Editor" then assert the Delete permission has data-perm equal to "false"
422. If the role badge text equals "Editor" then assert the Admin Panel permission has data-perm equal to "false"
423. Select "Guest" from the User Role dropdown
424. If the role badge text equals "Guest" then assert the Read permission has data-perm equal to "false"
425. If the role badge text equals "Guest" then assert the Write permission has data-perm equal to "false"
426. If the role badge text equals "Guest" then assert the Admin Panel permission has data-perm equal to "false"
427. **[N]** If the role badge text equals "Guest" then assert the Read permission has data-perm equal to "true"
428. **[N]** If the role badge text equals "Guest" then assert the Write permission has data-perm equal to "true"

---

### If/Else — Server Temperature
> Account Settings → Server Temperature (thresholds: <70=Normal, 70-84=Warning, >=85=Critical)

429. Set the temperature slider value to 55
430. If the temperature display shows "55°C" then assert the temperature status text equals "Normal"
431. If the data-temp-status equals "normal" then assert the temperature display shows "55°C"
432. Set the temperature slider value to 80
433. If the temperature display shows "80°C" then assert the temperature status text equals "Warning"
434. If the data-temp-status equals "warning" then assert the temperature display shows "80°C"
435. Set the temperature slider value to 95
436. If the temperature display shows "95°C" then assert the temperature status text equals "Critical"
437. If the data-temp-status equals "critical" then assert the temperature display shows "95°C"
438. Set the temperature slider value to 45
439. If the temperature display shows "45°C" then assert the temperature status text equals "Normal"
440. **[N]** If the temperature display shows "45°C" then assert the temperature status text equals "Critical"
441. **[N]** If the data-temp-status equals "normal" then assert the temperature status text equals "Warning"

---

### If/Else — Password Strength
> Account Settings → Password Strength (criteria: 8 chars, lowercase, uppercase, number, special char)

442. Assert the password label text equals "No password"
443. If the password label text equals "No password" then assert the password score text equals "Score: 0/5"
444. If the password score text equals "Score: 0/5" then assert the "At least 8 characters" criterion has data-met equal to "false"
445. Type "abc" in the password input
446. If the password label text equals "Weak" then assert the "Contains lowercase" criterion has data-met equal to "true"
447. If the password label text equals "Weak" then assert the "At least 8 characters" criterion has data-met equal to "false"
448. If the password label text equals "Weak" then assert the "Contains uppercase" criterion has data-met equal to "false"
449. Clear the password input
450. Type "Str0ng!Pass" in the password input
451. If the password label text equals "Strong" then assert the password score text equals "Score: 5/5"
452. If the password score text equals "Score: 5/5" then assert the "At least 8 characters" criterion has data-met equal to "true"
453. If the password score text equals "Score: 5/5" then assert the "Contains uppercase" criterion has data-met equal to "true"
454. If the password score text equals "Score: 5/5" then assert the "Contains number" criterion has data-met equal to "true"
455. If the password score text equals "Score: 5/5" then assert the "Contains special char" criterion has data-met equal to "true"
456. **[N]** If the password label text equals "Strong" then assert the password score text equals "Score: 2/5"
457. **[N]** If the password score text equals "Score: 5/5" then assert the "At least 8 characters" criterion has data-met equal to "false"

---

### If/Else — Inventory Stock Level
> Account Settings → Inventory Stock (<=50=Low Stock, 51-200=In Stock, >200=Overstocked)

458. If the stock badge text equals "Low Stock" then assert the data-stock-level equals "low"
459. If the data-stock-level equals "low" then assert the stock action text equals "Reorder recommended"
460. Clear the stock input and type "150"
461. If the stock badge text equals "In Stock" then assert the data-stock-level equals "normal"
462. If the data-stock-level equals "normal" then assert the stock action text equals "Stock level healthy"
463. Clear the stock input and type "300"
464. If the stock badge text equals "Overstocked" then assert the data-stock-level equals "over"
465. If the data-stock-level equals "over" then assert the stock action text equals "Consider reducing orders"
466. **[N]** If the stock badge text equals "Overstocked" then assert the data-stock-level equals "low"
467. **[N]** If the data-stock-level equals "over" then assert the stock badge text equals "Low Stock"

---

### If/Else — Build Pipeline Status
> Account Settings → Build Pipeline (6 steps: Checkout, Install, Lint, Tests, Build, Deploy)

468. Assert the build status text equals "Running"
469. If the build status text equals "Running" then assert the data-step-status of the Checkout step equals "done"
470. If the build status text equals "Running" then assert the data-step-status of the Install dependencies step equals "done"
471. If the build status text equals "Running" then assert the data-step-status of the Lint step equals "done"
472. If the build status text equals "Running" then assert the data-step-status of the Running tests step equals "running"
473. If the build status text equals "Running" then assert the data-step-status of the Build step equals "pending"
474. If the build status text equals "Running" then assert the data-step-status of the Deploy step equals "pending"
475. Select "Failed" from the Build Status dropdown
476. If the build status text equals "Failed" then assert the Retry button is visible
477. If the build status text equals "Failed" then assert the data-step-status of the Running tests step equals "failed"
478. If the build status text equals "Failed" then assert the data-step-status of the Build step equals "skipped"
479. Select "Success" from the Build Status dropdown
480. If the build status text equals "Success" then assert the data-step-status of the Deploy step equals "done"
481. If the build status text equals "Success" then assert the Retry button is not visible
482. **[N]** If the build status text equals "Success" then assert the Retry button is visible
483. **[N]** If the build status text equals "Success" then assert the data-step-status of the Deploy step equals "pending"

---

### Shadow DOM — Dashboard Stats
> Dashboard Overview → 4 `<tf-stat-card>` custom elements

484. Assert the data-value of the "Total Tasks" stat card equals "24"
485. Assert the data-label of the "Total Tasks" stat card equals "Total Tasks"
486. Assert the data-trend of the "Total Tasks" stat card equals "+3 this week"
487. Assert the data-trend-up of the "Total Tasks" stat card equals "true"
488. Assert the data-value of the "In Progress" stat card equals "8"
489. Assert the data-trend-up of the "In Progress" stat card equals "false"
490. Assert the data-value of the "Completed" stat card equals "16"
491. Assert the data-value of the "Velocity" stat card equals "94%"
492. **[N]** Assert the data-value of the "Total Tasks" stat card equals "30"

---

### Shadow DOM — Task Board Kanban
> Task Board → 3 columns (To Do, In Progress, Done)

493. Assert the data-title of the "TF-101" task card equals "Set up CI/CD pipeline"
494. Assert the data-assignee of the "TF-101" task card equals "Sarah Chen"
495. Assert the data-priority of the "TF-101" task card equals "high"
496. Assert the data-due of the "TF-101" task card equals "Mar 1"
497. Assert the data-title of the "TF-105" task card equals "Database migration v2"
498. Assert the data-priority of the "TF-105" task card equals "critical"
499. Assert the data-done of the "TF-106" task card equals "true"
500. **[N]** Assert the data-priority of the "TF-101" task card equals "low"

---

### Data Table & Pagination
> Team Activity Log → 24 rows, 3 pages (8 per page)

501. Assert the "Select all" checkbox is not checked
502. Assert the Prev pagination button is disabled
503. Assert the Next pagination button is enabled
504. Assert the page 1 button is visible
505. Assert the page 2 button is visible
506. Assert the page 3 button is visible
507. Assert the data-status of row 1 status pill equals "completed"
508. Click the Next pagination button
509. Assert the Prev pagination button is enabled
510. Click the page 3 pagination button
511. Assert the Next pagination button is disabled
512. Click the Prev pagination button
513. Assert the Prev pagination button is enabled
514. **[N]** Assert the Prev button is enabled on page 1
515. **[N]** Assert the Next button is enabled on page 3

---

### Color Palette Swatches
> Design System → Color Palette (hex, rgb, hsl, rgba formats)

516. Assert the data-color of the "Primary" color swatch equals "#0ea5e9"
517. Assert the data-color of the "Success" color swatch equals "#10b981"
518. Assert the data-color of the "Error" color swatch equals "#ef4444"
519. Assert the data-color of the "RGB Blue" color swatch equals "rgb(59,130,246)"
520. Assert the data-color of the "HSL Violet" color swatch equals "hsl(280,67%,55%)"
521. Assert the data-color of the "Semi-Red" color swatch equals "rgba(239,68,68,0.5)"
522. **[N]** Assert the data-color of the "Primary" swatch equals "#ff0000"

---

### Status Badges
> Design System → Status Badges (8 variants)

523. Assert the data-status of the "Success" badge equals "success"
524. Assert the data-status of the "Warning" badge equals "warning"
525. Assert the data-status of the "Error" badge equals "error"
526. Assert the data-status of the "Info" badge equals "info"
527. Assert the data-status of the "In Review" badge equals "in-review"
528. Assert the data-status of the "Blocked" badge equals "blocked"
529. **[N]** Assert the data-status of the "Success" badge equals "error"

---

### Button Variants
> Design System → Buttons (7 variants)

530. Assert the "Primary" button is enabled
531. Assert the data-variant of the "Primary" button equals "primary"
532. Assert the "Secondary" button is enabled
533. Assert the data-variant of the "Secondary" button equals "secondary"
534. Assert the "Danger" button is enabled
535. Assert the data-variant of the "Danger" button equals "danger"
536. Assert the "Approve" button is enabled
537. Assert the data-variant of the "Approve" button equals "success"
538. Assert the "Ghost Link" button is enabled
539. Assert the data-variant of the "Ghost Link" button equals "ghost"
540. Assert the "Archive Project" button is disabled
541. Assert the data-loading of the "Loading..." button equals "true"
542. **[N]** Assert the "Archive Project" button is enabled
543. **[N]** Assert the data-variant of the "Primary" button equals "ghost"

---

### Input & Form States
> Design System → Input & Form States (12 input variants)

544. Assert the value of the valid email input equals "user@example.com"
545. Assert the data-state of the valid email input equals "valid"
546. Assert the value of the invalid email input equals "not-an-email"
547. Assert the aria-invalid of the invalid email input equals "true"
548. Assert the data-state of the invalid email input equals "invalid"
549. Assert the "Project Name" input has a required attribute
550. Assert the data-state of the "Project Name" input equals "required"
551. Assert the "Account ID" input has a readonly attribute
552. Assert the value of the "Account ID" input equals "ACC-2024-00892"
553. Assert the data-state of the "Account ID" input equals "readonly"
554. Assert the "Organization" input is disabled
555. Assert the value of the "Organization" input equals "LambdaTest Inc."
556. Assert the data-state of the "Organization" input equals "disabled"
557. Assert the data-maxlength of the max length input equals "20"
558. Assert the data-pattern of the pattern input equals "[0-9]+"
559. Assert the type of the password input equals "password"
560. Assert the data-state of the password input equals "password"
561. Assert the value of the number input equals "42"
562. Assert the data-value of the range slider equals "65"
563. Assert the data-color of the color picker equals "#0ea5e9"
564. Assert the data-date of the date input equals "2026-02-26"
565. Assert the data-editable of the contenteditable div equals "true"
566. **[N]** Assert the "Organization" input is enabled
567. **[N]** Assert the value of the number input equals "100"
568. **[N]** Assert the data-state of the "Account ID" input equals "disabled"

---

### Element States — Checkboxes (Page 2)
> Design System → Element States → Checkbox States

569. Assert the "Accept cookies" checkbox is checked
570. Assert the data-state of the "Accept cookies" checkbox equals "checked"
571. Assert the "Marketing emails" checkbox is not checked
572. Assert the data-state of the "Marketing emails" checkbox equals "unchecked"
573. Assert the "Terms accepted" checkbox is checked
574. Assert the "Terms accepted" checkbox is disabled
575. Assert the data-state of the "Terms accepted" checkbox equals "disabled"
576. **[N]** Assert the "Accept cookies" checkbox is not checked
577. **[N]** Assert the "Terms accepted" checkbox is enabled

---

### Element States — Radio Buttons (Page 2)
> Design System → Element States → Radio States

578. Assert the "Standard shipping" radio button is checked
579. Assert the data-state of the "Standard shipping" radio equals "selected"
580. Assert the "Express shipping" radio button is not checked
581. Assert the data-state of the "Express shipping" radio equals "unselected"
582. Assert the "Same-day delivery" radio button is disabled
583. Assert the data-state of the "Same-day delivery" radio equals "disabled"
584. **[N]** Assert the "Standard shipping" radio is not checked
585. **[N]** Assert the "Same-day delivery" radio is enabled

---

## Summary — 585 steps total

> All steps use **natural language format** (single-step assertions). No Read/Assert bifurcation.

| Category | Example Format | Steps |
|----------|---------------|------:|
| Element States | `Assert the "Submit" button is enabled` | ~60 |
| Visual States | `Assert the element is visible/hidden/present/clickable` | ~30 |
| CSS Properties | `Assert the color of the element equals "rgb(…)"` | ~50 |
| HTML Attributes | `Assert the href of the link contains "/dashboard"` | ~45 |
| ARIA Attributes | `Assert the aria-expanded of the accordion equals "true"` | ~35 |
| Data Attributes | `Assert the data-testid of the element equals "main"` | ~65 |
| Attribute Existence | `Assert the video has a controls attribute` | ~25 |
| If/Else Conditionals | `If X then assert Y` | ~55 |
| Actions | `Click / Type / Select / Wait / Navigate` | ~35 |
| Shadow DOM / Iframe / Kanban / Table | Mixed | ~40 |
| E2E Flows | Renuity, Mobile Web, Disambiguation | ~30 |
| Negative [N] (included above) | Expected to FAIL | ~100 |
| Error [ERROR] | Element/attribute not found | 3 |
| **Total** | | **585** |

---

## PRD Operator Coverage (LTPM-2748)

| Operator | PRD NL Triggers | Test Steps |
|----------|----------------|:----------:|
| Equals | "is", "equals" | ✅ |
| Does not equal | "is not", "does not equal" | ✅ |
| Contains | "contains", "includes" | ✅ |
| Does not contain | "does not contain" | ✅ |
| Starts with | "starts with" | ✅ |
| Does not start with | "does not start with" | ✅ |
| Ends with | "ends with" | ✅ |
| Does not end with | "does not end with" | ✅ |
| Greater than | "is greater than" | ✅ |
| Less than | "is less than" | ✅ |
| Greater than or equal | "is at least" | ✅ |
| Less than or equal | "is at most" | ✅ |

## PRD Acceptance Criteria Coverage

| AC | Description | Status |
|----|-------------|:------:|
| AC1 | Enabled/disabled via NL | ✅ |
| AC2 | Toggle/checkbox states | ✅ |
| AC3 | DOM attribute exact match | ✅ |
| AC4 | Negation ("NOT") | ✅ |
| AC5 | Failure conditions respected | ✅ |
| AC6 | Code export | N/A (manual) |
| AC7 | Error scenarios (not found, missing attr) | ✅ |
| AC8 | Present/absent (distinct from visibility) | ✅ |
| AC9 | Partial match operators (all 6) | ✅ |
| AC10 | Numeric comparison operators (all 4) | ✅ |
| AC11 | 10 CSS property assertions | ✅ |
| AC12 | CSS color normalization (named→RGB) | ✅ |
| AC13 | Low-confidence fallback | N/A (internal) |
