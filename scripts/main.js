import fetchProducts from './fetchProducts.js';  // Import the function to fetch products

// Had to comment this out because it cause a problem preventing the rest of the code to execute
import { renderCart } from './FT-7.js';  // Import cart rendering logic

console.log("main.js");

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Fetching products...');
  await fetchProducts(); // Fetch and store products in the context


  // Fire a custom event to notify other scripts that products are ready
  const productsReadyEvent = new Event('productsReady');
  document.dispatchEvent(productsReadyEvent);

// Had to comment this out because it cause a problem preventing the rest of the code to execute
  // Render other components like the cart
  renderCart();
});
