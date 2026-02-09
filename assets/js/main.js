const burger = document.getElementById('burgerMenu');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('sidebarOverlay');
const navLinks = document.querySelectorAll('.sidebar .nav a');
const sections = document.querySelectorAll('section[id]');

/* ===== BURGER MENU + OVERLAY TOGGLE ===== */
burger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

/* ===== SAFE RESIZE HANDLER ===== */
/* Close sidebar on desktop when resizing */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }
});

/* ===== ACTIVE LINK DETECTION ===== */
function setActiveLink() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    /* Detect if in viewport (with offset) */
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  /* Update active states */
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ===== AUTO-CLOSE MENU ON LINK CLICK ===== */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    }
  });
});

/* ===== SCROLL & LOAD EVENTS ===== */
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

/* ===== LOAD EVENTS ===== */
async function loadEvents() {
  const container = document.getElementById('eventsContainer');
  const files = ['greenhills-opening.json', 'holiday-launch.json'];
  let found = false;

  for (const f of files) {
    try {
      const res = await fetch(`content/events/${f}`);
      if (!res.ok) continue;
      const e = await res.json();
      container.innerHTML += `
        <article class="event-card">
          <h3>${e.title}</h3>
          <p class="date">${e.date}</p>
          <p>${e.description}</p>
        </article>`;
      found = true;
    } catch {}
  }

  if (!found) {
    container.innerHTML = '<p>No upcoming events.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadEvents);
