// scripts/getProducts.js
import productContext from '../context/productContext.js';  // Import productContext

// Function to render products in the HTML
const renderProducts = () => {
  const products = productContext.getProducts();  // Get the products from context
  console.log('Rendering products:', products);  // Debugging line
//   console.log(products[4].name)
  // Get the container where products will be rendered
  const productListContainer = document.querySelector('.product-list');
  
  // If no products, show a message
  if (!products || products.length === 0) {
      productListContainer.innerHTML = '<p>No products available</p>';
      return;
    }
    
    // Clear the current content before rendering new products (optional)
    productListContainer.innerHTML = '';
    
  // Loop through the products and create HTML for each
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');  // Add a class for styling
    
    // Assuming each product has these properties
    const productName = product.name;
    const productDescription = product.description;
    const productPrice = product.price && product.price.value ? `$${product.price.value}` : 'Price not available';

    // Create the product HTML structure
    productElement.innerHTML = `
      <h2>${productName}</h2>
      <p>${productDescription}</p>
      <p><strong>Price:</strong> ${productPrice}</p>
      <p><strong>Categories:</strong> ${product.categories.join(', ')}</p> <!-- Assuming 'categories' is an array -->
    `;
    
    // Append the product to the product list container
    productListContainer.appendChild(productElement);
  });
};

// Call the function to render the products
renderProducts();
