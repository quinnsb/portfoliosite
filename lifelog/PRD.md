# Brewer Research & Design — Product Requirements Document

A personal archive site cataloging rankings, long-form writing, and side projects under the institutional identity "Brewer Research & Design." The design language is mid-century declassified technical dossier: monospace typography, paper-cream backgrounds, 1px mechanical rules, catalog numbers as core architecture, Japanese typographic accents. Built to last decades, authored in plain markdown, deployed as static HTML.

**Domain:** archive.quinnbrewer.com
**Hosting:** Vercel
**Repository:** GitHub (TBD)

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Static site generator | **Eleventy (11ty) v3** | Content-focused, zero client JS by default, native markdown support, excellent longevity track record. No framework churn risk. |
| Templating | **Nunjucks** | 11ty's most mature template language. Clean syntax for layouts and partials. |
| Styling | **Tailwind CSS v4 + custom CSS** | Tailwind for layout, spacing, typography, color tokens. Custom CSS for halftone patterns, redaction blocks, hover-inversion effects, pixel-art rendering. Design tokens configured in `tailwind.config.js`. |
| Typography | **JetBrains Mono** (self-hosted, 400 + 700) | The only font. Loaded via `@font-face` from local woff2 files. No Google Fonts dependency. |
| Image optimization | **eleventy-image** | Build-time resize, WebP/AVIF generation, responsive srcsets. |
| RSS | **eleventy-plugin-rss** | Single combined feed at `/feed.xml`. |
| SEO | **Auto-generated sitemap** + per-page meta + JSON-LD | Sitemap via `eleventy-plugin-sitemap`. OpenGraph tags from frontmatter. Article structured data for Writing entries. |
| Deployment | **Vercel** (static export) | Git push to deploy. Custom domain `archive.quinnbrewer.com`. |
| Search | **Client-side title/tag filtering** | Lightweight JS that filters the visible index list by title and tag text matching. No full-text search. No search index. |

---

## Content Model

### Directory Structure

```
content/
  rankings/
    RNK-0001-example-entry.md
    RNK-0002-another-entry.md
    RNK-0001-example-entry/
      fig-1.jpg
      fig-2.jpg
  writing/
    WRT-0001-example-essay.md
    WRT-0001-example-essay/
      photo.jpg
  projects/
    PRJ-0001-example-project.md
    PRJ-0001-example-project/
      screenshot.png
  events.yaml
```

Images are co-located: a folder with the same name as the markdown file (minus `.md`) holds that entry's images. Referenced with relative paths in the markdown body.

### Catalog Number System

Every entry has a **catalog ID** derived from its filename prefix:

- Format: `{TYPE}-{NNNN}` where TYPE is `RNK`, `WRT`, or `PRJ` and NNNN is zero-padded to 4 digits.
- The filename is `{CATALOG_ID}-{human-slug}.md` (e.g., `RNK-0042-top-17-fabrics.md`).
- The slug portion is for local readability only. It does not appear in URLs.
- **URLs** use the catalog ID: `/rankings/rnk-0042`, `/writing/wrt-0118`, `/projects/prj-0012`.
- IDs are **manually assigned** by the author. They are permanent and never change.
- IDs are **scoped per type** — `RNK-0042` and `WRT-0042` are unrelated.

**Build-time validation:**
- **Error (build fails):** Two files in the same type share the same catalog ID prefix.
- **Warning:** A gap exists in the sequence (e.g., RNK-0041 and RNK-0043 exist but RNK-0042 does not).

**Deletion policy:** Published entries are never truly deleted. If an entry must be removed:
- Replace its content with a `status: redacted` or `status: withdrawn` flag.
- The entry remains in the index as a redaction block (solid black bar).
- The URL never 404s.

**Drafts:** Entries with `published: false` in frontmatter are excluded from the built site but their catalog number is considered "claimed" — the build validation still checks for conflicts.

### Rankings Entry

