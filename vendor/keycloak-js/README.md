# Keycloak JS 26.2.5

Copie inchangée du paquet `keycloak-js` 26.2.5 déjà utilisé par DartLink-Cloud :
`lib/keycloak.js`, `lib/deprecations.js`, `LICENSE.txt` renommé `LICENSE`.
Source : https://github.com/keycloak/keycloak-js ; licence Apache 2.0 conservée.
Aucun CDN ni secret. Le build copie uniquement ces trois fichiers vers dist.
Pour une mise à jour, partir du paquet officiel vérifié, conserver la licence,
mettre à jour la version ici et rejouer le parcours OIDC réel. Les tokens restent
uniquement en mémoire ; le stockage temporaire OAuth du SDK contient les valeurs
state/nonce/PKCE nécessaires au callback, jamais les tokens applicatifs.
