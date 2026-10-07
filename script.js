/* Les Gourmands — Clan Destiny 2
   Fond étoilé animé + interactions carte céleste */

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
    const count = Math.min(420, Math.floor((w * h) / 3200));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random(),
        tw: Math.random() * 0.02 + 0.004,
        vx: Math.random() * 0.05 + 0.01
      });
    }
  }

  function spawnShootingStar() {
    shootingStar = {
      x: Math.random() * w * 0.7 + w * 0.2,
      y: Math.random() * h * 0.3,
      len: Math.random() * 80 + 60,
      speed: Math.random() * 6 + 8,
      life: 0,
      maxLife: 40
    };
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      s.a += s.tw;
      const alpha = 0.3 + Math.abs(Math.sin(s.a)) * 0.7;
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
      const grad = ctx.createLinearGradient(
        t.x, t.y,
        t.x + t.len, t.y - t.len * 0.4
      );
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
  setTimeout(spawnShootingStar, 3000);
  draw();
})();

/* ============ DONNÉES DU CLAN ============ */
const clanData = {
  terre: {
    name: "Terre — La Tour",
    tagline: "QG du clan : rendez-vous au Vendredi Festif.",
    stats: [
      ["Membres", "87 / 100"],
      ["Fondé en", "2019"],
      ["Niveau de clan", "6"],
      ["Plates-formes", "PC · PS · Xbox"]
    ],
    lead: {
      title: "Chef de clan",
      text: "RTX_Dev — Fondateur. Raids, stratégie et mauvaises blagues."
    },
    team: [
      ["Chef", "RTX_Dev"],
      ["Adjoints", "KellMilk · PandaJoueur"],
      ["Modérateurs", "Team des Croquettes"]
    ],
    event: "Dernier événement : clear complet de la Croisée du Divin en 2h07 (record du clan)."
  },
  lune: {
    name: "Lune — Donjons",
    tagline: "Les couloirs sombres, on connaît par cœur.",
    stats: [
      ["Membres actifs", "64"],
      ["Donjons GM", "12 / 12"],
      ["Seals", "9 obtenus"],
      ["Triomphe hebdo", "Fait ✓"]
    ],
    lead: {
      title: "Guide Donjons",
      text: "KellMilk — Maître des donjons solo et des exploits de saut."
    },
    team: [
      ["Lead donjons", "KellMilk"],
      ["Coaches GM", "PandaJoueur · LuneRousse"],
      ["Sherpas", "6 bénévoles"]
    ],
    event: "Dernier événement : Joug en 22:41, duo sans mort."
  },
  mars: {
    name: "Mars — Escalier martien",
    tagline: "Le farm d'xp préféré du clan (avec la musique).",
    stats: [
      ["Membres", "87 / 100"],
      ["Niveau de clan", "6"],
      ["Bonus xp", "Actif"],
      ["Réputations", "Max"]
    ],
    lead: {
      title: "Organisation",
      text: "PandaJoueur — Planificateur des soirées farm et des défis hebdo."
    },
    team: [
      ["Chef", "RTX_Dev"],
      ["Planification", "PandaJoueur"],
      ["Support", "LuneRousse"]
    ],
    event: "Dernier événement : soirée farm — 4 lvl 100 en une soirée."
  },
  jupiter: {
    name: "Jupiter — Raids",
    tagline: "Ici on mange les raids. Tous les raids. À toutes les sauces.",
    stats: [
      ["Raids complétés", "312"],
      ["Raideurs actifs", "41"],
      ["Temps moyen (Jardin)", "1h48"],
      ["Meilleur temps (DSC)", "38 min"]
    ],
    lead: {
      title: "Lead Raid",
      text: "RTX_Dev — Appelle les mécaniques, ne crie (presque) jamais."
    },
    team: [
      ["Leads raid", "RTX_Dev · KellMilk"],
      ["Sherpas raid", "8 certifiés"],
      ["Comms", "Discord obligatoire"]
    ],
    event: "Dernier événement : raid complet dimanche — 24 gardiens, 0 ragequit."
  },
  saturne: {
    name: "Saturne — Grands Prix & PvP",
    tagline: "Le crane de fortuna, c'est le terrain de jeu du samedi.",
    stats: [
      ["K/D moyen (Trials)", "1.24"],
      ["Flawless", "17 cette saison"],
      ["Lighthouse", "Oui ✓"],
      ["Iron Banner", "Top 3 clan"]
    ],
    lead: {
      title: "Lead PvP",
      text: "LuneRousse — Trials, Iron Banner et trollos en Grand Prix."
    },
    team: [
      ["Lead PvP", "LuneRousse"],
      ["Team Trials", "Fireteam A & B"],
      ["Coachs", "3 sherpas PvP"]
    ],
    event: "Dernier événement : Flawless du clan en duo + un débutant porté."
  },
  neptune: {
    name: "Neptune — Neomuna",
    tagline: "Néon, surfs et stratèges en cure d'abricot.",
    stats: [
      ["Membres", "87 / 100"],
      ["Missions Légendaire", "46"],
      ["Seals légendaires", "11"],
      ["Reprise du patch", "Fait"]
    ],
    lead: {
      title: "Stratégie",
      text: "PandaJoueur — Théorie, builds et guides du Discord."
    },
    team: [
      ["Chef", "RTX_Dev"],
      ["Théoriciens", "PandaJoueur · Team Croquettes"],
      ["Tester builds", "Ouvert à tous"]
    ],
    event: "Dernier événement : clear légendaire de la campagne en clan."
  }
};

