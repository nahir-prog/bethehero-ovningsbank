# BTH Exercise Schema v1 — Kontrakt

**Status:** Standard för hur AI-agent skapar övningar och hur portalen/HQ importerar dem.
**Schema version:** `1`
**Datum:** 2026-06-05
**Maintainers:** BE THE HERO redaktion

---

## Princip

En övning är **ett objekt med strukturerad data**. Allt — lärarvy, PDF, presentation, redigering i HQ — renderas från samma JSON. Ingen vy får tolka eller gissa innehåll; om det inte finns i datan finns det inte.

**Två zoner:**

| Zon | Innehåll | Exporteras till portalen? |
|---|---|---|
| **Publik** | Allt som lärare och elever ser | ✅ Ja |
| **`internal`** | Produktionsstatus, anteckningar, redaktörsdata | ❌ Aldrig |

Designprincipen: `const {internal, ...portalData} = exercise;` — det är omöjligt att råka exportera interna fält.

---

## Top-level fält

| Fält | Typ | Obligatorisk | Beskrivning |
|---|---|---|---|
| `schemaVersion` | `1` | ✅ | Måste vara exakt `1` |
| `title` | string (3–60) | ✅ | Övningens titel i versaler |
| `slug` | string (kebab-case) | ✅ | URL-säker identifierare, unik |
| `shortDescription` | string (40–400) | ✅ | En till två meningar lärare läser för att förstå övningen |
| `teacherPurpose` | string (40–1000) | ✅ | Varför övningen görs — pedagogiskt syfte |
| `image` | object \| null | optional | Hero-bild eller `null` om saknas |
| `taxonomy` | object | optional | Klassificering för sökning/filtrering |
| `safety` | object | ✅ | Säkerhetsnivå och eventuell varning |
| `metadata` | object | ✅ | Tid, åldrar, arbetsform |
| `requiresPrintMaterials` | boolean | ✅ | `true` om övningen kräver PDF-mall för att fungera |
| `lessonSetup` | object | ✅ | Förberedelse, material, säg-detta-först |
| `implementation` | object | ✅ | Strukturerat genomförande med numrerade steg |
| `reflection` | object | ✅ | Reflektionsfrågor (minst 2) |
| `teacherSupport` | object | ✅ | Tips, anpassningar, riskNote, NPF, follow-up |
| `presentations` | array | optional | Elevvyer (slides) kopplade till övningen |
| `provenance` | object | ✅ | Författare, källa, datum, språk |
| `internal` | object | ✅ (server-side) | Redaktionsdata — exporteras EJ |

---

## Sub-objekt — detaljerat

### `image`

```json
{
  "url": "https://...",
  "alt": "Beskrivande alt-text",
  "generationPrompt": null  // optional — om bilden är AI-genererad
}
```

**Regel:** Om `image` är `null` eller saknas → **ingen bildyta** visas i lärarvy/PDF/elevläge. Endast i Admin/QA visas "Bild saknas" som varning.

### `safety`

```json
{
  "level": "standard" | "extra_care" | "elevhalsa_recommended",
  "note": "string | null"
}
```

| Nivå | Vad det betyder |
|---|---|
| `standard` | Vanlig övning utan särskild risk |
| `extra_care` | Kan väcka starka känslor — kräver `safeStartText` och `riskNote` |
| `elevhalsa_recommended` | Förvarna elevhälsan |

**Påverkar:**
- Lärarvy: säkerhetsbanner överst om `extra_care`
- PDF: tydlig varningsruta överst om `extra_care`
- QA: kräver att `lessonSetup.safeStartText` och `teacherSupport.riskNote` finns om `extra_care`

### `taxonomy`

```json
{
  "themes": ["Gemenskap & inkludering", "Sociala roller"],
  "focusAreas": ["respekt", "klassrumsklimat"],
  "learningAreas": ["värdegrund", "språkutveckling"],
  "classNeeds": ["nystart", "ny klass", "efter konflikt"]
}
```

Alla fält är arrays av strängar och optional individuellt. Används för sökning, filtrering, och rekommendation i portalen.

### `metadata`

```json
{
  "durationMinutes": 20,           // ✅ int > 0
  "preparationMinutes": 2,         // ✅ int >= 0
  "gradeRange": ["4","5","6"],     // ✅ array (F, 1-9)
  "stages": ["mellanstadiet"],     // optional
  "workForm": ["individuellt","helklass"],  // ✅ minst en
  "materialNeeds": ["whiteboard"], // optional
  "cardNeeds": ["MITT VAL"]        // optional, för HERO-KORT/MITT VAL
}
```

### `lessonSetup`

