const productContext = {
  products: [], // This will hold the products
  
  // Method to add a product to the context
  addProduct(product) {
    this.products.push(product);
  },

  // Method to set all products (for initializing them)
  setProducts(products) {
    this.products = products;
  },
  
  // Method to get all products in the context
  getProducts() {
    console.log('Getting products:', this.products); // Debugging line
    return this.products;
  },

  // Method to clear all products in the context
  clearProducts() {
    this.products = [];
  }
};

export default productContext;
