# Expanded Smoke Test — Verified Instructions

> Every instruction below is verified against the actual HTML source.
> Covers: element states, DOM attributes, CSS properties, ARIA, toggles, boolean attributes,
> negation, edge cases, modal, iframe, shadow DOM, media, form, if/else conditional flows,
> negative cases, and expected failures.

---

## Page 1: element-assertions.html

1. Open the URL https://lt-qa-html-fixtures-pages.vercel.app/element-assertions.html

### Enabled / Disabled

2. Assert the "Submit Order" button is enabled
3. Assert the "Processing..." button is disabled
4. Assert the "Hello World" input is enabled
5. Assert the "Cannot edit this" input is disabled
6. Assert the "Locked Option" select is disabled
7. Assert the "Read-only value" input has a readonly attribute
8. **[N]** Assert the "Submit Order" button is disabled → [Expected FAIL]
9. **[N]** Assert the "Processing..." button is enabled → [Expected FAIL]

### Visible / Hidden

10. Assert the "I am visible" element is visible
11. Assert the "I am hidden with display:none" element is not visible
12. Assert the "I am hidden with visibility:hidden" element is not visible
13. Assert the "I am hidden with opacity:0" element is not visible
14. **[N]** Assert the "I am visible" element is not visible → [Expected FAIL]

### Clickable

15. Assert the "Click Me" button is clickable
16. Assert the "Cannot Click" button is not clickable
17. Assert the "Pointer Events None" button is not clickable

### Present / Not Present

18. Assert the "I exist in the DOM" element is present
19. Assert the error banner is not present
20. Assert the "I can be removed" element is present
21. Click the "Toggle Presence" button
22. Assert the "I can be removed" element is not present
23. Click the "Toggle Presence" button
24. Assert the "I can be removed" element is present

### Checked / Unchecked / Indeterminate

25. Assert the "I agree to terms" checkbox is checked
26. Assert the "Subscribe to newsletter" checkbox is not checked
27. Assert the "Select partial" checkbox is indeterminate
28. Assert the "Locked option" checkbox is checked
29. Assert the "Locked option" checkbox is disabled
30. Assert the "Pro Plan" radio button is checked
31. Assert the "Free Plan" radio button is not checked
32. **[N]** Assert the "I agree to terms" checkbox is not checked → [Expected FAIL]
33. **[N]** Assert the "Pro Plan" radio button is not checked → [Expected FAIL]

### Toggle Switches

34. Assert the Notifications toggle is toggled on
35. Assert the Dark Mode toggle is toggled off
36. Assert the "3rd Party Tag Configuration" toggle is disabled
37. **[N]** Assert the Notifications toggle is toggled off → [Expected FAIL]

### Interactive State Changes

38. Assert the "Submit Form" button is enabled
39. Click the "Submit Form" button
40. Assert the "Submit Form" button is disabled
41. Wait for 4 seconds
42. Assert the "Now Enabled!" button is enabled

### ARIA Attributes

43. Assert the aria-expanded of the "Accordion Header (Expanded)" equals "true"
44. Assert the aria-expanded of the "Accordion Header (Collapsed)" equals "false"
45. Click the "Accordion Header (Collapsed)"
46. Assert the aria-expanded of that accordion header now equals "true"
47. Assert the role of the "Critical error" element equals "alert"
48. Assert the aria-label of the Close button equals "Close dialog"
49. Assert the aria-describedby of the username input equals "desc-text"
50. **[N]** Assert the aria-expanded of the "Accordion Header (Expanded)" equals "false" → [Expected FAIL]

### Data Attributes

51. Read the data-testid of the "Main Content" element → assert equals "main-content"
52. Read the data-status of the "Active" element → assert equals "active"
53. Read the data-count of the "Count: 8" element → assert greater than "5"
54. Read the data-index of the "Index: 3" element → assert less than "10"
55. Read the data-score of the "Score: 5" element → assert equals "5"
56. **[N]** Read the data-score of the "Score: 5" element → assert greater than "5" → [Expected FAIL — 5 is not > 5]
57. **[N]** Read the data-status of the "Active" element → assert equals "inactive" → [Expected FAIL]

### Standard HTML Attributes

