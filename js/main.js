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

const GALLERY_IMAGES = [
  { src: 'assets/images/gallery/g1.jpg', alt: 'Maç Karesi 1' },
  { src: 'assets/images/gallery/g2.jpg', alt: 'Maç Karesi 2' },
  { src: 'assets/images/gallery/g3.jpg', alt: 'Maç Karesi 3' },
  { src: 'assets/images/gallery/g4.jpg', alt: 'Maç Karesi 4' },
  { src: 'assets/images/gallery/g5.jpg', alt: 'Maç Karesi 5' },
  { src: 'assets/images/gallery/g6.jpg', alt: 'Maç Karesi 6' },
  { src: 'assets/images/gallery/g7.jpg', alt: 'Maç Karesi 7' },
];

/*
 * Slot offset -3 … +3 from center.
 * x = horizontal shift (px), z = depth (px), ry = rotateY (deg)
 * s = scale, o = opacity
 */
const REEL_SLOTS = [
  { x: -620, z: -320, ry: -83, s: 0.32, o: 0.07 }, /* -3  edge-on, nearly gone */
  { x: -460, z: -210, ry: -66, s: 0.55, o: 0.36 }, /* -2 */
  { x: -280, z:  -98, ry: -42, s: 0.77, o: 0.70 }, /* -1 */
  { x:    0, z:    0, ry:   0, s: 1.00, o: 1.00 }, /*  0  center */
  { x:  280, z:  -98, ry:  42, s: 0.77, o: 0.70 }, /* +1 */
  { x:  460, z: -210, ry:  66, s: 0.55, o: 0.36 }, /* +2 */
  { x:  620, z: -320, ry:  83, s: 0.32, o: 0.07 }, /* +3 */
];

function initGallery() {
  const scene   = document.getElementById('reel-scene');
  const thumbsEl= document.getElementById('gallery-thumbs');
  const lb      = document.getElementById('gallery-lightbox');
  const lbImg   = document.getElementById('lb-img');
  const lbCap   = document.getElementById('lb-caption');

  if (!scene || !GALLERY_IMAGES.length) return;

  const total = GALLERY_IMAGES.length;
  let center  = 0;
  let lbIndex = 0;
  let busy    = false;

  /* ── Build cards (frame + pillar) ── */
  const cards = GALLERY_IMAGES.map((data, i) => {
    const card = document.createElement('div');
    card.className = 'reel-card';

    /* Image frame */
    const frame = document.createElement('div');
    frame.className = 'reel-frame';
    const img = document.createElement('img');
    img.src = data.src;
    img.alt = data.alt;
    img.draggable = false;
    frame.appendChild(img);
    card.appendChild(frame);

    /* Pillar parts */
    ['reel-capital', 'reel-shaft', 'reel-pedestal'].forEach(cls => {
      const el = document.createElement('div');
      el.className = cls;
      card.appendChild(el);
    });

    card.addEventListener('click', () => onCardClick(i));
    scene.appendChild(card);
    return card;
  });

  /* ── Build thumbnails ── */
  const thumbs = GALLERY_IMAGES.map((data, i) => {
    const th = document.createElement('button');
    th.className = 'gallery-thumb';
    th.setAttribute('aria-label', data.alt);
    const img = document.createElement('img');
    img.src = data.src; img.alt = data.alt; img.draggable = false;
    th.appendChild(img);
    th.addEventListener('click', () => jumpTo(i));
    thumbsEl.appendChild(th);
    return th;
  });

  /* ── Position cards based on current center ── */
  function render() {
    cards.forEach((card, i) => {
      let offset = (i - center + total) % total;
      /* wrap to shortest path: -3 … +3 */
      if (offset > Math.floor(total / 2)) offset -= total;

      const slotIdx = offset + 3; /* maps -3…+3 → 0…6 */

      if (slotIdx < 0 || slotIdx >= REEL_SLOTS.length) {
        card.style.opacity   = '0';
        card.style.pointerEvents = 'none';
        card.style.zIndex    = '0';
        return;
      }

      const s = REEL_SLOTS[slotIdx];
      card.style.transform     = `translateX(${s.x}px) translateZ(${s.z}px) rotateY(${s.ry}deg) scale(${s.s})`;
      card.style.opacity       = s.o;
      card.style.zIndex        = offset === 0 ? 10 : 10 - Math.abs(offset) * 2;
      card.style.pointerEvents = s.o < 0.05 ? 'none' : 'auto';
      card.classList.toggle('is-center', offset === 0);
    });

    thumbs.forEach((th, i) => th.classList.toggle('active', i === center));
  }

  function jumpTo(index) {
    if (index === center || busy) return;
    busy = true;
    center = index;
    render();
    setTimeout(() => { busy = false; }, 580);
  }

  function onCardClick(i) {
    if (i === center) {
      openLightbox(i);
    } else {
      jumpTo(i);
    }
  }

  /* Swipe / drag */
  let dragStartX = null;
  scene.addEventListener('mousedown',  e => { dragStartX = e.clientX; });
  scene.addEventListener('touchstart', e => { dragStartX = e.touches[0].clientX; }, { passive: true });

  const onDragEnd = (endX) => {
    if (dragStartX === null) return;
    const dx = dragStartX - endX;
    if (Math.abs(dx) > 50) jumpTo(((center + (dx > 0 ? 1 : -1)) % total + total) % total);
    dragStartX = null;
  };

  scene.addEventListener('mouseup',   e => onDragEnd(e.clientX));
  scene.addEventListener('touchend',  e => onDragEnd(e.changedTouches[0].clientX), { passive: true });

  /* Keyboard */
  document.addEventListener('keydown', e => {
    if (lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  jumpTo(((center - 1) + total) % total);
    if (e.key === 'ArrowRight') jumpTo((center + 1) % total);
  });

  /* ── Lightbox ── */
  function openLightbox(index) {
    lbIndex = index;
    lbImg.src = GALLERY_IMAGES[index].src;
    lbImg.alt = GALLERY_IMAGES[index].alt;
    lbCap.textContent = `${GALLERY_IMAGES[index].alt}  ·  ${index + 1} / ${total}`;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function lbNav(dir) {
    lbIndex = ((lbIndex + dir) % total + total) % total;
    lbImg.style.cssText = `opacity:0;transform:translateX(${dir * 50}px);transition:opacity .18s,transform .18s`;
    setTimeout(() => {
      lbImg.src = GALLERY_IMAGES[lbIndex].src;
      lbImg.alt = GALLERY_IMAGES[lbIndex].alt;
      lbCap.textContent = `${GALLERY_IMAGES[lbIndex].alt}  ·  ${lbIndex + 1} / ${total}`;
      lbImg.style.cssText = 'opacity:1;transform:translateX(0);transition:opacity .22s,transform .22s';
    }, 190);
  }

  lb.querySelector('.gallery-lightbox-close').addEventListener('click', closeLightbox);
  lb.querySelector('.gallery-lightbox-prev').addEventListener('click',  () => lbNav(-1));
  lb.querySelector('.gallery-lightbox-next').addEventListener('click',  () => lbNav(1));
  lb.querySelector('.gallery-lightbox-backdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  renderPlayerGrid();
  initReveal();
  initNavbar();
  initMobileMenu();
  initGallery();
});
