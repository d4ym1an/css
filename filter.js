function filterCSS() {
    const query = document.getElementById('search').value.toLowerCase();
    const parts = document.querySelectorAll('.part');

    parts.forEach(part => {
        const title = part.querySelector('h2').textContent.toLowerCase();
        if (title.includes(query)) {
            part.style.display = '';
        } else {
            part.style.display = 'none';
        }
    });
}

function filterByColor() {
    const selectedColor = document.getElementById('color-select').value.toLowerCase();
    const parts = document.querySelectorAll('.part');

    parts.forEach(part => {
        const filters = part.getAttribute('data-filters').split(',');
        if (!selectedColor || filters.includes(selectedColor)) {
            part.style.display = '';
        } else {
            part.style.display = 'none';
        }
    });
}
