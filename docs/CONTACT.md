# Formulaire de contact — préparation du 4 novembre 2026

## État et décision

Base WebSite `4a4d7df8642401b794d4b9fdf0858ade3063fac7`, production :
formulaire simulé. La branche `feat/contact-mail` prépare un envoi réel vers
l'adresse choisie par l'utilisateur, `dartlink180@gmail.com`. La publication
est autorisée mais reste conditionnée à la configuration privée et à un test
d'envoi. Ne pas publier le frontend avant le service opérationnel.

Le choix initial FormSubmit a été abandonné après des réponses 403 et un échec
de requête dans Chromium depuis le domaine : aucun envoi ni mail d'activation
n'a été confirmé. L'envoi retenu utilise le SMTP Gmail authentifié avec TLS.
Le formulaire reste sur le site ; aucun compte FormSubmit n'est utilisé.

## Comportement

Le navigateur POSTe le nom (100 caractères), l'e-mail (254) et le message
(2 000) en JSON sur `/api/contact`. Un champ piège masqué filtre les robots.
Le bouton est désactivé pendant l'envoi. Les champs ne sont effacés qu'après
une réponse positive du service. Validation, surcharge, indisponibilité et
absence de confirmation produisent un message et conservent la saisie.
Le lien mailto de secours reste utilisable. La FAQ et la page d'informations
remplacent les annonces historiques de simulation dans la version préparée.

## Architecture et dépendances

`app.js` appelle le service Python standard `scripts/contact-server.py`, lié
uniquement à `127.0.0.1:4180`. Nginx expose le chemin exact dans le bloc HTTPS
`dartlink.fr` et remplace `X-Real-IP` par l'adresse du client. L'origine exacte
et le type JSON sont exigés. Le corps est limité à 12 000 octets ; les champs
sont validés à nouveau et les retours de ligne sont interdits dans les champs
d'en-tête. Le destinataire et l'expéditeur proviennent uniquement de la
configuration privée ; l'e-mail du visiteur devient `Reply-To`.

Le service impose cinq tentatives par adresse IP et cinquante tentatives au
total sur dix minutes, avec huit traitements simultanés maximum. Les limites
sont en mémoire et repartent de zéro au redémarrage. Une origine autorisée et
un champ piège ne constituent pas une protection complète contre les robots.
Aucun CAPTCHA ni service de mesure n'est ajouté.

La seule dépendance nouvelle d'exploitation est Python 3 standard plus un
accès SMTP TLS (port 465). Le frontend et le build restent statiques ; aucune
librairie npm n'est ajoutée. GitHub Pages ne peut pas exécuter ce service : le
chemin API dépend du Nginx qui héberge effectivement `dartlink.fr`.

## Configuration privée et déploiement

Le fichier `/home/admin/.config/dartlink-contact/env`, mode 0600 dans un dossier
0700, est hors dépôt. Le modèle privé a été créé sans mot de passe. Ne jamais
copier ce fichier dans Git ou `dist`, ni afficher sa valeur dans les journaux.
Variables requises : `CONTACT_SMTP_HOST`, `CONTACT_SMTP_PORT`,
`CONTACT_SMTP_USER`, `CONTACT_SMTP_PASSWORD`, `CONTACT_FROM`, `CONTACT_TO`,
`CONTACT_ORIGIN`. Pour le compte Gmail choisi : serveur `smtp.gmail.com`, port
465 et origine `https://dartlink.fr`. Le mot de passe doit être un mot de passe
d'application dédié, pas le mot de passe principal du compte. Google exige la
validation en deux étapes et peut ne pas proposer cette option selon le compte :
[procédure officielle](https://support.google.com/accounts/answer/185833?hl=fr).

Quand la configuration est prête :

1. Créer l'utilisateur système sans connexion `dartlink-contact` ; installer le
   script dans `/opt/dartlink-contact/` et l'unité `ops/dartlink-contact.service`
   dans `/etc/systemd/system/`. L'unité lit le fichier privé via systemd avant
   son isolation, utilise un utilisateur dédié et un système de fichiers protégé.
2. Démarrer le service et vérifier son état sans afficher l'environnement.
3. Sauvegarder la configuration Nginx ; copier `ops/nginx-contact.conf` dans un
   snippet et l'inclure uniquement dans le bloc HTTPS principal. `nginx -t`,
   puis rechargement. La racine statique et les proxys des autres services sont
   conservés pendant cette étape.
4. Envoyer un unique message technique contenant des données fictives vers
   l'adresse autorisée. Une réponse 200 signifie acceptation SMTP ; confirmer
   séparément la réception en boîte de messagerie.
5. Après succès, intégrer la branche à `main`, vérifier sa présence distante,
   suivre Pages et installer une release statique neuve. Comparer les fichiers
   du domaine au build et consigner le SHA, le résultat et les limites.

Retour : restaurer la release statique précédente et son formulaire simulé,
puis retirer l'inclusion API et arrêter le service si nécessaire. Valider et
recharger Nginx. Ne pas restaurer globalement une configuration ancienne qui
écraserait d'autres évolutions de services.

## Données et limites

Aucun message n'est stocké durablement par le service Python ; le corps est
traité en mémoire. Les journaux du service ne contiennent ni contenu, ni
adresse e-mail, ni identifiant SMTP. L'accès Nginx de cette API n'est pas
journalisé et son tampon de corps dépasse sa limite de taille. L'hébergement
peut conserver des journaux techniques d'erreur. Les messages sont transmis
à Gmail et conservés dans la messagerie selon la gestion du destinataire.
Le serveur ne promet ni livraison finale en boîte de réception, ni absence de
classement en spam. Une coupure après acceptation SMTP peut laisser le
navigateur sans confirmation : vérifier la boîte avant de multiplier les tests.

## Validation de préparation

Les tests Python emploient des adresses et données fictives, un expéditeur
injecté et un SMTP simulé. Ils couvrent succès, validation, refus d'origine et
de format, taille, champ piège, limitation, erreur SMTP et destinataire fixe.
Chromium intercepte `/api/contact` : validation HTML, erreurs 502 et 429,
conservation de la saisie, réessai et succès avec effacement. Aucun mail réel
n'est envoyé par ces suites. La connexion TLS à Gmail depuis PiServeur a
répondu 250 à NOOP ; cela ne vérifie ni l'authentification ni la livraison.

```bash
python3 -m unittest discover -s tests -p '*_test.py' -v
node --check app.js
npm test
npm run test:browser
```

Le mot de passe d'application est encore absent lors de la préparation.
Aucun service de contact n'a été installé/démarré et aucune modification de la
production n'est revendiquée à ce stade.

Résultat de la préparation : huit tests Python réussis, trois tests Node du
build réussis, 24 combinaisons Chromium réussies avec les requêtes de contact
interceptées. Vérification de l'unité systemd et du snippet Nginx dans une
configuration temporaire isolée réussie. Syntaxe JavaScript/Python et contrôle
du diff réussis. La production n'a pas été modifiée ; le mot de passe SMTP
privé n'est pas encore renseigné et aucun message réel n'a été confirmé.
