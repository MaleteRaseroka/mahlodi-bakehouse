/* enquiry.js - validates the enquiry form, then uses fetch (AJAX) to load prices and show a quote */
(async function () {
  'use strict';
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const f = form.elements;
  const out = document.getElementById('quote-result');
  let pricing = null;

  // Load pricing data and fill the product drop-down (asynchronously)
  async function loadPricing() {
    if (pricing) return pricing;
    try {
      const res = await fetch('data/pricing.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      pricing = await res.json();
    } catch (err) {
      if (!window.MB_PRICING) throw err;
      pricing = window.MB_PRICING;            // backup data from js/data.js (file opened without a server)
    }
    return pricing;
  }
  try {
    const data = await loadPricing();
    data.products.forEach((p) => {
      const o = document.createElement('option');
      o.value = p.id; o.textContent = p.name + ' (R' + p.price.toFixed(2) + ' ' + p.unit + ')';
      f.product.append(o);
    });
    const wanted = new URLSearchParams(location.search).get('product'); // pre-select from Products page
    if (wanted && data.products.some((p) => p.id === wanted)) f.product.value = wanted;
  } catch (e) {
    showResult('Could not load prices', ['Please run the site with Live Server or view the published website, then try again.'], true);
  }

  // Date limits: tomorrow up to 180 days ahead
  const iso = (d) => d.toISOString().slice(0, 10);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const max = new Date(today); max.setDate(max.getDate() + 180);
  f.date.min = iso(new Date(today.getTime() + 864e5));
  f.date.max = iso(max);

  function checkDate() {
    if (!f.date.value) return MB.setError(f.date, 'Please choose the date you need your order.');
    const d = new Date(f.date.value + 'T00:00:00');
    if (isNaN(d)) return MB.setError(f.date, 'Please enter a valid date.');
    if (d <= today) return MB.setError(f.date, 'Please choose a date after today.');
    if (d > max) return MB.setError(f.date, 'We can only take orders up to 180 days ahead.');
    return MB.setError(f.date, '');
  }
  function checkQty() {
    const n = Number(f.quantity.value);
    if (!Number.isInteger(n) || n < 1 || n > 500) return MB.setError(f.quantity, 'Enter a whole number between 1 and 500.');
    return MB.setError(f.quantity, '');
  }

  // Live validation when a user leaves a field
  f.name.addEventListener('blur', () => MB.checkName(f.name));
  f.email.addEventListener('blur', () => MB.checkEmail(f.email));
  f.phone.addEventListener('blur', () => MB.checkPhone(f.phone, true));
  f.type.addEventListener('change', () => MB.checkSelect(f.type, 'Please choose an enquiry type.'));
  f.product.addEventListener('change', () => MB.checkSelect(f.product, 'Please choose a product.'));
  f.quantity.addEventListener('blur', checkQty);
  f.date.addEventListener('change', checkDate);
  f.message.addEventListener('blur', () => MB.checkLength(f.message, 10, 500, 'Your message'));

  function showResult(title, lines, bad) {
    out.className = 'result' + (bad ? ' bad' : '');
    out.hidden = false;
    const h = document.createElement('h2'); h.textContent = title;
    const ul = document.createElement('ul');
    lines.forEach((t) => { const li = document.createElement('li'); li.textContent = t; ul.append(li); });
    out.replaceChildren(h, ul);
    out.setAttribute('tabindex', '-1');
    out.focus();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const results = [
      MB.checkName(f.name), MB.checkEmail(f.email), MB.checkPhone(f.phone, true),
      MB.checkSelect(f.type, 'Please choose an enquiry type.'),
      MB.checkSelect(f.product, 'Please choose a product.'),
      checkQty(), checkDate(), MB.checkLength(f.message, 10, 500, 'Your message')
    ];
    if (results.includes(false)) {
      const firstBad = form.querySelector('.invalid input, .invalid select, .invalid textarea');
      if (firstBad) firstBad.focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Working out your quote...';
    try {
      const data = await loadPricing();
      const p = data.products.find((x) => x.id === f.product.value);
      const qty = Number(f.quantity.value);
      const when = new Date(f.date.value + 'T00:00:00');
      const lines = [];
      let bad = false;

      // Cost
      let total = p.price * qty;
      lines.push(qty + ' x ' + p.name + ' at R' + p.price.toFixed(2) + ' = R' + total.toFixed(2));
      if (qty >= data.bulkThreshold) {
        const off = total * data.bulkDiscount;
        total -= off;
        lines.push('Bulk discount (' + data.bulkDiscount * 100 + '%): -R' + off.toFixed(2));
      }
      if (f.delivery.checked) { total += data.deliveryFee; lines.push('Delivery in Pretoria: R' + data.deliveryFee.toFixed(2)); }
      lines.push('Estimated total: R' + total.toFixed(2));

      // Availability
      const earliest = new Date(today); earliest.setDate(earliest.getDate() + p.leadDays);
      if (when.getDay() === 0) { bad = true; lines.push('Unavailable: we are closed on Sundays. Please pick another day.'); }
      else if (when < earliest) { bad = true; lines.push('Unavailable: ' + p.name + ' needs ' + p.leadDays + ' day(s) notice. The earliest date is ' + earliest.toDateString() + '.'); }
      else if (qty > p.maxPerDay) { bad = true; lines.push('Limited availability: we can bake up to ' + p.maxPerDay + ' per day. Please split your order or contact us.'); }
      else lines.push('Available: we can have this ready on ' + when.toDateString() + '.');

      lines.push('A confirmation will be sent to ' + f.email.value.trim() + ' once the bakery approves your enquiry.');
      showResult('Thank you, ' + f.name.value.trim().split(' ')[0] + '! Your quote', lines, bad);
    } catch (err) {
      showResult('Something went wrong', ['We could not calculate your quote. Please try again or use the Contact page.'], true);
    } finally {
      btn.disabled = false; btn.textContent = 'Get my quote';
    }
  });

  form.addEventListener('reset', () => {
    out.hidden = true;
    form.querySelectorAll('.field').forEach((fl) => { fl.classList.remove('invalid'); fl.querySelector('.error').textContent = ''; });
  });
})();
