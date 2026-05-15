import { useState } from 'react';

const navItems = [
  'Accueil',
  'Fonctionnalités',
  'Modes de jeu',
  'Matériel',
  'Captures d’écran',
  'Installation',
  'Contact',
];

const gameModes = [
  {
    title: '301 / 501',
    description:
      'Parties classiques avec calcul automatique des scores, gestion des doubles de sortie et affichage instantané en plein écran.',
  },
  {
    title: 'Cricket',
    description:
      'Mode stratégique complet avec suivi des segments ouverts/fermés et visualisation claire de la progression de chaque joueur.',
  },
  {
    title: 'Cricket Cut Throat / SB',
    description:
      'Variantes avancées pour des parties compétitives : redistribution des points, règles SB et options de personnalisation.',
  },
  {
    title: 'Tournoi',
    description:
      'Organisation de sessions multi-joueurs avec enchaînement des manches, suivi des résultats et ambiance arcade en continu.',
  },
];

const features = [
  'Design aligné sur une charte néon arcade pour rappeler les écrans de jeu DartLink',
  'Interface plein écran optimisée pour écran connecté au Raspberry Pi',
  'Navigation fluide via boutons physiques GPIO',
  'Expérience orientée arcade : lisible, rapide et immersive',
];

const hardware = [
  'Raspberry Pi (3, 4 ou plus récent recommandé)',
  'Écran HDMI en mode paysage',
  'Boutons physiques reliés aux GPIO',
  'Cible de fléchettes et espace de jeu dédié',
];

const screenshotSlots = [
  { title: 'Menu principal', file: 'menu.png' },
  { title: 'Mode 301 / 501 — écran 1', file: 'mode-301-1.png' },
  { title: 'Mode 301 / 501 — écran 2', file: 'mode-301-2.png' },
  { title: 'Mode Cricket — écran 1', file: 'mode-cricket-1.png' },
  { title: 'Mode Cricket — écran 2', file: 'mode-cricket-2.png' },
  { title: 'Mode Course', file: 'mode-course.png' },
  { title: 'Mode Tournoi', file: 'mode-tournoi.png' },
];

const screenshotsBasePath = `${import.meta.env.BASE_URL}screenshots/`;

function App() {
  const [activeShot, setActiveShot] = useState(null);

  return (
    <>
      <header className="topbar">
        <div className="brand-wrap">
          <span className="brand-mark">🎯</span>
          <div>
            <div className="brand">DartLink</div>
            <small>Arcade darts experience</small>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <a key={item} href={`#${slugify(item)}`}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="accueil" className="hero">
          <p className="kicker">Application fléchettes sur Raspberry Pi</p>
          <h1>Une identité visuelle inspirée des écrans de jeu DartLink.</h1>
          <p>
            Le site reprend une charte graphique arcade avec contrastes forts, néons et panneaux
            sombres pour rester cohérent avec les menus et modes de jeu de l’application.
          </p>
          <a className="cta" href="#captures-decran">
            Voir les captures
          </a>
        </section>

        <section id="fonctionnalites" className="panel">
          <h2>Fonctionnalités</h2>
          <ul className="list-grid">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section id="modes-de-jeu" className="panel">
          <h2>Modes de jeu</h2>
          <div className="cards">
            {gameModes.map((mode) => (
              <article key={mode.title} className="card">
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="materiel" className="panel">
          <h2>Matériel recommandé</h2>
          <ul className="list-grid">
            {hardware.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="captures-decran" className="panel">
          <h2>Captures d’écran</h2>
          <p className="section-intro">
            Dépose tes captures avec les noms ci-dessous pour les voir automatiquement intégrées.
          </p>
          <div className="shots">
            {screenshotSlots.map((shot) => (
              <figure key={shot.file} className="shot">
                <button
                  type="button"
                  className="shot-button"
                  onClick={() => setActiveShot(shot)}
                  aria-label={`Agrandir la capture ${shot.title}`}
                >
                  <img src={`${screenshotsBasePath}${shot.file}`} alt={shot.title} loading="lazy" />
                </button>
                <figcaption>{shot.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="installation" className="panel">
          <h2>Installation</h2>
          <pre>{`# Installer les dépendances\nnpm install\n\n# Lancer en local\nnpm run dev\n\n# Générer le build de production\nnpm run build`}</pre>
        </section>

        <section id="contact" className="panel contact">
          <h2>Contact</h2>
          <p>Pour toute question ou partenariat, contactez l’équipe DartLink.</p>
          <a href="mailto:contact@dartlink.app">contact@dartlink.app</a>
        </section>
      </main>
      {activeShot && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeShot.title}>
          <button
            type="button"
            className="lightbox-backdrop"
            aria-label="Fermer l’aperçu"
            onClick={() => setActiveShot(null)}
          />
          <figure className="lightbox-content">
            <button
              type="button"
              className="lightbox-close"
              aria-label="Fermer"
              onClick={() => setActiveShot(null)}
            >
              ✕
            </button>
            <img src={`${screenshotsBasePath}${activeShot.file}`} alt={activeShot.title} />
            <figcaption>{activeShot.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

function slugify(label) {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default App;
