import productContext from '../context/productContext.js'; 

// Function to add a product to the cart
export const addToCart = (productId) => {

  const products = productContext.getProducts();
  const product = products.find(p => p._id === productId);

  if (product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item._id === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
      console.log(`${product.name} quantity increased to ${existingProduct.quantity}`);
    } else {
      cart.push({ ...product, quantity: 1 });
      console.log(`${product.name} added to cart with quantity 1`);
    }

  localStorage.setItem('cart', JSON.stringify(cart));

  console.log('Cart:', cart);

  renderCart();
  } else {
    console.error('Product could not be added to the cart.');
  }
  };

  // ____________________________________________________________________________________________

// Function to render the cart
export const renderCart = () => {
  const cartContainer = document.getElementById('cartContainer');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <a href="productpage.html?id=${item._id}" class="cart-product-link">
        <h3>${item.name}</h3>
      </a>
      <p>${item.description}</p>
      <p>Price: ${item.price.$numberDecimal} $</p>
      <div class="quantity">
      <button onclick="changeQuantity('${item._id}', -1)">-</button>
      <span>${item.quantity}</span> <!-- Display current quantity -->
      <button onclick="changeQuantity('${item._id}', 1)">+</button>
    </div>
      <button onclick="removeFromCart('${item._id}')">Remove</button>
    </div>
  `).join('');
};
  
// ____________________________________________________________________________________________
// Function to change the quantity
export const changeQuantity = (productId, change) =>  {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const product = cart.find(item => item._id === productId);

  if (product) {
    product.quantity += change;

    if (product.quantity < 1) {
      product.quantity = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`${product.name} quantity changed to ${product.quantity}`);
    renderCart();
  } else {
    console.error('product not found')
  }
};


// ____________________________________________________________________________________________

// Function to remove a product from the cart
export const removeFromCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart = cart.filter(item => item._id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));

  console.log('Product removed from cart.');

  renderCart();
};

window.removeFromCart = removeFromCart;



//______________________________________________________________________________________________

// function to open and close cart
document.getElementById('cartLink').addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('cart').classList.add('open');
})

document.getElementById('closeCart').addEventListener('click', () => {
  document.getElementById('cart').classList.remove('open');
});

window.addEventListener('click', (event) => {
  const cart = document.getElementById('cart');
  const cartLink = document.getElementById('cartLink');

  if (!cart.contains(event.target) && event.target !== cartLink) {
    cart.classList.remove('open');
  }
});

document.getElementById('cart').addEventListener('click', (event) => {
  event.stopPropagation(); 
});

const quantityButtons = document.querySelectorAll('.cart-item .quantity button');
quantityButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
  });
});


//_______________________________________________________________________________________________
// Function to navigate to checkout-page
document.addEventListener('DOMContentLoaded', () => {
  const checkoutLink = document.getElementById('checkoutLink');
  const cartContainer = document.getElementById('cartContainer');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

  checkoutLink.addEventListener('click', () => {
    if (cart.length > 0) {
      window.location.href = '#.html';
    }
  });

  renderCart();
});



//____________________________________________________________________________________
//FT-42 quantity codes
// Main logic to load the product page
/* document.addEventListener("DOMContentLoaded", async () => {
  const productId = getProductIdFromQuery();

  if (!productId) {
    console.error("No product ID found in the URL");
    document.querySelector(".container").innerHTML =
      "<p>No product selected</p>";
    return;
  } */

  // Wait for products to load first
  /* document.addEventListener("productsReady", async () => {
    const product = await fetchProductById(productId);
    renderProductDetails(product);
    addToCartListener(productId);
  });
}); */

//AddToCartBtn functions, Peter
/* const addToCartListener = (productId) => {
  document.getElementById('addToCartBtn').addEventListener("click", (event) => {
    event.preventDefault(); */

  /*   const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value, 10);

    const product = await fetchProductById(productId);
    const availableStock = product ? product.stock : 0;

    if (quantity > 0 && quantity <= availableStock) {
      addToCart(productId, quantity);
    }   */ 
   /* if (productId) {
    addToCart(productId);
    }
  });
}; */

//Functions to check stock and able quantity to add to cart
/* const increaseQuantity = async (productId) => {
  const quantityInput = document.getElementById('quantity');
  let currentQuantity = parseInt(quantityInput.value, 10);

  const product = await fetchProductById(productId); 
  const availableStock = product ? product.stock : 0;

  if (currentQuantity < availableStock) {
    quantityInput.value = currentQuantity + 1;
  } else {
    console.log("Sorry, we don't have enough stock for this product.");
  }
};

const decreaseQuantity = () => {
  const quantityInput = document.getElementById('quantity');
  let currentQuantity = parseInt(quantityInput.value, 10);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
  }
}; */

/* document.getElementById('increaseBtn').addEventListener('click', () => increaseQuantity(productId));
console.log(increaseQuantity(productId));
document.getElementById('decreaseBtn').addEventListener('click', decreaseQuantity()); */