const burger = document.getElementById('burgerMenu');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('sidebarOverlay');

burger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

/* Safety: reset sidebar when switching to desktop */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }
});

const navLinks = document.querySelectorAll('.sidebar .nav a');
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    }
  });
});

}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
