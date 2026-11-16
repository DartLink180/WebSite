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

## Publication vérifiée — 16 novembre 2026

La préparation décrite plus haut est intégrée dans `main` :

| Dépôt | PR | Commit de fusion vérifié |
| --- | --- | --- |
| DartLink | [#122](https://github.com/DartLink180/DartLink/pull/122) | `3de4a40a5f02f0a294c80617b6e934dfc09fb434` |
| MobileApp | [#2](https://github.com/DartLink180/DartLink-MobileApp/pull/2) | `2ee8b0650649376c945d5e8418503ae98f888a2a` |
| Remote | [#17](https://github.com/DartLink180/DartLink-Remote/pull/17) | `062e150f9292ff40e0ece81c8b5a63c99e11e4a2` |
| Cloud | [#14](https://github.com/DartLink180/DartLink-Cloud/pull/14) | `bcd406861d67c7a0fb326d94d3cefedb8f973661` |
| Manager | [#30](https://github.com/DartLink180/DartLink-Manager/pull/30) | `f5029b6cfb4ca7de1c64259c4370e7b67be0eb57` |
| WebSite, documentation | [#15](https://github.com/DartLink180/WebSite/pull/15) | `8b8bf2e247aa4991c6b2f348128d22311a86abfb` |

CI GitHub jeu PR et main réussies, ainsi que CI Remote PR. [Publication du jeu](https://github.com/DartLink180/DartLink/actions/runs/43876474111) réussie : tag et [Release v2.11.0-rc.2](https://github.com/DartLink180/DartLink/releases/tag/v2.11.0-rc.2), préversion publiée, avec `dartlink-v2.11.0-rc.2.tar.gz` et `release.json`. Paquet de 3 485 777 octets, SHA-256 `64ccb3ac271468d53e36b09e8d6025c77917384c107d1a8a1971731bf1cc8a5d`.

Vérification en lecture seule du Manager actif : version disponible, statut `test`, protocole minimum 2, `pilot_only=0`, identité correspondant au commit de fusion et cache GitHub frais. Archive importée relue : empreinte conforme, titre et favicon présents dans le HTML. Aucun déclenchement manuel de synchronisation ou de tâche de mise à jour.

Toutes les branches distantes ont été récupérées après publication ; la présence des changements dans `main` a été vérifiée. WebSite documentaire fusionné avec `[skip ci]`, aucun run Pages associé au commit de fusion au contrôle. Aucun service web ni aucune cible n'a été déployé pendant cette intervention : les pages hébergées et les kiosques en cours d'exécution conservent leur version jusqu'à une intervention distincte. Les travaux utilisateur non committés dans les checkouts MobileApp et Manager ont été préservés.
