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
const renderProducts = (products, callBackFuntion) => {
  // map through products and create a product card for each product
  elements.productList.innerHTML = products
    .map(
      (product) => `<div class="product">
          <!-- Image -->
          <img
            src="${product.image}"
            class="product-image"
            alt="product-image"
          />
          <!-- Info -->
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <a href="#" class="add-to-cart" data-id="${product.id}">Add to cart</a>
          </div>
        </div>`
    )
    .join("");

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  // add event listener to each add to cart button
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", callBackFuntion); // add product to cart
  });
};

export { fetchProducts, renderProducts };
