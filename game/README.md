# Ynov Adventures

Ynov Adventures est un mini jeu narratif en JavaScript conçu comme une aventure de choix où le joueur sélectionne une classe, combat des ennemis et avance dans une histoire inspirée du quotidien étudiant à Ynov.

Le projet est volontairement simple, lisible et modulable : il montre comment construire un jeu de texte avec des scènes, des choix, des combats et une interface HTML/CSS légère, sans framework ni dépendances externes.

---

## 1. Présentation du projet

Ce projet est une petite expérience de jeu interactive dont le principe est simple :

- ouvrir l’application dans le navigateur ;
- choisir une classe ;
- suivre l’histoire ;
- faire des choix qui influencent le déroulement ;
- combattre des ennemis à l’aide d’attaques aléatoires ;
- finir en victoire ou en défaite.

Il s’agit d’un parfait exemple de projet front-end léger, idéal pour apprendre :

- la structure HTML ;
- le style CSS ;
- la logique JavaScript ;
- la gestion des états ;
- la création d’éléments dynamiques dans le DOM.

---

## 2. Objectif pédagogique

Le but principal de ce projet est de montrer comment créer un jeu narratif simple à partir de :

- une page d’accueil ;
- un écran de sélection de classe ;
- un écran de jeu ;
- une banque de scènes ;
- des interactions utilisateur ;
- un système de combat basé sur des statistiques.

Ce code est intéressant car il illustre bien la logique de base d’un jeu textuel :

- les données du jeu sont séparées de l’affichage ;
- le rendu est généré dynamiquement en JS ;
- les scènes sont facilement extensibles ;
- le système de combat est réutilisable pour d’autres ennemis.

---

## 3. Structure du projet

```text
game/
├── index.html
├── css/
│   └── style.css
└── js/
    └── game.js
```

### Fichiers

- `index.html` : structure du jeu, écrans et éléments du DOM.
- `css/style.css` : styles, palette, mise en page et typographie.
- `js/game.js` : logique du jeu, scènes, combats, statistiques et gestion des boutons.

---

## 4. Démarrage rapide

### Prérequis

Aucun framework n’est nécessaire. Il suffit simplement d’avoir :

- un navigateur moderne (Chrome, Firefox, Edge, etc.) ;
- un éditeur de texte (VS Code par exemple).

### Lancer le projet

1. Ouvrir le dossier `game` dans le navigateur.
2. Double-cliquer sur `index.html`, ou lancer un petit serveur local si tu veux un environnement plus propre.

Exemple avec Python :

