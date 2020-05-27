'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  process(order){
    return (promotion, cartItem) =>{
      let {action, rule} = promotion;
      if(!promotion || !rule || !action || !action.target || !cartItem){
        return order;
      }
      let {product} = cartItem;
      const ruleQuantity = rule.quantity;
      const cartItemQuantity = cartItem.quantity;
      const promotionTotal = Math.floor(cartItemQuantity/ruleQuantity) * action.amount * action.target.price;
      const regularTotal = (cartItemQuantity % ruleQuantity) * product.price;
      const adjustedTotal = promotionTotal + regularTotal;
      let orderItem = {
        product: {sku: product.sku},
        quantity: cartItemQuantity,
        subtotal:  cartItem.subtotal,
        discount: +(cartItem.subtotal - adjustedTotal).toFixed(2),
        total: adjustedTotal
      }
      return order.addItem(orderItem);
    };
  }
};