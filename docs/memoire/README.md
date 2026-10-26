# Mémoire de développement WebSite

Établie le 20 octobre 2026 depuis la branche GitHub `fix/manager-link`, a0e7285a41d5f0ea12245a23221cdfe9f0fd9922, dont l’arbre est identique au checkout PiServeur 25abe81. Cette mémoire accompagne son intégration dans main ; elle ne certifie pas l’état du site déployé.

## Rôle et architecture

Site vitrine statique DartLink. La version courante utilise `index.html`, `app.js` et `style.css` à la racine. `app.js` assure le routage par fragment, les pages publiques et les interactions dans le navigateur. Le code React sous `src/` est historique et n’est pas l’entrée du build courant.

Les boutons Manager et Explorer le Manager ouvrent `https://dartlink.fr/manager/`. Les routes historiques `#/login` et `#/manager` redirigent vers ce Manager réel. La refonte locale retire les anciens écrans simulés du JavaScript livré ; ils restent consultables dans Git. Le Manager réel constitue un service distinct. Le formulaire public reste une simulation, sans envoi de message réel.

Les captures et leur provenance sont documentées dans [public/screenshots/README](../../public/screenshots/README.md) et [screenshots/README](../../screenshots/README.md). Le code du jeu et le backend Manager appartiennent aux dépôts [DartLink](https://github.com/DartLink180/DartLink) et [DartLink-Manager](https://github.com/DartLink180/DartLink-Manager).

## Dépendances et génération

`package.json` conserve React/ReactDOM ^18.3.1, Vite ^5.4.10 et plugin-react ^4.3.2 pour l’historique et les outils de développement. Le build courant est `node build.cjs` (`npm run build`) : il utilise uniquement fs/path de Node, copie les trois fichiers racine, les quatre captures utilisées et les logos fournis explicitement autorisés dans dist, puis ajoute .nojekyll. Le workflow utilise Node 20.

Le build copie une liste explicite de ressources, pas tout le dossier public : ne pas supposer qu’une image ajoutée au dépôt est publiée. Vérifier les chemins utilisés et la liste explicite de `build.cjs` avant de modifier les ressources. Le script ne nettoie pas dist ; utiliser une sortie neuve pour une vérification reproductible.

## Exploitation et contraintes

Le workflow [.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml) déclenche GitHub Pages sur push vers main ou lancement manuel. Une fusion peut donc déployer même sans commande locale. Pour une publication de code ou de documentation explicitement sans déploiement, utiliser un message de commit final contenant `[skip ci]`, sans lancer workflow_dispatch ; vérifier ensuite l’absence de run Pages associé.

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
