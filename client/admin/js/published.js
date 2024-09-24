document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('jwt');
  const expiryTime = localStorage.getItem('expiryTime');

//   if (!token || !expiryTime || Date.now() > expiryTime) {
//       localStorage.removeItem('jwt');
//       localStorage.removeItem('expiryTime');
//       window.location.href = '/login.html?sessionExpired=true';
//   }

  // event listener to logout link
  const logoutLink = document.querySelector('.sidebar__logout a');
  logoutLink.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.removeItem('jwt');
      localStorage.removeItem('expiryTime');

      window.location.href = '/login.html';
  });
});
  

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}


function toggleSidebar() {
    if (!sidebarOpen) {
      sidebar.classList.add("sidebar_responsive");
      sidebarOpen = true;
    } else {
      sidebar.classList.remove("sidebar_responsive");
      sidebarOpen = false;
    }
  }



async function fetchAndDisplayBlogs() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block'; // Show loader

  try {
      const response = await fetch('https://my-brand-oxuh.onrender.com/api/blogs');
      const blogs = await response.json();
      const blogsBody = document.getElementById('blogsBody');
      const publishedBlogsCount = document.getElementById('publishedBlogsCount');
      blogsBody.innerHTML = ''; // Clear previous blogs

      let totalCount = 0;

      blogs.forEach(blog => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${blog.title}</td>
              <td>${blog.tags.join(', ')}</td>
              <td>${blog.excerpt}</td>
              <td>${blog.readingTime} min</td>
              <td><img src="${blog.featuredImage}" alt="Featured Image" style="max-width: 100px;"></td>
              <td>
                  <button class="button edit-button" data-blog-id="${blog._id}">Edit</button>
                  <button class="button delete-button" data-blog-id="${blog._id}">Delete</button>
              </td>
          `;
          blogsBody.appendChild(row);
          totalCount++;
      });

      // Update published blogs count
      publishedBlogsCount.textContent = totalCount;

      // Hide loader after data is loaded
      loader.style.display = 'none';
      
      // Attach event listener to delete buttons
      const deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach(button => {
          button.addEventListener('click', async function() {
              const blogId = this.dataset.blogId;
              await deleteBlog(blogId);
              // After deleting, fetch and display blogs again
              fetchAndDisplayBlogs();
          });
      });
      
      // Attach event listener to edit buttons
      const editButtons = document.querySelectorAll('.edit-button');
      editButtons.forEach(button => {
          button.addEventListener('click', function() {
              const blogId = this.dataset.blogId;
              openEditPopup(blogId); // Pass blogId to openEditPopup
          });
      });

  } catch (error) {
      console.error('Error fetching blogs:', error);
      // Hide loader in case of error
      loader.style.display = 'none';
  }
}

async function deleteBlog(blogId) {
  try {
      const response = await fetch(`https://my-brand-oxuh.onrender.com/api/blogs/${blogId}`, {
          method: 'DELETE'
      });

      if (!response.ok) {
          throw new Error('Failed to delete blog');
      }
      // Successful deletion
      console.log('Blog deleted successfully');
  } catch (error) {
      console.error('Error deleting blog:', error);
  }
}


// Function to get blog details by ID from the API
async function getBlogById(blogId) {
  try {
      const response = await fetch(`https://my-brand-oxuh.onrender.com/api/blogs/${blogId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch blog details');
      }
      const blog = await response.json();
      return blog;
  } catch (error) {
      console.error('Error fetching blog details:', error);
      return null;
  }
}



// Function to open the edit popup
async function openEditPopup(blogId) {
  const editPopup = document.getElementById('editPopup');
  editPopup.style.display = 'block';
  
  // Fetch blog details by ID
  const blog = await getBlogById(blogId);
  
  // Populate the edit form with the blog's content
  if (blog) {
      document.getElementById('editForm').dataset.blogId = blogId; // Set blogId to editForm dataset
      document.getElementById('editTitle').value = blog.title;
      document.getElementById('editTags').value = blog.tags.join(', ');
      document.getElementById('editExcerpt').value = blog.excerpt;
      document.getElementById('editReadingTime').value = blog.readingTime;
      document.getElementById('editFeaturedImage').value = blog.featuredImage;
  } else {
      console.error('Blog not found');
  }
}

// Function to handle submitting the edit form
const editForm = document.getElementById('editForm');
editForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  // Retrieve edited values from the form
  const blogId = this.dataset.blogId; // Retrieve blogId from the dataset
  const editedBlog = {
      title: document.getElementById('editTitle').value,
      tags: document.getElementById('editTags').value.split(',').map(tag => tag.trim()),
      excerpt: document.getElementById('editExcerpt').value,
      readingTime: document.getElementById('editReadingTime').value,
      featuredImage: document.getElementById('editFeaturedImage').value
  };
  try {
      // Implement a function to update the blog on the server using these edited values
      await updateBlogOnServer(blogId, editedBlog);
      closeEditPopup();
      // After updating, fetch and display blogs again
      fetchAndDisplayBlogs();
  } catch (error) {
      // Handle the error
      console.error('Error updating blog on server:', error);
      // Optionally, you can display an error message to the user
  }
});



// Function to close the edit popup
function closeEditPopup() {
  const editPopup = document.getElementById('editPopup');
  editPopup.style.display = 'none';
}

// Function to update the blog on the server
async function updateBlogOnServer(blogId, editedBlog) {
  try {
      const response = await fetch(`https://my-brand-oxuh.onrender.com/api/blogs/${blogId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedBlog)
      });

      if (!response.ok) {
          throw new Error('Failed to update blog on server');
      }
      // Successful update
      console.log('Blog updated successfully');
  } catch (error) {
      console.error('Error updating blog on server:', error);
      throw error; // Rethrow the error to handle it in the form submission event listener
  }
}

// Function to handle selecting a new featured image
const editFeaturedImageFile = document.getElementById('editFeaturedImageFile');
editFeaturedImageFile.addEventListener('change', function() {
    const file = editFeaturedImageFile.files[0];
    if (file) {
        // Create a FileReader object to read the image file
        const reader = new FileReader();

        // Define what happens when the file is loaded
        reader.onload = function(event) {
            // Create an <img> element to display the preview
            const imagePreview = document.createElement('img');
            imagePreview.src = event.target.result; // Set the source of the image to the loaded file
            imagePreview.style.maxWidth = '100%'; // Set max-width for responsiveness

            // Get the container element where the preview will be displayed
            const previewContainer = document.getElementById('imagePreviewContainer');
            
            // Clear any previous previews
            previewContainer.innerHTML = '';
            
            // Append the image preview to the container
            previewContainer.appendChild(imagePreview);
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
    }
});



// Initial call to fetch and display blogs
fetchAndDisplayBlogs();
