/* contact.js - validates the contact form, builds an email (mailto) and shows the Leaflet map */
(function () {
  'use strict';

  // ---- Where the email is sent. CHANGE THIS to your own address while testing. ----
  const RECIPIENT = 'hello@mahlodibakehouse.co.za';

  // ---- Map with two locations ----
  const mapBox = document.getElementById('map');
  if (mapBox) {
    if (typeof L === 'undefined') {
      mapBox.textContent = 'The map could not load. Please check your internet connection.';
    } else {
      const shops = [
        { name: 'Mahlodi Bakehouse - Hatfield (fictional)', lat: -25.7479, lng: 28.2293, note: '14 Burnett Street, Hatfield, Pretoria' },
        { name: 'Mahlodi Bakehouse - Menlyn (fictional)', lat: -25.7863, lng: 28.2766, note: '220 Lois Avenue, Menlyn, Pretoria' }
      ];
      const map = L.map('map').setView([-25.767, 28.253], 12);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      shops.forEach((s) => {
        const box = document.createElement('div');
        const b = document.createElement('strong'); b.textContent = s.name;
        const p = document.createElement('div'); p.textContent = s.note;
        box.append(b, p);
        L.marker([s.lat, s.lng]).addTo(map).bindPopup(box);
      });
    }
  }

  // ---- Contact form ----
  const form = document.getElementById('contact-form');
  if (!form) return;
  const f = form.elements;
  const preview = document.getElementById('email-preview');

  f.name.addEventListener('blur', () => MB.checkName(f.name));
  f.email.addEventListener('blur', () => MB.checkEmail(f.email));
  f.phone.addEventListener('blur', () => MB.checkPhone(f.phone, false));
  f.topic.addEventListener('change', () => MB.checkSelect(f.topic, 'Please choose a message type.'));
  f.subject.addEventListener('blur', () => MB.checkLength(f.subject, 3, 80, 'The subject'));
  f.message.addEventListener('blur', () => MB.checkLength(f.message, 20, 1000, 'Your message'));

  // character counter
  const counter = document.getElementById('count');
  f.message.addEventListener('input', () => { counter.textContent = f.message.value.length + ' / 1000'; });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = [
      MB.checkName(f.name), MB.checkEmail(f.email), MB.checkPhone(f.phone, false),
      MB.checkSelect(f.topic, 'Please choose a message type.'),
      MB.checkLength(f.subject, 3, 80, 'The subject'),
      MB.checkLength(f.message, 20, 1000, 'Your message')
    ];
    if (ok.includes(false)) {
      const firstBad = form.querySelector('.invalid input, .invalid select, .invalid textarea');
      if (firstBad) firstBad.focus();
      return;
    }

    // Compile the validated data into an email
    const subject = '[' + f.topic.value + '] ' + f.subject.value.trim();
    const body =
      'Name: ' + f.name.value.trim() + '\n' +
      'Email: ' + f.email.value.trim() + '\n' +
      'Phone: ' + (f.phone.value.trim() || 'not given') + '\n' +
      'Message type: ' + f.topic.value + '\n\n' +
      f.message.value.trim();
    const href = 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    // Show a preview with a button that opens the visitor's email app
    preview.hidden = false;
    preview.querySelector('[data-to]').textContent = RECIPIENT;
    preview.querySelector('[data-subject]').textContent = subject;
    preview.querySelector('[data-body]').textContent = body;
    preview.querySelector('a').href = href;
    preview.setAttribute('tabindex', '-1');
    preview.focus();
  });

  form.addEventListener('reset', () => {
    preview.hidden = true; counter.textContent = '0 / 1000';
    form.querySelectorAll('.field').forEach((fl) => { fl.classList.remove('invalid'); fl.querySelector('.error').textContent = ''; });
  });
})();
