---
name: Bureau of Absurdist Records
colors:
  surface: '#fcf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fcf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e5e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#444748'
  inverse-surface: '#31312d'
  inverse-on-surface: '#f3f0ea'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#625e58'
  on-secondary: '#ffffff'
  secondary-container: '#e5dfd7'
  on-secondary-container: '#66625c'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c0800'
  on-tertiary-container: '#cf6449'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e8e1da'
  secondary-fixed-dim: '#ccc5bf'
  on-secondary-fixed: '#1e1b17'
  on-secondary-fixed-variant: '#4a4641'
  tertiary-fixed: '#ffdbd2'
  tertiary-fixed-dim: '#ffb4a2'
  on-tertiary-fixed: '#3c0800'
  on-tertiary-fixed-variant: '#802a13'
  background: '#fcf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e5e2dc'
typography:
  headline-lg:
    fontFamily: jetbrainsMono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: jetbrainsMono
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-caps:
    fontFamily: jetbrainsMono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-jp:
    fontFamily: jetbrainsMono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: '0'
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  container-max: 1200px
---

## Brand & Style

This design system is built upon the visual language of mid-century declassified technical dossiers and institutional filing systems. It is characterized by **Institutional Brutalism**, prioritizing information density and rigid structure over aesthetic softness. The brand personality is deadpan and clinical, presenting absurd or surreal content with the gravity of a government mandate.

Visual interest is generated through 1px mechanical rules, halftone patterns that mimic low-quality xerox reproduction, and pixel-art iconography. Every interface element must feel like a physical artifact retrieved from a high-security vault. There are no gradients, no shadows, and no fluid transitions; the UI is immediate, binary, and unapologetically functional.

## Colors

The palette is restricted to the "Ink and Paper" model. The background uses a warm paper cream to simulate aged physical stock. 

- **Background (#F5F2EC):** The primary canvas.
- **Primary Ink (#1A1A1A):** Used for all primary text, 1px borders, and structural lines.
- **Secondary Ink (#8B8680):** Used for metadata, Japanese secondary labels, and halftone textures.
- **Accent Rust (#A8472E):** Reserved for "CRITICAL" or "REDACTED" status indicators.
- **Accent Blue (#3D5A6B):** Used for "STABLE" or "VERIFIED" technical classifications.

Interaction states do not use color shifts; instead, they use inverted colors (Ink background with Paper text) to indicate focus or selection.

## Typography

This design system exclusively employs **JetBrains Mono** to maintain a consistent technical/monospaced aesthetic. 

- **Hierarchical Logic:** All labels, metadata, and navigational items must be set in **ALL CAPS** with increased letter spacing. Body text and long-form archive entries must be set in **Sentence case** for legibility.
- **Bilingual Accents:** Secondary labels (especially in headers) should include Japanese translations in `Secondary Ink` to evoke a globalist, cold-war era technical manual.
- **Weight:** Use Regular (400) for body text and Bold (700) for headers and interactive labels. Avoid italics unless marking a specific "REDACTED" or "ANNOTATED" passage.

## Layout & Spacing

The layout is a **Fixed Grid** system inspired by technical data sheets. Content is housed within 1px boxed containers. 

- **Density:** Information density should be high. Use tight padding (8px or 12px) within components to maximize the "data-heavy" feel.
- **Grid Lines:** Explicitly draw the grid. Every major section should be separated by a `1px solid #1A1A1A` rule. 
- **The ID Header:** Every page or major section must lead with a "Document ID" (e.g., ARCH-9920-BX) in the top-right corner, aligned to the grid boundary.
- **Alignment:** All elements must snap to a 4px baseline grid. Use hard-edged dividers rather than whitespace to separate content types.

## Elevation & Depth

This system is strictly **Flat**. There are no shadows, blurs, or Z-axis depth cues. 

- **Depth via Layering:** Visual hierarchy is achieved through 1px borders and tonal fills. 
- **Halftones:** Use a 45-degree halftone dot pattern (Primary Ink at 10% opacity) for background headers or "Classified" areas to create texture without adding physical depth.
- **Inversion:** To simulate "active" states or buttons, invert the color of the container: Primary Ink (#1A1A1A) becomes the background and Paper (#F5F2EC) becomes the text color.

## Shapes

The design system uses a **Sharp (0px)** roundedness policy. Every container, button, input field, and image frame must have 90-degree corners. This reinforces the institutional, non-consumer nature of the archive. Pixel-art icons should maintain their jagged, aliased edges; do not anti-alias or smooth them.

## Components

### Buttons & Inputs
Buttons are simple boxes with 1px borders. Upon hover or click, the box fills entirely with `Primary Ink` and the text inverts to `Background Cream`. Input fields follow the same logic but include a `[ ]` prefix or a flashing block cursor.

### Chips & Metadata
Metadata tags should look like stamped labels. Use `label-caps` typography. Example: `[ STATUS: DECLASSIFIED ]`. For high-priority alerts, use the `Accent Rust` color for the border and text.

### Document IDs
Every "card" or entry must contain a unique alphanumeric string (e.g., `REF. #44-001/TR`). This is placed in the top-right corner of the component in `Secondary Ink`.

### Lists
Lists are separated by horizontal 1px rules. Each list item should have a small pixel-art "bullet" (a 3x3 pixel square) or a numerical index (001, 002, 003).

### Redaction Blocks
For hidden or sensitive content, use a solid block of `Primary Ink`. This can be "revealed" on hover, transforming the block into a halftone pattern with legible text.

### Dividers
Use 1px rules. Occasionally, use "Dashed" rules (4px dash, 4px gap) for sub-sections to mimic perforated paper edges.