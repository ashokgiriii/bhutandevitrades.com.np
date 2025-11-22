// Main JavaScript functionality for Bhutandevi Traders
document.addEventListener('DOMContentLoaded', async function () {
    console.log('Bhutandevi Traders - Initializing website...');

    // Initialize all components
    await initializeWebsite();
});

// Main initialization function
async function initializeWebsite() {
    try {
        // Load products data first
        await loadProductsData();
        console.log('Products data loaded successfully');

        // Initialize page-specific content
        initializePageContent();

        // Initialize common components
        initializeNavigation();
        initializeSearch();
        initializeModals();
        initializeFloatingButtons();
        initializeScrollEffects();
        initializeServiceArea();
        initializeContactButtons();

        // Initialize animations
        initializeAnimations();

        // Update phone numbers
        updatePhoneNumbers();

        console.log('Website initialized successfully');

    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Initialize page-specific content
function initializePageContent() {
    const currentPage = getCurrentPage();

    switch (currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;

        case 'categories.html':
            initializeCategoriesPage();
            break;

        case 'bike-parts.html':
            initializeBikePartsPage();
            break;

        case 'scooter-parts.html':
            initializeScooterPartsPage();
            break;

        default:
            console.log('Initializing generic page:', currentPage);
    }
}

// Get current page name
function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
}

// Home Page Initialization
function initializeHomePage() {
    console.log('Initializing home page...');

    // Load recent products
    const recentContainer = document.getElementById('recent-products-container');
    if (recentContainer) {
        const recentProducts = getRecentProducts();
        renderProducts(recentProducts, recentContainer);
    }

    // Initialize delivery banner
    initializeDeliveryBanner();

    // Initialize call now section
    initializeCallNowSection();
}

// Categories Page Initialization
function initializeCategoriesPage() {
    console.log('Initializing categories page...');

    // Add click events to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (!e.target.closest('.category-link')) {
                const link = this.querySelector('.category-link');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });

    // Initialize model links
    const modelLinks = document.querySelectorAll('.model-list a');
    modelLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('href').split('=')[1];
            window.location.href = `bike-parts.html?category=${category}`;
        });
    });
}

// Bike Parts Page Initialization
function initializeBikePartsPage() {
    console.log('Initializing bike parts page...');

    const container = document.getElementById('bike-parts-container');
    if (!container) return;

    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';

    // Load bike products
    let bikeProducts = getProductsByType('bike');

    // Filter by category if specified
    if (category !== 'all') {
        bikeProducts = bikeProducts.filter(product => product.category === category);

        // Activate corresponding filter tab
        const filterTab = document.querySelector(`.filter-tab[data-category="${category}"]`);
        if (filterTab) {
            document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
            filterTab.classList.add('active');
        }
    }

    renderProducts(bikeProducts, container);

    // Initialize filter tabs
    initializeFilterTabs('bike');
}

// Scooter Parts Page Initialization
function initializeScooterPartsPage() {
    console.log('Initializing scooter parts page...');

    const container = document.getElementById('scooter-parts-container');
    if (!container) return;

    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';

    // Load scooter products
    let scooterProducts = getProductsByType('scooter');

    // Filter by category if specified
    if (category !== 'all') {
        scooterProducts = scooterProducts.filter(product => product.category === category);

        // Activate corresponding filter tab
        const filterTab = document.querySelector(`.filter-tab[data-category="${category}"]`);
        if (filterTab) {
            document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
            filterTab.classList.add('active');
        }
    }

    renderProducts(scooterProducts, container);

    // Initialize filter tabs
    initializeFilterTabs('scooter');
}

// Initialize filter tabs
function initializeFilterTabs(type) {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const containerId = type === 'bike' ? 'bike-parts-container' : 'scooter-parts-container';
    const container = document.getElementById(containerId);

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            let filteredProducts;

            if (type === 'bike') {
                filteredProducts = getProductsByCategory(category).filter(p => p.type === 'bike');
            } else {
                filteredProducts = getProductsByCategory(category).filter(p => p.type === 'scooter');
            }

            renderProducts(filteredProducts, container);

            // Update URL without page reload
            const newUrl = window.location.pathname + (category === 'all' ? '' : `?category=${category}`);
            window.history.replaceState({}, '', newUrl);
        });
    });
}

