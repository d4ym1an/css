const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadRatings();

  document.querySelectorAll('.rating input').forEach(input => {
    input.addEventListener('change', async (event) => {
      const card = event.target.closest('.css-card');
      const cssId = card.dataset.id;
      const rating = event.target.value;

      // Send the rating to the backend
      await fetch('/api/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cssId, rating: parseInt(rating) })
      });

      // Reload ratings after submission
      loadRatings();
    });
  });
});

async function loadRatings() {
  const response = await fetch('/api/ratings');
  const ratings = await response.json();

  document.querySelectorAll('.css-card').forEach(card => {
    const cssId = card.dataset.id;
    const averageRating = ratings[cssId]?.average || 0;
    card.querySelector('.average-rating span').textContent = averageRating.toFixed(1);
  });
}