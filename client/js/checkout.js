let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.textContent = cartItems.length;

function showToast(message, type = 'default') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    switch (type) {
        case 'success':
            toast.style.backgroundColor = '#4caf50'; 
            break;
        case 'error':
            toast.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            toast.style.backgroundColor = '#ff9800'; 
            break;
        default:
            toast.style.backgroundColor = '#333';
    }

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 9000);
}

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
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </td>
            <td>${(item.price * item.quantity).toLocaleString()} RWF</td>
            <td>
                <button class="remove-btn" onclick="removeItem('${item.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
                </button>
            </td>
        `;
        cartItemsElement.appendChild(row);
    });
    updateTotal();
}


function updateQuantity(id, change) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change); // Ensure quantity does not go below 1
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    }
}

function removeItem(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
}

function updateTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = `${total.toLocaleString()} RWF`;
}

// Initial cart update
updateCart();

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const buyerInfo = Object.fromEntries(formData.entries());

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderData = {
        buyerInfo: buyerInfo,
        products: cartItems,
        total: totalPrice
    };

   

    fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order response:', data);
        showToast('Thank you for your order! It has been submitted successfully.', 'success');

        // Clear the cart
        localStorage.removeItem('cart');
        cartItems = [];
        cartCount.textContent = cartItems.length;
        updateCart(); 

        setTimeout(() => {
            window.location.href = '../../client/index.html'; 
        }, 9000); 
    })
    .catch(error => {
        console.error('Error submitting order:', error);
        showToast('Failed to submit order. Please try again.', 'error');
    });
});