```json
{
  "safeStartText": "Idag bygger vi ihop ett ord. Det finns inga fel svar.",
  "preparation": "Skriv RESPEKT på tavlan...",  // ✅ obligatorisk
  "materials": "Whiteboard, post-it...",        // ✅ obligatorisk
  "printMaterials": []  // ✅ array (kan vara tom)
}
```

`safeStartText` är optional generellt men **obligatorisk om `safety.level === "extra_care"`**.

**`printMaterials`-element:**
```json
{
  "title": "Bra Kompis-korten",         // ✅
  "description": "12 påståendekort...", // ✅
  "filename": "bra-kompis-kort.pdf",    // optional
  "url": "https://..."                  // optional
}
```

### `implementation`

```json
{
  "intro": "Berätta att...",  // optional — lärarintro innan steg
  "steps": [...],             // ✅ minst 2 steg
  "outro": "Foto av tavlan."  // optional — efter sista steget
}
```

**`steps`-element:**
```json
{
  "title": "Skriv ett ord — i tysthet",     // ✅ börja med handlingsverb
  "body": "Varje elev skriver ETT ord...",  // ✅ instruktion till läraren
  "subItems": [                              // optional — punktlista
    "Gruppera lappar som hör ihop",
    "Sätt liknande ord nära varandra"
  ],
  "teacherSays": "Tänk på en gång när...",  // optional — direkt citat till klassen
  "timeEstimate": "2 min"                    // optional men starkt rekommenderat
}
```

### `reflection`

```json
{
  "questions": [
    "Var det något ord som överraskade dig?",
    "Saknades något?",
    "Vad gör det lättare att visa respekt?"
  ]
}
```

✅ Minst 2 frågor. Ställs efter genomförandet, i helklass eller enskilt.

### `teacherSupport`

```json
{
  "tips": ["Om någon inte kommer på ett ord — låt dem rita istället."],
  "adaptations": ["Eleven kan rita sin satellit istället för att skriva."],
  "riskNote": "Kan väcka känslor hos elever som...",  // string | null
  "npfSupport": "Tillåt att skriva eller rita...",    // string | null
  "followUp": "Återkom i en månad och fråga..."       // string | null
}
```

**Regel:** Om `safety.level === "extra_care"` → `riskNote` är obligatorisk och måste vara ≥30 tecken.

### `presentations`

Lista av elevvyer (slides). Vanligast en presentation per övning.

```json
[
  {
    "id": "respektordet-elev-01",        // ✅ unik per presentation
    "exerciseSlug": "respektordet",      // ✅ måste matcha exercise.slug
    "title": "RESPEKT — våra ord",       // ✅
    "audience": "students",              // ✅ enum: students | teacher | both
    "status": "ready",                   // ✅ enum: draft | needs_review | ready
    "slides": [...]                      // ✅ minst 1 slide
  }
]
```

**`slides`-element:**
```json
{
  "title": "Skriv ett ord",                   // ✅
  "body": "Skriv ETT ord eller en kort fras.", // optional — vad eleverna läser
  "prompt": "Vad är respekt?",                 // optional — extra stor fråga
  "instructionForTeacher": "Sätt timer på 2 min. Var tyst själv.",  // VISAS ALDRIG FÖR ELEVER
  "slideType": "individual_task",              // optional — påverkar styling
  "mood": "focused",                           // optional — påverkar bakgrund
  "durationEstimate": "2 min"                  // optional
}
```

**`slideType` enum:**
`intro` · `instruction` · `activity` · `group_activity` · `individual_task` · `discussion` · `group_reading` · `open_discussion` · `reflection` · `voting` · `visualization` · `transition` · `listening` · `silence` · `closing` · `observation` · `brainstorm` · `concept` · `creative_task` · `guided_breathing` · `presentation`

**`mood` enum:** `energetic` · `calm` · `focused` · `still` · `collaborative` · `clear`

### `provenance`

```json
{
  "author": "AI-agent + redaktör",
  "source": "Nybyggd för schema V1-test",
  "createdAt": "2026-06-05",          // ISO date
  "language": "sv"                     // ISO 639-1
}
```

### `internal` — SERVER-SIDE ENDAST

```json
{
  "id": "BTH-V2-001",                              // ✅ unikt internt ID
  "productionStatus": "klar_for_portal",           // ✅ enum (se nedan)
  "qualityChecklist": null,                        // optional — kan lagras
  "notes": "Pilotövning för schemaVersion 1.",    // optional
  "lockedFields": [],                              // optional — fält som inte får ändras
  "createdAt": "2026-06-05",
  "updatedAt": "2026-06-05",
  "createdBy": "AI-agent"
}
```

