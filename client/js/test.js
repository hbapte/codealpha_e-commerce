document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Serialize form data into JSON
        const formData = {};
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            formData[input.name] = input.value;
        });
        const serializedData = JSON.stringify(formData);

        // Store serialized data in local storage
        localStorage.setItem('formData', serializedData);

        // Optionally, you can clear the form after submission
        form.reset();

        // Optionally, display a success message
        alert('Form data submitted successfully and stored in local storage!');
    });
});


// Toggle password visibility
function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  