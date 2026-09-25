---
name: "TRACE"
description: "Reference-derived Korean teaching workspace with green navigation and white form panels."
colors:
  primary: "#2b6f60"
  primary-hover: "#235d50"
  mint: "#54b3a6"
  mint-soft: "#cfefea"
  rose: "#d9807a"
  yellow: "#d4b763"
  lavender: "#837abd"
  chart-charcoal: "#484b47"
  background: "#f2f3ee"
  surface: "#fff"
  foreground: "#3b3d3b"
  supporting-text: "#667065"
  sidebar-foreground: "#edfff5"
  border: "#e6e8e5"
  field-border: "#e1e5df"
  panel-border: "#e7e9e5"
typography:
  headline:
    fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-.035em"
  title:
    fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    letterSpacing: "-.025em"
  body:
    fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif"
    fontSize: "13px"
    lineHeight: 1.45
  label:
    fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif"
    fontSize: "12px"
    fontWeight: 600
  supporting:
    fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif"
    fontSize: "11px"
  metric:
    fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    letterSpacing: "-.03em"
rounded:
  control: "10px"
  button: "11px"
  navigation: "16px"
  panel: "24px"
  panel-compact: "20px"
spacing:
  field-gap: "8px"
  action-gap: "10px"
  group-gap: "12px"
  field-margin: "18px"
  section-gap: "22px"
  panel-padding: "26px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "#525d50"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "#3b423c"
    rounded: "{rounded.control}"
    padding: "11px 13px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "26px"
  navigation-active:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.surface}"
    rounded: "{rounded.navigation}"
    padding: "9px 13px"
  goal-chip:
    backgroundColor: "{colors.mint-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
---

# Design System: TRACE

## Overview

**Creative North Star: "Reference-led TRACE workspace"**

TRACE carries the supplied dashboard and sidebar references into a Korean teaching workspace: a deep green navigation rail, warm gray page, white rounded panels, and mint selected states. The system favors clear labels and compact operational controls over decorative imagery.

This document records the implemented reusable visual vocabulary in src/index.css and src/app.css. The specific two-step assignment composition remains in docs/surface-brief.md; it is not a required composition for every future screen.

**Key Characteristics:**
- Deep green navigation with a charcoal active item.
- Warm gray canvas, white panels, and restrained mint selection.
- Compact Korean labels and visible keyboard focus.

## Colors

### Primary
Deep green is the main action and sidebar color. Mint marks selection, completion, and supporting accents; soft mint supplies chip backgrounds.

### Secondary
Rose, yellow, lavender, mint, and chart charcoal distinguish evaluation segments and their text-labeled legends. These are categorical colors, not additional action hierarchies.

### Neutral
The warm gray canvas supports white panels and charcoal content. Supporting text uses the corrected supporting-text token; the stylesheet also contains contextual muted colors. Thin panel and field borders provide separation. The frontmatter records the durable reused palette, not every contextual tint.

**The Selection Rule.** Use deep green for primary actions and mint for selected or completed supporting controls. Keep the active navigation item charcoal.

## Typography

The implemented Korean sans stack is shared across content and controls. The headline, title, body-field, label, supporting, and metric roles are recorded above; there is no separate display-face system to inherit. Small numbers in section labels and evaluation metrics use tabular figures. The TRACE wordmark is a separate 37px/800 treatment with .01em tracking, reducing to 32px at the compact desktop breakpoint.

Page headlines reduce to 23px at 760px. Section titles reduce to 17px at 450px. Dialog headings use 20px. Do not extrapolate a mathematical scale from these operational sizes.

## Layout

The fixed sidebar is 272px wide by default, 290px from 1600px, and 240px through 1250px. At 1050px and below it becomes a 272px off-canvas drawer with a dimmed backdrop; the main content loses its left offset. The main region has a 1740px maximum width and default padding of 42px 44px 0; wide layouts use 52px 64px 0, compact desktop 34px 27px 0, tablet 30px 30px 0, and widths through 760px use 21px 18px 0.

The current assignment grid uses 1.15fr/1fr columns with a 22px gap (17px through 1250px), then one column through 760px. Evaluation content similarly stacks at 760px. AI content is capped at 1100px. At 450px, date/difficulty groups stack and compact table tracks shrink. The body minimum width is 360px. These are observed responsive thresholds, not device assumptions.

Panel padding is 26px by default, 30px on wide layouts, and 22px on compact layouts; the AI panel is 30px 34px by default. Fields use an 8px label gap and 18px bottom margin. Actions generally use a 10px gap. Preserve these observed relationships rather than imposing an invented spacing scale.

**The Reading Order Rule.** Keep actions after the form in document flow; the final footer override is relative, not sticky.

## Elevation & Depth

**The Overlay Depth Rule.** Keep ordinary panels flat; reserve shadows for dialogs and transient notifications.

The toast shadow is `0 8px 25px #0002`; the dialog shadow is `0 20px 80px #0002`. The dialog backdrop is `#1b39376b`, and the mobile drawer backdrop is `#18382c70`. Ordinary panels use white fill and a thin border without shadows.

## Shapes

Controls and chips have softly rounded control corners; primary/secondary actions use the button radius, and navigation uses the larger navigation radius. Panels and dialogs share the panel radius; panels reduce to the compact radius at 760px. The sidebar has a 30px lower-right corner on desktop and 22px right corners in drawer mode. Circular step markers, avatars, and evaluation dots remain purposeful indicators.

## Components

- **Buttons:** primary green and secondary white variants have a 46px minimum height, 13px/600 labels, and 12px 20px padding. Hover darkens the primary or tints the secondary. Background transitions take .16s. Disabled controls use .48 opacity and a not-allowed cursor.
- **Fields:** white fill, thin field border, 13px type, 1.45 line height, and 44px minimum height for inputs/selects. Hover changes the border to #a8beb2; focus changes it to mint. Border/background transitions take .16s. The global keyboard outline is 3px green with 3px offset; inside the sidebar it is soft mint.
- **Panels:** white, thin bordered containers. Section headings pair a title with contextual actions or counts. Do not add ambient card shadows.
- **Navigation:** 58px minimum rows with charcoal icon tiles; the active row becomes charcoal with a mint icon tile. Labels remain visible in the drawer. The profile anchors the sidebar bottom.
- **Goal chips:** soft mint, green editable labels, and an adjacent remove action. Labels wrap. Guidance chips use the same selected color relationship, with a 9px radius.
- **Mode selection:** three equal tabs sit in a warm gray track; selected mode uses deep green and white. Content reveals over .18s ease-out from .65 opacity and a 3px downward offset. This transition signals the changed form contents.
- **Tablet targets:** at 1050px and below, remove controls, segmented controls, and guidance actions reach 44px; retain the final stylesheet overrides when extending them.

The drawer translates over .2s. Under `prefers-reduced-motion: reduce`, all animations and transitions are disabled and scrolling uses auto behavior. No decorative looping motion is established.

## Do's and Don'ts

### Do:
- Do preserve the supplied reference palette and rounded panel language.
- Do keep keyboard focus visible and honor reduced-motion preferences.
- Do retain text labels alongside evaluation colors.

### Don't:
- Don't invent a new palette or component family beyond the supplied references.
- Don't promote the current two-step form composition into a requirement for unrelated screens.
- Don't reuse the superseded low-contrast supporting text values.