58. Assert the placeholder of the "Search products..." input contains "Search"
59. Assert the href of the "Go to Dashboard" link contains "/dashboard"
60. Assert the href of the "Go to Dashboard" link starts with "https://"
61. Assert the href of the "Pricing" link does not contain "staging"
62. Assert the src of the LambdaTest Logo image ends with ".svg"
63. Assert the alt of the LambdaTest Logo image equals "LambdaTest Logo"
64. Assert the type of the text input equals "text"
65. Assert the title of the "Click to expand details" element equals "Click to expand details"
66. Assert the name of the csrf hidden input equals "csrf_token"
67. **[N]** Assert the alt of the LambdaTest Logo image equals "Google Logo" → [Expected FAIL]
68. **[N]** Assert the type of the text input equals "password" → [Expected FAIL]

### CSS — Color Normalization

69. Read the color of the "Color: red (hex)" element → assert equals "rgb(255, 0, 0)"
70. Read the color of the "Color: red (rgb)" element → assert equals "rgb(255, 0, 0)"
71. Read the color of the "Color: named red" element → assert equals "rgb(255, 0, 0)"
72. Assert the background-color of the "Background: blue" element is blue
73. Read the border-color of the "Border: green" element → assert contains "rgb(0, 128, 0)"
74. **[N]** Read the color of the "Color: named red" element → assert equals "rgb(0, 0, 255)" → [Expected FAIL]

### CSS — Typography

75. Read the font-size of the "Font: 16px" element → assert equals "16px"
76. Read the font-size of the "Font: 24px" element → assert equals "24px"
77. Read the font-family of the "Font: Arial" element → assert contains "Arial"
78. Read the font-weight of the "Font-weight: normal" element → assert equals "400"
79. Read the font-weight of the "Font-weight: bold" element → assert equals "700"
80. Read the font-style of the "Font-style: italic" element → assert equals "italic"
81. **[N]** Read the font-weight of the "Font-weight: bold" element → assert equals "400" → [Expected FAIL]

### CSS — Display / Visibility / Opacity

82. Read the display of the "Display: block" element → assert equals "block"
83. Read the display of the "Display: flex" element → assert equals "flex"
84. Read the visibility of the "Visibility: visible" element → assert equals "visible"
85. Read the visibility of the "Visibility: hidden" element → assert equals "hidden"
86. Read the opacity of the "Opacity: 0.5" element → assert equals "0.5"
87. Read the opacity of the "Opacity: 0" element → assert equals "0"
88. Read the opacity of the "Opacity: 1" element → assert equals "1"
89. **[N]** Read the display of the "Display: block" element → assert equals "flex" → [Expected FAIL]

### Negation Operators

90. Assert the "I am NOT disabled" button is not disabled
91. Assert the "I am NOT checked" checkbox is not checked
92. Assert the "I am NOT visible" element is not visible
93. Assert the type of the "Type is NOT password" input does not equal "password"
94. Assert the href of the "Production Link" does not contain "staging"
95. Assert the href of the "Secure Link" does not start with "http://"
96. **[N]** Assert the "I am NOT disabled" button is disabled → [Expected FAIL]
97. **[N]** Assert the href of the "Production Link" does not contain "lambdatest" → [Expected FAIL — it DOES contain it]

### Date Picker

98. Assert the date picker month heading is visible
99. Click the next month button in the date picker
100. Assert the date picker month heading updated

### Edge Cases

101. Read the data-value of the "Empty attribute" element → assert equals ""
102. Read the data-label of the "Unicode text" element → assert contains "Café"
103. Read the data-emoji of the "Emoji data" element → assert contains "🚀"
104. Read the data-content of the "Entities text" element → assert contains "$99"
105. **[N]** Read the data-value of the "Empty attribute" element → assert equals "something" → [Expected FAIL — actually empty]

### Dynamic / AJAX

106. Click the "Load Content" button
107. Wait for 3 seconds
108. Assert the AJAX loaded content is visible
109. Assert the "I will disappear in 3 seconds..." element is visible
110. Click the "Start Timer" button
111. Wait for 4 seconds
112. Assert the "I will disappear in 3 seconds..." element is not visible
113. Click the "Simulate Page Navigation" button
114. Wait for 2 seconds
115. Assert the post-navigation element is present

### XSS Safety

116. Read the data-content of the "XSS test element" → assert contains "script"

### Modal

