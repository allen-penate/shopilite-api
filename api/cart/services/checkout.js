'use strict';

const CheckoutReducer = (promotionsAplicator)=>{

  return (order, cartItem) =>{
    let promotion = promotionsAplicator.firstApplicable(cartItem);
    let action = promotionsAplicator.getActionFor(promotion);
    return action.process(order)(promotion,cartItem);
  };
};

let Order = (cart)=>{
  return {
    cart:{code: cart.code},
    items: [],
    subtotal: 0.00,
    discount: 0.00,
    total: 0.00,
    addItem(item){
      this.items.push(item);
      this.subtotal += item.subtotal || 0;
      this.discount += item.discount || 0;
      this.total += item.total || 0;
      return this;
    }
  }
};

module.exports = {

  process(cart, promotions){
    const promotionsAplicator = strapi.services.promotion.getAplicator(promotions);
    let order = cart.items.reduce(CheckoutReducer(promotionsAplicator),Order(cart));
    return Promise.resolve(order);
  }
  
};