// Navigation Initialization
function initializeNavigation() {
    console.log('Initializing navigation...');

    // Set active navigation item
    const currentPage = getCurrentPage();
    const navItems = document.querySelectorAll('.category-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Mobile menu toggle (if needed)
    initializeMobileMenu();
}

// Mobile Menu Initialization
function initializeMobileMenu() {
    // Add mobile menu toggle if needed
    const navContainer = document.querySelector('.nav-container');
    if (window.innerWidth <= 768 && navContainer) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            background: var(--primary);
            color: white;
            border: none;
            padding: 10px;
            border-radius: var(--radius);
            cursor: pointer;
            display: none;
        `;

        navContainer.appendChild(mobileMenuBtn);

        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function () {
            const categoryNav = document.querySelector('.category-nav');
            categoryNav.style.display = categoryNav.style.display === 'flex' ? 'none' : 'flex';
        });

        // Hide menu on resize
        window.addEventListener('resize', function () {
            const categoryNav = document.querySelector('.category-nav');
            if (window.innerWidth > 768) {
                categoryNav.style.display = 'flex';
            }
        });
    }
}

// Search Functionality
function initializeSearch() {
    console.log('Initializing search...');

    const searchInputs = document.querySelectorAll('.search-bar input');

    searchInputs.forEach(input => {
        // Add debounced search
        let timeout;
        input.addEventListener('input', function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });

        // Clear search on escape
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                this.value = '';
                performSearch('');
            }
        });
    });
}

// Perform search
function performSearch(searchTerm) {
    console.log('Searching for:', searchTerm);

    const currentPage = getCurrentPage();
    let filteredProducts = searchProducts(searchTerm);

    // Filter by page type
    if (currentPage === 'bike-parts.html') {
        filteredProducts = filteredProducts.filter(p => p.type === 'bike');
    } else if (currentPage === 'scooter-parts.html') {
        filteredProducts = filteredProducts.filter(p => p.type === 'scooter');
    }

    // Update products display
    switch (currentPage) {
        case 'index.html':
        case '':
            const recentContainer = document.getElementById('recent-products-container');
            if (recentContainer) {
                renderProducts(filteredProducts, recentContainer);
            }
            break;

        case 'bike-parts.html':
            const bikeContainer = document.getElementById('bike-parts-container');
            if (bikeContainer) {
                renderProducts(filteredProducts, bikeContainer);
            }
            break;

        case 'scooter-parts.html':
            const scooterContainer = document.getElementById('scooter-parts-container');
            if (scooterContainer) {
                renderProducts(filteredProducts, scooterContainer);
            }
            break;
    }

    // Show search results count
    showSearchResultsCount(filteredProducts.length, searchTerm);
}

// Show search results count
function showSearchResultsCount(count, searchTerm) {
    // Remove existing count
    const existingCount = document.querySelector('.search-results-count');
    if (existingCount) {
        existingCount.remove();
    }

    if (searchTerm) {
        const searchBar = document.querySelector('.search-bar');
        if (searchBar) {
            const countElement = document.createElement('div');
            countElement.className = 'search-results-count';
            countElement.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 10px;
                border-radius: var(--radius);
                box-shadow: var(--shadow);
                font-size: 0.9rem;
                color: var(--gray);
                z-index: 100;
            `;
            countElement.textContent = `${count} products found for "${searchTerm}"`;
            searchBar.parentNode.appendChild(countElement);

            // Remove count after 3 seconds
            setTimeout(() => {
                countElement.remove();
            }, 3000);
        }
    }
}

// Modal Initialization
function initializeModals() {
    console.log('Initializing modals...');

    // Payment modal
    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal && paymentModal) {
        closeModal.addEventListener('click', () => {
            paymentModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            paymentModal.style.display = 'none';
        }
    });
}

// Floating Buttons Initialization
function initializeFloatingButtons() {
    console.log('Initializing floating buttons...');

    // Create floating buttons if they don't exist
    if (!document.querySelector('.whatsapp-float')) {
        createFloatingButtons();
    }

    // Add click analytics
    const floatingButtons = document.querySelectorAll('.whatsapp-float, .call-float');
    floatingButtons.forEach(button => {
        button.addEventListener('click', function () {
            const type = this.classList.contains('whatsapp-float') ? 'whatsapp' : 'call';
            trackConversion(type);
        });
    });
}

// Create floating buttons
function createFloatingButtons() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-buttons';

    floatingContainer.innerHTML = `
        <a href="https://wa.me/9779841000000" class="whatsapp-float" target="_blank" title="Chat on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
        <a href="tel:+9779841000000" class="call-float" title="Call Now">
            <i class="fas fa-phone"></i>
        </a>
    `;

    document.body.appendChild(floatingContainer);
}

// Scroll Effects
function initializeScrollEffects() {
    console.log('Initializing scroll effects...');

    // Header shadow on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'var(--shadow)';
            }
        });
    }

    // Scroll to top button
    createScrollToTopButton();
}

// Create scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 25px;
        left: 25px;
        background: var(--primary);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow);
        z-index: 1000;
        display: none;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.alignItems = 'center';
            scrollBtn.style.justifyContent = 'center';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Service Area Initialization
