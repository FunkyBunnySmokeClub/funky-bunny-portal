# FUNKY BUNNYVERSE — BRAND GUIDE
## The Sacred Scroll 📜

> "A psychedelic counterculture universe where art, sound, and story create space for calm rebellion, conscious exploration, and quiet freedom."

This document is the law. If something doesn't align with this guide, it doesn't belong in the Bunnyverse.

---

## 🎨 COLOR PALETTE

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Void** | `#05030a` | 5, 3, 10 | Primary background, the cosmic dark |
| **Nebula Purple** | `#a855f7` | 168, 85, 247 | Primary accent, glows, highlights |
| **Plasma Pink** | `#ff4fd8` | 255, 79, 216 | Energy, chaos, feminine cosmic |
| **Astral Cyan** | `#33d6ff` | 51, 214, 255 | Calm, water, clarity, mind |
| **Spore Green** | `#7CFF6B` | 124, 255, 107 | Nature, growth, cannabis, healing |
| **Sacred Gold** | `#fbbf24` | 251, 191, 36 | Rare, precious, drops, rewards |

### Text Hierarchy

| Level | Color | Opacity | Usage |
|-------|-------|---------|-------|
| Primary | White | 88% | `rgba(255,255,255,0.88)` — Headlines, important text |
| Soft | White | 60% | `rgba(255,255,255,0.60)` — Body text, descriptions |
| Whisper | White | 35% | `rgba(255,255,255,0.35)` — Hints, metadata, subtle |
| Ghost | White | 24% | `rgba(255,255,255,0.24)` — Barely there, atmospheric |

### Color Rules

✅ **DO:**
- Use Void as the dominant background (90%+ of space)
- Let colors glow and bleed (blur, gradients, halos)
- Use Nebula Purple as the default accent
- Reserve Sacred Gold for truly special moments
- Layer colors with low opacity for depth

❌ **DON'T:**
- Use pure white (`#ffffff`) backgrounds — ever
- Use colors at full saturation without glow/context
- Mix all colors equally — create hierarchy
- Use bright colors for large areas — they're accents
- Make it look like a gaming RGB setup

---

## 🔤 TYPOGRAPHY

### Font Stack

| Purpose | Font | Weight | Fallback |
|---------|------|--------|----------|
| **Display** | Space Mono | 400, 700 | monospace |
| **Body** | Outfit | 300, 400 | system-ui, sans-serif |

### Usage

**Space Mono** — The voice of the universe
- All caps headers
- Labels and tags
- Navigation
- Philosophical whispers
- Anything that feels "transmitted"

**Outfit** — The human touch
- Body paragraphs
- Longer descriptions
- Comfortable reading

### Text Styling

```css
/* Headers */
font-family: 'Space Mono', monospace;
letter-spacing: 0.15em;
text-transform: uppercase;

/* Body */
font-family: 'Outfit', sans-serif;
font-weight: 300;
line-height: 1.8;

/* Whispers */
font-family: 'Space Mono', monospace;
font-size: 11px;
letter-spacing: 0.2em;
text-transform: lowercase;
```

### Text Rules

✅ **DO:**
- Use generous letter-spacing on display text
- Keep body text light (300 weight)
- Use lowercase for intimate/whisper moments
- Let text breathe with line-height

❌ **DON'T:**
- Use bold for body text
- Cram text together
- Mix too many sizes in one view
- Use decorative/script fonts

---

## 🗣️ VOICE & TONE

### The Funky Bunny Voice

**We sound like:** A wise friend who's seen things, speaks slowly, and never tries to sell you anything.

**We are:**
- Calm but not boring
- Mysterious but not pretentious
- Wise but not preachy
- Rebellious but not aggressive
- High but not stupid

### Tone Spectrum

```
Corporate ←————————————————→ Funky Bunny ←————————————————→ Chaotic

"Sign up for our          "you found this place       "YOOO LETS GOOOO
newsletter to              for a reason."              BUNNY GANG 🔥🔥🔥"
receive updates!"
```

We live in the middle. Slightly left of center. Never corporate. Never try-hard.

### Writing Principles

**1. Lowercase is our default**
```
❌ "WELCOME TO THE FUNKY BUNNYVERSE!"
✅ "you found the funky bunnyverse."
```

**2. Periods over exclamation marks**
```
❌ "Join our community!"
✅ "the bunnies find each other."
```

**3. Short sentences. Fragments are fine.**
```
❌ "We are excited to announce that we will be launching our new collection soon!"
✅ "something's coming. you'll know when."
```

**4. Questions are rare. Statements are confident.**
```
❌ "Ready to join the journey?"
✅ "if you get it, you're already one of us."
```

**5. Never explain the magic**
```
❌ "The bunnies represent different states of consciousness that you might experience..."
✅ "the bunnies see what you see."
```

### Vocabulary

