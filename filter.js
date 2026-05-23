function filterCSS() {
  const query = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.css-card').forEach(card => {
    const name = card.querySelector('.card-name').textContent.toLowerCase();
    card.style.display = name.includes(query) ? '' : 'none';
  });
}

function filterByColor() {
  const selected = document.getElementById('color-select').value.toLowerCase();
  document.querySelectorAll('.css-card').forEach(card => {
    const filters = card.dataset.filters.toLowerCase().split(',').map(f => f.trim());
    card.style.display = (!selected || filters.includes(selected)) ? '' : 'none';
  });
}
