# Brewer Research & Design — Build Progress

## Feature 1: Project Scaffold & Design Tokens — COMPLETE

**What was built:**
- 11ty v3 project initialized at `lifelog/site/`
- Tailwind CSS v4 configured with all design tokens from DESIGN.md
- Custom CSS utilities and components (halftone, hover-inversion, redaction, chips)
- Base layout template with header and footer partials
- `prefers-reduced-motion` respected on hover transitions

---

## Feature 2: Markdown Content Pipeline — COMPLETE

**What was built:**
- Shared catalog ID parser (`lib/catalog.js`) extracts `{TYPE}-{NNNN}` from filenames
- Computed data files (`*.11tydata.js`) per content type generate `catalogId` and `permalink`
- URLs use catalog ID only: `/rankings/rnk-0001/`, `/writing/wrt-0001/`, `/projects/prj-0001/`
- Build-time validation:
  - **Duplicate ID → build error** with clear message showing both conflicting files
  - **Sequence gap → warning** listing missing IDs (build still succeeds)
- Draft exclusion: `published: false` → no output file, excluded from collections
- Three 11ty collections: `rankings`, `writing`, `projects` (sorted by catalog number descending)
- `allEntries` collection (sorted by date, cross-type)
- `dateFormat` filter for `YYYY.MM.DD` display format
- Global site data (title, description, URL)

**Test entries created:**
- `RNK-0001-top-17-fabrics.md` — Rankings entry with category + tags
- `RNK-0002-worst-smells.md` — Rankings entry
- `RNK-0003-draft-test.md` — Draft (published: false), confirmed excluded
- `WRT-0001-defense-of-the-spork.md` — Writing entry with sections + blockquote
- `PRJ-0001-infinite-scroll-generator.md` — Projects entry with status + links + dated logs

**Verified:**
- All published entries render at correct URLs (200)
- Draft entry returns 404
- Duplicate ID causes build failure with clear error
- Sequence gap produces yellow warning
- Markdown content renders correctly (headings, paragraphs, blockquotes)
- Header nav highlights active section
- Content directory moved to `src/content/` for 11ty processing

---

## Features 3–4: Rankings Index + Detail Pages — COMPLETE

**What was built:**

### Rankings Index (`src/rankings.njk`)
- Section header with "RANKINGS" title, Japanese label (順位), dynamic entry count, decorative Doc-ID chip, "Status: Declassified" rust chip
- Filter bar with text search input + functional Sort/Year/Tag/Category dropdown menus
- Sort options: Newest First, Oldest First, ID Ascending, ID Descending
- Year/Tag/Category dropdowns auto-populated from entry frontmatter at build time
- Dropdown button labels update to show active filter (e.g., "Category: Fabrics")
- Entry table with responsive grid layout (ID, Date, Title, Tags columns)
- Hover-inversion on entry rows — entire row inverts on hover
- Redacted entries render as solid black bars with only catalog ID visible
- Pagination nav with Prev/Page N/Next, supports 20 entries per page
- Empty state and no-filter-results messaging
- Client-side vanilla JS filtering + sorting (real-time, no reload, all filters composable)

### Rankings Detail (`src/_includes/layouts/ranking-detail.njk`)
- Dedicated layout (separate from base.njk) with full page structure
- Breadcrumb navigation: Home / Rankings / {ID}
- Title with vertical bar accent + headline-lg styling
- Metadata row: catalog ID / posted date / category as bordered inline chips
- Entry body with bordered ranked item cards (h2 titles + paragraph bodies)
- Filed Under tags in rust accent color
- Prev/Next record navigation using collections.rankings

### Entry Body CSS (`main.css`)
- Expandable ranked item cards: compact row with thumbnail area + title + preview sentence, click to expand full text/images in detail panel
- Fallback ranked item card styling for non-JS: h2 gets top/side border, following p gets bottom/side border
- Type-specific variants: `.entry-body--writing` for section headers, `.entry-body--project` for dated log entries with dashed rules
- Blockquote styling with rust left border
- Code blocks, lists, images all styled within entry body

### Font Swap
- Departure Mono added as primary font (Departure Mono → JetBrains Mono fallback chain)

**Verified:**
- Rankings index renders at `/rankings/` with 3 entries (2 normal + 1 redacted)
- All 4 filter dropdowns (Sort/Year/Tag/Category) open, select, and filter correctly
- Filters compose together (e.g., Category + text search)
- Sort reorders rows in the DOM correctly
- Redacted entry displays as black bar in index, detail page shows `[REDACTED]` title
- Text filter narrows visible list by title and tag text
- Entry rows link to correct detail pages
- Detail page expandable cards: click to reveal full text, click again to collapse
- Thumbnail area shows rank number placeholder or first inline image
- Prev/Next navigation works between entries
- Hover inversion works on all interactive elements
- Departure Mono renders throughout the site

