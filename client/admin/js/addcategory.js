
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addCategoryForm');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const nameError = document.getElementById('nameError');
    const descriptionError = document.getElementById('descriptionError');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset error messages
        nameError.textContent = '';
        descriptionError.textContent = '';

        // Validate inputs
        let isValid = true;

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }

        if (descriptionInput.value.trim() === '') {
            descriptionError.textContent = 'Description is required';
            isValid = false;
        }

        if (isValid) {
            // Create category object
            const category = {
                name: nameInput.value.trim(),
                description: descriptionInput.value.trim(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
   
            const response = await fetch('http://localhost:3000/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            });

            if (!response.ok) {
                console.error('Failed to add category');
                return;
            }

            if (response.status === 409) {
                alert('Category already exists');
                return;
            }

            if (response.status === 201) {
                alert('Category added successfully!');
                form.reset();
            }

              // Here you would typically send this data to your server
              console.log('Category to be added:', category);

              // For demonstration, we'll just log it and reset the form
              alert('Category added successfully!');
              form.reset();     

            


          
        }
    });
});
