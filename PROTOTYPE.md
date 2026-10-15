# DartLink V2 — prototype visuel

## Prévisualiser

Double-cliquez sur `index.html` : le prototype fonctionne directement dans un navigateur, sans installation et sans accès Internet.

Autre possibilité si Node.js est installé : ouvrez un terminal dans ce dossier et lancez `node preview.cjs`, puis ouvrez http://127.0.0.1:4173. Arrêt : Ctrl+C.

Pour vérifier le mobile, ouvrez les outils de développement du navigateur (F12), activez le mode appareil mobile et choisissez une largeur de 390 px. Le serveur proposé écoute uniquement sur cet ordinateur.

## Parcours à essayer

1. Accueil → L’expérience → Questions fréquentes → Contact. Le formulaire ne transmet rien.
2. Manager → Entrer dans le Manager. Aucun identifiant réel demandé.
3. Parc d’appareils → recherche, filtres Local/Distant et En ligne/Hors ligne.
4. Ouvrir les fiches et simuler un redémarrage sur un appareil disponible.
5. Déploiements → sélectionner Pi Club Nord → confirmer → lancer. Consulter ensuite sa version et l’activité du tableau de bord.
6. Administration → modifier le nom de l’espace, enregistrer, puis naviguer. Réinitialiser pour retrouver les données de départ.

## Périmètre

- Vitrine Sport Premium : anthracite, noir, orange.
- Manager Tech/SaaS : bleu, fond clair, navigation dédiée.
- Bouton Mode sombre / Mode clair dans la barre supérieure du Manager, sur PC et mobile. Le choix est conservé dans le stockage local du navigateur ; les simulations restent réinitialisées au rechargement. Si le stockage local est indisponible, le choix reste valable pendant la session.
- Quatre Raspberry Pi fictifs : deux locaux en ligne, un distant en ligne, un distant hors ligne.
- Connexion administrateur simulée, sans authentification réelle. La navigation Manager est conditionnée à l’entrée dans la démo ; cela ne constitue pas une protection de sécurité.
- GitHub : dépôt, versions et journaux fictifs. Déploiements et redémarrages simulés instantanément, sans opération réseau.
- Données en mémoire : recharger la page réinitialise les changements et la connexion.
- Statistiques de jeu exclues, prévues après la V1.
- Aucun accès à PiServeur, au GitHub de production ou à dartlink.fr. Les fichiers synchronisés sous `sources/` sont conservés intacts.
- Aucun service externe, police distante, cookie ou outil de suivi.

Le contexte accessible contient les choix de direction graphique et de périmètre, mais pas le texte des anciennes maquettes détaillées. Ce prototype concrétise ces choix ; les textes publics restent des propositions à valider. Les mentions légales officielles restent à compléter avant publication.
