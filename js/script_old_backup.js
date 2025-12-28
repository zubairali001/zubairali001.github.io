// Toggle mobile navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger icon
    hamburger.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  });
}

// Section link highlighting on scroll
const sections = document.querySelectorAll('main > section, header');
const navItems = document.querySelectorAll('.nav-links a');

function onScroll() {
  const scrollPos = window.pageYOffset + (window.innerHeight / 3);
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (!id) return;
    if (scrollPos >= top && scrollPos < top + height) {
      navItems.forEach(item => item.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll);
// Call once to set initial state
onScroll();

// Modal functionality
const modalButtons = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');

modalButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
    }
  });
});

// Close modals via close button
document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const parentModal = closeBtn.closest('.modal');
    if (parentModal) parentModal.style.display = 'none';
  });
});

// Close modal when clicking outside the content area
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});