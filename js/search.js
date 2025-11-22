// Search functionality
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.products = [];
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
    }

    async loadProducts() {
        try {
            const response = await fetch('data/products.json');
            const data = await response.json();
            this.products = data.products;
        } catch (error) {
            console.error('Error loading products for search:', error);
        }
    }

    setupEventListeners() {
        if (this.searchInput) {
            // Debounced search
            let timeout;
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });

            // Hide results when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                    this.hideResults();
                }
            });

            // Show all products when focusing on empty search
            this.searchInput.addEventListener('focus', () => {
                if (!this.searchInput.value) {
                    this.showAllProducts();
                }
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.showAllProducts();
            return;
        }

        const results = this.searchProducts(query);
        this.displayResults(results);
    }

    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.model.toLowerCase().includes(searchTerm) ||
            (product.features && product.features.some(feature =>
                feature.toLowerCase().includes(searchTerm)
            ))
        );
    }

    showAllProducts() {
        const recentProducts = this.products.slice(0, 8); // Show first 8 products
        this.displayResults(recentProducts, 'Recent Products');
    }

    displayResults(results, title = 'Search Results') {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-result-item">
                    <span>No products found</span>
                </div>
            `;
        } else {
            this.searchResults.innerHTML = results.map(product => `
                <div class="search-result-item" onclick="this.selectProduct(${product.id})">
                    <div>
                        <strong>${product.name}</strong>
                        <div style="font-size: 0.8rem; color: var(--gray);">${product.brand} • ${product.model}</div>
                    </div>
                    <div class="search-result-price">Rs. ${product.price}</div>
                </div>
            `).join('');
        }

        this.searchResults.style.display = 'block';
    }

    hideResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }
    }

    selectProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            if (product.type === 'bike') {
                window.location.href = `bike-parts.html?search=${encodeURIComponent(product.name)}`;
            } else {
                window.location.href = `scooter-parts.html?search=${encodeURIComponent(product.name)}`;
            }
        }
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.searchManager = new SearchManager();
});

// Global function for product selection
window.selectProduct = (productId) => {
    if (window.searchManager) {
        window.searchManager.selectProduct(productId);
    }
};