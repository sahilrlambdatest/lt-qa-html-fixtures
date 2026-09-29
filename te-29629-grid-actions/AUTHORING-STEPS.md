# TE-29629 — KaneAI authoring steps

> **Base URL:** https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/
> **Where:** dev `https://lt-kaneai-v-kane-dev.lambdatestinternal.com/agent` → Desktop Browser → Author test. Paste one step per instruction.
> Case ids (TC-xx) refer to [TEST-CASES.md](TEST-CASES.md).
> **[N]** = negative: the step is *expected* to fail or find nothing. **[?]** = behaviour not defined, record what happens.

**If a step errors** (`ELEMENT_ERROR`), Kane pauses the session and queues everything after it. For the negative steps that's the expected outcome: record it, then start a new session (or delete the failed step and Resume) to continue.

**Scrolling:** Kane only acts on what is visible and does not scroll to find a target (verified on stage and dev), so every grid below the first one on a page is preceded by a "Scroll to the … section" step. Avoid "Scroll up/down until … is fully visible": on dev and stage that wording failed with ELEMENT_ERROR, while "Scroll to the … section" worked. Kane scrolls DOWN by default, so a section above the current view needs "Scroll up to the … section". The Last action bar is sticky and stays on screen while you scroll.

**Why every click is followed by an assertion:** the bug was a click that "succeeded" on the empty middle of the cell, so a green click step proves nothing. The page's **Last action** bar shows what was really hit: `EDIT — <name>`, or `MISS — <name>` for the bug.
If an assertion with `—` (em dash) is awkward to type, use `contains "EDIT" and "Priya Sharma"` instead.

---

## Session 1 — Core repro (TC-01 … TC-04, TC-31)

1. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/a-core.html
2. Click the edit icon in the Action column for Priya Sharma
3. Assert that the Last action text contains "EDIT — Priya Sharma (grid A1)"
4. Assert that the dialog "Edit Priya Sharma" is visible
5. Clear the Full name field and type "Priya Sharma QA"
6. Click the Save changes button
7. Assert that the Last action text contains "SAVED — Priya Sharma QA (grid A1)"
8. Assert that the text "Priya Sharma QA" is visible on the page
9. Click the edit icon in the Action column for Aarav Mehta
10. Assert that the Last action text contains "EDIT — Aarav Mehta (grid A1)"
11. Click the Cancel button
12. Click the pencil icon for Yuki Tanaka
13. Assert that the Last action text contains "EDIT — Yuki Tanaka (grid A1)"
14. Click the Cancel button
15. Click edit in the Action column of the row whose email is fatima.zahra@renlab.test
16. Assert that the Last action text contains "EDIT — Fatima Zahra (grid A1)"
17. Click the Cancel button
18. Click the edit button in row 7 of the Customers grid
19. Assert that the Last action text contains "EDIT — Noah Williams (grid A1)"
20. Click the Cancel button
21. Click the edit icon in the Customers grid for Sofía García
22. Assert that the Last action text contains "EDIT — Sofía García (grid A1)"
23. Click the Cancel button
24. Click the pencil icon for Liam O'Connor
25. Assert that the Last action text contains "EDIT — Liam O'Connor (grid A1)"
26. Click the Cancel button
27. Scroll to the Projects section
28. Click the edit icon for Amara Okafor in the Projects grid
29. Assert that the Last action text contains "EDIT — Amara Okafor (grid A2)"
30. Click the Cancel button

Step 28 is the **control**: it must pass on stage too. If it fails, the page or session is broken, not the fix.

---

## Session 2 — Several icons in one cell (TC-05 … TC-07, TC-27)

1. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/b-multi-icon.html
2. Click the edit icon for Chen Wei in the Leads grid
3. Assert that the Last action text contains "EDIT — Chen Wei (grid B1)"
4. Click the Cancel button
5. Click the view icon for Aarav Mehta in the Leads grid
6. Assert that the Last action text contains "VIEW — Aarav Mehta (grid B1)"
7. Click the Close button
8. Click the three-dot menu icon for Yuki Tanaka in the Leads grid
9. Assert that the Last action text contains "MORE — Yuki Tanaka (grid B1)"
10. Click the duplicate icon for Noah Williams in the Leads grid
11. Assert that the Last action text contains "COPY — Noah Williams (grid B1)"
12. Click the delete icon for Sofía García in the Leads grid
13. Assert that the dialog "Delete Sofía García?" is visible
14. Click the Cancel button
15. Assert that the Last action text contains "DELETE CANCELLED — Sofía García (grid B1)"
16. Scroll to the Appointments section
17. Click the edit icon for Arjun Nair in the Appointments grid
18. Assert that the Last action text contains "EDIT — Arjun Nair (grid B2)"
19. Assert that the Last action text does not contain "DELETE"
20. Click the Cancel button
21. Click the delete icon for Olivia Brown in the Appointments grid
22. Click the Delete button in the dialog
23. Assert that the Last action text contains "DELETED — Olivia Brown (grid B2)"
24. Assert that the text "Olivia Brown" is not visible on the page
25. Scroll up to the Leads section
26. **[?]** Click the icon in the Action column for Chen Wei in the Leads grid — *record which icon the Last action bar shows*

