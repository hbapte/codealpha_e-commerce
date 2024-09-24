
const products = [
    { id: 1, name: 'Smartphone', price: 499.99, image: '/placeholder.svg?height=200&width=200', category: 'Electronics' },
    { id: 2, name: 'Laptop', price: 899.99, image: '/placeholder.svg?height=200&width=200', category: 'Electronics' },
    { id: 3, name: 'Headphones', price: 99.99, image: '/placeholder.svg?height=200&width=200', category: 'Electronics' },
    { id: 4, name: 'Smartwatch', price: 199.99, image: '/placeholder.svg?height=200&width=200', category: 'Electronics' },
    { id: 5, name: 'Running Shoes', price: 79.99, image: '/placeholder.svg?height=200&width=200', category: 'Sports' },
    { id: 6, name: 'Yoga Mat', price: 29.99, image: '/placeholder.svg?height=200&width=200', category: 'Sports' },
    { id: 7, name: 'Coffee Maker', price: 59.99, image: '/placeholder.svg?height=200&width=200', category: 'Home' },
    { id: 8, name: 'Blender', price: 39.99, image: '/placeholder.svg?height=200&width=200', category: 'Home' }
];

// Function to create product cards
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <p>Category: ${product.category}</p>
        <button class="add-to-cart">Add to Cart</button>
    `;
    return card;
}


// Add event listeners to "Add to Cart" buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productElement = e.target.parentElement;
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));
        const productImage = productElement.querySelector('img').src;

        const product = {
            id: Date.now(), // Use a unique ID
            name: productName,
            price: productPrice,
            quantity: 1,
            image: productImage
        };

        addToCart(product);
        alert(`${productName} added to cart!`);
    }
});

// Add product to local storage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product already in cart
    } else {
        cart.push(product); // Add new product to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}




// // Function to add product to cart
// function addToCart(product) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
//     // Check if product is already in the cart
//     const existingProduct = cart.find(item => item.id === product.id);
//     if (existingProduct) {
//         existingProduct.quantity += 1; // Increment quantity if already in cart
//     } else {
//         cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
//     }

//     // Save updated cart to localStorage
//     localStorage.setItem('cart', JSON.stringify(cart));
    
//     alert(`${product.name} added to cart!`);
// }

// Modify the event listener to store product data in cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productName = e.target.parentElement.querySelector('h3').textContent;
        const product = products.find(prod => prod.name === productName);
        addToCart(product);
    }
});


// Function to populate product grid
function populateProductGrid(products, gridId) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    products.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

// Populate featured products (first 4 products)
populateProductGrid(products.slice(0, 4), 'featured-product-grid');

// Populate all products
populateProductGrid(products, 'all-product-grid');

// Generate category buttons
const categories = [...new Set(products.map(product => product.category))];
const categoryList = document.getElementById('category-list');
categories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'category-button';
    button.textContent = category;
    button.addEventListener('click', () => filterByCategory(category));
    categoryList.appendChild(button);
});

// Filter products by category
function filterByCategory(category) {
    const filteredProducts = category === 'All' 
        ? products 
        : products.filter(product => product.category === category);
    populateProductGrid(filteredProducts, 'all-product-grid');
    
    // Update active category button
    document.querySelectorAll('.category-button').forEach(button => {
        button.classList.toggle('active', button.textContent === category);
    });
}

// Add "All" category button
const allButton = document.createElement('button');
allButton.className = 'category-button active';
allButton.textContent = 'All';
allButton.addEventListener('click', () => filterByCategory('All'));
categoryList.prepend(allButton);

// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    populateProductGrid(filteredProducts, 'all-product-grid');
});

// Sort functionality
const sortSelect = document.getElementById('sort');
sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortValue) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            default:
                return 0;
        }
    });
    populateProductGrid(sortedProducts, 'all-product-grid');
});

// Add event listener to "Shop Now" button
document.getElementById('shop-now').addEventListener('click', () => {
    alert('Welcome to our shop! Start browsing our amazing products.');
});

// Add event listeners to "Add to Cart" buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productName = e.target.parentElement.querySelector('h3').textContent;
        alert(`${productName} added to cart!`);
    }
});

function initMap() {
    const location = { lat: 40.7128, lng: -74.0060 }; // New York City coordinates
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: location,
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}
