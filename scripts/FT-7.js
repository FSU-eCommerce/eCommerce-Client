import productContext from "../context/productContext.js";

// Function to add a product to the cart
const saveTolocalStorage = (cart) => {
  console.log("Attempting to save cart:", cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Saved to Cart:", cart);
};

export const addToCart = (productId, userChoices) => {
  console.log("Product ID:", productId);
  console.log("User Choices:", userChoices);

  const product = findProductById(productId);

  if (!product) {
    console.log("Product not found");
    return;
  }
   //const maxStock = product.stock.reduce((sum, item) => sum + item.quantity, 0);
   const sizeStock = product.stock.find(item => item.size === userChoices.size); // change
   const maxStock = sizeStock ? sizeStock.quantity : 0; //change
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];


  if (!checkValidQuantity(userChoices.quantity, maxStock)) {
    return;
  }

  const existingProduct = cart.find(
    (item) =>
      item._id === productId &&
      item.color === userChoices.color &&
      item.size === userChoices.size
  );

  if (existingProduct) {
    existingProduct.quantity += userChoices.quantity;
    if (existingProduct.quantity > maxStock) {
      existingProduct.quantity = maxStock;
    }
  } else {
    cart.push({
      _id: productId,
      image: product.image,
      name: product.name,
      price: product.price,
      color: userChoices.color,
      size: userChoices.size,
      quantity: userChoices.quantity,
    });
  }

  console.log("Saving to localStorage with cart:", cart);
  saveTolocalStorage(cart);
  renderCart();
};

//Function to find productId
const findProductById = (productId) => {
  const products = productContext.getProducts();
  return products.find((p) => p._id === productId);
};

//Function to check quantity validity
const checkValidQuantity = (quantity, maxStock) => {
  if (quantity <= 0) {
    console.log("Quantity must be at least 1");
    return false;
  }

  if (quantity > maxStock) {
    console.log(
      `You can only add up to ${maxStock} of this product to your cart.`
    );
    return false;
  }
  return true;
};

//function to update eexisting product in cart
/* const updateExistingProduct = (cart, product, quantity, color, size) => {
  const existingProduct = cart.find(item => item._id === product._id && item.color === color && item.size === size);
  if (existingProduct) {
    const newQuantity = existingProduct.quantity + quantity;
    if (newQuantity > product.stock) {
      alert(`You can only add up to ${maxStock} of this product to your cart.`);
        return cart;
    }
  return cart;  
  }
}; */

//function to add new product
/* const addNewProductToCart = (cart, product, quantity, color, size) => {
  cart.push({ ...product, quantity, color, size });
  console.log(`${product.name} added to cart with quantity ${quantity}`);
  return cart;
} */
//function to save to local
/* const saveTolocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Saved to Cart:', cart);
} */

// ____________________________________________________________________________________________

// Function to render the cart
export const renderCart = () => {
  const cartContainer = document.getElementById("cartContainer");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item) => {
      const product = findProductById(item._id);
      const sizeStock = product.stock.find(stock => stock.size === item.size).quantity;
        return`
    <div class="cart-item">
      <img src="${product.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-details">  
        <a href="productpage.html?id=${item._id}" class="cart-product-link">
          <h3>${item.name}</h3>
        </a>
        <p>Price: ${item.price.$numberDecimal} $</p>
        <p>Color: ${item.color}</p> <!-- Display selected color -->
        <p>Size: ${item.size}</p> 
        <div class="quantity">
          <button onclick="changeQuantity('${item._id}', -1)">-</button>
          <span>${item.quantity}</span> <!-- Display current quantity -->
          <button onclick="changeQuantity('${item._id}', 1)">+</button>
        </div>
        <button onclick="removeFromCart('${item._id}')">Remove</button>
      </div>  
    </div>
  `;
})
    .join("");

  /* const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = button.getAttribute("data-id");
      removeFromCart(productId);
    });
  }); */
};

// ____________________________________________________________________________________________
// Function to change the quantity
export const changeQuantity = (productId, change) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find((item) => item._id === productId);

  if (product) {
    const sizeStock = productContext.getProducts().find(p => p._id === productId)
      .stock.find(item => item.size === product.size).quantity;
    product.quantity += change;

    if (product.quantity < 1) {
      product.quantity = 1;
    }

    //const maxStock = product.stock;

    if (product.quantity > sizeStock) {
      product.quantity = sizeStock;
      console.log(`You can only add up to ${sizeStock} of this product in size ${product.size} to your cart.`);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(`${product.name} quantity changed to ${product.quantity}`);
    renderCart();
  } else {
    console.error("product not found");
  }
};

// ____________________________________________________________________________________________

// Function to remove a product from the cart
export const removeFromCart = (productId,) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Product removed from cart.");

  renderCart();
};

window.removeFromCart = removeFromCart;

//______________________________________________________________________________________________

// function to open and close cart
document.getElementById("cartLink").addEventListener("click", (event) => {
  event.preventDefault();
  const cart = document.getElementById("cart");
  cart.classList.toggle("open");
});

window.addEventListener("click", (event) => {
  const cart = document.getElementById("cart");
  const cartLink = document.getElementById("cartLink");

  if (!cart.contains(event.target) && event.target !== cartLink) {
    cart.classList.remove("open");
  }
});

document.getElementById("cart").addEventListener("click", (event) => {
  event.stopPropagation();
});

const quantityButtons = document.querySelectorAll(
  ".cart-item .quantity button"
);
quantityButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

//_______________________________________________________________________________________________
// Function to navigate to checkout-page
document.addEventListener("DOMContentLoaded", () => {
  event.preventDefault();
  const checkoutLink = document.getElementById("checkoutLink");
  const cartContainer = document.getElementById("cartContainer");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  checkoutLink.addEventListener("click", () => {
    if (cart.length > 0) {
      window.location.href = "checkout.html";
    }
  });

  renderCart();
});

//____________________________________________________________________________________
