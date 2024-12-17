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

// To render the product details on the html product page
const renderProductDetails = (product) => {
  console.log("Rendering product:", product);
  if (!product) {
    document.querySelector(
      ".container"
    ).innerHTML = `<p class="noProductText">Product not found</p>`;
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

  // Size button with stock notification and low in stock
  const sizeContainer = document.querySelector(".sizes");
  sizeContainer.innerHTML = `<p class="sizeText">EU SIZE</p>`;

  const sizes = ["XS", "S", "M", "L", "XL"];
  sizes.forEach((size) => {
    const button = document.createElement("button");

    button.textContent = size;
    button.style.marginRight = "15px";

    // Check stock
    if (product.stock === 0) {
      button.textContent = `${size} ✖`;
      button.disabled = true;
    } else if (product.stock <= 5) {
      const lowStockText = document.createElement("span");
      lowStockText.classList.add("lowStockText");
      lowStockText.textContent = "Low stock";
    }
  });
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
    renderProductDetails(product);

    const addToCartBtn = document.getElementById("addToCartBtn"); //Peter
    addToCartBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      addToCart(productId); // Call addToCart with the product ID
    }); // Peter
  });
});
