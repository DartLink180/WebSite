> Mémoire de développement : [point d’entrée](docs/memoire/README.md).

# DartLink — vitrine

Nouvelle vitrine : thème sombre inspiré du Manager, accents verts, navigation mobile et captures du jeu. Voir [la refonte et sa validation](docs/REFONTE-VITRINE.md).

Les trois logos originaux fournis dans `screenshots/` sont intégrés sans retouche : logo horizontal, signature complète et symbole. Le symbole sert également de favicon.

```bash
npm install --package-lock=false
npm run dev
npm test
npm run build
npm run preview
```

Le build utilise uniquement Node.js. Il copie les pages et les ressources explicitement autorisées dans `dist/`. Les tests de navigateur optionnels sont décrits dans le document de refonte.

## Historique : DartLink V2 — prototype validé

La version V2 utilisait `index.html`, `app.js` et `style.css` à la racine. Ouvrir `index.html` sans installation pour la consulter. Générer la sortie GitHub Pages avec `node build.cjs` : les fichiers sont copiés dans `dist/`.

Les boutons « Manager » et « Explorer le Manager » ouvrent le Manager réel sur `https://dartlink.fr/manager/`. Les anciennes routes `#/login` et `#/manager` y redirigent également. Le code historique de démonstration est conservé dans le dépôt ; ses écrans ne sont plus accessibles par ces routes. Voir `PROTOTYPE.md` pour le prototype historique et `RESTAURATION.md` pour revenir à la version précédente.

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

## Lien DartLink Remote (préparation)

Une branche de préparation ajoute « Télécommande » au menu et « Ouvrir DartLink Remote » sur l’accueil, tous deux dirigés vers `https://dartlink.fr/remote/`. Cette URL doit être activée sur la vitrine après vérification du déploiement HTTPS de la PWA sous `/remote/`. Le sous-domaine `remote.dartlink.fr` pourra être utilisé plus tard lorsque son DNS et son certificat seront prêts. La Pull Request reste en brouillon jusque-là.
