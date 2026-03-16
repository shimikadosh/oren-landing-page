/* ===================================================
   OREN KADOSH – main.js
   =================================================== */

// ---------- HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ---------- STICKY HEADER SHADOW ----------
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ---------- SCROLL REVEAL ----------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ---------- LIGHTBOX ----------
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImgs[currentIndex].src;
  lightboxImg.alt = galleryImgs[currentIndex].alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  lightboxImg.src = galleryImgs[currentIndex].src;
  lightboxImg.alt = galleryImgs[currentIndex].alt;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  lightboxImg.src = galleryImgs[currentIndex].src;
  lightboxImg.alt = galleryImgs[currentIndex].alt;
}

galleryImgs.forEach((img, i) => {
  img.parentElement.style.cursor = 'pointer';
  img.parentElement.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  showPrev();
  if (e.key === 'ArrowLeft')   showNext();
});

// ---------- CONTACT FORM (Formspree) ----------
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formSubmitBtn = document.getElementById('formSubmitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'שולחת...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'שלחי הודעה ✦';
        alert('אירעה שגיאה. אנא נסי שוב או פני אלינו בווצאפ.');
      }
    } catch {
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = 'שלחי הודעה ✦';
      alert('אירעה שגיאה. אנא בדקי את החיבור לאינטרנט.');
    }
  });
}

// ---------- ACTIVE NAV LINK ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