117. Click the "Open Assertion Modal" button
118. Assert the modal title text equals "Assertion Target Modal"
119. Assert the modal submit button is enabled
120. Assert the data-action of the modal submit button equals "submit"
121. Assert the data-context of the modal input equals "modal"
122. Assert the data-status of the modal status element equals "open"
123. Click the "Cancel" button in the modal
124. **[N]** Assert the data-action of the modal submit button equals "cancel" → [Expected FAIL — actually "submit"]

### Iframe

125. Assert the enabled button inside the iframe is enabled
126. Assert the disabled button inside the iframe is disabled
127. Assert the placeholder of the iframe input is "Iframe input field"
128. Assert the data-context of the iframe input equals "iframe"
129. Assert the role of the iframe status element equals "status"
130. Assert the data-status of the iframe status element equals "active"
131. **[N]** Assert the disabled button inside the iframe is enabled → [Expected FAIL]

### Shadow DOM

132. Assert the enabled button inside the shadow DOM is enabled
133. Assert the disabled button inside the shadow DOM is disabled
134. Assert the shadow DOM input has a placeholder value

### Expected Failures

135. **[N]** Assert the "I am disabled" button is enabled → [Expected FAIL — it is disabled]
136. **[N]** Assert the color of the "Wrong color text" element is blue → [Expected FAIL — actually red]

### Consecutive Assertions (7 in a row)

137. Assert the "Enabled Button #1" element is enabled
138. Assert the data-value of the "Alpha Value" element equals "alpha"
139. Assert the color of the "Green Text" element is green
140. Assert the "Checked Item" checkbox is checked
141. Assert the "Not Disabled" button is not disabled
142. Assert the data-count of the "Count: 42" element is greater than "10"
143. Assert the background-color of the "Orange Box" element contains "102"

### Mixed Multi-Attribute

144. Assert the "Add to Cart" button is enabled
145. Assert the data-action of the "Add to Cart" button equals "primary"
146. Assert the aria-label of the "Add to Cart" button equals "Add to cart"
147. Assert the font-size of the "Add to Cart" button equals "14px"
148. Assert the font-weight of the "Add to Cart" button equals "600"
149. **[N]** Assert the "Add to Cart" button is disabled → [Expected FAIL]

### Boolean has_* Attributes

150. Read has_autofocus of the Search input → assert equals "true"
151. Read has_multiple of the skills select → assert equals "true"
152. Read has_alt of the Company Logo image → assert equals "true"
153. Read has_alt of the NoAlt image → assert equals "false"
154. Read has_required of the "This field is required" input → assert equals "true"
155. Read has_readonly of the "Read-only content" input → assert equals "true"
156. Read has_disabled of the "Submit (Disabled)" button → assert equals "true"
157. **[N]** Read has_alt of the NoAlt image → assert equals "true" → [Expected FAIL — no alt attribute]

### Inherited Disabled (Fieldset)

158. Assert the "Inherited disabled" button inside the disabled fieldset is disabled
159. Assert the input inside the disabled fieldset is disabled
160. Assert the select inside the disabled fieldset is disabled
161. **[N]** Assert the "Inherited disabled" button inside the disabled fieldset is enabled → [Expected FAIL]

### Extended ARIA

162. Assert the aria-label of the "ARIA Button" equals "Close dialog"
163. Assert the aria-expanded of the "ARIA Button" equals "false"
164. Assert the aria-haspopup of the "ARIA Button" equals "true"
165. Assert the aria-pressed of the "ARIA Button" equals "false"
166. Assert the aria-invalid of the email with error input equals "true"
167. Assert the aria-hidden of the "This is aria-hidden" element equals "true"
168. Assert the aria-live of the live region element equals "polite"
169. Assert the aria-required of the ARIA required email input equals "true"
170. **[N]** Assert the aria-haspopup of the "ARIA Button" equals "false" → [Expected FAIL — actually "true"]

### Roles

171. Assert the role of the navigation element equals "navigation"
172. Assert the role of the "Error: Something went wrong!" element equals "alert"

### Media Elements

173. Read has_controls of the Sample video → assert equals "true"
174. Read has_autoplay of the Background video → assert equals "true"
175. Read has_loop of the Background video → assert equals "true"
176. Read has_muted of the Background video → assert equals "true"
177. Read the src of the video source element → assert contains "mov_bbb.mp4"

---

## Page 2: realistic-app.html

178. Open the URL https://lt-qa-html-fixtures-pages.vercel.app/realistic-app.html

### Media Elements

