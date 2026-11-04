# Visuels fournis pour la vitrine

Les trois logos originaux restent copiés sans retouche dans `public/brand/`.
Leur usage et leur provenance historique sont inchangés.

Le 4 novembre 2026, l'utilisateur a fourni 19 captures d'application et trois
photographies d'une installation dans ce dossier. Les noms et les octets
originaux sont conservés. `build.cjs` copie explicitement les 19 PNG dans
`dist/screenshots/` et les trois JPEG dans `dist/installations/` ; aucun autre
fichier du dossier n'est publié.

| Famille | Fichiers source | Présentation |
|---|---|---|
| X01 et X01 IA | `X01.PNG`, `X012.PNG`, `X01IA.PNG` | Début, partie en cours, jeu contre l'ordinateur |
| Cricket | `cricket.PNG`, `cricket2.PNG` | Début et partie en cours |
| Course | `course300.PNG`, `course3002.PNG`, `course10.PNG` | Course 300 et variante à dix tours |
| Around the World | `arroundtheworld.PNG` | Numéros dans l'ordre |
| Cible aléatoire | `ciblesaleatoire.PNG` | Numéro à toucher |
| Killer | `killer.PNG`, `killer2.PNG` | Début et partie en cours |
| Tournoi | `tournoi.PNG`, `tournoi2.PNG`, `tourjoi3.PNG` | Tableau, finale et classement |
| Menu | `menu.PNG` | Choix des joueurs, du mode et des options |
| DartLink Remote | `remote1.PNG`, `remote2.PNG`, `remote3.PNG` | Accueil, commandes et noms des joueurs |
| Installation physique | `dartlink1.jpeg`, `dartlink2.jpeg`, `dartlink3.jpeg` | Vue complète, cible et panneau de commandes |

Ces images sont des documents fournis par l'utilisateur. Leur version exacte,
leur méthode de capture et l'état de la carte photographiée ne sont pas
établis par le dépôt. Les captures représentent des écrans et ne constituent
pas une recette fonctionnelle ou matérielle. Le menu fourni montre l'adresse
locale et le QR code de la télécommande ; aucune clé ni mot de passe n'a été
repéré dans les visuels examinés.

Les anciennes captures `public/screenshots/v296-*.png` restent conservées pour
provenance historique. Elles ne sont plus copiées dans le build à compter de
cette évolution. La consigne historique de dépôt automatique est remplacée :
seuls les noms autorisés dans `build.cjs` entrent dans la publication.

Depuis la correction des onglets du 4 novembre 2026, les captures du jeu sont
regroupées sous X01, Cricket, Tournois et Autres. Les photos physiques utilisent
la même fenêtre de galerie avec fermeture sur place ; chaque groupe se parcourt
séparément. La décision précédente du nouvel onglet est remplacée.

## Un onglet par mode — 4 novembre 2026

Base `bed1e2c`. Le retour utilisateur remplace le regroupement en quatre
catégories : Menu est désormais le premier onglet et celui sélectionné au
chargement, suivi de X01, X01 IA, Cricket, Course, Around the World, Cible
aléatoire, Killer et Tournoi. Course regroupe ses variantes 300 et dix tours.
Chaque galerie conserve uniquement les captures de son onglet. Les captures,
le build et les dépendances sont inchangés. La recette vérifie les neuf onglets,
leurs effectifs (1, 2, 1, 2, 3, 1, 1, 2, 3), la sélection initiale du Menu et
la navigation clavier. La galerie photo conserve sa fermeture sur place.
