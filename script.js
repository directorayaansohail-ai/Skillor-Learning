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

// ── NOTIFY BUTTON ──
function notifyMe(courseName) {
  alert('Thanks! We will notify you when ' + courseName + ' launches.');
}