'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';

/* ============================================================
   RÉSERVATION — Calendly
   1. Crée un événement "Appel stratégique 30 min" sur calendly.com
      (mets le lieu = Google Meet pour générer un lien Meet auto).
   2. Colle ton lien Calendly ci-dessous.
   Tous les boutons "Réserver" ouvriront alors un POPUP Calendly
   (créneaux + anti-double-réservation + Google Meet). Vide = ancre #book.
   ============================================================ */
const CALENDLY_URL = 'https://calendly.com/thinkbig0/appel-strategique';

/* Marque : double slash orange (réutilisée partout) */
const LogoMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <g transform="rotate(26 22 22)">
      <rect x="15" y="3" width="5.4" height="34" rx="2.7" fill="#E8500A" />
      <rect x="25" y="14" width="5.4" height="23" rx="2.7" fill="#E8500A" />
    </g>
  </svg>
);

const ico = {
  meta: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" /></svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
  ),
  leads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>
  ),
  track: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 14 3-3 3 3 5-6" /></svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 2.4 5.2L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.8z" /></svg>
  ),
  page: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /></svg>
  ),
  loop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9M14 17H5M17 14l3 3-3 3M7 10 4 7l3-3" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>
  ),
  retarget: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9M14 17H5M17 14l3 3-3 3M7 10 4 7l3-3" /></svg>
  ),
  landing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8M7 13l2.5 2.5L13 12" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7" /></svg>
  ),
};

const faqs = [
  {
    q: "Quel budget publicitaire ça prend pour commencer ?",
    a: "Ça dépend de ton marché et de tes objectifs. On travaille avec des entreprises sérieuses prêtes à investir pour grandir. Pendant l'appel, on évalue ensemble le budget minimum réaliste pour obtenir des résultats, sans te faire dépenser pour rien. À noter : le budget que tu mets dans les plateformes est séparé de nos honoraires de gestion.",
  },
  {
    q: "En combien de temps je vais voir des résultats ?",
    a: "Les premières données arrivent dès les premiers jours. Mais une campagne a besoin d'une phase d'apprentissage et de quelques cycles de test pour se stabiliser. En général, on vise des signaux clairs dans les 2 à 4 premières semaines, et une vraie traction sur 60 à 90 jours. On optimise en continu pour accélérer ça.",
  },
  {
    q: "Sur quelles plateformes vous travaillez ?",
    a: "Principalement Meta (Facebook et Instagram) et Google Ads (Search, Performance Max, YouTube). On choisit les plateformes en fonction de ta cible et de ton offre, pas l'inverse. L'objectif, c'est d'être là où tes clients prennent leur décision.",
  },
  {
    q: "Est-ce qu'il y a un contrat à long terme ?",
    a: "On garde nos clients par les résultats, pas par des clauses. On fonctionne sur une base mensuelle avec un engagement initial court le temps de mettre le système en place et de lui laisser une vraie chance de performer. On t'explique tout clairement avant de commencer.",
  },
  {
    q: "Comment se passe le reporting ?",
    a: "Tu reçois un rapport mensuel clair : ce qui a été dépensé, les leads ou ventes générés, le coût par résultat et la prochaine étape. Pas de jargon ni de métriques inutiles, juste ce qui compte pour ta business. Tu gardes aussi un accès complet à tes comptes publicitaires.",
  },
  {
    q: "Vous garantissez des résultats ?",
    a: "Personne d'honnête ne peut garantir des chiffres précis en publicité. Trop de facteurs dépendent de ton offre et de ton marché. Ce qu'on garantit, c'est un vrai travail de stratégie, des créatives de qualité, un tracking propre et une optimisation rigoureuse. On ne prend que les clients pour qui on est convaincus de pouvoir livrer.",
  },
];

