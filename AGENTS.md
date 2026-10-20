# Consignes pour les prochaines sessions Codex

Avant chaque développement, lire [la mémoire du projet](docs/memoire/README.md), puis les sources et procédures qu’elle référence. Vérifier la branche, le SHA et les modifications locales ; ne pas confondre code GitHub, code de travail et version effectivement déployée.

Après chaque fonctionnalité, correction importante ou changement d’architecture, mettre à jour la documentation concernée dans le même changement : comportement, architecture, dépendances, exploitation, décision et raison, incident/cause/solution, référence Git, validation et limites. Conserver les anciennes décisions en indiquant celles qui sont remplacées.

Vérifier les faits dans le code et Git. Distinguer résultat historique, état vérifié et hypothèse. Ne pas déclarer une recette matérielle ou un déploiement sur la seule présence du code.

Ne jamais inscrire de mot de passe, jeton, clé privée ou configuration réelle sensible dans la documentation ou Git. Contrôler les ajouts avant publication. Utiliser des données temporaires pour les tests. Ne pas modifier ou déployer la production sans instruction explicite ; une fusion GitHub n’autorise pas un déploiement.

Les branches anciennes ne reçoivent pas automatiquement ce fichier : avant d’y travailler, consulter aussi la mémoire de main et intégrer les consignes utiles en préservant leurs particularités.
