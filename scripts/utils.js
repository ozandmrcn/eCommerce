import elements from "./helpers.js";

const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getFromLocalStorage = () => {
  const strData = localStorage.getItem("cart");

  return strData ? JSON.parse(strData) : []; // if strData is not found, return an empty array
};

const calculateTotal = (cart) =>
  cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

const updateCartIcon = (cart) => {
  let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  elements.icon.setAttribute("data-quantity", totalQuantity);
};

export {
  saveToLocalStorage,
  getFromLocalStorage,
  calculateTotal,
  updateCartIcon,
};
