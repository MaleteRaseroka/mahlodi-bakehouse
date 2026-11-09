/* main.js - runs on every page: footer year, scroll animation, tabs, accordion, lightbox */
(function () {
  'use strict';

  // Footer year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Scroll-reveal animation (IntersectionObserver)
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('visible'));
  }

  // Tabs (About page): click + arrow-key support
  document.querySelectorAll('[data-tabs]').forEach((box) => {
    const tabs = Array.from(box.querySelectorAll('[role="tab"]'));
    function select(tab) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      tab.focus();
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length]);
        if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length]);
      });
    });
  });

  // Accordion: only one <details> open at a time
  document.querySelectorAll('[data-accordion]').forEach((group) => {
    const all = group.querySelectorAll('details');
    all.forEach((d) => d.addEventListener('toggle', () => {
      if (d.open) all.forEach((o) => { if (o !== d) o.open = false; });
    }));
  });

  // Gallery lightbox (uses the native <dialog> element)
  const lb = document.getElementById('lightbox');
  const thumbs = Array.from(document.querySelectorAll('.gallery button'));
  if (lb && thumbs.length) {
    const img = lb.querySelector('img');
    const cap = lb.querySelector('figcaption');
    let current = 0;
    function show(i) {
      current = (i + thumbs.length) % thumbs.length;
      const t = thumbs[current];
      img.src = t.dataset.full;
      img.alt = t.dataset.alt;
      cap.textContent = t.dataset.alt;
    }
    thumbs.forEach((t, i) => t.addEventListener('click', () => { show(i); lb.showModal(); }));
    lb.querySelector('[data-prev]').addEventListener('click', () => show(current - 1));
    lb.querySelector('[data-next]').addEventListener('click', () => show(current + 1));
    lb.querySelector('[data-close]').addEventListener('click', () => lb.close());
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); }); // click backdrop to close
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
