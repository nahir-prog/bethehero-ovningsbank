# Bankstatus — översikt för agenten

**Senast uppdaterad:** 2026-06-10 10:02
**Total:** 19 legacy + 8 schema v1 = 27 övningar

Denna fil är agentens snabbreferens för vad som finns i banken och vad som saknas.
Uppdatera vid behov genom att köra `python3 tools/generate-bank-status.py`.

---

## Övningar i banken

### Schema v1 (facit-format)

- **RESPEKTORDET** (BTH-V2-001) — Åk 4,5,6 · Gemenskap & inkludering, Sociala roller
- **KARTAN ÖVER OSS** (BTH-V2-002) — Åk 6,7,8 · Gemenskap & inkludering, Sociala roller, Självkänsla & identitet + template
- **DET DU INTE SA** (BTH-V2-003) — Åk 8,9 · Empati & perspektiv, Mod & civilkurage, Självkänsla & identitet
- **ANDAS IN OCH UT SOPPA** (BTH-LEGACY-32644) — Åk F,1,2,3,4,5,6,7,8,9 · Känslor & självreglering + worksheet
- **BLOMMAN** (BTH-LEGACY-19123) — Åk F,1,2,3,4 · Självkänsla & identitet, Känslor & självreglering + template
- **BRA KOMPIS TRIANGEL** (BTH-LEGACY-32731) — Åk 3,4,5,6,7 · Empati & perspektiv, Självkänsla & identitet, Gemenskap & inkludering + cards
- **MINA RUM PÅ NÄTET** (BTH-V2-004) [pedagogisk_granskning] — Åk 4,5,6 · Digitala relationer, Självkänsla & identitet + worksheet
- **FRÅGA FÖRST** (BTH-V2-007) [pedagogisk_granskning] — Åk 2 · Digitala relationer, Empati & perspektiv + poster

### Legacy (gamla strukturen — för referens & inspiration)

- **?** (BTH-001) — Åk Å,k, ,7,,, ,8,,, ,9 · 
- **?** (BTH-002) — Åk Å,k, ,1,,, ,2,,, ,3 · 
- **?** (BTH-003) — Åk Å,k, ,5,,, ,6,,, ,7 · 
- **?** (BTH-004) — Åk Å,k, ,8,,, ,9 · 
- **?** (BTH-005) — Åk Å,k, ,6,,, ,7,,, ,8 · 
- **?** (BTH-006) — Åk F,-,k,l,a,s,s · 
- **?** (BTH-007) — Åk Å,k, ,3,,, ,4 · 
- **?** (BTH-008) — Åk Å,k, ,2,,, ,3 · 
- **?** (BTH-009) — Åk Å,k, ,5,,, ,6 · 
- **?** (BTH-010) — Åk Å,k, ,6,,, ,7 · 
- **?** (BTH-011) — Åk Å,k, ,4,,, ,5 · 
- **?** (BTH-012) — Åk Å,k, ,8,,, ,9 · 
- **?** (BTH-013) — Åk F,-,k,l,a,s,s,,, ,Å,k, ,1 · 
- **?** (BTH-014) — Åk Å,k, ,5,,, ,6 · 
- **?** (BTH-015) — Åk Å,k, ,8,,, ,9 · 
- **?** (BTH-016) — Åk Å,k, ,4,,, ,5 · 
- **?** (BTH-017) — Åk F,-,k,l,a,s,s,,, ,Å,k, ,1,,, ,2,,, ,3 · 
- **?** (BTH-018) — Åk F,-,k,l,a,s,s · 
- **?** (BTH-019) — Åk Å,k, ,7,,, ,8,,, ,9 · 

---

## Saknade tema × årskurs-kombinationer (Schema v1)

**55 luckor** av totalt 100 möjliga kombinationer:

- **Empati & perspektiv** — saknas i åk: F, 1
- **Gemenskap & inkludering** — saknas i åk: F, 1, 2, 9
- **Mod & civilkurage** — saknas i åk: F, 1, 2, 3, 4, 5, 6, 7
- **Mobbning & kränkningar** — saknas i åk: F, 1, 2, 3, 4, 5, 6, 7, 8, 9
- **Konflikter** — saknas i åk: F, 1, 2, 3, 4, 5, 6, 7, 8, 9
- **Sociala roller** — saknas i åk: F, 1, 2, 3, 9
- **Grupptryck & normer** — saknas i åk: F, 1, 2, 3, 4, 5, 6, 7, 8, 9
- **Digitala relationer** — saknas i åk: F, 1, 3, 7, 8, 9

---

## Schema-fält att tänka på (Schema v1.1)

**printMaterials uppgraderad** — varje post måste ha: `kind`, `title`, `description`, `filename`, `format`, `audience`, `printIntent` + valfritt `requiresColor`, `safeMargin`, `sourceExerciseId`, `exerciseSlug`.

**kind-värden:** `poster` / `worksheet` / `cards` / `template` / `discussion_cards`

**audience-värden:** `classroom` (sätts upp) / `student` (eleven fyller i) / `teacher` (lärarstöd)

Se SCHEMA.md för fullständiga regler och designkrav för affischer.
