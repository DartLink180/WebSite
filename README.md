# DartLink V2 — prototype validé

La version publiée utilise désormais `index.html`, `app.js` et `style.css` à la racine. Ouvrir `index.html` sans installation pour la consulter. Générer la sortie GitHub Pages avec `node build.cjs` : les fichiers sont copiés dans `dist/`.

Le Manager est une démonstration avec connexion simulée, données fictives et modes clair/sombre. Aucun accès PiServeur ou GitHub réel. Voir `PROTOTYPE.md` pour les parcours et `RESTAURATION.md` pour revenir à la version précédente.

L’ancien code React ci-dessous reste conservé dans le dépôt mais n’est plus utilisé pour la publication.

## Documentation historique V1

Site vitrine statique, responsive et moderne pour l’application **DartLink** (jeu de fléchettes sur Raspberry Pi).

## Stack

- Vite
- React

## Installation

```bash
# 1) Installer les dépendances
npm install

# 2) Lancer en développement
npm run dev
```

## Build production

```bash
# Générer les fichiers statiques
npm run build

# Prévisualiser le build en local
npm run preview
```

## Déploiement

### Option 1 — GitHub Pages

1. Poussez le projet sur GitHub.
2. Dans `vite.config.js`, adaptez `base` si le dépôt n’est pas à la racine de domaine:
   - Exemple: `base: '/nom-du-repo/'`
3. Lancez le build:

```bash
npm run build
```

4. Déployez le dossier `dist/` sur GitHub Pages (via GitHub Actions ou branche `gh-pages`).

Exemple rapide avec `gh-pages` (optionnel):

```bash
npm install -D gh-pages
npx gh-pages -d dist
```

### Option 2 — Vercel

1. Importez le dépôt GitHub dans Vercel.
2. Paramètres automatiques recommandés:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Lancez le déploiement.

## Structure du projet

```text
.
├── index.html
├── package.json
├── vite.config.js
├── src
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── README.md
```

## Sections incluses

- Accueil
- Fonctionnalités
- Modes de jeu
- Matériel
- Captures d’écran (placeholders)
- Installation
- Contact
