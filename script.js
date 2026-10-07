/* ============================================================
   LES GOURMANDS — Carte céleste Destiny 2
   Étoiles animées, étoiles filantes, panneau clan, interactions
   ============================================================ */

/* ============ CHAMP D'ÉTOILES ============ */
(function () {
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let shootingStar = null;
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = [];
    const count = Math.min(520, Math.floor((w * h) / 2600));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.2,
        a: Math.random() * Math.PI * 2,
        tw: Math.random() * 0.02 + 0.004,
        vx: Math.random() * 0.05 + 0.01
      });
    }
  }

  function spawnShootingStar() {
    shootingStar = {
      x: Math.random() * w * 0.7 + w * 0.25,
      y: Math.random() * h * 0.35,
      len: Math.random() * 90 + 70,
      speed: Math.random() * 6 + 8,
      life: 0,
      maxLife: 42
    };
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      s.a += s.tw;
      const alpha = 0.25 + Math.abs(Math.sin(s.a)) * 0.75;
      s.x -= s.vx;
      if (s.x < -2) s.x = w + 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
      ctx.fill();
    }

    if (shootingStar) {
      const t = shootingStar;
      t.x -= t.speed;
      t.y += t.speed * 0.4;
      t.life++;
      const fade = 1 - t.life / t.maxLife;
      const grad = ctx.createLinearGradient(t.x, t.y, t.x + t.len, t.y - t.len * 0.4);
      grad.addColorStop(0, `rgba(255,255,255,${0.8 * fade})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(t.x, t.y);
      ctx.lineTo(t.x + t.len, t.y - t.len * 0.4);
      ctx.stroke();
      if (t.life > t.maxLife || t.x < -t.len) {
        shootingStar = null;
        setTimeout(spawnShootingStar, Math.random() * 9000 + 4000);
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  setTimeout(spawnShootingStar, 3500);
  draw();
})();

/* ============ INTRO ============ */
(function () {
  const intro = document.getElementById("intro");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    intro.classList.add("hidden");
  } else {
    setTimeout(() => intro.classList.add("hidden"), 4200);
  }
})();

/* ============ DONNÉES DU CLAN ============ */
const clanData = {
  terre: {
    system: "Système Terre · QG du clan",
    name: "La Tour",
    tagline: "Le point de ralliement des Gourmands : le Vendredi Festif y est une institution.",
    stats: [
      ["Membres", "87 / 100"],
      ["Plateformes", "PC · PS · Xbox"],
      ["Niveau de clan", "6"],
      ["Fondé en", "2019"]
    ],
    lead: {
      title: "Chef de clan",
      text: "RTX_Dev — Fondateur et chef du clan. Stratège des raids, fournisseur officiel de mauvaises blagues."
    },
    team: [
      ["RTX_Dev", "Chef de clan"],
      ["KellMilk", "Adjoint"],
      ["PandaJoueur", "Adjoint"],
      ["Team Croquettes", "Modérateurs"]
    ],
    event: "Dernier événement : remise des récompenses de clan — saison bouclée, 87 gourmands servis."
  },
  lune: {
    system: "Système Terre · Sanctum",
    name: "La Lune",
    tagline: "Les donjons sombres, on les connaît par cœur — et parfois en solo.",
    stats: [
      ["Membres actifs", "64"],
      ["Donjons GM", "12 / 12"],
      ["Seals obtenus", "9"],
      ["Sherpas", "6 bénévoles"]
    ],
    lead: {
      title: "Guide Donjons",
      text: "KellMilk — Adjoint et maître des donjons solo. Connaît les exploits de saut mieux que sa propre maison."
    },
    team: [
      ["KellMilk", "Lead donjons"],
      ["PandaJoueur", "Coach GM"],
      ["LuneRousse", "Coach GM"]
    ],
    event: "Dernier événement : Joug de Kharg-Bak en 22:41 — duo, sans mort, sans pause café."
  },
  mars: {
    system: "Système Martien · Escalier",
    name: "Mars",
    tagline: "Le farm d'XP préféré du clan — avec la musique de l'Escalier en boucle.",
    stats: [
      ["Membres", "87 / 100"],
      ["Bonus XP", "Actif"],
      ["Réputations", "Max"],
      ["Sessions farm", "Hebdo"]
    ],
    lead: {
      title: "Organisation",
      text: "PandaJoueur — Adjoint et planificateur des soirées farm, défis hebdo et grands débats sur les builds."
    },
    team: [
      ["PandaJoueur", "Planification"],
      ["RTX_Dev", "Support"],
      ["LuneRousse", "Support"]
    ],
    event: "Dernier événement : soirée farm — 4 gardiens passés niveau 100 en une seule soirée."
  },
  io: {
    system: "Système Jovien · Pyramide",
    name: "Io",
    tagline: "Là où l'on teste les stratégies tordues avant de les imposer au reste du clan.",
    stats: [
      ["Membres", "87 / 100"],
      ["Niveau de clan", "6"],
      ["Missions légendaires", "46"],
      ["Seals légendaires", "11"]
    ],
    lead: {
      title: "Stratégie",
      text: "PandaJoueur — Théoricien en chef : builds, guides et rotations documentés sur le Discord du clan."
    },
    team: [
      ["PandaJoueur", "Théorie & builds"],
      ["Team Croquettes", "Testeurs"],
      ["Tous les membres", "Cobayes volontaires"]
    ],
    event: "Dernier événement : clear légendaire de la campagne en clan — 46 missions signées."
  },
  jupiter: {
    system: "Système Jovien · Ceinture",
    name: "Jupiter",
    tagline: "Ici, on mange les raids. Tous les raids. À toutes les sauces.",
    stats: [
      ["Raids complétés", "312"],
      ["Raideurs actifs", "41"],
      ["Meilleur DSC", "38 min"],
      ["Temps moyen JdV", "1h48"]
    ],
    lead: {
      title: "Lead Raid",
      text: "RTX_Dev — Appelle les mécaniques, ne crie (presque) jamais, et refuse d'abandonner un run."
    },
    team: [
      ["RTX_Dev", "Lead raid"],
      ["KellMilk", "Lead raid"],
      ["8 sherpas", "Certifiés"],
      ["Discord", "Comms obligatoires"]
    ],
    event: "Dernier événement : raid complet du dimanche — 24 gardiens, 0 ragequit, record du clan battu."
  },
  europa: {
    system: "Système Jovien · Europa",
    name: "Europa",
    tagline: "La glace, le Jugement de Vex et les builds qui brisent la game.",
    stats: [
      ["Membres actifs", "64"],
      ["Jugement de Vex", "Clear hebdo"],
      ["GM Europa", "3 / 3"],
      ["Séals glace", "4"]
    ],
    lead: {
      title: "Épreuves Vex",
      text: "KellMilk — Référence sur le Jugement de Vex et les strats GM glacées du clan."
    },
    team: [
      ["KellMilk", "Lead Vex"],
      ["LuneRousse", "Coach GM"],
      ["4 membres", "Équipe glace"]
    ],
    event: "Dernier événement : Jugement de Vex en 19:32 — top 8% du leaderboard clan."
  },
  saturne: {
    system: "Système Saturnien · Fortuna",
    name: "Saturne",
    tagline: "Le crâne de Fortuna, terrain de jeu officiel des soirées PvP du clan.",
    stats: [
      ["K/D moyen Trials", "1.24"],
      ["Flawless saison", "17"],
      ["Lighthouse", "Oui ✓"],
      ["Iron Banner", "Top 3 clan"]
    ],
    lead: {
      title: "Lead PvP",
      text: "LuneRousse — Moderatrice PvP : Trials, Iron Banner et trollos en Grand Prix inclus."
    },
    team: [
      ["LuneRousse", "Lead PvP"],
      ["Fireteam A", "Trials"],
      ["Fireteam B", "Trials"],
      ["3 sherpas", "Coachs PvP"]
    ],
    event: "Dernier événement : Flawless du clan en duo — avec un débutant porté jusqu'au Lighthouse."
  },
  neptune: {
    system: "Système Neptunien · Neomuna",
    name: "Neptune",
    tagline: "Néon, surfs et stratèges en cure d'abricot — le futur, mais en mieux.",
    stats: [
      ["Membres", "87 / 100"],
      ["Campagne légendaire", "Clear"],
      ["Missions Neomuna", "46"],
      ["Surf record", "Un mile"]
    ],
    lead: {
      title: "Stratégie",
      text: "PandaJoueur — Guides Neomuna, builds arc et théorie du one-two punch."
    },
    team: [
      ["PandaJoueur", "Théoricien"],
      ["Team Croquettes", "Builds"],
      ["Tous", "Tests ouverts"]
    ],
    event: "Dernier événement : clear légendaire de la campagne de Léviathan cérébral — en clan, évidemment."
  },
  rivage: {
    system: "Régalia brisé · Distributions",
    name: "Rivage brisé",
    tagline: "Les éclats, le lore et les soirées exploration à la recherche de whispers.",
    stats: [
      ["Membres", "87 / 100"],
      ["Éclats collectés", "2 340"],
      ["Whispers", "Tous trouvés"],
      ["Lore lu", "60%"]
    ],
    lead: {
      title: "Lore & Exploration",
      text: "Team Croquettes — Modérateurs et archivistes du clan : chaque whispers, chaque éclat, chaque morceau de lore est documenté."
    },
    team: [
      ["Team Croquettes", "Archivistes"],
      ["RTX_Dev", "Chef de clan"],
      ["Tous", "Explorateurs"]
    ],
    event: "Dernier événement : chasse aux éclats de la semaine — 2 340 éclats collectés en une soirée."
  }
};

/* ============ PANNEAU & INTERACTIONS ============ */
(function () {
  const panel = document.getElementById("clanPanel");
  const content = document.getElementById("panelContent");
  const closeBtn = document.getElementById("panelClose");
  const hint = document.getElementById("mapHint");
  let hintDimmed = false;

  function render(key) {
    const d = clanData[key];
    if (!d) return;

    const stats = d.stats
      .map(([l, v]) => `<div class="stat"><span class="stat-label">${l}</span><span class="stat-value">${v}</span></div>`)
      .join("");
    const team = d.team
      .map(([name, role]) => `<li><span>${name}</span><span class="role">${role}</span></li>`)
      .join("");

    content.innerHTML = `
      <p class="panel-system">${d.system}</p>
      <h3>${d.name}</h3>
      <p class="panel-tagline">${d.tagline}</p>
      <div class="stat-grid">${stats}</div>
      <div class="panel-block">
        <h4>${d.lead.title}</h4>
        <p>${d.lead.text}</p>
      </div>
      <div class="panel-block">
        <h4>Équipe</h4>
        <ul class="team-list">${team}</ul>
      </div>
      <div class="panel-block">
        <h4>Événement récent</h4>
        <p>${d.event}</p>
      </div>
    `;
    panel.classList.add("open");

    if (!hintDimmed) {
      hint.classList.add("dim");
      hintDimmed = true;
    }
  }

  function close() {
    panel.classList.remove("open");
  }

  let leaveTimer = null;

  document.querySelectorAll(".planet").forEach((p) => {
    p.addEventListener("mouseenter", () => {
      if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
      render(p.dataset.planet);
    });
    p.addEventListener("mouseleave", () => {
      leaveTimer = setTimeout(close, 180);
    });
    p.addEventListener("focus", () => render(p.dataset.planet));
    p.addEventListener("click", (e) => {
      e.stopPropagation();
      render(p.dataset.planet);
    });
  });

  panel.addEventListener("mouseenter", () => {
    if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
  });
  panel.addEventListener("mouseleave", () => {
    if (panel.classList.contains("open")) close();
  });

  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  document.getElementById("spaceMap").addEventListener("click", (e) => {
    if (!e.target.closest(".planet") && !e.target.closest(".clan-panel")) close();
  });
})();
