# Retour à la version précédente

Le site avant DartLink V2 est conservé dans la branche `backup/avant-dartlink-v2-2026-10-15`, au commit `5f5b4aadd0f0474c3e19b2732150395357427664`.

Pour restaurer le site publié, annuler le commit de fusion de la pull request DartLink V2 avec « Revert » dans GitHub et fusionner la pull request de retour arrière. Le workflow GitHub Pages republiera l’ancienne version. Prendre en compte les nouveaux changements éventuels lors de cette opération.

Autre méthode : créer une branche à partir du dernier main, y restaurer les fichiers de la sauvegarde puis ouvrir et fusionner une pull request vers main. Ne pas simplement fusionner la branche de sauvegarde : son commit appartient déjà à l’historique et cela ne rétablit pas les anciens fichiers.

PiServeur et le dépôt DartLink ne sont pas concernés par ce déploiement.
