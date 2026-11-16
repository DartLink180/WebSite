# Identité visuelle DartLink — 16 novembre 2026

Référence vérifiée : `DartLink180/WebSite`, main `abc44da8ab8c0f772eed99fb4cdbc2306e62fbe6`, fichiers racine `style.css`, `index.html` et `public/brand/`. Le dossier React `src/` de WebSite est historique et ne définit pas la charte publiée.

| Usage | Valeur |
| --- | --- |
| Vert principal | `#05ce86` |
| Accent secondaire | `#bdf36b` |
| Fond | `#101417` |
| Panneaux | `#191f23` |
| Texte | `#e9edee` |
| Texte secondaire | `#a1adb1` |
| Bordures | `#293237` |
| Vert sombre | `#04291e` |

Le symbole officiel `mark.png` porte l'empreinte SHA-256 `cefdcd7adacf70df73a73d138bb244f3aebec9cb662fa72e3dd8f27ccbb526ec`. Les icônes PWA Mobile et Remote sont les mêmes variantes du symbole, avec marges de sécurité et fond clair ; elles ne nécessitent pas une nouvelle illustration. Le logo horizontal et la signature proviennent aussi de WebSite sans retouche.

L'harmonisation porte sur les couleurs de marque, les fonds principaux, le texte, les bordures et les métadonnées navigateur. Les couleurs fonctionnelles des erreurs, avertissements, scores et classements restent distinctes. Les dégradés, ombres et nuances secondaires ne sont pas tous ramenés à une couleur unique.

Préparation sur la branche `fix/website-brand-consistency`, depuis `origin/main` actualisé le 16 novembre. Les changements de sources et les tests locaux ne constituent pas une preuve de déploiement ou de recette matérielle.

Le WebSite est la référence : aucun changement de son thème actif ni de ses logos n'est nécessaire. Les anciens styles React ne sont pas utilisés par `build.cjs` et restent conservés comme historique. Le titre change déjà selon la route (`DartLink — …`). Les captures de versions précédentes du jeu restent des archives et ne prouvent pas la couleur des nouvelles interfaces.

L'audit a aussi confirmé que Manager main utilisait `#bdf36b` en accent principal et un ancien SVG ; une branche locale `feat/website-branding` contenait déjà la correction. Elle est reprise sans écraser le travail documentaire local dans un checkout séparé. MobileApp possède deux worktrees du même dépôt, et non deux produits différents.

## Validation locale du 16 novembre

3 tests de build et build réussis ; contrôle du site généré à 390 et 1360 px. Comparaison des originaux PNG par SHA-256 : symbole identique dans le jeu, Remote, Cloud et Manager ; les quatre variantes PWA Mobile et Remote sont identiques deux à deux. Au total, 15 vues inter-dépôts contrôlées dans Chromium : titre, favicon chargé, theme-color #101417, accent #05ce86, images utiles chargées et absence de débordement horizontal.
