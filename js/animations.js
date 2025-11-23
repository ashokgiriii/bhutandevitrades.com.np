// Smooth Animations and UX Enhancements

// Toast Notification System
class Toast {
    static show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${this.getIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    static getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
}

// Smooth Scroll
function smoothScrollTo(target, offset = 0) {
    const element = document.querySelector(target);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.product-card, .feature-card, .category-card, .service-feature, .brand-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Loading Skeleton
function createSkeletonLoader(count = 6) {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
        skeletons.push(`
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line skeleton-title"></div>
                    <div class="skeleton-line skeleton-text"></div>
                    <div class="skeleton-line skeleton-text short"></div>
                    <div class="skeleton-line skeleton-price"></div>
                </div>
            </div>
        `);
    }
    return skeletons.join('');
}

// Image Lazy Loading
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Enhanced Scroll to Top
function enhanceScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.pageYOffset < 300) {
                    scrollBtn.style.display = 'none';
                }
            }, 300);
        }

        // Hide on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            scrollBtn.style.transform = 'scale(0.8) translateY(20px)';
        } else {
            scrollBtn.style.transform = 'scale(1) translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        Toast.show('Scrolled to top', 'info', 2000);
    });
}

// Page Transition Effect
function initPageTransitions() {
    // Add fade-in effect on page load
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });

    // Smooth link transitions
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                smoothScrollTo(href, 100);
            }
        });
    });
}

// Button Ripple Effect
function addRippleEffect() {
    document.querySelectorAll('.btn, .cta-button, .btn-action').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Product Card Hover Effects
function enhanceProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Search Enhancement with Debounce
function enhanceSearch() {
    const searchInputs = document.querySelectorAll('.search-bar input');
    searchInputs.forEach(input => {
        let timeout;
        input.addEventListener('input', function() {
            clearTimeout(timeout);
            const value = this.value.trim();
            
            if (value.length > 0) {
                this.parentElement.classList.add('searching');
            } else {
                this.parentElement.classList.remove('searching');
            }

            timeout = setTimeout(() => {
                if (value.length >= 2) {
                    // Trigger search
                    if (window.searchManager) {
                        window.searchManager.performSearch(value);
                    }
                }
            }, 300);
        });

        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            setTimeout(() => {
                this.parentElement.classList.remove('focused');
            }, 200);
        });
    });
}

// Loading State Manager
class LoadingManager {
    static show(element, skeleton = true) {
        if (skeleton) {
            element.innerHTML = createSkeletonLoader(6);
            element.classList.add('loading');
        } else {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
        }
    }

    static hide(element) {
        element.classList.remove('loading');
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initLazyLoading();
    enhanceScrollToTop();
    initPageTransitions();
    addRippleEffect();
    enhanceProductCards();
    enhanceSearch();
});

// Export to global scope
window.Toast = Toast;
window.smoothScrollTo = smoothScrollTo;
window.LoadingManager = LoadingManager;
window.createSkeletonLoader = createSkeletonLoader;

