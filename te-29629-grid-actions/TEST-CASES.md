# TE-29629 — Icon-only Edit (pencil) in an Action column: test cases

> **Ticket:** [TE-29629](https://lambdatest.atlassian.net/browse/TE-29629) · **Fix:** [auteur-automind #1005](https://github.com/LambdatestIncPrivate/auteur-automind/pull/1005)
> **Test pages:** https://sahilrlambdatest.github.io/lt-qa-html-fixtures/te-29629-grid-actions/
> **Run on:** dev `https://lt-kaneai-v-kane-dev.lambdatestinternal.com/agent` (Desktop Browser session) · **Baseline:** stage or prod

## What the fix changes

`POST /v2/locate/desktop` now makes a **second, zoomed vision call** when both of these hold:

1. the first answer's box matches a **container** a11y entry (gridcell, cell, row, listitem, generic, none), and
2. the target the prompt describes is a **control** (icon, icon-only control, button, link, checkbox, switch).

It crops the box plus about 40 px of padding, upscales about 4x, asks again, and keeps the new point **only if it is found and lies inside the original box**. Otherwise the first answer stands. Everything else is unchanged, including the prompt text and `adjust_for_dropdown_label` (which now runs after the refinement).

So the cases below cover: the trigger (positive), non-trigger regressions, the "keep the first answer" fallback (negative), and the crop geometry (edge).

## How to judge a case — read the page, not the step status

Every page has a sticky **Last action** bar and an event log. A green Kane step proves nothing on its own, because the bug was a click that "succeeded" on the empty centre of the cell.

| Last action shows | Meaning |
|---|---|
| `EDIT — <name> (grid X)` (or DELETE, VIEW, COPY, MORE, DOWNLOAD, OPEN LINK, SAVE…) | That icon was hit, on that row |
| `MISS — <name> (grid X)` | The Action cell was hit outside every icon: **the reported bug** |
| `BLOCKED — <name>` | A disabled icon was hit |
| `CELL — <name>` | A non-action cell was hit |

**After every click step, add an assertion step**, e.g.
`Assert that the text next to "Last action:" is "EDIT — Priya Sharma (grid A1)"`.

Pages hold state (renames, deletes). Before each case, click **Reset lab** (or reload the page).

A11y structure verified in headless Chromium for grid A1: the Action gridcell has an **empty name and zero accessible descendants**, which is the TE-29629 condition.

## Step 0 — baseline first (do not skip)

Run **TC-01, TC-05, TC-07, TC-10 and TC-14** on **stage or prod** before testing dev. The expected baseline is the "Pre-fix" column: MISS, COPY or DOWNLOAD.
If a baseline case already passes, the page doesn't reach the buggy path for that model, and a dev pass for that case proves nothing. Drop it from the verdict.
TC-31 must pass on **both** environments. If it fails, the page or session is broken, not the fix.

## Proving the refinement actually ran

A pass could be luck. For TC-01, TC-05 and TC-10, also capture at least one of these:

- **Vision debugging metadata** for the step's locate request (Retina): look for a `refine_vision_call` debugging step with both answers and the keep/reject decision. This is the definitive signal.
- **automind info log** for the request id: the trigger, both answers and the decision (see `/sumo` / kaneai-internals).
- **Step latency**: the PR measured ~15–18 s with refinement vs ~8–9 s without. This is only a hint.

For the regression cases TC-28 to TC-30, the same metadata should show **no** refinement step, meaning a single vision call.

---

## Positive — the trigger path

| ID | Page · grid | Prompt(s) | Expected (dev) | Pre-fix (stage/prod) |
|---|---|---|---|---|
| TC-01 | A · A1 | `Click the edit icon in the Action column for Priya Sharma` | `EDIT — Priya Sharma (grid A1)`, dialog "Edit Priya Sharma" opens | `MISS — Priya Sharma` |
| TC-02 | A · A1 | Separate steps: `…for Aarav Mehta` (first row), `…for Yuki Tanaka` (last row) | EDIT on exactly that row each time | MISS |
| TC-03 | A · A1 | `Click the edit icon for Chen Wei` → `Change Full name to "Chen Wei QA"` → `Click Save changes` → `Assert the Customers grid contains "Chen Wei QA"` | `SAVED — Chen Wei QA (grid A1)` and the row shows the new name | MISS at step 1 |
| TC-04 | A · A1 | Phrasing variants, one per step: `Click the pencil icon for Liam O'Connor` · `Edit the row of Sofía García` · `Click edit in the Action column of the row whose email is fatima.zahra@renlab.test` · `Click the edit button in row 7` | EDIT for Liam O'Connor / Sofía García / Fatima Zahra / Noah Williams | MISS |
| TC-05 | B · B1 | `Click the edit icon for Chen Wei in the Leads grid` | `EDIT — Chen Wei (grid B1)` | `COPY — Chen Wei` (cell centre is the Duplicate icon) |
| TC-06 | B · B1 | `Click the view icon for Aarav Mehta` · `Click the delete icon for Sofía García` then `Click Cancel` · `Click the three-dot menu for Yuki Tanaka` · `Click the duplicate icon for Noah Williams` | VIEW / DELETE then DELETE CANCELLED / MORE / COPY, each on the right row | Wrong icon or MISS |
| TC-07 | B · B2 | `Click the edit icon for Arjun Nair in the Appointments grid` | `EDIT — Arjun Nair (grid B2)`. A **DELETE is a critical fail** | MISS |
| TC-08 | D · D1 (listitem) | `Click the edit icon for Sofía García's notification rule` | `EDIT — Sofía García (grid D1)` | record it |
| TC-09 | D · D2 (div rows) | `Click the edit icon for Noah Williams in the Crew roster` | `EDIT — Noah Williams (grid D2)` | record it |
| TC-10 | D · D3 (plain table) | `Click the edit icon for Amara Okafor in Warehouse contacts` | `EDIT — Amara Okafor (grid D3)` | `DOWNLOAD — Amara Okafor` (centre is the Download icon) |
| TC-11 | D · D4 (cards) | `Click the edit icon on Hana Kim's card` | `EDIT — Hana Kim (grid D4)` | record it |
| TC-12 | D · D5 | `Click the Select checkbox for Omar Haddad` · `Turn on the Active switch for Maya Patel` · `Click the open-profile link icon for Ines Duarte` | `SELECT ON — Omar Haddad` · `ACTIVE ON — Maya Patel` · `OPEN LINK — Ines Duarte` | record it |

TC-12 note: the checkbox and switch are divs with no a11y entry (control types in the trigger list). The link icon **does** have an a11y entry (role link, empty name), so it may never reach the refinement. Record which path it took.

## Edge — crop geometry and state

| ID | Page · grid | Prompt(s) | Expected (dev) | Why it's an edge |
|---|---|---|---|---|
| TC-13 | E · E1 | `Click the edit icon for Liam O'Connor in Tiny icons` · `Click the delete icon for Sofía García in Tiny icons` | EDIT / DELETE on the right row | 10 px glyphs 6 px apart; relies on the 4x upscale |
| TC-14 | E · E2 | `Click the edit icon for Noah Williams in the Wide action column grid` | `EDIT — Noah Williams (grid E2)` (pre-fix: MISS) | 320 px cell touching the right edge of the viewport; crop padding must clamp |
| TC-15 | E · E3 | `Click the edit icon for Mateo Rossi in Tall rows` | `EDIT — Mateo Rossi (grid E3)` | 76 px rows, icon top-aligned, centre far below it |
| TC-16 | E · E4 | `Click the edit icon for Tomás Novak in the Dense grid`; repeat for `Lucas Silva` (first) and `Chloe Dupont` (last, needs scroll) | EDIT on exactly that row. **A neighbour (Grace Lee / Nina Petrova) is a fail** | 26 px rows: the 40 px padded crop contains the neighbours' pencils; the "inside original box" guard must reject them |
| TC-17 | E · E5 | `Scroll the Wide grid to the right and click the edit icon for Mei Lin` | `EDIT — Mei Lin (grid E5)` | Action column starts off-screen (x ≈ 2060) |
| TC-18 | E · E6 | `Click the edit icon for Sara Nilsen in the Pinned grid` | `EDIT — Sara Nilsen (grid E6)` | Sticky column overlapping scrolled content |
| TC-19 | F · F3 | Load the page and immediately: `Click the edit icon for Diego Torres in the Late render grid` | `EDIT — Diego Torres (grid F3)` once the icons appear (5 s) | Target isn't there yet; a click on the skeleton logs MISS |
| TC-20 | F · F4 | `Click the edit icon for Maya Patel in Inline edit` → `Change the name to "Maya Patel QA"` → `Click the save (check) icon for that row`. Variant: finish with `Click the cancel (x) icon` | `SAVED — Maya Patel QA (grid F4)` / `EDIT CANCELLED — Maya Patel` | Two icon-only clicks in the same cell; the icons change between steps |
| TC-21 **[?]** | F · F2 | `Hover over Amara Okafor's row and click the edit icon` | `EDIT — Amara Okafor (grid F2)` | Icons are invisible until hover. Record the outcome with and without "hover" in the prompt |

## Negative — the "keep the first answer" fallback

A pass here means Kane **doesn't do the wrong thing**. The step may fail or report the target missing; that's fine.

| ID | Page · grid | Prompt | Pass | Fail |
|---|---|---|---|---|
| TC-23 | F · F1 | `Click the edit icon for Priya Sharma in Locked rows` then `Assert the "Edit Priya Sharma" dialog is visible` | `BLOCKED — Priya Sharma`, and the assert **fails** (the dialog never opens) | Any click on another row, or the assert passing |
| TC-24 | F · F1 | `Click the edit icon for Noah Williams in Locked rows` (his Action cell is empty) | Step reports not found, or `MISS — Noah Williams` | `EDIT — <anyone else>` (Fatima Zahra / Yuki Tanaka are adjacent) |
| TC-25 | A · A1 | `Click the delete icon for Chen Wei in Customers` (A1 has only a pencil) | Step reports no delete icon | `EDIT — Chen Wei` presented as a delete: the refinement "found" the wrong control inside the box |
| TC-26 | A · A1 | `Click the edit icon for John Doe` | Step fails; nothing logged | Any EDIT |
| TC-27 **[?]** | B · B1 | `Click the icon in the Action column for Chen Wei` (no icon named) | Record which icon was chosen | — |

## Regression — must behave exactly as before (non-trigger)

| ID | Page · grid | Prompt | Expected (dev and stage) |
|---|---|---|---|
| TC-28 | C · C1 | `Click the Edit button for Chen Wei in Team members` · `Click the delete button for Fatima Zahra` | `EDIT — Chen Wei (grid C1)` · `DELETE — Fatima Zahra (grid C1)`; no refinement step, similar latency |
| TC-29 | C · C1 | `Click on the email of Yuki Tanaka` · `Click on the Role of Priya Sharma` | `CELL — Yuki Tanaka` · `CELL — Priya Sharma`; the target is a cell, not a control, so no trigger |
| TC-30 | C · C2 | `Select "On hold" in the Status dropdown for Lucas Silva` | `STATUS → On hold — Lucas Silva (grid C2)` (covers `adjust_for_dropdown_label`) |
| TC-31 | A · A2 | `Click the edit icon for Amara Okafor in Projects` | `EDIT — Amara Okafor (grid A2)` on **both** envs (control: the pencil is the cell centre) |
| TC-32 | any | `Click the Reset lab button` · `Click the "All scenarios" link` | Page reloads with "none yet" · the index opens |

## Replay and lifecycle (the ticket's second symptom)

The ticket also says a manually recorded pencil click **fails on re-run**.

| ID | Steps | Expected |
|---|---|---|
| TC-33 | Author TC-01 + TC-05 + TC-10 (with their assertions) → Save → re-open in the playground → re-run all steps | Every assertion passes again with the same Last action text |
| TC-34 **[?]** | Click the pencil for Chen Wei (A1) via **Manual Interaction** → save → re-run that recorded step | `EDIT — Chen Wei (grid A1)`. Note whether the replay goes through vision locate at all; if not, this symptom is outside #1005's scope. Report that, don't mark it a fail |
| TC-35 **[?]** | Generate code for the TC-33 test → Code tab → Execute & Verify (dev runs on mjolnir-dev HE) | Job passes. The pencil has no text or a11y name, so record which locator codegen emitted |

## Determinism

The PR's acceptance bar is **3 of 3**. Run TC-01, TC-05 and TC-10 three times each on dev (Reset lab in between). Anything below 3/3 is a fail for that case; report the hit rate.

## Row names per grid (all unique within a page)

| Grid | Rows |
|---|---|
| A1 | Aarav Mehta, Priya Sharma, Liam O'Connor, Sofía García, Chen Wei, Fatima Zahra, Noah Williams, Yuki Tanaka |
| A2 | Olivia Brown, Mateo Rossi, Amara Okafor, Lucas Silva, Emma Johansson |
| B1 | same 8 as A1 |
| B2 | Olivia Brown, Mateo Rossi, Amara Okafor, Lucas Silva, Emma Johansson, Arjun Nair |
| C1 / C2 | same as A1 / A2 |
| D1 · D2 · D3 · D4 · D5 | Aarav–Sofía · Chen Wei–Yuki Tanaka · Olivia Brown–Lucas Silva · Emma Johansson–Diego Torres · Zoe Martin, Omar Haddad, Ines Duarte, Ethan Clarke, Maya Patel |
| E1 · E2 · E3 | Aarav–Sofía · Chen Wei–Yuki Tanaka · Olivia Brown, Mateo Rossi, Amara Okafor |
| E4 (20) | Lucas Silva … Grace Lee, **Tomás Novak**, Nina Petrova … Chloe Dupont |
| E5 · E6 | Daniel Cohen, Mei Lin, Oscar Lindqvist, Ana Popescu, Kenji Sato · Laura Bianchi, Victor Mwangi, Sara Nilsen, Ahmed Saleh, Julia Novak |
| F1 | as A1 (Priya Sharma and Chen Wei locked; Noah Williams has no icons) |
| F2 · F3 · F4 | Olivia Brown–Emma Johansson · Arjun Nair, Hana Kim, Diego Torres, Zoe Martin, Omar Haddad · Ines Duarte, Ethan Clarke, Maya Patel, Jonas Weber, Aisha Bello |

## Evidence to attach per case

Kane step screenshot with the Last action bar visible · step duration · locate request id (for the Retina/Sumo check) · the pass/fail verdict against the tables above.
