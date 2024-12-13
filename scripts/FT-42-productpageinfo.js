import productContext from "../context/productContext.js";

// Function to get the product ID from the query string
const getProductIdFromQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log("Product ID from query string:", productId);
  return productId;
};

// Function to fetch a specific product by ID from the context
export const fetchProductById = async (productId) => {
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
  console.log(product);
  if (!product) {
    document.querySelector(".container").innerHTML = "<p>Product not found</p>";
    return;
  }

  document.querySelector(".productImg").src = product.image;
  document.querySelector(".productImg").alt = product.name;
  document.querySelector(".productDetails h1").textContent = product.name;
  document.querySelector(".price").textContent = `${product.price} sek`;
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

  const product = await fetchProductById(productId);
  renderProductDetails(product);
});
