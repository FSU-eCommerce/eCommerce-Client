// scripts/displayProductList.js
import productContext from '../context/productContext.js';  // Import the product context

console.log("displayProductList.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector('.product-list');
  const showMoreBtn = document.querySelector('.show-more-products');

  let productsDisplayedCount = 0; // Track how many products have been displayed
  const pageSize = 6; // Number of products to display at a time

  const renderProducts = () => {
    const products = productContext.getProducts();
    console.log('Products in context (displayProductList.js):', products); // Debugging line

    // Check if products exist
    if (!products || products.length === 0) {
      console.log('No products available');
      productList.innerHTML = '<p>No products available</p>';
      return;
    }

    // Determine the slice of products to render
    const nextProducts = products.slice(productsDisplayedCount, productsDisplayedCount + pageSize);

    // Append each product to the product list
    nextProducts.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');

      productItem.innerHTML = `
        <a href="productpage.html?id=${product._id}" class="product-link">
          <img src="${product.image}" alt="${product.name}" class="product-img">
          <h3>${product.name}</h3>
          <p>Price: $${product.price.$numberDecimal}</p>
        </a>
      `;

      productList.appendChild(productItem);
    });

    // Update the count of displayed products
    productsDisplayedCount += nextProducts.length;

    // Hide the "Show More" button if all products are displayed
    if (productsDisplayedCount >= products.length) {
      showMoreBtn.style.display = 'none';
    }
  };

  // Ensure the listener is attached before the event can fire
  const productsReadyHandler = () => {
    console.log("ProductsReady event received in displayProductList.js");
    renderProducts();

    // Attach "Show More" button listener
    showMoreBtn?.addEventListener('click', () => {
      renderProducts();
    });
  };

  // Attach the event listener early
  document.addEventListener('productsReady', productsReadyHandler);

  // As a fallback, check if products are already available in the context
  if (productContext.getProducts().length > 0) {
    console.log("Products were already available in context.");
    productsReadyHandler();
  }
});
