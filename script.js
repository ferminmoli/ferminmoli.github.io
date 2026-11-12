// Marks the section being read in the main nav and adds a rule under the
// header once the page scrolls. Without JS the nav still works as plain links.
(() => {
  const header = document.querySelector('.site-header');
  const links = [...document.querySelectorAll('.nav .sec a[href^="#"]')];
  const sections = links
    .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const visible = new Map();
  const update = () => {
    let current = null;
    for (const s of sections) {
      if (visible.get(s)) { current = s; break; }
    }
    links.forEach((a) => {
      if (current && a.getAttribute('href') === '#' + current.id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => visible.set(e.target, e.isIntersecting));
    update();
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach((s) => io.observe(s));
})();

// Theme toggle. The saved choice is applied before paint by a one-line script
// in <head>; without JS the page follows the system setting.
(() => {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const current = () => root.dataset.theme || (media.matches ? 'dark' : 'light');
  const sync = () => btn.setAttribute('aria-pressed', String(current() === 'dark'));
  btn.hidden = false;
  sync();
  media.addEventListener('change', sync);
  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: still switch for this visit */ }
    sync();
  });
})();

// Sections and rows slide in once as they scroll into view. Skipped when the
// visitor prefers reduced motion; without JS nothing is hidden.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const groups = [
    '.section-head', '.exp-lead', '.earlier .job', '.feature', '.project-row',
    '.archive', '.album', '.single', '.music-foot', '.degree', '.langs-block', '.contact-list > li',
  ];
  let pending = [];
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.setProperty('--d', `${(i % 4) * 70}ms`);
      el.classList.add('reveal');
      pending.push(el);
    });
  });
  // Reveal everything whose top is above the bottom of the screen, including
  // anything skipped over by a jump link, so nothing can stay hidden.
  let queued = false;
  const check = () => {
    queued = false;
    const limit = window.innerHeight * 0.94;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < limit) { el.classList.add('in'); return false; }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(check); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  requestAnimationFrame(check);
})();
