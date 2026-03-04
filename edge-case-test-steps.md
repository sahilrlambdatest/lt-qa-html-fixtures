# Edge Case Test Steps — Assertion Engine Boundary Tests

> **URL**: https://lt-qa-html-fixtures-pages.vercel.app/assertion-edge-cases.html
> Steps marked **[N]** are **negative cases** — expected to FAIL.
> Steps marked **[?]** are **ambiguous** — behavior depends on engine implementation.

---

### Navigate

1. Open the URL https://lt-qa-html-fixtures-pages.vercel.app/assertion-edge-cases.html

---

### Section 1 — Boolean Attribute Edge Cases (`#boolean-attrs`)

2. Assert the "Bare Disabled" button is disabled
3. Assert the "Disabled Equals Disabled" button is disabled
4. Assert the "Disabled False" button is disabled
5. Assert the "Disabled Empty" button is disabled
6. Assert the "Not Disabled" button is enabled
7. **[?]** Assert the "Aria Disabled Only" button is disabled
8. **[N]** Assert the "Disabled False" button is enabled
9. **[N]** Assert the "Not Disabled" button is disabled
10. Assert the "Bare Disabled" button has a disabled attribute
11. Assert the "Not Disabled" button does not have a disabled attribute
12. Assert the aria-disabled of the "Aria Disabled Only" button equals "true"

---

### Section 2 — Case Sensitivity (`#case-sensitivity`)

13. Assert the data-status of the "Case Mixed Element" equals "Active"
14. Assert the data-role of the "Case Mixed Element" equals "Admin"
15. **[?]** Assert the data-status of the "Case Mixed Element" equals "active"
16. **[?]** Assert the data-role of the "Case Mixed Element" equals "admin"
17. Assert the data-code of the "Case Upper Element" equals "ERR_TIMEOUT"
18. **[N]** Assert the data-code of the "Case Upper Element" equals "err_timeout"
19. Assert the data-code of the "Case Lower Element" equals "err_timeout"
20. **[N]** Assert the data-code of the "Case Lower Element" equals "ERR_TIMEOUT"
21. Assert the href of the "Dashboard Link" contains "LambdaTest"
22. **[?]** Assert the href of the "Dashboard Link" contains "lambdatest"
23. Assert the aria-label of the "Close Case Button" equals "Close Dialog"
24. **[?]** Assert the aria-label of the "Close Case Button" equals "close dialog"

---

### Section 3 — Whitespace in Attributes (`#whitespace`)

25. Assert the data-role of the "Leading Spaces Element" contains "admin"
26. **[?]** Assert the data-role of the "Leading Spaces Element" equals "admin"
27. Assert the data-role of the "Leading Spaces Element" equals "   admin"
28. Assert the data-role of the "Trailing Spaces Element" contains "editor"
29. **[?]** Assert the data-role of the "Trailing Spaces Element" equals "editor"
30. Assert the data-role of the "Trailing Spaces Element" equals "editor   "
31. Assert the data-value of the "Padded Value Element" contains "hello world"
32. Assert the data-label of the "Multi Space Element" contains "York"
33. **[?]** Assert the data-label of the "Multi Space Element" equals "New York City"
34. Assert the data-value of the "Whitespace Only Element" equals "   "
35. **[?]** Assert the data-value of the "Whitespace Only Element" equals ""

---

### Section 4 — Numeric Edge Cases (`#numeric-edges`)

#### Zero

36. Assert the data-count of the "Zero Count Element" equals "0"
37. Assert the data-count of the "Zero Count Element" is greater than "-1"
38. Assert the data-count of the "Zero Count Element" is at most "0"
39. Assert the data-count of the "Zero Count Element" is at least "0"
40. **[N]** Assert the data-count of the "Zero Count Element" is greater than "0"
41. **[N]** Assert the data-count of the "Zero Count Element" is less than "0"

#### Negative Numbers

42. Assert the data-temperature of the "Negative Value Element" equals "-15"
43. Assert the data-temperature of the "Negative Value Element" is greater than "-20"
44. Assert the data-temperature of the "Negative Value Element" is less than "0"
45. Assert the data-temperature of the "Negative Value Element" is at least "-15"
46. Assert the data-offset of the "Negative Value Element" is greater than "-5"
47. **[N]** Assert the data-temperature of the "Negative Value Element" is greater than "-10"
48. **[N]** Assert the data-temperature of the "Negative Value Element" is greater than "0"

#### Decimals