```yaml
---
title: "The Top 17 Fabrics, Ranked by Hand-Feel"
date: 2026-05-07
published: true
category: Fabrics        # Required. Free-text, used for the Category filter.
tags: [fabric, ranking, tactile]  # Optional. Free-text array.
---

Body is standard markdown. The numbered ranking list is written as
markdown content — not structured data. Use headings, descriptions,
and any markdown formatting freely.

## 01. Heavyweight Duck Canvas

Unyielding. Structurally aggressive...

## 02. Raw Loom-State Selvedge

Rigid, untreated...

## [ REDACTED ]

██████████████████████
```

**Categories** are Rankings-only. No controlled vocabulary — any string is valid. The index page extracts unique category values from all published Rankings entries to populate the Category filter dropdown.

### Writing Entry

```yaml
---
title: "On the Physics of Melancholy"
date: 2026-05-02
published: true
tags: [essay, physics, emotion]
---

Standard long-form markdown. Section headers, blockquotes, images,
redaction blocks — all just markdown.
```

No subtitle or excerpt fields. If an excerpt is needed for index previews, the build extracts the first paragraph of the body.

### Projects Entry

```yaml
---
title: "Rebuilding a 1994 Sportster"
date_started: 2024-09-12
date_updated: 2026-05-01
published: true
status: ongoing           # ongoing | completed | abandoned | dormant
tags: [motorcycle, mechanical, restoration]
links:
  - label: Repository
    url: https://github.com/...
  - label: Live Demo
    url: https://...
---

Body is freeform markdown organized as dated log entries, newest first.

## 2026.05.01

Initial teardown of the top end complete...

## 2024.09.12

Acquired the bike. Assessment notes...
```

`date_updated` reflects the most recent log entry date. The build uses this for index sorting.

### System Events (events.yaml)

```yaml
- date: 2026-04-28
  id: SYS-992
  description: "Archive Maintenance: Index Rebuild"
  icon: wrench

- date: 2026-04-10
  id: SYS-991
  description: "Update: Font Rendering Protocol"
  icon: refresh
```

These interleave with auto-generated entry publications in the Activity Feed (homepage and Logs page).

### Tags

- Free-text arrays in frontmatter. No controlled vocabulary.
- Shared across all three content types.
- Tag pages (`/tags/[tag]`) are **out of scope for v1**. Tags are used only for index-page filtering.
- The build warns if a tag appears only once across the entire site (likely a typo).

---

## Site Map

```
/                          Homepage (index grid + activity feed)
/rankings/                 Rankings index (paginated, filterable)
/rankings/rnk-NNNN         Rankings detail page
/writing/                  Writing index (paginated, filterable)
/writing/wrt-NNNN          Writing detail page
/projects/                 Projects index (paginated, filterable)
/projects/prj-NNNN         Projects detail page
/about/                    About (author bio + site colophon)
/logs/                     Logs (satirical personal changelog)
/encrypted/                Encrypted (cipher puzzle easter egg)
/feed.xml                  RSS feed (combined)
/sitemap.xml               Sitemap
/404.html                  Custom 404 page
```

---

## Page Specifications

### Homepage (`/`)

**Header:** Site name "BREWER RESEARCH & DESIGN" left-aligned, nav links (RANKINGS, WRITING, PROJECTS, SEARCH, ABOUT) right-aligned. Persistent across all pages.

**Institutional header card:** Site title with Japanese subtitle (個人のアーカイブ), status chips (`[ STATUS: DECLASSIFIED ]`, `[ CLEARANCE: LEVEL 1 ]`), archive icon with halftone background.

**3-column index grid:** One column per content type (Rankings, Writing, Projects). Each column shows the N most recent entries as clickable rows with catalog ID, date, and title. Column headers show entry count (`[ 042 ENTRIES ]`).

**Activity feed:** "RECENT ACTIVITY" section below the grid. Reverse-chronological list of recent publications (auto-generated from entry dates) interleaved with manual system events (from `events.yaml`). Each row shows: date, catalog/system ID, description, icon.

**Footer:** `EST. 2026 / REV. {version} / DOCUMENT-CLASS: UNRESTRICTED [ 奥付 ]` left. Nav links right: INDEX (→ `/`), LOGS (→ `/logs/`), PROTOCOLS (→ `/about/`), ENCRYPTED (→ `/encrypted/`).

