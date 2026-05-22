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

// Animate stat bar fills
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.hv-bar-fill').forEach((bar) => {
          bar.style.width = (bar.getAttribute('data-pct') || '0') + '%';
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
// MODALS — Booking Calendar + Contact Form
// =============================================
const CLOSE_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

// Inject both modals into the DOM.
// GHL's form_embed.js identifies iframes by their original IDs and data attributes —
// using the exact IDs from the embed codes is required for the widgets to render.
document.body.insertAdjacentHTML('beforeend', `

  <!-- BOOKING CALENDAR MODAL -->
  <div class="booking-modal" id="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
    <div class="booking-modal-inner">
      <div class="booking-modal-header">
        <div>
          <div class="booking-modal-label">Free &middot; No Obligation</div>
          <div class="booking-modal-title" id="booking-modal-title">Book Your Free 15-Minute Call</div>
        </div>
        <button class="booking-modal-close" id="booking-close-btn" aria-label="Close">${CLOSE_ICON}</button>
      </div>
      <div class="booking-modal-body">
        <iframe
          src="https://link.sellflows.com/widget/booking/vpoj33Xt8w0iIZ9bnDEF"
          id="vpoj33Xt8w0iIZ9bnDEF_1779401772255"
          scrolling="no"
          style="width:100%;min-height:700px;border:none;display:block;">
        </iframe>
      </div>
    </div>
  </div>

  <!-- CONTACT FORM MODAL (SMS Demo / Ask a Question) -->
  <div class="booking-modal" id="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-modal-title">
    <div class="booking-modal-inner">
      <div class="booking-modal-header">
        <div>
          <div class="booking-modal-label">Free &middot; No Commitment</div>
          <div class="booking-modal-title" id="form-modal-title">Get an SMS Demo or Ask a Question</div>
        </div>
        <button class="booking-modal-close" id="form-close-btn" aria-label="Close">${CLOSE_ICON}</button>
      </div>
      <div class="booking-modal-body">
        <iframe
          src="https://link.sellflows.com/widget/form/nfDY4wsE03YsrhDbbFMj"
          id="inline-nfDY4wsE03YsrhDbbFMj"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="List Activate Contact"
          data-height="1153"
          data-layout-iframe-id="inline-nfDY4wsE03YsrhDbbFMj"
          data-form-id="nfDY4wsE03YsrhDbbFMj"
          title="List Activate Contact"
          style="width:100%;height:1153px;border:none;display:block;">
        </iframe>
      </div>
    </div>
  </div>

`);

// Load GHL embed script after iframes are in the DOM
const ghlScript = document.createElement('script');
ghlScript.src  = 'https://link.sellflows.com/js/form_embed.js';
ghlScript.type = 'text/javascript';
document.body.appendChild(ghlScript);

// --- Modal open / close helpers ---
const bookingModal = document.getElementById('booking-modal');
const formModal    = document.getElementById('form-modal');

function openModal(el) {
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(el) {
  el.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('booking-close-btn').addEventListener('click', () => closeModal(bookingModal));
document.getElementById('form-close-btn').addEventListener('click',    () => closeModal(formModal));

bookingModal.addEventListener('click', (e) => { if (e.target === bookingModal) closeModal(bookingModal); });
formModal.addEventListener('click',    (e) => { if (e.target === formModal)    closeModal(formModal);    });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(bookingModal);
    closeModal(formModal);
  }
});

// --- Wire buttons ---
// Contact page has calendar + form inline — skip modal wiring there.
const isContactPage = document.body.classList.contains('contact-page');

const SMS_PHRASES = [];

if (!isContactPage) {

  // Any .btn linking to contact.html → modal.
  // SMS-labelled buttons → form modal. Everything else → booking modal.
  // Nav "Contact" link is a plain <a> without .btn, so it's unaffected.
  const CONTACT_HREFS = ['contact.html', '../contact.html', '/contact'];

  document.querySelectorAll('a.btn').forEach((el) => {
    const href = (el.getAttribute('href') || '').replace(/\?.*$/, '');
    if (CONTACT_HREFS.some((h) => href.endsWith(h))) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const txt = el.textContent.trim();
        const isSms = SMS_PHRASES.some((p) => txt.includes(p));
        openModal(isSms ? formModal : bookingModal);
      });
    }
  });

  // Plain text SMS demo links (non-btn) → form modal
  document.querySelectorAll('a:not(.btn)').forEach((el) => {
    const txt = el.textContent.trim();
    if (SMS_PHRASES.some((p) => txt.includes(p))) {
      el.addEventListener('click', (e) => { e.preventDefault(); openModal(formModal); });
    }
  });
}
