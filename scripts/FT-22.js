const fetchProducts = async () => {
    try {
      const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/products');
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
    

      const specialOffers = products.filter(product => product.price < 30); //max 30 price
      const sortedOffers = specialOffers.sort((a, b)) => a.price - b.price;
      const limitedOffers = specialOffers.slice(0,12);//12 produkter

    }

