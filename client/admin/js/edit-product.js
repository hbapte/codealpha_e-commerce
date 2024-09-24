const form = document.getElementById('editProductForm');
const categorySelect = document.getElementById('category');
const dropZone = document.getElementById('dropZone');
const imageInput = document.getElementById('images');
const imagePreview = document.getElementById('imagePreview');
const errorMessages = document.getElementById('errorMessages');
let images = []; // Array to hold Cloudinary URLs (existing or newly uploaded)

// Get product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId'); 

async function loadCategories() {
    try {
        const response = await fetch('http://localhost:3000/api/category');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await response.json();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        errorMessages.innerHTML = `<p>Failed to load categories. Please try again later.</p>`;
    }
}

// Fetch the existing product data and populate the form
async function loadProduct() {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }
        const product = await response.json();
        
        // Populate form fields with product data
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price ; 
        document.getElementById('category').value = product.category;
        document.getElementById('description').value = product.description;
        document.getElementById('featured').value = product.featured.toString();

        // Populate existing images
        images = product.images; // Assume the images array contains Cloudinary URLs
        updateImagePreview();
    } catch (error) {
        console.error('Error fetching product:', error);
        errorMessages.innerHTML = `<p>Failed to load product. Please try again later.</p>`;
    }
}

// Fetch categories from API and populate the dropdown


// Load categories and product data on page load
loadCategories();
loadProduct();

// Handle file uploads and image preview logic
dropZone.addEventListener('click', () => imageInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

imageInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Handle file selection and upload to Cloudinary (same as in the add product page)
async function handleFiles(files) {
    const newFiles = Array.from(files).slice(0, 3 - images.length); // Limit to 3 images
    if (newFiles.length === 0) return; // No new files to process

    for (let file of newFiles) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'd5gvsqi7'); // Cloudinary preset

            const response = await fetch('https://api.cloudinary.com/v1_1/dcfnliruh/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const data = await response.json();
            images.push(data.secure_url); // Store the Cloudinary URL
            updateImagePreview();
        } catch (error) {
            console.error('Error uploading image:', error);
            errorMessages.innerHTML = `<p>${error.message}</p>`;
        }
    }
}

// Update image preview
function updateImagePreview() {
    imagePreview.innerHTML = ''; // Clear previous previews

    images.forEach((url, index) => {
        const container = document.createElement('div');
        container.className = 'preview-container';

        const img = document.createElement('img');
        img.src = url;
        img.className = 'preview-image';
        container.appendChild(img);

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '×';
        removeBtn.className = 'remove-image';
        removeBtn.onclick = () => removeImage(index); // Attach remove handler
        container.appendChild(removeBtn);

        imagePreview.appendChild(container);
    });
}

// Remove image from the array and update the preview
function removeImage(index) {
    images.splice(index, 1); // Remove the Cloudinary URL
    updateImagePreview();
}

// Handle form submission (update product)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessages.innerHTML = '';

    const formData = new FormData(form);
    formData.append('featured', formData.get('featured') === 'true');

    const updatedProduct = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')) * 100, // Convert to cents
        category: formData.get('category'),
        description: formData.get('description'),
        featured: formData.get('featured') === 'true',
        images: images // Cloudinary URLs
    };

    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const result = await response.json();
        alert('Product updated successfully!');
        window.location.href = '/admin/products/'; 
    } catch (error) {
        console.error('Error updating product:', error);
        errorMessages.innerHTML = `<p>${error.message}</p>`;
    }
});
