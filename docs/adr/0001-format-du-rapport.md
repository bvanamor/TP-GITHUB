# ADR 0001 : Format du rapport de synthèse

Statut : Accepté
Date : 6 octobre 2026

## Contexte

Le rapport de synthèse est actuellement produit sous forme de texte tabulaire alors que le service de dépôt attend des données au format JSON.

L’issue #7 signale qu’aucune trace écrite n’explique pourquoi ce choix de format a été fait. Une personne qui reprend le projet ne peut donc pas savoir s’il s’agit d’une décision volontaire ou d’un oubli.

## Options

### Option 1 : conserver le format texte tabulaire

Apport :
- Format simple à lire directement par une personne.
- Production du rapport facile à mettre en œuvre.

Coût :
- Le format ne correspond pas au JSON attendu par le service de dépôt.
- Une transformation supplémentaire peut être nécessaire pour communiquer avec le service.

### Option 2 : produire directement le rapport au format JSON

Apport :
- Le format correspond à celui attendu par le service de dépôt.
- Les données peuvent être traitées plus facilement par un programme.

Coût :
- Le rapport est moins lisible directement pour une personne.
- La production et la lecture du rapport nécessitent de respecter la structure JSON.

## Décision

Le format texte tabulaire est conservé pour le rapport de synthèse.

## Critère de décision

Le critère principal est la lisibilité du rapport pour une personne qui doit consulter rapidement les résultats.

## Conséquences

Facile :
- Le rapport reste simple à lire pour une personne.
- La présentation tabulaire reste directement exploitable.

Difficile :
- Le rapport ne correspond pas directement au format JSON attendu par le service de dépôt.
- Une adaptation ou une conversion peut être nécessaire pour transmettre les données au service.

## Référence

Issue : #7