179. Read has_controls of the Product onboarding tutorial video → assert equals "true"
180. Read has_autoplay of the ambient promo video → assert equals "true"
181. Read has_loop of the ambient promo video → assert equals "true"
182. Read has_muted of the ambient promo video → assert equals "true"
183. Read has_controls of the standup audio player → assert equals "true"
184. Read the alt of the TeamFlow Logo image → assert equals "TeamFlow Logo"
185. **[N]** Read has_controls of the Product onboarding tutorial video → assert equals "false" → [Expected FAIL]

### Account Settings — Profile Form

186. Assert the action of the profile form equals "/api/profile"
187. Assert the method of the profile form equals "POST"
188. Assert the Full Name input has a required attribute
189. Assert the aria-required of the Full Name input equals "true"
190. Assert the Bio textarea has a readonly attribute
191. Read has_multiple of the skills select → assert equals "true"
192. **[N]** Assert the action of the profile form equals "/api/settings" → [Expected FAIL]
193. **[N]** Assert the method of the profile form equals "GET" → [Expected FAIL]

### Notification Toggles

194. Assert the Email Notifications toggle is checked
195. Assert the Push Notifications toggle is not checked
196. Assert the Dark Mode toggle is checked
197. Assert the Sound Alerts toggle is not checked
198. Assert the Auto-assign Tasks toggle is checked
199. **[N]** Assert the Email Notifications toggle is not checked → [Expected FAIL]
200. **[N]** Assert the Push Notifications toggle is checked → [Expected FAIL]

### Disabled Billing Fieldset

201. Assert the Current Plan input inside the Billing fieldset is disabled
202. Assert the Seats input inside the Billing fieldset is disabled
203. Assert the "Upgrade Plan" button inside the Billing fieldset is disabled
204. Assert the billing cycle select inside the Billing fieldset is disabled
205. **[N]** Assert the "Upgrade Plan" button inside the Billing fieldset is enabled → [Expected FAIL — inherited disabled]

### System Status Alerts

206. Assert the role of the "Database connection timeout" error alert equals "alert"
207. Assert the role of the "Deployment v2.14.3 completed successfully" success alert equals "status"
208. Assert the aria-live of the "Deployment v2.14.3 completed" success alert equals "polite"
209. Assert the role of the "API rate limit at 85%" warning alert equals "alert"
210. Assert the aria-live of the "API rate limit" warning alert equals "assertive"
211. Assert the role of the "All systems operational" live region equals "status"
212. Assert the aria-live of the "All systems operational" live region equals "polite"
213. **[N]** Assert the role of the "Database connection timeout" error alert equals "status" → [Expected FAIL — actually "alert"]

### ARIA Dropdown & Bookmark

214. Assert the aria-haspopup of the "More Actions" button equals "true"
215. Assert the aria-expanded of the "More Actions" button equals "false"
216. Assert the aria-pressed of the "More Actions" button equals "false"
217. Assert the data-testid of the "More Actions" button equals "actions-dropdown"
218. Click the "More Actions" button
219. Assert the aria-expanded of the "More Actions" button equals "true"
220. Assert the aria-pressed of the Bookmark button equals "false"
221. Click the Bookmark button
222. Assert the aria-pressed of the Bookmark button equals "true"
223. **[N]** Assert the aria-haspopup of the "More Actions" button equals "false" → [Expected FAIL]

### Navigation & Accessibility

224. Assert the role of the settings navigation equals "navigation"
225. Assert the aria-label of the settings navigation equals "Settings navigation"
226. Assert the aria-hidden of the hidden helper element equals "true"
227. Assert the aria-invalid of the error field input equals "true"
228. Assert the aria-required of the required input equals "true"
229. **[N]** Assert the role of the settings navigation equals "banner" → [Expected FAIL]

### Typography & Fonts

230. Read the font-family of the "Serif font (Georgia)" text → assert contains "Georgia"
231. Read the font-family of the "Monospace font (Courier New)" text → assert contains "Courier New"
232. Read the font-family of the "Sans-serif font (Arial)" text → assert contains "Arial"
233. Read the font-weight of the "Bold text (700)" → assert equals "700"
234. Read the font-weight of the "Normal text (400)" → assert equals "400"
235. Read the font-weight of the "Light text (300)" → assert equals "300"
236. Read the font-style of the "Italic text" → assert equals "italic"
237. Read the font-style of the "Normal style text" → assert equals "normal"
238. Read the font-size of the "Large text (24px)" → assert equals "24px"
239. Read the font-size of the "Small text (12px)" → assert equals "12px"
240. Read the font-size of the "Medium text (18px)" → assert equals "18px"
241. Read the font-size of the "Heading" → assert equals "36px"
242. **[N]** Read the font-weight of the "Bold text (700)" → assert equals "400" → [Expected FAIL]
243. **[N]** Read the font-style of the "Italic text" → assert equals "normal" → [Expected FAIL]