---

## Feature 5: Writing Index + Detail Pages — COMPLETE

**What was built:**

### Writing Index (`src/writing.njk`)
- Section header with "WRITING" title, Japanese label (執筆), entry count
- Filter bar with text search + Sort/Year/Tag dropdowns (no Category — per PRD)
- Entry list with catalog ID, date, title, **first-paragraph excerpt**, and tags
- Redacted entry support (same pattern as Rankings)

### Writing Detail (`src/_includes/layouts/writing-detail.njk`)
- Breadcrumb: Home / Writing / {ID}
- Title with vertical bar accent, metadata row (ID + date, no category)
- `entry-body--writing` variant: section headers as underlined dividers
- Filed Under tags + Prev/Next navigation

### Test Entries
- `WRT-0001-defense-of-the-spork.md` — essay with sections + blockquote
- `WRT-0002-on-the-structural-integrity-of-sandwiches.md` — essay with sections + blockquote

### 11ty Config
- `excerpt` filter added — strips HTML, extracts first paragraph, truncates to ~180 chars

**Verified:**
- Writing index renders at `/writing/` with 2 entries and excerpts
- Detail page renders long-form markdown with section headers, blockquotes
- Prev/Next navigation works within Writing entries
- All filter dropdowns functional

---

## Feature 6: Projects Index + Detail Pages — COMPLETE

**What was built:**

### Projects Index (`src/projects.njk`)
- Section header with "PROJECTS" title, Japanese label (企画), entry count
- Filter bar with text search + Sort/Status/Tag dropdowns
- Status filter: ongoing, completed, abandoned, dormant
- Entry list with date range (started → updated), status chip, excerpt, tags
- Status chips color-coded: ongoing=blue, completed=default, abandoned=rust, dormant=secondary

### Projects Detail (`src/_includes/layouts/project-detail.njk`)
- Breadcrumb: Home / Projects / {ID}
- Date range display (started → updated) in metadata row
- Status with color coding in metadata row
- Links array rendered as boxed chip buttons with ↗ icon
- `entry-body--project` variant: dated log entries with ——— prefix and dashed rules

### Test Entries
- `PRJ-0001-infinite-scroll-generator.md` — completed, 2 links, 3 log entries
- `PRJ-0002-pneumatic-mail-system.md` — ongoing, 1 link, 3 log entries

**Verified:**
- Projects index renders at `/projects/` with 2 entries
- Status chips show correct colors (ongoing=blue, completed=default)
- Links render as functional chip buttons
- Dated log entries display with correct styling
- Prev/Next navigation works

---

## Feature 7: Homepage — COMPLETE

**What was built:**

### Homepage (`src/index.njk`)
- Institutional header card with halftone "B" logo, title, tagline, Japanese subtitle, status/clearance chips
- 3-column index grid: Rankings (順位), Writing (執筆), Projects (企画)
  - Each column shows up to 5 recent entries with catalog ID and title
  - Projects column includes status chips (ONGOING/COMPLETED)
  - "View All →" links to each section index
  - Entry counts shown in column headers
- Activity Feed: interleaved content publications + system events, sorted newest-first
  - Content entries are bold and clickable (link to detail page)
  - System events in muted secondary text
  - Shows up to 15 items

### System Events (`src/_data/events.json`)
- 5 placeholder system events (SYS-991 through SYS-995)
- Dates properly interleave with content entry dates

### 11ty Config
- `excerpt` filter for first-paragraph extraction (shared by Writing + Projects index)

**Verified:**
- 3-column grid renders on desktop, stacks on mobile
- All entry links navigate to correct detail pages
- Activity feed interleaves system events and content entries in correct date order
- System events render in muted style, content entries in bold clickable style

---

## Feature 8: Image Optimization Pipeline — COMPLETE

**What was built:**
- `@11ty/eleventy-img` integrated via `{% image %}` shortcode in `eleventy.config.js`
- Generates AVIF, WebP, and JPEG at 400/800/1200w widths
- Supports relative paths from content files, absolute paths, and URLs
- Lazy loading + async decoding on all generated `<picture>` elements
- Output to `_site/img/` with descriptive filenames

**Verified:**
- Image shortcode processes test images in writing entries
- Multiple formats and sizes generated at build time

---

## Feature 9: About / Protocols Page — COMPLETE

