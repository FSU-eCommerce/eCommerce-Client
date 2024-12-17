import productContext from "../context/productContext.js";
import { addToCart } from "./FT-7.js"; //Peter

// Function to get the product ID from the query string
const getProductIdFromQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log("Product ID from query string:", productId);
  return productId;
};

// Function to fetch a specific product by ID from the context
const fetchProductById = async (productId) => {
  const products = productContext.getProducts();
  console.log("ID", productId);
  console.log("context", products);

  //   products.forEach((product) => {
  //     console.log("Comparing:", product._id, "with", productId);
  //     console.log("Match:", product._id === productId);
  //   });

  //const product = products.find((product) => product._id === productId.trim());

  const product = products.find((p) => p._id === productId);
  console.log("Product found in context", product);

  //   if (!product) {
  //     try {
  //       const response = await fetch(
  //         `https://e-commerce-server-beta-flax.vercel.app/products/${productId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch product details");
  //       }
  //       product = await response.json();
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     }
  //   }

  return product;
};

// To render the product details on the page
const renderProductDetails = (product) => {
  console.log("Rendering product:", product);
  if (!product) {
    document.querySelector(".container").innerHTML = "<p>Product not found</p>";
    return;
  }

  document.querySelector(".productImg").src = product.image;
  document.querySelector(".productImg").alt = product.name;
  document.querySelector(".productDetails h1").textContent = product.name;
  document.querySelector(
    ".price"
  ).textContent = `${product.price.$numberDecimal} sek`;
  document.querySelector(".color").innerHTML = `Color <br>${
    product.color || "N/A"
  }`;
  document.querySelector(".description p").textContent = product.description;

  // Hide the loading text and show the product details
  document.getElementById("loading").style.display = "none";
  document.querySelector(".productImageDiv").style.display = "block";
  document.querySelector(".productDetailsContainer").style.display = "block";
};

// Main logic to load the product page
document.addEventListener("DOMContentLoaded", async () => {
  const productId = getProductIdFromQuery();

  if (!productId) {
    console.error("No product ID found in the URL");
    document.querySelector(".container").innerHTML =
      "<p>No product selected</p>";
    return;
  }

  // Wait for products to load first
  document.addEventListener("productsReady", async () => {
    const product = await fetchProductById(productId);
    if (product) {
      renderProductDetails(product);
      initializeQuantityControls(product);
      addToCartListener(productId);
    }  
  });
});

//AddToCartBtn functions, Peter
const addToCartListener = (productId) => {
  document.getElementById('addToCartBtn').addEventListener("click", (event) => {
    event.preventDefault();
   
  const quantityInput = document.getElementById('quantity');
  const quantity = parseInt(quantityInput.value);

   if (productId && quantity > 0) {
    addToCart(productId, quantity);
    }
  });
};

//Function for checking and changing the quantity
const updateQuantityDisplay = (quantityInput, maxStock) => {
  const currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > maxStock) {
    quantityInput.value = maxStock;
  }
};

const decreaseQuantity = (quantityInput) => {
  let currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
  }
};

const increaseQuantity = (quantityInput, maxStock) => {
  let currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity < maxStock) {
    quantityInput.value = currentQuantity + 1;
  }
};

const validateQuantityInput = (quantityInput, maxStock) => {
  let currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity < 1) {
    quantityInput.value = 1;
  } else if (currentQuantity > maxStock) {
    quantityInput.value = maxStock;
  }
};

const initializeQuantityControls = (product) => {
  const quantityInput = document.getElementById('quantity');
  const increaseBtn = document.getElementById('increaseBtn');
  const decreaseBtn = document.getElementById('decreaseBtn');

  const maxStock = product.stock;

  // Set the initial quantity based on stock
  if (maxStock > 0) {
    quantityInput.value = 1;
  } else {
    quantityInput.value = 0;
    console.log('This product is out of stock.');
  }

  // Add event listeners for buttons
  decreaseBtn.addEventListener("click", () => {
    decreaseQuantity(quantityInput);
    updateQuantityDisplay(quantityInput, maxStock);
  });

  increaseBtn.addEventListener("click", () => {
    increaseQuantity(quantityInput, maxStock);
    updateQuantityDisplay(quantityInput, maxStock);
  });

  // Add event listener to validate manual input
  quantityInput.addEventListener("input", () => {
    validateQuantityInput(quantityInput, maxStock);
  });
};