### Color Assertions

244. Read the color of the "This text is blue" text → assert equals "rgb(37, 99, 235)"
245. Read the color of the "This text is red" text → assert equals "rgb(239, 68, 68)"
246. Read the color of the "This text is green" text → assert equals "rgb(22, 163, 74)"
247. Read the background-color of the "Yellow background" → assert equals "rgb(253, 224, 71)"
248. Read the background-color of the "Indigo background" → assert equals "rgb(99, 102, 241)"
249. Read the border-color of the "Red border" → assert contains "rgb(239, 68, 68)"
250. Read the border-color of the "Green border" → assert contains "rgb(22, 163, 74)"
251. Read the display of the "Block element" → assert equals "block"
252. Read the display of the "Inline element" → assert equals "inline"
253. Read the visibility of the "This element is visible" → assert equals "visible"
254. Read the opacity of the "50% opacity" element → assert equals "0.5"
255. Read the opacity of the "100% opacity" element → assert equals "1"
256. **[N]** Read the color of the "This text is blue" text → assert equals "rgb(239, 68, 68)" → [Expected FAIL — blue not red]
257. **[N]** Read the background-color of the "Yellow background" → assert equals "rgb(99, 102, 241)" → [Expected FAIL — yellow not indigo]

### If/Else — Role Permissions

258. Select "Viewer" from the User Role dropdown
259. If the role badge text equals "Viewer" then assert the Read permission has data-perm equal to "true"
260. If the role badge text equals "Viewer" then assert the Write permission has data-perm equal to "false"
261. If the role badge text equals "Viewer" then assert the Delete permission has data-perm equal to "false"
262. If the role badge text equals "Viewer" then assert the Admin Panel permission has data-perm equal to "false"
263. Select "Admin" from the User Role dropdown
264. If the role badge text equals "Admin" then assert the Write permission has data-perm equal to "true"
265. If the role badge text equals "Admin" then assert the Delete permission has data-perm equal to "true"
266. If the role badge text equals "Admin" then assert the Admin Panel permission has data-perm equal to "true"
267. Select "Editor" from the User Role dropdown
268. If the role badge text equals "Editor" then assert the Write permission has data-perm equal to "true"
269. If the role badge text equals "Editor" then assert the Delete permission has data-perm equal to "false"
270. If the role badge text equals "Editor" then assert the Admin Panel permission has data-perm equal to "false"
271. Select "Guest" from the User Role dropdown
272. If the role badge text equals "Guest" then assert the Read permission has data-perm equal to "false"
273. If the role badge text equals "Guest" then assert the Write permission has data-perm equal to "false"
274. If the role badge text equals "Guest" then assert the Admin Panel permission has data-perm equal to "false"
275. **[N]** If the role badge text equals "Guest" then assert the Read permission has data-perm equal to "true" → [Expected FAIL — Guest has no read]

### If/Else — Server Temperature

276. Set the temperature slider value to 55
277. If the temperature display shows "55°C" then assert the temperature status text equals "Normal"
278. If the data-temp-status equals "normal" then assert the temperature display shows "55°C"
279. Set the temperature slider value to 80
280. If the temperature display shows "80°C" then assert the temperature status text equals "Warning"
281. If the data-temp-status equals "warning" then assert the temperature display shows "80°C"
282. Set the temperature slider value to 95
283. If the temperature display shows "95°C" then assert the temperature status text equals "Critical"
284. If the data-temp-status equals "critical" then assert the temperature display shows "95°C"
285. Set the temperature slider value to 45
286. If the temperature display shows "45°C" then assert the temperature status text equals "Normal"
287. **[N]** If the temperature display shows "45°C" then assert the temperature status text equals "Critical" → [Expected FAIL — 45°C is Normal]

### If/Else — Password Strength

