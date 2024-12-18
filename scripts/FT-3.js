import fetchProducts from './fetchProducts.js'; // Import the function to fetch products
import productContext from '../context/productContext.js';

const globalObj = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
};

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch products before rendering
  await fetchProducts(); // Fetch and store products in the context

  const products = productContext.getProducts();
  //   console.log(products);

  async function searchAll() {
    const queryStr = window.location.search;
    const params = new URLSearchParams(queryStr);

    const searchResults = [];
    globalObj.search.term = params.get('search-term').toLowerCase();

    if (globalObj.search.term !== '' && globalObj.search.term !== null) {
      products.forEach((result) => {
        result.categories = result.categories.map((v) => v.toLowerCase());
        // console.log(result.categories);
        if (result.categories.includes(globalObj.search.term)) {
          searchResults.push(result);
        }
      });
      //   console.log(searchResults);

      if (searchResults.length === 0) {
        showAlert('No results found');
        return;
      }
      document.getElementById('search-results-heading').innerHTML = `
      <h2>${searchResults.length} results</h2>
  `;
      displaySearchResults(searchResults);
    } else {
      showAlert('Search field can not be empty');
    }
  }

  // Display Search Results on the Page
  function displaySearchResults(results) {
    // Clear previous results
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-results-heading').innerHTML = '';
    document.getElementById('pagination').innerHTML = '';
    // console.log(results.length);

    if (results.length) {
      results.forEach((result) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
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
      >`;

        document.querySelector('#search-results-heading').innerHTML = `
                <h2><u>${
                  results.length
                }</u> SEARCH RESULT(S) FOR <u>"${globalObj.search.term.toUpperCase()}</u>"</h2>
      `;
        document.getElementById('search-results').appendChild(div);
      });
    } else {
    }
    displayPagination();
  }

  // Display Pagination
  function displayPagination() {
    const div = document.getElementById('pagination');
    div.innerHTML = `<div class="pagination">
          <button type="button" class="btn btn-primary" id="prev">Prev</button>
          <button type="button" class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${globalObj.search.page} of ${globalObj.search.totalPages}</div>
        </div>`;

    // Disable prev button if on first page
    if (globalObj.search.page === 1) {
      document.getElementById('prev').disabled = true;
      // document.getElementById('prev').setAttribute('disabled', '');
    }

    // Disable next button if on last page
    if (globalObj.search.page === globalObj.search.totalPages) {
      document.getElementById('next').disabled = true;
    }

    // Next page
    document.getElementById('next').addEventListener('click', async () => {
      globalObj.search.page++;
      const { results, total_pages } = await searchData();
      displaySearchResults(results);
    });

    // Prev page
    document.getElementById('prev').addEventListener('click', async () => {
      globalObj.search.page--;
      const { results, total_pages } = await searchData();
      displaySearchResults(results);
    });
  }

  //   Show message in case of Empty Search
  function showAlert(message) {
    const alertEl = document.querySelector('.alert');
    alertEl.classList.add('alert', 'error');
    alertEl.innerText = message;
  }

  // Init Function
  function init() {
    switch (globalObj.currentPage) {
      case '/':
      case '/index.html':
        break;
      case '/search.html':
        searchAll();
        break;
    }
    // highlightLink();
  }

  init();
  const search = document.querySelector('.search-flex');
  const btn = document.querySelector('.btn');
  const input = document.querySelector('#search-term');

  btn.addEventListener('click', (e) => {
    search.classList.toggle('active');
    input.focus();
    if (!search.classList.contains('active')) {
      btn.setAttribute('type', 'submit');
    }
  });
});
