# Miro — App Design Exploration

The recommended direction is **`v2-refined-main-app/`**. The other three folders are the earlier first-pass exploration, kept for reference.

```
Miro_App_Design_Exploration/
├── index.html                       Comparison hub — recommended at top, archive below
├── v2-refined-main-app/             ★ RECOMMENDED · the main Miro app
├── v1-route-card-first/             Earlier exploration · informed the compact builder
├── v2-map-itinerary-split/          Earlier exploration · informed the split layout
├── v3-local-concierge/              Earlier exploration · reduced to Ask Miro drawer
└── README.md
```

Open `Miro_App_Design_Exploration/index.html` for the comparison hub, or jump straight to `v2-refined-main-app/index.html` for the recommended app.

## Map configuration

The refined app reads map keys from Vercel runtime config via:

```text
VITE_KAKAO_JAVASCRIPT_KEY=your_kakao_javascript_key_here
VITE_NAVER_MAPS_NCP_KEY_ID=your_naver_maps_ncp_key_id_here
TMAP_APP_KEY=your_tmap_app_key_here
```

Add these as Vercel Environment Variables for production. Do not commit real keys or any Naver Client Secret.
`TMAP_APP_KEY` is server-only for `/api/tmap-pedestrian`; do not prefix it with `VITE_`. It is used only for walkable pedestrian legs.

In Kakao Developers → App settings → Platform → Web, also register every origin that will load the map, for example:

```text
http://localhost:3000
http://localhost:4173
https://your-vercel-project.vercel.app
https://your-custom-domain.com
```

In Naver Cloud Console, enable Maps / Web Dynamic Map / Dynamic Map for the application, and register the deployed domain if the console requires a web service URL/domain setting.

## Early access signup configuration

The active app posts early access form submissions to:

```text
POST /api/early-access
```

The endpoint exists in both deploy layouts:

```text
api/early-access.js
v2-refined-main-app/api/early-access.js
```

Set these Vercel Environment Variables before enabling the form in production:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-side only. Do not expose it in frontend JavaScript.

Run this SQL in Supabase if `public.early_access_signups` does not already exist:

```sql
create table if not exists public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  country text,
  age_range text,
  gender text,
  user_type text,
  message text,
  consent boolean not null default false,
  source text default 'kandid_spot_app',
  page text,
  referrer text,
  user_agent text,
  session_id text,
  metadata jsonb default '{}'::jsonb
);

create index if not exists early_access_signups_created_at_idx
on public.early_access_signups (created_at desc);

create index if not exists early_access_signups_email_idx
on public.early_access_signups (lower(email));
```

View submissions in the Supabase dashboard under Table Editor -> `public.early_access_signups`.

---

## Strategic decisions (in order)

### 1. V2 is the main product structure
**V2 (Map + Itinerary Split)** survived the "is this a real app or a landing page?" test most clearly. The synced map + itinerary is what users need to trust a route they're about to walk: they see *where* the stops are, *how far apart* they are, and *what order* makes sense — without leaving the app for Google Maps. V2 also scales cleanly to future features (saved routes, multi-day, share-as-link, alt routes).

The risk with V2 alone was Google-Maps-clone drift. We mitigate that by keeping the route narrative — title, "Why this route?" copy, tags, and place quotes — visually prominent on the left panel.

### 2. V1's chip input lives inside V2 as a compact, collapsible builder
V1's strongest contribution was its **three-chip-row builder** with one big CTA. That pattern is the lowest-friction way to express the core inputs. In the refined app, the V1 builder lives as a compact, collapsible section inside V2's left panel — collapsed by default after onboarding, expandable in one click via the **Edit** toggle on the route summary.

### 3. V3 is reduced to an optional Ask Miro drawer
V3's conversational thread was warm and on-brand, but as the *primary* UI it forced chat before a route, felt slow on second use, and conflated "ask a question" with "build a route." We kept the voice; we removed the requirement. V3 survives as **Ask Miro** — a floating pill that opens a side drawer with 6 example prompts. The drawer never opens by default. The route is the home.

