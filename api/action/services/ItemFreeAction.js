'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  //Reducer
  process(order){
    return (promotion, cartItem) =>{
      if(!promotion || !promotion.action || !promotion.action.target || !cartItem){
        return order;
      }

      let freeProduct = promotion.action.target;

      let existingItem = {
        product: cartItem.product,
        quantity: cartItem.quantity,
        subtotal:  cartItem.subtotal,
        discount: cartItem.discount || 0.0,
        total: cartItem.subtotal
      }
      let freeQuantity = (cartItem.quantity > freeProduct.inventory_qty) ? freeProduct.inventory_qty : cartItem.quantity;
      let subtotal = freeQuantity * freeProduct.price;
      let freeItem = {
          product: freeProduct,
          quantity: freeQuantity,
          subtotal: subtotal,
          discount: subtotal,
          total: 0.0
      }
      return order.addItem(existingItem).addItem(freeItem);
    };
  }
};
