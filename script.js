// Nav shadow on scroll
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
      mobileMenu.setAttribute('aria-hidden', true);
    });
  });
}

// Language toggle
function setLang(lang) {
  if (lang === 'es') {
    document.body.classList.add('es');
    document.documentElement.lang = 'es';
  } else {
    document.body.classList.remove('es');
    document.documentElement.lang = 'en';
  }
  // Update all toggle button labels
  document.querySelectorAll('#langToggle, #langToggleMobile').forEach(btn => {
    btn.textContent = lang === 'es' ? 'EN' : 'Español';
    btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
  });
  localStorage.setItem('upcc-lang', lang);
}

document.querySelectorAll('#langToggle, #langToggleMobile').forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      setLang(document.body.classList.contains('es') ? 'en' : 'es');
    });
  }
});

// Restore saved language preference
const savedLang = localStorage.getItem('upcc-lang');
if (savedLang) setLang(savedLang);

// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
