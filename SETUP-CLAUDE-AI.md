# 🚀 Setup: BE THE HERO Övningsagent i Claude.ai Projects

Tid: ~15 minuter. När du är klar kan du och teamet börja arbeta med agenten direkt via en länk.

---

## Steg 1 — Skapa Project på Claude.ai

1. Gå till **[claude.ai](https://claude.ai)** och logga in
2. I vänstermenyn, klicka **Projects** → **+ New project**
3. Döp det till: **BE THE HERO — Övningsagent**
4. Beskrivning: *"Pedagogiskt stöd för att skapa och förbättra värdegrundsövningar"*

---

## Steg 2 — Lägg in systempromten

1. Inne i projektet, klicka **⚙ Project knowledge** (kugghjulet uppe till höger)
2. Hitta sektionen **"Custom instructions"** eller **"System prompt"**
3. Kopiera **hela innehållet** från denna fil:
   ```
   /Users/nahiroyal/Documents/Claude/Projects/agent claude/systempromt.md
   ```
4. Klistra in i Custom instructions-fältet
5. Spara

> **Tips:** Du kan öppna `systempromt.md` i Finder, högerklicka → Open With → TextEdit → Cmd+A, Cmd+C för att kopiera allt.

---

## Steg 3 — Ladda upp övningsbanken som kontext

Agenten behöver veta vilka övningar som redan finns för att undvika dubbletter.

1. I projektet, klicka **+ Add content** eller **Upload files**
2. Ladda upp filen:
   ```
   /Users/nahiroyal/Documents/Claude/Projects/agent claude/ovningsbank/data/exercises.json
   ```

> **Viktigt:** Varje gång banken uppdateras (när Claude Code lägger till övningar), ladda upp den nya versionen så agenten alltid är synkad. Du kan göra det manuellt varje vecka, eller bara när du planerar att jobba med agenten.

---

## Steg 4 — Välj modell

Uppe till höger i chattfönstret — välj **Claude Opus 4** (eller senaste Opus).

- Opus = bäst pedagogisk kvalitet, kreativ formulering, svenska nyanser
- Sonnet = snabbare för enkla justeringar
- Default till Opus för övningsskapande

---

## Steg 5 — Bjud in teamet

1. Klicka **Share** i projektet
2. Bjud in teammedlemmar via e-post
3. De ser samma instruktioner, samma kontext, samma agent

---

## Hur du använder agenten

### För att skapa nya övningar
```
Skapa en övning om digitala konflikter för åk 6-7, 30 min, 
gärna med en omröstningsmoment.
```

### För att förbättra befintliga
```
Klistra in BTH-009 STOPPA RYKTET. Den känns lite tunn.
Kan du förstärka den med en visuell scen och tydligare 
inline-reflektion?
```

### För att fylla luckor
```
Vilka teman och årskurser saknas i banken? Föreslå 5 övningar 
som skulle balansera ut den.
```

### För forskningssvar
```
Vad säger forskningen om gruppdynamik för åk 4-5? 
Koppla det till befintliga övningar.
```

---

## Arbetsflöde: Claude.ai ↔ Claude Code

Du har nu TVÅ verktyg som båda förstår systemet:

| Verktyg | När du använder |
|---|---|
| **Claude.ai Projects** | Brainstorming, planering, kreativa övningsidéer, snabba justeringar, forskningsfrågor |
| **Claude Code** (terminalen) | När en övning ska faktiskt SKRIVAS in i banken + pushas till GitHub |

### Typiskt flöde:
1. **Claude.ai:** Be agenten skapa en ny övning. Den genererar JSON-objektet.
2. Kopiera JSON-objektet.
3. **Claude Code:** Skriv: *"Lägg in den här övningen i banken: [klistra in JSON]"*
4. Claude Code skriver till `exercises.json`, committar, pushar.
5. Netlify deployar inom 20 sek.

**Alternativ:** Du kan också säga direkt till Claude Code: *"Skapa en övning om X för åk Y och lägg in den"* — då gör Claude Code allt på en gång.

---

## Live-URL för teamet

Övningsbanken är live på:
- **GitHub:** `https://github.com/nahir-prog/bethehero-ovningsbank`
- **Netlify:** Den URL du fick från Netlify (silver-conkies-... eller bytt namn)

Dela Netlify-URL:n med teamet så de kan se övningarna i webbläsaren.

---

## Underhåll

**Varje vecka:**
- Synka `exercises.json` till Claude.ai Projects (ladda upp ny version)

**När du behöver:**
- Be agenten skapa nya övningar
- Be Claude Code lägga in dem
- Pusha — Netlify deployar automatiskt

**Vid större förändringar:**
- Uppdatera `systempromt.md` lokalt
- Kopiera nya systempromten till Claude.ai Projects Custom instructions
