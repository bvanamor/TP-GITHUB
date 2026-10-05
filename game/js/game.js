/* =====================================================
   1. DONNÉES DU JEU
   ===================================================== */

// Les trois classes de personnage
const CLASSES = {
  info: { nom: "Info", pv: 30, attaque: 6 },
  cyber:   { nom: "Cyber",   pv: 24, attaque: 7 },
  data:     { nom: "Data",     pv: 18, attaque: 10 }
};

// L'état du joueur (il change pendant la partie)
let joueur = {};
let ennemi = null;     // l'ennemi en cours de combat (ou null)
let sceneActuelle = "";

// Toutes les scènes de l'histoire.
// Chaque scène a un texte et une liste de choix.
// Un choix peut avoir une "action" (fonction) et une scène suivante ("vers").
const SCENES = {

  debut: {
    texte: "Tu te tiens face à la porte automatique qui ne s'ouvre pas.",
    choix: [
      { label: "Monter dans la salle directement", vers: "village" },
      { label: "Rester sur le parking", vers: "foret" }
    ]
  },

  village: {
    texte: "Van te propose une monster",
    choix: [
      {
        label: "Accepter",
        // ne s'affiche que si le joueur n'a pas déjà pris la potion
        visible: () => !joueur.potionPrise,
        action: () => {
          joueur.potions += 1;
          joueur.potionPrise = true;
          ecrireJournal("Tu reçois une monster (permet de se soigner)");
        },
        vers: "village"
      },
      { label: "Quitter la salle", vers: "foret" }
    ]
  },

  foret: {
    texte: "Remy arrive prêt à en découdre.",
    combat: { nom: "Rémy", pv: 14, degats: 4, vers: "carrefour" }
  },

  carrefour: {
    texte: "Rémy à perdu .",
    choix: [
      {
        label: "Chercher une multiprise",
        visible: () => !joueur.coffreOuvert,
        action: () => {
          joueur.coffreOuvert = true;
          joueur.pv -= 4;
          joueur.attaque += 2;
          ecrireJournal("Pas de multiprise (+2 attaque).");
        },
        vers: "carrefour"
      },
      { label: "Acheter un sandwich (+6 PV)",
        visible: () => !joueur.ruisseauBu,
        action: () => {
          joueur.ruisseauBu = true;
          joueur.pv = Math.min(joueur.pv + 6, joueur.pvMax);
          ecrireJournal("C'est bon !");
        },
        vers: "carrefour"
      },
      { label: "Tu retourne à Ynov et tu t'installe dans le hall mais Julien approche pour te donner un QCM.", vers: "grotte" }
    ]
  },

  grotte: {
    texte: "Julien veut se battre.",
    combat: { nom: "Julien", pv: 32, degats: 6, vers: "victoire" }
  },

  victoire: {
    texte: "Julien perd et tu a échapé au QCM.",
    fin: true
  },

  defaite: {
    texte: "Tes forces t'abandonnent. Tu viens d'ammener un zéro à ta moyenne.",
    fin: true
  }
};

/* =====================================================
   2. FONCTIONS D'AFFICHAGE
   ===================================================== */

// Raccourci pour récupérer un élément par son id
function $(id) { return document.getElementById(id); }

// Affiche un écran et cache les autres
function montrerEcran(id) {
  document.querySelectorAll(".ecran").forEach(e => e.classList.remove("actif"));
  $(id).classList.add("actif");
}

// Met à jour la barre de stats
function majStats() {
  $("stats").innerHTML =
    '<span>' + joueur.nom + '</span>' +
    '<span class="pv">PV : ' + joueur.pv + ' / ' + joueur.pvMax + '</span>' +
    '<span>Attaque : ' + joueur.attaque + '</span>' +
    '<span>Potions : ' + joueur.potions + '</span>';
}

// Ajoute une ligne dans le journal (messages d'événements)
function ecrireJournal(message) {
  const p = document.createElement("p");
  p.textContent = message;
  $("journal").appendChild(p);
}

