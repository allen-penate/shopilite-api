'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  //Reducer
  process(order){
    return (promotion, cartItem) =>{
      if(!promotion || !promotion.rule || !promotion.action || !promotion.action.target || !cartItem){
        return order;
      }
      const promotionAction = promotion.action || {};
      const ruleQuantity = promotion.rule.quantity;
      const cartItemQuantity = cartItem.quantity;
      const promotionTotal = Math.floor(cartItemQuantity/ruleQuantity) * promotionAction.amount * promotionAction.target.price;
      const regularTotal = (cartItemQuantity % ruleQuantity) * cartItem.product.price;
      const adjustedTotal = promotionTotal + regularTotal;
      let orderItem = {
        product: cartItem.product,
        quantity: cartItemQuantity,
        subtotal:  cartItem.subtotal,
        discount: cartItem.subtotal - adjustedTotal,
        total: adjustedTotal
      }
      return order.addItem(orderItem);
    };
  }
};