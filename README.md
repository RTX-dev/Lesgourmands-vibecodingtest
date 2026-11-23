# Les Gourmands — Site de clan Destiny 2

Site vitrine du clan **Les Gourmands** (Destiny 2). Carte céleste interactive au style Destiny 2 : fond étoilé animé, planètes réalistes en CSS pur, panneau d'infos du clan au survol de chaque planète (membres, chef, équipe, événements récents).

## Structure

- `index.html` — structure de la page (hero, carte céleste, clan, événements, rejoindre)
- `style.css` — thème Destiny 2 (palette jaune emblème, typographie Josefin Sans, planètes en dégradés CSS)
- `script.js` — champ d'étoiles animé + étoiles filantes, panneau d'info clan, apparitions au scroll
- `netlify.toml` — configuration Netlify (publication statique + headers de sécurité)

Zéro dépendance JS, aucun build : site 100 % statique.

## Modifier les infos du clan

Les données affichées au survol des planètes sont dans `script.js`, objet `clanData` (membres, chef, équipe, événements récents par planète).

## Déploiement Netlify

1. Sur [netlify.com](https://netlify.com) : **Add new site → Import an existing project** → ce repo GitHub.
2. Build command : *laisser vide* — Publish directory : `.` (déjà défini dans `netlify.toml`).
3. Chaque push sur `main` déploie automatiquement ; chaque PR génère un **deploy preview**.

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou :

```bash
npx serve .
```
