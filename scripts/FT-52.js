// Function to render the checkout cart on the checkout page
export const renderOrderConfirmation = () => {
  const orderList = document.getElementById('orderList');
  const summaryContent = document.getElementById('summaryContent');
  const checkoutCartContainer = document.getElementById('checkoutCartContainer');
  const recieptContainer = document.getElementById('recieptContainer');
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage

  // Render cart items
  orderList.innerHTML = cart.map(item => `  
    <div class="orderListRow"> 
        <div class="imageContainer">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="orderList">
            <h4 class="itemTitle">${item.name}</h4>
            <p class="description">${item.description}
            <p><b>Color:</b> ${item.color}</p>
            <p><b>Size:</b> ${item.size}</p>
            <p><b>Qty:</b> ${item.quantity}</>  
            <p><b>Price:</b> $${item.price.$numberDecimal * item.quantity}</p>
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
 
  recieptContainer.innerHTML = `
  <div class="orderTotal">
    <p><b>Subtotal:</b> $${subtotal.toFixed(2)}</span></p>
    <p><b>Shipping & handling:</b> $${shippingCost.toFixed(2)}</span></p>
    <p><b>Taxes (10%):</b> $${taxes.toFixed(2)}</span></p>
    <p class="total">Total: <span>$${total.toFixed(2)}</span></p> 
  </div>
  `;
};


  renderOrderConfirmation();
