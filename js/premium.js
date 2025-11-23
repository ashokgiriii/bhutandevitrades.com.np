// Premium Website Enhancements

// Header Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});

// Premium Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .hero-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Premium Cursor Effect (Optional - for desktop)
function initCursorEffect() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'premium-cursor';
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        document.querySelectorAll('a, button, .product-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'rgba(230, 57, 70, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }
}

// Premium Page Load Animation
function initPageLoadAnimation() {
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
        
        // Animate elements on load
        const animatedElements = document.querySelectorAll('.product-card, .feature-card, .category-card');
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'fadeInUp 0.6s ease forwards';
                el.style.opacity = '0';
            }, index * 100);
        });
    });
}

// Premium Intersection Observer
function initPremiumAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .feature-card, .category-card, .brand-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Premium Number Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Premium Image Lazy Load with Blur
function initPremiumLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.style.filter = 'blur(0px)';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.filter = 'blur(10px)';
        img.style.transition = 'filter 0.5s ease';
        imageObserver.observe(img);
    });
}

// Premium Smooth Scroll
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

// Premium Button Ripple Effect (Enhanced)
function addPremiumRipple() {
    document.querySelectorAll('.btn, .cta-button, .btn-action, .btn-compact').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Premium Product Card Tilt Effect
function initCardTilt() {
    document.querySelectorAll('.product-card, .category-quick-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Premium Search Enhancement
function enhanceSearch() {
    const searchInputs = document.querySelectorAll('.search-bar input');
    
    searchInputs.forEach(input => {
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

// Premium Particle Background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-bg';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Premium Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 10000;
        width: 0%;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(230, 57, 70, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Premium Typing Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Premium Image Zoom on Hover
function initImageZoom() {
    document.querySelectorAll('.product-image img').forEach(img => {
        img.style.transition = 'transform 0.5s ease';
        
        img.parentElement.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
        });
        
        img.parentElement.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// Premium Counter Animation for Stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3, .product-count, .model-count');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target, number);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Premium Loading Screen
function initLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'premium-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-secondary);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transition: opacity 0.5s ease;
    `;
    loader.innerHTML = `
        <div class="premium-spinner" style="
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <p style="color: white; margin-top: 20px; font-size: 1.2rem;">Loading...</p>
    `;
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

// Initialize all premium features
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initPageLoadAnimation();
    initPremiumAnimations();
    initPremiumLazyLoad();
    addPremiumRipple();
    enhanceSearch();
    createParticles();
    initScrollProgress();
    initImageZoom();
    animateStats();
    
    // Only on desktop
    if (window.innerWidth > 768) {
        initCardTilt();
        // initCursorEffect(); // Uncomment if you want custom cursor
    }
});

// Export functions
window.smoothScrollTo = smoothScrollTo;
window.animateCounter = animateCounter;

