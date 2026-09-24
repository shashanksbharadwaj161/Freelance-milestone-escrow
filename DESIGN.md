---
name: StableFlow Clearing Desk
description: Stablecoin operations presented as a precise clearing manifest.
colors:
  ledger: "#F3F4EE"
  paper: "#FFFFFF"
  ink: "#132238"
  muted-ink: "#5C6675"
  cobalt: "#1746D1"
  signal: "#F0643B"
  success: "#138A5B"
  rule: "#CAD0D8"
typography:
  display:
    fontFamily: "Arial Narrow, Aptos Narrow, sans-serif"
    fontSize: "clamp(2.7rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Aptos, Helvetica Neue, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Aptos Mono, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  control: "6px"
  surface: "14px"
  status: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "24px"
---

# Design System: StableFlow Clearing Desk

## Overview

**Creative North Star: "The Clearing Manifest"**

StableFlow borrows the legibility of a customs clearing desk: every payment is a named consignment moving through explicit checkpoints, with registration marks, routing rules, and decisive state stamps. It refuses the category-standard dark neon wallet dashboard. The interface is bright because merchants use it throughout a working day, and dense where comparison matters without becoming cramped.

**Key Characteristics:**
- Cool paper fields and strong ink rules
- Statuses expressed through words, symbols, and color
- Manifest rows that reveal chronology and custody
- One signal-orange registration mark per major surface

## Colors

The palette is cool and administrative, with cobalt for action and signal orange reserved for registration marks and exceptions.

**The Registration Mark Rule.** Signal orange appears once per major surface and never substitutes for payment status.

## Typography

Condensed display type makes invoice identifiers and totals feel stamped; a neutral workhorse sans carries operational copy; monospaced labels are reserved for addresses, amounts, and timestamps.

**The Measurement Rule.** Monospace is used only where alignment, copying, or exact comparison matters.

## Layout

Desktop uses a 12-column shell with a fixed 232px navigation rail and manifest content spanning the remainder. Tables are allowed to feel like tables. At 820px the rail becomes a compact header and comparative rows turn into labeled records. Spacing follows an 8px base rhythm.

## Elevation & Depth

The system is flat by default. Borders, paper contrast, and offset registration shadows establish hierarchy; menus and active transactional panels may use a soft 0 14px 40px rgba(19,34,56,.12) shadow.

## Shapes

Controls use 6px corners, large working surfaces use 14px corners, and statuses may use pill geometry. Registration stamps and QR frames remain square.

## Components

Buttons are compact and decisive. Inputs display persistent labels and exact recovery text. Manifest rows carry a state stamp, amount, counterparty, network, and last event without nesting cards. Focus rings are 3px cobalt with a 2px paper offset.

## Do's and Don'ts

### Do:
- **Do** keep invoice state, amount, and network visible together.
- **Do** pair every state color with a readable label and symbol.
- **Do** let dense ledgers use rules and alignment instead of card grids.

### Don't:
- **Don't** imply that locally recorded data is confirmed on-chain.
- **Don't** use decorative gradients, glass panels, or neon wallet aesthetics.
- **Don't** shorten wallet addresses when the user is expected to copy or verify them.
