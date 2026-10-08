// ============================================================
//  LES GOURMAND — Carte céleste interactive
// ============================================================
//  CONFIG : les planètes et leurs infos sont ci-dessous.
//  x, y    = position du marqueur en % de la carte (0 à 100)
//  rayon   = taille de la zone de survol en % de la largeur
//
//  Pour trouver les bonnes coordonnées : ouvre le site avec
//  index.html?debug puis survole la carte — la position en %
//  s'affiche en bas à gauche. Clique pour copier dans la console.
// ============================================================

const PLANETES = [
    {
        nom: "Le Tour",
        cat: "QG du clan",
        desc: "Point de ralliement des Gourmand. Échanges de loot, quêtes hebdo et pose screenshot devant le Corbeau.",
        x: 47.9, y: 47.8, rayon: 9,
        infos: [["Chef de clan", "Axel"], ["Membres", "47"], ["Discord", "ouvert"]],
        lore: "Le Tour, c'est la maison. Entre deux quêtes hebdo, on y échange du loot, on y fête les god rolls et on y fait les présentations des nouveaux. Toute l'aventure des Gourmand commence ici.",
        details: [["Membres", "47"], ["Plateformes", "PS5 / PC / Xbox"], ["Discord", "discord.gg/xxxxxx"], ["Horaires", "18h - 23h"]]
    },
    {
        nom: "Europe",
        cat: "Territoire de raid",
        desc: "Base arrière pour les raids de la semaine. On y perd notre temps, notre sommeil et parfois notre fierté.",
        x: 15.3, y: 33.3, rayon: 9,
        infos: [["Raids", "120+ clears"], ["Donjons", "Caveau de Pierre"]],
        lore: "Chaque vendredi soir, les Gourmand s'enfoncent dans le froid d'Europe. Encounters expliquées sans hurlement, mécaniques répétées jusqu'à ce que tout le monde suive — même à 1h du matin.",
        details: [["Raid du moment", "Caveau de Pierre"], ["Clears du clan", "120+"], ["Rendez-vous", "vendredi 21h"], ["Débutants", "acceptés en raid"]]
    },
    {
        nom: "Lune",
        cat: "Zone PvP",
        desc: "Le stomping ground des Gourmand en Survie. Entrer en criant, sortir en silence.",
        x: 75.2, y: 34.0, rayon: 9,
        infos: [["Survie", "Platine III"], ["Fer de lance", "chaque semaine"]],
        lore: "La Lune, c'est là où les Gourmand réglent leurs comptes — avec l'arène adverse. Survie en équipe organisée, Fer de lance du mardi, et un tournoi interne quand l'ambiance devient trop sage.",
        details: [["Mode principal", "Survie"], ["Rang actuel", "Platine III"], ["Fer de lance", "chaque mardi"], ["Tournoi interne", "1 fois par mois"]]
    },
    {
        nom: "Nessos",
        cat: "Terrain de chasse",
        desc: "Chasse au god roll entre les Vex. Celui qui trouve un fusil parfait ici ne le prête jamais.",
        x: 10.4, y: 70.5, rayon: 9,
        infos: [["Fermes", "le vendredi soir"], ["Butin", "partagé"]],
        lore: "Les oranges de Nessos ont une réputation, et les Gourmand la connaissent par coeur. Fermes du vendredi soir, café obligatoire, et règle du clan : ce qui se farme ici se partage — sauf les god rolls, évidemment.",
        details: [["Activité", "fermes du vendredi"], ["Cible", "les oranges"], ["Butin", "partagé"], ["Café", "obligatoire"]]
    },
    {
        nom: "Cosmodrome",
        cat: "Terrain d'entraînement",
        desc: "Là où tout nouveau Gourmand fait ses preuves. Patrouilles, secteurs perdus et initiation au clan.",
        x: 47.5, y: 82.5, rayon: 9,
        infos: [["Nouveaux", "accueillis ici"], ["Secteurs perdus", "quotidien"]],
        lore: "Les murs de l'ancienne Russie ont vu passer chaque génération de Gourmand. C'est ici qu'un mentor est assigné à chaque nouveau venu, et que les vieux de la vieille racontent la légende du premier wipe du clan.",
        details: [["Nouveaux", "accompagnés par un mentor"], ["Secteur perdu", "quotidien"], ["Patrouille", "libre"], ["Legendes du clan", "2 ou 3, à vérifier"]]
    },
    {
        nom: "Éternité",
        cat: "Lieu secret",
        desc: "L'endroit où les Gourmand se retrouvent quand le Voyageur a besoin d'eux. Chut, c'est un secret.",
        x: 69.2, y: 57.3, rayon: 9,
        infos: [["Accès", "sur invitation"], ["Règle d'or", "manger avant de venir"]],
        lore: "On ne parle pas de l'Éternité. On n'explique pas pourquoi les Gourmand en reviennent toujours plus lourds qu'en partant. On dit juste qu'ici, le mot « gourmand » a pris tout son sens.",
        details: [["Accès", "sur invitation uniquement"], ["Règle n°1", "apporter à manger"], ["Règle n°2", "il n'y a pas de règle n°2"], ["On en revient", "toujours"]]
    }
];