### 4. ★ NEW · First use is a 3-step progressive flow
The most recent refinement: instead of showing the full map + itinerary + builder + Why card on first open, the app now leads with a **focused, one-question-at-a-time onboarding flow** before revealing the result screen.

> **Why:** the first version of the refined app crammed the builder, route summary, why card, timeline, refine chips, action bar, *and* the map onto a single first paint. Even with default values pre-filled, that's a lot of cognitive load — the user has to decide what to look at before they've committed to anything. The first-paint-as-result felt like a feature dump, not a focused product.
>
> **Now:** before the route exists, Miro asks one thing per screen. Once the route exists, the full workspace is the reward. Two distinct UIs for two distinct jobs (build vs. use).

#### The new first-use flow

| | Screen | Question | Options | Primary CTA |
|--|--|--|--|--|
| 1 | Step 1 of 3 | **Where are you now?** | Hongdae · Seongsu · Anguk · Euljiro · Gangnam | Next → |
| 2 | Step 2 of 3 | **How much time do you have?** | 1 hour · 2 hours · Half day · Evening | Next → |
| 3 | Step 3 of 3 | **What kind of route do you want?** | Local food · Quiet walk · Cafes · Night energy · Hidden spots | Build my Miro route → |
| 4 | Loading | "Building your local route…" | Cycles: walking time · matching mood · avoiding tourist traps · finding a route you can start now | (auto) |
| 5 | Result | The full V2-style workspace, builder collapsed | — | — |

#### How the result screen handles "edit inputs"

After onboarding completes, the route is the focus. The user can re-edit inputs in two ways:

- **Quick edit** — Click the **Edit** chevron on the route summary at the top of the left panel. The compact V1 builder unfolds inline (Area · Time · Mood chips + Build new route button). Same chips, same values as onboarding — just denser. Best for tweaking one input.
- **Full restart** — Click **+ New** in the top bar. Returns to the 3-step onboarding flow, with the previous selections pre-filled so re-confirming is one click. Best for users who want a guided redo.

`Esc` closes the Ask Miro drawer or any floating place card. `Enter` advances to the next onboarding step when a selection is made.

---

## Files changed in this update

```
Miro_App_Design_Exploration/v2-refined-main-app/
├── index.html       ↑ Added onboarding markup + ob-loading screen, marked .app as initially hidden,
│                       added "+ New" button to top bar, added Edit label to rs-toggle, aligned
│                       inline builder chip values to onboarding values
├── styles.css       ↑ Added ~280 lines: .onboarding, .ob-header, .ob-progress, .ob-screen,
│                       .ob-option (cards with checkmark), .ob-loading, .ghost-btn-accent,
│                       rs-toggle with label, mobile breakpoint for onboarding
└── app.js           ↑ Added onboarding state machine (~140 lines), syncBuilderChips,
                        setBuilderCollapsed helper, "+ New" handler, dynamic area in
                        loading-step copy, Enter-to-advance keyboard shortcut
```

Plus updated:
- `Miro_App_Design_Exploration/README.md` — this file

The earlier three prototypes (`v1-route-card-first/`, `v2-map-itinerary-split/`, `v3-local-concierge/`) and the comparison hub remain unchanged.

---

## Flow changes vs. previous version

| Previously | Now |
|---|---|
| First paint: full app — top bar, route summary, expanded builder, why card, timeline, refines, actions, full map | First paint: onboarding step 1 — single question, 5 cards, one CTA |
| Builder always visible at the top of the left panel | Builder collapsed by default after onboarding · expand via Edit toggle |
| Route was always shown; chips were the only input affordance | Route is shown only after the user finishes the 3-step flow |
| No global restart | "+ New" in top bar restarts the full onboarding (with previous selections pre-filled) |
| Loading state was inline within the result panel only | Two loading states: full-page after onboarding, inline for in-app rebuilds |
| No keyboard support for builder | Enter advances onboarding when a selection is made; Esc closes drawer/place card |

