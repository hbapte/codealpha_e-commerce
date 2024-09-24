document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('jwt');
  const expiryTime = localStorage.getItem('expiryTime');

  // if (!token || !expiryTime || Date.now() > expiryTime) {
  //     localStorage.removeItem('jwt');
  //     localStorage.removeItem('expiryTime');
  //     window.location.href = '/login.html?sessionExpired=true';
  // }

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


  async function fetchAndDisplayPublishedBlogsCount() {
    try {
        const response = await fetch('https://my-brand-oxuh.onrender.com/api/blogs');
        const blogs = await response.json();
        const publishedBlogsCount = document.getElementById('publishedBlogsCount');
        publishedBlogsCount.textContent = blogs.length;
    } catch (error) {
        console.error('Error fetching published blogs count:', error);
        publishedBlogsCount.textContent = 'Error';
    }
}


fetchAndDisplayPublishedBlogsCount(); 
async function fetchAndDisplayMessagesCount() {
    try {
      const response = await fetch('https://my-brand-oxuh.onrender.com/api/contact');
      const messages = await response.json();
      const totalMessagesCount = messages.length; 
      const totalMessagesCountElement = document.getElementById('totalMessagesCount');
      totalMessagesCountElement.textContent = totalMessagesCount;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
  
  window.addEventListener('load', () => {
    fetchAndDisplayMessagesCount();
  });
  