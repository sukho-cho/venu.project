// Burger popup toggle + accessibility
const burgerToggle = document.getElementById('burgerToggle');
const burgerPopup = document.getElementById('burgerPopup');

function openBurger() {
    // compute popup position relative to the viewport (fixed positioning)
    const rect = burgerToggle.getBoundingClientRect();
    const popupWidth = burgerPopup.offsetWidth || 220;
    // position the popup centered under the burger icon
    const top = rect.bottom + 8; // viewport coordinates
    const left = rect.left + (rect.width / 2) - (popupWidth / 2);

    burgerPopup.style.top = `${Math.max(8, top)}px`;
    burgerPopup.style.left = `${Math.max(8, left)}px`;

    // reveal the popup using the CSS .open class (controls visibility/opacity)
    burgerPopup.classList.add('open');
    burgerPopup.setAttribute('aria-hidden', 'false');
    burgerToggle.setAttribute('aria-expanded', 'true');
}

function closeBurger() {
    burgerPopup.classList.remove('open');
    burgerPopup.setAttribute('aria-hidden', 'true');
    burgerToggle.setAttribute('aria-expanded', 'false');
    // clear inline positioning and any inline visibility flags
    burgerPopup.style.top = '';
    burgerPopup.style.left = '';
    burgerPopup.style.visibility = '';
}

if (burgerToggle && burgerPopup) {
    let ignoreDocumentClick = false;

    burgerToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        // briefly ignore the next document click to avoid accidental immediate close
        ignoreDocumentClick = true;
        setTimeout(() => { ignoreDocumentClick = false; }, 250);

        if (burgerPopup.classList.contains('open')) {
            closeBurger();
        } else {
            openBurger();
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (ignoreDocumentClick) return;
        if (!burgerPopup.contains(e.target) && !burgerToggle.contains(e.target)) {
            closeBurger();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBurger();
        }
    });
}

// Favorite button toggles (kept from previous inline script)
document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        button.classList.toggle('active');
    });
});

// Set current year in footer automatically
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});