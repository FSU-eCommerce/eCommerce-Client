const fetchProducts = async () => {
    try {
      const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/products');
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
    

      const specialOffers = products.filter(product => product.price < 30); //max 30 price. filter = ny lista
      const sortedOffers = specialOffers.sort((a, b) => a.price - b.price); //sortera efter pris
      const limitedOffers = sortedOffers.slice(0,12);//12 produkter ska visas på sidan
    }
}
const productOfferDiv = document.getElementById('product-offer');
productOfferDiv.innerHTML='';
// html
    const productRow1 = document.createElement('div');
    productRow1.classList.add('product-row');

    const productRow2 = document.createElement('div');
    productRow2.classList.add('product-row');
