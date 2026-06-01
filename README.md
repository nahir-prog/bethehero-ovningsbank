# BE THE HERO — Övningsbank

Intern övningsbank för Be the Hero-programmet (bethehero.se).

## Innehåll

- `index.html` — Övningsbanken (filtrera, lärarvy, presentationsläge)
- `data/exercises.json` — All övningsdata
- `netlify.toml` — Konfiguration för Netlify-deploy

## Lägga till övningar

Övningar läggs till via Claude Code. Be agenten skapa en ny övning så skriver den direkt till `exercises.json` och pushar till GitHub. Netlify deployar automatiskt inom 30 sekunder.

## Lokal utveckling

```bash
cd ovningsbank
python3 -m http.server 7825
# Öppna http://localhost:7825
```
