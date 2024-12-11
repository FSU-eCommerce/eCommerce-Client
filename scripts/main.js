// scripts/main.js
import fetchProducts from './fetchProducts.js';  // Import the function to fetch products
import { renderProducts } from './renderProducts.js'; // Import the rendering logic
import { renderCart } from './cart.js'; // Import the cart handling logic
import { addToCart } from './cart.js'; // Import the addToCart function

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch products before rendering
  await fetchProducts(); // Fetch and store products in the context

  // Make addToCart globally available
  window.addToCart = addToCart;

  // Now that products are fetched, render them
  renderProducts();
  renderCart();
});

