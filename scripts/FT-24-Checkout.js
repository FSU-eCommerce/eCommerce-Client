// Function to render the checkout cart on the checkout page
export const renderCheckoutCart = () => {
  const cartContainer = document.getElementById('cartItemList');
  const summaryContent = document.getElementById('summaryContent');
  const checkoutCartContainer = document.getElementById('checkoutCartContainer');
  const summaryContainer = document.getElementById('summaryContainer');
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage




 
  // If the cart is empty, show a message and clear the summary
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    summaryContent.innerHTML = '';
    return;
  }


  checkoutCartContainer.querySelector('.header2 h2').innerHTML = `In your cart (${cart.length})`;


  // Render cart items
  cartContainer.innerHTML = cart.map(item => `
    <div class="checkout-cart-item">
      <h3>${item.name}</h3>
      <div class="row gap1">
        <div>
        <img src="${item.image}" alt="${item.name}" style="width: 110px; height: auto;">
        </div>
        <div class="column">
        <p>Price: $${item.price.$numberDecimal}</p>
        <p>Color: ${item.stock.color}</p>
        <p>Size: ${item.stock.size}</p>
        <div class="row gap1">
            <label for="quantity-${item._id}">Qty: </label>
            <input
              type="number"
              id="quantity-${item._id}"
              class="quantityInput"
              data-product-id="${item._id}"
              value="${item.quantity}"
              min="1"
            >
          </div>
          <button class="removeItemButton" data-product-id="${item._id}">
            <i class="removeItemButton fa-solid fa-circle-minus"></i> Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');




  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price.$numberDecimal * item.quantity), 0);




  // Fetch Shipping & handling cost (selected from the form)
  const shippingMethod = document.querySelector('input[name="deliveryMethod"]:checked');
  const shippingCost = shippingMethod ? parseFloat(shippingMethod.dataset.cost) : 0;




  // Calculate Taxes (e.g., 10% of subtotal)
  const taxRate = 0.1; // 10% tax
  const taxes = subtotal * taxRate;




  // Calculate Total
  const total = subtotal + shippingCost + taxes;
 
  summaryContainer.innerHTML = `
  <div class="summaryHeader">
    <h2>Summary</h2>
  </div>
  <div class="summaryContent">
  <p class="bold topspace">Subtotal: <span>$${subtotal.toFixed(2)}</span></p>
      <p class="bold">Shipping & handling: <span>$${shippingCost.toFixed(2)}</span></p>
      <p class="bold">Taxes (10%): <span>$${taxes.toFixed(2)}</span></p>
      <p class="total">Total: <span>$${total.toFixed(2)}</span></p>
      </div>
  `;
  // Add event listeners for quantity inputs
  document.querySelectorAll('.quantityInput').forEach(input => {
    input.addEventListener('change', (event) => updateCartQuantity(event.target.dataset.productId, event.target.value));
  });
};


// Function to update cart item quantity
export const updateCartQuantity = (productId, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.map(item => {
    if (item._id === productId) {
      return { ...item, quantity: parseInt(newQuantity, 10) }; // Update quantity
    }
    return item;
  });
  localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
  renderCheckoutCart(); // Re-render the checkout cart
};




// Function to remove an item from the cart
export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter(item => item._id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart
  renderCheckoutCart(); // Re-render the checkout cart
};




// Function to handle Submit order
export const handleSubmitOrder = async (event) => {
  event.preventDefault(); // Prevent the form from submitting




  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before checking out.');
    return;
  }




  // Collect data from the shipping form
  const shippingFormData = new FormData(document.getElementById('checkout-form'));
  const shippingData = {};




  shippingFormData.forEach((value, key) => {
    if (key === "newsletter" || key === "privacyConsent") {
      // Om checkboxen är markerad sätt värdet till true, annars false
      shippingData[key] = value === "on"; // value === "on" ger true om markerad
    } else {
      shippingData[key] = value;
    }
  });




  // Collect data from the payment form
  const paymentData = {
    cardInfo: (document.getElementById("cardInfo").value),
    cardDate: document.getElementById("cardDate").value,
    cvc: (document.getElementById("cvc").value),
    nameOnCard: document.getElementById("nameOnCard").value
  };




  // Remove payment fields from shippingData
  delete shippingData.cardInfo;
  delete shippingData.cardDate;
  delete shippingData.cvc;
  delete shippingData.nameOnCard;




  // Collect data from the cart
  const cartData = cart.map(item => ({
    productId: item._id,
    quantity: Number(item.quantity),
    price: Number(item.price.$numberDecimal)
  }));




  // Create the final order object
  const orderData = {
    shippingData,
    paymentData,
    cartData
  };




  console.log("Ready to fetch order to backend")
  console.log("Order Data: ", orderData);
  console.log("JSON Order Data: ", JSON.stringify(orderData, null, 2));












  // ___________________________ SEND ORDER TO BACKEND _____________________________




  try {
    // Submit order to the server
    const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });




    if (!response.ok) {
      throw new Error('Network response was not ok');
    }




    const data = await response.json();
    console.log("Order submitted successfully", data);




    // window.location.href = 'order-confirmation.html';
  } catch (error) {
    console.error('Error submitting order:', error);
  }
};




// __________________________________________________________________________________








// Function to set up event listeners when the DOM is ready
const setupEventListeners = () => {
  // Render the cart when the page is loaded
  renderCheckoutCart();




  // Event listener for remove item buttons
  document.getElementById('cartItemList')?.addEventListener('click', (e) => {
    const button = e.target.closest('.removeItemButton');
    if (button) {
      const productId = button.dataset.productId;
      removeFromCart(productId);
    }
  });




  // Event listener for quantity inputs
  document.getElementById('cartItemList')?.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantityInput')) {
      const productId = e.target.dataset.productId;
      const newQuantity = e.target.value;
      if (newQuantity >= 1) { // Ensure the quantity is at least 1
        updateCartQuantity(productId, newQuantity);
      }
    }
  });
 
  // ______________________________________________________
 
  // Remove item buttons event listener
  document.getElementById('cartItemList')?.addEventListener('click', (e) => {
    const button = e.target.closest('.removeItemButton');
    if (button) {
      const productId = button.dataset.productId;
      removeFromCart(productId);
    }
  })
};




// Get the form and prevent its default submission
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    handleSubmitOrder(event); // Call the handleSubmitOrder function
  });
}




// Wait for the DOM to be fully loaded, then set up event listeners
document.addEventListener('DOMContentLoaded', setupEventListeners);