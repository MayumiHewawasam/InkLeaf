// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('nav-overlay');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    overlay.classList.toggle('show');
    hamburger.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    navLinks.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
});

// Search toggle
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) {
        searchInput.focus();
    }
});

// Search functionality
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        const pages = {
            'home': 'index.html',
            'synopsis': 'synopsis.html',
            'author': 'author.html',
            'buy': 'buy.html',
            'book': 'buy.html',
            'diary': 'buy.html',
            'paperback': 'buy.html',
            'price': 'buy.html',
            'purchase': 'buy.html',
            'about': 'author.html',
            'chapter': 'synopsis.html',
        };

        let found = null;
        for (const [key, page] of Object.entries(pages)) {
            if (query.includes(key)) {
                found = page;
                break;
            }
        }

        if (found) {
            window.location.href = found;
        } else {
            searchInput.style.borderColor = 'red';
            searchInput.placeholder = 'Nothing found...';
            setTimeout(() => {
                searchInput.style.borderColor = '';
                searchInput.placeholder = 'Search...';
            }, 1500);
        }
    }
});