
// scripts/displayProductList.js
import productContext from '../context/productContext.js';  // Import the product context

console.log("displayProductList.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const showMoreBtn = document.querySelector('.show-more-products');
  const productList = document.querySelector('.product-list');
  

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


let productsDisplayedCount = 0;
const pageSize = 6; // Display 6 products per page
const queryParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", () => {
  const [showMoreBtn] = document.getElementsByClassName('show-more-products');
  const [productListWrapper] = document.getElementsByClassName('product-list');

  // Check if the DOM elements are present
  if (!productListWrapper) {
    console.error('Product list wrapper not found!');
    return;
  }
  
  if (!showMoreBtn) {
    console.error('Show more button not found!');
    return;
  }

  // Display products after they're fetched (from context)
  const displayProductList = () => {
    const products = productContext.getProducts();    
    console.log('Products in context:', products);  // Debugging line

    if (products.length === 0) {
      console.log('No products available');
      productListWrapper.innerHTML = '<p>No products available</p>';
      return;  // You could show an alternative message here if you like
    }

    const sex = queryParams.get('sex'); // "Women" or "Men"
    // Filter products by category and then slice to limit the number shown
    products
      .filter((p) => p.categories.includes(sex))
      .slice(productsDisplayedCount, productsDisplayedCount + pageSize)
      .forEach((p) => {
        const productItemWrapper = document.createElement('a');
        productItemWrapper.href = "productdetails.html?id=" + p._id;
        productItemWrapper.classList = "product-item-wrapper";
        productListWrapper.appendChild(productItemWrapper);

        const img = document.createElement('img');
        const name = document.createElement('p');
        const price = document.createElement('p');

        img.src = p.image;
        img.classList = "product-item-img";
        name.textContent = p.name;
        name.classList = "product-item-name";
        price.textContent = '$' + p.price.$numberDecimal;
        price.classList = "product-item-price";

        productItemWrapper.appendChild(img);
        productItemWrapper.appendChild(name);
        productItemWrapper.appendChild(price);
      });

    productsDisplayedCount += pageSize;
  };

  displayProductList();

  showMoreBtn.addEventListener("click", () => {
    displayProductList();
  });
});

