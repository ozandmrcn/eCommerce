import elements from "./helpers.js";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  calculateTotal,
  updateCartIcon,
} from "./utils.js";

// get cart items from local storage
let cart = getFromLocalStorage();

// export addToCart function
const addToCart = (e, products) => {
  e.preventDefault();

  // get product id
  const productId = parseInt(e.target.dataset.id);

  const product = products.find((product) => product.id === productId);

  if (!product) {
    console.error("Product not found.");
    return;
  } else {
    // check if product is already in the cart
    const exitingItem = cart.find((item) => item.id === product.id);
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      // create a cart item
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // add cart item to the cart
      cart.push(cartItem);
    }
    // save updated cart to local storage
    saveToLocalStorage(cart);

    // add text content to button
    e.target.textContent = "Added";

    setTimeout(() => {
      e.target.textContent = "Add to cart";
    }, 1500);
  }
  updateCartIcon(cart);
};

// export removeFromCart function
const removeFromCart = (e) => {
  const productId = parseInt(e.target.dataset.id);

  // Remove item from cart
  cart = cart.filter((item) => item.id != productId);

  saveToLocalStorage(cart);

  updateCartIcon(cart);

  renderCardItems();
};

const onQuantityChange = (e) => {
  const productId = +e.target.dataset.id;
  const newQuantity = +e.target.value;

  // Update quantity
  if (newQuantity > 0) {
    const cartItem = cart.find((item) => item.id == productId);

    cartItem.quantity = newQuantity;

    saveToLocalStorage(cart);

    updateCartIcon(cart);

    displayCartTotal();
  }
};

// export renderCardItems function
const renderCardItems = () => {
  elements.cartItemsList.innerHTML = cart
    .map(
      (item) => `<!-- Card Item -->
            <div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />

              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input type="number" min="1" class="cart-item-quantity" data-id="${item.id}" value="${item.quantity}" />
              </div>

              <h2 class="cart-item-price">$ ${item.price}</h2>

              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>`
    )
    .join("");

  // add event listener to remove from cart button
  const removeButtons = document.querySelectorAll(".remove-from-cart");

  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });

  const quantityInputs = document.querySelectorAll(".cart-item-quantity");

  quantityInputs.forEach((input) => {
    input.addEventListener("change", onQuantityChange);
  });

  displayCartTotal();
};

// export displayCartTotal function
const displayCartTotal = () => {
  const total = calculateTotal(cart);

  elements.cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};

export { addToCart, renderCardItems, displayCartTotal };