### Section Index Pages (`/rankings/`, `/writing/`, `/projects/`)

**Section header:** Large title with Japanese label (Rankings = 順位, Writing = 執筆, Projects = 企画). Entry count. Status chip. Decorative document ID in top-right corner.

**Filter bar:** Text input for title/tag filtering ("FIND IN SECTION..."). Rankings additionally has Sort, Year, Tag, and Category dropdowns. Writing and Projects have Sort, Year, and Tag dropdowns.

**Entry table:** Rows with columns: ID, Date, Title, Tags. Full-width on desktop, stacked on mobile. Separated by 1px rules. Hover-inversion effect on each row. Clicking navigates to the detail page.

**Redacted entries:** Entries with `status: redacted` render as a solid black bar row with the catalog ID still visible.

**Pagination:** Static pages generated at build time. Configurable items-per-page (default: 20). Format: `‹ PREV | PAGE 01 / 05 | NEXT ›`.

### Rankings Detail (`/rankings/rnk-NNNN`)

**Breadcrumb:** `HOME / RANKINGS / RNK-NNNN`

**Header:** Catalog ID + title. Posted date, category. Decorative document ID top-right.

**Body:** Rendered markdown. Numbered ranking items as styled sections. Redaction blocks rendered as solid black bars with halftone reveal-on-hover.

**Navigation:** `‹ PREV RECORD | NEXT RECORD ›` at bottom. Wraps around within the Rankings type.

**Footer metadata:** `FILED UNDER:` with tags as clickable chips (filter the index by that tag).

### Writing Detail (`/writing/wrt-NNNN`)

**Breadcrumb:** `HOME / WRITING / WRT-NNNN`

**Header:** Title, date, tags.

**Body:** Rendered markdown. Long-form prose with section headers, blockquotes, images, redaction blocks.

**Navigation:** `‹ PREV RECORD | NEXT RECORD ›` within Writing.

### Projects Detail (`/projects/prj-NNNN`)

**Breadcrumb:** `HOME / PROJECTS / PRJ-NNNN`

**Header:** Title, status chip (styled per status value: ongoing = blue, completed = default, abandoned = rust, dormant = secondary), date started, date updated. Optional links rendered as boxed buttons.

**Body:** Rendered markdown. Dated log entries as sections, images inline.

**Navigation:** `‹ PREV RECORD | NEXT RECORD ›` within Projects.

### About (`/about/` aka "Protocols")

**Author section:** Brief bio — who maintains this archive, background, contact information.

**Site section:** Archive philosophy, design principles, colophon (tech stack, fonts, tools used). In the deadpan institutional voice.

### Logs (`/logs/`)

**Content:** A satirical personal changelog — version history of the author as a person, written as software release notes. Entries like `v2.3.1 — Fixed bug where subject apologized to furniture. Deprecated: fear of calling restaurants.`

**Format:** Reverse-chronological entries. Author-written content (a single markdown file or a dedicated template). Styled consistently with the rest of the site.

### Encrypted (`/encrypted/`)

**Content:** A simple cipher/decode puzzle. The page presents encoded text styled with heavy redaction, classification stamps, and the institutional aesthetic. The visitor deciphers the text to reveal a hidden message.

**Scope:** One page, one puzzle, purely static. CSS + minimal JS for the reveal interaction.

### 404 Page

Styled as a "FILE NOT FOUND — CLEARANCE INSUFFICIENT" classified document. Includes a link back to the homepage index.

---

## Design System Implementation

### Colors (CSS custom properties + Tailwind config)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#F5F2EC` | Paper cream background |
| `--ink` | `#1A1A1A` | Primary text, borders, rules |
| `--ink-secondary` | `#8B8680` | Metadata, Japanese labels, halftone |
| `--accent-rust` | `#A8472E` | CRITICAL/REDACTED indicators |
| `--accent-blue` | `#3D5A6B` | STABLE/VERIFIED classifications |

### Typography

