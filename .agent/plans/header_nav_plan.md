---
title: Header Navigation & Lola Fix
description: Adding navigation buttons to the header for better discoverability and fixing the pet name/image issue.
files:
  - src/pages/About.tsx
  - src/pages/Home.tsx
  - src/App.tsx
steps:
  - description: Rename 'Luna' to 'Lola' in About.tsx to match user expectation.
    files: [src/pages/About.tsx]
  - description: Verify image paths are correct.
    files: [src/pages/About.tsx]
  - description: Implement a consistent 'HeaderNav' for Desktop in Home.tsx.
    files: [src/pages/Home.tsx]
    instructions: |
      Add 'About' and 'Quality Promise' links to the desktop header area (top right).
      Ensure they are styled to match the 'Trust & Wellness' palette.
---
