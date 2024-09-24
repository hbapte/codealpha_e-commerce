'use strict';



/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}


/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 100) {
//     header.classList.add("active");
//     backTopBtn.classList.add("active");
//   } else {
//     header.classList.remove("active");
//     backTopBtn.classList.remove("active");
//   }
// });


async function fetchAndDisplayBlogs() {
  const blogsContainer = document.getElementById('blogsBody');
  const loader = document.getElementById('loader'); // Get the loader element

  try {
      // Show the loader before making the fetch request
      loader.classList.remove('hidden');

      const response = await fetch('https://my-brand-oxuh.onrender.com/api/blogs');

      if (!response.ok) {
          throw new Error('Failed to fetch blogs');
      }

      const blogs = await response.json();

      blogs.forEach(blog => {
          const li = document.createElement('li');
          const createdAt = new Date(blog.createdAt).toLocaleDateString('en-GB'); // Format date as dd/mm/yy

          // Extracting tags from the array and removing brackets and quotes
          const tags = JSON.parse(blog.tags[0]);

          li.innerHTML = `
              <div class="card feature-card">
                  <figure class="card-banner img-holder" style="--width: 1602; --height: 903;">
                      <img src="${blog.featuredImage}" width="1602" height="903" loading="lazy" alt="${blog.title}" class="img-cover">
                  </figure>

                  <div class="card-content">
                      <div class="card-wrapper">
                          <div class="card-tag">
                              <a href="#" class="span hover-2">#${tags[0]}</a>
                          </div>
                          <div class="wrapper">
                              <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                              <span class="span">${blog.readingTime} mins read</span>
                          </div>
                      </div>

                      <h3 class="headline headline-3">
                          <a href="#" class="card-title hover-2">${blog.title}</a>
                      </h3>

                      <p>${blog.excerpt}</p>

                      <div class="card-wrapper">
                          <div class="profile-card">
                              <div>
                                  <p class="card-subtitle">${createdAt}</p>
                              </div>
                          </div>
                          <a href="#" class="card-btn read-more-btn" data-blog-id="${blog._id}">Read More</a>
                      </div>
                  </div>
              </div>
          `;
          blogsContainer.appendChild(li);
      });

      // Attach event listeners to the dynamically generated "Read more" buttons
      const readMoreButtons = document.querySelectorAll('.read-more-btn');
      readMoreButtons.forEach(button => {
          button.addEventListener('click', function(event) {
              event.preventDefault(); // Prevent default link behavior

              const blogId = this.getAttribute('data-blog-id');
              window.location.href = `blog-details.html?id=${blogId}`;
          });
      });
  } catch (error) {
      console.error('Error fetching blogs:', error.message);
  } finally {
      // Hide the loader once the fetch request is completed
      loader.classList.add('hidden');
  }
}

fetchAndDisplayBlogs();