- **JetBrains Mono 700:** Headers, labels, nav, metadata. ALL CAPS via `text-transform: uppercase` (not literal caps in source HTML — screen readers read normally).
- **JetBrains Mono 400:** Body text, long-form content. Sentence case.
- **Japanese labels:** Hardcoded per section. `font-size: 10px`, secondary ink color.

### Layout

- Max container width: `1200px`.
- 4px baseline grid. Spacing units: 4, 8, 12, 16, 24px.
- 1px solid `--ink` borders for all major section separators.
- Dashed rules (4px dash, 4px gap) for sub-sections.
- Tight padding (8px or 12px) inside components.

### Interactive States

- **Hover inversion:** Interactive elements invert on hover (ink background, paper text). Applied via CSS, no JS. Transition: `75ms`.
- **No other animations.** No scroll reveals, no page transitions, no loading states. Instant and binary.

### Halftone Pattern

CSS `radial-gradient` dots at 10% opacity, 4px spacing. Applied to section header backgrounds only. Subtle texture, not prominent.

### Redaction Blocks

Solid `--ink` rectangles. On hover, transform to halftone pattern with legible text underneath. Used for redacted entries in indexes and within entry bodies.

### Responsive Behavior

- **Breakpoints:** 640px, 768px, 1024px. Mobile-first.
- **Nav:** Full horizontal links on desktop. Hamburger menu on mobile (collapses to a `[MENU]` toggle that reveals nav links).
- **3-column index grid (homepage):** 3 columns at 1024px+, stacks to 1 column below.
- **Entry tables:** Full table layout at 768px+, stacked card layout below.
- **Images:** Max-width 100%, responsive srcsets.

---

## Features (Build Order)

Features are ordered so each builds on the previous. No feature depends on a later one.

### Feature 1: Project Scaffold & Design Tokens

Set up the 11ty project, install dependencies, configure Tailwind with all design tokens, set up the base layout template (header, footer, main content area), and deploy a "hello world" page to Vercel.

**What "done" looks like:**
- `npm run build` produces a static site with the paper-cream background, JetBrains Mono font, correct colors.
- Header shows "BREWER RESEARCH & DESIGN" with nav links (non-functional stubs).
- Footer shows the institutional tagline with nav links (non-functional stubs).
- Halftone pattern CSS utility works.
- Hover-inversion CSS utility works on a test element.
- Deployed to Vercel at a preview URL.

### Feature 2: Markdown Content Pipeline

Configure 11ty to process markdown files from `content/`. Implement the catalog-ID-from-filename parser. Set up build-time validation (duplicate ID error, sequence gap warning). Implement the `published: false` draft exclusion.

**What "done" looks like:**
- A test markdown file at `content/rankings/RNK-0001-test.md` renders at `/rankings/rnk-0001`.
- A second file with the same prefix causes the build to fail with a clear error message.
- A gap in numbering produces a console warning.
- A file with `published: false` does not appear in the build output but does not trigger a gap warning.

### Feature 3: Rankings Index Page

Build the `/rankings/` page with: section header (title, Japanese label, entry count, decorative doc ID), filter bar (text search + Sort/Year/Tag/Category dropdowns), entry table (ID, Date, Title, Tags columns), pagination. Client-side JS for the filter bar.

**What "done" looks like:**
- Page renders with 3+ placeholder ranking entries.
- Text filter narrows the visible list by title and tag text.
- Category dropdown filters by category value.
- Pagination generates correct static pages.
- Redacted entries display as black bars with visible catalog ID.
- Hover inversion works on table rows.
- Mobile layout stacks correctly.

### Feature 4: Rankings Detail Page

Build the `/rankings/rnk-NNNN` detail page with: breadcrumb, header (catalog ID, title, date, category), rendered markdown body, prev/next navigation, footer metadata with tags.

**What "done" looks like:**
- Detail page renders markdown content correctly.
- Redaction blocks in the body render as black bars with hover reveal.
- Prev/Next navigation links to the correct adjacent entries.
- Breadcrumb links work.
- Images (if present) render with responsive srcsets via eleventy-image.

### Feature 5: Writing Index + Detail Pages

