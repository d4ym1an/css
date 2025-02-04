document.addEventListener('DOMContentLoaded', () => {
    const codes = document.querySelectorAll('.code');
    const downloads = document.querySelectorAll('.download');
    const copies = document.querySelectorAll('.copy');

    codes.forEach(code => {
        code.addEventListener('mouseenter', () => {
            showPopup(code, 'View the source code');
        });
        code.addEventListener('mouseleave', hidePopup);
    });

    downloads.forEach(download => {
        download.addEventListener('mouseenter', () => {
            showPopup(download, 'Download CSS');
        });
        download.addEventListener('mouseleave', hidePopup);
    });

    copies.forEach(copy => {
        copy.addEventListener('mouseenter', () => {
            showPopup(copy, 'COPY FEATURE CURRENTLY DISABLED');
        });
        copy.addEventListener('mouseleave', hidePopup);
        copy.addEventListener('click', () => {
            fetch('copy.html')
                .then(response => response.text())
                .then(text => {
                    navigator.clipboard.writeText(text).then(() => {
                        alert('COPY FEATURE CURRENTLY DISABLED');
                    });
                });
        });
    });
});

function showPopup(element, message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);

    const rect = element.getBoundingClientRect();
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.top = `${rect.bottom + window.scrollY}px`;
}

function hidePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}