// ============================================================
//  Écran de chargement
// ============================================================

const MIN_LOAD_MS = 2600;
const loadStart = Date.now();

const loadingEl = document.getElementById("loading");
const appEl = document.getElementById("app");
const fillEl = document.getElementById("loadFill");
const statusEl = document.getElementById("loadStatus");

const ETAPES = [
    "Connexion au Voyageur...",
    "Réveil du Voyageur...",
    "Chargement de la carte céleste...",
    "Réunions des Gourmand...",
    "Prêt."
];

let progress = 0;
const tick = setInterval(() => {
    progress = Math.min(progress + Math.random() * 12, 100);
    fillEl.style.width = progress + "%";
    const idx = Math.min(Math.floor(progress / 25), ETAPES.length - 1);
    statusEl.textContent = ETAPES[idx];
    if (progress >= 100) clearInterval(tick);
}, 180);

function enterSite() {
    const elapsed = Date.now() - loadStart;
    const wait = Math.max(0, MIN_LOAD_MS - elapsed);
    setTimeout(() => {
        loadingEl.classList.add("done");
        appEl.classList.remove("hidden");
        appEl.setAttribute("aria-hidden", "false");
    }, wait);
}

window.addEventListener("load", enterSite);
// Filet de sécurité : si l'image met trop de temps, on entre quand même
setTimeout(enterSite, 8000);

// ============================================================
//  Carte interactive
// ============================================================

const frame = document.getElementById("mapFrame");
const panel = document.getElementById("panel");
const panelName = document.getElementById("panelName");
const panelCat = document.getElementById("panelCat");
const panelDesc = document.getElementById("panelDesc");
const panelStats = document.getElementById("panelStats");
const markerLayer = document.getElementById("markers");
const reticle = document.getElementById("reticle");

// Affiche le réticule (rond jaune style Destiny 2) autour d'une planète
function showReticle(p) {
    const size = Math.max(80, Math.min((p.rayon / 100) * frame.clientWidth * 2, 170));
    reticle.style.width = size + "px";
    reticle.style.height = size + "px";
    reticle.style.left = p.x + "%";
    reticle.style.top = p.y + "%";
    reticle.classList.add("on");
}

function hideReticle() {
    reticle.classList.remove("on");
}

// Création des marqueurs
const markerEls = PLANETES.map((p) => {
    const el = document.createElement("div");
    el.className = "marker";
    el.style.left = p.x + "%";
    el.style.top = p.y + "%";
    markerLayer.appendChild(el);
    return el;
});

let activeIndex = -1;

