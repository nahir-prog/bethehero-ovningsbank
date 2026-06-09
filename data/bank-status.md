# Bankstatus — översikt för agenten

**Senast uppdaterad:** 1781015453.2180235
**Total:** 19 legacy + 6 schema v1 = 25 övningar

Denna fil är agentens snabbreferens för vad som finns i banken och vad som saknas.
Uppdatera vid behov genom att köra `python3 tools/generate-bank-status.py`.

---

## Övningar i banken

### Schema v1 (facit-format)

- **BLOMMAN** (BTH-LEGACY-19123) — Åk F,1,2,3,4 · Självkänsla & identitet, Känslor & självreglering
- **ANDAS IN OCH UT SOPPA** (BTH-LEGACY-32644) — Åk F,1,2,3,4,5,6,7,8,9 · Känslor & självreglering
- **BRA KOMPIS TRIANGEL** (BTH-LEGACY-32731) — Åk 3,4,5,6,7 · Empati & perspektiv, Självkänsla & identitet
- **RESPEKTORDET** (BTH-V2-001) — Åk 4,5,6 · Gemenskap & inkludering, Sociala roller
- **KARTAN ÖVER OSS** (BTH-V2-002) — Åk 6,7,8 · Gemenskap & inkludering, Sociala roller
- **DET DU INTE SA** (BTH-V2-003) — Åk 8,9 · Empati & perspektiv, Mod & civilkurage

### Legacy (19 st, gamla strukturen — för referens & inspiration)
- **ALLA ANDRA GÖR DET** (BTH-001) — Åk 7,8,9 · Grupptryck & normer, Sociala roller
- **KÄNSLODETEKTIVEN** (BTH-002) — Åk 1,2,3 · Känslor & självreglering
- **VEMS FEL ÄR DET EGENTLIGEN?** (BTH-003) — Åk 5,6,7 · Sociala roller, Mobbning & kränkningar
- **DET DU SKICKAR ÄR INTE BORTA** (BTH-004) — Åk 8,9 · Digitala relationer, Mod & civilkurage
- **SANT ELLER FALSKT — MOBBNING EDITION** (BTH-005) — Åk 6,7,8 · Mobbning & kränkningar
- **HUR KÄNNS DET?** (BTH-006) — Åk F · Känslor & självreglering, Empati & perspektiv
- **KOMPISLOTTERIET** (BTH-007) — Åk 3,4 · Gemenskap & inkludering
- **MINA SUPERKRAFTER** (BTH-008) — Åk 2,3 · Mod & civilkurage, Självkänsla & identitet
- **STOPPA RYKTET** (BTH-009) — Åk 5,6 · Mobbning & kränkningar, Mod & civilkurage
- **FEMTON SEKUNDER** (BTH-010) — Åk 6,7 · Mod & civilkurage, Gemenskap & inkludering
- **DEN OSYNLIGA LINJEN** (BTH-011) — Åk 4,5 · Konflikter, Empati & perspektiv
- **VEM BESTÄMMER VEM JAG ÄR?** (BTH-012) — Åk 8,9 · Självkänsla & identitet, Grupptryck & normer
- **HJÄLTEN I BERÄTTELSEN** (BTH-013) — Åk F,1 · Empati & perspektiv, Sociala roller
- **VAD SER ALLA ANDRA?** (BTH-014) — Åk 5,6 · Digitala relationer, Empati & perspektiv
- **INGEN VINNARE** (BTH-015) — Åk 8,9 · Konflikter, Empati & perspektiv
- **NÄR KÄNSLAN TAR ÖVER** (BTH-016) — Åk 4,5 · Känslor & självreglering
- **HEMLIGA HJÄLTEUPPDRAG** (BTH-017) — Åk F,1,2,3 · Mod & civilkurage, Gemenskap & inkludering
- **GÖRA FÖRLÅT** (BTH-018) — Åk F · Empati & perspektiv, Konflikter
- **OSYNLIGA REGLER** (BTH-019) — Åk 7,8,9 · Grupptryck & normer, Empati & perspektiv

---

## Täckning per tema (totalt över båda strukturerna)

| Tema | Antal | Status |
|---|---|---|
| Konflikter | 3 | ✅ Bra |
| Sociala roller | 5 | ✅ Bra |
| Mod & civilkurage | 6 | ✅ Bra |
| Digitala relationer | 2 | ⚠ Tunt |
| Empati & perspektiv | 9 | ✅ Bra |
| Grupptryck & normer | 3 | ✅ Bra |
| Mobbning & kränkningar | 3 | ✅ Bra |
| Gemenskap & inkludering | 6 | ✅ Bra |
| Självkänsla & identitet | 6 | ✅ Bra |
| Känslor & självreglering | 5 | ✅ Bra |

---

## Täckning per årskurs

| Årskurs | Antal | Status |
|---|---|---|
| F-klass | 6 | ✅ Bra |
| Åk 1 | 5 | ✅ Bra |
| Åk 2 | 5 | ✅ Bra |
| Åk 3 | 7 | ✅ Bra |
| Åk 4 | 7 | ✅ Bra |
| Åk 5 | 8 | ✅ Bra |
| Åk 6 | 9 | ✅ Bra |
| Åk 7 | 8 | ✅ Bra |
| Åk 8 | 9 | ✅ Bra |
| Åk 9 | 7 | ✅ Bra |

---

## 🎯 Tydliga luckor — agenten bör föreslå nya övningar här


**Saknade tema-ålder-kombinationer (TOP 10):**
- Konflikter × Åk 1
- Konflikter × Åk 2
- Konflikter × Åk 3
- Konflikter × Åk 6
- Konflikter × Åk 7
- Sociala roller × Åk 2
- Sociala roller × Åk 3
- Mod & civilkurage × Åk 4
- Digitala relationer × F-klass
- Digitala relationer × Åk 1
- Digitala relationer × Åk 2
- Digitala relationer × Åk 3
- Digitala relationer × Åk 4
- Digitala relationer × Åk 7
- Empati & perspektiv × Åk 2


---

## Regler för agenten

1. **Skapa alltid i Schema v1-format** — använd `examples/respektordet.json` som mall.
2. **Föreslå övningar som fyller luckorna ovan** — välj från "Tydliga luckor".
3. **Använd EJ legacy-strukturen** — den finns bara för inspiration och referens.
4. **Kontrollera dubbletter mot BÅDA strukturerna** — innan ny övning skapas.
5. **Smal målgrupp** — föredra åk 5–6 framför åk 4–6, och åk 8–9 framför åk 7–9.
