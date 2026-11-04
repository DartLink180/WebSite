const app = document.querySelector("#app");
const managerUrl = "https://dartlink.fr/manager/";
const remoteUrl = "https://dartlink.fr/remote/";
const mobileUrl = "https://dartlink.fr/mobile/";
// Original logos supplied in screenshots/; published unchanged from public/brand/.
const arrowIcon = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>`;
const menuIcon = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
const brandAssets = {
  wordmark: "brand/wordmark.png",
  signature: "brand/signature.png",
  mark: "brand/mark.png",
};

function logo(variant = "wordmark") {
  const source = brandAssets[variant];
  return source
    ? `<img class="brand-image brand-${variant}" src="${source}" alt="DartLink" ${variant === "signature" ? 'width="640" height="640"' : ""}>`
    : `<span class="brand-fallback ${variant === "signature" ? "brand-large" : ""}">Dart<span>Link</span></span>`;
}
function button(label, href, secondary = false, newTab = false) {
  return `<a class="button ${secondary ? "button-secondary" : ""}" href="${href}" ${newTab ? `target="_blank" rel="noopener noreferrer" aria-label="${label} (nouvel onglet)"` : ""}>${label}<span aria-hidden="true">${arrowIcon}</span></a>`;
}
const navItems = [
  ["experience", "L’expérience"],
  ["competitions", "Compétitions"],
  ["faq", "Questions fréquentes"],
  ["contact", "Contact"],
];
function shell(content, current = "") {
  return `<a class="skip-link" href="#main">Aller au contenu</a>
    <header class="site-header"><div class="container header-inner">
      <a class="brand" href="#/" aria-label="DartLink — accueil">${logo()}</a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menu <span aria-hidden="true">${menuIcon}</span></button>
      <nav id="main-nav" aria-label="Navigation principale">${navItems.map(([path, label]) => `<a href="#/${path}" ${path === current ? 'aria-current="page"' : ""}>${label}</a>`).join("")}<a href="${remoteUrl}" target="_blank" rel="noopener noreferrer" aria-label="Télécommande (nouvel onglet)">Télécommande</a><a href="${mobileUrl}" target="_blank" rel="noopener noreferrer" aria-label="Jouer sur mobile (nouvel onglet)">Jouer sur mobile</a>${button("Ouvrir le Manager", managerUrl, false, true)}</nav>
    </div></header>
    <main id="main" tabindex="-1">${content}</main>
    <footer class="site-footer container"><div class="footer-main"><a class="brand" href="#/" aria-label="DartLink — accueil">${logo()}</a><p>La passion du jeu.<br>L’esprit connecté.</p></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} DartLink</span><span>Imaginé pour les passionnés de fléchettes.</span><a href="#/mentions">Informations & confidentialité</a></div></footer>`;
}
const features = [
  [
    "01",
    "Le jeu, au premier plan.",
    "Une interface dédiée aux fléchettes, pour choisir votre mode et garder le fil de la partie.",
  ],
  [
    "02",
    "Une installation à vous.",
    "Un écosystème autour du Raspberry Pi, pensé pour accompagner votre espace de jeu.",
  ],
  [
    "03",
    "Votre partie, à portée de main.",
    "DartLink Remote rassemble les commandes du jeu et les noms des joueurs dans une télécommande locale.",
  ],
];
function featureCards() {
  return `<div class="feature-grid">${features.map(([number, title, text]) => `<article class="feature-card"><span class="card-number">${number} <span aria-hidden="true">${arrowIcon}</span></span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>`;
}
function home() {
  return shell(`<section class="hero container"><div class="hero-copy"><span class="eyebrow"><span class="status-dot"></span> FLÉCHETTES · PASSION · CONNEXION</span><h1>Le jeu nous<br><em>connecte.</em></h1><p>Le plaisir d’un beau lancer. L’envie de rejouer ensemble. Découvrez DartLink, l’écosystème qui accompagne votre passion des fléchettes.</p><div class="actions">${button("Découvrir l’expérience", "#/experience")}${button("Ouvrir DartLink Remote", remoteUrl, true, true)}${button("Jouer sur mobile", mobileUrl, true, true)}</div><div class="hero-note"><span class="note-line"></span>Du premier lancer à la prochaine partie.</div></div><div class="hero-visual"><span class="visual-label">DARTLINK / L’ESPRIT DU JEU</span><div class="signature">${logo("signature")}</div><div class="visual-caption"><span class="status-dot"></span> La précision rassemble.<span aria-hidden="true">${arrowIcon}</span></div></div></section>
    <section class="principles container" aria-label="L’esprit DartLink"><span>01 <strong>Jouer.</strong></span><span>02 <strong>Connecter.</strong></span><span>03 <strong>Partager.</strong></span><p>Votre cible.<br>Tout un univers autour.</p></section>
    <section class="section container"><div class="section-heading"><div><span class="eyebrow">Pensé autour de votre passion</span><h2>Plus qu’une cible.<br>Une expérience commune.</h2></div><p>La cible, le jeu, la télécommande :<br>tout pour partager la partie.</p></div>${featureCards()}</section>
    <section class="game-section container"><div class="game-copy"><span class="eyebrow">À vous de jouer</span><h2>Choisissez votre jeu.<br>Trouvez votre rythme.</h2><p>Huit familles de modes, de X01 au Tournoi : explorez les écrans de DartLink et imaginez votre prochaine partie.</p><a class="text-link" href="#/experience">Voir les modes de jeu <span aria-hidden="true">${arrowIcon}</span></a></div><figure class="game-preview"><div class="window-bar"><span><i></i><i></i><i></i></span><span>DARTLINK / LE JEU</span><span aria-hidden="true">${arrowIcon}</span></div><img src="screenshots/menu.PNG" alt="Menu de DartLink avec choix des joueurs, du mode et des options" width="1292" height="1304" loading="lazy"><figcaption>Un aperçu de l’interface de jeu.</figcaption></figure></section>
    <section class="closing container"><div><span class="eyebrow">La prochaine partie commence ici</span><h2>On se retrouve<br>autour de la cible ?</h2></div>${button("En savoir plus", "#/faq")}</section>`);
}
const gameScreens = [
  ["X01.PNG", "X01 · début", "La partie à 301 points démarre à quatre joueurs.", "Écran de début de partie X01 301 à quatre joueurs"],
  ["X012.PNG", "X01 · en cours", "Scores, lancers et dépassement pendant une partie.", "Partie X01 301 en cours avec quatre joueurs et un dépassement"],
  ["X01IA.PNG", "X01 IA", "Affrontez l’ordinateur sur une partie de 301.", "Écran X01 301 contre l’ordinateur"],
  ["cricket.PNG", "Cricket · début", "Les numéros et les points des quatre joueurs.", "Tableau Cricket Cut-Throat au début d’une partie à quatre joueurs"],
  ["cricket2.PNG", "Cricket · en cours", "Les marques et pénalités se lisent d’un coup d’œil.", "Tableau Cricket Cut-Throat avec marques et points en cours de partie"],
  ["course300.PNG", "Course 300 · départ", "Une piste commune jusqu’aux 300 points.", "Course 300 au départ avec quatre joueurs"],
  ["course3002.PNG", "Course 300 · en cours", "Suivez la progression de chaque joueur.", "Course 300 avec quatre joueurs à différents niveaux de progression"],
  ["course10.PNG", "Course · 10 tours", "Allez le plus loin possible en dix tours.", "Course en dix tours avec quatre joueurs au départ"],
  ["arroundtheworld.PNG", "Around the World", "Parcourez les numéros de la cible dans l’ordre.", "Écran Around the World avec numéro 1 à toucher"],
  ["ciblesaleatoire.PNG", "Cible aléatoire", "Une nouvelle cible apparaît à chaque étape.", "Écran Cible aléatoire avec le numéro 3 à toucher"],
  ["killer.PNG", "Killer · début", "Chaque joueur reçoit un numéro et trois vies.", "Écran Killer avec quatre joueurs et leurs vies au début"],
  ["killer2.PNG", "Killer · en cours", "Survie, élimination et joueur actif sont visibles.", "Écran Killer avec joueur en survie et joueur éliminé"],
  ["tournoi.PNG", "Tournoi · tableau", "Suivez les tours jusqu’à la finale.", "Tableau de tournoi à seize joueurs avant la finale"],
  ["tournoi2.PNG", "Tournoi · finale", "Le gagnant de la finale est annoncé.", "Écran annonçant le gagnant de la finale du tournoi"],
  ["tourjoi3.PNG", "Tournoi · classement", "Retrouvez le classement final des joueurs.", "Classement final d’un tournoi de seize joueurs"],
  ["menu.PNG", "Menu du jeu", "Choisissez les joueurs, le mode et les options.", "Menu de DartLink avec choix des joueurs, du mode et des options"],
];
const remoteScreens = [
  ["remote1.PNG", "Remote · accueil", "Accédez aux commandes et aux joueurs.", "Accueil de DartLink Remote avec accès à la télécommande et aux joueurs"],
  ["remote2.PNG", "Remote · commandes", "Les actions de la partie depuis la télécommande.", "Commandes de menu dans DartLink Remote"],
  ["remote3.PNG", "Remote · joueurs", "Renseignez les noms des joueurs.", "Écran de saisie des noms des joueurs dans DartLink Remote"],
];
const gameGroups = [
  ["menu", "Menu", [gameScreens[15]]],
  ["x01", "X01", gameScreens.slice(0, 2)],
  ["x01-ia", "X01 IA", [gameScreens[2]]],
  ["cricket", "Cricket", gameScreens.slice(3, 5)],
  ["course", "Course", gameScreens.slice(5, 8)],
  ["around-world", "Around the World", [gameScreens[8]]],
  ["cible-aleatoire", "Cible aléatoire", [gameScreens[9]]],
  ["killer", "Killer", gameScreens.slice(10, 12)],
  ["tournoi", "Tournoi", gameScreens.slice(12, 15)],
];
function screenCards(screens, group) {
  return screens.map(([file, title, text, alt], index) => `<figure class="game-card"><button class="game-card-open" type="button" data-gallery-group="${group}" data-gallery-title="${title}" aria-label="Agrandir la capture ${title}"><img src="screenshots/${file}" alt="${alt}" loading="lazy"><span aria-hidden="true">Agrandir ↗</span></button><figcaption><span class="eyebrow">${title}</span><h3>${text}</h3></figcaption></figure>`).join("");
}
const installationPhotos = [
  ["dartlink1.jpeg", "L’installation complète", "Vue d’ensemble du système DartLink avec cible, écran et commandes"],
  ["dartlink2.jpeg", "La cible et le jeu", "Cible de fléchettes éclairée au-dessus de l’écran et du panneau de commandes"],
  ["dartlink3.jpeg", "Le panneau de commandes", "Écran et panneau de boutons physiques du système DartLink"],
];
function experience() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">L’expérience DartLink</span><h1>Chaque lancer.<br><em>Une nouvelle partie.</em></h1><p>Une cible, des joueurs et l’envie de partager un bon moment. Découvrez huit familles de modes de jeu, la télécommande et une installation DartLink en images.</p></section>
    <section class="container section compact"><div class="section-heading"><div><span class="eyebrow">Le jeu en images</span><h2>À chacun son mode.</h2></div><p>Captures de l’application fournies pour la vitrine. Les écrans présentés peuvent varier selon la version installée.</p></div><div class="game-tabs" role="tablist" aria-label="Modes de jeu">${gameGroups.map(([id, label], index) => `<button type="button" role="tab" id="tab-${id}" aria-controls="panel-${id}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">${label}</button>`).join("")}</div>${gameGroups.map(([id, label, screens], index) => `<div id="panel-${id}" role="tabpanel" aria-labelledby="tab-${id}" tabindex="0" ${index ? "hidden" : ""}><div class="games-grid">${screenCards(screens, id)}</div></div>`).join("")}</section>
    <section class="container section compact"><div class="section-heading"><div><span class="eyebrow">Piloter la partie</span><h2>DartLink Remote en images.</h2></div><p>Accueil, commandes et noms des joueurs sur la télécommande locale.</p></div><div class="games-grid remote-grid">${screenCards(remoteScreens, "remote")}</div></section>
    <dialog id="game-gallery" class="game-gallery" aria-labelledby="gallery-title"><div class="game-gallery-panel"><div class="game-gallery-top"><span class="eyebrow">DartLink en images</span><button class="game-gallery-close" type="button" aria-label="Fermer la galerie">Fermer <span aria-hidden="true">×</span></button></div><figure><img id="gallery-image" alt=""><figcaption><strong id="gallery-title"></strong><span id="gallery-count" aria-live="polite"></span></figcaption></figure><div class="game-gallery-controls"><button class="game-gallery-prev" type="button">← Image précédente</button><button class="game-gallery-next" type="button">Image suivante →</button></div></div></dialog>
    <section class="section container installations-section"><div class="section-heading"><div><span class="eyebrow">Le jeu dans votre espace</span><h2>Une installation en images.</h2></div><p>La cible, l’écran et les commandes physiques du système DartLink photographié.</p></div><div class="installations-grid">${installationPhotos.map(([file, title, alt], index) => `<figure class="installation-photo"><button class="game-card-open" type="button" data-gallery-group="installation" data-gallery-title="${title}" aria-label="Agrandir la photo ${title.toLowerCase()}"><img src="installations/${file}" alt="${alt}" loading="lazy"><span aria-hidden="true">Agrandir ↗</span></button><figcaption><span class="eyebrow">0${index + 1} / Installation</span><h3>${title}</h3></figcaption></figure>`).join("")}</div></section>
    <section class="section container"><div class="section-heading"><div><span class="eyebrow">Autour de la partie</span><h2>Un ensemble cohérent.</h2></div></div>${featureCards()}</section>`,
    "experience",
  );
}
const competitionSources = [
  ["01", "Scores en direct", "PDC", "Matchs en cours, à venir et terminés sur le centre officiel des matchs.", "https://www.pdc.tv/games"],
  ["02", "Actualités", "PDC", "Articles, annonces et comptes rendus des compétitions professionnelles.", "https://www.pdc.tv/news/"],
  ["03", "Calendrier", "PDC", "Dates et tournois du circuit professionnel international.", "https://www.pdc.tv/calendar/"],
  ["04", "Actualités", "WDF", "Nouvelles des compétitions de la World Darts Federation.", "https://dartswdf.com/news/"],
  ["05", "Calendrier", "WDF", "Événements fédéraux et compétitions internationales à venir.", "https://dartswdf.com/calendar/"],
];
function competitions() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">Le monde des fléchettes</span><h1>Suivez les<br><em>compétitions.</em></h1><p>Les derniers titres de la PDC sont affichés ici. Retrouvez aussi les scores, les actualités et les prochaines dates auprès des organisateurs internationaux.</p></section><section class="section container compact"><div class="section-heading"><div><span class="eyebrow">Actualités PDC</span><h2>Les derniers titres.</h2></div><p>Ouvrez un titre pour lire l’article sur le site de la PDC.</p></div><p id="competition-news-status" class="competition-note" role="status">Chargement des titres…</p><div id="competition-news" class="competition-news" aria-label="Derniers titres de la PDC"></div></section><section class="section container compact"><div class="section-heading"><div><span class="eyebrow">Sources officielles</span><h2>Au plus près des tournois.</h2></div><p>Les résultats et les horaires sont publiés par chaque organisateur.</p></div><div class="competition-grid">${competitionSources.map(([number, category, source, description, url]) => `<article class="competition-card"><span class="eyebrow">${number} / ${category}</span><h3>${source}</h3><p>${description}</p><a class="text-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Voir ${category.toLowerCase()} ${source} (nouvel onglet)">Voir sur ${source} <span aria-hidden="true">${arrowIcon}</span></a></article>`).join("")}</div><p class="competition-note">Les scores en direct sont disponibles selon les événements. Cette page ne diffuse pas elle-même les matchs ni les résultats.</p></section>`,
    "competitions",
  );
}
async function setupCompetitionNews() {
  const list = document.querySelector("#competition-news");
  const status = document.querySelector("#competition-news-status");
  if (!list || !status) return;
  try {
    const response = await fetch("news/pdc.json", { cache: "no-store" });
    if (!response.ok) throw new Error("News unavailable");
    const data = await response.json();
    if (!Array.isArray(data.items) || !data.items.length) throw new Error("Empty news");
    if (!list.isConnected) return;
    const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
    for (const item of data.items.slice(0, 6)) {
      let url;
      try { url = new URL(item.url); } catch { continue; }
      const published = new Date(item.publishedAt);
      if (url.protocol !== "https:" || url.hostname !== "www.pdc.tv" || !url.pathname.startsWith("/news/") || typeof item.title !== "string" || !item.title.trim() || Number.isNaN(published.getTime())) continue;
      const article = document.createElement("article");
      article.className = "competition-news-item";
      const date = document.createElement("time");
      date.dateTime = published.toISOString();
      date.textContent = dateFormat.format(published);
      const link = document.createElement("a");
      link.href = url.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${item.title} (PDC, nouvel onglet)`);
      if (typeof item.thumbnail === "string") {
        let thumbnail;
        try { thumbnail = new URL(item.thumbnail); } catch { /* Keep the text-only article. */ }
        if (thumbnail?.protocol === "https:" && thumbnail.hostname === "images.gc.pdcservices.co.uk" && /^\/fit-in\/320x180\/[a-z0-9_-]+\.(jpg|jpeg|png|webp)$/i.test(thumbnail.pathname)) {
          const image = document.createElement("img");
          image.src = thumbnail.href;
          image.alt = "";
          image.width = 120;
          image.height = 76;
          image.loading = "lazy";
          image.decoding = "async";
          image.referrerPolicy = "no-referrer";
          image.addEventListener("error", () => {
            image.remove();
            link.classList.remove("has-image");
          });
          link.classList.add("has-image");
          link.append(image);
        }
      }
      const copy = document.createElement("span");
      copy.className = "competition-news-copy";
      const title = document.createElement("span");
      title.textContent = item.title;
      copy.append(date, title);
      link.append(copy);
      article.append(link);
      list.append(article);
    }
    if (!list.children.length) throw new Error("No valid news");
    const updated = new Date(data.updatedAt);
    status.textContent = Number.isNaN(updated.getTime())
      ? "Titres fournis par la PDC."
      : `Titres PDC récupérés le ${dateFormat.format(updated)} à ${new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).format(updated)} (heure de Paris).`;
  } catch {
    if (list.isConnected) status.textContent = "Les titres sont momentanément indisponibles. Consultez les actualités sur le site de la PDC ci-dessous.";
  }
}
function setupGameGallery() {
  const dialog = document.querySelector("#game-gallery");
  if (!dialog) return;
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const selectTab = (tab) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    });
  });
  const allTriggers = [...document.querySelectorAll("[data-gallery-group]")];
  let triggers = [];
  const image = dialog.querySelector("#gallery-image");
  const title = dialog.querySelector("#gallery-title");
  const count = dialog.querySelector("#gallery-count");
  let current = 0;
  let opener;
  const show = (index) => {
    current = (index + triggers.length) % triggers.length;
    const source = triggers[current].querySelector("img");
    image.src = source.src;
    image.alt = source.alt;
    title.textContent = triggers[current].dataset.galleryTitle;
    count.textContent = `${current + 1} / ${triggers.length}`;
  };
  allTriggers.forEach((trigger) => trigger.addEventListener("click", () => {
    opener = trigger;
    triggers = allTriggers.filter((item) => item.dataset.galleryGroup === trigger.dataset.galleryGroup);
    show(triggers.indexOf(trigger));
    dialog.showModal();
    dialog.querySelector(".game-gallery-close").focus();
  }));
  dialog.querySelector(".game-gallery-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".game-gallery-prev").addEventListener("click", () => show(current - 1));
  dialog.querySelector(".game-gallery-next").addEventListener("click", () => show(current + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
  });
  dialog.addEventListener("close", () => opener?.focus());
  let touchStart;
  image.addEventListener("touchstart", (event) => {
    touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
  }, { passive: true });
  image.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    touchStart = undefined;
  }, { passive: true });
}
const questions = [
  [
    "Qu’est-ce que DartLink ?",
    "DartLink est un système dédié aux fléchettes autour du Raspberry Pi, avec une application de jeu, des commandes physiques et une télécommande locale.",
  ],
  [
    "Quels modes de jeu peut-on découvrir ?",
    "La page L’expérience présente X01, X01 IA, Cricket, Course, Around the World, Cible aléatoire, Killer et Tournoi. Les options disponibles sur votre installation dépendent de la version de l’application de jeu.",
  ],
  [
    "Le site permet-il de jouer à distance ?",
    "Cette vitrine présente DartLink. Elle n’héberge pas de partie en ligne et ne se connecte pas à votre cible.",
  ],
  [
    "Le formulaire de contact envoie-t-il un message ?",
    "Oui. Le formulaire transmet votre nom, votre adresse e-mail et votre message à la messagerie de contact DartLink afin de vous répondre.",
  ],
];
function faq() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">Questions fréquentes</span><h1>Avant de<br><em>vous lancer.</em></h1><p>Quelques repères pour découvrir le jeu, les installations et la télécommande.</p></section><section class="faq-layout container"><div><span class="eyebrow">Les réponses essentielles</span><h2>Faisons le tour<br>de la cible.</h2><a class="text-link" href="#/experience">Découvrir l’expérience ${arrowIcon}</a></div><div class="faq-list">${questions.map(([question, answer], i) => `<details><summary><span class="faq-number">0${i + 1}</span><span>${question}</span><span class="faq-plus" aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join("")}</div></section>`,
    "faq",
  );
}
function contact() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">Contact</span><h1>Le début d’une<br><em>belle partie.</em></h1><p>Une idée pour votre espace de jeu ? Écrivez-nous pour en discuter.</p></section><section class="contact-layout container"><div><span class="eyebrow">Gardons le lien</span><h2>Votre projet.<br>Notre point de départ.</h2><p>Une installation à la maison, dans un club ou un espace partagé : chaque projet commence par une idée.</p><aside class="notice"><strong>Parlons de votre projet</strong><p>Votre nom, votre adresse e-mail et votre message servent à traiter votre demande et à vous répondre.</p><p>Vous pouvez aussi écrire à <a href="mailto:dartlink180@gmail.com">dartlink180@gmail.com</a>.</p></aside></div><form id="contact" class="contact-form"><div class="contact-trap" aria-hidden="true"><label for="contact-website">Votre site web (laisser vide)</label><input id="contact-website" name="website" tabindex="-1" autocomplete="off"></div><label for="contact-name">Votre nom</label><input id="contact-name" name="name" required maxlength="100" autocomplete="name" placeholder="Votre nom"><label for="contact-email">Votre adresse e-mail</label><input id="contact-email" name="email" type="email" required maxlength="254" autocomplete="email" placeholder="vous@exemple.fr"><label for="contact-project">Votre projet</label><textarea id="contact-project" name="project" required maxlength="2000" rows="5" placeholder="Décrivez votre projet ou posez votre question…"></textarea><button class="button" type="submit">Envoyer le message <span aria-hidden="true">${arrowIcon}</span></button><p id="contact-status" role="status" class="form-status"></p></form></section>`,
    "contact",
  );
}
function mentions() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">Informations & confidentialité</span><h1>En toute<br><em>clarté.</em></h1></section><section class="prose container"><h2>Le site DartLink</h2><p>Cette vitrine présente l’écosystème DartLink et les captures de son interface de jeu. Elle ne permet pas de piloter une installation.</p><h2>Vos données sur cette vitrine</h2><p>Le formulaire de contact transmet votre nom, votre adresse e-mail et votre message au serveur DartLink, puis à la messagerie Gmail de contact pour traiter votre demande et vous répondre. Le site ne conserve pas de copie des messages sur PiServeur. Une limitation temporaire des tentatives utilise votre adresse IP en mémoire pendant dix minutes. Les messages reçus sont traités dans la messagerie de contact. Ce site n’ajoute aucun outil de mesure d’audience ni cookie applicatif. Les vignettes des actualités sont chargées directement depuis le serveur d’images de la PDC : votre navigateur contacte ce service lorsque vous consultez la page Compétitions. L’hébergeur peut traiter les données techniques nécessaires à la fourniture du site.</p><h2>Informations éditoriales</h2><p>Les informations légales complètes de l’éditeur et les coordonnées de contact restent à renseigner à partir d’informations vérifiées.</p></section>`,
  );
}
function notFound() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">Page introuvable</span><h1>La cible est<br><em>un peu plus loin.</em></h1><p>Cette page n’existe pas ou son adresse a changé.</p>${button("Revenir à l’accueil", "#/")}</section>`,
  );
}
const routes = {
  "": [home, "Le jeu nous connecte"],
  experience: [experience, "L’expérience"],
  competitions: [competitions, "Compétitions"],
  faq: [faq, "Questions fréquentes"],
  contact: [contact, "Contact"],
  mentions: [mentions, "Informations & confidentialité"],
};
function render() {
  if (location.hash === "#main") {
    document.querySelector("#main")?.focus();
    return;
  }
  const route = location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (/^(login|manager)(\/|$)/.test(route)) {
    location.replace(managerUrl);
    return;
  }
  const [page, title] = routes[route] || [notFound, "Page introuvable"];
  app.innerHTML = page();
  document.title = `DartLink — ${title}`;
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      toggle.focus();
    }
  });
  setupGameGallery();
  setupCompetitionNews();
  document.querySelector("#contact")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.dataset.sending === "true") return;
    const status = form.querySelector("#contact-status");
    const submit = form.querySelector('[type="submit"]');
    const values = new FormData(form);
    const payload = {
      name: values.get("name").trim(),
      email: values.get("email").trim(),
      message: values.get("project").trim(),
      website: values.get("website"),
    };
    if (!payload.name || !payload.message) {
      status.textContent = "Veuillez renseigner votre nom et votre message.";
      return;
    }
    form.dataset.sending = "true";
    form.setAttribute("aria-busy", "true");
    submit.disabled = true;
    status.textContent = "Envoi en cours…";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        status.textContent = response.status === 429
          ? "Trop de tentatives. Réessayez dans dix minutes ou écrivez-nous directement."
          : "L’envoi a échoué. Vos champs sont conservés ; réessayez ou écrivez-nous directement.";
        return;
      }
      form.reset();
      status.textContent = "Votre message a été envoyé. Merci !";
    } catch {
      status.textContent = "L’envoi n’a pas pu être confirmé. Vos champs sont conservés ; vérifiez votre connexion ou écrivez-nous directement.";
    } finally {
      clearTimeout(timeout);
      form.dataset.sending = "false";
      form.removeAttribute("aria-busy");
      submit.disabled = false;
    }
  });
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", () => {
  render();
  document.querySelector("#main")?.focus({ preventScroll: true });
});
render();
