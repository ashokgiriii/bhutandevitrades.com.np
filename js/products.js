// Products data loaded from JSON
let productsData = [];

// Function to load products from JSON
async function loadProductsData() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        productsData = data.products;
        window.productsData = productsData;
        console.log('Products loaded successfully:', productsData.length);
        return productsData;
    } catch (error) {
        console.error('Error loading products data:', error);
        // Fallback to sample data if JSON fails
        productsData = getSampleProducts();
        window.productsData = productsData;
        return productsData;
    }
}

// Sample products data as fallback
function getSampleProducts() {
    return [
        {
            id: 1,
            name: "Yamaha FZ V2 Clutch Plate",
            price: 1850,
            category: "fz",
            type: "bike",
            image: "https://via.placeholder.com/300x200/1d3557/ffffff?text=FZ+Clutch+Plate",
            description: "Original clutch plate for Yamaha FZ V2/V3 models",
            inStock: true,
        },
        {
            id: 2,
            name: "Pulsar 150 Brake Pad Set",
            price: 650,
            category: "pulsar",
            type: "bike",
            image: "https://via.placeholder.com/300x200/457b9d/ffffff?text=Pulsar+Brake+Pads",
            description: "High-performance brake pads for Pulsar 150/180/220",
            inStock: true,
        },
        {
            id: 3,
            name: "NS200 Chain Sprocket Kit",
            price: 3200,
            category: "ns200",
            type: "bike",
            image: "https://via.placeholder.com/300x200/e63946/ffffff?text=NS200+Sprocket",
            description: "Complete chain sprocket kit for Bajaj NS200",
            inStock: true,
        },
        {
            id: 4,
            name: "Apache RTR 160 Air Filter",
            price: 450,
            category: "apache",
            type: "bike",
            image: "https://via.placeholder.com/300x200/1d3557/ffffff?text=Apache+Air+Filter",
            description: "Performance air filter for Apache RTR 160",
            inStock: true,
        },
        {
            id: 5,
            name: "Honda Shine Headlight Assembly",
            price: 1200,
            category: "shine",
            type: "bike",
            image: "https://via.placeholder.com/300x200/457b9d/ffffff?text=Shine+Headlight",
            description: "Complete headlight assembly for Honda Shine",
            inStock: true,
        },
        {
            id: 6,
            name: "Royal Enfield Bullet Clutch Cable",
            price: 350,
            category: "bullet",
            type: "bike",
            image: "https://via.placeholder.com/300x200/e63946/ffffff?text=Bullet+Clutch+Cable",
            description: "Durable clutch cable for Royal Enfield Bullet",
            inStock: true,
        },
        {
            id: 7,
            name: "Honda Dio CVT Belt",
            price: 850,
            category: "dio",
            type: "scooter",
            image: "https://via.placeholder.com/300x200/1d3557/ffffff?text=Dio+CVT+Belt",
            description: "Original CVT belt for Honda Dio",
            inStock: true,
        },
        {
            id: 8,
            name: "TVS NTorq Air Filter",
            price: 380,
            category: "ntorq",
            type: "scooter",
            image: "https://via.placeholder.com/300x200/457b9d/ffffff?text=NTorq+Air+Filter",
            description: "High-flow air filter for TVS NTorq",
            inStock: true,
        },
        {
            id: 9,
            name: "Yamaha RayZR Spark Plug",
            price: 220,
            category: "rayzr",
            type: "scooter",
            image: "https://via.placeholder.com/300x200/e63946/ffffff?text=RayZR+Spark+Plug",
            description: "Iridium spark plug for Yamaha RayZR",
            inStock: true,
        },
        {
            id: 10,
            name: "Aprilia SR150 Brake Pads",
            price: 750,
            category: "aprilia",
            type: "scooter",
            image: "https://via.placeholder.com/300x200/1d3557/ffffff?text=Aprilia+Brake+Pads",
            description: "Ceramic brake pads for Aprilia SR150",
            inStock: true,
        },
        {
            id: 11,
            name: "KTM Duke 200 Oil Filter",
            price: 550,
            category: "ktm",
            type: "bike",
            image: "https://via.placeholder.com/300x200/457b9d/ffffff?text=KTM+Oil+Filter",
            description: "High-performance oil filter for KTM Duke 200",
            inStock: true,
        },
        {
            id: 12,
            name: "Yamaha MT-15 Spark Plug",
            price: 280,
            category: "mt",
            type: "bike",
            image: "https://via.placeholder.com/300x200/e63946/ffffff?text=MT+Spark+Plug",
            description: "NGK spark plug for Yamaha MT-15",
            inStock: true,
        },
        {
            id: 13,
            name: "Honda Activa Shock Absorber",
            price: 1200,
            category: "activa",
            type: "scooter",
            image: "https://via.placeholder.com/300x200/1d3557/ffffff?text=Activa+Shock",
            description: "Gas-filled shock absorber for Honda Activa",
            inStock: true,
        },
        {
            id: 14,
            name: "Suzuki Access Clutch Assembly",
            price: 1850,
            category: "access",
            type: "scooter",
            image: "https://via.placeholder.com/300x200/457b9d/ffffff?text=Access+Clutch",
            description: "Complete clutch assembly for Suzuki Access",
            inStock: true,
        },
        {
            id: 15,
            name: "Bajaj Avenger Footrest Set",
            price: 850,
            category: "avenger",
            type: "bike",
            image: "https://via.placeholder.com/300x200/e63946/ffffff?text=Avenger+Footrest",
            description: "Chrome footrest set for Bajaj Avenger",
            inStock: true,
        }
    ];
}

