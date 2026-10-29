# Consignes pour les prochaines sessions Codex

Avant chaque développement, lire [la mémoire du projet](docs/memoire/README.md), puis les sources et procédures qu’elle référence. Vérifier la branche, le SHA et les modifications locales ; ne pas confondre code GitHub, code de travail et version effectivement déployée.

Après chaque fonctionnalité, correction importante ou changement d’architecture, mettre à jour la documentation concernée dans le même changement : comportement, architecture, dépendances, exploitation, décision et raison, incident/cause/solution, référence Git, validation et limites. Conserver les anciennes décisions en indiquant celles qui sont remplacées.

Chaque changement terminé, y compris documentaire, doit être enregistré dans un commit et poussé sur la branche correspondante du dépôt GitHub. Avant de le déclarer livré, récupérer l’état distant et vérifier que le SHA du commit poussé est présent sur cette branche ; signaler explicitement tout changement resté local ou tout push en échec. Un push sur `main` déclenche le workflow GitHub Pages : pour un changement applicatif sans autorisation de déploiement, pousser une branche dédiée et attendre l’autorisation avant la fusion. Pour un changement uniquement documentaire sur `main`, suivre la procédure `[skip ci]` décrite dans la mémoire.

Vérifier les faits dans le code et Git. Distinguer résultat historique, état vérifié et hypothèse. Ne pas déclarer une recette matérielle ou un déploiement sur la seule présence du code.

Ne jamais inscrire de mot de passe, jeton, clé privée ou configuration réelle sensible dans la documentation ou Git. Contrôler les ajouts avant publication. Utiliser des données temporaires pour les tests. Ne pas modifier ou déployer la production sans instruction explicite ; une fusion GitHub n’autorise pas un déploiement.

Les branches anciennes ne reçoivent pas automatiquement ce fichier : avant d’y travailler, consulter aussi la mémoire de main et intégrer les consignes utiles en préservant leurs particularités.
