# Mémoire de développement WebSite

Établie le 20 octobre 2026 depuis la branche GitHub `fix/manager-link`, a0e7285a41d5f0ea12245a23221cdfe9f0fd9922, dont l’arbre est identique au checkout PiServeur 25abe81. Cette mémoire accompagne son intégration dans main ; elle ne certifie pas l’état du site déployé.

## Rôle et architecture

Site vitrine statique DartLink. La version courante utilise `index.html`, `app.js` et `style.css` à la racine. `app.js` assure le routage par fragment, les pages publiques et les interactions dans le navigateur. Le code React sous `src/` est historique et n’est pas l’entrée du build courant.

Le bouton « Ouvrir le Manager » du menu est le seul accès visible à `https://dartlink.fr/manager/` ; les présentations du service ont été retirées à la demande de son administrateur. Les routes historiques `#/login` et `#/manager` redirigent vers ce Manager réel. La refonte locale retire les anciens écrans simulés du JavaScript livré ; ils restent consultables dans Git. Le Manager réel constitue un service distinct. Le formulaire public reste une simulation, sans envoi de message réel.

Les captures et leur provenance sont documentées dans [public/screenshots/README](../../public/screenshots/README.md) et [screenshots/README](../../screenshots/README.md). Le code du jeu et le backend Manager appartiennent aux dépôts [DartLink](https://github.com/DartLink180/DartLink) et [DartLink-Manager](https://github.com/DartLink180/DartLink-Manager).

## Dépendances et génération

`package.json` conserve React/ReactDOM ^18.3.1, Vite ^5.4.10 et plugin-react ^4.3.2 pour l’historique et les outils de développement. Le build courant est `node build.cjs` (`npm run build`) : il utilise uniquement fs/path de Node, copie les trois fichiers racine, les captures et photos explicitement autorisées et les logos fournis dans dist, puis ajoute .nojekyll. Le workflow utilise Node 20.

Le build copie une liste explicite de ressources, pas tout le dossier public : ne pas supposer qu’une image ajoutée au dépôt est publiée. Vérifier les chemins utilisés et la liste explicite de `build.cjs` avant de modifier les ressources. Le script ne nettoie pas dist ; utiliser une sortie neuve pour une vérification reproductible.

## Exploitation et contraintes

Le workflow [.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml) déclenche GitHub Pages sur push vers main ou lancement manuel. Une fusion peut donc déployer même sans commande locale. Pour une publication de code ou de documentation explicitement sans déploiement, utiliser un message de commit final contenant `[skip ci]`, sans lancer workflow_dispatch ; vérifier ensuite l’absence de run Pages associé.

Tout changement terminé, documentation comprise, doit être commité et poussé sur sa branche GitHub. Après le push, récupérer la référence distante et vérifier que le commit y figure ; documenter ou signaler clairement un échec de push ou un travail encore local. Cette exigence de synchronisation ne vaut pas autorisation de déployer : si le changement applicatif n’est pas autorisé en production, le pousser sur une branche dédiée sans fusion vers `main`. Pour une mise à jour documentaire sur `main`, appliquer la procédure `[skip ci]` ci-dessus.

Consulter [RESTAURATION](../../RESTAURATION.md) avant tout retour : restaurer par revert ou par nouveaux commits depuis une sauvegarde. Fusionner simplement une ancienne branche ne restaure pas ses fichiers déjà présents dans l’historique. La sauvegarde avant V2 est identifiée dans ce document.

Vérifications isolées : `node --check app.js`, génération dans un répertoire temporaire avec les entrées, les ressources et le script (`npm test`), contrôle de la sortie ; vérifier en navigateur les routes publiques, le lien Manager, le mobile et le comportement du formulaire après un changement fonctionnel. Aucun backend ni accès PiServeur n’est nécessaire pour la simple génération.

## Décisions et corrections conservées

| Référence | Décision ou correction et raison |
|---|---|
| 318e04d, fusion 576e2c6 | Publier le prototype V2 statique ; conserver le React historique et le guide de restauration plutôt que perdre la provenance. |
| 846cc6a, a0e7285 | Le site ouvrait une connexion/console simulée ; rediriger les accès Manager vers le service réel et clarifier la documentation. Les anciens écrans restent dans le code historique. |
| Cette intégration | Ajouter AGENTS et une mémoire versionnée pour les prochains clones ; aucun changement de fonctionnement supplémentaire introduit par les fichiers documentaires. |

Aucun autre incident de production n’est établi par cette analyse. Une proposition dans PROTOTYPE n’est pas une fonction opérationnelle du Manager. Ne pas publier dans ce dépôt public les détails privés de PiServeur ou des identités de cartes.

## Documentation existante et reprise

[README](../../README.md), [PROTOTYPE](../../PROTOTYPE.md), [RESTAURATION](../../RESTAURATION.md), les deux README de captures et le workflow sont conservés ; aucun AGENTS de projet n’existait dans l’arbre GitHub analysé. PROTOTYPE décrit le parcours historique simulé, tandis que le README courant et cette mémoire décrivent l’accès Manager réel.

À chaque évolution, actualiser cette page et le document spécialisé concerné. Ajouter date, SHA, résultat, raison, contrôles et limites sans recopier les conversations ou des journaux sensibles.

Le 29 octobre 2026, avant l’ajout de cette règle, `main` et `origin/main` ont été vérifiés au même SHA `ddce9e00c2ed13e38c648210d77393bb992fbab5`. Le lien « Jouer sur mobile » vers `https://dartlink.fr/mobile/` est présent dans le menu et l’accueil de `app.js` à ce SHA distant. La divergence observée avant la publication de la page L’expérience, quand le lien n’était que dans une release locale et une branche GitHub distincte, est historique ; son intégration dans `main` est consignée plus bas. Ce contrôle Git ne vérifie pas à lui seul le contenu actuellement servi par le domaine.


## Refonte de la vitrine — 23 octobre 2026, travail local

Base WebSite : `a15abc927184aa8be7342131ff339408225eec7c`. Référence visuelle :
`web/style.css` du Manager à `b9b7b30612820fb5cd132032c4a3d1f4491396f0`.
Le fond anthracite, les panneaux et les contours reprennent cette identité ;
l’accent vert est adapté aux logos présentés par l’utilisateur. La refonte
remplace le thème orange du prototype. Elle distingue la vitrine, le jeu et le
Manager réel, corrige la FAQ historique et conserve un formulaire explicitement
simulé. Le code React historique reste conservé.

Validation locale : trois tests de build réussis ; Chromium a vérifié six routes
à quatre largeurs (1440, 768, 390 et 320 px), la navigation mobile, la FAQ,
le formulaire sans transmission, le lien d’évitement et les trois anciennes
routes du Manager avec interception de la destination externe. Aucune erreur
JavaScript ni ressource manquante dans ce périmètre. Cette recette ne prouve
pas le fonctionnement du Manager réel.

Les originaux des logos ne sont pas disponibles sur disque : leur intégration
reste bloquée et les trois emplacements affichent provisoirement du texte.
Le refus réseau initial a été résolu et revérifié le 24 octobre 2026 : vitrine et Manager HTTP 200, API GitHub accessible, URL Pages confirmée `https://dartlink.fr/`. Les logos restent inaccessibles sous forme de fichiers malgré une nouvelle transmission des aperçus et chemins Windows. Aucun
commit de refonte n’a été poussé et aucun déploiement n’a été déclenché.
Voir [détails, reprise et limites](../REFONTE-VITRINE.md).


### Intégration des logos — 26 octobre 2026

Le blocage décrit ci-dessus est résolu : les trois originaux ont été récupérés
sur `main` au commit `e2afde1`, depuis `screenshots/`. Le site utilise leurs
copies identiques dans `public/brand/` pour l’en-tête, l’accueil, la présentation
du Manager et le favicon. Les remplacements textuels ne sont plus utilisés.
Le déploiement demandé utilise le workflow GitHub Pages vers `https://dartlink.fr/`.

Publication GitHub : `d328ea3`, workflow Pages `40336781126` réussi.
Le contrôle HTTPS constate cependant l’ancien site sur dartlink.fr et une 404
pour le logo publié. La mise à jour de l’hébergement réel reste à faire ;
voir la section publication de [la refonte](../REFONTE-VITRINE.md).

Mise à jour vérifiée le 26 octobre 2026 : le serveur effectif de `dartlink.fr`
sert désormais le build de `d328ea3`. Les dix ressources publiques comparées
en HTTPS sont identiques au build ; `/manager/` répond 200 et son service n'a
pas redémarré. Le constat d'ancien contenu ci-dessus est historique. Voir
[le déploiement et ses limites](../REFONTE-VITRINE.md).

## Lien DartLink Remote — préparation du 26 octobre 2026

Depuis `main` à `8b511698a0aa9dbcaa4f51905bc8cc5e295c874f`, la branche `feat/remote-link` prépare deux liens explicites vers `https://dartlink.fr/remote/` : menu global et bouton d’accueil. La PWA est développée dans `DartLink180/MobileApp` et sa PR est encore en recette. L’hôte `remote.dartlink.fr` ne résout pas dans la vérification DNS publique du 26 octobre 2026 ; la cible provisoire est donc `https://dartlink.fr/remote/`. Garder la PR WebSite en brouillon jusqu’à la vérification de cette URL HTTPS. La recette terrain reste à réaliser ; aucune publication de la vitrine n’est autorisée par la seule préparation de ce code. Voir [la décision et ses limites](../REFONTE-VITRINE.md#lien-vers-dartlink-remote--préparation-du-26-octobre-2026).

### Publication vérifiée le 26 octobre 2026

Le statut « préparation » ci-dessus est historique. Le commit WebSite `0fba9f5d0cbf4328e1a03de45072554b5959e5be` est servi sur `dartlink.fr` et le commit MobileApp `07a6fbb70c838676628282bbf2ff42c878f80c45` sous `/remote/`. L'URL HTTPS de la PWA, son manifeste, la vitrine et `/manager/` répondent 200 sur le Nginx local ; le `app.js` servi correspond au build. Le navigateur a suivi le lien mobile vers la PWA. La découverte et la télécommande sur vrais téléphones restent non vérifiées. Voir [la publication et ses limites](../REFONTE-VITRINE.md#publication-du-lien--26-octobre-2026).

## Page L’expérience — 29 octobre 2026, travail local

Base WebSite `main` `92ed58d9abaf8f653bf5e396d5434e80ee087b2f`, arbre propre
avant changement. Le menu du jeu vérifié dans `DartLink` `main`
`9210ae4ed4ed2b25bf91a816906ba03672e1df44` (version déclarée 2.9.6)
contient six modes : X01, Cricket, Course 300, Around the World, Killer et
Tournoi. La page L’expérience et la FAQ les présentent tous. La décision
historique de montrer seulement X01, Cricket et Course est remplacée.

Sept captures du jeu ont été réalisées en simulation locale avec Chromium,
à 1280 × 720, depuis ce SHA : menu et un écran par mode. La vitrine affiche
ces nouvelles captures et son build les copie explicitement. Les anciennes
images restent dans le dépôt mais sont exclues du build. La section des
installations réserve trois espaces pour des photos futures : vue d’ensemble,
cible et équipement, espace de jeu. Aucun visuel matériel n’est inventé.
La provenance détaillée est dans [le README des captures](../../public/screenshots/README.md).

Le fonctionnement reste statique, sans nouvelle dépendance. Validation et
limites de cette évolution : voir [le document de refonte](../REFONTE-VITRINE.md#page-lexpérience--29-octobre-2026).

### Préparation de la publication — 29 octobre 2026

Avant la publication, le domaine servait une release locale
`mobile-20261027-175824` dont `app.js` différait de `main` par trois ajouts
liés à « Jouer sur mobile ». Ces ajouts correspondent au commit `cebb256` de
la branche GitHub `feature/mobile-app-link` ; `https://dartlink.fr/mobile/`
répondait 200. Ils ont été intégrés au code de travail pour préserver ce lien
lors du changement de release. La base GitHub `main` était toujours
`92ed58d9` ; la présence du lien sur le domaine n’attestait pas sa fusion.
La publication et ses contrôles sont consignés dans le document de refonte.

### Publication vérifiée le 29 octobre 2026

Le statut « travail local » ci-dessus est historique. Le commit applicatif
WebSite `e6fc8f81d22dd779325fb2fff2fd45363f28af06` a été poussé sur
`main` ; le workflow GitHub Pages
[40882794683](https://github.com/DartLink180/WebSite/actions/runs/40882794683)
a réussi. Le Nginx qui sert effectivement `dartlink.fr` utilise maintenant
une release statique construite depuis ce commit. Sur le domaine public,
les 13 ressources web comparées correspondent au build ; voir
[les contrôles et limites](../REFONTE-VITRINE.md#publication-de-la-page-lexpérience--29-octobre-2026).
Aucune mise à jour de carte ni modification du Manager, de Remote ou de la
PWA mobile n’a été réalisée.

## Galerie de captures — 29 octobre 2026

Base WebSite `main` `34d46a12d37bbec33b3cb49417ba50e499021413`, arbre propre
avant changement. La page L’expérience rend ses six captures cliquables et
ouvre une galerie modale native. Les boutons précédent/suivant parcourent les
images en boucle ; les flèches gauche/droite et le balayage horizontal sur
l’image font de même. Échap ou « Fermer » ferme la galerie et rend le focus à
la capture ouverte. Le titre, le texte alternatif et le compteur suivent
l’image affichée. Cette interaction complète la grille publiée au commit
`e6fc8f8`, qui n’offrait alors que des images fixes.

Seules les captures du jeu existantes participent à la galerie. Les trois
emplacements réservés aux installations physiques restent textuels jusqu’à la
réception de photos. La solution utilise l’élément HTML `dialog`, sans nouvel
asset ni dépendance ; les routes, le build et les services liés sont inchangés.
Validation et publication sont consignées dans le document de refonte.

### Publication vérifiée le 29 octobre 2026

La galerie est publiée dans WebSite `main` au commit applicatif
`287434640ebfaad9964040da179b3e7af33190c4` ; le workflow Pages
[40884449263](https://github.com/DartLink180/WebSite/actions/runs/40884449263)
a réussi. Le Nginx qui sert `dartlink.fr` utilise une release statique
construite depuis ce commit. Les 13 ressources web du domaine correspondent
au build et la galerie a été parcourue sur l’URL HTTPS à 1280 et 390 px.
Voir [les contrôles et limites](../REFONTE-VITRINE.md#publication-de-la-galerie--29-octobre-2026).

## Onglet Compétitions — 29 octobre 2026, préparation

Base `main` et `origin/main` : `f08b085245e89eb792d24cf5febb95d51a802473`, arbre propre avant changement. La branche `feat/competitions-live` ajoute la route `#/competitions` au menu. La page donne accès aux scores, actualités et calendrier de la PDC et aux actualités et calendrier de la WDF. Les liens directs vers les sources remplacent toute idée implicite d’un flux de résultats intégré : aucun flux public stable ni droit de republication des scores n’a été établi pour ce site statique. Les horaires et résultats restent donc ceux des organisateurs, selon les événements couverts.

La route utilise le routage existant dans `app.js` et des cartes responsive dans `style.css`, sans dépendance ni ressource de build supplémentaire. Aucun changement du Manager, des PWA ou de la production n’est prévu par cette préparation. Le commit applicatif `0a60ad1` a été poussé sur `origin/feat/competitions-live`. Validation, sources et limites : [document de refonte](../REFONTE-VITRINE.md#onglet-compétitions--29-octobre-2026).

### Publication vérifiée le 29 octobre 2026

La préparation ci-dessus est historique. `main` a été avancée au commit `4954bf08c81802b73cec52b97df78b4af325fca6`, poussé sur GitHub. Le workflow Pages [40911388618](https://github.com/DartLink180/WebSite/actions/runs/40911388618) a réussi. Le Nginx de `dartlink.fr` sert une release statique construite depuis ce SHA ; ses 13 ressources publiques correspondent au build en HTTPS. `/manager/`, `/remote/` et `/mobile/` répondent 200. Voir [les contrôles et limites](../REFONTE-VITRINE.md#publication-de-longlet-compétitions--29-octobre-2026).

### Titres PDC sur la page — 29 octobre 2026

Le retour utilisateur établit que les seuls liens de la page publiée ne suffisent pas. Cette évolution remplace la décision de ne présenter aucun titre sur la vitrine : le flux officiel `https://www.pdc.tv/rss.xml` a été vérifié et permet d’afficher six titres, leurs dates et des liens directs vers les articles. Aucun article complet ni score n’est repris ; la WDF conserve son lien, faute de flux équivalent vérifié. La date de récupération est affichée, y compris si une mise à jour échoue.

Le générateur Python standard `scripts/update-pdc-news.py` valide les liens et produit un JSON borné. `build.cjs` publie une copie de secours versionnée ; le workflow Pages actualise ce fichier au build et toutes les 30 minutes. Sur le serveur du domaine, une tâche systemd toutes les 15 minutes écrit un JSON hors des releases, servi par Nginx au même chemin. Voir [architecture, exploitation, validation et limites](../REFONTE-VITRINE.md#titres-pdc-sur-la-page-compétitions--29-octobre-2026).

La version applicative `faed4d7f3386f1e50294de6fd17c9e219ce61a4f` est servie sur `dartlink.fr` ; le correctif du workflow `d076a6c8353166b7ac0d47ee183c456fba9e1513` a produit le [run Pages réussi 40916172533](https://github.com/DartLink180/WebSite/actions/runs/40916172533). Le JSON public correspond au fichier rafraîchi par la tâche ; les 13 autres ressources web correspondent au build. L’incident de première publication et ses limites sont consignés dans [le document de refonte](../REFONTE-VITRINE.md#publication-des-titres-pdc--29-octobre-2026).

### Vignettes PDC — 29 octobre 2026

Depuis `main` `f32105e65d4263fdab056fc91b6762bccf519d29`, la page Compétitions associe aux titres les petites images trouvées dans le flux RSS PDC. Le générateur ne retient que les URL HTTPS du serveur d’images PDC et demande leur variante 320 × 180 ; le navigateur les charge directement depuis ce serveur. En l’absence d’image valide ou si le chargement échoue, l’article reste lisible en texte. La page Informations & confidentialité indique cette requête externe. Aucun fichier image n’est copié dans Git ou dans la release. Voir [le détail et les limites](../REFONTE-VITRINE.md#vignettes-des-actualités-pdc--29-octobre-2026).

La version applicative `25020397b5b4112637ceb855366eae137ad56c32` est poussée sur `main` et servie sur le domaine. Le workflow Pages [40917139573](https://github.com/DartLink180/WebSite/actions/runs/40917139573) a réussi. Le JSON public contient six URL de vignettes accessibles ; les 13 autres ressources web correspondent au build. Voir [la validation et ses limites](../REFONTE-VITRINE.md#publication-des-vignettes--29-octobre-2026).

## Visuels fournis — 4 novembre 2026

Base `main` `79f174f`, après récupération des deux commits de dépôt d'images
`e071a60` et `79f174f`. L'utilisateur a complété directement le clone PiServeur
avec les fichiers restants et autorise la publication. Les 19 captures et trois
photos sont conservées dans `screenshots/` et copiées explicitement au build.
Les anciennes captures simulées et les emplacements « Photo à venir » sont
remplacés ; les décisions historiques ci-dessus restent consultables.

La page L'expérience présente 16 écrans du jeu, trois de Remote et trois photos.
La galerie parcourt les 19 captures ; les photos s'ouvrent en grand dans un
nouvel onglet. Accueil et FAQ présentent huit familles de modes, vérifiées dans
`server/game/gameManager.js` de DartLink `b066776`. La version précise des
captures fournies n'est pas attestée. Voir [provenance](../../screenshots/README.md)
et [validation et publication](../REFONTE-VITRINE.md#visuels-fournis--4-novembre-2026).

### Publication vérifiée — 4 novembre 2026

Le commit applicatif `259cab64fa78cdc908f606885bd36fb03e46309d` est poussé
sur `main`, puis retrouvé après récupération de `origin/main`. Le workflow
Pages [41815629675](https://github.com/DartLink180/WebSite/actions/runs/41815629675)
a réussi. Le Nginx du domaine sert une release neuve construite depuis ce SHA,
après sauvegarde privée de sa configuration, `nginx -t` et rechargement.
Les 28 ressources statiques comparées en HTTPS correspondent exactement au
build ; le JSON d'actualités conserve son rafraîchissement indépendant.
`/manager/`, `/remote/`, `/mobile/` et `/news/pdc.json` répondent 200.

Chromium sur l'URL HTTPS a vérifié les 19 captures et trois photos, la navigation
de galerie et l'absence de débordement à 1280 et 390 px. La recette complète
locale avait réussi aux quatre largeurs prévues. Ces contrôles établissent
l'affichage de la vitrine ; la version des cartes et les périphériques physiques
ne sont pas validés par cette publication.

Le premier push avec la clé SSH habituelle a été refusé. Le push a réussi avec
la seconde identité GitHub déjà présente sur PiServeur ; aucun secret ni nouvelle
configuration d'authentification n'a été ajouté au dépôt.

## Onglets des modes et photos en galerie — 4 novembre 2026

Base WebSite `e4d6517`. Le retour utilisateur remplace la décision d'afficher
les 16 captures du jeu simultanément et d'ouvrir les photos dans un nouvel
onglet. Les onglets X01 (3 images), Cricket (2), Tournois (3) et Autres (8)
présentent une seule catégorie à la fois. X01 est sélectionné au chargement.
Autres rassemble Course, Around the World, Cible aléatoire, Killer et le menu.
Remote conserve sa section et ses trois captures.

Les trois photos physiques ouvrent désormais la galerie modale de la page,
avec fermeture, précédent/suivant, clavier, balayage et retour du focus.
Chaque galerie parcourt uniquement le groupe ouvert : onglet courant, Remote
ou installation. Les onglets utilisent tablist/tab/tabpanel, aria-selected,
un seul arrêt de tabulation et les touches gauche/droite, Début et Fin.
La solution réutilise le dialog existant, sans dépendance ni nouvel asset.

Validation : syntaxe JavaScript, trois tests Node du build et recette Chromium
sur six routes à quatre largeurs ; vérification des quatre catégories, du
clavier des onglets, de la navigation des photos et du retour du focus.
La recette concerne la vitrine et ne constitue pas une recette matérielle.

### Publication des onglets et de la galerie photo — 4 novembre 2026

Le commit applicatif `94005ca10de7f23aa44ddf504a945c4b4dd08a92` a été poussé
sur `main` puis retrouvé après fetch. Les jobs build et deploy du workflow
Pages [41819549416](https://github.com/DartLink180/WebSite/actions/runs/41819549416)
ont réussi. Le domaine sert une release construite depuis ce SHA, après
sauvegarde privée de la configuration Nginx, validation et rechargement.
Les 28 fichiers statiques comparés en HTTPS sont identiques au build ; les
routes Manager, Remote, mobile et actualités répondent 200.

Chromium en HTTPS à 1280 et 390 px vérifie chaque catégorie (3, 2, 3 et 8
captures), l'ouverture d'une photo, le passage à la suivante, la fermeture et
le retour du focus, sans erreur JavaScript ni débordement horizontal. Les
trois tests Node et les 24 combinaisons de routes/largeurs de la recette
locale ont réussi avant publication.

## Un onglet par mode — 4 novembre 2026

Base `bed1e2c`. Le retour utilisateur remplace le regroupement en quatre
catégories : Menu est désormais le premier onglet et celui sélectionné au
chargement, suivi de X01, X01 IA, Cricket, Course, Around the World, Cible
aléatoire, Killer et Tournoi. Course regroupe ses variantes 300 et dix tours.
Chaque galerie conserve uniquement les captures de son onglet. Les captures,
le build et les dépendances sont inchangés. La recette vérifie les neuf onglets,
leurs effectifs (1, 2, 1, 2, 3, 1, 1, 2, 3), la sélection initiale du Menu et
la navigation clavier. La galerie photo conserve sa fermeture sur place.

### Publication des neuf onglets — 4 novembre 2026

Version applicative `024ac2a009588807976fe135a0177539fd9818ea`, présente sur
`origin/main` après fetch. Les jobs build et deploy du workflow Pages
[41820269108](https://github.com/DartLink180/WebSite/actions/runs/41820269108)
ont réussi. Une release neuve de ce SHA est servie par le Nginx du domaine,
après sauvegarde de configuration, validation et rechargement. Les 28 fichiers
statiques comparés sont identiques au build ; Manager, Remote et mobile
répondent 200. Chromium en HTTPS à 1280 et 390 px confirme Menu en première
position et sélectionné au chargement, les neuf onglets, leurs effectifs et
l'absence de débordement. La recette locale complète (24 combinaisons) et les
trois tests Node ont réussi. Aucun changement de dépendance ou de matériel.

## Vitrine centrée sur le jeu — 4 novembre 2026

Base `263354c`. À la demande de l'utilisateur, le Manager n'est plus un sujet
promotionnel de la vitrine, son accès étant personnel. Seul le bouton
« Ouvrir le Manager » du menu global demeure. Les sections de présentation sur
l'accueil et L'expérience, le bouton de l'accroche, le lien du pied de page,
les deux questions de FAQ, le paragraphe des informations et les mentions dans
la description HTML et le texte sans JavaScript sont retirés. La troisième
carte de présentation décrit la télécommande locale. Cette décision remplace
les présentations du Manager conservées dans l'historique documentaire.

L'URL du bouton et les redirections historiques login/manager sont conservées.
Aucune modification du service Manager, de ses droits ou de son hébergement.
Aucune dépendance ni ressource supplémentaire. La recette navigateur vérifie
sur chaque route un seul lien Manager, l'absence de mention dans le contenu
principal et le pied de page, ainsi que les trois anciennes redirections.