// Function to get recent products (all 15 products)
function getRecentProducts() {
    return productsData.slice(0, 12);
}

// Function to get products by type
function getProductsByType(type) {
    return productsData.filter(product => product.type === type);
}

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return productsData;
    }
    return productsData.filter(product => product.category === category);
}



// Function to search products
function searchProducts(query) {
    if (!query) return productsData;

    const searchTerm = query.toLowerCase();
    return productsData.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.features && product.features.some(feature =>
            feature.toLowerCase().includes(searchTerm)
        ))
    );
}

// Function to render products
function renderProducts(products, container) {
    if (!container) {
        console.error('Container not found for rendering products');
        return;
    }

    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search fa-3x"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button class="cta-button" onclick="clearSearch()">Show All Products</button>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-product-id', product.id);

        productCard.innerHTML = `
            <div class="product-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <i class="fas fa-cogs fa-3x"></i>
                ${product.inStock ? '<span class="stock-badge">In Stock</span>' : '<span class="stock-badge out-of-stock">Out of Stock</span>'}
                    <i class="fas fa-star"></i>
                </div>
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                ${product.features && product.features.length > 0 ? `
                    <div class="product-features">
                        ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                ` : ''}
                
                <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
                <div class="quantity-selector">
                    <button class="quantity-btn minus" ${!product.inStock ? 'disabled' : ''}>-</button>
                    <input type="text" class="quantity-input" value="1" readonly ${!product.inStock ? 'disabled' : ''}>
                    <button class="quantity-btn plus" ${!product.inStock ? 'disabled' : ''}>+</button>
                </div>
                <div class="product-actions">
                    <div class="action-buttons">
                        <button class="btn btn-whatsapp" data-product="${product.name}" data-price="${product.price}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </button>
                        <button class="btn btn-payment" data-product="${product.name}" data-price="${product.price}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-qrcode"></i> Pay
                        </button>
                    </div>
                    <button class="call-now-small" onclick="callForProduct('${product.name.replace(/'/g, "\\'")}')" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-phone"></i> Call Now
                    </button>
                </div>
            </div>
        `;

        container.appendChild(productCard);

        // Add event listeners only if product is in stock
        if (product.inStock) {
            addProductEventListeners(productCard, product);
        }
    });
}

