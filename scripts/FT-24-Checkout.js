// Function to render the checkout cart on the checkout page
export const renderCheckoutCart = () => {
  const cartContainer = document.getElementById('cartItemList');
  const summaryContent = document.getElementById('summaryContent');
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage

  // If the cart is empty, show a message and clear the summary
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    summaryContent.innerHTML = ''; // Clear the summary when the cart is empty
    return;
  }

  // Render cart items
  cartContainer.innerHTML = cart.map(item => `
    <div class="checkout-cart-item">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Price: $${item.price.$numberDecimal}</p>
      <p>Qty: ${item.quantity}</p>
      <button class="removeItemButton" data-product-id="${item._id}">Remove</button>
    </div>
  `).join('');

  // Render the summary section (total price)
  summaryContent.innerHTML = `
    <div class="checkout-cart-item">
      <p>Total: $${cart.reduce((sum, item) => sum + (item.price.$numberDecimal * item.quantity), 0)}</p>
    </div>
  `;
};

// Function to remove an item from the cart
export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter(item => item._id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart
  renderCheckoutCart(); // Re-render the checkout cart
};

// Proceed to checkout: show payment section and save data from the first form
export const proceedToCheckout = (event) => {
  event.preventDefault(); // Prevent the form from submitting and navigating away

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before checking out.');
    return;
  }

  // Collect shipping form data
  const formData = new FormData(document.getElementById('checkout-form'));
  const shippingData = {};
  formData.forEach((value, key) => shippingData[key] = value);

  // Save shipping data to localStorage
  localStorage.setItem('shippingData', JSON.stringify(shippingData));

  // Reveal payment section
  document.querySelector('.d-none').style.display = 'block';

  // Re-render the cart (to ensure it's visible even after proceeding to checkout)
  renderCheckoutCart();
};

// Function to set up event listeners when the DOM is ready
const setupEventListeners = () => {
  // Render the cart when the page is loaded
  renderCheckoutCart();

  // Get the form and prevent its default submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', proceedToCheckout); // Prevent form submission
  }

  // Remove item buttons event listener
  document.querySelectorAll('.removeItemButton').forEach(button =>
    button.addEventListener('click', (event) => removeFromCart(event.target.dataset.productId))
  );
};

// Wait for the DOM to be fully loaded, then set up event listeners
document.addEventListener('DOMContentLoaded', setupEventListeners);
