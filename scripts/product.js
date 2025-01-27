import elements from "./helpers.js";
// fetch data from db.json file
const fetchProducts = async () => {
  try {
    // fetch data from db.json file
    const res = await fetch("db.json");
    // parse data to json
    const data = await res.json();

    if (!res.ok) {
      // if data is not fetched, throw an error
      throw new Error("Failed to fetch data");
    } else {
      // if data is fetched, return it
      return data;
    }
  } catch (error) {
    // log error message
    console.log(`Error: ${error}`);
    // return empty array if error is thrown
    return [];
  }
};

// render products to the UI
const renderProducts = (products, addToCartCallback) => {
  const productList = document.getElementById("product-list");

  // Ensure product-list exists before proceeding
  if (!productList) {
    console.error("Product list element not found.");
    return;
  }

  productList.innerHTML = ""; // Clear previous products if any

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-price">${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
      </div>
    `;

    const addToCartButton = productElement.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", (e) => addToCartCallback(e));

    productList.appendChild(productElement);
  });
};

export { fetchProducts, renderProducts };
