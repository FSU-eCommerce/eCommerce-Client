import productContext from '../context/productContext.js'; // Import productContext

// Function to add a product to the cart
export const addToCart = (productId) => {

  const products = productContext.getProducts();
  const product = products.find(p => p._id === productId);

  if (product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item._id === productId);

    if (existingProduct) {
      // If the product is already in the cart, increase its quantity
      existingProduct.quantity += 1;
      console.log(`${product.name} quantity increased to ${existingProduct.quantity}`);
    } else {
      // If the product is not in the cart, add it with quantity 1
      cart.push({ ...product, quantity: 1 });
      console.log(`${product.name} added to cart with quantity 1`);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Log the updated cart
    console.log('Cart:', cart);

    renderCart(); // Re-render the cart after adding the item
  } else {
    console.error('Product could not be added to the cart.');
  }
};

// ____________________________________________________________________________________________

// Function to render the cart
export const renderCart = () => {
  const cartContainer = document.getElementById('cartContainer');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Price: ${item.price.amount} ${item.price.currency}</p>
      <button onclick="removeFromCart('${item._id}')">Remove</button>
    </div>
  `).join('');
};

// ____________________________________________________________________________________________

// Function to remove a product from the cart
export const removeFromCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Remove product by ID
  cart = cart.filter(item => item._id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));

  console.log('Product removed from cart.');

  renderCart(); // Re-render the cart after removal
};

// Make sure the removeFromCart function is globally accessible
window.removeFromCart = removeFromCart;



//______________________________________________________________________________________________

//function to open and close cart
document.getElementById('cartLink').addEventListener('click', () => {
    document.getElementById('cart').classList.add('open');
})

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cart').classList.remove('open');
})
