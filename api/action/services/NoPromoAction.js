module.exports = {
  //Reducer
  process(order){
    return (promotion, cartItem) =>{
      let {product, quantity, subtotal} = cartItem;
      orderItem = {
        product: {sku: product.sku},
        quantity: quantity,
        subtotal:  +subtotal.toFixed(2),
        discount: 0,
        total: +subtotal.toFixed(2)
      }
      return order.addItem(orderItem);
    };
  }
};