---

## What remains mock-only

These are intentional cuts so the prototype is reviewable without a backend:

- **The 4-stop route is always Yeonnam-themed.** Picking Gangnam or Anguk in onboarding still produces the same Hongdae/Yeonnam stops. The route summary line at the top reflects the user's selections, but the actual stops, the why-card text, and the SVG map are static.
- The "Why this route?" copy mixes Korean + English; the Korean is hand-written and references Hongdae specifically.
- Loading states are theatre — the timing is a fixed `setInterval`, not real backend work.
- Refine chips and Ask Miro responses are toast-only / keyword-matched. They don't actually swap stops.
- Map is a hand-drawn SVG. Pan/zoom/locate buttons are visual only.
- "JK" avatar is decorative — no real auth.
- Save / Share / Open-in-map are toast confirmations only.

## What Codex should implement later

When this direction is approved:

1. **Route generation** — replace the static `STOPS` array with an LLM-driven builder seeded by curated places (per area) stored in Supabase. Onboarding selections (`area`, `time`, `mood`) + applied refines are the inputs.
2. **Per-area mock data → real data** — currently every selection produces the same Yeonnam route. Production needs at minimum 5–10 real candidate stops per area.
3. **Dynamic Why-card** — generate the narrative per route, in the user's language, referencing real area names and street/lane vocabulary.
4. **Real map provider** — swap the SVG for Naver Maps or Mapbox. Keep the visual style: dashed walking line, numbered pins, light grey roads, mint pulse for active pin.
5. **Real walking time + distance** — pull from a routing API.
6. **Open-now filter** — needs hours data per place.
7. **Ask Miro** — wire to the same LLM that powers route generation. Keep responses ≤2 sentences; the drawer is for quick checks, not long advice.
8. **"Open in map app"** — deep-link to Naver / Kakao / Google depending on device.
9. **Save / Share** — Supabase row per saved route, anonymous-by-default with localStorage UUID; share-as-link with public read-only view.
10. **Auth** — anonymous-first; sign-in optional, only required for cross-device save.
11. **Analytics** — instrument the funnel: app open → step 1 → step 2 → step 3 → build clicked → loading complete → stop clicked → refine used → save/share/open-in-map → Ask Miro opened → "+ New" used.

---

## Manual browser QA checklist

Open `v2-refined-main-app/index.html` in Chrome / Safari / Firefox. Run through:

### Onboarding (first paint)
- [ ] Step 1 of 3 visible · "Where are you now?" headline · 5 area cards (Hongdae · Seongsu · Anguk · Euljiro · Gangnam)
- [ ] Progress bar shows 1 segment active (pulsing blue), 2 segments grey
- [ ] Back button is disabled · Next button is disabled
- [ ] Click an area card → checkmark appears in top-right of card · Next becomes enabled
- [ ] Click another area card → previous deselects, new one selected
- [ ] Click Next → animates to step 2 · "How much time do you have?" · 4 time cards · progress shows 1 done + 2 active
- [ ] Click Back → returns to step 1 with the previously-picked area still selected
- [ ] Pick time, click Next → step 3 · "What kind of route do you want?" · 5 mood cards · CTA reads "Build my Miro route →"
- [ ] Press Enter (with selection) → advances to next step
- [ ] Click "Build my Miro route" → onboarding fades out, full-page loading covers the screen

### Full-page loading
- [ ] "Building your local route…" title · 3-dot pulsing animation
- [ ] Sub-step text cycles: "Reading the streets of [Area]" → "Checking walking time" → "Matching your mood" → "Avoiding obvious tourist traps" → "Finding a route you can start now"
- [ ] After ~2.4s, loading hides and the full app reveals

