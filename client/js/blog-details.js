// blog-details.js

async function fetchBlogDetails() {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');

    try {
        const response = await fetch(`https://my-brand-oxuh.onrender.com/api/blogs/${blogId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog details');
        }
        const blog = await response.json();
        displayBlogContent(blog);
    } catch (error) {
        console.error('Error fetching blog details:', error);
    }
}

function displayBlogContent(blog) {
    const blogTitleElement = document.getElementById('blog-title');
    const blogDateElement = document.getElementById('blog-date');
    const blogAuthorElement = document.getElementById('blog-author');
    const blogReadingTimeElement = document.getElementById('blog-reading-time');
    const blogFeaturedImageElement = document.getElementById('blog-featured-image');
    const blogExcerptElement = document.getElementById('blog-excerpt');
    const blogTagsElement = document.getElementById('blog-tags');
    const blogContentElement = document.getElementById('blog-content');

    // Populate the blog content
    blogTitleElement.textContent = blog.title;
    blogDateElement.textContent = new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    blogAuthorElement.textContent = blog.author;
    blogReadingTimeElement.textContent = blog.readingTime;
    blogFeaturedImageElement.innerHTML = `<img src="${blog.featuredImage}" alt="${blog.title}">`;
    blogExcerptElement.textContent = blog.excerpt;

    // Populate tags
    blogTagsElement.innerHTML = '';
    blog.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('tag');
        tagElement.textContent = tag;
        blogTagsElement.appendChild(tagElement);
    });

    // Populate content
    blogContentElement.innerHTML = blog.content;
}

fetchBlogDetails();
