// document.addEventListener("DOMContentLoaded", () => {
//     const ctaButton = document.getElementById("cta-button");

//     ctaButton.addEventListener("click", () => {
//         alert("Tack för ditt intresse! Produkter kommer snart!");
//     });
// });



import productContext from '../context/productContext.js'; // Import the context
import fetchProducts from '../scripts/fetchProducts.js'; // Import the fetch function

// Function to render products
const renderProducts = () => {
  const productList = document.getElementById('productList');
  const products = productContext.getProducts();

  // Check if there are products to display
  if (products.length === 0) {
    productList.innerHTML = '<p>No products available</p>';
    return;
  }

  // Map and render the products
  productList.innerHTML = products.map(product => `
    <div class="product">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: ${product.price.amount} ${product.price.currency}</p>
      <button onclick="addToCart('${product._id}')">Köp</button>
    </div>
  `).join('');
};

// Function to add a product to the cart
const addToCart = (productId) => {
  const products = productContext.getProducts();
  const product = products.find(p => p._id === productId);

  if (product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} har lagts till i varukorgen!`);
  } else {
    alert('Produkten kunde inte läggas till i varukorgen.');
  }
};

// Ensure addToCart is globally available (so it works with the onclick attribute)
window.addToCart = addToCart;

// Main function to initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  // Fetch products and save them to the context
  await fetchProducts();

  // Render the products once they're fetched
  renderProducts();
});
