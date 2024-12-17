import productContext from '../context/productContext.js';  // Import the product context

console.log("displayProductList.js loaded");

const queryParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", () => {
  const showMoreBtn = document.querySelector('.show-more-products');
  const productList = document.querySelector('.product-list');
  
  let productsDisplayedCount = 0; // Track how many products have been displayed
  const pageSize = 6; // Number of products to display at a time

  // Ensure that products are ready before rendering
  const renderProducts = () => {
    const sex = queryParams.get('sex') // "Women" or "Men"
    const products = productContext.getProducts().filter((p) => !sex || p.categories.includes(sex))
    console.log('Products in context from displayProductList (displayProductList.js):', products); // Debugging line

    if (!products || products.length === 0) {
      console.log('No products available');
      productList.innerHTML = '<p>No products available</p>';
      return;
    }

    // Determine the slice of products to render
    const nextProducts = products.slice(productsDisplayedCount, productsDisplayedCount + pageSize);

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

  // Attach the event listener to handle when the products are ready
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

  // If products are already available (i.e., fetched before the listener is attached), render them immediately
  if (productContext.getProducts().length > 0) {
    console.log("Products were already available in context.");
    // productsReadyHandler();
  } else {
    // Polling fallback if products are not yet available
    const checkIfProductsReady = setInterval(() => {
      if (productContext.getProducts().length > 0) {
        console.log("Products are now available, rendering...");
        clearInterval(checkIfProductsReady); // Stop polling once products are ready
       // productsReadyHandler();
      }
    }, 100); // Check every 100ms
  }
});
