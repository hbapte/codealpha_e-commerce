document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("LoginForm");
  const messageDiv = document.getElementById("message");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");


  emailInput.addEventListener("input", function () {
    const email = emailInput.value.trim();
    const emailError = document.getElementById("email-Error");
    if (email === "") {
      emailError.textContent = "Email is required";
    } else if (!validateEmail(email)) {
      emailError.textContent = "Invalid email";
    } else {
      emailError.textContent = "";
    }
  });


  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value.trim();
    const passwordError = document.getElementById("password-Error");
    if (password === "") {
      passwordError.textContent = "Password is required";
    } else if (password.length < 6) {
      passwordError.textContent = "Password should be at least 6 characters long";
    } else if (!isPasswordStrong(password)) {
      passwordError.textContent = "Password requires capital & lowercase letters, number & special character";
    } else {
      passwordError.textContent = "";
    }
  });

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const valid = validateLoginForm(email, password);
    if (!valid) return; 

    const formData = new FormData(loginForm);
    const formDataJSON = {};
    formData.forEach((value, key) => {
      formDataJSON[key] = value;
    });

    try {
      const response = await fetch("https://my-brand-oxuh.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataJSON)
      });

      const responseData = await response.json();

      if (response.ok) {
        showSuccessMessage("Login successful");

        const token = responseData.token;
        const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour from now
        localStorage.setItem('jwt', token);
        localStorage.setItem('expiryTime', expiryTime);

        window.location.href = "/admin/dashboard.html";
      } else if (response.status === 401) {
        if (responseData.error === 'User not found') {
          showError('User not found');
        } else if (responseData.error === 'Please verify your email before logging in') {
          showError('Please verify your email before logging in');
        } else {
          showError('Wrong password');
        }
      } else {

        showError(responseData.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      showError("An error occurred");
    }
  });
});

// Function to perform client-side validation
function validateLoginForm(email, password) {
  const emailError = document.getElementById("email-Error");
  const passwordError = document.getElementById("password-Error");
  let valid = true;

  emailError.textContent = "";
  passwordError.textContent = "";

  // Validate email
  if (email === "") {
    emailError.textContent = "Email is required";
    valid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = "Invalid email";
    valid = false;
  }

  // Validate password
  if (password === "") {
    passwordError.textContent = "Password is required";
    valid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password should be at least 6 characters long";
    valid = false;
  } else if (!isPasswordStrong(password)) {
    passwordError.textContent = "Password requires capital & lowercase letters, number & special character";
    valid = false;
  }

  return valid;
}

// Function to validate email format
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

// Function to check password strength
function isPasswordStrong(password) {
  // Password should be at least 6 characters long and contain capital and lowercase letters, and special characters
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;
  return re.test(password);
}

function showSuccessMessage(message) {
  const successMessage = document.getElementById('message');
  successMessage.textContent = message;
  successMessage.style.color = 'green';
  successMessage.style.textAlign = 'center';
  setTimeout(function() {
      successMessage.textContent = '';
  }, 3500); 
}

function showError(message) {
  const errorMessageElement = document.getElementById('message');
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = 'red';
  errorMessageElement.style.textAlign = 'center';

  setTimeout(function () {
      errorMessageElement.textContent = '';
  }, 3000);
}


  
  // // Function to retrieve the JWT token from localStorage
  // function getToken() {
  //   const expiryTime = localStorage.getItem('expiryTime');
  //   if (!expiryTime || Date.now() > expiryTime) {
  //     localStorage.removeItem('jwt');
  //     localStorage.removeItem('expiryTime');

  //     window.location.href = "/login.html?SessionExpired=true";
  //     return null;
  //   }
  //   return localStorage.getItem('jwt');
  // }
  
  

    // PASSWORD VISIBILITY =======
function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}