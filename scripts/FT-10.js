import fetchProducts from './fetchProducts.js'; // Import the function to fetch products
import productContext from '../context/productContext.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch products before rendering
  await fetchProducts(); // Fetch and store products in the context

  //   const products = productContext.getProducts();

  // Display Mobile Slider
  async function displaySlider() {
    const results = productContext.getProducts();
    const queryStr = window.location.search;
    const params = new URLSearchParams(queryStr);
    let id = params.get('id');
    const product = results.find((p) => p._id === id);

    console.log('The categories of main product: ', product.categories);
    // console.log('length of producs: ', results.length);

    product.categories.forEach((category) => {
      results.forEach((result) => {
        if (result.categories.includes(category)) {
          //   console.log(result);

          console.log(category);

          const div = document.createElement('div');
          div.classList.add('swiper-slide');
          div.innerHTML = `
        <div class="product-card">
          <a
              class="link"
              href="productpage.html?id=${result._id}"
              title="${result.name}"
              ><div class="image-wrapper">
                <img
                  class="image"
                  src="${result.image}"
                  alt="${result.name}"
                  placeholder="img/product-placeholder.jpg"
                />  
              </div>
              <div class="info">
                <div >
                  <div class="brand">${result.name}</div>
                  <div class="price-wrapper">
                      <p class="selling-price">
                        ${result.price.$numberDecimal}<sup class="currency-symbol">€</sup>
                      </p>
                    </div>
                </div>
              </div>
              </a
            >
          `;
          document.querySelector('.swiper-wrapper').appendChild(div);
        }

        initMobileSwiper();
      });
    });
  }

  // Initialize Swiper
  function initMobileSwiper() {
    const swiper = new Swiper('.swiper', {
      loop: true,

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },

      slidesPerView: 2,
      spaceBetween: 30,
      freeMode: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        // when window width is >= 500px
        500: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 750px
        750: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        // when window width is >= 1200px
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }
  displaySlider();
});
