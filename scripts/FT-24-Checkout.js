// Function to render the cart on the checkout page
export const renderCart = () => {
    const cartContainer = document.getElementById('cartItemList');
    const summayContent = document.getElementById('summaryContent');
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage
  
    // Check if the cart is empty
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
    console.log(cart)
  
    // Render cart items
    cartContainer.innerHTML = cart.map(item => `
      <div class="checkout-cart-item">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Price: ${item.price.$numberDecimal}</p>
        <p>Qty: ${item.quantity}</p>
        <button onclick="removeFromCart('${item._id}')">Remove</button>
      </div>
    `).join('');


    

    // Render cart items
    summayContent.innerHTML = cart.map(item => `
      <div class="checkout-cart-item">
        <p>Price: $${item.price.$numberDecimal}</p>
      </div>
    `).join('');

  

    // Render total price
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  

    const currency = cart[0]?.price.currency || ''; // Assuming all items have the same currency
    cartContainer.innerHTML += `<p>Total: ${total} ${currency}</p>`;
  };
  
  // Function to remove an item from the cart
  export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item._id !== productId); // Remove the product by ID
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart back to localStorage
    renderCart(); // Re-render the cart
  };
  
  // Optional: Function to handle checkout
  export const proceedToCheckout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
  
    // Perform checkout logic here (e.g., send cart details to server)
    alert('Proceeding to checkout...');
    localStorage.removeItem('cart'); // Clear the cart after checkout
    renderCart(); // Re-render the cart (should now be empty)
  };
  