// Theme
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    themeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-theme");
    });
});



//Nav Menu

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



// Contact Form
// Remove live validation event listeners
document.getElementById('names').removeEventListener('keyup', validateField);
document.getElementById('email').removeEventListener('keyup', validateField);
document.getElementById('message').removeEventListener('keyup', validateField);

function validateForm(event) {
    event.preventDefault(); // Prevent default form submission action

    var names = document.getElementById("names").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var isValid = true;

    // Reset errors
    document.getElementById("namesError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("names").classList.remove("invalid-input");
    document.getElementById("email").classList.remove("invalid-input");
    document.getElementById("message").classList.remove("invalid-input");

    // Validating names
    if (names === "") {
        document.getElementById("namesError").textContent = "Name(s) is required";
        document.getElementById("namesError").style.display = "block";  
        document.getElementById("names").classList.add("invalid-input");
        isValid = false;
    } else if (names.length < 3 || !/^[a-zA-Z\s]*$/.test(names)) {
        document.getElementById("namesError").textContent = "Please enter a valid name with at least 3 characters.";
        document.getElementById("namesError").style.display = "block";  
        document.getElementById("names").classList.add("invalid-input");
        isValid = false;
    } else if (names.length > 50) {
        document.getElementById("namesError").textContent = "Name(s) should not exceed 50 characters.";
        document.getElementById("namesError").style.display = "block";  
        document.getElementById("names").classList.add("invalid-input");
        isValid = false;
    }

    // Validating email
    if (email === "") {
        document.getElementById("emailError").textContent = "Email is required";
        document.getElementById("emailError").style.display = "block";  
        document.getElementById("email").classList.add("invalid-input");
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        document.getElementById("emailError").style.display = "block";  
        document.getElementById("email").classList.add("invalid-input");
        isValid = false;
    } else if (email.length > 100) {
        document.getElementById("emailError").textContent = "Email should not exceed 100 characters.";
        document.getElementById("emailError").style.display = "block";  
        document.getElementById("email").classList.add("invalid-input");
        isValid = false;
    }

    // Validating Message
    if (message === "") {
        document.getElementById("messageError").textContent = "Message is required";
        document.getElementById("messageError").style.display = "block";
        document.getElementById("message").classList.add("invalid-input");
        isValid = false;   
    } else if (message.length < 5) {
        document.getElementById("messageError").textContent = "Message is too short. Please enter at least 5 characters.";
        document.getElementById("messageError").style.display = "block";
        document.getElementById("message").classList.add("invalid-input");
        isValid = false;   
    } else if (message.length > 1000) {
        document.getElementById("messageError").textContent = "Message should not exceed 1000 characters.";
        document.getElementById("messageError").style.display = "block";
        document.getElementById("message").classList.add("invalid-input");
        isValid = false;   
    }

    // If form is valid, send the message
    if (isValid) {
        sendMessage(names, email, message);
    }
}

// Define the sendMessage function separately
function sendMessage(names, email, message) {
    var formData = {
        names: names,
        email: email,
        message: message
    };

    return fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        return response.json();
    })
    .then(data => {
        console.log('Message sent successfully:', data);
        // Show confirmation message
        var confirmMessage = document.getElementById("messageSent");
        confirmMessage.style.display = "block";
        confirmMessage.textContent = "Message sent!";
        setTimeout(function() {
            confirmMessage.style.display = "none";
        }, 3000);
        // Reset form
        document.getElementById("contactForm").reset();
    })
    .catch(error => {
        console.error('Error sending message:', error);
        // Handle error
        // You can display an error message or perform any other action here
    });
}

// Add event listener for form submission
document.getElementById("contactForm").addEventListener("submit", validateForm);

// Function to validate email
function validateEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
