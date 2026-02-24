/* ============================================================
   HARSHIT SANHOTRA – PORTFOLIO  |  script.js
   ============================================================ */

/* ── 1. NAVBAR: scroll shadow + active link highlight ─────── */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const backTop   = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Sticky nav shadow
  navbar.classList.toggle('scrolled', y > 50);

  // Back-to-top button visibility
  backTop.classList.toggle('visible', y > 400);

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  let current = 'home';

  sections.forEach(section => {
    const top    = section.offsetTop - 110;
    const bottom = top + section.offsetHeight;
    if (y >= top && y < bottom) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === current);
  });
});


/* ── 2. MOBILE MENU toggle ────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});


/* ── 3. SMOOTH SCROLL for all anchor links ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Back to top
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── 4. TYPING EFFECT ─────────────────────────────────────── */
const phrases = [
  'Cyber Security Enthusiast',
  'AI / ML Developer',
  'LLM & Prompt Engineer',
  'Full-Stack Developer',
  'Docker & Linux Enthusiast',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, --charIndex);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
  }

  let speed = isDeleting ? 55 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;          // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;           // pause before next phrase
  }

  setTimeout(type, speed);
}

// Start typing after a short delay
setTimeout(type, 800);


/* ── 5. SCROLL ANIMATIONS (Intersection Observer) ────────── */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => observer.observe(el));


/* ── 6. SKILL BAR ANIMATION ───────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const level = fill.getAttribute('data-level');
        fill.style.width = level + '%';
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach(fill => skillObserver.observe(fill));


/* ── 7. STAGGER fade-in delay for grid children ──────────── */
document.querySelectorAll(
  '.skills-grid, .projects-grid, .cert-grid, .contact-cards'
).forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});


/* ── 8. ACTIVE nav-link on click (instant feedback) ─────── */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
