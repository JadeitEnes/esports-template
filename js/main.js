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
      <img class="card-no-image" src="assets/images/no_image.png" alt="Oyuncu görseli yok" draggable="false" />
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
