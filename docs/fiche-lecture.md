# Fiche de lecture critique du README du dépôt-modèle

Document analysé : README.md du dépôt-modèle `btaoldai/trv-collab-et-doc-tech`

## 1. Objectif annoncé

Constat : Non. Le README présente `releve-cli` et explique ce qu'il produit, mais il ne dit pas explicitement ce que le lecteur saura faire à la fin.

Renvoi : paragraphe d'introduction après la mention du dépôt-modèle.

## 2. Prérequis explicites

Constat : Non. Aucun prérequis n'est présenté sous forme de liste avant le démarrage. Le README renvoie directement vers le guide de démarrage.

Renvoi : section « Démarrage ».

## 3. Contexte et périmètre

Constat : Partiellement. Le README explique le rôle de `releve-cli`, mais il ne précise pas ce qui est hors périmètre.

Renvoi : paragraphe d'introduction décrivant `releve-cli`.

## 4. Étapes numérotées

Constat : Non. Le README ne contient pas d'étapes numérotées et vérifiables une par une. Les actions sont renvoyées vers le guide de démarrage.

Exemple d'étape bien écrite : aucune étape numérotée n'est présente dans le README.

Exemple à découper : la partie « Configuration » demande de copier `config.example.txt`, de le renommer et de le compléter. Ces actions pourraient être présentées comme plusieurs étapes vérifiables.

Renvoi : sections « Démarrage » et « Configuration ».

## 5. Encadrés typés

Constat : Non. Le README ne contient pas d'encadré explicite de type définition, avertissement ou vérification.

Renvoi : début du README et section « Configuration ».

## 6. Liste de contrôle finale

Constat : Non. Le README ne contient pas de liste de contrôle permettant au lecteur de vérifier seul qu'il a terminé toutes les actions.

Renvoi : fin du README.

## 7. Lexique et sources

Constat : Insuffisant. Aucun sigle n'est réellement développé. « CSV » est décrit comme des mesures horodatées, mais ce n'est pas le développement du sigle. « PR » est utilisé sans explication. Le README ne présente pas non plus de sources datées.

Renvoi : paragraphe d'introduction et section « Contribuer ».

# Ce que je corrige dans notre propre documentation

## Correction 1 : ajouter un objectif et des prérequis

Dans `docs/demarrage.md`, ajouter une section « Objectif » et une section « Prérequis » avant les étapes.

La documentation doit expliquer dès le début ce que le lecteur saura faire et ce qu'il doit avoir avant de commencer.

## Correction 2 : ajouter une liste de contrôle finale

Dans `docs/demarrage.md`, ajouter une liste de contrôle à la fin du guide.

Cette liste permettra au lecteur de vérifier seul que toutes les étapes ont été réalisées correctement.

## Test décisif

Une personne qui n'a jamais vu ce projet peut-elle suivre ce document seule, jusqu'au bout, sans poser de question ?

Réponse : Non, le README du dépôt-modèle nécessite encore de consulter le guide de démarrage pour connaître les étapes précises.