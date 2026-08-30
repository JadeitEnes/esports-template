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

const POS_LABEL = { KAL: 'Kaleci', DEF: 'Defans', OSA: 'Orta Saha', FOR: 'Forvet' };

const GALLERY = [
  { src: 'assets/images/gallery/g1.jpg', alt: 'Maç karesi 1' },
  { src: 'assets/images/gallery/g2.jpg', alt: 'Maç karesi 2' },
  { src: 'assets/images/gallery/g3.jpg', alt: 'Maç karesi 3' },
  { src: 'assets/images/gallery/g4.jpg', alt: 'Maç karesi 4' },
  { src: 'assets/images/gallery/g5.jpg', alt: 'Maç karesi 5' },
  { src: 'assets/images/gallery/g6.jpg', alt: 'Maç karesi 6' },
  { src: 'assets/images/gallery/g7.jpg', alt: 'Maç karesi 7' },
];

const PLACEHOLDER = 'assets/images/no_image.png';


function renderSquad() {
  const grid = document.getElementById('squadGrid');
  if (!grid) return;

  const frag = document.createDocumentFragment();

  PLAYERS.forEach(player => {
    const card = document.createElement('article');
    card.className = 'player';
    card.dataset.pos = player.pos;
    card.innerHTML = `
      <div class="player-media">
        <img src="${PLACEHOLDER}" alt="" loading="lazy" />
        <span class="player-num">${player.num}</span>
      </div>
      <div class="player-body">
        <p class="player-pos">${POS_LABEL[player.pos]}</p>
        <p class="player-name">Oyuncu ${player.num}</p>
        <p class="player-handle">@sense.${player.num}</p>
      </div>`;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}

function initSquadFilter() {
  const bar = document.querySelector('.squad-filter');
  const grid = document.getElementById('squadGrid');
  if (!bar || !grid) return;

  bar.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;

    bar.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b === button));

    const filter = button.dataset.filter;
    grid.querySelectorAll('.player').forEach(card => {
      const match = filter === 'all' || card.dataset.pos === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  GALLERY.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item';
    button.setAttribute('aria-label', `${item.alt} — büyüt`);
    button.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy" />`;
    button.addEventListener('click', () => openLightbox(index));
    grid.appendChild(button);
  });
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCap');
  if (!lb || !img || !cap) return;

  let current = 0;

  const show = index => {
    current = (index + GALLERY.length) % GALLERY.length;
    img.src = GALLERY[current].src;
    img.alt = GALLERY[current].alt;
    cap.textContent = `${current + 1} / ${GALLERY.length}`;
  };

  window.openLightbox = index => {
    show(index);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-nav.prev').addEventListener('click', () => show(current - 1));
  lb.querySelector('.lightbox-nav.next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', event => { if (event.target === lb) close(); });

  document.addEventListener('keydown', event => {
    if (!lb.classList.contains('open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
}

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileNav');
  if (!toggle || !menu) return;

  const setOpen = open => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
}

function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    }),
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSquad();
  initSquadFilter();
  renderGallery();
  initLightbox();
  initHeaderScroll();
  initMobileMenu();
  initTicker();
  initReveal();
});
