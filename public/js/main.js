// ── Loading Spinner ────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1000);
});

// ── Hamburger Menu ─────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ── Active Nav Link ────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Scroll Fade-in (Intersection Observer) ─────────────────
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// ── Back to Top ────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  }
});
if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── FAQ Accordion ──────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.style.maxHeight = null;
    });
    // Open clicked
    if (!isOpen) {
      btn.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ── Appointment Form ───────────────────────────────────────
const apptForm = document.getElementById('apptForm');
if (apptForm) {
  apptForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = apptForm.querySelector('.form-submit');
    const msg = document.getElementById('apptMsg');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(apptForm));
    try {
      const res  = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      msg.className = 'form-msg ' + (json.success ? 'success' : 'error');
      msg.textContent = json.message;
      if (json.success) apptForm.reset();
    } catch {
      msg.className = 'form-msg error';
      msg.textContent = 'Network error. Please call us directly.';
    } finally {
      btn.textContent = 'Book My Appointment';
      btn.disabled = false;
    }
  });
}

// ── Contact Form ───────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const msg = document.getElementById('contactMsg');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(contactForm));
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      msg.className = 'form-msg ' + (json.success ? 'success' : 'error');
      msg.textContent = json.message;
      if (json.success) contactForm.reset();
    } catch {
      msg.className = 'form-msg error';
      msg.textContent = 'Network error. Please call us directly.';
    } finally {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }
  });
}
