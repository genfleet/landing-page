# Hyperframes Composition Brief: GenFleet

## Objective
Create a short launch-style brag video for GenFleet (current landing page, new orange/paper brand).

## Output
- Composition directory: `brag-output-2026-09-25-220210/composition/`
- Rendered video: `brag-output-2026-09-25-220210/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 23.5s

## Source Material
- Project root: `landing-page/`
- Primary files read: `src/index.css`, `index.html`, `src/routes/index.tsx`, `src/components/landing/{Hero,WorkedExampleSection,AgentTeamSection,BusinessFunctionsSection}.tsx`, `src/components/marketplace/{CatalogPreview,brand-logos}.tsx`, `src/assets/logo_svg.tsx`, `src/components/logo.tsx`
- Product name: GenFleet (wordmark lowercase `genfleet`)
- Tagline: "Your AI team, built around your business."
- Key UI to recreate: CatalogPreview panel, AgentWorkspacePreview card, WorkedExample step list (Support)
- Copy that must appear verbatim:
  - Your AI team, built around your business.
  - Specialized help across your entire business.
  - Every listing is reviewed by Genfleet before it is published
  - Your Genfleet workspace / Browse specialists / Connect your tools / Assemble a team / Connected and ready to work
  - One way of working, for every team.
  - Support example lines 1-4
  - Request a demo / Private beta

## Creative Direction
- Tone preset: app-store
- Creative direction: warm-paper product film — orange does the work, blue signs off
- Angle: agents are orange, people are blue; the one blue moment (human approval) is the payoff.
- Hook: huge two-line headline, line 2 on the 1.60s cue.
- Outro: blinking agent mark + wordmark + tagline + Request a demo pill.
- Avoid: generic SaaS language, abstract filler, redesigning the brand.

## Visual Identity
- Background #f4f2ee, card #fbfaf8, muted #e8e5e0, border #d6d2cb, text #000, muted text #5c5852
- Accent #ff5b1f; human #3b71cf / #2f5fb3; agent colors #ff5b1f, #000, #d99a1e
- Display: Space Grotesk (local woff2); body: IBM Plex Sans (local woff2)
- Icons: Phosphor, extracted from the project's own dependency (`icons.svgfrag`)

## Storyboard
Creative contract: `brag-plan.md`.
1. Hook — 0–3.5s
2. Marketplace — 3.5–8.6s
3. Workspace — 8.6–13.2s
4. Worked example — 13.2–18.9s
5. Outro — 19.0–23.5s

## Audio
- Music: `assets/music/happy-beats-business-moves-vol-11-by-ende-dot-app.mp3`, 0.34, fade in 0.3s / out 1.2s
- Cue source: `~/.claude/skills/brag/assets/music/cues/happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.json`; locks at 1.60, 6.34, 12.65, 17.91
- Audio-reactive: RMS (ffmpeg-extracted, 15 fps, smoothed) drives a soft orange glow behind cards. Hyperframes-creative extraction helper is not installed locally, so extraction is done with ffmpeg directly.
- SFX: low HF-risk picks from `sfx-analysis.md`; volumes 0.45–0.7; one per event.

## Hyperframes Instructions
Hyperframes domain skills (`hyperframes-core`, etc.) are not installed on this machine; the composition follows `npx hyperframes docs` (data-attributes, compositions, gsap) for hyperframes 0.8.x. Gate: `npx hyperframes check`.