49. Assert the data-rating of the "Decimal Value Element" equals "4.7"
50. Assert the data-rating of the "Decimal Value Element" is greater than "4"
51. Assert the data-rating of the "Decimal Value Element" is greater than "4.6"
52. Assert the data-rating of the "Decimal Value Element" is at least "4.7"
53. Assert the data-rating of the "Decimal Value Element" is less than "5"
54. Assert the data-price of the "Decimal Value Element" is greater than "19"
55. Assert the data-price of the "Decimal Value Element" is at most "19.99"
56. **[N]** Assert the data-rating of the "Decimal Value Element" is greater than "4.7"
57. **[N]** Assert the data-rating of the "Decimal Value Element" is at least "4.8"

#### Leading Zeros

58. Assert the data-code of the "Leading Zero Element" equals "007"
59. **[?]** Assert the data-code of the "Leading Zero Element" is greater than "6"
60. **[?]** Assert the data-code of the "Leading Zero Element" equals "7"

#### Large Numbers

61. Assert the data-bytes of the "Large Number Element" is greater than "9999999998"
62. Assert the data-bytes of the "Large Number Element" equals "9999999999"

#### Boundary (at least / at most same value)

63. Assert the data-level of the "Boundary Element" is at least "50"
64. Assert the data-level of the "Boundary Element" is at most "50"
65. Assert the data-level of the "Boundary Element" equals "50"
66. **[N]** Assert the data-level of the "Boundary Element" is greater than "50"
67. **[N]** Assert the data-level of the "Boundary Element" is less than "50"

---

### Section 5 — Empty vs Missing Attribute (`#empty-vs-missing`)

68. Assert the "Empty Aria Label" button has an aria-label attribute
69. Assert the aria-label of the "Empty Aria Label" button equals ""
70. Assert the "No Aria Label" button does not have an aria-label attribute
71. Assert the "Empty Data Value" element has a data-value attribute
72. Assert the data-value of the "Empty Data Value" element equals ""
73. Assert the "No Data Value" element does not have a data-value attribute
74. Assert the "Empty Src Image" image has a src attribute
75. Assert the "Multi Empty Attrs" element has a data-a attribute
76. Assert the "Multi Empty Attrs" element has a data-b attribute
77. Assert the data-a of the "Multi Empty Attrs" element equals ""
78. **[N]** Assert the "No Aria Label" button has an aria-label attribute
79. **[N]** Assert the "No Data Value" element has a data-value attribute

---

### Section 6 — CSS Inherited Values (`#css-inheritance`)

80. Assert the color of the "Inherited Color Child" element equals "rgb(220, 38, 38)"
81. Assert the font-size of the "Inherited Font Child" element equals "20px"
82. Assert the color of the "Override Child" element equals "rgb(37, 99, 235)"
83. Assert the font-size of the "Override Child" element equals "14px"
84. Assert the color of the "Deep Inherited Text" element equals "rgb(22, 163, 74)"
85. **[N]** Assert the color of the "Inherited Color Child" element equals "rgb(0, 0, 0)"
86. **[N]** Assert the font-size of the "Override Child" element equals "20px"

---

### Section 7 — RGBA & Color Formats (`#color-formats`)

87. Assert the background-color of the "RGBA Background" element equals "rgba(239, 68, 68, 0.5)"
88. Assert the background-color of the "RGBA Opaque" element equals "rgb(59, 130, 246)"
89. **[?]** Assert the background-color of the "RGBA Opaque" element equals "rgba(59, 130, 246, 1)"
90. Assert the background-color of the "RGBA Transparent" element equals "rgba(0, 0, 0, 0)"
91. Assert the background-color of the "Named Alpha Color" element equals "rgba(255, 0, 0, 0.3)"
92. **[N]** Assert the background-color of the "RGBA Background" element equals "rgb(239, 68, 68)"

---

### Section 8 — SVG Attributes (`#svg-attrs`)

93. Assert the viewBox of the "Check icon" SVG equals "0 0 24 24"
94. Assert the stroke of the "Check icon" SVG equals "rgb(34, 197, 94)"
95. Assert the stroke-width of the "Check icon" SVG equals "2"
96. Assert the fill of the "Check icon" SVG equals "none"
97. Assert the aria-label of the "Check icon" SVG equals "Check icon"
98. Assert the data-icon of the "Settings icon" SVG equals "settings"
99. Assert the data-size of the "Settings icon" SVG equals "md"
100. Assert the aria-label of the "Arrow icon" SVG equals "Arrow icon"
101. **[N]** Assert the stroke-width of the "Check icon" SVG equals "3"
102. **[N]** Assert the data-icon of the "Settings icon" SVG equals "profile"

---

### Section 9 — Disambiguation (`#disambiguation`)

103. Assert the data-action of the first "Delete" button equals "confirm-delete"
104. Assert the data-context of the first "Delete" button equals "danger"
105. Assert the data-action of the second "Delete" button equals "undo-delete"
106. Assert the data-form of the first "Submit" button equals "form-a"
107. Assert the data-form of the second "Submit" button equals "form-b"
108. Assert the data-section of the first "Active" text equals "header"
109. Assert the data-section of the second "Active" text equals "sidebar"