**`productionStatus` enum:**
`utkast` · `pedagogisk_granskning` · `material_produktion` · `sprakkoll` · `klar_for_portal` · `exporterad`

---

## Render-matrix — vilka fält visas i vilken vy

| Fält | Lärarvy | PDF | Presentation (elever) | Admin/QA | HQ/Studio |
|---|:---:|:---:|:---:|:---:|:---:|
| `title` | ✅ | ✅ | ✅ (i header) | ✅ | ✅ |
| `slug` | — | i footer | — | ✅ | ✅ |
| `shortDescription` | ✅ | ✅ | — | ✅ | ✅ |
| `teacherPurpose` | ✅ (varför-kort) | ✅ (purpose-block) | — | ✅ | ✅ |
| `image` | ✅ (om finns) | ❌ (just nu) | — | ✅ (även varning om saknas) | ✅ |
| `taxonomy` | — | — | — | ✅ | ✅ |
| `safety.level` | ✅ (banner om extra_care) | ✅ (varning överst) | — | ✅ | ✅ |
| `safety.note` | ✅ (i banner) | ✅ (i varning) | — | ✅ | ✅ |
| `metadata.*` | ✅ (meta-tags) | ✅ (meta-tags) | i header | ✅ | ✅ |
| `requiresPrintMaterials` | — | — | — | ✅ (QA-regel) | ✅ |
| `lessonSetup.safeStartText` | ✅ (grön box) | ✅ (grön box) | — | ✅ | ✅ |
| `lessonSetup.preparation` | ✅ | ✅ (Förberedelse-grid) | — | ✅ | ✅ |
| `lessonSetup.materials` | ✅ | ✅ | — | ✅ | ✅ |
| `lessonSetup.printMaterials` | ✅ (lista) | ✅ (lista) | — | ✅ | ✅ |
| `implementation.intro` | ✅ | ✅ (italic) | — | ✅ | ✅ |
| `implementation.steps[].title` | ✅ | ✅ | — (lärarintern) | ✅ | ✅ |
| `implementation.steps[].body` | ✅ | ✅ | — | ✅ | ✅ |
| `implementation.steps[].subItems` | ✅ | ✅ | — | ✅ | ✅ |
| `implementation.steps[].teacherSays` | ✅ (lila box) | ✅ (lila box) | — | ✅ | ✅ |
| `implementation.steps[].timeEstimate` | ✅ (pill) | ✅ (pill) | — | ✅ | ✅ |
| `implementation.outro` | ✅ | ✅ | — | ✅ | ✅ |
| `reflection.questions` | ✅ | ✅ | — | ✅ | ✅ |
| `teacherSupport.tips` | ✅ | ✅ (gul box) | — | ✅ | ✅ |
| `teacherSupport.adaptations` | ✅ | ✅ | — | ✅ | ✅ |
| `teacherSupport.riskNote` | ✅ (röd box) | ✅ (röd box) | — | ✅ | ✅ |
| `teacherSupport.npfSupport` | ✅ | ✅ | — | ✅ | ✅ |
| `teacherSupport.followUp` | ✅ | ✅ | — | ✅ | ✅ |
| `presentations[].slides[].title` | — | — | ✅ (stor) | ✅ (lista) | ✅ |
| `presentations[].slides[].body` | — | — | ✅ | ✅ | ✅ |
| `presentations[].slides[].prompt` | — | — | ✅ (extra prominent) | ✅ | ✅ |
| `presentations[].slides[].instructionForTeacher` | — | — | ✅ (i separat box "VISAS INTE") | ✅ | ✅ |
| `presentations[].slides[].slideType` | — | — | påverkar styling | ✅ | ✅ |
| `presentations[].slides[].mood` | — | — | påverkar bakgrund | ✅ | ✅ |
| `presentations[].slides[].durationEstimate` | — | — | ✅ (hörn) | ✅ | ✅ |
| `provenance.*` | — | — | — | ✅ | ✅ |
| `internal.*` | ❌ ALDRIG | ❌ ALDRIG | ❌ ALDRIG | ✅ | ✅ |

---

## Supabase-mappning till `public.exercises`

Förslag på hur fälten kan mappas till portalens befintliga `exercises`-tabell. **Verifiera mot `supabase/migrations/20260515_exercises_native.sql` innan skrivning** (enligt portal-bethehero-noteringar).

