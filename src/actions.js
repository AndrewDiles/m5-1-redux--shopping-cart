

export const addItem = item => ({
    type: 'ADD_ITEM',
    item,
  });
export const removeItem = item => ({
  type: 'REMOVE_ITEM',
  item,
});
export const removeXItems = item => ({
  type: 'REMOVE_X_ITEMS',
  item,
});
export const clearCart = item => ({
  type: 'CLEAR_CART',
  item,
});
export const addXItems = item => ({
  type: 'ADD_X_ITEMS',
  item,
});