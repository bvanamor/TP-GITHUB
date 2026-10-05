# Signalement d'un blocage technique

## Contexte

Je voulais fusionner la branche `test-blocage` dans la branche `signalement-blocage` afin de réunir les modifications du projet.

## Tenté

J'ai exécuté la commande :

`git merge test-blocage`

Les deux branches contenaient une modification différente du même fichier `docs/blocage-test.md`.

## Bloque

Git signale un conflit lors de la fusion :

`CONFLICT (add/add): Merge conflict in docs/blocage-test.md`

La fusion automatique a échoué et Git demande de résoudre le conflit avant de pouvoir terminer la fusion.

## Besoin

J'ai besoin de savoir quelle version du fichier `docs/blocage-test.md` doit être conservée, ou comment combiner correctement les deux versions.
