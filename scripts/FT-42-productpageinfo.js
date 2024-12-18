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

  const product = products.find((p) => p._id === productId);
  console.log("Product found in context", product);

  return product;
};

//______________________________________________________________________________________
// Function to extract unique colors from the stock
const extractUniqueColors = (stock) => {
  return new Set(stock.map(item => item.color));
};

// Function to create a color button
const createColorButton = (color) => {
  const colorButton = document.createElement("button");
  colorButton.style.backgroundColor = color;
  colorButton.classList.add("color-btn");
  colorButton.setAttribute('data-color', color);

  return colorButton;
};

// Function to handle the color button click
const handleColorButtonClick = (color, stock) => {
  console.log("Color selected:", color);
  
  document.querySelectorAll(".color-btn").forEach(btn => btn.classList.remove("selected"));
  
  const selectedButton = document.querySelector(`[data-color="${color}"]`);
  selectedButton.classList.add("selected");

  updateProductDetailsForColor(color, stock);
};

// Function to render color buttons dynamically
const renderColorButtons = (stock) => {
  const colorSelectDiv = document.getElementById("colorSelect");
  colorSelectDiv.innerHTML = "";

  const uniqueColors = [...extractUniqueColors(stock)];

  uniqueColors.forEach((color, index) => {
    const colorButton = createColorButton(color);
    colorButton.addEventListener("click", () => handleColorButtonClick(color, stock));
    colorSelectDiv.appendChild(colorButton);

      if (index === 0) {
        colorButton.classList.add('selected');
        updateProductDetailsForColor(color, stock);
      }
  });

};

// Function to update the product details based on the selected color
const updateProductDetailsForColor = (selectedColor, stock) => {
  const selectedColorStock = stock.filter(item => item.color === selectedColor);

  renderSizeButtons(selectedColorStock);

  const firstSize = selectedColorStock[0]?.size;
  if (firstSize) {
    updateQuantityForSize(firstSize, selectedColorStock);
  }
 
};

//_______________________________________________________________________________________
//Functions to check the quantity of the size
const handleSizeButtonClick = (size, selectedColorStock) => {
  console.log("Size selected:", size);
  document.querySelectorAll(".sizes button").forEach(btn => btn.classList.remove("selected"));
  const selectedButton = document.querySelector(`[data-size="${size}"]`);
  selectedButton.classList.add("selected");

  updateQuantityForSize(size, selectedColorStock);
};

// Function to update quantity based on the selected size
const updateQuantityForSize = (size, selectedColorStock) => {
  const sizeStock = selectedColorStock.filter(item => item.size === size);
  const maxStock = sizeStock.reduce((sum, item) => sum + item.quantity, 0); 

  initializeQuantityControls(sizeStock, maxStock);
};

// Function to render size buttons dynamically based on the selected color
const renderSizeButtons = (selectedColorStock) => {
  const sizeSelectDiv = document.getElementById("sizeSelect");
  const sizeButtons = sizeSelectDiv.querySelectorAll("button");

  sizeButtons.forEach(button => {
    const size = button.textContent;
    const stockForSize = selectedColorStock.find(item => item.size === size);
    if (stockForSize && stockForSize.quantity > 0) {
      button.disabled = false;
      button.setAttribute('data-size', size)
    } else {
      button.disabled = true;
    }

    button.setAttribute('data-size', size);
  });

  sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const size = button.textContent;
      handleSizeButtonClick(size, selectedColorStock);
    });
  });

  const firstAvailableSize = selectedColorStock.find(item => item.quantity)?.size;
  if (firstAvailableSize) {
    const firstSizeButton = document.querySelector(`[data-size="${firstAvailableSize}"]`);
    firstSizeButton.classList.add('selected');
    updateQuantityForSize(firstAvailableSize, selectedColorStock);
  }
};

//_______________________________________________________________________________________

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
  document.querySelector(".price").textContent = `${product.price.$numberDecimal} sek`;
  document.querySelector(".color").innerHTML = `Color <br>${product.color || "N/A"}`;
  document.querySelector(".description p").textContent = product.description;

  renderColorButtons(product.stock);

  // Hide the loading text and show the product details
  document.getElementById("loading").style.display = "none";
  document.querySelector(".productImageDiv").style.display = "block";
  document.querySelector(".productDetailsContainer").style.display = "block";
};

//________________________________________________________________________________________
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

//_______________________________________________________________________________________
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

//________________________________________________________________________________________
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


const initializeQuantityControls = (selectedSizeStock, maxStock) => {
  const quantityInput = document.getElementById('quantity');
  const increaseBtn = document.getElementById('increaseBtn');
  const decreaseBtn = document.getElementById('decreaseBtn');

  if (maxStock > 0) {
    quantityInput.value = 1;
  } else {
    quantityInput.value = 0;
    console.log('This product is out of stock.');
  }

  decreaseBtn.addEventListener("click", () => {
    decreaseQuantity(quantityInput);
    updateQuantityDisplay(quantityInput, maxStock);
  });

  increaseBtn.addEventListener("click", () => {
    increaseQuantity(quantityInput, maxStock);
    updateQuantityDisplay(quantityInput, maxStock);
  });

  quantityInput.addEventListener("input", () => {
    validateQuantityInput(quantityInput, maxStock);
  });
};