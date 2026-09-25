---
name: StableFlow Spatial Escrow
description: A calm, Apple-inspired operating surface that makes protected funds and milestone movement feel tangible.
colors:
  canvas: "#F5F5F7"
  surface: "#FFFFFF"
  ink: "#1D1D1F"
  secondary: "#6E6E73"
  blue: "#0071E3"
  blue-deep: "#0058B0"
  green: "#16845B"
  amber: "#A05A00"
  red: "#C9342F"
  separator: "rgba(0,0,0,.10)"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, Helvetica Neue, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Helvetica Neue, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  data:
    fontFamily: "SFMono-Regular, ui-monospace, Menlo, monospace"
    fontSize: ".75rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
rounded:
  control: "12px"
  surface: "24px"
  hero: "32px"
  status: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "18px"
  lg: "28px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.status}"
    padding: "11px 18px"
  surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "28px"
---

# Design System: StableFlow Spatial Escrow

## Overview

**Creative North Star: “Protected value, visibly moving.”**

StableFlow translates an escrow contract into a calm spatial interface. It borrows Apple’s hierarchy, restraint, system typography, precision, and product-stage pacing without copying Apple product chrome. The defining visual is a milestone rail: value moves through explicit states as a continuous protected path rather than a spreadsheet of blockchain jargon.

## Color and material

The primary operating scene is a bright workstation under neutral daylight. Porcelain canvas separates the app from crisp white working surfaces. Graphite holds content, system blue identifies the next safe action, and semantic green, amber, and red are always paired with labels or icons. Translucency is limited to the persistent navigation where content passes behind it; working surfaces stay opaque for legibility.

## Typography

Use the native Apple system stack for display and interface text. Large titles are tightly tracked and capped at 6rem. Monospace appears only for wallet addresses, identifiers, timestamps, hashes, and aligned amounts.

## Layout

Desktop uses a centered 1440px stage beneath a compact translucent top navigation. The first dashboard viewport pairs an editorial protected-balance statement with a tangible milestone trace. Operational sections use full-width surfaces, separators, and generous internal whitespace. Mobile becomes a single column with a native-feeling bottom navigation and 44px minimum targets.

## Components

- Buttons use clear hierarchy, pill geometry, and semantic labels.
- Surfaces use 24px corners, a hairline separator, and one directional soft shadow only when lifted.
- Status chips always combine text, icon, and semantic tint.
- Tables become labeled project records on narrow screens.
- Alerts explain both state and recovery.
- Forms retain persistent labels, native input semantics, and visible validation status.
- Range and progress controls expose their value in text and keep keyboard behavior native.

## Motion

One orchestrated entrance reveals the protected balance and traces milestones from left to right. Hover motion is limited to 1–2px lift with shadow change. Reduced-motion users receive the final state immediately.

## Do

- Keep the next authorized action obvious.
- Distinguish demonstration, observed, and on-chain-final states in plain language.
- Let whitespace and type scale create drama while maintaining operational scanability.
- Use blur only for navigation continuity.

## Don’t

- Don’t imitate macOS window chrome or Apple logos.
- Don’t use neon, crypto gradients, glowing borders, or dark exchange-dashboard conventions.
- Don’t hide state behind color, abbreviated addresses, or icon-only actions.
- Don’t stack cards inside cards.
