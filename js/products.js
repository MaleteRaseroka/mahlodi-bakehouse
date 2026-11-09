/* products.js - loads products with fetch (AJAX), then search / filter / sort + details dialog */
(async function () {
  'use strict';
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const status = document.getElementById('status');
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const sort = document.getElementById('sort');
  const onlyAvail = document.getElementById('available');
  const dialog = document.getElementById('product-dialog');
  let products = [];

  // 1. Dynamically load the product data
  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    products = await res.json();
  } catch (err) {
    if (window.MB_PRODUCTS) {
      products = window.MB_PRODUCTS;          // backup data from js/data.js (file opened without a server)
    } else {
      status.textContent = 'Sorry, the products could not be loaded. Please try again later.';
      return;
    }
  }

  const money = (n) => 'R' + n.toFixed(2);

  // 2. Build one card with DOM methods (textContent keeps it safe)
  function card(p) {
    const art = document.createElement('article');
    art.className = 'card reveal visible';

    const img = document.createElement('img');
    img.src = 'images/' + p.image + '-400.jpg';
    img.srcset = 'images/' + p.image + '-400.jpg 400w, images/' + p.image + '-800.jpg 800w';
    img.sizes = '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw';
    img.alt = p.alt;
    img.loading = 'lazy';
    img.width = 400; img.height = 300;

    const badge = document.createElement('span');
    badge.className = 'badge' + (p.available ? '' : ' out');
    badge.textContent = p.available ? p.category : p.category + ' - sold out today';

    const h3 = document.createElement('h3'); h3.textContent = p.name;
    const desc = document.createElement('p'); desc.textContent = p.description;
    const price = document.createElement('p'); price.className = 'price'; price.textContent = money(p.price) + ' ' + p.unit;
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'secondary'; btn.textContent = 'View details';
    btn.setAttribute('aria-label', 'View details for ' + p.name);
    btn.addEventListener('click', () => openDialog(p));

    art.append(img, badge, h3, desc, price, btn);
    return art;
  }

  // 3. Filter + sort, then render
  function update() {
    const q = search.value.trim().toLowerCase();
    let list = products.filter((p) =>
      (!q || (p.name + ' ' + p.description + ' ' + p.category).toLowerCase().includes(q)) &&
      (category.value === 'all' || p.category === category.value) &&
      (!onlyAvail.checked || p.available));

    if (sort.value === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort.value === 'price-desc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => a.name.localeCompare(b.name));

    grid.replaceChildren(...list.map(card));
    status.textContent = list.length
      ? 'Showing ' + list.length + ' of ' + products.length + ' products.'
      : 'No products match your search. Try a different word or clear the filters.';
  }

  // 4. Details dialog (modal)
  function openDialog(p) {
    dialog.querySelector('img').src = 'images/' + p.image + '-800.jpg';
    dialog.querySelector('img').alt = p.alt;
    dialog.querySelector('h2').textContent = p.name;
    dialog.querySelector('[data-desc]').textContent = p.description;
    dialog.querySelector('[data-price]').textContent = money(p.price) + ' ' + p.unit + ' | ' + (p.available ? 'Available' : 'Sold out today') + ' | Order ' + p.leadDays + ' day(s) ahead';
    dialog.querySelector('a').href = 'enquiry.html?product=' + encodeURIComponent(p.id);
    dialog.showModal();
  }
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  [search, category, sort, onlyAvail].forEach((el) => el.addEventListener('input', update));
  document.getElementById('clear').addEventListener('click', () => {
    search.value = ''; category.value = 'all'; sort.value = 'name'; onlyAvail.checked = false; update();
  });
  update();
})();
