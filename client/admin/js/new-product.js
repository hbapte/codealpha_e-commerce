const form = document.getElementById('addProductForm');
const categorySelect = document.getElementById('category');
const dropZone = document.getElementById('dropZone');
const imageInput = document.getElementById('images');
const imagePreview = document.getElementById('imagePreview');
const errorMessages = document.getElementById('errorMessages');


// Fetch categories from API and populate the dropdown
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

// Call the function to load categories when the page loads
loadCategories();

// Handle file uploads and image preview logic (remains unchanged)
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

let images = []; // Array to hold Cloudinary URLs

imageInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Updated handleFiles function
async function handleFiles(files) {
    const newFiles = Array.from(files).slice(0, 3 - images.length); // Limit to max 3 images, considering already uploaded ones
    if (newFiles.length === 0) return; // No new files to process

    // Loop through the selected files and upload them to Cloudinary
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
            // Store the Cloudinary URL
            images.push(data.secure_url);

            // Update image preview
            updateImagePreview();
        } catch (error) {
            console.error('Error uploading image:', error);
            errorMessages.innerHTML = `<p>${error.message}</p>`;
        }
    }
}

// Update image preview function (uses Cloudinary URLs)
function updateImagePreview() {
    imagePreview.innerHTML = ''; // Clear previous previews

    images.forEach((url, index) => {
        const container = document.createElement('div');
        container.className = 'preview-container';

        const img = document.createElement('img');
        img.src = url; // Use Cloudinary URL for preview
        img.className = 'preview-image';
        container.appendChild(img);

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '×';
        removeBtn.className = 'remove-image';
        removeBtn.onclick = () => removeImage(index); // Attach remove handler
        container.appendChild(removeBtn);

        imagePreview.appendChild(container); // Add to preview container
    });
}

// Remove image from the array and update the preview
function removeImage(index) {
    images.splice(index, 1); // Remove the Cloudinary URL from the array
    updateImagePreview();
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessages.innerHTML = '';

    const formData = new FormData(form);
    formData.append('featured', formData.get('featured') === 'true');

    const product = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        description: formData.get('description'),
        featured: formData.get('featured') === 'true',
        images: images, // Use the Cloudinary URLs instead of image files
    };

    const errors = [];

    // Validation logic
    if (product.name.length < 3) {
        errors.push('Name must be at least 3 characters long.');
    }
    if (isNaN(product.price) || product.price <= 0) {
        errors.push('Price must be a positive number.');
    }
    if (!product.category) {
        errors.push('Please select a category.');
    }
    if (product.description.length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }
    if (images.length === 0) {
        errors.push('At least one image is required.');
    }
    if (images.length > 3) {
        errors.push('Maximum of 3 images allowed.');
    }

    if (errors.length > 0) {
        errorMessages.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
    } else {
        try {
            // Send the product data to the API
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product), // Send the product JSON with image URLs
            });

            if (!response.ok) {
                throw new Error('Failed to add product. Please try again.');
            }

            const result = await response.json();
            console.log('Product added successfully:', result);
            alert('Product added successfully!');
            form.reset();
            images = [];
            updateImagePreview();
        } catch (error) {
            console.error('Error adding product:', error);
            errorMessages.innerHTML = `<p>${error.message}</p>`;
        }
    }
});

