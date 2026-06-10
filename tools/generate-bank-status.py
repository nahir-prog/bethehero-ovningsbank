#!/usr/bin/env python3
"""Generera bank-status.md från exercises.json + exercises-v2.json.

Kör: python3 tools/generate-bank-status.py

Hanterar både Schema v1 (engelska fält, listor) och legacy (svenska fält,
strängar). Använd inte ','.join() på strängar — split char-by-char-buggen.
"""
import json
import datetime
from pathlib import Path

ROOT = Path(__file__).parent.parent

ALL_THEMES = [
    "Empati & perspektiv",
    "Gemenskap & inkludering",
    "Mod & civilkurage",
    "Mobbning & kränkningar",
    "Konflikter",
    "Sociala roller",
    "Grupptryck & normer",
    "Känslor & självreglering",
    "Självkänsla & identitet",
    "Digitala relationer",
]
ALL_GRADES = ["F", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


def normalize_grades(raw):
    """Konvertera alder/gradeRange till lista av strängar.
    Hanterar både list ['F','1','2'] och string 'Åk 7, 8, 9'.
    Normaliserar 'F-klass' → 'F' så coverage räknas korrekt."""
    if isinstance(raw, list):
        items = [str(g).strip() for g in raw if str(g).strip()]
    elif isinstance(raw, str):
        s = raw.replace('Åk', '').replace('åk', '').strip()
        items = [x.strip() for x in s.split(',') if x.strip()]
    else:
        return []
    return [('F' if x == 'F-klass' else x) for x in items]


def normalize_themes(raw):
    if isinstance(raw, list):
        return [str(t).strip() for t in raw if str(t).strip()]
    if isinstance(raw, str):
        return [raw.strip()]
    return []


def get_title(ex):
    return ex.get('title') or ex.get('titel') or '?'


def get_id(ex):
    return ex.get('internal', {}).get('id') or ex.get('id') or '?'


def get_grades(ex):
    return normalize_grades(
        ex.get('metadata', {}).get('gradeRange') or ex.get('alder') or []
    )


def get_themes(ex):
    return normalize_themes(
        ex.get('taxonomy', {}).get('themes')
        or ex.get('fokustema')
        or ex.get('teman')
        or []
    )


def get_status(ex):
    return ex.get('internal', {}).get('productionStatus', '')


def get_print_kinds(ex):
    pms = ex.get('lessonSetup', {}).get('printMaterials', [])
    return [pm.get('kind') for pm in pms if pm.get('kind')]


def main():
    with open(ROOT / 'data' / 'exercises-v2.json') as f:
        v2 = json.load(f)
    with open(ROOT / 'data' / 'exercises.json') as f:
        legacy_data = json.load(f)
    legacy = legacy_data.get('exercises', []) if isinstance(legacy_data, dict) else legacy_data

    v2_exercises = v2['exercises']
    v2_count = len(v2_exercises)
    legacy_count = len(legacy)

    covered = set()
    for ex in v2_exercises + legacy:
        for t in get_themes(ex):
            for g in get_grades(ex):
                covered.add((t, g))

    missing = []
    for t in ALL_THEMES:
        for g in ALL_GRADES:
            if (t, g) not in covered:
                missing.append((t, g))

    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
    lines = [
        "# Bankstatus — översikt för agenten",
        "",
        f"**Senast uppdaterad:** {now}",
        f"**Total:** {legacy_count} legacy + {v2_count} schema v1 = {legacy_count + v2_count} övningar",
        "",
        "Denna fil är agentens snabbreferens för vad som finns i banken och vad som saknas.",
        "Uppdatera vid behov genom att köra `python3 tools/generate-bank-status.py`.",
        "",
        "---",
        "",
        "## Övningar i banken",
        "",
        "### Schema v1 (facit-format)",
        "",
    ]

    for ex in v2_exercises:
        title = get_title(ex)
        eid = get_id(ex)
        grades = ', '.join(get_grades(ex))
        themes = ', '.join(get_themes(ex))
        status = get_status(ex)
        kinds = get_print_kinds(ex)
        status_tag = f" [{status}]" if status and status not in ('klar_for_portal', 'exporterad') else ""
        print_tag = f" + {', '.join(kinds)}" if kinds else ""
        lines.append(f"- **{title}** ({eid}){status_tag} — Åk {grades} · {themes}{print_tag}")

    lines += [
        "",
        "### Legacy (gamla strukturen — för referens & inspiration)",
        "",
    ]
    for ex in legacy:
        title = get_title(ex)
        eid = get_id(ex)
        grades = ', '.join(get_grades(ex))
        themes = ', '.join(get_themes(ex))
        lines.append(f"- **{title}** ({eid}) — Åk {grades} · {themes}")

    lines += [
        "",
        "---",
        "",
        "## Saknade tema × årskurs-kombinationer (Schema v1 + legacy täckning)",
        "",
        f"**{len(missing)} luckor** av totalt {len(ALL_THEMES) * len(ALL_GRADES)} möjliga kombinationer:",
        "",
    ]

    by_theme = {}
    for t, g in missing:
        by_theme.setdefault(t, []).append(g)

    for theme in ALL_THEMES:
        if theme in by_theme:
            gaps = ', '.join(by_theme[theme])
            lines.append(f"- **{theme}** — saknas i åk: {gaps}")

    lines += [
        "",
        "---",
        "",
        "## Schema v1.1 — printMaterials-krav",
        "",
        "Varje post i `lessonSetup.printMaterials[]` måste ha:",
        "- `kind`: `poster` / `worksheet` / `cards` / `template` / `discussion_cards`",
        "- `title`, `description`, `filename`",
        "- `format`: `A4` (default) / `A3` / `A5`",
        "- `audience`: `classroom` / `student` / `teacher`",
        "- `printIntent`: kort text om när läraren använder materialet (≥15 tecken)",
        "",
        "Valfritt: `requiresColor`, `safeMargin`, `sourceExerciseId`, `exerciseSlug`.",
        "",
        "Se SCHEMA.md för fullständig dokumentation och designkrav för affischer.",
        "",
    ]

    out = ROOT / 'data' / 'bank-status.md'
    out.write_text('\n'.join(lines), encoding='utf-8')
    print(f"✓ bank-status.md regenererad: {out}")
    print(f"  {legacy_count + v2_count} övningar ({v2_count} v1 + {legacy_count} legacy)")
    print(f"  {len(missing)} luckor i theme × grade-matrisen")


if __name__ == '__main__':
    main()