The middle of the B1 cell is the Duplicate icon, so an unrefined click on step 2 would log `COPY`. On stage (2026-09-29) the model found the pencil anyway, so step 2 does **not** reproduce the bug there; it only checks that dev didn't regress. Pre-fix, step 17 logs `MISS`.

---

## Session 3 — Other containers and control types (TC-08 … TC-12)

1. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/d-containers.html
2. Click the edit icon for Sofía García's notification rule
3. Assert that the Last action text contains "EDIT — Sofía García (grid D1)"
4. Click the Cancel button
5. Click the edit icon for Noah Williams in the Crew roster
6. Assert that the Last action text contains "EDIT — Noah Williams (grid D2)"
7. Click the Cancel button
8. Scroll to the Warehouse contacts section
9. Click the edit icon for Amara Okafor in Warehouse contacts
10. Assert that the Last action text contains "EDIT — Amara Okafor (grid D3)"
11. Click the Cancel button
12. Click the download icon for Lucas Silva in Warehouse contacts
13. Assert that the Last action text contains "DOWNLOAD — Lucas Silva (grid D3)"
14. Scroll to the Sales reps section
15. Click the edit icon on Hana Kim's card
16. Assert that the Last action text contains "EDIT — Hana Kim (grid D4)"
17. Click the Cancel button
18. Scroll to the Access control section
19. Click the Select checkbox for Omar Haddad
20. Assert that the Last action text contains "SELECT ON — Omar Haddad (grid D5)"
21. Turn on the Active switch for Maya Patel
22. Assert that the Last action text contains "ACTIVE ON — Maya Patel (grid D5)"
23. Click the open-profile link icon for Ines Duarte
24. Assert that the Last action text contains "OPEN LINK — Ines Duarte (grid D5)"
25. Click the edit icon for Zoe Martin in Access control
26. Assert that the Last action text contains "EDIT — Zoe Martin (grid D5)"
27. Click the Cancel button

Pre-fix, step 9 logs `DOWNLOAD — Amara Okafor` (the middle of the cell is the Download icon).

---

## Session 4 — Geometry (TC-13 … TC-18)

1. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/e-geometry.html
2. Click the edit icon for Liam O'Connor in Tiny icons
3. Assert that the Last action text contains "EDIT — Liam O'Connor (grid E1)"
4. Click the Cancel button
5. Click the delete icon for Sofía García in Tiny icons
6. Assert that the Last action text contains "DELETE — Sofía García (grid E1)"
7. Click the Cancel button
8. Scroll to the Wide action column section
9. Click the edit icon for Noah Williams in the Wide action column grid
10. Assert that the Last action text contains "EDIT — Noah Williams (grid E2)"
11. Click the Cancel button
12. Scroll to the Tall rows section
13. Click the edit icon for Mateo Rossi in Tall rows
14. Assert that the Last action text contains "EDIT — Mateo Rossi (grid E3)"
15. Click the Cancel button
16. Scroll to the Dense grid section
17. Click the edit icon for Tomás Novak in the Dense grid
18. Assert that the Last action text contains "EDIT — Tomás Novak (grid E4)"
19. Click the Cancel button
20. Click the edit icon for Lucas Silva in the Dense grid
21. Assert that the Last action text contains "EDIT — Lucas Silva (grid E4)"
22. Click the Cancel button
23. Click the edit icon for Chloe Dupont in the Dense grid
24. Assert that the Last action text contains "EDIT — Chloe Dupont (grid E4)"
25. Click the Cancel button
26. Scroll to the Wide grid (horizontal scroll) section
27. Scroll the Wide grid to the right and click the edit icon for Mei Lin
28. Assert that the Last action text contains "EDIT — Mei Lin (grid E5)"
29. Click the Cancel button
30. Scroll to the Pinned grid (horizontal scroll) section
31. Click the edit icon for Sara Nilsen in the Pinned grid
32. Assert that the Last action text contains "EDIT — Sara Nilsen (grid E6)"
33. Click the Cancel button

In the dense grid (steps 17–24), a hit on a **neighbouring** row (e.g. Grace Lee or Nina Petrova for Tomás Novak) is a fail, even though the step is green.

---

## Session 5 — State (TC-19 … TC-24)

Keep steps 1–4 first: the Late render icons only appear 5 s after the page loads (the scroll step usually takes longer than that, so this mostly checks the grid once loaded).

1. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/f-state.html
2. Scroll to the Late render section
3. Click the edit icon for Diego Torres in the Late render grid
4. Assert that the Last action text contains "EDIT — Diego Torres (grid F3)"
5. Click the Cancel button
6. Scroll up to the Locked rows section
7. Click the edit icon for Priya Sharma in Locked rows
8. Assert that the Last action text contains "BLOCKED — Priya Sharma (grid F1)"
9. Assert that no dialog titled "Edit Priya Sharma" is visible
10. Scroll to the Inline edit section
11. Click the edit icon for Maya Patel in Inline edit
12. Assert that the Last action text contains "EDIT — Maya Patel (grid F4)"
13. Clear the name input in the Inline edit grid and type "Maya Patel QA"
14. Click the save (check) icon for that row
15. Assert that the Last action text contains "SAVED — Maya Patel QA (grid F4)"
16. Assert that the text "Maya Patel QA" is visible on the page
17. Click the edit icon for Jonas Weber in Inline edit
18. Click the cancel (x) icon for Jonas Weber
19. Assert that the Last action text contains "EDIT CANCELLED — Jonas Weber (grid F4)"
20. Scroll up to the Hover reveal section
21. **[?]** Hover over Amara Okafor's row in Hover reveal and click the edit icon
22. **[?]** Assert that the Last action text contains "EDIT — Amara Okafor (grid F2)"
23. Click the Cancel button
24. Scroll up to the Locked rows section
25. **[N]** Click the edit icon for Noah Williams in Locked rows — *his Action cell is empty; expected: Kane reports it isn't there*
26. Assert that the Last action text does not contain "EDIT — Fatima Zahra" and does not contain "EDIT — Yuki Tanaka"

Step 25 passes if Kane fails the step or logs `MISS — Noah Williams`. It fails if **any other row** gets an EDIT.

---

## Session 6 — Regression: labelled controls must behave as before (TC-28 … TC-32)

1. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/c-labelled.html
2. Click the Edit button for Chen Wei in Team members
3. Assert that the Last action text contains "EDIT — Chen Wei (grid C1)"
4. Click the Cancel button
5. Click the delete button for Fatima Zahra in Team members
6. Assert that the Last action text contains "DELETE — Fatima Zahra (grid C1)"
7. Click the Cancel button
8. Click on the email of Yuki Tanaka
9. Assert that the Last action text contains "CELL — Yuki Tanaka (grid C1)"
10. Click on the Role of Priya Sharma
11. Assert that the Last action text contains "CELL — Priya Sharma (grid C1)"
12. Scroll to the Installers section
13. Select "On hold" in the Status dropdown for Lucas Silva
14. Assert that the Last action text contains "STATUS → On hold — Lucas Silva (grid C2)"
15. Click the edit button for Emma Johansson in Installers
16. Assert that the Last action text contains "EDIT — Emma Johansson (grid C2)"
17. Click the Cancel button
18. Click the Reset lab button
19. Assert that the Last action text is "none yet"

These steps should take about as long as on stage (a single vision call). A noticeably slower click step here suggests the refinement fired when it shouldn't have.

---

## Session 7 — Negative (TC-25, TC-26)

Both clicks are **expected to fail**. A failed step is the PASS outcome here, so continue past it.

1. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/a-core.html
2. **[N]** Click the edit icon for John Doe in the Customers grid
3. Assert that the Last action text is "none yet"
4. **[N]** Click the delete icon for Chen Wei in the Customers grid — *grid A1 has no delete icon*
5. Assert that the Last action text does not contain "EDIT — Chen Wei"

If step 4 opens "Edit Chen Wei", Kane clicked the pencil while claiming it was a delete icon. Report that.

---

## Session 8 — Save, re-run, and manual interaction (TC-33, TC-34, TC-35)

1. Save **Session 1** as a test case.
2. Re-open it in the playground and re-run all steps. Every assertion must pass again.
3. New session: Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/a-core.html
4. Using **Manual Interaction**, click the pencil for Chen Wei yourself
5. Assert that the Last action text contains "EDIT — Chen Wei (grid A1)"
6. Save, re-run the recorded step (the ticket's second symptom), and check that step 5 passes again
7. **[?]** Generate code for the Session 1 test → Code tab → Execute & Verify. Record whether the job passes and which locator codegen used for the pencil.

---

## Session 9 — Stage baseline, then 3× on dev (TC-01, TC-05, TC-10)

Run this **on stage first**, where the expected results are MISS, COPY and DOWNLOAD. Then run it three times on dev, where all three steps must show EDIT every time (3/3).

1. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/a-core.html
2. Click the edit icon in the Action column for Priya Sharma
3. Assert that the Last action text contains "EDIT — Priya Sharma (grid A1)"
4. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/b-multi-icon.html
5. Click the edit icon for Chen Wei in the Leads grid
6. Assert that the Last action text contains "EDIT — Chen Wei (grid B1)"
7. Open https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/d-containers.html
8. Scroll to the Warehouse contacts section
9. Click the edit icon for Amara Okafor in Warehouse contacts
10. Assert that the Last action text contains "EDIT — Amara Okafor (grid D3)"

If a stage assertion **passes**, that case doesn't reproduce the bug for the stage model. Leave it out of the verdict.
