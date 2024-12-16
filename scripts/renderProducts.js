import productContext from '../context/productContext.js';

// Function to render products
export const renderProducts = () => {
  const productList = document.getElementById('productList');
  const products = productContext.getProducts();

  console.log('Products in context (render):', products);  // Debugging line

  // Check if there are products to display
  if (products.length === 0) {
    productList.innerHTML = '<p>No products available</p>';
    return;
  }

  // Map and render the products
  // productList.innerHTML = products.map(product => `
  //   <div class="product">
  //     <h3>${product.name}</h3>
  //     <p>${product.description}</p>
  //     <p>Price: ${product.price.amount} ${product.price.currency}</p>
  //     <button onclick="addToCart('${product._id}')">Köp</button>
  //   </div>
  // `).join('');
};