/* ============ PANNEAU D'INFO ============ */
(function () {
  const panel = document.getElementById("infoPanel");
  const content = document.getElementById("panelContent");
  const closeBtn = document.getElementById("panelClose");

  function render(data) {
    const stats = data.stats
      .map(([l, v]) => `<div class="stat"><span class="stat-label">${l}</span><span class="stat-value">${v}</span></div>`)
      .join("");
    const team = data.team
      .map(([role, name]) => `<li><span>${name}</span><span class="role">${role}</span></li>`)
      .join("");

    content.innerHTML = `
      <h3>${data.name.replace("—", "<em>—</em>")}</h3>
      <p class="panel-tagline">${data.tagline}</p>
      <div class="stat-grid">${stats}</div>
      <div class="panel-block">
        <h4>${data.lead.title}</h4>
        <p>${data.lead.text}</p>
      </div>
      <div class="panel-block">
        <h4>Équipe</h4>
        <ul class="team-list">${team}</ul>
      </div>
      <div class="panel-block">
        <h4>Événement récent</h4>
        <p>${data.event}</p>
      </div>
      <div class="panel-actions">
        <a class="btn btn-primary" href="#rejoindre">Rejoindre</a>
        <a class="btn btn-ghost" href="https://discord.com/" target="_blank" rel="noopener">Discord</a>
      </div>
    `;
    panel.classList.add("open");
  }

  document.querySelectorAll(".planet").forEach((p) => {
    p.addEventListener("mouseenter", () => render(clanData[p.dataset.planet]));
    p.addEventListener("focus", () => render(clanData[p.dataset.planet]));
    p.addEventListener("click", (e) => {
      e.stopPropagation();
      render(clanData[p.dataset.planet]);
    });
  });

  function close() {
    panel.classList.remove("open");
  }
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  document.getElementById("spaceMap").addEventListener("click", (e) => {
    if (!e.target.closest(".planet") && !e.target.closest(".info-panel")) close();
  });
})();

/* ============ APPARITION AU SCROLL ============ */
(function () {
  const targets = document.querySelectorAll(
    ".clan-card, .event-card, .join-buttons, .section-title, .section-sub"
  );
  targets.forEach((t) => {
    t.style.opacity = "0";
    t.style.transform = "translateY(30px)";
    t.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, i * 90);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => io.observe(t));
})();
