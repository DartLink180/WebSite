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
