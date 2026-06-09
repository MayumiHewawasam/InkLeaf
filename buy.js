const modal = document.getElementById('bookModal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

// Close modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

// Book menu — click to highlight card
const menuItems = document.querySelectorAll('.book-menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const target = document.getElementById(item.dataset.target);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('card-highlight');
            setTimeout(() => target.classList.remove('card-highlight'), 1200);
        }
    });
});

// Book menu search
const bookSearch = document.getElementById('book-search');
if (bookSearch) {
    bookSearch.addEventListener('input', () => {
        const q = bookSearch.value.toLowerCase();
        menuItems.forEach(item => {
            const name = item.querySelector('.book-menu-name').textContent.toLowerCase();
            item.style.display = name.includes(q) ? 'flex' : 'none';
        });
    });
}


// Diary images
const diaryImages = [
    { src: 'assets/Daily Reminder.jpg', caption: 'Cover' },
    { src: 'assets/Daily Reminder.jpg', caption: 'Page 1' },
    { src: 'assets/Daily Reminder.jpg', caption: 'Page 2' },
];

let currentSlide = 0;

function buildCarousel(images) {
    return `
        <div class="carousel">
            <button class="carousel-btn prev-btn" onclick="changeSlide(-1)">&#8592;</button>
            <div class="carousel-track">
                ${images.map((img, i) => `
                    <div class="carousel-slide ${i === 0 ? 'active' : ''}">
                        <img src="${img.src}" alt="${img.caption}">
                        <span class="carousel-caption">${img.caption}</span>
                    </div>
                `).join('')}
            </div>
            <button class="carousel-btn next-btn" onclick="changeSlide(1)">&#8594;</button>
            <div class="carousel-dots">
                ${images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>`).join('')}
            </div>
        </div>
    `;
}

function buildQuantity() {
    return `
        <div class="qty-wrap">
            <span class="qty-label">Quantity</span>
            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQty(-1)">−</button>
                <span class="qty-count" id="qty-count">1</span>
                <button class="qty-btn" onclick="changeQty(1)">+</button>
            </div>
        </div>
    `;
}

window.changeQty = function (dir) {
    const el = document.getElementById('qty-count');
    let val = parseInt(el.textContent) + dir;
    if (val < 1) val = 1;
    el.textContent = val;

    // Buy button price update
    const buyBtn = document.getElementById('buy-btn');
    if (buyBtn) {
        const basePrice = parseFloat(buyBtn.dataset.price);
        const total = (basePrice * val).toFixed(2);
        buyBtn.textContent = buyBtn.dataset.label + ' — $' + total;
    }
};

window.changeSlide = function (dir) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + dir + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
};

window.goToSlide = function (index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
};

// Diary Card Click
document.querySelector('.diary-card').addEventListener('click', () => {
    currentSlide = 0;
    modalBody.innerHTML = `
        <div class="modal-inner">
            <div class="modal-photo">
                ${buildCarousel(diaryImages)}
            </div>
            <div class="modal-details">
                <div>
                    <h2>Diary</h2>
                    <div class="modal-price">$9.19</div>
                    <p class="modal-desc">Perfect for writing on your daily goals and tracking progress.</p>
                    <ul>
                        <li>High quality printing</li>
                        <li>Customizable colors</li>
                        <li>50 pages (customizable)</li>
                        <li>Premium paper quality</li>
                    </ul>
                    ${buildQuantity()}
                </div>
                <button id="buy-btn" data-price="9.19" data-label="Buy Diary" class="btn-primary" style="width:100%; padding:1rem;">Buy Diary — $9.19</button>
            </div>
        </div>
    `;
    modal.style.display = "flex";
});

// Paperback Book Card Click
document.querySelector('.paperback-card').addEventListener('click', () => {
    currentSlide = 0;
    modalBody.innerHTML = `
        <div class="modal-inner">
            <div class="modal-photo">
                ${buildCarousel([
        { src: 'assets/book.png', caption: 'Cover' },
        { src: 'assets/book.png', caption: 'Page 1' },
        { src: 'assets/book.png', caption: 'Page 2' },
    ])}
            </div>
            <div class="modal-details">
                <div>
                    <h2>Paperback Book</h2>
                    <div class="modal-price">$14.99</div>
                    <p class="modal-desc">The complete guide to unlocking your true potential.</p>
                    <ul>
                        <li>High quality paperback print</li>
                        <li>200+ pages of actionable content</li>
                        <li>Free digital copy included</li>
                        <li>Worldwide shipping available</li>
                    </ul>
                    ${buildQuantity()}
                </div>
                <button id="buy-btn" data-price="14.99" data-label="Buy Paperback" class="btn-primary" style="width:100%; padding:1rem;">Buy Paperback — $14.99</button>
            </div>
        </div>
    `;
    modal.style.display = "flex";
});