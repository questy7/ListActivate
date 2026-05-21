// Scroll-based fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// Mobile nav toggle
const nav    = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const open = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', open);
    // animate hamburger → X
    const spans = toggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });
  // close on link click
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Animate stat bar fills on scroll
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.hv-bar-fill').forEach((bar) => {
          const pct = bar.getAttribute('data-pct') || '0';
          bar.style.width = pct + '%';
        });
        barObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.hero-visual').forEach((el) => {
  // Set initial widths to 0 so they animate in
  el.querySelectorAll('.hv-bar-fill').forEach((b) => { b.style.width = '0'; });
  barObserver.observe(el);
});

// Contact form — prevent default + show confirmation
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#16a34a';
    btn.style.borderColor = '#16a34a';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}
