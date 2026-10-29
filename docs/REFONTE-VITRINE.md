# Refonte de la vitrine DartLink

## Périmètre et provenance

Travail local du 23 octobre 2026, basé sur WebSite `a15abc927184aa8be7342131ff339408225eec7c`.
L’utilisateur autorise le développement et la publication de la vitrine.
Le thème reprend le fond `#101417`, les panneaux `#191f23`, les contours
`#293237` et la typographie système du Manager, référence
`b9b7b30612820fb5cd132032c4a3d1f4491396f0`, avec un accent vert adapté à
la nouvelle identité présentée. Le Manager n’est pas modifié par ce travail.

Les pages publiques restent accessibles par fragments : accueil,
`#/experience`, `#/faq`, `#/contact`, `#/mentions`. Les anciennes routes
`#/login` et `#/manager`, y compris leurs sous-routes, ouvrent le Manager réel.
Les chemins inconnus affichent une page dédiée avec retour à l’accueil.

La navigation mobile possède un bouton avec état accessible, une fermeture
au clavier et un lien d’évitement. Les boutons utilisent des icônes SVG pour
éviter les glyphes absents de certaines polices système. Les captures du jeu
sont celles déjà présentes dans le dépôt ; elles ne constituent pas une
recette matérielle des installations.

## Logos intégrés — 26 octobre 2026

Les originaux ajoutés sur GitHub au commit `e2afde1` sont conservés dans
`screenshots/` et copiés à l’identique dans `public/brand/` pour Vite et le build :

- `Logo_DartLink_Text.png` → `wordmark.png`, en-tête et pied de page ;
- `Logo_DartLink_Complet.png` → `signature.png`, accueil ;
- `Logo_DartLink_Simple.png` → `mark.png`, section Manager et favicon.

Les supports clairs préservent le contraste des parties vert sombre. Le build
échoue si un logo manque. Aucune génération ni retouche des originaux.

## Construction et vérification

Le site reste statique et sans dépendance de production. Vite sert uniquement
au développement et à la prévisualisation. Le build copie une liste explicite
de ressources ; aucun contenu arbitraire de `public/` n’est publié.
Il ne nettoie pas une sortie existante. La CI travaille sur un checkout neuf ;
les tests de build utilisent des répertoires temporaires neufs.

```bash
node --check app.js
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Dans un second terminal, les tests navigateur nécessitent Playwright et
Chromium. L’environnement courant les fournit hors du dépôt. Indiquer le
module Playwright installé via `PLAYWRIGHT_MODULE` si celui-ci n’est pas
résolu par Node ; `CHROMIUM_PATH` permet de choisir le binaire Chromium
(par défaut `/usr/bin/chromium`). `SITE_URL` désigne le serveur local de test
(par défaut `http://127.0.0.1:4173`). Ne pas utiliser le service de production
pour cette recette.

```bash
PLAYWRIGHT_MODULE=/chemin/vers/playwright npm run test:browser
```

Les trois tests Node couvrent une sortie complète, la conservation exacte
des fichiers de marque fournis, l’exclusion des fichiers non autorisés et
l’échec si une capture indispensable manque. Les originaux sont également chargés dans la recette navigateur.

La recette Chromium couvre 24 combinaisons de routes et de largeurs
(1440, 768, 390 et 320 px), le menu mobile et Échap, la FAQ, la validation du
formulaire, l’absence de transmission, le lien d’évitement et les trois
redirections historiques. Les requêtes vers le Manager sont interceptées :
aucune connexion administrateur réelle n’est exécutée. Deux captures sont
écrites dans le répertoire temporaire du système pour inspection visuelle.

## Contenu et publication

Le formulaire reste une simulation clairement signalée. Aucun destinataire,
service d’envoi ou identifiant n’est inventé. Les informations légales complètes
de l’éditeur restent à renseigner à partir d’informations vérifiées, comme
avant la refonte.

