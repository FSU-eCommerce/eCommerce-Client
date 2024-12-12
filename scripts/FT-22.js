// import fetchProducts from './fetchProducts.js'; 
// import productContext from '../context/productContext.js'; 

// document.addEventListener('DOMContentLoaded', async () => {
//     if (productContext.getProducts().length===0){
//        fetchProducts();
//     }
// const products = productContext.getProducts();
    

// const specialOffers = products.filter(product => product.price < 500); //max 30 price. filter = ny lista
// const sortedOffers = specialOffers.sort((a, b) => a.price - b.price); //sortera efter pris
// const limitedOffers = sortedOffers.slice(0,12);//12 produkter ska visas på sidan


// // i html 
// const productOfferDiv = document.getElementById('product-offer');
//   productOfferDiv.innerHTML = '';

//   const productRow1 = document.createElement('div');
// productRow1.classList.add('product-row');
// const productRow2 = document.createElement('div');
// productRow2.classList.add('product-row');

// limitedOffers.forEach((product, index) => {
//     const productCard = document.createElement('div');
//     productCard.classList.add('product-name');
    
//     const img = document.createElement('img');
//     img.src = product.image;
//     img.classList.add('product-image');
    
//     const price = document.createElement('p');
//     price.textContent = `$${product.price}`;
//     price.classList.add('product-price');

//     const name = document.createElement('p');
//     name.textContent = `${product.name}`;
//     name.classList.add('product-name');
    
//     const productLink //oklart 
    
//     productCard.appendChild(img);
//     productCard.appendChild(name);
//     productCard.appendChild(price);

//     if (index < 6) {
//         productRow1.appendChild(productLink);
//       } else {
//         productRow2.appendChild(productLink);
//       }
//     });
//     productOfferDiv.appendChild(productRow1);
//     productOfferDiv.appendChild(productRow2);
// });


import productContext from '../context/productContext.js';

export function getProductsForFT22() {
    console.log("Fetching products from context...");

    const products = productContext.getProducts();
    console.log("Got products from context:", products);

    if (!products || products.length === 0) {
        console.log('No products available');
        return;
    }

    // Ensure price is parsed correctly
    const specialOffers = products.filter(product => {
      const price = parseFloat(product.price?.$numberDecimal || product.price || 0);
      console.log("Product price being checked:", price); // Debugging
      return price < 3000;
    });

    // Sort and limit results
    const sortedOffers = specialOffers.sort((a, b) => {
      const priceA = parseFloat(a.price?.$numberDecimal || a.price || 0);
      const priceB = parseFloat(b.price?.$numberDecimal || b.price || 0);
      return priceA - priceB;
    });

    const limitedOffers = sortedOffers.slice(0, 12);

// Log results
console.log("Special offers:", specialOffers);
console.log("Sorted offers:", sortedOffers);
console.log("Limited offers:", limitedOffers);

    console.log("special offers")
    console.log(specialOffers)

    // Uppdatera DOM
    const productOfferDiv = document.getElementById('product-offer');
    productOfferDiv.innerHTML = '';

    const productRow1 = document.createElement('div');
    productRow1.classList.add('product-row');
    const productRow2 = document.createElement('div');
    productRow2.classList.add('product-row');

    limitedOffers.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const img = document.createElement('img');
        img.src = product.image;
        img.classList.add('product-image');

        const name = document.createElement('p');
        name.textContent = product.name;
        name.classList.add('product-name');

        const price = document.createElement('p');
        price.textContent = `$${product.price}`;
        price.classList.add('product-price');

        const productLink = document.createElement('a');
        productLink.href = `productpage.html?id=${product._id}`;
        productLink.classList.add('product-link');
        productLink.appendChild(productCard);

        productCard.appendChild(img);
        productCard.appendChild(name);
        productCard.appendChild(price);

        if (index < 6) {
            productRow1.appendChild(productLink);
        } else {
            productRow2.appendChild(productLink);
        }
    });

    productOfferDiv.appendChild(productRow1);
    productOfferDiv.appendChild(productRow2);
}


// const fetchProducts = async () => {
//     try {
//       const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/products');
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const products = await response.json();

//       const specialOffers = products.filter(product => product.price < 30); //max 30 price. filter = ny lista
//       const sortedOffers = specialOffers.sort((a, b) => a.price - b.price); //sortera efter pris
//       const limitedOffers = sortedOffers.slice(0,12);//12 produkter ska visas på sidan

// const productOfferDiv = document.getElementById('product-offer');
// productOfferDiv.innerHTML='';
// // html
//     const productRow1 = document.createElement('div');
//     productRow1.classList.add('product-row');

//     const productRow2 = document.createElement('div');
//     productRow2.classList.add('product-row');

// // produktkort
// limitedOffers.forEach((product, index) => {
//     const productCard = document.createElement('div');
//     productCard.classList.add('product-name');

//     const img = document.createElement('img');
//     img.src = product.image;
//     img.classList.add('product-image');

//     const price = document.createElement('p');
//     price.textContent = `$${product.price}`;
//     price.classList.add('product-price');

//     const productLink //oklart 

//     productCard.appendChild(img);
//     productCard.appendChild(name);
//     productCard.appendChild(price);

//     //12 bilder 
//     if (index < 6) {
//         productRow1.appendChild(productLink);
//     } else {
//         productRow2.appendChild(productLink);
//     }
// });
//     productOfferDiv.appendChild(productRow1);
//     productOfferDiv.appendChild(productRow2);

// } catch (error) {
//     console.error(error)
// }
// };
// document.addEventListener('DOMContentLoaded', () => {
//     fetchProducts();
//   });

  