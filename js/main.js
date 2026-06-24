'use strict';

const PLAYERS = [
  { num: 1,  pos: 'KAL' },
  { num: 16, pos: 'KAL' },
  { num: 2,  pos: 'DEF' },
  { num: 3,  pos: 'DEF' },
  { num: 4,  pos: 'DEF' },
  { num: 5,  pos: 'DEF' },
  { num: 6,  pos: 'DEF' },
  { num: 8,  pos: 'OSA' },
  { num: 10, pos: 'OSA' },
  { num: 14, pos: 'OSA' },
  { num: 18, pos: 'OSA' },
  { num: 7,  pos: 'FOR' },
  { num: 9,  pos: 'FOR' },
  { num: 11, pos: 'FOR' },
  { num: 17, pos: 'FOR' },
];

const TR_FLAG_SVG = `
<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" width="28" height="18" aria-label="Türkiye">
  <rect width="30" height="20" fill="#E30A17"/>
  <circle cx="11.5" cy="10" r="5.5" fill="white"/>
  <circle cx="13"   cy="10" r="4.4" fill="#E30A17"/>
  <polygon
    points="18.5,10 20.8,9.1 20.3,11.7 22.2,9.6 20.0,9.0 22.2,8.2 19.6,8.8"
    fill="white"
    transform="rotate(18 20 10) translate(-1.5 0)"/>
</svg>`.trim();

const PERSON_SVG = `
<svg viewBox="0 0 110 235" xmlns="http://www.w3.org/2000/svg"
     width="88" height="188" style="margin-bottom:-2px;"
     fill="rgba(10,3,3,0.84)">
  <ellipse cx="55" cy="37" rx="22" ry="26"/>
  <rect x="48" y="60" width="14" height="14" rx="4"/>
  <path d="M18 85 Q18 73 55 73 Q92 73 92 85 L96 180 L14 180 Z"/>
  <path d="M92 91 Q108 112 101 140 Q94 151 81 147 Q75 137 80 124 Q90 113 92 96 Z"/>
  <path d="M18 91 Q2  112 9  140 Q16 151 29 147 Q35 137 30 124 Q20 113 18 96 Z"/>
  <path d="M24 130 Q55 144 86 130 Q88 126 86 122 Q55 135 24 122 Q22 126 24 130 Z"/>
  <path d="M22 180 L16 233 L46 233 L55 200 L64 233 L94 233 L88 180 Z"/>
</svg>`.trim();

function buildPlayerCard(player, index) {
  const delay = (index % 5) * 80;

  const card = document.createElement('article');
  card.className = 'player-card reveal';
  card.style.transitionDelay = `${delay}ms`;
  card.setAttribute('data-pos', player.pos);

  card.innerHTML = `
    <div class="player-sil" aria-hidden="true">
      <div class="card-glow"></div>
      <div class="card-flag">${TR_FLAG_SVG}</div>
      <span class="card-mystery">?</span>
      ${PERSON_SVG}
      <span class="card-hover-num" aria-hidden="true">#0</span>
    </div>
    <div class="player-info">
      <p class="player-name">OYUNCU ${player.num}</p>
      <p class="player-tag">BL-Oyuncu${player.num}</p>
    </div>`;

  return card;
}

function renderPlayerGrid() {
  const grid = document.getElementById('player-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  PLAYERS.forEach((p, i) => fragment.appendChild(buildPlayerCard(p, i)));
  grid.appendChild(fragment);
}

function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1 }
  );

  targets.forEach(el => observer.observe(el));
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 70) navbar.classList.add('scrolled');
    else                      navbar.classList.remove('scrolled');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const toggle    = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-menu');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

document.addEventListener('DOMContentLoaded', () => {
  renderPlayerGrid();
  initReveal();
  initNavbar();
  initMobileMenu();
});
