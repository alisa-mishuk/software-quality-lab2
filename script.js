document.addEventListener('DOMContentLoaded', () => {
    const seagullLeftContainer = document.getElementById('seagullLeft');
    const seagullRightContainer = document.getElementById('seagullRight');

    const leftSpeechBubble = document.querySelector('#seagullLeft .seagull-speech-bubble p');
    const rightSpeechBubble = document.querySelector('#seagullRight .seagull-speech-bubble p');

    const leftMessage = "Може, мені теж квиток купити? Замовляй, або поїду сам!!!";
    const rightMessage = "Поки ти думаєш... я вже їду!!!";

    function showSeagulls() {
        leftSpeechBubble.textContent = leftMessage;
        rightSpeechBubble.textContent = rightMessage;
        
        seagullLeftContainer.classList.add('show');
        seagullRightContainer.classList.add('show');
        
        setTimeout(() => {
            seagullLeftContainer.classList.remove('show');
            seagullRightContainer.classList.remove('show');
        }, 7000);
    }

    setTimeout(showSeagulls, 5000); 

    setInterval(showSeagulls, 20000);

    // Navigation
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    const mainMenu = document.getElementById('main-menu');

    submenuToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // the menu does not close immediately after opening
            const parent = btn.closest('.has-submenu');
            const isOpen = parent.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            // close other open submenus
            document.querySelectorAll('.has-submenu').forEach(h => {
                if (h !== parent) {
                    h.classList.remove('open');
                    const b = h.querySelector('.submenu-toggle');
                    if (b) b.setAttribute('aria-expanded', 'false');
                }
            });
        });
    });

    // close submenus when clicking outside nav
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav')) {
            document.querySelectorAll('.has-submenu.open').forEach(h => {
                h.classList.remove('open');
                const b = h.querySelector('.submenu-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // also make booking link smooth even if it's not .nav-link
    const bookingLink = document.getElementById('booking-link');
    const bookingSection = document.getElementById('booking');
    if (bookingLink && bookingSection) {
        bookingLink.addEventListener('click', (e) => {
            e.preventDefault();
            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // focus first input for convenience
            const firstInput = bookingSection.querySelector('input, select, textarea, button');
            if (firstInput) firstInput.focus({ preventScroll: true });
        });
    }

    // Розрахунок вартості квитка з усіма опціями

    document.getElementById("bookingForm").addEventListener("submit", function (event) {
        event.preventDefault(); // щоб форма не перезавантажувала сторінку

        const from = document.querySelector("select[name='from']").value;
        const to = document.querySelector("select[name='to']").value;
        const tickets = parseInt(document.getElementById("tickets").value);

        // ЦІНИ МАРШРУТІВ
        const routes = {
            "odesa-kyiv": 550,
            "kyiv-odesa": 550,
            "kyiv-lviv": 600,
            "lviv-kyiv": 600,
            "lviv-warsaw": 1300,
            "warsaw-lviv": 1300,
            "kyiv-warsaw": 1500,
            "warsaw-kyiv": 1500
        };

        const routeKey = `${from}-${to}`;
        let basePrice = routes[routeKey];

        if (!basePrice) {
            alert("Маршрут не знайдено!");
            return;
        }

        // ТРАНСПОРТ
        const transport = document.querySelector("input[name='transport']:checked").value;
        let transportFee = 0;

        if (transport === "bus") {
            transportFee = 150; // автобус — дорожче
        } else {
            transportFee = 0; // мікроавтобус — без націнки
        }

        // ОПЦІЇ
        const wifi = document.querySelector("input[name='wifi']").checked;
        const air = document.querySelector("input[name='air']").checked;
        const socket = document.querySelector("input[name='socket']").checked;

        let optionsFee = 0;
        if (wifi) optionsFee += 20;
        if (air) optionsFee += 30;
        if (socket) optionsFee += 10;

        // РОЗРАХУНОК
        const pricePerTicket = basePrice + transportFee + optionsFee;
        const total = pricePerTicket * tickets;

        // ВИВІД
        alert(`Вартість одного квитка: ${pricePerTicket} грн\nЗагальна вартість: ${total} грн`);
    });

});