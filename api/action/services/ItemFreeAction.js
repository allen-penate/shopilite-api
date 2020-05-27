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
      let {product, quantity, subtotal, discount} = cartItem;

      let existingItem = {
        product: {sku: product.sku},
        quantity: quantity,
        subtotal: subtotal,
        discount: discount || 0.0,
        total: subtotal
      }
      let freeQuantity = (quantity > freeProduct.inventory_qty) ? freeProduct.inventory_qty : quantity;
      let _subtotal = freeQuantity * freeProduct.price;
      let freeItem = {
          product: {sku: freeProduct.sku},
          quantity: freeQuantity,
          subtotal: _subtotal,
          discount: _subtotal,
          total: 0.0
      }
      return order.addItem(existingItem).addItem(freeItem);
    };
  }
};
