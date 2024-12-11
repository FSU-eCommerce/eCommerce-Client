// import productContext from '../context/productContext.js';  // Import the product context

// document.addEventListener('DOMContentLoaded', () =>{
//     const displayLatestProducts = async () => {
// try {
// // fetch? fetchProducts
// const fetchProducts = async () => {
//     try {
//       const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/products');
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const products = await response.json();
//     }  

// // olika variabel

// const productItemWrapper = document.createElement('a');
// productItemWrapper.href =

// const categories = ['Women', 'Men', 'Formal', 'Casual', 'Dress'];

// // 

// const getLatestProducts = (products, categories) => {
//     //produkt utifrån kategori
//     const filteredProducts = products.filter(product => categories.some(category => product.categories.includes(category))
// );
// // product efter datum
// const sortedProducts = filteredProducts.sort((a,b) => { 
//     return new Date(b.date.$date) - new Date(a.date.$date);
// });
// }

// const productWrapper = document.createElement('div');
// const img = document.createElement('img');
// const name = document.createElement('p');
// const price = document.createElement('p');//maybe wont show
// const date = document.createElement('p');//maybe wont show



// });

// 
const fetchProducts = async () => {
    try {
      const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/products');
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();

      const categoriesToShow = ["Women", "Men", "Formal", "Casual", "Dress"];
    const filteredProducts = products.filter(product =>
      product.categories.some(category => categoriesToShow.includes(category))
    );
      

      console.log(filteredProducts); // Kontrollera att datan hämtas korrekt
    } catch (error) {
      console.error(error);
    }
    };
    document.addEventListener('DOMContentLoaded', () => {
        fetchProducts();
      });