---

### Section 10 — Text Transform & Contenteditable (`#text-transform`)

110. Assert the text-transform of the "viewer role label" element equals "uppercase"
111. Assert the text-transform of the "john doe smith" element equals "capitalize"
112. Assert the text-transform of the "ERROR_CODE_TIMEOUT" element equals "lowercase"
113. Assert the data-editable of the "Edit this text" element equals "true"
114. Assert the data-editable of the "Non-editable content" element equals "false"
115. Type "Hello World" in the "Edit this text" contenteditable element
116. Assert the "Edit this text" element contains "Hello World"

---

### Section 11 — Hidden Element Attributes (`#hidden-attrs`)

117. Assert the data-status of the "Hidden Config" element equals "archived"
118. Assert the data-priority of the "Hidden Config" element equals "low"
119. Assert the data-state of the "Invisible Status" element equals "pending"
120. Assert the data-version of the "Invisible Status" element equals "2.1"
121. Assert the role of the "Ghost Element" element equals "status"
122. Assert the data-count of the "Ghost Element" element equals "42"
123. Assert the data-count of the "Ghost Element" element is greater than "40"

---

### Section 12 — CSS Computed vs Authored (`#css-computed`)

124. Assert the font-weight of the "Bold Text Computed" element equals "700"
125. Assert the font-weight of the "Normal Text Computed" element equals "400"
126. Assert the display of the "Inline Block Tag" element equals "inline-block"
127. Assert the opacity of the "75% Opacity" element equals "0.75"
128. Assert the font-size of the "Em Sized Text" element equals "24px"
129. **[N]** Assert the font-weight of the "Bold Text Computed" element equals "bold"
130. **[N]** Assert the font-size of the "Em Sized Text" element equals "1.5em"

---

### Section 13 — Assert After Interaction (`#interaction-assert`)

131. Assert the data-state of the "Toggle Data State" checkbox equals "unchecked"
132. Click the "Toggle Data State" checkbox
133. Assert the data-state of the "Toggle Data State" checkbox equals "checked"

134. Assert the data-selected of the dropdown equals "none"
135. Select "Option B" from the dropdown
136. Assert the data-selected of the dropdown equals "option-b"

137. Assert the data-filled of the input equals "false"
138. Type "test input" in the "Type something..." input
139. Assert the data-filled of the input equals "true"

140. Assert the data-clicks of the "Click Counter" button equals "0"
141. Click the "Click Counter" button
142. Click the "Click Counter" button
143. Click the "Click Counter" button
144. Assert the data-clicks of the "Click Counter" button equals "3"
145. Assert the data-clicks of the "Click Counter" button is greater than "2"
146. Assert the data-clicks of the "Click Counter" button is at most "3"

147. Assert the data-state of the "Double Click Me" button equals "idle"
148. Double click the "Double Click Me" button
149. Assert the data-state of the "Double Click Me" button equals "activated"

---

## Summary — 149 steps

| Section | Steps | What it tests |
|---------|------:|---------------|
| 1. Boolean Attributes | 11 | disabled/disabled="false"/disabled=""/aria-disabled |
| 2. Case Sensitivity | 12 | Mixed/upper/lower case in data attrs, href, aria-label |
| 3. Whitespace | 11 | Leading/trailing/internal spaces, tabs, whitespace-only |
| 4. Numeric Edges | 32 | Zero, negative, decimal, leading zeros, large numbers, boundary |
| 5. Empty vs Missing | 12 | Present-but-empty vs absent attribute distinction |
| 6. CSS Inheritance | 7 | Child inherits color/font-size from parent, override, deep nesting |
| 7. RGBA Colors | 6 | Semi-transparent, opaque, transparent, HSL normalization |
| 8. SVG Attributes | 10 | viewBox, stroke, fill, stroke-width, data-* on SVG |
| 9. Disambiguation | 7 | Same text elements with different data attributes |
| 10. Text Transform | 7 | uppercase/capitalize/lowercase, contenteditable |
| 11. Hidden Attrs | 7 | data-* and ARIA on display:none/visibility:hidden/opacity:0 |
| 12. CSS Computed | 7 | bold→700, normal→400, em→px, inline-block, opacity |
| 13. Interaction Assert | 19 | Checkbox→data, select→data, type→data, counter, dblclick |
| **Total** | **149** | |

### Legend

| Marker | Meaning |
|--------|---------|
| (none) | Positive — expected to PASS |
| **[N]** | Negative — expected to FAIL |
| **[?]** | Ambiguous — depends on engine (case-sensitive? whitespace-trimmed?) |
