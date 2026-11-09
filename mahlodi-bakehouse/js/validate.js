/* validate.js - small shared helpers used by the enquiry and contact forms */
window.MB = (function () {
  'use strict';

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // South African numbers: 0821234567 or +27821234567 (spaces, dashes, brackets allowed)
  const PHONE = /^(\+27|0)[1-9][0-9]{8}$/;

  function setError(input, message) {
    const field = input.closest('.field');
    const out = field.querySelector('.error');
    field.classList.toggle('invalid', Boolean(message));
    input.setAttribute('aria-invalid', Boolean(message));
    out.textContent = message || '';
    return !message;
  }

  function checkName(input) {
    const v = input.value.trim();
    if (v.length < 2) return setError(input, 'Please enter your name (at least 2 characters).');
    if (!/^[A-Za-z\u00C0-\u024F' -]+$/.test(v)) return setError(input, 'Names can only contain letters, spaces, hyphens and apostrophes.');
    return setError(input, '');
  }
  function checkEmail(input) {
    const v = input.value.trim();
    if (!v) return setError(input, 'Please enter your email address.');
    if (!EMAIL.test(v)) return setError(input, 'Enter a valid email address, e.g. name@example.com.');
    return setError(input, '');
  }
  function checkPhone(input, required) {
    const v = input.value.replace(/[\s\-()]/g, '');
    if (!v) return setError(input, required ? 'Please enter your phone number.' : '');
    if (!PHONE.test(v)) return setError(input, 'Enter a valid South African number, e.g. 082 123 4567 or +27 82 123 4567.');
    return setError(input, '');
  }
  function checkSelect(input, msg) {
    return setError(input, input.value ? '' : msg);
  }
  function checkLength(input, min, max, label) {
    const len = input.value.trim().length;
    if (len < min) return setError(input, label + ' must be at least ' + min + ' characters (currently ' + len + ').');
    if (len > max) return setError(input, label + ' must be ' + max + ' characters or fewer (currently ' + len + ').');
    return setError(input, '');
  }

  return { setError, checkName, checkEmail, checkPhone, checkSelect, checkLength };
})();