**What was built:**
- `src/about.njk` at `/about/` — "Protocols" page with institutional styling
- Section 1: Personnel File with halftone "Q" avatar, bio, quinnbrewer.com link
- Section 2: Site Colophon with description, tech specs table (Generator, Styling, Typography, Hosting, Domain), classification system key
- Doc-ID: SYS-PROTO-01, Status: Declassified chip

**Verified:**
- Renders at `/about/` with correct styling
- Nav highlights "About" when active
- External link opens in new tab

---

## Feature 10: Logs Page — COMPLETE

**What was built:**
- `src/logs.njk` at `/logs/` — satirical personal changelog
- 5 version entries: v33.4.0, v33.3.2, v33.2.0, v33.0.0, v32.11.0
- Each entry uses Added/Changed/Fixed/Deprecated/Breaking/Known Issue format
- Reverse-chronological order, "Latest First" label
- Doc-ID: SYS-LOG-01, Auto-Generated chip

**Verified:**
- Renders at `/logs/` with all 5 entries
- Changelog format matches software release notes aesthetic

---

## Feature 11: Encrypted Page (Cipher Puzzle) — COMPLETE

**What was built:**
- `src/encrypted.njk` at `/encrypted/` — cipher puzzle easter egg
- Caesar cipher with offset 17; text scrambled on load
- Decryption console with −/+ buttons, numeric display, and range slider (0–25)
- Real-time decode as user adjusts offset
- At correct offset (17): status flips to "Decrypted" (blue), success stamp appears
- Hidden message: satirical institutional memo about the archive's purpose
- Custom range input styling matching design system
- Classification stamps, hazard stripe background, "TOP SECRET" warning

**Verified:**
- Page renders with scrambled cipher text at offset 00
- Slider, +/− buttons all update cipher in real-time
- Offset 17 produces readable English, status changes, success stamp shown
- Footer nav includes "Encrypted" link

---

## Feature 12: RSS Feed — COMPLETE

**What was built:**
- Atom feed at `/feed.xml` with 20 most recent entries
- Custom `dateToRfc3339`, `newestDate`, and `xmlEscape` filters in eleventy config
- Properly escapes XML entities in titles and summaries
- Falls back through `date` → `date_updated` → `date_started` for project entries

**Verified:**
- `/feed.xml` generates valid Atom XML with 7 entries
- All entries have proper dates, titles, summaries, and absolute URLs

---

## Feature 13: SEO & Metadata — COMPLETE

**What was built:**
- Shared `partials/head-meta.njk` included in all layouts (base + 3 detail layouts)
- OpenGraph tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`
- Twitter Card meta: `summary` card with title/description
- RSS autodiscovery `<link>` tag
- Canonical URL on every page
- JSON-LD: `Article` schema for content entries, `WebSite` schema for index/static pages
- `sitemap.xml` with 14 URLs (7 static + 7 content entries)

**Verified:**
- Detail pages output all OG, Twitter, canonical, JSON-LD tags
- `sitemap.xml` lists all published URLs with correct absolute paths

---

## Feature 14: Mobile Navigation — COMPLETE

**What was built:**
- `[ MENU ]` toggle with `aria-expanded`, `aria-controls` attributes
- Escape key closes menu and returns focus to toggle button
- Clicking a nav link auto-closes the menu
- Added "Logs" link to both desktop and mobile navigation

**Verified:**
- Hamburger toggle works, keyboard accessible

---

## Feature 15: 404 Page — COMPLETE

**What was built:**
- `src/404.njk` at `/404.html` — "FILE NOT FOUND" error report
- Hazard stripe background, "DOCUMENT NOT FOUND" classification stamp
- Error/Cause/Action data table
- "Return to Archive Index" button
- Japanese label (未検出), Doc-ID: ERR-404, Status: Missing chip

**Verified:**
- Renders at `/404.html` with full institutional error report styling
- Return link navigates to homepage

---

## Feature 16: Seed Content & Final Polish — COMPLETE

**What was built:**
- `RNK-0005-best-fonts-for-staring-at.md` — "The 9 Best Fonts for Staring At, Ranked by Emotional Weight"
- `WRT-0003-an-incomplete-history-of-doing-nothing.md` — "An Incomplete History of Doing Nothing"
- Total content: 3 published rankings + 1 redacted, 3 writing entries, 2 projects
- Logs page already had 5 changelog entries (Feature 10)
- Encrypted page already had solvable cipher puzzle (Feature 11)

**Verified:**
- Homepage index grid shows 4 Rankings, 3 Writing, 2 Projects
- Activity feed interleaves new entries correctly
- All index pages display entries with working filters
- All detail pages render full content

---

## Next Up: Feature 17 — Production Deployment

---

## Blocked: Nothing
