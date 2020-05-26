module.exports = {
  //Reducer
  process(order){
    return (promotion, cartItem) =>{
      orderItem = {
        product: cartItem.product,
        quantity: cartItem.quantity,
        subtotal:  +cartItem.subtotal.toFixed(2),
        discount: 0,
        total: +cartItem.subtotal.toFixed(2)
      }
      return order.addItem(orderItem);
    };
  }
};