export default function ThinkBigLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* Réservation : ouvre le popup Calendly si un lien est configuré */
  const handleBook = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!CALENDLY_URL) return;
    const C = (window as unknown as {
      Calendly?: { initPopupWidget: (o: { url: string }) => void };
    }).Calendly;
    if (C && typeof C.initPopupWidget === 'function') {
      e.preventDefault();
      try {
        C.initPopupWidget({ url: CALENDLY_URL });
      } catch {
        window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
      }
    }
    // sinon : le lien (href + target _blank) ouvre Calendly dans un nouvel onglet
  };
  const bookAttrs = CALENDLY_URL
    ? { href: CALENDLY_URL, onClick: handleBook, target: '_blank', rel: 'noopener noreferrer' }
    : { href: '#book' };

  /* Charge le widget Calendly (CSS + JS) une seule fois si un lien est défini */
  useEffect(() => {
    if (!CALENDLY_URL || document.getElementById('calendly-widget-js')) return;
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(css);
    const js = document.createElement('script');
    js.id = 'calendly-widget-js';
    js.src = 'https://assets.calendly.com/assets/external/widget.js';
    js.async = true;
    document.body.appendChild(js);
  }, []);

  /* Nav : état au scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Révélation au scroll + compteurs animés */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          const target = parseFloat(el.dataset.count || '0');
          const decimals = parseInt(el.dataset.decimals || '0', 10);
          const suffix = el.dataset.suffix || '';
          if (reduce) {
            el.textContent = target.toFixed(decimals) + suffix;
            cio.unobserve(el);
            return;
          }
          const dur = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(decimals) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(decimals) + suffix;
          };
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    root.querySelectorAll('.case-stat').forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <div ref={rootRef}>
      {/* ================= NAVIGATION ================= */}
      <nav className={scrolled ? 'scrolled' : ''} id="nav">
        <a href="#top" className="brand" aria-label="Think Big, accueil">
          <LogoMark className="brand-mark" />
          <span className="brand-word">
            THIN<span className="k">K</span> BIG
          </span>
        </a>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a href="#services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#approche" className="nav-link" onClick={() => setMenuOpen(false)}>Approche</a>
          <a href="#processus" className="nav-link" onClick={() => setMenuOpen(false)}>Processus</a>
          <a href="#resultats" className="nav-link" onClick={() => setMenuOpen(false)}>Résultats</a>
          <a href="#faq" className="nav-link" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a {...bookAttrs} className="nav-cta" onClick={() => setMenuOpen(false)}>Réserver un appel</a>
        </div>
        <button
          className="nav-toggle"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero dark" id="top">
        <div className="hero-glowbg" aria-hidden="true" />
        <LogoMark className="hero-mark" />
        <div className="hero-inner">
          <span className="hero-eyebrow">Agence de publicité Meta et Google Ads</span>
          <h1 className="hero-headline">
            <span className="line"><span>Transforme ton budget pub</span></span>
            <span className="line"><span>en <em>clients qui paient</em>.</span></span>
          </h1>
          <p className="hero-sub">
            On crée, gère et optimise tes campagnes Meta et Google Ads.{' '}
            <strong>Stratégie claire, créatives qui convertissent, tracking fiable.</strong>
          </p>
          <div className="hero-actions">
            <a {...bookAttrs} className="btn-primary">
              Réserver un appel stratégique <span className="arrow">→</span>
            </a>
            <a href="#processus" className="btn-ghost">Voir notre processus</a>
          </div>
        </div>
      </section>

      {/* ================= BANDE DE CONFIANCE ================= */}
      <div className="trust-band dark" aria-label="Nos expertises">
        <p className="trust-lead">Ce qu'on met en place pour toi</p>
        <div className="trust-grid">
          <div className="trust-cell">{ico.meta} Meta Ads</div>
          <div className="trust-cell">{ico.google} Google Ads</div>
          <div className="trust-cell">{ico.leads} Génération de leads</div>
          <div className="trust-cell">{ico.track} Suivi des conversions</div>
          <div className="trust-cell">{ico.star} Stratégie créative</div>
          <div className="trust-cell">{ico.page} Landing pages</div>
        </div>
      </div>

      {/* ================= PROBLÈME ================= */}
      <section className="section dark" id="approche">
        <div className="wrap">
          <div className="section-head reveal">
            <h2 className="section-title">
              La plupart des entreprises ne <em>perdent pas leur argent en pub</em>. Elles le brûlent.
            </h2>
            <p className="section-desc">
              Le budget n'est presque jamais le problème. C'est ce qu'il y a autour : la stratégie, les créatives, le suivi. Voici ce qu'on voit revenir chaque semaine.
            </p>
          </div>
          <div className="pain-grid">
            {[
              ['01', 'Du budget dépensé sans retour', "Les campagnes roulent, l'argent sort, mais les ventes ne suivent pas. Impossible de dire ce qui marche et ce qui te coûte."],
              ['02', 'Des créatives faibles', "Des pubs génériques qui n'arrêtent pas le pouce. Sans accroche forte, même le meilleur ciblage ne convertit pas."],
              ['03', 'Un tracking cassé', 'Pixel mal configuré, conversions non suivies, données qui ne concordent pas. Tu optimises à l\'aveugle.'],
              ['04', 'Aucune stratégie claire', "On « boost » des publications au hasard. Pas de structure de compte, pas d'offre, pas de plan d'acquisition."],
              ['05', 'Des leads qui ne ferment pas', "Un coût par lead bas n'impressionne personne si les leads n'achètent pas. Le volume sans qualité vide ton agenda et ta marge."],
              ['06', 'Personne aux commandes', "Des pubs lancées une fois et laissées à elles-mêmes. Sans optimisation continue, les résultats s'effondrent vite."],
            ].map(([num, title, desc], i) => (
              <div className={`pain-item reveal${i ? ` reveal-d${i}` : ''}`} key={num}>
                <div className="pain-num">{num}</div>
                <h3 className="pain-title">{title}</h3>
                <p className="pain-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOLUTION ================= */}
      <section className="section light">
        <div className="wrap">
          <div className="solution-grid">
            <div className="solution-left reveal">
              <h2 className="section-title">Un système d'acquisition complet, <em>géré de A à Z</em>.</h2>
              <p className="section-desc">
                On ne te vend pas « des pubs ». On bâtit la machine au complet, de la stratégie au rapport, et on la garde performante chaque semaine.
              </p>
              <div style={{ marginTop: '34px' }}>
                <a {...bookAttrs} className="btn-primary">
                  Réserver un appel stratégique <span className="arrow">→</span>
                </a>
              </div>
            </div>
            <div className="solution-pillars reveal reveal-d1">
              {[
                [ico.target, 'Stratégie', "On clarifie ton offre, ta cible et tes chiffres. Un plan d'acquisition pensé pour ta réalité, pas un modèle générique."],
                [ico.play, 'Créatives publicitaires', 'Scripts, visuels et vidéos pensés pour accrocher et convertir. Des créatives qui arrêtent le pouce, pas qui passent inaperçues.'],
                [ico.gear, 'Configuration des campagnes', 'Structure de compte propre, ciblage, budgets et lancement sur Meta et Google, bâtis pour scaler sans tout casser.'],
                [ico.track, 'Tracking et conversions', "Pixel, événements et conversions configurés correctement. Tu sais exactement d'où viennent tes résultats."],
                [ico.loop, 'Optimisation continue', 'On teste, on coupe ce qui ne performe pas, on scale ce qui marche. Chaque semaine, pas une fois par trimestre.'],
                [ico.report, 'Rapports clairs', "Un rapport mensuel qu'on comprend : ce qui a été dépensé, ce que ça a rapporté, et la prochaine étape."],
              ].map(([icon, title, desc], i) => (
                <div className="pillar" key={i}>
                  <div className="pillar-ico">{icon}</div>
                  <div>
                    <h3 className="pillar-title">{title as string}</h3>
                    <p className="pillar-desc">{desc as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section dark" id="services">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Nos services</span>
            <h2 className="section-title">Tout ce qu'il faut pour <em>faire grandir</em> ton acquisition.</h2>
            <p className="section-desc">Un seul partenaire pour ta stratégie, tes créatives, tes campagnes et tes résultats.</p>
          </div>
          <div className="services-grid">
            {[
              [ico.meta, 'Gestion Meta Ads', 'Facebook et Instagram. Structure de compte, ciblage, créatives et optimisation quotidienne pour des leads et des ventes au meilleur coût.', ['Facebook', 'Instagram', 'Reels']],
              [ico.google, 'Gestion Google Ads', "Search, Performance Max et YouTube. On capte la demande au moment exact où ton client te cherche.", ['Search', 'PMax', 'YouTube']],
              [ico.leads, 'Génération de leads', "Des campagnes pensées pour remplir ton agenda de prospects qualifiés, pas juste des noms dans un CRM.", ['Formulaires', 'Qualification']],
              [ico.retarget, 'Campagnes de reciblage', "On récupère les visiteurs qui ne sont pas passés à l'action et on les ramène jusqu'à l'achat.", ['Retargeting', 'Audiences']],
              [ico.landing, 'Optimisation de landing pages', 'Une page rapide, claire et orientée conversion. La meilleure pub ne sert à rien sur une mauvaise page.', ['CRO', 'A/B testing']],
              [ico.star, 'Stratégie créative', 'Angles, hooks et scripts. On produit des concepts publicitaires qui se démarquent et qui vendent.', ['Hooks', 'UGC', 'Scripts']],
            ].map(([icon, title, desc, tags], i) => (
              <div className={`service-card reveal${i % 3 ? ` reveal-d${i % 3}` : ''}`} key={i}>
                <div className="service-ico">{icon}</div>
                <h3 className="service-title">{title as string}</h3>
                <p className="service-desc">{desc as string}</p>
                <div className="service-tags">
                  {(tags as string[]).map((t) => (
                    <span className="service-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESSUS ================= */}
      <section className="section light" id="processus">
        <div className="wrap">
          <div className="section-head reveal">
            <h2 className="section-title">De l'audit aux résultats, <em>en 4 étapes</em>.</h2>
            <p className="section-desc">Un parcours simple et transparent. Tu sais toujours où on en est et ce qui s'en vient.</p>
          </div>
          <div className="process-line">
            {[
              ['1', 'Audit', "On analyse ton compte, ton offre et tes chiffres. On identifie ce qui te fait perdre de l'argent."],
              ['2', 'Stratégie', "On bâtit ton plan d'acquisition : structure, offre, angles créatifs et objectifs clairs."],
              ['3', 'Lancement', 'On produit les créatives, on configure le tracking et on met tes campagnes en ligne.'],
              ['4', 'Optimisation', 'On suit, on teste, on scale. Rapport clair chaque mois sur ce qui marche et la suite.'],
            ].map(([num, title, desc], i) => (
              <div className={`process-step reveal${i ? ` reveal-d${i}` : ''}`} key={num}>
                <div className="process-step-num">{num}</div>
                <h3 className="process-step-title">{title}</h3>
                <p className="process-step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RÉSULTATS ================= */}
      {/* PLACEHOLDERS : remplace chiffres, titres, secteurs et images par tes vrais résultats. */}
      <section className="section dark" id="resultats">
        <div className="wrap">
          <div className="section-head reveal">
            <h2 className="section-title">Des chiffres qui changent <em>une business</em>.</h2>
            <p className="section-desc">Exemples illustratifs du type de résultats qu'on vise avec nos clients. Remplace-les par tes vraies études de cas.</p>
          </div>
          <div className="results-grid">
            {[
              {
                img: 'https://picsum.photos/seed/thinkbig-service-local/640/360',
                alt: "Équipe d'une entreprise de services locale",
                badge: 'Service local', count: '312', suffix: '%', decimals: 0,
                stat: 'de leads qualifiés en plus en 90 jours',
                title: 'Entreprise de services locale',
                desc: "Refonte des créatives et du ciblage Meta. L'agenda est passé de quelques demandes par semaine à un flux constant de rendez-vous qualifiés.",
              },
              {
                img: 'https://picsum.photos/seed/thinkbig-ecommerce-brand/640/360',
                alt: "Produits d'une marque e-commerce",
                badge: 'E-commerce', count: '2.8', suffix: '×', decimals: 1,
                stat: "d'amélioration du ROAS en 4 mois",
                title: 'Marque e-commerce',
                desc: 'Restructuration du compte, nouvelles créatives et reciblage. Le retour sur dépense publicitaire a presque triplé à budget égal.',
              },
              {
                img: 'https://picsum.photos/seed/thinkbig-real-estate/640/360',
                alt: 'Propriété immobilière',
                badge: 'Immobilier', count: '47', suffix: '', decimals: 0,
                stat: 'rendez-vous réservés en un mois',
                title: 'Campagne immobilière',
                desc: "Funnel de génération de leads avec qualification automatisée. Des rendez-vous réservés directement à l'agenda de l'équipe de vente.",
              },
            ].map((c, i) => (
              <div className={`case-card reveal${i ? ` reveal-d${i}` : ''}`} key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="case-img" src={c.img} alt={c.alt} loading="lazy" width={640} height={360} />
                <div className="case-body">
                  <div className="case-badge">{c.badge}</div>
                  <div
                    className="case-stat"
                    data-count={c.count}
                    data-suffix={c.suffix}
                    data-decimals={c.decimals}
                  >
                    0{c.suffix}
                  </div>
                  <div className="case-stat-label">{c.stat}</div>
                  <div className="case-line" />
                  <h3 className="case-title">{c.title}</h3>
                  <p className="case-desc">{c.desc}</p>
                  <p className="case-note">Exemple illustratif à personnaliser</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OFFRE ================= */}
      <section className="section light" id="offre">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow">Travailler avec nous</span>
            <h2 className="section-title">Un partenariat complet, <em>pas un simple service de pub</em>.</h2>
          </div>
          <div className="offer-wrap reveal">
            <div className="offer-left">
              <div className="offer-kicker">Ce qui est inclus chaque mois</div>
              <h3 className="offer-h">Tout est géré, tout est suivi.</h3>
              <p className="offer-p">
                Un accompagnement mensuel pensé pour des entreprises qui veulent des résultats concrets et un seul partenaire responsable de A à Z.
              </p>
              <ul className="offer-list">
                {[
                  ['Gestion publicitaire mensuelle', ' sur Meta et Google'],
                  ['Stratégie créative', ' : angles, scripts et concepts'],
                  ['Configuration du tracking', ' et des conversions'],
                  ['Optimisation hebdomadaire', ' des campagnes'],
                  ['Rapport mensuel', ' clair et transparent'],
                ].map(([strong, rest], i) => (
                  <li key={i}>{ico.check}<span><strong>{strong}</strong>{rest}</span></li>
                ))}
              </ul>
            </div>
            <div className="offer-right">
              <span className="offer-badge">Sur sélection</span>
              <h3 className="offer-h">On accepte un nombre limité de clients.</h3>
              <p className="offer-p">
                Pour garder la qualité de notre travail, on ne prend qu'un nombre restreint de nouveaux comptes chaque mois. On commence par un appel pour s'assurer qu'on est le bon match.
              </p>
              <div className="offer-cta">
                <a {...bookAttrs} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Postuler pour travailler avec nous <span className="arrow">→</span>
                </a>
                <p className="offer-fine">Appel de 30 minutes, sans engagement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section dark" id="faq">
        <div className="wrap">
          <div className="section-head center reveal">
            <h2 className="section-title">Tout ce que tu veux savoir <em>avant de commencer</em>.</h2>
          </div>
          <div className="faq-list reveal">
            {faqs.map((item, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q} <span className="faq-ico" />
                </button>
                <div
                  className="faq-a"
                  style={{ maxHeight: openFaq === i ? '320px' : '0' }}
                >
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="cta-final dark" id="book">
        <div className="cta-final-bg" aria-hidden="true" />
        <LogoMark className="cta-final-mark" />
        <div className="cta-final-inner reveal">
          <h2 className="cta-final-title">
            Prêt à transformer ton budget pub en <em>croissance réelle</em> ?
          </h2>
          <p className="cta-final-sub">
            On commence par un appel stratégique de 30 minutes pour comprendre ta situation et voir comment on peut t'aider. Sans engagement.
          </p>
          <a {...bookAttrs} className="btn-primary" style={{ fontSize: '16px', padding: '19px 42px' }}>
            Réserver un appel stratégique <span className="arrow">→</span>
          </a>
          <p className="cta-note">Réponse sous 24 h. Places limitées chaque mois.</p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="footer-top">
          <div>
            <a href="#top" className="brand" aria-label="Think Big, accueil">
              <LogoMark className="brand-mark" />
              <span className="brand-word" style={{ color: '#F2F2F0' }}>
                THIN<span className="k">K</span> BIG
              </span>
            </a>
            <p className="footer-tagline">
              L'agence de publicité qui transforme ton budget en clients. Meta Ads, Google Ads et systèmes d'acquisition.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Agence</h4>
              <a href="#services">Services</a>
              <a href="#approche">Approche</a>
              <a href="#processus">Processus</a>
              <a href="#resultats">Résultats</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a {...bookAttrs}>Réserver un appel</a>
              <a href="mailto:bonjour@tonsite.com">Courriel</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {year} Think Big Marketing Agency. Tous droits réservés.</span>
          <span className="footer-copy">Basée au Québec</span>
        </div>
      </footer>
    </div>
  );
}
