document.addEventListener('DOMContentLoaded', function() {
    const categoriesContainer = document.getElementById('categories-container');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const editModal = document.getElementById('edit-modal');
    const deleteModal = document.getElementById('delete-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const editForm = document.getElementById('edit-form');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

    let editingCategoryId = null;
    let deletingCategoryId = null;

    // Fetch and display categories
    fetch('http://localhost:3000/api/category')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(categories => {
            loadingElement.style.display = 'none';
            categories.forEach(category => {
                const categoryCard = document.createElement('div');
                categoryCard.className = 'category-card';
                
                const createdDate = new Date(category.createdAt).toLocaleDateString();
                const updatedDate = new Date(category.updatedAt).toLocaleDateString();

                categoryCard.innerHTML = `
                    <div class="category-name">${category.name}</div>
                    <div class="category-description">${category.description}</div>
                    <div class="category-date">Created: ${createdDate}</div>
                    <div class="category-date">Updated: ${updatedDate}</div>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                `;

                // Add Edit button click event
                categoryCard.querySelector('.edit-btn').addEventListener('click', () => {
                    editingCategoryId = category._id; // Store the _id for editing
                    document.getElementById('category-name').value = category.name;
                    document.getElementById('category-description').value = category.description;
                    editModal.style.display = 'block';
                });

                // Add Delete button click event
                categoryCard.querySelector('.delete-btn').addEventListener('click', () => {
                    deletingCategoryId = category._id; // Store the _id for deleting
                    deleteModal.style.display = 'block'; // Show confirmation modal
                });

                categoriesContainer.appendChild(categoryCard);
            });
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            errorElement.textContent = 'Error loading categories: ' + error.message;
        });

    // Close modal logic
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            editModal.style.display = 'none';
            deleteModal.style.display = 'none';
        });
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    // Handle form submit for editing category
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const updatedCategory = {
            name: document.getElementById('category-name').value,
            description: document.getElementById('category-description').value
        };
        updateCategory(editingCategoryId, updatedCategory);
    });

    // Update category API call
    function updateCategory(id, updatedCategory) {
        fetch(`http://localhost:3000/api/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCategory),
        })
        .then(response => response.json())
        .then(data => {
            alert('Category updated successfully');
            editModal.style.display = 'none';
            location.reload();  // Reload the page to see the updated category
        })
        .catch(error => {
            console.error('Error updating category:', error);
            alert('Failed to update category');
        });
    }

    // Confirm Delete button logic
    confirmDeleteBtn.addEventListener('click', () => {
        deleteCategory(deletingCategoryId); // Call delete function with the _id
    });

    // Delete category API call
    function deleteCategory(id) {
        fetch(`http://localhost:3000/api/category/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Category deleted successfully');
                deleteModal.style.display = 'none'; // Hide confirmation modal
                location.reload();  // Reload the page to see the updated list
            } else {
                alert('Failed to delete category');
            }
        })
        .catch(error => {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        });
    }
});