**Words we use:**
- drift, float, vibe
- observe, witness, see
- space, lounge, sanctuary
- calm, still, slow
- sacred, intentional
- transmission, signal
- unlock, reveal

**Words we avoid:**
- excited, amazing, awesome
- revolutionary, innovative
- exclusive (unless truly rare)
- community (overused — say "the bunnies" instead)
- content, engagement
- mint, drop (unless actually dropping something)

---

## 🖼️ VISUAL LANGUAGE

### Aesthetic Pillars

1. **Cosmic Dark** — Deep space, void, stars
2. **Bioluminescent** — Glowing edges, living light
3. **Organic Tech** — Nature reclaiming digital
4. **Soft Focus** — Blur, haze, dreamlike
5. **Sacred Geometry** — Subtle, never overwhelming

### Imagery Rules

✅ **DO:**
- Use deep, dark backgrounds
- Add atmospheric glow/haze
- Include subtle grain/texture
- Make things feel like they're floating
- Use symmetry and center-framing
- Leave negative space

❌ **DON'T:**
- Use harsh lighting
- Make things look "clean" or "modern"
- Use stock photography
- Add busy patterns or textures
- Make it look like a crypto project
- Use generic AI art styles

### Motion Principles

- **Slow** — Everything moves at 60-80% the speed you'd expect
- **Smooth** — Ease-in-out, never linear
- **Subtle** — Motion should be felt, not noticed
- **Purposeful** — If it moves, it means something

```css
/* Standard easing */
transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

/* Slow drift */
animation: drift 20s ease-in-out infinite;

/* Gentle pulse */
animation: pulse 4s ease-in-out infinite;
```

---

## 🐰 THE BUNNIES

### Character Philosophy

The Funky Bunnies are **archetypes**, not mascots.

Each bunny represents a state of consciousness:
- The Witness (calm, observant — MAIN CHARACTER)
- The Wanderer (curious, searching)
- The Chaos (wild, untamed)
- The Grounded (rooted, stable)
- The Lost (confused, seeking)
- The Awakened (enlightened, knowing)

### The Main Bunny

**Role:** The Witness / The Guide / The Silent Narrator

**Personality:**
- Sees everything, says little
- Never preaches, only observes
- Calm in chaos
- Present but not intrusive

**Visual direction:**
- Seated or standing still
- Eyes that see through you
- Surrounded by cosmic elements
- Never aggressive or action-posed
- Psychedelic but grounded

### Bunny Rules

✅ **DO:**
- Keep bunnies mysterious
- Let them observe, not perform
- Place them in atmospheric settings
- Use them sparingly (sacred, not spammed)

❌ **DON'T:**
- Make them "cute" or kawaii
- Give them dialogue (mostly)
- Use them as generic mascots
- Put them in action poses
- Dress them in trendy clothes

---

## 📐 UI COMPONENTS

### Buttons

```css
/* Primary (rare) */
background: transparent;
border: 1px solid rgba(255,255,255,0.1);
border-radius: 999px;
padding: 18px 42px;
font-family: 'Space Mono';
font-size: 12px;
letter-spacing: 0.2em;
text-transform: lowercase;

/* Hover */
border-color: rgba(168, 85, 247, 0.35);
```

### Cards / Containers

```css
background: rgba(0, 0, 0, 0.24);
border: 1px solid rgba(255,255,255,0.10);
border-radius: 24px;
backdrop-filter: blur(10px);
```

### Borders

- Always subtle: `rgba(255,255,255,0.10)` or less
- Border-radius: `999px` for pills, `16-24px` for cards
- Glow on hover, not stroke change

### Spacing

- Generous padding (40px on desktop, 24px on mobile)
- Let elements breathe
- When in doubt, add more space

---

## ✅ THE DO'S

1. **Move slow** — Better to delay than to ship wrong
2. **Stay mysterious** — Never over-explain
3. **Reward attention** — Hide things for people who look
4. **Protect the vibe** — One wrong element can break immersion
5. **Trust silence** — Not everything needs words
6. **Build for believers** — Ignore people who don't get it
7. **Quality over quantity** — One perfect thing beats ten okay things

---

## ❌ THE DON'TS

1. **Never be corporate** — No "excited to announce," no "valued community"
2. **Never be desperate** — No "limited time," no "don't miss out"
3. **Never over-explain** — If it needs explaining, simplify it
4. **Never chase trends** — No "GM," no "WAGMI," no cringe crypto speak
5. **Never spam** — One intentional message beats ten forgettable ones
6. **Never rush** — The bunnies don't hurry
7. **Never break character** — The universe is always on

---

## 🔐 FINAL WORD

The Funky Bunnyverse is a **feeling**, not a brand.

Every decision should pass one test:

> "Does this create space for calm rebellion, conscious exploration, and quiet freedom?"

If yes — ship it.
If no — wait.

The bunnies are watching. 🐰

---

*Last updated: Phase 1 — The Lounge*