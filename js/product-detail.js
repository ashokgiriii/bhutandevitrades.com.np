// Product Detail Page JavaScript
let currentProduct = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', async function() {
    await loadProductDetail();
    initializeEventListeners();
});

// Load product detail from URL parameter
async function loadProductDetail() {
    try {
        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));

        if (!productId) {
            showErrorState();
            return;
        }

        // Load products data
        await loadProductsData();

        // Find product
        currentProduct = window.productsData.find(p => p.id === productId);

        if (!currentProduct) {
            showErrorState();
            return;
        }

        // Display product
        displayProductDetail(currentProduct);
        loadRelatedProducts(currentProduct);

        // Hide loading, show content
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('productDetailContainer').style.display = 'block';

    } catch (error) {
        console.error('Error loading product detail:', error);
        showErrorState();
    }
}

// Display product detail
function displayProductDetail(product) {
    currentProduct = product;
    currentQuantity = 1;

    // Update page title
    document.title = `${product.name} | Bhutandevi Traders`;

    // Update breadcrumb
    const categoryLink = document.getElementById('productCategoryLink');
    if (product.type === 'bike') {
        categoryLink.innerHTML = `<a href="bike-parts.html">Bike Parts</a>`;
    } else {
        categoryLink.innerHTML = `<a href="scooter-parts.html">Scooter Parts</a>`;
    }
    document.getElementById('productNameBreadcrumb').textContent = product.name;

    // Update product name
    document.getElementById('productName').textContent = product.name;

    // Update product meta
    document.getElementById('productBrand').textContent = product.brand || 'N/A';
    document.getElementById('productModel').textContent = product.model || 'N/A';
    document.getElementById('productCategory').textContent = product.category || 'N/A';

    // Update price
    document.getElementById('productPrice').textContent = `Rs. ${product.price.toLocaleString()}`;
    updateTotalPrice();
    
    // Generate QR code immediately
    generateQRCode();

    // Update description
    const descriptionEl = document.getElementById('productDescription');
    descriptionEl.querySelector('p').textContent = product.description || 'No description available.';

    // Update stock badge
    const stockBadge = document.getElementById('stockBadge');
    if (product.inStock) {
        stockBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>In Stock</span>';
        stockBadge.className = 'stock-badge-large in-stock';
    } else {
        stockBadge.innerHTML = '<i class="fas fa-times-circle"></i><span>Out of Stock</span>';
        stockBadge.className = 'stock-badge-large out-of-stock';
        // Disable buttons
        document.getElementById('whatsappBtn').disabled = true;
        document.getElementById('paymentBtn').disabled = true;
        document.getElementById('callBtn').disabled = true;
    }

    // Update product image
    const imageEl = document.getElementById('productMainImage');
    if (product.image && product.image !== '') {
        imageEl.innerHTML = `<img src="${product.image}" alt="${product.name}" />`;
    } else {
        imageEl.innerHTML = '<i class="fas fa-cogs fa-5x"></i>';
    }

    // Update features if available
    if (product.features && product.features.length > 0) {
        const featuresSection = document.getElementById('productFeatures');
        const featuresList = document.getElementById('featuresList');
        featuresSection.style.display = 'block';
        featuresList.innerHTML = product.features.map(feature => 
            `<span class="feature-tag">${feature}</span>`
        ).join('');
    }
}

// Update total price
function updateTotalPrice() {
    if (!currentProduct) return;
    const total = currentProduct.price * currentQuantity;
    document.getElementById('totalPrice').textContent = `Rs. ${total.toLocaleString()}`;
    document.getElementById('qrTotalPrice').textContent = `Rs. ${total.toLocaleString()}`;
    
    // Regenerate QR code with new total
    generateQRCode();
}

// Generate QR Code
function generateQRCode() {
    if (!currentProduct) return;
    
    const total = currentProduct.price * currentQuantity;
    const qrData = `bhutandevitraders | Product: ${currentProduct.name} | Quantity: ${currentQuantity} | Amount: Rs.${total}`;
    const qrcodeDiv = document.getElementById('qrcode');
    
    // Clear previous QR code
    qrcodeDiv.innerHTML = '<div class="qr-loading-inline"><div class="spinner-small"></div></div>';
    
    // Generate new QR code
    setTimeout(() => {
        qrcodeDiv.innerHTML = '';
        
        QRCode.toCanvas(qrcodeDiv, qrData, {
            width: 200,
            margin: 2,
            color: {
                dark: '#1d3557',
                light: '#ffffff'
            },
            errorCorrectionLevel: 'M'
        }, function (error) {
            if (error) {
                console.error('QR Code generation error:', error);
                qrcodeDiv.innerHTML = `
                    <div class="qr-error-inline">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>QR Error</p>
                    </div>
                `;
            } else {
                qrcodeDiv.style.opacity = '0';
                setTimeout(() => {
                    qrcodeDiv.style.transition = 'opacity 0.3s ease';
                    qrcodeDiv.style.opacity = '1';
                }, 100);
            }
        });
    }, 100);
}