// Crée un bouton de choix
function ajouterBouton(label, fonction, principal) {
  const b = document.createElement("button");
  b.textContent = label;
  if (principal) b.className = "principal";
  b.addEventListener("click", fonction);
  $("choix").appendChild(b);
}

/* =====================================================
   3. LOGIQUE DU JEU
   ===================================================== */

// Lance une nouvelle partie avec la classe choisie
function demarrer(cle) {
  const c = CLASSES[cle];
  joueur = {
    nom: c.nom, pv: c.pv, pvMax: c.pv, attaque: c.attaque,
    potions: 1, potionPrise: false, coffreOuvert: false, ruisseauBu: false
  };
  montrerEcran("jeu");
  allerA("debut");
}

// Affiche une scène
function allerA(id) {
  sceneActuelle = id;
  const scene = SCENES[id];
  ennemi = null;

  $("texte").innerHTML = "<p>" + scene.texte + "</p>";
  $("choix").innerHTML = "";
  majStats();

  if (scene.combat) {
    // On copie l'ennemi pour ne pas modifier les données d'origine
    ennemi = { nom: scene.combat.nom, pv: scene.combat.pv, degats: scene.combat.degats, vers: scene.combat.vers };
    afficherCombat();
  } else if (scene.fin) {
    ajouterBouton("Rejouer", () => montrerEcran("accueil"), true);
  } else {
    scene.choix.forEach(choix => {
      // on saute les choix dont la condition "visible" est fausse
      if (choix.visible && !choix.visible()) return;
      ajouterBouton(choix.label, () => {
        $("journal").innerHTML = "";
        if (choix.action) choix.action();
        allerA(choix.vers);
      });
    });
  }
}

// Boutons pendant un combat
function afficherCombat() {
  $("choix").innerHTML = "";
  majStats();
  ecrireJournal(ennemi.nom + " : " + ennemi.pv + " PV");
  ajouterBouton("Attaquer", attaquer);
  if (joueur.potions > 0) ajouterBouton("Boire une potion (+10 PV)", boirePotion);
}

// Nombre aléatoire entre min et max (inclus)
function aleatoire(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function attaquer() {
  $("journal").innerHTML = "";

  // Tour du joueur
  const degatsJoueur = aleatoire(joueur.attaque - 2, joueur.attaque + 2);
  ennemi.pv -= degatsJoueur;
  ecrireJournal("Tu infliges " + degatsJoueur + " dégâts au " + ennemi.nom + ".");

  if (ennemi.pv <= 0) {
    ecrireJournal("Le " + ennemi.nom + " est vaincu !");
    const suite = ennemi.vers;
    $("choix").innerHTML = "";
    ajouterBouton("Continuer", () => { $("journal").innerHTML = ""; allerA(suite); }, true);
    return;
  }

  tourEnnemi();
}

function boirePotion() {
  $("journal").innerHTML = "";
  joueur.potions -= 1;
  joueur.pv = Math.min(joueur.pv + 10, joueur.pvMax);
  ecrireJournal("Tu bois une potion (+10 PV).");
  tourEnnemi();
}

// L'ennemi riposte
function tourEnnemi() {
  const degats = aleatoire(ennemi.degats - 2, ennemi.degats + 1);
  joueur.pv -= degats;
  ecrireJournal("Le " + ennemi.nom + " te frappe : −" + degats + " PV.");

  if (joueur.pv <= 0) {
    joueur.pv = 0;
    majStats();
    $("journal").innerHTML = "";
    allerA("defaite");
    return;
  }
  afficherCombat();
}

/* =====================================================
   4. ÉVÉNEMENTS (clics sur les boutons de l'accueil)
   ===================================================== */

$("btn-jouer").addEventListener("click", () => montrerEcran("classes"));

document.querySelectorAll(".classe").forEach(bouton => {
  bouton.addEventListener("click", () => demarrer(bouton.dataset.classe));
});
