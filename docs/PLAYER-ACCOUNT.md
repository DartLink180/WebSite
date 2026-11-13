# Compte joueur DartLink — mission 11

Candidat du 13 novembre 2026, branche `feat/mission11-player-account`.
Publication autorisée par l’utilisateur après la préparation ; l’interdiction
initiale de push est levée pour la livraison des deux dépôts et leur intégration.

Le bouton reprend la classe et la place du bouton Manager. Visiteur : Connexion
vers Cloud ; joueur avec session OIDC vérifiée : Mon compte, pseudo, photo si
présente et déconnexion. Le menu mobile fonctionne de la même façon. Le lien
public Manager disparaît ; son URL directe et les routes héritées `#/manager`
restent utilisables sans modification du Manager. `#/login` mène à Cloud.

`account.js` utilise Keycloak JS 26.2.5 local (licence Apache 2.0 et provenance
sous `vendor/keycloak-js/`), le client déjà existant `dartlink-website`, code +
PKCE S256. Les tokens restent en mémoire. Le SDK conserve temporairement les
valeurs de vérification OAuth ; `sessionStorage` ne retient qu'une intention
« ouvrir le compte » consommée après callback, jamais une preuve de session.
La session est vérifiée sans redirection de toute la vitrine grâce à
`silent-check-sso.html` et son script externe, puis par le mécanisme du SDK.
Le message du callback est reçu par le SDK avec vérification de sa source/origine.
Au focus/retour, le token est renouvelé et le profil relu. Un échec API ne
supprime pas artificiellement une session encore valide ; les données affichées
sont retirées et Mon compte reste accessible. La déconnexion termine le SSO.

La connexion commencée sur WebSite revient à `https://dartlink.fr/`, puis ouvre
l'espace joueur Cloud ; le SSO évite une nouvelle saisie. Le lien « Retour au
site » dans Cloud vérifie à nouveau la session au retour sur WebSite. Inscription,
e-mail, reset, pseudo, avatar, langue, fuseau et visibilité restent intégralement
sur les pages Cloud/Keycloak existantes. Aucun mot de passe ne passe par WebSite,
aucune base locale ni duplication de profil. Si la vérification silencieuse est
bloquée par le navigateur, Connexion reste affiché avec un lien Cloud fonctionnel.

`/api/v1/me` et l'avatar sont lus avec Bearer, `cache: no-store` et CORS exact.
Le pseudo utilise `textContent`. Seule l'URL `/api/v1/profiles/<id>/avatar` du
profil courant est acceptée. L'image PNG est décodée avant affichage sous forme
de Blob local ; aucune image cassée ni ressource tierce arbitraire. Les jetons
ne figurent jamais dans les URL ni dans une sauvegarde de session applicative.

Fichiers : `app.js` (navigation/routage/mentions), `account.js` (session et
navigation joueur), `index.html`, `style.css`, callbacks SSO, SDK local,
`build.cjs` (liste explicite des ressources), tests et documentation.
Le build conserve son fonctionnement Node sans installation npm ou CDN.

Validation : trois tests build et 24 parcours publics Chromium réussis
(1440, 768, 390, 320 px, menu, clavier, galerie, contact intercepté, absence de
lien Manager, login Cloud et compatibilité des anciennes routes Manager).
La recette publique isole le module de comptes ; le vrai OIDC est validé
séparément par `DartLink-Cloud/ops/production/mission11_e2e.mjs` et son orchestrateur,
avec comptes temporaires, vraie API/PG, site candidat dans le seul navigateur.
Recette réelle complète réussie sur le candidat puis contre la release Cloud
déployée : SSO avec pseudo/avatar, aller-retour Cloud/site, logout partagé,
connexion WebSite avec arrivée dans Cloud, upload/remplacement/suppression,
confidentialité et erreurs. Le site public utilise maintenant la release `mission11-player-v1`.
Après cette recette, contrôle de géométrie avec une fixture connectée et un
pseudo de 32 caractères à sept largeurs (1440, 1280, 1200, 1024, 768, 390, 320) :
pas de débordement ni bouton coupé ; les retours à la ligne tablette et la taille
du texte reprennent le style du bouton existant. Captures synthétiques hors Git.
Les e-mails et la réinitialisation n'ont pas été rejoués : pages existantes
validées dans la mission 10, aucun nouveau mécanisme introduit ici.
Trois tests build et les 24 parcours publics ont été rejoués après ajustement CSS.
Aucun smartphone physique ni test de charge n'est revendiqué.

Déploiement : accord utilisateur reçu pour push/fusion, publication et diff Nginx.
Le client Keycloak, ses callbacks exacts racine/silent et l'API Cloud ont été
activés après autorisation explicite. Aucun changement Nginx requis pour le
parcours applicatif. Construire depuis le commit validé avec `npm test && npm run
build`, publier `dist/` avec les callbacks et `vendor`. Le workflow Pages sur
main peut publier ; ne pas fusionner sans accord. Sur PiServeur, si une nouvelle
racine statique requiert un diff Nginx, faire approuver ce diff avant application.
Conserver la release précédente et comparer chaque asset au build après mise
en ligne. Revenir à la précédente release ou faire un revert après autorisation,
sans réécrire l'historique. Restaurer le client OIDC via l'outil Cloud uniquement
si aucun autre déploiement n'en dépend ; aucun rollback des données joueurs.

Le diff précis approuvé et appliqué est [ops/mission11-nginx.diff](../ops/mission11-nginx.diff) :
seules deux directives `root` de la vitrine sélectionnent `mission11-player-v1/dist`.
Proxys Manager/Remote/mobile, TLS, contact et flux d'actualités restent inchangés.
L'outil `sudo -n python3 ops/player-release.py prepare` prépare la release depuis
un arbre commité propre et le build testé ; `source.json` reste hors racine
publique et conserve SHA du commit, empreintes des assets et de la configuration
initiale. **`apply` a été exécuté après l’accord utilisateur** : sauvegarde privée root,
refus si la configuration partagée a changé, test de syntaxe et reload gracieux.
`rollback` refuse d'écraser une modification ultérieure du fichier partagé.
Les deux tests isolés `python3 tests/player_release_test.py -v` réussissent :
restauration après échec de syntaxe et refus d’un changement partagé concurrent.
La commande apply a réussi en production (test de syntaxe puis reload gracieux).
Aucun rollback de production n’a été nécessaire.

Release préparée réellement : `/srv/dartlink-v2/releases/mission11-player-v1`,
source applicative `5a581b5`, manifeste des assets et empreinte Nginx initiale
présents. La source Cloud qualifiée est `e56a0df`. Release sélectionnée par Nginx,
34 assets publics identiques au manifeste (hors `.nojekyll`, volontairement
inaccessible, et JSON d'actualités indépendant). Manager/Remote/mobile HTTP 200,
PID des services et maître Nginx conservés. La recette OIDC sur les deux sites
publics a réussi sans substitution des pages ni callbacks : connexion, session,
pseudo/photo, aller-retour Cloud, déconnexion globale, avatars et autorisations.
Preuve privée Cloud : `mission11-live-status.json`. Fixtures supprimées.
