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

      order.items.push(orderItem);
      order.subtotal += orderItem.subtotal;
      order.discount += orderItem.discount;
      order.total += orderItem.total;
      return order;
    };
  }
};
