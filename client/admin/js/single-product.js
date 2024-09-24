const productContainer = document.getElementById('product-container');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

async function fetchProduct() {
    try {
        productContainer.innerHTML = '<div class="loading">Loading product details...</div>';
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const product = await response.json();
        displayProduct(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        productContainer.innerHTML = '<div class="error">Error loading product details. Please try again later.</div>';
    }
}

function displayProduct(product) {
    const productHTML = `
        <div class="product-details">
            <div class="product-images">
                ${product.images.map(image => `<img src="${image}" alt="${product.name}" class="product-image">`).join('')}
            </div>
            <div class="product-info">
                <p><span class="label">Name:</span> ${product.name}</p>
                <p><span class="label">Price:</span> <span class="price">${(product.price).toLocaleString()} RWF</span></p>
                <p><span class="label">Category:</span> ${product.category}</p>
                <p><span class="label">Featured:</span> <span class="${product.featured ? 'featured' : 'not-featured'}">${product.featured ? 'Yes' : 'No'}</span></p>
                <p><span class="label">Description:</span></p>
                <p class="description">${product.description}</p>
                <p><span class="label">Created At:</span> ${new Date(product.createdAt).toLocaleString()}</p>
                <p><span class="label">Updated At:</span> ${new Date(product.updatedAt).toLocaleString()}</p>
            </div>
            <div class="action-buttons">
                <button class="btn btn-edit" onclick="editProduct('${product._id}')">Edit Product</button>
                <button class="btn btn-delete" onclick="openDeleteModal()">Delete Product</button>
                <button class="btn btn-back" onclick="goBack()">Back to List</button>
            </div>
        </div>
    `;
    productContainer.innerHTML = productHTML;
}

function editProduct(id) {
    window.location.href = `edit-product.html?productId=${id}`;
}

function openDeleteModal() {
    deleteModal.style.display = 'block';
}

cancelDeleteButton.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

confirmDeleteButton.addEventListener('click', async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        alert('Product deleted successfully!');
        deleteModal.style.display = 'none';
        window.location.href = 'products.html'; // Redirect after deletion
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
        deleteModal.style.display = 'none';
    }
});

function goBack() {
    window.location.href = 'products.html';
}

// Fetch product when the page loads
fetchProduct();

// Close modal if clicked outside the content
window.addEventListener('click', (event) => {
    if (event.target === deleteModal) {
        deleteModal.style.display = 'none';
    }
});
