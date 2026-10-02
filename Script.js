// Tell CSS that JavaScript is running (so scroll-reveal can safely hide things)
document.documentElement.classList.add('js');

/* ========== 1. HAMBURGER MENU ========== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
  const isOpen = navLinks.classList.toggle('open'); // add/remove the "open" class
  navToggle.setAttribute('aria-expanded', isOpen);  // tells screen readers the state
});

// Close the menu after a link is tapped (mobile)
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ========== 2. MENU CATEGORY FILTER ========== */
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.card');

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const chosen = button.dataset.filter; // e.g. "cakes" from data-filter="cakes"

    // Highlight only the clicked button
    filterButtons.forEach(function (b) { b.classList.remove('active'); });
    button.classList.add('active');

    // Show a card if "all" is chosen or its category matches
    menuCards.forEach(function (card) {
      card.hidden = !(chosen === 'all' || card.dataset.category === chosen);
    });
  });
});

/* ========== 3. GALLERY LIGHTBOX ========== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
let lastClicked = null; // remember which thumbnail opened it, to return focus

document.querySelectorAll('.gallery-item').forEach(function (item) {
  item.addEventListener('click', function () {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
    lastClicked = item;
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  if (lastClicked) { lastClicked.focus(); }
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (event) {
  if (event.target === lightbox) { closeLightbox(); } // click on dark background
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !lightbox.hidden) { closeLightbox(); }
});

/* ========== 4. FORM VALIDATION ========== */
const form = document.getElementById('enquiryForm');
const successMessage = document.getElementById('formSuccess');

// Show or clear an error under a field
function setError(fieldId, message) {
  const input = document.getElementById(fieldId);
  document.getElementById(fieldId + 'Error').textContent = message;
  input.classList.toggle('invalid', message !== '');
}

form.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading
  successMessage.hidden = true;
  let isValid = true;

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name.length < 2) { setError('name', 'Please enter your name.'); isValid = false; }
  else { setError('name', ''); }

  // 10 digits only (Indian mobile style)
  if (!/^[0-9]{10}$/.test(phone)) { setError('phone', 'Enter a 10-digit phone number.'); isValid = false; }
  else { setError('phone', ''); }

  // Simple email check: something@something.something
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Enter a valid email address.'); isValid = false; }
  else { setError('email', ''); }

  if (message.length < 10) { setError('message', 'Please write at least 10 characters.'); isValid = false; }
  else { setError('message', ''); }

  if (isValid) {
    // Send form data to Formsubmit.co via AJAX so the page doesn't reload
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json' // This prevents Formsubmit from redirecting to a thank-you page
      }
    })
    .then(response => {
      if (response.ok) {
        successMessage.hidden = false;
        form.reset();
      } else {
        alert('Oops! Something went wrong and we couldn\'t send your message.');
      }
    })
    .catch(error => {
      alert('Oops! There was a network error while sending.');
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  }
});

/* ========== 5. SCROLL REVEAL ========== */
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(function (item) { observer.observe(item); });
} else {
  revealItems.forEach(function (item) { item.classList.add('visible'); }); // old browsers
}

/* ========== 6. BACK TO TOP BUTTON ========== */
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', function () {
  toTop.hidden = window.scrollY < 400; // show after scrolling 400px
});
toTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========== 7. FOOTER YEAR ========== */
document.getElementById('year').textContent = new Date().getFullYear();