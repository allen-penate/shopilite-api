module.exports = {
  //Reducer
  process(order){
    return (promotion, cartItem) =>{
      orderItem = {
        product: cartItem.product,
        quantity: cartItem.quantity,
        subtotal:  Number.parseFloat(cartItem.subtotal).toFixed(2),
        discount: Number.parseFloat(0).toFixed(2),
        total: Number.parseFloat(cartItem.subtotal).toFixed(2)
      }
      return order.addItem(orderItem);
    };
  }
};
