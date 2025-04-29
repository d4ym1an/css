document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".css").forEach((item) => {
        item.children[4].children[0].dataset["url"] = item.children[1].href;
    });
    const codes = document.querySelectorAll(".code");
    const downloads = document.querySelectorAll(".download");
    const copies = document.querySelectorAll(".copy");
    const cred = document.querySelectorAll(".creds");

    codes.forEach((code) => {
        code.addEventListener("mouseenter", () => {
            showPopup(code, "View the source code");
        });
        code.addEventListener("mouseleave", hidePopup);
    });

    downloads.forEach((download) => {
        download.addEventListener("mouseenter", () => {
            showPopup(download, "Download CSS");
        });
        download.addEventListener("mouseleave", hidePopup);
    });

    copies.forEach((copy) => {
        copy.addEventListener("mouseenter", () => {
            showPopup(copy, "Copy CSS (Thanks Sheriff)");
        });
        copy.addEventListener("mouseleave", hidePopup);
        copy.addEventListener("click", () => {
            copyToClipboard(copy.dataset["url"]);
        });
    });

    cred.forEach((creds) => {
        creds.addEventListener("mouseenter", () => {
            showPopup(creds, "Thank you to mitsuha.me for making this css! (discord)");
        });    creds.addEventListener("mouseleave", hidePopup);
    });

});

function showPopup(element, message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = message; // Changed from textContent to innerHTML
    document.body.appendChild(popup);

    const rect = element.getBoundingClientRect();
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.top = `${rect.bottom + window.scrollY}px`;
}

function hidePopup() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
        () => {
            alert("Copied CSS to clipboard!");
        }, () => {
            alert("Failed to copy CSS!");
        }
    );
}


// Stolen From CarrySheriff <333333333