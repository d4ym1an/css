// ── Sidebar ──
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');
  closeAllSubMenus();
}

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains('show')) closeAllSubMenus();
  button.nextElementSibling.classList.toggle('show');
  button.classList.toggle('rotate');
  if (sidebar.classList.contains('close')) {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show');
    ul.previousElementSibling.classList.remove('rotate');
  });
}

// ── Cards ──
function toggleCard(card) {
  card.classList.toggle('open');
}

// ── Favorites ──
function toggleFav(btn) {
  const card = btn.closest('.css-card');
  const cardId = card.dataset.id;
  const img = btn.querySelector('img');
  const isFav = img.src.includes('favoriteFill.svg');
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (isFav) {
    img.src = '/favorite.svg';
    card.dataset.filters = card.dataset.filters.split(',').filter(f => f.trim() !== 'favorite').join(',');
    const idx = favorites.indexOf(cardId);
    if (idx > -1) favorites.splice(idx, 1);
  } else {
    img.src = '/favoriteFill.svg';
    if (!card.dataset.filters.split(',').map(f => f.trim()).includes('favorite')) {
      card.dataset.filters += ',favorite';
    }
    if (!favorites.includes(cardId)) favorites.push(cardId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  document.querySelectorAll('.css-card').forEach(card => {
    if (favorites.includes(card.dataset.id)) {
      const img = card.querySelector('.fav-btn img');
      if (img) img.src = '/favoriteFill.svg';
      if (!card.dataset.filters.split(',').map(f => f.trim()).includes('favorite')) {
        card.dataset.filters += ',favorite';
      }
    }
  });
}

// ── Actions ──
function viewCode(url) {
  window.open(url, '_blank');
}

function copyURL(url) {
  const full = location.origin + url;
  navigator.clipboard.writeText(full).then(() => showToast('URL copied to clipboard!'));
}

// ── Toast ──
let _toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Lightbox ──
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  lb.querySelector('img').src = src;
  lb.classList.add('show');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('show');
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  loadFavorites();

  document.getElementById('lightbox').addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
});

window.addEventListener('load', () => {
  document.getElementById('loading-screen').style.display = 'none';
});
