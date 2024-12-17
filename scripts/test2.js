import productContext from '../context/productContext.js'; 

export function getProducts() {
  const products = productContext.getProducts();
  console.log("got products from context in test2 js")
  console.log(products)
  
  if (products.length === 0) {
    console.log('No products available');
    return;
  }
  
  console.log("the name of product number 4 is: " + products[4].name)
}