| Schema-fält | Supabase-kolumn | Typ | Anteckning |
|---|---|---|---|
| `title` | `titel` | text | |
| `slug` | `slug` | text | unique |
| `shortDescription` | `kort_beskrivning` | text | |
| `teacherPurpose` | `larar_syfte` | text | |
| `image.url` | `bild_url` | text | nullable |
| `image.alt` | `bild_alt` | text | nullable |
| `taxonomy.themes` | `teman` | text[] | |
| `taxonomy.focusAreas` | `fokus_omraden` | text[] | |
| `safety.level` | `sakerhets_niva` | enum | |
| `safety.note` | `sakerhets_notering` | text | nullable |
| `metadata.durationMinutes` | `tid_minuter` | int | |
| `metadata.preparationMinutes` | `forberedelse_minuter` | int | |
| `metadata.gradeRange` | `arskurser` | text[] | |
| `metadata.workForm` | `arbetsform` | text[] | |
| `requiresPrintMaterials` | `kraver_utskrift` | boolean | |
| `lessonSetup.safeStartText` | `trygg_start` | text | |
| `lessonSetup.preparation` | `forberedelse` | text | |
| `lessonSetup.materials` | `material` | text | |
| `lessonSetup.printMaterials` | `utskriftsmaterial` | jsonb | |
| `implementation` | `genomforande` | jsonb | hela strukturen som JSON |
| `reflection.questions` | `reflektionsfragor` | text[] | |
| `teacherSupport` | `larar_stod` | jsonb | hela strukturen som JSON |
| `presentations` | `presentationer` | jsonb | array av presentations |
| `provenance.author` | `forfattare` | text | |
| `provenance.source` | `kalla` | text | |
| `provenance.createdAt` | `skapad_datum` | date | |
| `provenance.language` | `sprak` | text | default 'sv' |

**Visibility/promotion** (befintligt i portalen):
- `author_user_id = NULL` för officiella BTH-övningar
- `visibility`: `private → school_pending → school → global_pending → global_published`
- Export från facit-modellen ska sätta `visibility = 'global_pending'` initialt så HQ kan granska innan publicering

---

## Validering

### JSON Schema (draft-07)

Se `schemas/exercise.schema.json` — kan användas i HQ för server-side validation.

```js
import Ajv from 'ajv';
const ajv = new Ajv();
const validate = ajv.compile(schema);
if (!validate(exercise)) {
  console.error(validate.errors);
}
```

### Zod (TypeScript)

Se `schemas/exercise.zod.ts` — kan användas i Next.js portalen för type-safe parsing.

```ts
import { ExerciseSchema } from './schemas/exercise.zod';
const parsed = ExerciseSchema.parse(exerciseData);
// parsed har full TypeScript-typning
```

---

## QA-regler (sammanfattning från v2.html)

Alla regler i `checkPortalReady()` ska vara uppfyllda innan export.

**Grönt ljus (alla OK):** Klar att exporteras till portalen.
**Gult ljus (warnings):** Behöver redaktörsgranskning, men kan släppas igenom.
**Rött ljus (missar):** Bör inte exporteras.

| Regel | Nivå | Detalj |
|---|---|---|
| `title` 3-60 tecken | miss | |
| `shortDescription` 40-400 tecken | miss | |
| `teacherPurpose` ≥40 tecken | miss | |
| `metadata` komplett | miss | |
| `reflection.questions` minst 2 | miss | |
| `implementation.steps` minst 2 | miss | |
| Varje steg har `title` + `body` | miss | |
| Stegtitlar börjar med handlingsverb | warn | |
| Inget steg över 600 tecken | warn | |
| `presentations` finns med ≥3 slides | warn | |
| `safeStartText` är specifik (inte generisk) | warn | |
| `safeStartText` finns vid `extra_care` | miss | |
| `riskNote` finns vid `extra_care` | miss | |
| `npfSupport` ≥30 tecken | warn | |
| `requiresPrintMaterials = true` + `printMaterials` finns | miss | annars |
| `image` finns | warn | |
| `teacherSays` ≤70% av stegen | warn | |
| Total storlek <12kB | warn | |
| Inga TODO/placeholder i publik data | miss | |
| `internal.id` läcker inte | warn | |
| Inga produktionsord i publik text | miss | |

---

## Exempel-JSON

Se `examples/`:
- `examples/respektordet.json` — Enkel ny övning, ingen bild, ingen utskriftsmaterial
- `examples/blomman.json` — Migrerad BTH-original med bild och utskriftsmaterial
- `examples/det-du-inte-sa.json` — Extra_care med full safety + risker

Alla exempel är **portal-export-versioner** utan `internal`-fältet.

---

## Versionshantering

`schemaVersion: 1` är nuvarande standard. Om vi gör breaking changes:
- Lägg till `schemaVersion: 2` istället för att modifiera schema 1
- Skriv migration `schema-1-to-2.md` med exakt mappning
- Behåll v1-stöd i portalen tills alla övningar är migrerade
