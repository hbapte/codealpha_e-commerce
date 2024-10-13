// client\js\script.js
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Function to update the cart count
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cartItems.length;
}

// Function to add a product to the cart
function addToCart(product) {
 
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cartItems);
    // Add new product to the cart
    cartItems.push({
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1
    });
    

    
    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartCount();
}

// Event listener for add to cart buttons
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        const productId = e.target.getAttribute('data-product-id');
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            addToCart(product);
            alert(`Added ${product.name} to cart!`);
        }
    }
});

// Event listener for cart icon click
cartIcon.addEventListener('click', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        alert('Please add items to the cart before checking out.');
    } else {
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    }
});


// Initialize the cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Close mobile menu when a link is clicked
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
    }
});

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});





// Close mobile menu when a link is clicked
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
    }
});


const products = [
    {
        id: 1,
        name: "Smart Watch Pro",
        description: "Stay connected with our latest smart watch. Features include heart rate ",
        price: 15000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1456615074700-1dc12aa7364d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: "Wireless Earbuds",
        description: "Experience crystal-clear sound with our noise-cancelling wireless earbuds. ",
        price: 25000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1527347757911-56639bbfa470?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        name: "Laptop Backpack",
        description: "Carry your tech in style and comfort. This backpack features padded straps",
        price: 7000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 4,
        name: "Fitness Tracker",
        description: "Track your workouts, sleep, and more with our advanced fitness band. ",
        price: 9000,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1566502548870-875212fb031d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

// Function to create a product card
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="category-badge">${product.category}</div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">RWF ${product.price.toLocaleString()}</p>
                <a href="#" class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</a>
            </div>
        </div>
    `;
}

// Function to render all products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(createProductCard).join('');
}

// Add a simple animation effect when the page loads
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});


const images = [
    'https://images.unsplash.com/photo-1527347757911-56639bbfa470?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1456615074700-1dc12aa7364d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1566502548870-875212fb031d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];
let currentImageIndex = 0;
const heroImage = document.getElementById('heroImage');

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    heroImage.style.opacity = 0;
    setTimeout(() => {
        heroImage.src = images[currentImageIndex];
        heroImage.style.opacity = 1;
    }, 500);
}

setInterval(changeImage, 5000);





// ALl the products
const allProducts = [
    {
        id: 1,
        name: "Smart Watch Pro",
        description: "Stay connected with our latest smart watch. Features include heart rate monitoring, GPS, and water resistance.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200&text=Smart+Watch",
        category: "electronics"
    },
    {
        id: 2,
        name: "Wireless Earbuds",
        description: "Experience crystal-clear sound with our noise-cancelling wireless earbuds. Perfect for music and calls on the go.",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200&text=Wireless+Earbuds",
        category: "electronics"
    },
    {
        id: 3,
        name: "Ergonomic Laptop Backpack",
        description: "Carry your tech in style and comfort. This backpack features padded straps, multiple compartments, and water-resistant material.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "clothing"
    },
    {
        id: 4,
        name: "Advanced Fitness Tracker",
        description: "Track your workouts, sleep, and more with our advanced fitness band. Includes a color touchscreen and 7-day battery life.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "electronics"
    },
    {
        id: 5,
        name: "Bestselling Novel",
        description: "Immerse yourself in this captivating story that has taken the literary world by storm.",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "books"
    },
    {
        id: 6,
        name: "Comfortable Lounge Chair",
        description: "Relax in style with this ergonomic lounge chair, perfect for reading or watching TV.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200&text=Lounge+Chair",
        category: "home"
    },
    {
        id: 7,
        name: "Stylish Sunglasses",
        description: "Protect your eyes and look great with these UV-resistant, fashionable sunglasses.",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200&text=Sunglasses",
        category: "clothing"
    },
    {
        id: 8,
        name: "Portable Bluetooth Speaker",
        description: "Take your music anywhere with this compact, waterproof Bluetooth speaker with amazing sound quality.",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200&text=Bluetooth+Speaker",
        category: "electronics"
    },
    {
        id: 9,
        name: "Gourmet Coffee Maker",
        description: "Brew barista-quality coffee at home with this programmable, stainless steel coffee maker.",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200&text=Coffee+Maker",
        category: "home"
    },
    {
        id: 10,
        name: "Classic Leather Wallet",
        description: "Keep your cards and cash organized with this sleek, genuine leather wallet.",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1620797959912-08d56933f2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=200&text=Leather+Wallet",
        category: "clothing"
    }
];

let displayedAllProducts = [];
let filteredAllProducts = [];
const productsPerPage = 4;

// Function to create a product card
function createAllProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="category-badge">${product.category}</div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                 <p class="product-price">RWF ${product.price.toLocaleString()}</p>
                <a href="#" class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</a>
            </div>
        </div>
    `;
}

// Function to render products
function renderAllProducts() {
    const allProductsGrid = document.getElementById('allProducts');
    allProductsGrid.innerHTML = displayedAllProducts.map(createAllProductCard).join('');
}

// Function to filter and sort products
function filterAndSortProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    filteredAllProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === '' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    filteredAllProducts.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'price-low-high') {
            return a.price - b.price;
        } else if (sortBy === 'price-high-low') {
            return b.price - a.price;
        }
    });

    displayedAllProducts = filteredAllProducts.slice(0, productsPerPage);
    renderAllProducts();
    updateShowMoreButton();
}

// Function to update the "Show More" button visibility
function updateShowMoreButton() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    showMoreBtn.style.display = displayedAllProducts.length < filteredAllProducts.length ? 'inline-block' : 'none';
}

// Event listeners for search, filter, and sort
document.getElementById('searchInput').addEventListener('input', filterAndSortProducts);
document.getElementById('categoryFilter').addEventListener('change', filterAndSortProducts);
document.getElementById('sortBy').addEventListener('change', filterAndSortProducts);

// Event listener for "Show More" button
document.getElementById('showMoreBtn').addEventListener('click', () => {
    const currentLength = displayedProducts.length;
    const newProducts = filteredProducts.slice(currentLength, currentLength + productsPerPage);
    displayedAllProducts = [...displayedAllProducts, ...newProducts];
    renderProducts();
    updateShowMoreButton();
});

// Initial render
filterAndSortProducts();



