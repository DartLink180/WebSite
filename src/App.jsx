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
  'Interface plein écran optimisée pour écran connecté au Raspberry Pi',
  'Navigation fluide via boutons physiques GPIO',
  'Expérience orientée arcade : lisible, rapide et immersive',
  'Conçu pour les soirées entre amis, clubs et compétitions maison',
];

const hardware = [
  'Raspberry Pi (3, 4 ou plus récent recommandé)',
  'Écran HDMI en mode paysage',
  'Boutons physiques reliés aux GPIO',
  'Cible de fléchettes et espace de jeu dédié',
];

function App() {
  return (
    <>
      <header className="topbar">
        <div className="brand">🎯 DartLink</div>
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
          <h1>Transformez votre cible en borne arcade avec DartLink.</h1>
          <p>
            DartLink propose une expérience de jeu moderne, immersive et entièrement pensée pour
            un affichage plein écran et des contrôles physiques.
          </p>
          <a className="cta" href="#installation">
            Commencer l’installation
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
          <div className="shots">
            <div className="shot">Placeholder image 16:9 — Écran principal</div>
            <div className="shot">Placeholder image 16:9 — Partie en cours</div>
            <div className="shot">Placeholder image 16:9 — Sélection mode</div>
          </div>
        </section>

        <section id="installation" className="panel">
          <h2>Installation</h2>
          <p>
            Le site vitrine est totalement statique et peut être déployé facilement sur GitHub
            Pages ou Vercel.
          </p>
          <pre>
{`# Installer les dépendances
npm install

# Lancer en local
npm run dev

# Générer le build de production
npm run build

# Prévisualiser le build
npm run preview`}
          </pre>
        </section>

        <section id="contact" className="panel contact">
          <h2>Contact</h2>
          <p>Pour toute question ou partenariat, contactez l’équipe DartLink.</p>
          <a href="mailto:contact@dartlink.app">contact@dartlink.app</a>
        </section>
      </main>
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
