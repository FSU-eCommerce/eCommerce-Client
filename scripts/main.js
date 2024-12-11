// scripts/main.js
import fetchProducts from './fetchProducts.js';  // Import the function to fetch products
import { renderProducts } from './renderProducts.js'; // Import the rendering logic
import { addToCart, renderCart, changeQuantity } from './FT-7.js'; // Import the addToCart and renderCart functions

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch products before rendering
  await fetchProducts(); // Fetch and store products in the context

  // Make addToCart globally available
  window.addToCart = addToCart;
  window.changeQuantity = changeQuantity;

  // Now that products are fetched, render them
  renderProducts();
  renderCart();
});