Build `/writing/` index and `/writing/wrt-NNNN` detail pages. Same patterns as Rankings but without the Category filter. Index extracts first paragraph as preview excerpt.

**What "done" looks like:**
- Writing index renders with placeholder entries, filtering, and pagination.
- Detail pages render long-form markdown with images, blockquotes, section headers.
- Prev/Next navigation works within Writing entries.

### Feature 6: Projects Index + Detail Pages

Build `/projects/` index and `/projects/prj-NNNN` detail pages. Status chip styled per status value. Links array rendered as boxed buttons. Date range display (started → updated).

**What "done" looks like:**
- Projects index renders with placeholder entries, filtering, and pagination.
- Status chips display correct colors (ongoing=blue, completed=default, abandoned=rust, dormant=secondary).
- Links render as functional buttons.
- Dated log entry sections in the body render correctly.

### Feature 7: Homepage

Build the `/` page with: institutional header card, 3-column index grid (pulling recent entries from each type), activity feed (merging entry dates with events.yaml).

**What "done" looks like:**
- 3-column grid shows the N most recent entries per type with working links.
- Activity feed interleaves content publications and system events in correct chronological order.
- Mobile layout stacks the 3 columns.

### Feature 8: Image Optimization Pipeline

Configure eleventy-image for build-time processing. Generate WebP + AVIF variants, multiple widths, responsive srcsets. Create a markdown-it plugin or shortcode for optimized image output.

**What "done" looks like:**
- Images referenced in markdown are processed into multiple formats and sizes.
- `<picture>` elements with `srcset` appear in the rendered HTML.
- Build output includes optimized image files.
- Original images in `content/` are not modified.

### Feature 9: About Page

Build `/about/` with author bio section and site colophon section. Styled in the institutional voice.

**What "done" looks like:**
- Page renders with placeholder author content and site philosophy text.
- Consistent with site-wide styling.

### Feature 10: Logs Page

Build `/logs/` with the satirical personal changelog. A single markdown content file rendered with the site's styling.

**What "done" looks like:**
- Page renders placeholder changelog entries in the release-notes format.
- Reverse-chronological order.

### Feature 11: Encrypted Page (Cipher Puzzle)

Build `/encrypted/` with a static cipher puzzle. Encoded text, classification stamps, redaction styling. Minimal JS for the decode/reveal interaction.

**What "done" looks like:**
- Page displays encoded text with heavy institutional styling.
- A working decode mechanism (input field or interaction) reveals the hidden message.
- Purely static — no backend.

### Feature 12: RSS Feed

Configure eleventy-plugin-rss. Generate `/feed.xml` combining the most recent entries across all three types.

**What "done" looks like:**
- `/feed.xml` is valid RSS/Atom.
- Contains the 20 most recent entries with title, date, link, and excerpt.
- Feed title is "Brewer Research & Design."

### Feature 13: SEO & Metadata

Add per-page `<title>`, `<meta description>`, OpenGraph tags (og:title, og:description, og:image), and JSON-LD structured data (Article for Writing, ItemList for Rankings). Auto-generate `sitemap.xml`.

**What "done" looks like:**
- Every page has a unique `<title>` and meta description.
- Social sharing previews display correctly (testable via OpenGraph debugger tools).
- `sitemap.xml` lists all published URLs.
- JSON-LD validates without errors.

### Feature 14: Mobile Navigation

Implement the hamburger menu for mobile viewports. `[MENU]` toggle button replaces inline nav links below the mobile breakpoint. Reveals nav links on tap.

**What "done" looks like:**
- Nav links hidden behind hamburger on screens < 768px.
- Tap opens menu, tap again or tap a link closes it.
- Keyboard accessible (focusable, Escape closes).
- No animation — instant show/hide.

### Feature 15: 404 Page

Build a custom 404 page styled as a classified "FILE NOT FOUND" document.

**What "done" looks like:**
- Navigating to a nonexistent URL shows the custom 404.
- Page links back to the homepage.
- Styled consistently with the site.

### Feature 16: Seed Content & Final Polish

