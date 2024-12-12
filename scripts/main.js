
// scripts/main.js
import fetchProducts from './fetchProducts.js';  // Import the function to fetch products
import { addToCart, renderCart, changeQuantity } from './FT-7.js'; // Import the addToCart and renderCart functions
import { getProducts } from './test.js';



document.addEventListener('DOMContentLoaded', async () => {
  // Fetch products before rendering
  await fetchProducts(); // Fetch and store products in the context

  // Make addToCart globally available
  window.addToCart = addToCart;
  window.changeQuantity = changeQuantity;

   // Fire a custom event to notify other scripts that products are ready
   const productsReadyEvent = new Event('productsReady');
   document.dispatchEvent(productsReadyEvent);

  getProducts();
  renderCart();
});