function initializeServiceArea() {
    console.log('Initializing service area...');

    // Add click handlers for area tags
    const areaTags = document.querySelectorAll('.area-tag');
    areaTags.forEach(tag => {
        tag.addEventListener('click', function () {
            const area = this.textContent;
            showAreaNotification(area);
        });
    });
}

// Show area notification
function showAreaNotification(area) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary);
        color: white;
        padding: 20px 30px;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 1001;
        text-align: center;
    `;
    notification.innerHTML = `
        <h4>🚚 Free Delivery in ${area}</h4>
        <p>We provide free delivery in ${area} area</p>
        <button onclick="this.parentElement.remove()" style="
            background: white;
            color: var(--primary);
            border: none;
            padding: 8px 16px;
            border-radius: var(--radius);
            cursor: pointer;
            margin-top: 10px;
        ">OK</button>
    `;

    document.body.appendChild(notification);
}

// Contact Buttons Initialization
function initializeContactButtons() {
    console.log('Initializing contact buttons...');

    // Add click handlers to all call buttons
    const callButtons = document.querySelectorAll('.call-btn, .call-now-small');
    callButtons.forEach(button => {
        button.addEventListener('click', function () {
            trackConversion('call');
        });
    });

    // Add click handlers to all WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function () {
            trackConversion('whatsapp');
        });
    });
}

// Animations Initialization
function initializeAnimations() {
    console.log('Initializing animations...');

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .feature-card, .category-card, .service-feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Delivery Banner Initialization
function initializeDeliveryBanner() {
    const deliveryBanner = document.querySelector('.delivery-banner');
    if (deliveryBanner) {
        // Make banner sticky after scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                deliveryBanner.style.position = 'fixed';
                deliveryBanner.style.top = '0';
                deliveryBanner.style.left = '0';
                deliveryBanner.style.right = '0';
                deliveryBanner.style.zIndex = '1000';
            } else {
                deliveryBanner.style.position = 'relative';
            }
        });
    }
}

// Call Now Section Initialization
function initializeCallNowSection() {
    const callNowSection = document.querySelector('.call-now-section');
    if (callNowSection) {
        // Add pulse animation to call icon
        const callIcon = callNowSection.querySelector('.call-now-icon');
        if (callIcon) {
            setInterval(() => {
                callIcon.style.transform = callIcon.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
            }, 1000);
        }
    }
}

// Update Phone Numbers
function updatePhoneNumbers() {
    const phoneNumbers = {
        '9841XXXXXX': '+9779841000000', // Replace with actual numbers
        '9841XXXXXX': '+9779841000001'  // Replace with actual numbers
    };

    // Update all phone number elements
    document.querySelectorAll('[href^="tel:"]').forEach(link => {
        const currentNumber = link.getAttribute('href').replace('tel:', '');
        if (phoneNumbers[currentNumber]) {
            link.setAttribute('href', `tel:${phoneNumbers[currentNumber]}`);
        }
    });

    // Update text content
    document.querySelectorAll('span, p').forEach(element => {
        Object.keys(phoneNumbers).forEach(oldNumber => {
            if (element.textContent.includes(oldNumber)) {
                element.textContent = element.textContent.replace(oldNumber, phoneNumbers[oldNumber].replace('+977', ''));
            }
        });
    });
}

// Analytics and Tracking
function trackConversion(type) {
    const conversions = JSON.parse(localStorage.getItem('conversions') || '{}');
    const today = new Date().toDateString();

    if (!conversions[today]) {
        conversions[today] = { calls: 0, whatsapp: 0, total: 0 };
    }

    conversions[today][type]++;
    conversions[today].total++;

    localStorage.setItem('conversions', JSON.stringify(conversions));
    console.log(`Conversion tracked: ${type}`, conversions[today]);
}

// Get conversion analytics
function getConversionAnalytics() {
    return JSON.parse(localStorage.getItem('conversions') || '{}');
}

// Utility Functions
function formatPrice(price) {
    return 'Rs. ' + price.toLocaleString('en-NP');
}

function getCurrentTime() {
    return new Date().toLocaleTimeString('en-NP');
}

function isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 18; // 9 AM to 6 PM
}

// Error Handling
window.addEventListener('error', function (e) {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export functions to global scope
window.trackConversion = trackConversion;
window.getConversionAnalytics = getConversionAnalytics;
window.formatPrice = formatPrice;
window.getCurrentTime = getCurrentTime;
window.isBusinessHours = isBusinessHours;
window.showAreaNotification = showAreaNotification;

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function () {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
}

console.log('Main.js loaded successfully');