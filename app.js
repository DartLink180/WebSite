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
function button(label, href, secondary = false) {
  return `<a class="button ${secondary ? "button-secondary" : ""}" href="${href}">${label}<span aria-hidden="true">${arrowIcon}</span></a>`;
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
      <nav id="main-nav" aria-label="Navigation principale">${navItems.map(([path, label]) => `<a href="#/${path}" ${path === current ? 'aria-current="page"' : ""}>${label}</a>`).join("")}<a href="${remoteUrl}">Télécommande</a><a href="${mobileUrl}">Jouer sur mobile</a>${button("Ouvrir le Manager", managerUrl)}</nav>
    </div></header>
    <main id="main" tabindex="-1">${content}</main>
    <footer class="site-footer container"><div class="footer-main"><a class="brand" href="#/" aria-label="DartLink — accueil">${logo()}</a><p>La passion du jeu.<br>L’esprit connecté.</p><a class="text-link" href="${managerUrl}">Accès au Manager <span aria-hidden="true">${arrowIcon}</span></a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} DartLink</span><span>Imaginé pour les passionnés de fléchettes.</span><a href="#/mentions">Informations & confidentialité</a></div></footer>`;
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
    "La gestion, au même endroit.",
    "Un Manager réservé aux administrateurs pour retrouver les installations et suivre leurs états.",
  ],
];
function featureCards() {
  return `<div class="feature-grid">${features.map(([number, title, text]) => `<article class="feature-card"><span class="card-number">${number} <span aria-hidden="true">${arrowIcon}</span></span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>`;
}
function managerSection() {
  return `<section class="manager-section container"><div class="manager-identity"><span class="eyebrow">L’écosystème DartLink</span><div class="brand-seal">${logo("mark")}</div><span class="identity-caption">UNE PASSION. UN POINT DE CONNEXION.</span></div><div class="manager-copy"><span class="eyebrow">En coulisses / Le Manager</span><h2>Gardez le jeu en vue.<br>Et vos installations aussi.</h2><p>Un espace dédié pour retrouver vos appareils, consulter leur état et gérer vos installations. La même identité, du terrain à l’administration.</p><ul class="check-list"><li>Une vue d’ensemble du parc</li><li>Le détail de chaque installation</li><li>Des outils réservés aux administrateurs</li></ul>${button("Accéder au Manager", managerUrl)}<p class="fine-print">Un compte administrateur est nécessaire.</p></div></section>`;
}
function home() {
  return shell(`<section class="hero container"><div class="hero-copy"><span class="eyebrow"><span class="status-dot"></span> FLÉCHETTES · PASSION · CONNEXION</span><h1>Le jeu nous<br><em>connecte.</em></h1><p>Le plaisir d’un beau lancer. L’envie de rejouer ensemble. Découvrez DartLink, l’écosystème qui accompagne votre passion des fléchettes.</p><div class="actions">${button("Découvrir l’expérience", "#/experience")}${button("Explorer le Manager", managerUrl, true)}${button("Ouvrir DartLink Remote", remoteUrl, true)}${button("Jouer sur mobile", mobileUrl, true)}</div><div class="hero-note"><span class="note-line"></span>Du premier lancer à la prochaine partie.</div></div><div class="hero-visual"><span class="visual-label">DARTLINK / L’ESPRIT DU JEU</span><div class="signature">${logo("signature")}</div><div class="visual-caption"><span class="status-dot"></span> La précision rassemble.<span aria-hidden="true">${arrowIcon}</span></div></div></section>
    <section class="principles container" aria-label="L’esprit DartLink"><span>01 <strong>Jouer.</strong></span><span>02 <strong>Connecter.</strong></span><span>03 <strong>Partager.</strong></span><p>Votre cible.<br>Tout un univers autour.</p></section>
    <section class="section container"><div class="section-heading"><div><span class="eyebrow">Pensé autour de votre passion</span><h2>Plus qu’une cible.<br>Une expérience commune.</h2></div><p>Sur le terrain comme en coulisses,<br>chaque chose trouve sa place.</p></div>${featureCards()}</section>
    <section class="game-section container"><div class="game-copy"><span class="eyebrow">À vous de jouer</span><h2>Choisissez votre jeu.<br>Trouvez votre rythme.</h2><p>Six modes, de X01 au Tournoi : explorez les écrans de DartLink et imaginez votre prochaine partie.</p><a class="text-link" href="#/experience">Voir les modes de jeu <span aria-hidden="true">${arrowIcon}</span></a></div><figure class="game-preview"><div class="window-bar"><span><i></i><i></i><i></i></span><span>DARTLINK / LE JEU</span><span aria-hidden="true">${arrowIcon}</span></div><img src="screenshots/v296-menu.png" alt="Menu de DartLink avec choix des joueurs, du mode et des options" width="1280" height="720" loading="lazy"><figcaption>Un aperçu de l’interface de jeu.</figcaption></figure></section>
    ${managerSection()}<section class="closing container"><div><span class="eyebrow">La prochaine partie commence ici</span><h2>On se retrouve<br>autour de la cible ?</h2></div>${button("En savoir plus", "#/faq")}</section>`);
}
const games = [
  ["v296-x01.png", "X01", "101, 301 ou 501, avec variantes contre l’IA.", "Partie X01 à deux joueurs avec scores et lancers"],
  ["v296-cricket.png", "Cricket", "Standard ou Cut-Throat, avec ou sans bull.", "Tableau Cricket avec marques et points de deux joueurs"],
  ["v296-course.png", "Course 300", "Faites avancer votre joueur jusqu’à 300 points.", "Course 300 avec pistes et progression de deux joueurs"],
  ["v296-around-world.png", "Around the World", "Parcourez les cibles de 1 à 20, puis la bull en option.", "Tour du monde avec cibles à atteindre pour deux joueurs"],
  ["v296-killer.png", "Killer", "Trouvez votre numéro, puis éliminez vos adversaires.", "Attribution des numéros en mode Killer pour trois joueurs"],
  ["v296-tournoi.png", "Tournoi", "Enchaînez les matchs X01 jusqu’à la finale.", "Tableau de tournoi à quatre joueurs avec matchs à jouer"],
];
function experience() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">L’expérience DartLink</span><h1>Chaque lancer.<br><em>Une nouvelle partie.</em></h1><p>Une cible, des joueurs et l’envie de partager un bon moment. Découvrez les six modes du jeu, puis l’écosystème qui accompagne les installations.</p></section><section class="container section compact"><div class="section-heading"><div><span class="eyebrow">Le jeu en images</span><h2>À chacun son mode.</h2></div><p>Captures de DartLink v2.9.6 en simulation locale.</p></div><div class="games-grid">${games.map(([file, title, text, alt], index) => `<figure class="game-card"><button class="game-card-open" type="button" data-gallery-index="${index}" aria-label="Agrandir la capture ${title}"><img src="screenshots/${file}" alt="${alt}" width="1280" height="720" loading="lazy"><span aria-hidden="true">Agrandir ↗</span></button><figcaption><span class="eyebrow">${title}</span><h3>${text}</h3></figcaption></figure>`).join("")}</div></section><dialog id="game-gallery" class="game-gallery" aria-labelledby="gallery-title"><div class="game-gallery-panel"><div class="game-gallery-top"><span class="eyebrow">Le jeu en images</span><button class="game-gallery-close" type="button" aria-label="Fermer la galerie">Fermer <span aria-hidden="true">×</span></button></div><figure><img id="gallery-image" alt="" width="1280" height="720"><figcaption><strong id="gallery-title"></strong><span id="gallery-count" aria-live="polite"></span></figcaption></figure><div class="game-gallery-controls"><button class="game-gallery-prev" type="button">← Image précédente</button><button class="game-gallery-next" type="button">Image suivante →</button></div></div></dialog><section class="section container installations-section"><div class="section-heading"><div><span class="eyebrow">Le jeu dans votre espace</span><h2>Les installations en images.</h2></div><p>Des photos des installations physiques seront ajoutées ici.</p></div><div class="installations-grid"><div class="installation-slot"><span class="installation-slot-number">01</span><span>Vue d’ensemble</span><strong>Photo à venir</strong></div><div class="installation-slot"><span class="installation-slot-number">02</span><span>La cible et son équipement</span><strong>Photo à venir</strong></div><div class="installation-slot"><span class="installation-slot-number">03</span><span>L’espace de jeu</span><strong>Photo à venir</strong></div></div></section><section class="section container"><div class="section-heading"><div><span class="eyebrow">Du terrain aux coulisses</span><h2>Un ensemble cohérent.</h2></div></div>${featureCards()}</section>${managerSection()}`,
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
  const triggers = [...document.querySelectorAll(".game-card-open")];
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
    title.textContent = triggers[current].closest("figure").querySelector(".eyebrow").textContent;
    count.textContent = `${current + 1} / ${triggers.length}`;
  };
  triggers.forEach((trigger, index) => trigger.addEventListener("click", () => {
    opener = trigger;
    show(index);
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
    "DartLink est un écosystème dédié aux fléchettes : une application de jeu autour du Raspberry Pi et un Manager pour administrer les installations. Ce site vous présente ces deux univers.",
  ],
  [
    "À qui s’adresse le Manager ?",
    "Le Manager est réservé aux administrateurs disposant d’un compte. Le bouton « Ouvrir le Manager » vous dirige vers le service réel ; le site vitrine ne propose pas de connexion de démonstration.",
  ],
  [
    "Que trouve-t-on dans le Manager ?",
    "Le Manager permet de consulter le parc, l’état des appareils et le détail des installations. Les opérations disponibles dépendent des autorisations du compte et de la configuration de chaque installation.",
  ],
  [
    "Quels modes de jeu peut-on découvrir ?",
    "La page L’expérience présente X01, Cricket, Course 300, Around the World, Killer et Tournoi. Les options disponibles sur votre installation dépendent de la version de l’application de jeu.",
  ],
  [
    "Le site permet-il de jouer à distance ?",
    "Cette vitrine présente DartLink. Elle n’héberge pas de partie en ligne et ne se connecte pas à votre cible.",
  ],
  [
    "Le formulaire de contact envoie-t-il un message ?",
    "Pas encore. Le formulaire est une démonstration, signalée comme telle. Aucune donnée saisie n’est envoyée ou conservée par le site.",
  ],
];
function faq() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">Questions fréquentes</span><h1>Avant de<br><em>vous lancer.</em></h1><p>Quelques repères pour découvrir le jeu, les installations et le Manager.</p></section><section class="faq-layout container"><div><span class="eyebrow">Les réponses essentielles</span><h2>Faisons le tour<br>de la cible.</h2><a class="text-link" href="#/experience">Découvrir l’expérience ${arrowIcon}</a></div><div class="faq-list">${questions.map(([question, answer], i) => `<details><summary><span class="faq-number">0${i + 1}</span><span>${question}</span><span class="faq-plus" aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join("")}</div></section>`,
    "faq",
  );
}
function contact() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">Contact</span><h1>Le début d’une<br><em>belle partie.</em></h1><p>Une idée pour votre espace de jeu ? Découvrez le parcours de prise de contact.</p></section><section class="contact-layout container"><div><span class="eyebrow">Gardons le lien</span><h2>Votre projet.<br>Notre point de départ.</h2><p>Une installation à la maison, dans un club ou un espace partagé : chaque projet commence par une idée.</p><aside class="notice"><strong>Formulaire de démonstration</strong><p>L’envoi de messages n’est pas encore disponible. Utilisez uniquement des données fictives : rien ne sera envoyé ni enregistré.</p></aside></div><form id="contact" class="contact-form"><label for="contact-name">Votre nom</label><input id="contact-name" name="name" required maxlength="100" autocomplete="off" placeholder="Un nom fictif"><label for="contact-email">Votre adresse e-mail</label><input id="contact-email" name="email" type="email" required maxlength="254" autocomplete="off" placeholder="demo@example.com"><label for="contact-project">Votre projet</label><textarea id="contact-project" name="project" required maxlength="2000" rows="5" placeholder="Décrivez une installation fictive…"></textarea><button class="button" type="submit">Simuler l’envoi <span aria-hidden="true">${arrowIcon}</span></button><p id="contact-status" role="status" class="form-status"></p></form></section>`,
    "contact",
  );
}
function mentions() {
  return shell(
    `<section class="page-intro container"><span class="eyebrow">Informations & confidentialité</span><h1>En toute<br><em>clarté.</em></h1></section><section class="prose container"><h2>Le site DartLink</h2><p>Cette vitrine présente l’écosystème DartLink et les captures de son interface de jeu. Elle ne permet pas de piloter une installation.</p><h2>Accès au Manager</h2><p>Les liens Manager ouvrent le service externe à l’adresse dartlink.fr/manager/. Ce service possède sa propre authentification et ses propres traitements, distincts de cette vitrine.</p><h2>Vos données sur cette vitrine</h2><p>Le formulaire de contact est une démonstration. Les données saisies ne sont ni transmises par l’application, ni conservées après le rechargement de la page. Ce site n’ajoute aucun outil de mesure d’audience ni cookie applicatif. Les vignettes des actualités sont chargées directement depuis le serveur d’images de la PDC : votre navigateur contacte ce service lorsque vous consultez la page Compétitions. L’hébergeur peut traiter les données techniques nécessaires à la fourniture du site.</p><h2>Informations éditoriales</h2><p>Les informations légales complètes de l’éditeur et les coordonnées de contact restent à renseigner à partir d’informations vérifiées.</p></section>`,
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
  document.querySelector("#contact")?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
    document.querySelector("#contact-status").textContent =
      "Simulation terminée. Aucun message envoyé, aucune donnée enregistrée.";
  });
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", () => {
  render();
  document.querySelector("#main")?.focus({ preventScroll: true });
});
render();
