// Burger popup controller re-attached after markup revert
(() => {
    const toggle = document.getElementById('burgerToggle');
    const popup = document.getElementById('burgerPopup');
    if (!toggle || !popup) return;

    let isOpen = false;

    const positionPopup = () => {
        const toggleRect = toggle.getBoundingClientRect();
        const parentRect = popup.offsetParent
            ? popup.offsetParent.getBoundingClientRect()
            : { top: 0, left: 0 };

        const width = popup.offsetWidth || 220;
        const rawTop = toggleRect.bottom - parentRect.top + 8;
        const rawLeft = toggleRect.right - parentRect.left - width - 16;

        popup.style.top = `${Math.max(0, rawTop)}px`;
        popup.style.left = `${Math.max(0, rawLeft)}px`;
    };

    const close = () => {
        if (!isOpen) return;
        isOpen = false;
        popup.classList.remove('open');
        popup.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', handleOutside, true);
        document.removeEventListener('keydown', handleKey);
    };

    const open = () => {
        if (isOpen) return;
        isOpen = true;
        popup.classList.add('open');
        popup.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(positionPopup);
        document.addEventListener('click', handleOutside, true);
        document.addEventListener('keydown', handleKey);
    };

    const handleOutside = (evt) => {
        if (!popup.contains(evt.target) && !toggle.contains(evt.target)) {
            close();
        }
    };

    const handleKey = (evt) => {
        if (evt.key === 'Escape') {
            close();
        }
    };

    toggle.addEventListener('click', (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        isOpen ? close() : open();
    });

    const handleViewportChange = () => {
        if (isOpen) {
            positionPopup();
        }
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportChange);
        window.visualViewport.addEventListener('scroll', handleViewportChange);
    }
})();

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

