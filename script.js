/* ============================================================
   LES GOURMANDS — Carte céleste façon Directeur Destiny 2
   Étoiles animées, intro, cartes de destination au survol
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
    stats: [
      ["Membres", "87 / 100"],
      ["Plateformes", "PC · PS · Xbox"],
      ["Niveau de clan", "6"],
      ["Fondé en", "2019"]
    ],
    lead: "RTX_Dev",
    leadRole: "Chef de clan — Fondateur et chef du clan. Stratège des raids, fournisseur officiel de mauvaises blagues.",
    team: [
      ["KellMilk", "Adjointe"],
      ["PandaJoueur", "Adjoint"],
      ["Team Croquettes", "Modérateurs"]
    ],
    event: "Remise des récompenses de clan — saison bouclée, 87 gourmands servis."
  },
  lune: {
    stats: [
      ["Membres actifs", "64"],
      ["Donjons GM", "12 / 12"],
      ["Seals obtenus", "9"],
      ["Sherpas", "6 bénévoles"]
    ],
    lead: "KellMilk",
    leadRole: "Guide Donjons — Adjointe et maîtresse des donjons solo. Connaît les exploits de saut mieux que sa propre maison.",
    team: [
      ["PandaJoueur", "Coach GM"],
      ["LuneRousse", "Coach GM"]
    ],
    event: "Joug de Kharg-Bak en 22:41 — duo, sans mort, sans pause café."
  },
  mars: {
    stats: [
      ["Membres", "87 / 100"],
      ["Bonus XP", "Actif"],
      ["Réputations", "Max"],
      ["Sessions farm", "Hebdo"]
    ],
    lead: "PandaJoueur",
    leadRole: "Organisation — Adjoint et planificateur des soirées farm, défis hebdo et grands débats sur les builds.",
    team: [
      ["RTX_Dev", "Support"],
      ["LuneRousse", "Support"]
    ],
    event: "Soirée farm — 4 gardiens passés niveau 100 en une seule soirée."
  },
  io: {
    stats: [
      ["Membres", "87 / 100"],
      ["Niveau de clan", "6"],
      ["Missions légendaires", "46"],
      ["Seals légendaires", "11"]
    ],
    lead: "PandaJoueur",
    leadRole: "Stratégie — Théoricien en chef : builds, guides et rotations documentés sur le Discord du clan.",
    team: [
      ["Team Croquettes", "Testeurs"],
      ["Tous les membres", "Cobayes volontaires"]
    ],
    event: "Clear légendaire de la campagne en clan — 46 missions signées."
  },
  jupiter: {
    stats: [
      ["Raids complétés", "312"],
      ["Raideurs actifs", "41"],
      ["Meilleur DSC", "38 min"],
      ["Temps moyen JdV", "1h48"]
    ],
    lead: "RTX_Dev",
    leadRole: "Lead Raid — Appelle les mécaniques, ne crie (presque) jamais, et refuse d'abandonner un run.",
    team: [
      ["KellMilk", "Lead raid"],
      ["8 sherpas", "Certifiés"],
      ["Discord", "Comms obligatoires"]
    ],
    event: "Raid complet du dimanche — 24 gardiens, 0 ragequit, record du clan battu."
  },
  europa: {
    stats: [
      ["Membres actifs", "64"],
      ["Jugement de Vex", "Clear hebdo"],
      ["GM Europa", "3 / 3"],
      ["Seals glace", "4"]
    ],
    lead: "KellMilk",
    leadRole: "Épreuves Vex — Référence sur le Jugement de Vex et les strats GM glacées du clan.",
    team: [
      ["LuneRousse", "Coach GM"],
      ["4 membres", "Équipe glace"]
    ],
    event: "Jugement de Vex en 19:32 — top 8% du leaderboard clan."
  },
  saturne: {
    stats: [
      ["K/D moyen Trials", "1.24"],
      ["Flawless saison", "17"],
      ["Lighthouse", "Oui ✓"],
      ["Iron Banner", "Top 3 clan"]
    ],
    lead: "LuneRousse",
    leadRole: "Lead PvP — Modératrice PvP : Trials, Iron Banner et trollos en Grand Prix inclus.",
    team: [
      ["Fireteam A", "Trials"],
      ["Fireteam B", "Trials"],
      ["3 sherpas", "Coachs PvP"]
    ],
    event: "Flawless du clan en duo — avec un débutant porté jusqu'au Lighthouse."
  },
  neptune: {
    stats: [
      ["Membres", "87 / 100"],
      ["Campagne légendaire", "Clear"],
      ["Missions Neomuna", "46"],
      ["Surf record", "Un mile"]
    ],
    lead: "PandaJoueur",
    leadRole: "Stratégie — Guides Neomuna, builds arc et théorie du one-two punch.",
    team: [
      ["Team Croquettes", "Builds"],
      ["Tous", "Tests ouverts"]
    ],
    event: "Clear légendaire de la campagne de Léviathan cérébral — en clan, évidemment."
  },
  rivage: {
    stats: [
      ["Membres", "87 / 100"],
      ["Éclats collectés", "2 340"],
      ["Whispers", "Tous trouvés"],
      ["Lore lu", "60%"]
    ],
    lead: "Team Croquettes",
    leadRole: "Lore & Exploration — Modérateurs et archivistes : chaque whispers, chaque éclat, chaque morceau de lore est documenté.",
    team: [
      ["RTX_Dev", "Chef de clan"],
      ["Tous", "Explorateurs"]
    ],
    event: "Chasse aux éclats de la semaine — 2 340 éclats collectés en une soirée."
  }
};

/* ============ RENDU DES CARTES ============ */
(function () {
  const hint = document.getElementById("mapHint");
  let hintDimmed = false;

  document.querySelectorAll(".dest-details").forEach((el) => {
    const d = clanData[el.dataset.details];
    if (!d) return;

    const rows = d.stats
      .map(([l, v]) => `<div class="detail-row"><span class="detail-label">${l}</span><span class="detail-value">${v}</span></div>`)
      .join("");
    const team = d.team
      .map(([name, role]) => `${name}<span>${role}</span>`)
      .join(" · ");

    el.innerHTML = `
      <div>
        ${rows}
        <p class="detail-lead"><strong>${d.lead}</strong> — ${d.leadRole}</p>
        <p class="detail-team">${team}</p>
        <p class="detail-event">${d.event}</p>
      </div>
    `;
  });

  document.querySelectorAll(".dest").forEach((dest) => {
    dest.addEventListener("mouseenter", () => {
      if (!hintDimmed) {
        hint.classList.add("dim");
        hintDimmed = true;
      }
    });
  });
})();