// Function to add event listeners to product elements
function addProductEventListeners(productCard, product) {
    // Quantity buttons
    const minusBtn = productCard.querySelector('.minus');
    const plusBtn = productCard.querySelector('.plus');
    const quantityInput = productCard.querySelector('.quantity-input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });

    // WhatsApp button
    const whatsappBtn = productCard.querySelector('.btn-whatsapp');
    whatsappBtn.addEventListener('click', () => {
        const quantity = quantityInput.value;
        const total = product.price * quantity;
        sendWhatsAppOrder(product, quantity, total);
    });

    // Payment button
    const paymentBtn = productCard.querySelector('.btn-payment');
    paymentBtn.addEventListener('click', () => {
        const quantity = quantityInput.value;
        const total = product.price * quantity;
        openPaymentModal(product.name, total);
    });
}

// Function to send WhatsApp order
function sendWhatsAppOrder(product, quantity, total) {
    const phoneNumber = '9779841000000'; // Replace with actual number
    const message = `Hello Bhutandevi Traders! 🛵

I would like to order:

📋 Product: ${product.name}
📦 Quantity: ${quantity}
💰 Price: Rs. ${product.price.toLocaleString()}
💵 Total: Rs. ${total.toLocaleString()}

🚚 Delivery to: Hetauda
📞 Contact: [Your Number]

Please confirm availability and delivery details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// Function to call for product
function callForProduct(productName) {
    const phoneNumber = '+9779841000000'; // Replace with actual number
    window.open(`tel:${phoneNumber}`);

    // Track call intent (optional)
    console.log('Call intent for product:', productName);
    showCallNotification(productName);
}

// Function to show call notification
function showCallNotification(productName) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 15px 20px;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-phone"></i>
        Calling for: ${productName}
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to clear search and show all products
function clearSearch() {
    const searchInputs = document.querySelectorAll('.search-bar input');
    searchInputs.forEach(input => {
        input.value = '';
    });

    // Reload products based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    loadProductsForPage(currentPage);
}

// Function to load products for specific page
function loadProductsForPage(page) {
    switch (page) {
        case 'index.html':
        case '':
            const recentContainer = document.getElementById('recent-products-container');
            if (recentContainer) {
                const recentProducts = getRecentProducts();
                renderProducts(recentProducts, recentContainer);
            }
            break;

        case 'bike-parts.html':
            const bikeContainer = document.getElementById('bike-parts-container');
            if (bikeContainer) {
                const bikeProducts = getProductsByType('bike');
                renderProducts(bikeProducts, bikeContainer);
            }
            break;

        case 'scooter-parts.html':
            const scooterContainer = document.getElementById('scooter-parts-container');
            if (scooterContainer) {
                const scooterProducts = getProductsByType('scooter');
                renderProducts(scooterProducts, scooterContainer);
            }
            break;

        default:
            console.log('Page not recognized:', page);
    }
}

// Function to initialize product filters
function initializeProductFilters() {
    // Bike filters
    const bikeFilterTabs = document.querySelectorAll('#bike-parts-container') ?
        document.querySelectorAll('#bike-parts-container').closest('.container')?.querySelectorAll('.filter-tab') : [];

    bikeFilterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            bikeFilterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            const filteredProducts = getProductsByCategory(category).filter(p => p.type === 'bike');
            renderProducts(filteredProducts, document.getElementById('bike-parts-container'));
        });
    });

    // Scooter filters
    const scooterFilterTabs = document.querySelectorAll('#scooter-parts-container') ?
        document.querySelectorAll('#scooter-parts-container').closest('.container')?.querySelectorAll('.filter-tab') : [];

    scooterFilterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            scooterFilterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            const filteredProducts = getProductsByCategory(category).filter(p => p.type === 'scooter');
            renderProducts(filteredProducts, document.getElementById('scooter-parts-container'));
        });
    });
}

// Function to update product stock status
function updateProductStock(productId, inStock) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        product.inStock = inStock;

        // Update the product card if it exists
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            const stockBadge = productCard.querySelector('.stock-badge');
            const buttons = productCard.querySelectorAll('button, input');

            if (inStock) {
                stockBadge.textContent = 'In Stock';
                stockBadge.className = 'stock-badge';
                buttons.forEach(btn => btn.disabled = false);
            } else {
                stockBadge.textContent = 'Out of Stock';
                stockBadge.className = 'stock-badge out-of-stock';
                buttons.forEach(btn => btn.disabled = true);
            }
        }
    }
}

// Export functions to global scope
window.loadProductsData = loadProductsData;
window.getRecentProducts = getRecentProducts;
window.getProductsByType = getProductsByType;
window.getProductsByCategory = getProductsByCategory;
window.getFeaturedProducts = getFeaturedProducts;
window.searchProducts = searchProducts;
window.renderProducts = renderProducts;
window.sendWhatsAppOrder = sendWhatsAppOrder;
window.callForProduct = callForProduct;
window.clearSearch = clearSearch;
window.loadProductsForPage = loadProductsForPage;
window.initializeProductFilters = initializeProductFilters;
window.updateProductStock = updateProductStock;

// Initialize when script loads
document.addEventListener('DOMContentLoaded', async function () {
    await loadProductsData();
    console.log('Products.js initialized successfully');
});