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

La branche `feat/remote-link`, issue de `main` à `8b511698a0aa9dbcaa4f51905bc8cc5e295c874f`, ajoute un lien de menu « Télécommande » sur toutes les pages et un bouton « Ouvrir DartLink Remote » sur l’accueil. Les deux ciblent `https://remote.dartlink.fr/`. La destination est constante et n’ajoute ni intégration réseau locale ni code Manager à la vitrine.

Ce changement est préparé en Pull Request brouillon, sans fusion ni déploiement. Le code de la PWA est dans `DartLink180/MobileApp` sur `develop/pwa-v1` ; la PWA n’est pas encore hébergée. La résolution DNS publique interrogée le 26 octobre 2026 renvoie NXDOMAIN pour `remote.dartlink.fr`. Fusionner cette branche avant que le sous-domaine HTTPS fonctionne créerait un lien cassé. Valider d’abord le déploiement, la recette sur smartphones et Raspberry Pi, puis la disponibilité de l’URL cible.

Vérifications locales effectuées : `node --check app.js`, `npm test` (3 tests), `npm run build` et recette Chromium (24 combinaisons de routes/largeurs, navigation mobile et présence des deux liens vers le sous-domaine). Les destinations externes ne sont pas ouvertes pendant la recette. Le comportement de la PWA et l’accès réel à la télécommande ne sont pas certifiés par ces tests de vitrine.
