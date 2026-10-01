# Démarrage de releve-cli

1. Cloner le dépôt de l'équipe, puis se placer dans le dossier du projet.
2. Copier `config.example.txt` sous le nom `config.txt` et y inscrire le chemin du fichier de relevés.
3. Lancer l'outil sur le fichier d'exemple :

   ```
   python3 releve.py --config config.txt
   ```

   Résultat attendu : un rapport de synthèse s'affiche (nombre de mesures, moyenne, maximum,
   minimum) et aucun fichier `config.txt` n'apparaît dans les fichiers suivis par Git.
