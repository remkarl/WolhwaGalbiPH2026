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

async function loadEvents() {
  const container = document.getElementById('eventsContainer');
  const files = ['greenhills-opening.json','holiday-launch.json'];
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
