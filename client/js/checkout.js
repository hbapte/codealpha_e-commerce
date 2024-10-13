let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
 const cartItemsElement = document.getElementById('cart-items');
 cartItemsElement.innerHTML = '';

 cartItems.forEach(item => {
     const row = document.createElement('tr');
     row.innerHTML = `
         <td>
             <div class="product-info">
                 <img src="${item.image}" alt="${item.name}">
                 ${item.name}
             </div>
         </td>
         <td>${item.price} RWF</td>
         <td>
             <div class="quantity-control">
                 <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                 <span>${item.quantity}</span>
                 <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
             </div>
         </td>
         <td>${item.price * item.quantity} RWF</td>
         <td>
             <button class="remove-btn" onclick="removeItem(${item.id})">🗑️</button>
         </td>
     `;
     cartItemsElement.appendChild(row);
 });

 updateTotal();
}

function updateQuantity(id, change) {
 const item = cartItems.find(item => item.id === id);
 if (item) {
     item.quantity = Math.max(1, item.quantity + change); // Prevent quantity from going below 1
     localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
     updateCart();
 }
}

function removeItem(id) {
 cartItems = cartItems.filter(item => item.id !== id);
 localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
 updateCart();
}

function updateTotal() {
 const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
 document.getElementById('cart-total').textContent = `${total.toLocaleString()} RWF`;
}

// Initialize the cart on page load
updateCart();

     document.getElementById('checkout-form').addEventListener('submit', function(e) {
         e.preventDefault();
         const formData = new FormData(e.target);
         const orderData = Object.fromEntries(formData.entries());
         console.log('Order submitted:', orderData);
         alert('Thank you for your order! It has been submitted successfully.');
     });

     updateCart();
