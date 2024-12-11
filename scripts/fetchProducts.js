import productContext from '../context/productContext.js'; // Import the context

// Function to fetch products and save them to the context
const fetchProducts = async () => {
  try {
    const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/products');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const products = await response.json();

    // Save the products to the context
    productContext.setProducts(products); // Set all products at once

    console.log('Products saved to context:', productContext.getProducts());
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Export the fetchProducts function for use in other files
export default fetchProducts;
