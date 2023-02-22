const CART_KEY_PREFIX = 'cart_';

export function loadCart(userId) {
  const cartKey = CART_KEY_PREFIX + userId;
  const savedCartData = localStorage.getItem(cartKey);
  if (savedCartData) {
    return JSON.parse(savedCartData);
  }
  return {
    products: [],
    quantity: 0,
    total: 0,
  };
}

export function saveCart(userId, cartData) {
  const cartKey = CART_KEY_PREFIX + userId;
  localStorage.setItem(cartKey, JSON.stringify(cartData));
}