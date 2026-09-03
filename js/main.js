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
    card.className = 'pcard';
    card.dataset.pos = player.pos;
    card.innerHTML = `
      <div class="pcard-media">
        <img src="${PLACEHOLDER}" alt="" loading="lazy" />
        <span class="pcard-num">${String(player.num).padStart(2, '0')}</span>
        <span class="pcard-pos">${player.pos}</span>
      </div>
      <div class="pcard-foot">
        <p class="pcard-name">Oyuncu ${player.num}</p>
        <p class="pcard-tag">@sense.${player.num}</p>
      </div>`;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}

function initFilter() {
  const seg = document.querySelector('.seg');
  const grid = document.getElementById('squadGrid');
  if (!seg || !grid) return;

  seg.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;

    seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === button));

    const filter = button.dataset.filter;
    grid.querySelectorAll('.pcard').forEach(card => {
      const match = filter === 'all' || card.dataset.pos === filter;
      card.classList.toggle('hide', !match);
    });
  });
}

function renderGallery() {
  const grid = document.getElementById('shots');
  if (!grid) return;

  GALLERY.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `${item.alt} — büyüt`);
    button.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy" />`;
    button.addEventListener('click', () => openLightbox(index));
    grid.appendChild(button);
  });
}

function initLightbox() {
  const lb = document.getElementById('lb');
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCap');
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

  lb.querySelector('.lb-x').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', event => { if (event.target === lb) close(); });

  document.addEventListener('keydown', event => {
    if (!lb.classList.contains('open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
}

function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('drawer');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('stuck', window.scrollY > 16);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!toggle || !drawer) return;

  const setOpen = open => {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  };

  toggle.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
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
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderSquad();
  initFilter();
  renderGallery();
  initLightbox();
  initNav();
  initReveal();
});