function showPanel(p, px, py) {
    panelName.textContent = p.nom;
    panelCat.textContent = p.cat;
    panelDesc.textContent = p.desc;
    panelStats.innerHTML = p.infos
        .map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`)
        .join("");
    panel.classList.add("visible");
    panel.setAttribute("aria-hidden", "false");
    positionPanel(px, py);
}

function positionPanel(px, py) {
    const fw = frame.clientWidth;
    const fh = frame.clientHeight;
    const pw = panel.offsetWidth;
    const ph = panel.offsetHeight;
    const M = 12; // marge avec les bords

    // Panneau à droite du curseur, bascule à gauche si ça déborde
    let left = px + 24;
    if (left + pw + M > fw) left = px - pw - 24;

    // Verticalement centré sur le curseur, borné aux bords
    let top = py - ph / 2;
    top = Math.max(M, Math.min(top, fh - ph - M));

    panel.style.left = left + "px";
    panel.style.top = top + "px";
}

function hidePanel() {
    panel.classList.remove("visible");
    panel.setAttribute("aria-hidden", "true");
    hideReticle();
    if (activeIndex !== -1) {
        markerEls[activeIndex].classList.remove("active");
        activeIndex = -1;
    }
}

// Trouve la planète survolée (zone circulaire autour du marqueur)
function findPlanet(px, py) {
    const fw = frame.clientWidth;
    const fh = frame.clientHeight;
    let best = -1;
    let bestDist = Infinity;
    for (let i = 0; i < PLANETES.length; i++) {
        const p = PLANETES[i];
        const ddx = px - (p.x / 100) * fw;
        const ddy = py - (p.y / 100) * fh;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        const maxDist = (p.rayon / 100) * fw;
        if (dist <= maxDist && dist < bestDist) {
            best = i;
            bestDist = dist;
        }
    }
    return best;
}

// ============================================================
//  Panneau latéral (clic sur une planète)
// ============================================================

const sidePanel = document.getElementById("sidePanel");
const sideClose = document.getElementById("sideClose");
const sideName = document.getElementById("sideName");
const sideCat = document.getElementById("sideCat");
const sideLore = document.getElementById("sideLore");
const sideDetails = document.getElementById("sideDetails");

let sideOpen = false;

function openSidePanel(p) {
    sideName.textContent = p.nom;
    sideCat.textContent = p.cat;
    sideLore.textContent = p.lore;
    sideDetails.innerHTML = p.details
        .map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`)
        .join("");
    sidePanel.classList.add("open");
    sidePanel.setAttribute("aria-hidden", "false");
    sideOpen = true;
    hidePanel(); // on masque le petit panneau de survol
}

function closeSidePanel() {
    sidePanel.classList.remove("open");
    sidePanel.setAttribute("aria-hidden", "true");
    sideOpen = false;
}

sideClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeSidePanel();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidePanel();
});

// Clic sur la carte : ouvre le panneau latéral si on est sur une
// planète, le ferme sinon
frame.addEventListener("click", (e) => {
    const rect = frame.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const idx = findPlanet(px, py);
    if (idx !== -1) {
        openSidePanel(PLANETES[idx]);
    } else if (sideOpen) {
        closeSidePanel();
    }
});

frame.addEventListener("mousemove", (e) => {
    const rect = frame.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Mode calibrage
    if (debugMode) updateDebug(px, py);

    // Le petit panneau de survol ne s'affiche pas
    // quand le panneau latéral est ouvert
    if (sideOpen) {
        hidePanel();
        return;
    }

    const idx = findPlanet(px, py);
    if (idx !== -1) {
        if (idx !== activeIndex) {
            if (activeIndex !== -1) markerEls[activeIndex].classList.remove("active");
            activeIndex = idx;
            markerEls[idx].classList.add("active");
            showReticle(PLANETES[idx]);
        }
        showPanel(PLANETES[idx], px, py);
    } else {
        hidePanel();
    }
});

frame.addEventListener("mouseleave", hidePanel);

// Tactile : un appui sur une planète ouvre le panneau latéral,
// un appui ailleurs le ferme
frame.addEventListener("touchstart", (e) => {
    const rect = frame.getBoundingClientRect();
    const t = e.touches[0];
    const px = t.clientX - rect.left;
    const py = t.clientY - rect.top;
    const idx = findPlanet(px, py);
    if (idx !== -1) {
        openSidePanel(PLANETES[idx]);
    } else if (sideOpen) {
        closeSidePanel();
    }
});

// ============================================================
//  Mode calibrage : index.html?debug
// ============================================================

const debugMode = new URLSearchParams(location.search).has("debug");
const debugEl = document.getElementById("debugInfo");

function updateDebug(px, py) {
    const fw = frame.clientWidth;
    const fh = frame.clientHeight;
    debugEl.textContent = `x: ${(px / fw * 100).toFixed(1)}%  y: ${(py / fh * 100).toFixed(1)}%  (clic pour copier)`;
    debugEl.classList.remove("hidden");
}

if (debugMode) {
    frame.addEventListener("click", (e) => {
        const rect = frame.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / frame.clientWidth * 100).toFixed(1);
        const y = ((e.clientY - rect.top) / frame.clientHeight * 100).toFixed(1);
        const coords = `x: ${x}, y: ${y}`;
        navigator.clipboard?.writeText(coords);
        console.log("Coordonnées cliquées → " + coords);
    });
}
