"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */
const uuid = require("uuid");

const CartItemRepository = {
  async add(cart, product, quantity){
    let data = {cart: cart.id, product: product.id};
    let line = await strapi.query('cart-item').findOne(data);
    let _quantity = (line) ? line.quantity + Number(quantity) : Number(quantity);
    let totals = {
      quantity: _quantity,
      subtotal: Number.parseFloat(product.price * _quantity).toFixed(2)
    };
    if(!line){
      line = await strapi.query('cart-item').create(Object.assign(data, totals));
    }else{
      line = await strapi.query('cart-item').update({id: line.id}, totals);
    }
    return line;
  },

  async remove(cart, product, quantity){
    let data = {cart: cart.id, product: product.id};
    let line = await strapi.query('cart-item').findOne(data);
    if(!line){
      return Promise.resolve(null);
    }  
    let difference = (quantity) ? line.quantity - Number(quantity) : -1;
    if(difference > 0){
      line = await strapi.query('cart-item').update({id: line.id}, {
        quantity: difference,
        subtotal: Number.parseFloat(product.price * difference).toFixed(2)
      });
    }else{
      line = await strapi.query('cart-item').delete({id: line.id});
    }
    return line;
  },

  async findOrCreate({cart, product}){
    let data = {cart: cart, product: product};
    let line = await strapi.query('cart-item').findOne(data);
    if(!line){
      const defaultAttr = {
        from_promotion: false
      };
      line = await strapi.query('cart-item').create({...data,...defaultAttr},["product"]);
    } 
    return line;
  }
};

module.exports = {
  async create({ code }) {
    if (!code) {
      let code = uuid();
    }
    return await strapi.query("cart").create({ code: code });
  },

  async findOrCreate(code) {
    let cart = await this.findOne({ code: code });
    if (!cart) {
      cart = await this.create({code: code});
    }
    return cart;
  },

  async updateSubTotal(id){
    let cart = await this.findOne({ id: id }, ["items"]);
    let subtotal = cart.items.reduce((_subtotal, item)=>{
      _subtotal += item.subtotal;
      return _subtotal;
    }, (0));
    return await strapi.query('cart').update({id: cart.id}, {state: "in_progress", subtotal: subtotal});
  },

  async addProduct(code, { sku, quantity = 1 }) {
    let product = await strapi.services.product.findOne({ sku: sku });
    let cart = await this.findOrCreate(code);
    if (cart && product) {
      await CartItemRepository.add(cart, product, quantity);
      cart = await this.updateSubTotal(cart.id);
    }
    return cart;
  },

  async removeProduct(code, { sku, quantity = null }) {
    let product = await strapi.services.product.findOne({ sku: sku });
    let cart = await this.findOrCreate(code);
    if (cart && product) {
      await CartItemRepository.remove(cart, product, quantity);
      cart = await this.updateSubTotal(cart.id);
    }
    return cart;
  },

  async checkout(code){
    let promotions = await strapi.query('promotion').find({},['product','rule','action','action.target']);
    let cart = await this.findOne({code: code},['items','items.product']);
    let order = await strapi.services.checkout.process(cart, promotions);
    if(order){
      strapi.query('cart').update({id:cart.id}, {state:"checked"})
    }
    return order;
  }

};
