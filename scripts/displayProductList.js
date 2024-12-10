import productContext from '../context/productContext.js';  // Import the context

const productsDisplayedCount = 0
const pageSize = 5; // only fetch products 5 each time

document.addEventListener("DOMContentLoaded", () => {
    const [showMoreBtn] = document.getElementsByClassName('show-more-products')
    const [productListWrapper] = document.getElementsByClassName('product-list')

    const displayProductList = () => {
        const products = productContext.getProducts()

        if (products.length === 0) {
            // TODO: what to do if products is empty??
        }

        products.slice(productsDisplayedCount, productsDisplayedCount + pageSize).forEach((p) => {
            const productItemWrapper = document.createElement('div')
            productListWrapper.appendChild(productItemWrapper)

            const img = document.createElement('img')
            const name = document.createElement('p')
            const price = document.createElement('p')
            
            productItemWrapper.appendChild(img)
            productItemWrapper.appendChild(name)
            productItemWrapper.appendChild(price)
        })  

        productsDisplayedCount += pageSize;
    }

    displayProductList()

    showMoreBtn.addEventListener("click", () => {
        displayProductList()
    });
});