### Result screen (post-onboarding)
- [ ] Top bar shows: brand · "+ New" (blue accent) · Saved · JK avatar
- [ ] Route summary at top of left panel shows the user's selections, e.g. "Gangnam · Half day · Cafes"
- [ ] Builder is **collapsed** (chip rows are not visible)
- [ ] Edit button shows "Edit" + downward chevron
- [ ] Why card is visible
- [ ] 4-stop timeline visible with walking-time segments
- [ ] Refine chips visible
- [ ] Action bar (Save / Share / Open in map) visible at bottom of left panel
- [ ] Right panel shows the Hongdae/Yeonnam SVG map with 4 pins and an animated walking line
- [ ] Ask Miro pill visible bottom-right of map

### Quick-edit inline
- [ ] Click Edit → builder expands · chip rows visible · selected chips match what was picked in onboarding
- [ ] Edit label changes to "Hide" · chevron flips to up
- [ ] Click a different Area chip → selection moves
- [ ] Click "Build new route" → inline loading overlay covers the result panel for ~2.3s · steps cycle with the new area name · route summary updates

### Full restart via "+ New"
- [ ] Click "+ New" in top bar → app hides, onboarding step 1 returns
- [ ] Toast confirms "Pick again — your previous choices are pre-filled."
- [ ] Onboarding step 1 has the previously-picked area still selected · Next is enabled
- [ ] Step 2 / 3 also have previous selections pre-filled
- [ ] Re-completing the flow returns to a fresh result screen

### Result interactions (unchanged from previous version)
- [ ] Click stop 2 in timeline → highlights blue · pin 2 turns mint with pulse · floating place card slides up
- [ ] Click pin 4 on map → list highlights stop 4 · floating card updates
- [ ] Click X on floating card → highlights clear
- [ ] Click empty map area → floating card dismisses
- [ ] Click each refine chip → applied style turns mint · toast confirms · why card briefly tints mint
- [ ] Save / Share / Open in map → respective toasts
- [ ] Saved button → toast "No saved routes yet…"

### Ask Miro drawer
- [ ] Click "Ask Miro" pill → drawer slides in from right
- [ ] Greeting + 6 example prompts visible
- [ ] Click a prompt → user message + typing indicator + Miro reply
- [ ] After first interaction, suggestion list disappears
- [ ] Type "less crowded" + Enter → keyword-matched response
- [ ] Press Escape → drawer closes
- [ ] Click overlay → drawer closes

### Mobile (≤ 880px)
- [ ] Onboarding cards stack to 2 columns (1 column under 380px)
- [ ] Headline and sub-text fit comfortably
- [ ] Result screen flips to map-on-top, panel-below
- [ ] "+ New" button shows just the icon (text hidden)
- [ ] Action bar sticks to bottom of the panel

### Accessibility
- [ ] Tab order moves logically through onboarding cards → Back → Next
- [ ] All buttons have visible focus state
- [ ] Progress bar has `aria-hidden="true"` (decorative); the text "Step X of 3" is the source of truth
- [ ] Builder toggle has `aria-expanded` reflecting state
- [ ] Loading screen has `aria-hidden` toggled appropriately

---

## Limitations of this prototype

- **Onboarding selections do not change the route stops.** Every selection produces the same 4 Yeonnam-themed stops; only the route summary line and "+ New" pre-filling reflect the user's choices. This is mock-data limitation, not a design choice.
- **Why-card text references Hongdae specifically.** Picking Gangnam will show "Gangnam · 2 hours · Cafes" in the summary, but the why-card still talks about Hongdae streets. Production must regenerate this per route.
- **No persistence.** Refresh resets onboarding. The "+ New" button is the only way to redo within a session.
- **Refine chips and Ask Miro do not actually re-rank stops.** They only show toasts / keyword-matched responses.
- **Map is static SVG.** Pan/zoom/locate buttons are visual only.
- **No real auth.** "JK" avatar is decorative.
- **On very narrow mobile screens, the floating place card can visually overlap the Ask Miro pill while shown.** Acceptable for a prototype; production should reposition the pill above the float card on mobile.

These are all intentional cuts to keep the prototype reviewable without backend dependencies.
