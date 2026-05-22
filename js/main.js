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
  el.querySelectorAll('.hv-bar-fill').forEach((b) => { b.style.width = '0'; });
  barObserver.observe(el);
});

// Contact form confirmation
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

// =============================================
// BOOKING MODAL
// =============================================
const BOOKING_SRC = 'https://link.sellflows.com/widget/booking/vpoj33Xt8w0iIZ9bnDEF';

// Inject modal HTML once into the DOM
document.body.insertAdjacentHTML('beforeend', `
  <div class="booking-modal" id="booking-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="booking-modal-inner">
      <div class="booking-modal-header">
        <div>
          <div class="booking-modal-label">Free &middot; No Obligation</div>
          <div class="booking-modal-title" id="modal-title">Book Your Free 15-Minute Call</div>
        </div>
        <button class="booking-modal-close" id="modal-close-btn" aria-label="Close booking modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="booking-modal-body">
        <iframe id="modal-calendar-iframe" src="about:blank" scrolling="yes" style="width:100%;min-height:700px;border:none;display:block;"></iframe>
      </div>
    </div>
  </div>
`);

const bookingModal  = document.getElementById('booking-modal');
const modalIframe   = document.getElementById('modal-calendar-iframe');
let   embedScriptLoaded = false;

function openBookingModal() {
  bookingModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Lazy-load iframe on first open
  if (modalIframe.getAttribute('src') === 'about:blank') {
    modalIframe.src = BOOKING_SRC;
    if (!embedScriptLoaded) {
      const s = document.createElement('script');
      s.src = 'https://link.sellflows.com/js/form_embed.js';
      document.body.appendChild(s);
      embedScriptLoaded = true;
    }
  }
}

function closeBookingModal() {
  bookingModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close-btn').addEventListener('click', closeBookingModal);
bookingModal.addEventListener('click', (e) => {
  if (e.target === bookingModal) closeBookingModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && bookingModal.classList.contains('open')) closeBookingModal();
});

// Wire all "Book a Call" buttons — skip contact page (has inline calendar)
const isContactPage = document.body.classList.contains('contact-page');
if (!isContactPage) {
  const MODAL_TEXTS = [
    'Book a Call',
    'Book Your Free 15-Minute Call',
    'Book Your Free 15-Min Call',
    'Apply to Partner',
  ];
  document.querySelectorAll('a.btn, button.btn').forEach((el) => {
    if (MODAL_TEXTS.includes(el.textContent.trim())) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openBookingModal();
      });
    }
  });
}