```bash
cd game
python3 -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

---

## 5. Explication détaillée du fonctionnement

### 5.1. Les écrans

Le fichier HTML contient plusieurs sections :

- `accueil` : page d’introduction ;
- `classes` : sélection du personnage ;
- `jeu` : zone principale où se déroule l’histoire.

Les écrans sont gérés avec une classe CSS appelée `actif`, ce qui permet de masquer ou afficher uniquement l’écran courant.

```js
function montrerEcran(id) {
  document.querySelectorAll(".ecran").forEach(e => e.classList.remove("actif"));
  document.getElementById(id).classList.add("actif");
}
```

Cette fonction est très utile car elle garde le code propre et évite de créer une page différente pour chaque écran.

---

### 5.2. Les classes du joueur

Les personnages sont définis dans un objet `CLASSES` :

```js
const CLASSES = {
  info: { nom: "Info", pv: 30, attaque: 6 },
  cyber: { nom: "Cyber", pv: 24, attaque: 7 },
  data: { nom: "Data", pv: 18, attaque: 10 }
};
```

Chaque classe contient :

- un nom ;
- des points de vie ;
- une attaque.

Cette structure est excellente pour réutiliser le code, car il suffit d’ajouter une nouvelle clé dans `CLASSES` pour créer un nouveau personnage.

---

### 5.3. Les scènes du jeu

L’histoire est stockée dans un objet `SCENES` :

```js
const SCENES = {
  debut: {
    texte: "Tu te tiens face à la porte automatique qui ne s'ouvre pas.",
    choix: [
      { label: "Monter dans la salle directement", vers: "village" },
      { label: "Rester sur le parking", vers: "foret" }
    ]
  },
  ...
};
```

Chaque scène contient :

- `texte` : le message affiché ;
- `choix` : les actions possibles ;
- `combat` : si la scène est un combat ;
- `fin` : si la scène termine la partie.

Le système est très bien pensé, car chaque scène est indépendante et peut être modifiée sans toucher la logique globale.

---

### 5.4. Le joueur et l’état du jeu

Le statut du joueur est géré dans un objet `joueur` :

```js
joueur = {
  nom: c.nom,
  pv: c.pv,
  pvMax: c.pv,
  attaque: c.attaque,
  potions: 1,
  potionPrise: false,
  coffreOuvert: false,
  ruisseauBu: false
};
```

Cela permet de suivre :

- les PV du personnage ;
- l’attaque ;
- le nombre de potions ;
- les objets ou actions déjà accomplis.

Les variables comme `potionPrise`, `coffreOuvert` et `ruisseauBu` servent à bloquer ou débloquer certains choix selon l’état du joueur.

---

### 5.5. Le système de scènes et de navigation

La fonction centrale est `allerA(id)` :

```js
function allerA(id) {
  sceneActuelle = id;
  const scene = SCENES[id];
  ennemi = null;

  document.getElementById("texte").innerHTML = "<p>" + scene.texte + "</p>";
  document.getElementById("choix").innerHTML = "";
  majStats();

  if (scene.combat) {
    ennemi = { nom: scene.combat.nom, pv: scene.combat.pv, degats: scene.combat.degats, vers: scene.combat.vers };
    afficherCombat();
  } else if (scene.fin) {
    ajouterBouton("Rejouer", () => montrerEcran("accueil"), true);
  } else {
    scene.choix.forEach(choix => {
      if (choix.visible && !choix.visible()) return;
      ajouterBouton(choix.label, () => {
        document.getElementById("journal").innerHTML = "";
        if (choix.action) choix.action();
        allerA(choix.vers);
      });
    });
  }
}
```

Cette fonction gère :

- l’affichage de la scène ;
- les boutons de choix ;
- l’exécution des actions associées ;
- la transition vers la scène suivante.

C’est le cœur du jeu.

---

### 5.6. Les combats

En combat, le joueur clique sur le bouton “Attaquer” ou “Boire une potion” :

```js
function attaquer() {
  const degatsJoueur = aleatoire(joueur.attaque - 2, joueur.attaque + 2);
  ennemi.pv -= degatsJoueur;
  ecrireJournal("Tu infliges " + degatsJoueur + " dégâts au " + ennemi.nom + ".");

  if (ennemi.pv <= 0) {
    ecrireJournal("Le " + ennemi.nom + " est vaincu !");
    const suite = ennemi.vers;
    document.getElementById("choix").innerHTML = "";
    ajouterBouton("Continuer", () => { document.getElementById("journal").innerHTML = ""; allerA(suite); }, true);
    return;
  }

  tourEnnemi();
}
```

Le système utilise un random simple :

```js
function aleatoire(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

Cela rend chaque combat différent, ce qui ajoute du dynamisme sans complexifier le code.

---

## 6. Comment réutiliser et étendre le code

### Ajouter une nouvelle scène

Pour créer une nouvelle étape de l’histoire, il suffit d’ajouter un objet dans `SCENES` :

```js
bibliotheque: {
  texte: "Tu entres dans la bibliothèque de l’école.",
  choix: [
    { label: "Chercher un indice", vers: "indice" },
    { label: "Revenir au hall", vers: "debut" }
  ]
}
```

Ensuite, il suffit de relier cette scène depuis une autre étape avec le champ `vers`.

---

### Ajouter un nouveau choix

Un choix peut contenir :

- `label` : texte du bouton ;
- `vers` : scène suivante ;
- `action` : effet à exécuter ;
- `visible` : condition d’affichage.

Exemple :

```js
{
  label: "Prendre la clé",
  visible: () => !joueur.cleRecuperee,
  action: () => {
    joueur.cleRecuperee = true;
    joueur.attaque += 1;
    ecrireJournal("Tu prends la clé magique (+1 attaque).");
  },
  vers: "cour"
}
```

Cela montre très bien comment rendre le jeu interactif sans réécrire toute la logique.

---

### Ajouter une nouvelle classe

Il suffit d’ajouter une clé dans `CLASSES` :

```js
const CLASSES = {
  info: { nom: "Info", pv: 30, attaque: 6 },
  cyber: { nom: "Cyber", pv: 24, attaque: 7 },
  data: { nom: "Data", pv: 18, attaque: 10 },
  dev: { nom: "Dev", pv: 28, attaque: 9 }
};
```

Puis ajouter le bouton dans le HTML :

```html
<button class="classe" data-classe="dev">Dev<small>28 PV · attaque 9</small></button>
```

Le reste du code reste inchangé.

---

### Réutiliser les fonctions existantes

Le code de base est déjà construit pour être réemployé :

- `majStats()` sert à afficher les statistiques du personnage ;
- `ecrireJournal()` ajoute des messages de narration ;
- `ajouterBouton()` crée dynamiquement les boutons ;
- `aleatoire()` gère les dégâts aléatoires ;
- `montrerEcran()` gère les écrans.

Cela signifie qu’un autre projet de jeu narratif peut réutiliser exactement ces mêmes fonctions sans repartir de zéro.

---

## 7. Mises en page et typographie

La typographie du projet est pensée pour donner un rendu “univers fantasy / univers étudiant / ambiance aventure”.

Dans le CSS, la police principale est :

- `Lora` pour le texte courant ;
- `Pirata One` pour les titres.

Cela est défini ici :

```css
body {
  font-family: "Lora", Georgia, serif;
  font-size: 18px;
  line-height: 1.6;
}

h1, h2 {
  font-family: "Pirata One", Georgia, serif;
}
```

### Pourquoi ce choix fonctionne bien

- `Lora` apporte une lecture fluide et agréable pour les paragraphes ;
- `Pirata One` donne un effet plus vivant et plus narratif aux titres ;
- l’ensemble crée une ambiance plus immersive sans rendre la lecture difficile.

Le CSS ajoute aussi une palette cohérente :

```css
:root {
  --fond: #121c1a;
  --texte: #e6e0cc;
  --carte: #1b2926;
  --bord: #3b4d48;
  --accent: #e08a4a;
  --pv: #6fbf7e;
}
```

Cette palette oscille entre le noir profond et les accents chauds, ce qui renforce le côté “aventures / campus / ambiance médiévale moderne”.

---

## 8. Bonnes pratiques observées dans le code

Voici ce qui rend le projet solide et facilement maintenable :

- séparation claire entre HTML, CSS et JS ;
- données de jeu centralisées dans des objets ;
- logique de navigation dans des fonctions dédiées ;
- pas de duplication excessive ;
- utilisation de `dataset` pour récupérer le nom de la classe ;
- ajout dynamique des boutons sans code HTML répétitif.

Le projet est également très pédagogique pour comprendre le principe du DOM :

- créer des éléments ;
- les modifier ;
- injecter du contenu ;
- écouter les événements.

---

## 9. Idées d’amélioration

Tu peux facilement enrichir ce projet avec :

- plus de scènes et de chemins narratifs ;
- plusieurs ennemis avec compétences différentes ;
- système de sauvegarde localStorage ;
- écran de fin avec score final ;
- animation d’introduction ;
- musique ou effets sonores ;
- menu pause ou options ;
- ajout d’objets, d’armes, de bonus d’attaque et de défense.

---

## 10. Document de référence des réglages

Ce document est une fiche de consultation rapide. Il ne remplace pas la lecture du code, mais il permet de retrouver immédiatement les réglages importants du projet.

| Élément | Emplacement | Valeur / structure | Rôle | À modifier si... |
|---|---|---|---|---|
| Police du texte principal | `css/style.css` | `font-family: "Lora", Georgia, serif;` | Litérature et lisibilité du texte narratif | Tu veux une ambiance plus élégante, plus classique ou plus légère |
| Police des titres | `css/style.css` | `font-family: "Pirata One", Georgia, serif;` | Donne un effet aventure / RPG / jeu narratif | Tu veux un style plus moderne, plus héroïque ou plus minimal |
| Palette principale | `css/style.css` | `--fond`, `--texte`, `--carte`, `--bord`, `--accent`, `--pv` | Définit l’identité visuelle du jeu | Tu veux changer l’ambiance visuelle globale |
| Largeur du conteneur | `css/style.css` | `main { max-width: 640px; ... }` | Limite la largeur du jeu pour garder une lecture confortable | Tu veux une interface plus large ou plus compacte |
| Classe Info | `js/game.js` | `pv: 30`, `attaque: 6` | Personnage robuste, plus résistant | Tu veux un personnage plus défensif ou plus équilibré |
| Classe Cyber | `js/game.js` | `pv: 24`, `attaque: 7` | Classe équilibrée | Tu veux un profil moyen avec un bon niveau de confort |
| Classe Data | `js/game.js` | `pv: 18`, `attaque: 10` | Classe agressive mais fragile | Tu veux un personnage très offensif |
| Potions de départ | `js/game.js` | `potions: 1` | Donne un petit avantage de survie au début | Tu veux plus ou moins de sécurité au démarrage |
| Soins de potion | `js/game.js` | `+10 PV`, `joueur.pv = Math.min(...)` | Permet de se remettre de dégâts en combat | Tu veux une potion plus puissante ou plus rare |
| Dégâts aléatoires | `js/game.js` | `aleatoire(min, max)` | Rend les combats imprévisibles et dynamiques | Tu veux moins de hasard ou plus de difficulté |
| Écran d’accueil | `index.html` | section `#accueil` | Présentation et lancement du jeu | Tu veux modifier le texte d’introduction |
| Écran de sélection | `index.html` | section `#classes` | Choix des classes | Tu veux ajouter une nouvelle classe ou changer le libellé |
| Écran de jeu | `index.html` | section `#jeu` | Zone principale des stats, narration et choix | Tu veux changer la structure de l’interface |
| Journal d’événements | `js/game.js` | `ecrireJournal()` | Affiche les messages d’action et de combat | Tu veux modifier le style des notifications |
| Boutons de choix | `js/game.js` | `ajouterBouton()` | Crée les options dynamiquement | Tu veux un bouton plus grand, plus simple ou plus personnalisé |
| Transition de scène | `js/game.js` | `allerA(id)` | Centralise la navigation entre les scènes | Tu veux changer la logique de progression |
| Condition d’affichage | `SCENES` | `visible: () => ...` | Masque ou montre certains choix selon l’état du joueur | Tu veux ajouter des conditions plus poussées |
| Fin de partie | `js/game.js` | `scene.fin` | Déclenche l’écran final | Tu veux ajouter plusieurs fins ou scores |
| Rejouer | `js/game.js` | `ajouterBouton("Rejouer", ...)` | Permet de relancer une partie | Tu veux mettre un bouton de retour à l’accueil ou un menu |

### Référence rapide des principales variables de jeu

| Variable | Type | Description |
|---|---|---|
| `CLASSES` | objet | Contient les classes et leurs statistiques |
| `joueur` | objet | Stocke l’état actuel du personnage |
| `ennemi` | objet | Contient les stats de l’ennemi actif |
| `sceneActuelle` | string | Identifiant de la scène courante |
| `SCENES` | objet | Base de données des lieux et des choix |

### Référence rapide des fonctions clés

| Fonction | Rôle |
|---|---|
| `montrerEcran(id)` | Affiche un écran et masque les autres |
| `majStats()` | Met à jour les statistiques du joueur |
| `ecrireJournal(message)` | Ajoute un message dans le journal |
| `ajouterBouton(label, fonction, principal)` | Crée un bouton interactif |
| `demarrer(cle)` | Initialise une nouvelle partie |
| `allerA(id)` | Charge une scène et ses choix |
| `afficherCombat()` | Affiche les actions pendant un combat |
| `aleatoire(min, max)` | Génère un nombre aléatoire |
| `attaquer()` | Gère l’attaque du joueur |
| `boirePotion()` | Utilise une potion |
| `tourEnnemi()` | Fait attaquer l’ennemi |

---

## 11. Conclusion

Ynov Adventures est un projet simple, cohérent et très bon pour comprendre les bases du développement web interactif. Il montre comment faire évoluer une histoire à partir de données structurées, de choix utilisateur et d’un système de combat minimaliste.

Ce qui le rend particulièrement intéressant, c’est qu’il n’est ni trop complexe ni trop rigide : il est facile à lire, facile à modifier et facile à réutiliser.

Tu peux donc l’utiliser comme base pour :

- un projet de cours ;
- un prototype de jeu narratif ;
- une démonstration de logique JavaScript ;
- un exemple de site interactif.

---

## 12. Licence

Ce projet est fourni à titre éducatif et peut être librement adapté.

---

## 13. À retenir

Si toi qui me lit veux réutiliser ce code pour un autre projet, garde bien ces principes :

1. centraliser l’histoire dans un objet `SCENES` ;
2. séparer les données du rendu ;
3. utiliser des fonctions réutilisables pour les actions et les affichages ;
4. rester clair dans la structure du DOM ;
5. donner à ton interface une identité visuelle forte via la typographie et les couleurs.

C’est cette logique qui fait que le projet reste simple et surtout extensible.
