# Bankstatus — översikt för agenten

**Senast uppdaterad:** 2026-06-10 12:57
**Total:** 19 legacy + 8 schema v1 = 27 övningar

Denna fil är agentens snabbreferens för vad som finns i banken och vad som saknas.
Uppdatera vid behov genom att köra `python3 tools/generate-bank-status.py`.

---

## Övningar i banken

### Schema v1 (facit-format)

- **RESPEKTORDET** (BTH-V2-001) — Åk 4, 5, 6 · Gemenskap & inkludering, Sociala roller
- **KARTAN ÖVER OSS** (BTH-V2-002) — Åk 6, 7, 8 · Gemenskap & inkludering, Sociala roller, Självkänsla & identitet + template
- **DET DU INTE SA** (BTH-V2-003) — Åk 8, 9 · Empati & perspektiv, Mod & civilkurage, Självkänsla & identitet
- **ANDAS IN OCH UT SOPPA** (BTH-LEGACY-32644) — Åk F, 1, 2, 3, 4, 5, 6, 7, 8, 9 · Känslor & självreglering + worksheet
- **BLOMMAN** (BTH-LEGACY-19123) — Åk F, 1, 2, 3, 4 · Självkänsla & identitet, Känslor & självreglering + template
- **BRA KOMPIS TRIANGEL** (BTH-LEGACY-32731) — Åk 3, 4, 5, 6, 7 · Empati & perspektiv, Självkänsla & identitet, Gemenskap & inkludering + cards
- **MINA RUM PÅ NÄTET** (BTH-V2-004) [pedagogisk_granskning] — Åk 4, 5, 6 · Digitala relationer, Självkänsla & identitet + worksheet
- **FRÅGA FÖRST** (BTH-V2-007) [pedagogisk_granskning] — Åk 2 · Digitala relationer, Empati & perspektiv + poster

### Legacy (gamla strukturen — för referens & inspiration)

- **ALLA ANDRA GÖR DET** (BTH-001) — Åk 7, 8, 9 · Grupptryck & normer, Sociala roller
- **KÄNSLODETEKTIVEN** (BTH-002) — Åk 1, 2, 3 · Känslor & självreglering
- **VEMS FEL ÄR DET EGENTLIGEN?** (BTH-003) — Åk 5, 6, 7 · Sociala roller, Mobbning & kränkningar
- **DET DU SKICKAR ÄR INTE BORTA** (BTH-004) — Åk 8, 9 · Digitala relationer, Mod & civilkurage
- **SANT ELLER FALSKT — MOBBNING EDITION** (BTH-005) — Åk 6, 7, 8 · Mobbning & kränkningar
- **HUR KÄNNS DET?** (BTH-006) — Åk F · Känslor & självreglering, Empati & perspektiv
- **KOMPISLOTTERIET** (BTH-007) — Åk 3, 4 · Gemenskap & inkludering
- **MINA SUPERKRAFTER** (BTH-008) — Åk 2, 3 · Mod & civilkurage, Självkänsla & identitet
- **STOPPA RYKTET** (BTH-009) — Åk 5, 6 · Mobbning & kränkningar, Mod & civilkurage
- **FEMTON SEKUNDER** (BTH-010) — Åk 6, 7 · Mod & civilkurage, Gemenskap & inkludering
- **DEN OSYNLIGA LINJEN** (BTH-011) — Åk 4, 5 · Konflikter, Empati & perspektiv
- **VEM BESTÄMMER VEM JAG ÄR?** (BTH-012) — Åk 8, 9 · Självkänsla & identitet, Grupptryck & normer
- **HJÄLTEN I BERÄTTELSEN** (BTH-013) — Åk F, 1 · Empati & perspektiv, Sociala roller
- **VAD SER ALLA ANDRA?** (BTH-014) — Åk 5, 6 · Digitala relationer, Empati & perspektiv
- **INGEN VINNARE** (BTH-015) — Åk 8, 9 · Konflikter, Empati & perspektiv
- **NÄR KÄNSLAN TAR ÖVER** (BTH-016) — Åk 4, 5 · Känslor & självreglering
- **HEMLIGA HJÄLTEUPPDRAG** (BTH-017) — Åk F, 1, 2, 3 · Mod & civilkurage, Gemenskap & inkludering
- **GÖRA FÖRLÅT** (BTH-018) — Åk F · Empati & perspektiv, Konflikter
- **OSYNLIGA REGLER** (BTH-019) — Åk 7, 8, 9 · Grupptryck & normer, Empati & perspektiv

---

## Saknade tema × årskurs-kombinationer (Schema v1 + legacy täckning)

**26 luckor** av totalt 100 möjliga kombinationer:

- **Gemenskap & inkludering** — saknas i åk: 9
- **Mod & civilkurage** — saknas i åk: 4
- **Mobbning & kränkningar** — saknas i åk: F, 1, 2, 3, 4, 9
- **Konflikter** — saknas i åk: 1, 2, 3, 6, 7
- **Sociala roller** — saknas i åk: 2, 3
- **Grupptryck & normer** — saknas i åk: F, 1, 2, 3, 4, 5, 6
- **Digitala relationer** — saknas i åk: F, 1, 3, 7

---

## Schema v1.1 — printMaterials-krav

Varje post i `lessonSetup.printMaterials[]` måste ha:
- `kind`: `poster` / `worksheet` / `cards` / `template` / `discussion_cards`
- `title`, `description`, `filename`
- `format`: `A4` (default) / `A3` / `A5`
- `audience`: `classroom` / `student` / `teacher`
- `printIntent`: kort text om när läraren använder materialet (≥15 tecken)

Valfritt: `requiresColor`, `safeMargin`, `sourceExerciseId`, `exerciseSlug`.

Se SCHEMA.md för fullständig dokumentation och designkrav för affischer.
