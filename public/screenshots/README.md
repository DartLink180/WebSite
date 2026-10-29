# Captures de la vitrine

Les sept fichiers `v296-*.png` sont les captures publiées par `build.cjs` :

| Fichier | Écran |
|---|---|
| `v296-menu.png` | Menu de préparation, accueil de la vitrine |
| `v296-x01.png` | X01, partie 101 à deux joueurs |
| `v296-cricket.png` | Cricket Cut-Throat à deux joueurs |
| `v296-course.png` | Course 300 à deux joueurs |
| `v296-around-world.png` | Around the World, arrivée au 20, à deux joueurs |
| `v296-killer.png` | Killer, attribution des numéros à trois joueurs |
| `v296-tournoi.png` | Tournoi, tableau de quatre joueurs |

Provenance : dépôt `DartLink` local, branche `main`, SHA
`9210ae4ed4ed2b25bf91a816906ba03672e1df44`, version déclarée `2.9.6`.
Captures Chromium à 1280 × 720, serveur lancé avec `DARTLINK_SIMULATION=1`
et données temporaires dans `/tmp`, le 29 octobre 2026. Les joueurs et les
états de partie sont fictifs. Ces captures montrent le rendu logiciel et ne
prouvent ni l’installation de v2.9.6 sur une carte, ni le fonctionnement du
matériel ou d’une partie complète.

Les anciens `menu.png` et `mode-*.png` restent dans ce dossier pour provenance
historique, mais ne sont plus copiés dans le build. La décision de les utiliser
sur la vitrine est remplacée par les captures `v296-*.png`.

La section « installations en images » ne contient encore aucune photographie.
Lorsqu’elles seront fournies et autorisées à la publication, ajouter des
fichiers optimisés dans `public/installations/`, les copier explicitement dans
`build.cjs`, puis remplacer chaque emplacement textuel de `app.js` par une
image avec un texte alternatif précis.
