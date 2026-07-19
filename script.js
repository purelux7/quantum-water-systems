// ===== QUANTUM WATER SYSTEMS =====
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Scroll reveals — with a failsafe so content is never stuck hidden
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
    // failsafe: reveal anything still hidden after 4s (e.g. off-screen restore)
    setTimeout(() => reveals.forEach((el) => el.classList.add('in')), 4000);
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Nav background on scroll
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const burger = $('#burger');
  const links = $('#navLinks');
  burger.addEventListener('click', () => links.classList.toggle('open'));
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));

  // Animated hero counters
  const counters = $$('.num[data-count]');
  const runCount = (el) => {
    const target = +el.dataset.count;
    const dur = 1400, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  // ---- Booking form ----------------------------------------------------
  // CONFIG: set `endpoint` to a form service (Web3Forms/Formspree/your API)
  // to receive submissions silently. Until then, leads are delivered by
  // opening the visitor's email client to `bookingEmail` with details
  // pre-filled — so the form WORKS today with zero backend.
  const CONFIG = {
    bookingEmail: 'donny@pureluxbio.com', // TODO: swap to the Quantum booking inbox
    endpoint: ''                          // TODO: e.g. 'https://api.web3forms.com/submit'
  };

  const form = $('#bookForm');
  const note = $('#formNote');
  const submitBtn = form.querySelector('button[type="submit"]');

  const collect = () => {
    const d = Object.fromEntries(new FormData(form).entries());
    return d;
  };

  const confirm = () => {
    note.hidden = false;
    submitBtn.textContent = 'Received ✓';
    submitBtn.disabled = true;
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const d = collect();

    if (CONFIG.endpoint) {
      try {
        submitBtn.textContent = 'Sending…';
        await fetch(CONFIG.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...d, _subject: 'New installation request — Quantum Water Systems' })
        });
        confirm();
        return;
      } catch (e) { /* fall through to email */ }
    }

    // Email fallback — delivers the lead with no backend
    const body = [
      `Name: ${d.name || ''}`,
      `Email: ${d.email || ''}`,
      `Phone: ${d.phone || ''}`,
      `Interested in: ${d.interest || ''}`,
      `Preferred date: ${d.date || '—'}`,
      `ZIP: ${d.zip || '—'}`,
      '',
      `Notes: ${d.msg || '—'}`
    ].join('\n');
    const mailto = `mailto:${CONFIG.bookingEmail}` +
      `?subject=${encodeURIComponent('Installation request — ' + (d.name || 'New lead'))}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    confirm();
  });

  $('#yr').textContent = new Date().getFullYear();
})();
