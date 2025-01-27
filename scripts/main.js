import { addToCart, displayCartTotal, renderCardItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", async () => {
  let cart = getFromLocalStorage();

  if (window.location.pathname.includes("/cart.html")) {
    // if cart.html page open
    renderCardItems();
    displayCartTotal();
  } else {
    // if index.html page open
    const products = await fetchProducts();
    renderProducts(products, (e) => {
      addToCart(e, products);
    });
  }
  updateCartIcon(cart);
});
