// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ── FAQ ACCORDION ──
function toggleFaq(btn) {
  const ans = btn.nextElementSibling;
  const isOpen = ans.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-ans').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-btn').forEach(b => b.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) {
    ans.classList.add('open');
    btn.classList.add('open');
  }
}

// ── REUSABLE POPUP SYSTEM ──
function lockScroll(shouldLock) {
  document.body.style.overflow = shouldLock ? 'hidden' : 'auto';
}

function openPopup(mode, courseName = '') {
  const modal = document.getElementById('enrollModal');
  const title = document.getElementById('popupTitle');
  const enrollView = document.getElementById('enrollView');
  const notifyView = document.getElementById('notifyView');
  const joinCommunityBtn = document.getElementById('joinCommunityBtn');

  if (mode === 'notify') {
    title.textContent = courseName ? `Notify Me: ${courseName}` : 'Course Updates';
    enrollView.style.display = 'none';
    notifyView.style.display = 'block';
    joinCommunityBtn.href = 'https://chat.whatsapp.com/Gpl7ivEduUSLgckb1aHgBe';
  } else {
    title.textContent = 'Enroll in AI-Integrated Digital Marketing Course';
    notifyView.style.display = 'none';
    enrollView.style.display = 'block';
  }

  modal.style.display = 'block';
  lockScroll(true);
}

function openEnrollModal() {
  openPopup('enroll');
}

function openNotifyModal(courseName) {
  openPopup('notify', courseName);
}

function closeEnrollModal() {
  document.getElementById('enrollModal').style.display = 'none';
  lockScroll(false);
}

// ── NOTIFY BUTTON ──
function notifyMe(courseName) {
  openNotifyModal(courseName);
}

// Close modal when clicking outside
document.addEventListener('click', function (e) {
  const modal = document.getElementById('enrollModal');
  if (e.target === modal) {
    closeEnrollModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && document.getElementById('enrollModal').style.display === 'block') {
    closeEnrollModal();
  }
});

// Auto-show modal sometimes (30% chance, after 10 seconds)
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    if (Math.random() < 0.3) { // 30% chance
      openEnrollModal();
    }
  }, 10000); // 10 seconds delay
});

// ── FORM SUBMISSION ──
function submitEnrollForm(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const phone = form.querySelector('#phone').value.trim();
  const goals = form.querySelector('#goals').value.trim();
  const experience = form.querySelector('#experience').value;
  const whatsappField = form.querySelector('#whatsapp');
  const whatsapp = whatsappField ? whatsappField.value : 'false';

  if (!name || !email || !phone) {
    alert('Please complete Name, Email, and Phone.');
    return;
  }

  const submitBtn = form.querySelector('.submit-btn');
  const initialText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const payload = { name, email, phone, goals, experience, whatsapp };
  const url = 'https://script.google.com/macros/s/AKfycbwqarcr1GdQoL3KCvTv0jiqVmfOZuELuAVQBCjMZY9YnT4fSXHnfhIbl0Yji2PAcpOH/exec';

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    const success = document.getElementById('successMsg');
    success.style.display = 'block';

// wait 2s BEFORE closing modal
setTimeout(() => {
  form.reset();
  closeEnrollModal();
  success.style.display = 'none';
}, 2000);
  })
  .catch(err => {
    console.error('Submit error:', err);
    alert('Something went wrong.');
  })
  .finally(() => {
    submitBtn.textContent = initialText;
    submitBtn.disabled = false;
  });
}