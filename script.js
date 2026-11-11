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
