// =====================================================
// contact.js — optional, only needed on contact.html
// Client-side validation + submission for the contact form.
// =====================================================

const FORM_ENDPOINT = 'https://formspree.io/f/xqerjnkv';

const contactForm = document.getElementById('contact-form');

function setFieldError(field, message) {
  const errorEl = field.parentElement.querySelector('.error-msg');
  if (errorEl) errorEl.textContent = message;
}

function validateField(field) {
  if (field.validity.valid) {
    setFieldError(field, '');
    return true;
  }
  if (field.validity.valueMissing) {
    setFieldError(field, 'This field is required.');
  } else if (field.validity.typeMismatch && field.type === 'email') {
    setFieldError(field, 'Enter a valid email address.');
  } else {
    setFieldError(field, 'Please check this field.');
  }
  return false;
}

if (contactForm) {
  const fields = contactForm.querySelectorAll('input[required], textarea[required]');
  const statusEl = document.getElementById('form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allValid = true;
    fields.forEach(field => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      statusEl.textContent = 'Please fix the highlighted fields.';
      statusEl.className = 'form-status show err';
      return;
    }

    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      statusEl.textContent = "Form backend isn't connected yet — see the setup note at the top of js/contact.js.";
      statusEl.className = 'form-status show err';
      return;
    }

    submitBtn.disabled = true;
    statusEl.textContent = 'Sending…';
    statusEl.className = 'form-status show';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm),
      });

      if (response.ok) {
        statusEl.textContent = "Thanks — your message is on its way. I'll get back to you soon.";
        statusEl.className = 'form-status show ok';
        contactForm.reset();
      } else {
        statusEl.textContent = "Something went wrong sending that — try again, or email me directly.";
        statusEl.className = 'form-status show err';
      }
    } catch (err) {
      statusEl.textContent = "Couldn't reach the server — check your connection and try again.";
      statusEl.className = 'form-status show err';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
