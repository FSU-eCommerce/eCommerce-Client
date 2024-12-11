import productContext from '../context/productContext.js';  // Import the product context

let productsDisplayedCount = 0;
const pageSize = 6; // Display 6 products per page
const queryParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", () => {
  const [showMoreBtn] = document.getElementsByClassName('show-more-products');
  const [productListWrapper] = document.getElementsByClassName('product-list');

  // Check if the DOM elements are present
  if (!productListWrapper) {
    console.error('Product list wrapper not found!');
    return;
  }
  
  if (!showMoreBtn) {
    console.error('Show more button not found!');
    return;
  }

  // Display products after they're fetched (from context)
  const displayProductList = () => {
    const products = productContext.getProducts();    
    console.log('Products in context:', products);  // Debugging line

    if (products.length === 0) {
      console.log('No products available');
      productListWrapper.innerHTML = '<p>No products available</p>';
      return;  // You could show an alternative message here if you like
    }

    const sex = queryParams.get('sex'); // "Women" or "Men"
    // Filter products by category and then slice to limit the number shown
    products
      .filter((p) => p.categories.includes(sex))
      .slice(productsDisplayedCount, productsDisplayedCount + pageSize)
      .forEach((p) => {
        const productItemWrapper = document.createElement('a');
        productItemWrapper.href = "productdetails.html?id=" + p._id;
        productItemWrapper.classList = "product-item-wrapper";
        productListWrapper.appendChild(productItemWrapper);

        const img = document.createElement('img');
        const name = document.createElement('p');
        const price = document.createElement('p');

        img.src = p.image;
        img.classList = "product-item-img";
        name.textContent = p.name;
        name.classList = "product-item-name";
        price.textContent = '$' + p.price.$numberDecimal;
        price.classList = "product-item-price";

        productItemWrapper.appendChild(img);
        productItemWrapper.appendChild(name);
        productItemWrapper.appendChild(price);
      });

    productsDisplayedCount += pageSize;
  };

  displayProductList();

  showMoreBtn.addEventListener("click", () => {
    displayProductList();
  });
});