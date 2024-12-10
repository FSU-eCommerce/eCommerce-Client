import productContext from '../context/productContext.js';  // Import the context


let productsDisplayedCount = 0
const pageSize = 6; // only fetch products 6 each time

document.addEventListener("DOMContentLoaded", () => {
    const [showMoreBtn] = document.getElementsByClassName('show-more-products')
    const [productListWrapper] = document.getElementsByClassName('product-list')

    const displayProductList = () => {
        const products = productContext.getProducts()

        if (products.length === 0) {
            // TODO: what to do if products is empty??
        }

        products.slice(productsDisplayedCount, productsDisplayedCount + pageSize).forEach((p) => {
            const productItemWrapper = document.createElement('a')
            productItemWrapper.href = "product-details?id=" + p._id
            productItemWrapper.classList = "product-item-wrapper"
            productListWrapper.appendChild(productItemWrapper)

            const img = document.createElement('img')
            const name = document.createElement('p')
            const price = document.createElement('p')

            img.src=p.image
            img.classList="product-item-img"
            name.textContent = p.name
            name.classList="product-item-name"
            price.textContent = '$' + p.price.$numberDecimal
            price.classList="product-item-price"
            
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