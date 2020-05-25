
module.exports = {
  //Reducer
  process(order){
    return (promotion, cartItem) =>{
      let {action} = promotion;
      if(!promotion || !action || !action.target || !cartItem){
        return order;
      }
      let {subtotal, quantity} = cartItem;
      let totalToDiscount = action.is_percentage ? subtotal / 100 : 1;
      let discount =  action.amount * totalToDiscount;

      orderItem = {
        product: action.target,
        quantity: cartItem.quantity,
        subtotal: subtotal,
        discount: discount,
        total: subtotal - discount
      }
      return order.addItem(orderItem);
    };
  }
};