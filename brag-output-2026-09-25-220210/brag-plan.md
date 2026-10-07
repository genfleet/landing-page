# Brag Plan: GenFleet

## What is this app?
GenFleet lets a business find specialized AI agents, connect them to the tools it already uses, and run them as one team — with a person on the team keeping the final word.

## The angle
Orange works, blue signs off. The brand guide gives agents orange and people blue, and the whole product story fits in that split: agents do the digging and the first draft, humans approve. The video is a calm, confident app-store product film on warm paper: every orange thing on screen is an agent doing work, and the one blue moment — "Your team checks the result" — is the payoff. No robots, no futurism, no "revolutionize".

## Hook (first 2-3 seconds)
The new hero headline, set huge in Space Grotesk on paper: "Your **AI team,**" (orange) then "built around your business." lands on the first strong music hit. A tiny "Private beta" pill with the orange dot sits above.

## Key moments (the middle)
- The catalog card: four agent listings arrive with the blinking GenFleet agent mark in orange / black / gold; the cursor clicks the "Connectors" pill and the grid crossfades to Slack, Jira, Linear, GitHub in their real colors.
- The "Your Genfleet workspace" card: Browse specialists → Connect your tools → Assemble a team fill orange one by one, four agent avatars stack in, "Connected and ready to work".
- The Support worked example: four numbered steps fill in (1-3 orange), then step 4 turns blue — "Someone on the support team reads it and sends it."

## Outro / punchline
The agent mark (it blinks once) + `genfleet` wordmark, the headline as tagline, and a black "Request a demo →" pill next to the "Private beta" tag.

## User flow worth showing
Browse the marketplace → switch to connectors (plug in your tools) → workspace assembles the team → a real request runs through the team and a human approves it. Recreated from `CatalogPreview.tsx`, `Hero.tsx` (AgentWorkspacePreview), and `WorkedExampleSection.tsx`.

## Tone
- Preset: app-store
- Creative direction: warm-paper product film — orange does the work, blue signs off
- Interpretation: clean feature-card reveals and smooth slides, one idea per scene, generous holds; color does the storytelling (orange = agents, blue = people), nothing flashes.

## Format: landscape — 1920x1080
## Duration: ~23.5s

## Visual identity (from the project)
- Background: #f4f2ee (paper); cards #fbfaf8; muted panels #e8e5e0; border #d6d2cb
- Accent: #ff5b1f (brand/signal orange — agents)
- Human: #3b71cf fill / #2f5fb3 text (people, approvals)
- Agent identities: #ff5b1f, #000000, #d99a1e
- Text: #000000; muted #5c5852
- Display font: Space Grotesk 700, tight tracking (-0.035em)
- Body font: IBM Plex Sans 400/500/600
- Strongest visual element: the agent mark (two rounded panels with cut-out eyes that blink) and the muted rounded-[1.75rem] panels holding card rows

## Share copy (draft)
Your AI team, built around your business: pick specialist agents, plug them into Slack, Jira and your ERP, and keep a human on the final call. GenFleet is in private beta.

## Audio direction
- Role: warm business bed with a consistent light SFX layer
- Music: happy-beats-business-moves-vol-11 (warm and business-y, 114.84 BPM)
- Music treatment: ~0.34 volume, 0.3s fade in, 1.2s fade out under the outro hold
- Music cue guidance: bundled preset read. Strong cues: 1.60s (hook line 2), 6.34s (Connectors click), 12.65s (team ready), 17.91s (human approval). Beat grid ~0.525s — too fast for readable rows, so sequential text rows use every other beat (e.g. 13.70 / 14.76 / 15.81 / 16.86) and the full set holds afterwards.
- Audio-reactive treatment: subtle; music RMS breathes a soft warm orange glow behind the cards. No waveform/equalizer visuals.
- SFX posture: moderate, motion-matched, low HF-risk files
- Audio-coupled moments: hook line 2 (soft thud), agent cards (card fan), cursor click, stage fills (soft drops), avatars (card slide), human approval (bong), logo (bell)
- Restraint rule: one sound per visual event; no stacked hits; nothing bright repeated.

## Storyboard

### Scene 1 — Hook — 0–3.5s
"Private beta" pill; "Your AI team," (orange on "AI team,") then "built around your business." on the 1.60s cue. Hold ~1.7s.
Sequential/interaction: two lines in order.
Audio intent: confident open. Audio-coupled idea: soft thud on line 2.
Transition mood: smooth slide → Scene 2

### Scene 2 — Marketplace — 3.5–8.6s
Left: "Specialized help across your entire business." Right: catalog panel with Agents / Tools / Connectors pills (Agents selected, orange). Four agent cards (Inbox and response assistant · Customer service; Account research assistant · Sales; Reconciliation assistant · Finance; Onboarding assistant · Human resources) arrive quickly and hold. Cursor clicks "Connectors" at 6.34 → Slack, Jira, Linear, GitHub cards crossfade in and hold ~2s. Footer: "Every listing is reviewed by Genfleet before it is published".
Sequential/interaction: card reveal + simulated click.
Audio-coupled idea: card fan, mouse click, soft drop on swap.
Transition mood: smooth slide → Scene 3

### Scene 3 — Workspace — 8.6–13.2s
Left: "Connect your tools. Assemble a team." Right: "Your Genfleet workspace / Team setup" card. Stage icons fill orange on every other beat (9.50, 10.54, 11.60); four avatars stack (12.12); status flips to "Connected and ready to work" at 12.65.
Audio-coupled idea: soft drops per stage, card slide for avatars.
Transition mood: smooth slide → Scene 4

### Scene 4 — Worked example — 13.2–18.9s
Left: "One way of working, for every team." + small orange "Support" chip. Right: four numbered rows from the Support example, revealed every other beat (13.70, 14.76, 15.81, 16.86), each holds to the end. Row 4 numeral and card go blue; at 17.91 a blue "Approved" check lands.
Audio-coupled idea: soft drops on rows, bong on approval.
Transition mood: soft fade → Scene 5

### Scene 5 — Outro — 19.0–23.5s
Agent mark scales in (19.49) and blinks; `genfleet` wordmark; tagline "Your AI team, built around your business."; "Request a demo →" black pill + "Private beta" tag. Hold to end, music fades.
Audio-coupled idea: bell on logo.

**Music mood for this video:** upbeat, warm, business-confident
**Audio summary:** a warm bed carries steady card-and-click accents through the product flow, one bong for the human sign-off, and a bell on the logo while the music fades.