Le blocage initial des pièces jointes est résolu par leur dépôt sur GitHub.
Les accès HTTPS au site et à l’API GitHub ont été rétablis. GitHub Pages indique
`https://dartlink.fr/` comme URL et utilise le workflow du dépôt.
La refonte est préparée pour publication avec les trois logos originaux.

Après intégration et validation : vérifier le diff et la fraîcheur de `main`,
publier le changement autorisé, puis suivre le workflow GitHub Pages existant.
Confirmer l’URL réellement configurée dans Pages et comparer les fichiers
servis au build avant d’annoncer la mise en ligne. Ne pas assimiler la
publication Pages à une mise à jour de PiServeur ou du Manager.


## Publication et contrôle du domaine — 26 octobre 2026

Refonte publiée sur `main` au commit `d328ea379f2dac3600aaa172f6ceea9d343c3fd5`.
Le workflow [40336781126](https://github.com/DartLink180/WebSite/actions/runs/40336781126)
a terminé avec succès (build et déploiement GitHub Pages). Les trois tests Node
et les 24 combinaisons de routes et tailles dans Chromium ont réussi avec les
logos originaux. Le build conserve leurs octets et la recette charge les images.

Attention : cette réussite ne correspond pas encore au site visible sur le domaine.
Après le workflow, `https://dartlink.fr/` sert toujours l’ancien HTML de 420 octets,
avec Last-Modified au 20 octobre ; `/brand/wordmark.png` répond 404. Une requête
avec paramètre de version confirme l’ancien contenu. L’URL GitHub Pages redirige
vers ce domaine, mais les réponses du domaine ne correspondent pas au build.
L’hébergement effectif doit être identifié et mis à jour avec un accès autorisé ;
aucun accès SSH de déploiement n’est configuré dans cet environnement cloud.
Ne pas changer le DNS à l’aveugle : le domaine héberge aussi le Manager réel.
La mise en ligne visible reste donc en attente de cet accès.

## Déploiement sur le serveur du domaine — 26 octobre 2026

Le constat précédent est historique. Le serveur qui répond pour `dartlink.fr`
servait la vitrine depuis une release statique locale, distincte du proxy
`/manager/`. Après sauvegarde privée de la vitrine et de la configuration
Nginx, les deux directives `root` de la vitrine (HTTPS et redirection HTTP)
ont été orientées vers une release construite depuis
`d328ea379f2dac3600aaa172f6ceea9d343c3fd5`. Le bloc de proxy Manager
n'a pas été modifié. La configuration Nginx a passé `nginx -t`, puis a été
rechargée.

Contrôle réel après bascule : `https://dartlink.fr/` répond 200 avec le nouvel
HTML de 843 octets. Les empreintes SHA-256 des dix fichiers publiés (HTML,
JavaScript, CSS, trois logos et quatre captures) correspondent octet pour
octet au build du commit. `/manager/` répond 200 ; le PID et l'heure de
démarrage du service Manager sont identiques avant et après. Les redirections
HTTP et `www` vers l'URL HTTPS principale répondent 301. Les trois tests Node
du build ont été exécutés à nouveau et réussissent.

Cette vérification confirme les ressources servies et la disponibilité HTTP
du Manager ; elle ne constitue pas un nouveau test interactif en navigateur
ni une recette du Manager. La sauvegarde et les détails d'exploitation restent
sur le serveur, hors de ce dépôt public.

## Lien vers DartLink Remote — préparation du 26 octobre 2026

La branche `feat/remote-link`, issue de `main` à `8b511698a0aa9dbcaa4f51905bc8cc5e295c874f`, ajoute un lien de menu « Télécommande » sur toutes les pages et un bouton « Ouvrir DartLink Remote » sur l’accueil. Les deux ciblent `https://dartlink.fr/remote/`. La destination est constante et n’ajoute ni intégration réseau locale ni code Manager à la vitrine.

Ce changement est préparé en Pull Request brouillon, sans fusion ni déploiement. Le code de la PWA est dans `DartLink180/MobileApp` sur `develop/pwa-v1` ; la PWA n’est pas encore hébergée. La résolution DNS publique interrogée le 26 octobre 2026 renvoie NXDOMAIN pour `remote.dartlink.fr`. Le lien vise donc provisoirement `/remote/` sur le domaine principal, où la PWA est construite avec un service worker limité à ce chemin. Fusionner cette branche avant que cette URL HTTPS fonctionne créerait un lien cassé. Valider d’abord le déploiement et la disponibilité de l’URL cible ; la recette sur smartphones et Raspberry Pi reste distincte.

Vérifications locales effectuées : `node --check app.js`, `npm test` (3 tests), `npm run build` et recette Chromium (24 combinaisons de routes/largeurs, navigation mobile et présence des deux liens vers le sous-domaine). Les destinations externes ne sont pas ouvertes pendant la recette. Le comportement de la PWA et l’accès réel à la télécommande ne sont pas certifiés par ces tests de vitrine.

## Publication du lien — 26 octobre 2026

Le paragraphe de préparation précédent est historique. La vitrine issue du commit `0fba9f5d0cbf4328e1a03de45072554b5959e5be` de `main` est maintenant servie par le Nginx de `dartlink.fr`. Le lien du menu et le bouton d’accueil ouvrent `https://dartlink.fr/remote/`, où la PWA issue du commit MobileApp `07a6fbb70c838676628282bbf2ff42c878f80c45` est servie sous un chemin distinct. Les ressources de la vitrine restent issues d'une release statique immuable ; le proxy `/manager/` n'a pas été changé.

Après `nginx -t` et rechargement, la vitrine, son `app.js`, `/remote/`, son manifeste et `/manager/` ont répondu 200 en HTTPS avec certificat valide lors de requêtes dirigées vers le Nginx local. L'empreinte SHA-256 du `app.js` servi correspond au build du commit. Un parcours Chromium à largeur mobile a suivi le bouton d'accueil jusqu'à la PWA. La suite de la vitrine a aussi réussi : trois tests Node et 24 combinaisons de routes et largeurs. Ces résultats ne valident ni la découverte DNS `.lan` ni l'ouverture de la télécommande sur de vrais téléphones. Le sous-domaine `remote.dartlink.fr` reste sans DNS public vérifié.

## Page L’expérience — 29 octobre 2026

Sur WebSite `main` `92ed58d9abaf8f653bf5e396d5434e80ee087b2f`, la page
L’expérience a été mise à jour pour suivre les six modes du menu de DartLink
`main` `9210ae4ed4ed2b25bf91a816906ba03672e1df44` (version 2.9.6) :
X01, Cricket, Course 300, Around the World, Killer et Tournoi. La FAQ et
l’aperçu d’accueil ont été actualisés. Les options affichées dans les textes
proviennent du menu et des moteurs du jeu à ce SHA. Les versions installées
sur des cartes précises peuvent différer.

Les captures `v296-*.png` proviennent d’un serveur du jeu lancé en simulation
locale avec données temporaires. Chromium a capturé le menu et une partie ou
préparation pour chaque mode à 1280 × 720 ; voir
[le détail des fichiers](../public/screenshots/README.md). Le build utilise
désormais ces sept images via sa liste explicite. Les anciennes captures
restent dans le dépôt comme historique et ne sont plus publiées par le build.
Cette décision remplace celle de la refonte initiale qui affichait les
captures antérieures pour trois modes.

Trois espaces textuels réservent la place de photos des installations : vue
d’ensemble, cible et équipement, espace de jeu. Aucune photographie physique
n’a été fournie dans ce changement. Leur ajout exigera des fichiers source,
un texte alternatif fidèle et leur inclusion explicite dans `build.cjs`.
Cette section ne constitue ni une recette matérielle, ni une preuve de
déploiement de la vitrine ou de v2.9.6 sur une carte.

Validation locale : `node --check app.js`, trois tests Node du build et
`git diff --check` réussis. Un build propre dans un dossier temporaire a
été servi seulement sur `127.0.0.1`. La recette Chromium a réussi pour six
routes à quatre largeurs (1440, 768, 390 et 320 px), dont le chargement de
toutes les captures, les six modes et les trois emplacements photo ; aucune
erreur JavaScript, ressource manquante ni débordement horizontal relevé.
Les parcours habituels de menu mobile, FAQ, formulaire et redirection Manager
ont également réussi. Inspection visuelle supplémentaire de la page à
1280 et 390 px. Aucun changement n’a été publié ou déployé par cette recette.

### Préparation de publication — 29 octobre 2026

Le contrôle préalable a trouvé une divergence entre `main` `92ed58d9` et la
release effectivement servie par Nginx `mobile-20261027-175824` : cette
release ajoutait le lien « Jouer sur mobile » dans le menu et l’accueil.
Son code correspond à `feature/mobile-app-link` `cebb256`, et l’URL HTTPS
`/mobile/` répond 200. Le lien a été reporté dans `app.js` et la recette
navigateur afin que la nouvelle vitrine le conserve. Le code de la PWA mobile,
les routes `/mobile/`, `/remote/` et le proxy Manager ne sont pas modifiés par
ce changement.

### Publication de la page L’expérience — 29 octobre 2026

Le commit applicatif `e6fc8f81d22dd779325fb2fff2fd45363f28af06` a été
poussé sur `main`. Le workflow GitHub Pages
[40882794683](https://github.com/DartLink180/WebSite/actions/runs/40882794683)
a terminé avec succès. Une release statique issue de ce commit a été copiée
sur le serveur ; ses 14 fichiers sont identiques au build propre. Après
sauvegarde privée de la configuration Nginx, les racines HTTP et HTTPS de la
vitrine ont été orientées vers cette release. `nginx -t` et le rechargement
ont réussi. Les blocs `/manager/`, `/remote/` et `/mobile/` n’ont pas changé.

Sur `https://dartlink.fr/`, les 13 fichiers servis (HTML, JavaScript, CSS,
trois logos et sept captures) correspondent octet pour octet à la release.
`/manager/`, `/remote/`, `/remote/manifest.webmanifest`, `/mobile/` et
`/mobile/manifest.webmanifest` répondent 200. Chromium sur l’URL publique a
vérifié la page L’expérience à 1280 et 390 px : six modes, captures chargées,
trois espaces photo, lien mobile, absence d’erreur JavaScript et de débordement
horizontal. La recette ne couvre pas le fonctionnement interne de ces trois
services, une installation de la version 2.9.6 sur carte, ni les périphériques
physiques. Aucune photo d’installation n’est encore publiée.

## Galerie des captures — 29 octobre 2026

Depuis WebSite `main` `34d46a12d37bbec33b3cb49417ba50e499021413`,
les six captures de L’expérience peuvent être ouvertes en grand. Un élément
`dialog` natif assure la modalité ; les commandes précédent/suivant, les
flèches du clavier et le balayage horizontal de l’image parcourent les six
captures avec retour de la dernière à la première. Échap et le bouton de
fermeture quittent la galerie ; le focus revient à la vignette activée.
Titre, texte alternatif et compteur décrivent l’image courante. Les photos
d’installations restent absentes et leurs trois emplacements ne sont pas
interactifs. Aucune dépendance, ressource ou route supplémentaire n’est ajoutée.
Cette décision complète la grille de captures fixes livrée dans `e6fc8f8`.

Validation locale : `node --check app.js`, trois tests Node du build et
`git diff --check` réussis. La recette Chromium sur un build temporaire a
réussi pour six routes à quatre largeurs (1440, 768, 390 et 320 px), sans
image manquante ni débordement horizontal. Elle vérifie l’ouverture de la
première et d’une autre capture, les boutons précédent/suivant, le retour en
boucle, les flèches, le geste tactile, Échap, la fermeture explicite et le
retour du focus. Inspection visuelle de la galerie ouverte à 1280, 390 et
320 px : image et commandes visibles dans les fenêtres contrôlées. Les
interactions utilisent les captures logicielles existantes ; aucune photo ni
recette matérielle n’en découle.

### Publication de la galerie — 29 octobre 2026

Le commit applicatif `287434640ebfaad9964040da179b3e7af33190c4` est sur
`main` et son workflow GitHub Pages
[40884449263](https://github.com/DartLink180/WebSite/actions/runs/40884449263)
a réussi. Une release statique construite depuis ce commit a été copiée sur
le serveur ; ses 14 fichiers sont identiques au build. La configuration
Nginx a été sauvegardée en privé, ses racines de vitrine ont été orientées
vers cette release, puis `nginx -t` et le rechargement ont réussi. Sur le
domaine public, les 13 ressources web servies correspondent octet pour octet
à la release. `/manager/`, `/remote/`, `/mobile/` et les deux manifestes PWA
répondent 200. Chromium a vérifié en HTTPS l’ouverture de la galerie, le
passage à l’image suivante, Échap, le retour du focus et l’absence d’erreur
JavaScript à 1280 et 390 px. Cette recette vérifie la vitrine, pas les
services liés ni une installation matérielle.

## Onglet Compétitions — 29 octobre 2026

Depuis `main` `f08b085245e89eb792d24cf5febb95d51a802473`, la branche `feat/competitions-live` ajoute au menu une page `#/competitions` consacrée aux compétitions internationales. Elle oriente vers le [centre de matchs PDC](https://www.pdc.tv/games), les [actualités PDC](https://www.pdc.tv/news/), le [calendrier PDC](https://www.pdc.tv/calendar/), les [actualités WDF](https://dartswdf.com/news/) et le [calendrier WDF](https://dartswdf.com/calendar/). Ces cinq destinations ont répondu HTTP 200 le 29 octobre 2026. Les liens externes ouvrent un nouvel onglet et sont identifiés comme tels pour l’accessibilité.

La vitrine reste statique : aucun résultat ni article n’est copié ou affiché dans DartLink, et aucun score n’est présenté comme courant sans source de données. Le « direct » se consulte sur le centre de matchs PDC, lorsqu’un événement y est couvert. Les autres organisateurs pourront être ajoutés quand leurs sources et conditions d’usage seront vérifiées. Cette décision préserve le fonctionnement sans clé d’API, dépendance ou tâche planifiée ; elle ne prouve pas que tous les tournois mondiaux soient couverts.

Validation locale : `node --check app.js`, les trois tests Node existants et `git diff --check` réussis avec Node 24 fourni localement par le runtime du Manager. Le shell ne dispose pas de `node` dans son `PATH` standard ni de Chromium ; aucune recette navigateur ou vérification de la production n’est revendiquée pour cette branche. Le build statique ne requiert aucun nouvel asset. Le commit applicatif `0a60ad1` a été poussé sur `origin/feat/competitions-live`, sans fusion ni déploiement sur `main`.

### Publication de l’onglet Compétitions — 29 octobre 2026

La préparation précédente est historique. La branche a été intégrée à `main` par avance rapide au SHA `4954bf08c81802b73cec52b97df78b4af325fca6` et poussée sur GitHub. Le workflow Pages [40911388618](https://github.com/DartLink180/WebSite/actions/runs/40911388618) s’est terminé avec succès. Une release construite depuis ce même commit, dans un répertoire temporaire propre, a été copiée sur le serveur. Les 14 fichiers de la release sont identiques au build ; une sauvegarde privée de la configuration Nginx a précédé l’orientation des deux racines de vitrine vers cette release. `nginx -t` et le rechargement ont réussi.

Sur `https://dartlink.fr/`, les 13 ressources web publiques comparées sont identiques au build. `/manager/`, `/remote/` et `/mobile/` répondent 200. Ces contrôles vérifient les fichiers servis et la disponibilité HTTP des services liés. Chromium n’étant pas disponible dans cet environnement, le parcours interactif de la nouvelle route et le rendu mobile n’ont pas été revérifiés sur le domaine ; les trois tests Node et la syntaxe JavaScript ont réussi avant publication. La page reste un accès aux sources externes, sans flux de scores intégré.

## Titres PDC sur la page Compétitions — 29 octobre 2026

Le retour utilisateur après la publication de `4954bf0` signale que la page doit montrer les actualités ou au moins leurs titres. La décision de ne présenter que des liens externes est remplacée pour les actualités PDC. Le flux RSS officiel `https://www.pdc.tv/rss.xml`, vérifié le 29 octobre 2026, fournit titres, dates et liens. La page affiche six titres PDC avec attribution et accès à l’article original ; elle ne copie pas le corps des articles et ne prétend pas afficher des scores en direct. Le lien vers les actualités WDF demeure, sans titres intégrés faute de flux vérifié.

Le script `scripts/update-pdc-news.py` utilise uniquement la bibliothèque Python standard. Il limite la taille du flux, conserve six entrées, vérifie les liens HTTPS vers les articles PDC et écrit le JSON de façon atomique. `public/news/pdc.json` est une copie de secours versionnée ; `build.cjs` la publie. Le workflow Pages la rafraîchit au build et deux fois par heure sans nouveau commit. Une panne de flux laisse la dernière copie disponible, avec sa date de récupération visible ; l’interface affiche un message clair si aucun JSON n’est accessible. Les titres sont insérés avec `textContent` dans le navigateur.

Pour le domaine servi par Nginx, le fichier JSON courant est séparé des releases statiques. Les unités `ops/dartlink-pdc-news.service` et `.timer` exécutent le même générateur toutes les 15 minutes avec un utilisateur non privilégié ; `ops/nginx-pdc-news.conf` décrit l’alias exact `/news/pdc.json`. Une nouvelle release ne remplace donc pas les données courantes. La tâche doit être surveillée via systemd et la date affichée ; une erreur réseau laisse le fichier précédent disponible. Aucune clé ni nouvelle dépendance applicative n’est requise.

La présence du flux RSS n’établit pas une couverture exhaustive des tournois mondiaux.

### Publication des titres PDC — 29 octobre 2026

La version applicative `faed4d7f3386f1e50294de6fd17c9e219ce61a4f` a été poussée sur `main` et construite dans un répertoire propre. Les 15 fichiers de la nouvelle release correspondent au build. Le script de mise à jour et les unités systemd ont été installés sur le serveur ; le premier lancement a réussi et le minuteur est actif. Une sauvegarde privée de la configuration Nginx a précédé la bascule des deux racines de vitrine et de l’alias JSON ; `nginx -t` et le rechargement ont réussi.

Deux erreurs de la première mise en ligne ont été détectées et corrigées avant la validation finale. Le `:` non protégé dans une commande du workflow rendait le YAML invalide : les runs [40915797838](https://github.com/DartLink180/WebSite/actions/runs/40915797838) et [40915844230](https://github.com/DartLink180/WebSite/actions/runs/40915844230) ont échoué sans lancer de job. Le commit `d076a6c8353166b7ac0d47ee183c456fba9e1513` corrige cette syntaxe ; le [run 40916172533](https://github.com/DartLink180/WebSite/actions/runs/40916172533) a réussi, génération des titres et déploiement Pages compris. L’alias JSON avait été inclus dans le bloc Nginx HTTP ; il a été déplacé vers le bloc HTTPS. Le JSON public correspond désormais au fichier actualisé par la tâche, et non à la copie de secours de la release.

Sur le domaine HTTPS, les 13 autres ressources web correspondent octet pour octet au build. `/news/pdc.json` répond 200 avec six titres et correspond au fichier actualisé ; `/manager/`, `/remote/` et `/mobile/` répondent 200. `node --check app.js`, les trois tests Node du build et `git diff --check` ont réussi. Aucun navigateur Chromium n’était disponible pour une recette visuelle de la page ; la disponibilité du flux et des fichiers ne valide pas à elle seule l’affichage dans tous les navigateurs. En cas de panne du flux, la date affichée permet de reconnaître des titres anciens.