288. Assert the password label text equals "No password"
289. If the password label text equals "No password" then assert the password score text equals "Score: 0/5"
290. If the password score text equals "Score: 0/5" then assert the "At least 8 characters" criterion has data-met equal to "false"
291. Type "abc" in the password input
292. If the password label text equals "Weak" then assert the "Contains lowercase" criterion has data-met equal to "true"
293. If the password label text equals "Weak" then assert the "At least 8 characters" criterion has data-met equal to "false"
294. If the password label text equals "Weak" then assert the "Contains uppercase" criterion has data-met equal to "false"
295. Clear the password input
296. Type "Str0ng!Pass" in the password input
297. If the password label text equals "Strong" then assert the password score text equals "Score: 5/5"
298. If the password score text equals "Score: 5/5" then assert the "At least 8 characters" criterion has data-met equal to "true"
299. If the password score text equals "Score: 5/5" then assert the "Contains uppercase" criterion has data-met equal to "true"
300. If the password score text equals "Score: 5/5" then assert the "Contains number" criterion has data-met equal to "true"
301. If the password score text equals "Score: 5/5" then assert the "Contains special char" criterion has data-met equal to "true"
302. **[N]** If the password label text equals "Strong" then assert the password score text equals "Score: 2/5" → [Expected FAIL]

### If/Else — Inventory Stock Level

303. If the stock badge text equals "Low Stock" then assert the data-stock-level equals "low"
304. If the data-stock-level equals "low" then assert the stock action text equals "Reorder recommended"
305. Clear the stock input and type "150"
306. If the stock badge text equals "In Stock" then assert the data-stock-level equals "normal"
307. If the data-stock-level equals "normal" then assert the stock action text equals "Stock level healthy"
308. Clear the stock input and type "300"
309. If the stock badge text equals "Overstocked" then assert the data-stock-level equals "over"
310. If the data-stock-level equals "over" then assert the stock action text equals "Consider reducing orders"
311. **[N]** If the stock badge text equals "Overstocked" then assert the data-stock-level equals "low" → [Expected FAIL]

### If/Else — Build Pipeline Status

312. If the build status text equals "Running" then assert the data-step-status of the Checkout step equals "done"
313. If the build status text equals "Running" then assert the data-step-status of the Install dependencies step equals "done"
314. If the build status text equals "Running" then assert the data-step-status of the Lint step equals "done"
315. If the build status text equals "Running" then assert the data-step-status of the Running tests step equals "running"
316. If the build status text equals "Running" then assert the data-step-status of the Build step equals "pending"
317. If the build status text equals "Running" then assert the data-step-status of the Deploy step equals "pending"
318. Select "Failed" from the Build Status dropdown
319. If the build status text equals "Failed" then assert the Retry button is visible
320. If the build status text equals "Failed" then assert the data-step-status of the Running tests step equals "failed"
321. If the build status text equals "Failed" then assert the data-step-status of the Build step equals "skipped"
322. Select "Success" from the Build Status dropdown
323. If the build status text equals "Success" then assert the data-step-status of the Deploy step equals "done"
324. If the build status text equals "Success" then assert the Retry button is not visible
325. **[N]** If the build status text equals "Success" then assert the Retry button is visible → [Expected FAIL]
326. **[N]** If the build status text equals "Success" then assert the data-step-status of the Deploy step equals "pending" → [Expected FAIL]

---

## Summary

| Category | Steps |
|----------|------:|
| Element States (enabled/disabled/visible/hidden/clickable/present/checked/toggle) | 42 |
| DOM Attributes (ARIA/data-*/href/src/alt/placeholder/role) | 52 |
| CSS Properties (color/font/display/visibility/opacity) | 32 |
| Negation Operators | 8 |
| Edge Cases (empty/unicode/emoji/XSS/AJAX/dynamic) | 16 |
| Modal / Iframe / Shadow DOM | 13 |
| Expected Failures | 2 |
| Boolean has_* Attributes | 8 |
| Inherited Disabled (fieldset) | 8 |
| Media (video/audio/image attributes) | 8 |
| Typography & Fonts | 16 |
| Color Assertion Targets | 16 |
| Consecutive & Mixed multi-attribute | 13 |
| Date Picker | 3 |
| Navigation & Accessibility | 8 |
| If/Else: Role Permissions | 18 |
| If/Else: Temperature | 12 |
| If/Else: Password Strength | 15 |
| If/Else: Stock Level | 9 |
| If/Else: Build Pipeline | 15 |
| Negative [N] cases (included above) | ~30 |
| **Total** | **326** |
