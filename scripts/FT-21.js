const fetchProducts = async () => {
    try {
      const response = await fetch('https://e-commerce-server-beta-flax.vercel.app/products');
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      //efter kategorie
      const categoriesToShow = ["Women", "Men", "Formal", "Casual", "Dress"];
    const filteredProducts = products.filter(product =>
      product.categories.some(category => categoriesToShow.includes(category))
    );
    //efter datum
      const sortedProducts = filteredProducts.sort((a, b) => {
        const dateA = new Date (a.date.$date);
        const dateB = new Date (b.date.$date);
        return dateB - dateA;
      }
    );
     //hämta en product för varje kategori
    const getLatestProductsByCategory ={}; //tom behållare för object
   for (const product of sortedProducts) {
    for (const category of product.categories) {
        if (categoriesToShow.includes(category) && !getLatestProductsByCategory[category]) {
            getLatestProductsByCategory[category] = product;
         }
     }
   }
   //i html
   const productLatestDiv = document.getElementById('product-latest');
   productLatestDiv.innerHTML='';
// 
   Object.keys(getLatestProductsByCategory).forEach(category => { 
    const product = getLatestProductsByCategory[category];

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const name = document.createElement('p');
    name.textContent = product.name;
    name.classList.add('product-name');

    const img = document.createElement('img');
    img.src = product.image;
    img.classList.add('product-image');

    // koppla till id
    const productLink = document.createElement('a');
    productLink.href=`/productpage.html?id=${product._id}`;
    productLink.appendChild(productCard);

    productCard.appendChild(img);
    productCard.appendChild(name);
    productLatestDiv.appendChild(productLink);
   })
    

    } catch (error) {
      console.error(error);
    }
    };
    document.addEventListener('DOMContentLoaded', () => {
        fetchProducts();
      });




