const tableContainer = document.getElementById('product-table-container');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');
let currentProductId = null; 

async function fetchProducts() {
    try {
        tableContainer.innerHTML = '<div class="loading">Loading products...</div>';
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        tableContainer.innerHTML = '<div class="error">Error loading products. Please try again later.</div>';
    }
}

function displayProducts(products) {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Description</th>
                <th>Created</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${products.map(product => `
                <tr>
                    <td><img src="${product.images[0]}" alt="${product.name}" class="product-image"></td>
                    <td>${product.name}</td>
                    <td>$${(product.price)}</td>
                    <td>${product.category}</td>
                    <td class="${product.featured ? 'featured' : 'not-featured'}">${product.featured ? 'Yes' : 'No'}</td>
                    <td>${product.description.substring(0, 40)}${product.description.length > 40 ? '...' : ''}</td>
                    <td>${new Date(product.createdAt).toLocaleString('en-UK')}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-view" onclick="viewProduct('${product._id}')">View</button>
                            <button class="btn btn-edit" onclick="editProduct('${product._id}')">Edit</button>
                            <button class="btn btn-delete" onclick="openDeleteModal('${product._id}')">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}


function openDeleteModal(productId) {
    currentProductId = productId; 
    deleteModal.style.display = 'block'; 
}


cancelDeleteButton.addEventListener('click', () => {
    deleteModal.style.display = 'none'; // Hide the modal
    currentProductId = null; // Reset the product ID
});

// Confirm deletion and send the DELETE request
confirmDeleteButton.addEventListener('click', async () => {
    try {
        if (!currentProductId) return;

        const response = await fetch(`http://localhost:3000/api/products/${currentProductId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        alert('Product deleted successfully!');
        deleteModal.style.display = 'none'; // Hide the modal
        window.location.reload(); // Reload the page to refresh the product list
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
        deleteModal.style.display = 'none'; // Hide the modal on error
    }
});

// Functions to navigate to view/edit product pages
function viewProduct(id) {
    window.location.href = `./single.html?productId=${id}`;
}

function editProduct(id) {
    window.location.href = `./edit.html?productId=${id}`;
}

// Fetch products when the page loads
fetchProducts();

// Close modal if clicked outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === deleteModal) {
        deleteModal.style.display = 'none';
    }
});