Populate all sections with placeholder entries matching the prototype's content style (Top 17 Fabrics, A Defense of the Spork, The Infinite Scroll Generator, etc.). Write placeholder About, Logs, and Encrypted content.

**What "done" looks like:**
- At least 3 Rankings, 3 Writing, and 2 Projects entries exist with full markdown bodies.
- All index pages, pagination, filtering, and navigation work end-to-end with real-feeling content.
- Logs page has 5+ satirical changelog entries.
- Encrypted page has a solvable puzzle.

### Feature 17: Production Deployment

Configure Vercel project, set up `archive.quinnbrewer.com` subdomain, verify production build, test all pages live.

**What "done" looks like:**
- Site is live at `archive.quinnbrewer.com`.
- All pages load correctly in production.
- RSS feed is accessible.
- Sitemap is accessible.
- HTTPS works.

---

## Testing Approach

### Per-Feature (applied after each feature is built)

- **Build check:** `npm run build` completes without errors.
- **Content rendering:** Spot-check that markdown renders correctly — headings, lists, images, code blocks, redaction blocks.
- **Link integrity:** Every internal link resolves. No dead links.
- **Visual check:** Open in browser, verify styling matches design spec (colors, typography, spacing, borders, halftone patterns).
- **Responsive check:** Test at 375px, 768px, 1024px, 1280px viewport widths.
- **Keyboard navigation:** Tab through all interactive elements. Focus is visible. No focus traps (except intentional ones like modals, if any).

### Accessibility (ongoing)

- All text uses `text-transform: uppercase` — source HTML is sentence case for screen readers.
- All images have `alt` text.
- Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text).
- `--ink-secondary` (#8B8680) on `--bg` (#F5F2EC) = ~3.2:1 ratio — verify this passes for its usage (metadata labels are large/bold, which requires 3:1). If it fails, darken the secondary ink.
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>`, heading hierarchy.
- `prefers-reduced-motion`: The hover-inversion transition respects this media query (instant with no transition).

### End-to-End (after Feature 16)

- Navigate every page via internal links — no dead ends.
- Filter and paginate each index page — verify correct results.
- Validate RSS feed with an online validator.
- Validate sitemap.
- Run axe-core accessibility audit.
- Test in Chrome, Safari, Firefox (desktop) + Safari iOS.

---

## Out of Scope for v1

- **Full-text search** (Pagefind or similar). V1 has title/tag filtering only.
- **Tag pages** (`/tags/[tag]`). Tags are used for filtering, not as standalone pages.
- **Revision tracking** on entries (REV. II, etc).
- **Dark mode**. The paper-cream aesthetic is the only theme.
- **Comments or reader interaction**. This is a broadcast archive, not a forum.
- **Analytics**. No tracking scripts. Add if desired post-launch.
- **CMS or web-based editor**. Content is authored locally in markdown and deployed via git push.
- **Internationalization**. Japanese labels are decorative, not a full translation layer.
- **Print stylesheet**. Would be on-brand but not essential for launch.
- **Controlled tag vocabulary** or tag validation file.
- **Per-entry Japanese titles**.
- **Multiple RSS feeds** (per-type). One combined feed only.
- **Service worker / offline support**.
- **Automated visual regression testing**. Manual visual checks are sufficient at this scale.

---

## Open Questions

1. **Logs page content:** You'll write the satirical changelog entries. Placeholder format is defined; actual content is TBD and author-supplied.
2. **Encrypted puzzle design:** The specific cipher and hidden message are TBD. Implementation will be a simple substitution or Caesar cipher with a static decode mechanism. You may want to design the puzzle yourself for maximum delight.
3. **About page bio:** Author-supplied content. Placeholder will be used until you provide real text.
4. **Secondary ink contrast:** `#8B8680` on `#F5F2EC` may not meet WCAG AA for small text (estimated ~3.2:1). We may need to darken it to ~`#6B6660` during implementation. Will verify and adjust.
5. **Events.yaml initial content:** What system events to seed. Will use prototype's examples (Archive Maintenance, Font Rendering Protocol) as placeholders.
6. **Items per page default:** Set to 20. Adjustable in site config. Confirm this feels right once we have seed content.
