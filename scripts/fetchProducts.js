import productContext from '../context/productContext.js';  // Import the context

 export const fetchProducts = async () => {
  try {
    const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/products');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const products = await response.json();

    // Save the products to the context
    products.forEach(product => {
      productContext.addProduct(product);  // Save each product in the context
    });

    console.log('Products saved to context:', productContext.getProducts());
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
