
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
let products = [];

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cartItems.length;
}


function showToast(message, type = 'default') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    switch (type) {
        case 'success':
            toast.style.backgroundColor = '#4caf50'; 
            break;
        case 'error':
            toast.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            toast.style.backgroundColor = '#ff9800'; 
            break;
        default:
            toast.style.backgroundColor = '#333';
    }

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        const productId = e.target.getAttribute('data-product-id');
        const product = products.find(p => p._id === productId);
        if (product) {
            addToCart(product);
            showToast(`${product.name} Added to cart!`, 'success');
        }
    }
});


cartIcon.addEventListener('click', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        showToast('Please add items to the cart before checking out.', 'warning');
    } else {
        window.location.href = 'checkout.html';
    }
});


async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Network response was not ok');
        products = await response.json();  
        renderFeaturedProducts();           
        filterAndSortProducts();      
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();  
    updateCartCount();       
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});



navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
    }
});

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
    }
});


function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="category-badge">${product.category}</div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description.slice(0, 100)}...</p>
                <p class="product-price">RWF ${product.price.toLocaleString()}</p>
                <a href="#" class="add-to-cart-btn" data-product-id="${product._id}">Add to Cart</a>
            </div>
        </div>
    `;
}

function renderFeaturedProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const featuredProducts = products.filter(product => product.featured).slice(0, 3);
    productsGrid.innerHTML = featuredProducts.map(createProductCard).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedProducts();
    updateCartCount();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    renderAllProducts();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.5s';
        }, index * 100);
    });
});


// All Products
let displayedAllProducts = [];
let filteredAllProducts = [];
const productsPerPage = 8;

function createAllProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="category-badge">${product.category}</div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description.slice(0, 100)}...</p>
                 <p class="product-price">RWF ${product.price.toLocaleString()}</p>
                <a href="#" class="add-to-cart-btn" data-product-id="${product._id}">Add to Cart</a>
            </div>
        </div>
    `;
}

function renderAllProducts() {
    const allProductsGrid = document.getElementById('allProducts');
    allProductsGrid.innerHTML = displayedAllProducts.map(createAllProductCard).join('');
}

function filterAndSortProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    filteredAllProducts = products.filter(product => {
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

function updateShowMoreButton() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    showMoreBtn.style.display = displayedAllProducts.length < filteredAllProducts.length ? 'inline-block' : 'none';
}
document.getElementById('searchInput').addEventListener('input', filterAndSortProducts);
document.getElementById('categoryFilter').addEventListener('change', filterAndSortProducts);
document.getElementById('sortBy').addEventListener('change', filterAndSortProducts);

document.getElementById('showMoreBtn').addEventListener('click', () => {
    const currentLength = displayedAllProducts.length;
    const newProducts = filteredAllProducts.slice(currentLength, currentLength + productsPerPage);
    displayedAllProducts = [...displayedAllProducts, ...newProducts];
    renderAllProducts();
    updateShowMoreButton();
});

filterAndSortProducts();


function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cartItems.findIndex(item => item.id === product._id);
    if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += 1;
        showToast(`${product.name} quantity increased in cart.`, 'success');
    } else {
        cartItems.push({
            id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        });
        showToast(`Added ${product.name} to cart!`, 'success');
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
}





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
