import productContext from '../context/productContext.js'; 

// Function to add a product to the cart
export const addToCart = (productId, quantity) => {
  const product = findProductById(productId);
  const maxStock = product.stock;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!product) {
    console.log('product not found');
    return;
  }

  if (!checkValidQuantity(quantity, maxStock)) {
    return;
  }
  
  cart = updateExistingProduct(cart, product, quantity) || addNewProductToCart(cart, product, quantity);
  saveTolocalStorage(cart);
  renderCart();
};

//Function to find productId
const findProductById = (productId) => {
  const products = productContext.getProducts();
  return products.find(p => p._id === productId);
};

//Function to check quantity validity
const checkValidQuantity = (quantity, maxStock) => {
  if (quantity <= 0) {
    console.log("Quantity must be at least 1");
    return false;
  }

  if (quantity > maxStock) {
    console.log(`You can only add up to ${maxStock} of this product to your cart.`);
    return false;
  }
  return true;
}

//function to update eexisting product in cart
const updateExistingProduct = (cart, product, quantity) => {
  const existingProduct = cart.find(item => item._id === product._id);
  if (existingProduct) {
    const newQuantity = existingProduct.quantity + quantity;
    if (newQuantity > product.stock) {
      alert(`You can only add up to ${maxStock} of this product to your cart.`);
        return cart;
    }
  return cart;  
  }
};

//function to add new product
const addNewProductToCart = (cart, product, quantity) => {
  cart.push({ ...product, quantity });
  console.log(`${product.name} added to cart with quantity ${quantity}`);
  return cart;
}
 //function to save to local
const saveTolocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Saved to Cart:', cart);
}

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

    const maxStock = product.stock;

    if (product.quantity > maxStock) {
      product.quantity = maxStock;
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
