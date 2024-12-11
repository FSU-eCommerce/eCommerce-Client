// document.addEventListener("DOMContentLoaded", () => {
//     const ctaButton = document.getElementById("cta-button");

//     ctaButton.addEventListener("click", () => {
//         alert("Tack för ditt intresse! Produkter kommer snart!");
//     });
// });

//Behövs i main.js för att hämta produkterna innan dom renderas ut, kommer pusha upp det från fetch products branchen.

// scripts/main.js
import { fetchProducts } from './fetchProducts.js';  // Import the function to fetch products
import { renderProducts } from './renderProducts.js'; // Import the rendering logic
import { renderCart } from './FT-7.js'; // Import the cart handling logic
import { addToCart } from './FT-7.js'; // Import the addToCart function

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch products before rendering
  await fetchProducts(); // Fetch and store products in the context

  // Make addToCart globally available
  window.addToCart = addToCart;

  // Now that products are fetched, render them
  renderProducts();
  renderCart();
});


