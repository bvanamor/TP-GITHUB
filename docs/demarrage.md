# Démarrage de releve-cli

## Objectif

À la fin de ce guide, vous saurez lancer `releve-cli` avec un fichier de configuration et vérifier que le rapport de synthèse est produit correctement.

## Prérequis

Avant de commencer :
- avoir Git installé
- avoir Python 3 installé
- avoir accès au dépôt de l'équipe

1. Cloner le dépôt de l'équipe, puis se placer dans le dossier du projet.
2. Copier `config.example.txt` sous le nom `config.txt` et y inscrire le chemin du fichier de relevés.
3. Lancer l'outil sur le fichier d'exemple :

   ```
   python3 releve.py --config config.txt
   ```

   Résultat attendu : un rapport de synthèse s'affiche (nombre de mesures, moyenne, maximum,
   minimum) et aucun fichier `config.txt` n'apparaît dans les fichiers suivis par Git.