// Initialize event listeners
function initializeEventListeners() {
    // Quantity buttons
    document.getElementById('quantityMinus').addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.getElementById('quantityInput').value = currentQuantity;
            updateTotalPrice();
        }
    });

    document.getElementById('quantityPlus').addEventListener('click', () => {
        currentQuantity++;
        document.getElementById('quantityInput').value = currentQuantity;
        updateTotalPrice();
    });

    document.getElementById('quantityInput').addEventListener('change', (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            currentQuantity = value;
            updateTotalPrice();
        } else {
            e.target.value = currentQuantity;
        }
    });
    
    document.getElementById('quantityInput').addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            currentQuantity = value;
            updateTotalPrice();
        }
    });

    // WhatsApp button
    document.getElementById('whatsappBtn').addEventListener('click', () => {
        sendWhatsAppOrder();
    });

    // Call button
    document.getElementById('callBtn').addEventListener('click', () => {
        callForProduct();
    });

    // Modal close
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closePaymentModal();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('paymentModal');
        if (event.target === modal) {
            closePaymentModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePaymentModal();
        }
    });
}

// Send WhatsApp order
function sendWhatsAppOrder() {
    if (!currentProduct) return;

    const phoneNumber = '9779841000000'; // Replace with actual number
    const total = currentProduct.price * currentQuantity;
    
    const message = `Hello Bhutandevi Traders! 🛵

I would like to order:

📋 Product: ${currentProduct.name}
📦 Quantity: ${currentQuantity}
💰 Price per unit: Rs. ${currentProduct.price.toLocaleString()}
💵 Total: Rs. ${total.toLocaleString()}

🚚 Delivery to: Hetauda
📞 Contact: [Your Number]

Please confirm availability and delivery details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Show toast notification
    if (window.Toast) {
        window.Toast.show('Opening WhatsApp...', 'info', 2000);
    }

    window.open(whatsappUrl, '_blank');
}

// Open payment modal with QR code
function openPaymentModal() {
    if (!currentProduct) return;

    const modal = document.getElementById('paymentModal');
    const total = currentProduct.price * currentQuantity;

    // Update modal content
    document.getElementById('paymentProductName').textContent = currentProduct.name;
    document.getElementById('paymentQuantity').textContent = currentQuantity;
    document.getElementById('paymentTotal').textContent = `Rs. ${total.toLocaleString()}`;

    // Generate QR code
    const qrData = `bhutandevitraders | Product: ${currentProduct.name} | Quantity: ${currentQuantity} | Amount: Rs.${total}`;
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '<div class="qr-loading"><div class="spinner"></div><p>Generating QR Code...</p></div>';

    // Clear and generate QR code
    setTimeout(() => {
        qrcodeDiv.innerHTML = '';
        
        QRCode.toCanvas(qrcodeDiv, qrData, {
            width: 280,
            margin: 3,
            color: {
                dark: '#1d3557',
                light: '#ffffff'
            },
            errorCorrectionLevel: 'M'
        }, function (error) {
            if (error) {
                console.error('QR Code generation error:', error);
                qrcodeDiv.innerHTML = `
                    <div class="qr-error">
                        <i class="fas fa-exclamation-triangle fa-3x"></i>
                        <p>QR Code generation failed</p>
                        <p class="qr-error-text">Please contact us via WhatsApp</p>
                    </div>
                `;
            } else {
                // Add success animation
                qrcodeDiv.style.opacity = '0';
                setTimeout(() => {
                    qrcodeDiv.style.transition = 'opacity 0.3s ease';
                    qrcodeDiv.style.opacity = '1';
                }, 100);
            }
        });
    }, 100);

    // Show modal with animation
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Function to close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Call for product
function callForProduct() {
    if (!currentProduct) return;

    const phoneNumber = '+9779841000000'; // Replace with actual number
    
    // Show toast notification
    if (window.Toast) {
        window.Toast.show('Opening phone dialer...', 'info', 2000);
    }
    
    window.open(`tel:${phoneNumber}`);
}

// Contact WhatsApp
function contactWhatsapp() {
    const phoneNumber = '9779841000000';
    const message = encodeURIComponent('Hello! I need assistance with my order.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Load related products
function loadRelatedProducts(product) {
    if (!window.productsData) return;

    // Get related products (same category or type, excluding current product)
    const relatedProducts = window.productsData.filter(p => 
        p.id !== product.id && 
        (p.category === product.category || p.type === product.type)
    ).slice(0, 4);

    const container = document.getElementById('relatedProductsContainer');
    
    if (relatedProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray);">No related products found.</p>';
        return;
    }

    renderProducts(relatedProducts, container);
}

// Show error state
function showErrorState() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('productDetailContainer').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
}

// Export functions
window.contactWhatsapp = contactWhatsapp;
window.closePaymentModal = closePaymentModal;

