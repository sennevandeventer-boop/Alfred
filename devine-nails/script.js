/* ── NAV SCROLL ─────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── MOBILE NAV TOGGLE ──────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── SCROLL REVEAL ──────────────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

/* ── HERO INITIAL REVEAL ────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 140);
  });
});

/* ── FLOATING PARTICLES ─────────────────────────────────────────────── */
const particleContainer = document.getElementById('particles');
const PARTICLE_COLORS = ['#f9c6d0', '#d4c0f0', '#c9a96e', '#b8e0f9', '#f9e4b8'];

function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'particle';

  const size = 4 + Math.random() * 8;
  const left = 5 + Math.random() * 90;
  const delay = Math.random() * 2;
  const duration = 6 + Math.random() * 8;
  const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: ${-size}px;
    background: ${color};
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;

  particleContainer.appendChild(p);
  setTimeout(() => p.remove(), (duration + delay) * 1000);
}

setInterval(spawnParticle, 700);

/* ── PARALLAX BLOBS ─────────────────────────────────────────────────── */
const blobs = document.querySelectorAll('.hero__blob');
window.addEventListener('mousemove', (e) => {
  const cx = (e.clientX / window.innerWidth  - .5) * 2;
  const cy = (e.clientY / window.innerHeight - .5) * 2;
  blobs.forEach((blob, i) => {
    const depth = (i + 1) * 12;
    blob.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
  });
}, { passive: true });

/* ── CONTACT FORM ───────────────────────────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Verstuurd! ✓';
    btn.style.background = '#2d7a4f';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

/* ── SMOOTH ACTIVE NAV ──────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => activeObs.observe(s));

/* ── GALLERY ITEM HOVER TILT ────────────────────────────────────────── */
document.querySelectorAll('.gallery__placeholder').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = (e.clientX - rect.left) / rect.width  - .5;
    const cy    = (e.clientY - rect.top)  / rect.height - .5;
    card.style.transform = `scale(1.04) rotateX(${-cy * 8}deg) rotateY(${cx * 8}deg)`;
    card.style.transition = 'transform .1s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .4s cubic-bezier(0.16, 1, 0.3, 1)';
  });
});

/* ── SELECT LABEL FIX ───────────────────────────────────────────────── */
const select = document.getElementById('service');
if (select) {
  select.addEventListener('change', () => {
    select.setAttribute('value', select.value);
  });
}
