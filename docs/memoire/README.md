# Mémoire de développement WebSite

Établie le 20 octobre 2026 depuis la branche GitHub `fix/manager-link`, a0e7285a41d5f0ea12245a23221cdfe9f0fd9922, dont l’arbre est identique au checkout PiServeur 25abe81. Cette mémoire accompagne son intégration dans main ; elle ne certifie pas l’état du site déployé.

## Rôle et architecture

Site vitrine statique DartLink. La version courante utilise `index.html`, `app.js` et `style.css` à la racine. `app.js` assure le routage par fragment, les pages publiques et les interactions dans le navigateur. Le code React sous `src/` est historique et n’est pas l’entrée du build courant.

Les boutons Manager et Explorer le Manager ouvrent `https://dartlink.fr/manager/`. Les routes historiques `#/login` et `#/manager` redirigent vers ce Manager réel. Le code de démonstration est conservé ; il ne constitue pas le backend opérationnel. Le formulaire public reste une simulation, sans envoi de message réel.

Les captures et leur provenance sont documentées dans [public/screenshots/README](../../public/screenshots/README.md) et [screenshots/README](../../screenshots/README.md). Le code du jeu et le backend Manager appartiennent aux dépôts [DartLink](https://github.com/DartLink180/DartLink) et [DartLink-Manager](https://github.com/DartLink180/DartLink-Manager).

## Dépendances et génération

`package.json` conserve React/ReactDOM ^18.3.1, Vite ^5.4.10 et plugin-react ^4.3.2 pour l’historique et les outils de développement. Le build courant est `node build.cjs` (`npm run build`) : il utilise uniquement fs/path de Node, copie les trois fichiers racine dans dist et ajoute .nojekyll. Le workflow utilise Node 20.

Le build ne copie pas tout le dossier public : ne pas supposer qu’une image ajoutée au dépôt est publiée. Vérifier les chemins utilisés et la liste explicite de `build.cjs` avant de modifier les ressources. Le script ne nettoie pas dist ; utiliser une sortie neuve pour une vérification reproductible.

## Exploitation et contraintes

Le workflow [.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml) déclenche GitHub Pages sur push vers main ou lancement manuel. Une fusion peut donc déployer même sans commande locale. Pour une publication de code ou de documentation explicitement sans déploiement, utiliser un message de commit final contenant `[skip ci]`, sans lancer workflow_dispatch ; vérifier ensuite l’absence de run Pages associé.

Consulter [RESTAURATION](../../RESTAURATION.md) avant tout retour : restaurer par revert ou par nouveaux commits depuis une sauvegarde. Fusionner simplement une ancienne branche ne restaure pas ses fichiers déjà présents dans l’historique. La sauvegarde avant V2 est identifiée dans ce document.

Vérifications isolées : `node --check app.js`, génération dans un répertoire temporaire avec les trois entrées et le script, contrôle de la sortie ; vérifier en navigateur les routes publiques, le lien Manager, le mobile et le comportement du formulaire après un changement fonctionnel. Aucun backend ni accès PiServeur n’est nécessaire pour la simple génération.

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
