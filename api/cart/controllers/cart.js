"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let cart = await strapi.services.cart.create(ctx.request.body);
    return sanitizeEntity(cart, { model: strapi.models.cart });
  },

  async findOne(ctx) {
    const { code } = ctx.params;
    const cart = await strapi.services.cart.findOne({code},['items','items.product']);
    return sanitizeEntity(cart, { model: strapi.models.cart });
  },  

  async addProduct(ctx){
    const { code, sku } = ctx.params;
    let cart = await strapi.services.cart.addProduct(code, {sku: sku, ...ctx.request.body});
    return sanitizeEntity(cart, { model: strapi.models.cart });
  },

  async removeProduct(ctx){
    const { code, sku } = ctx.params;
    let cart = await strapi.services.cart.removeProduct(code, {sku: sku, ...ctx.request.body});
    return sanitizeEntity(cart, { model: strapi.models.cart });    
  },
  
  async checkout(ctx){
    const { code } = ctx.params;
    return strapi.services.cart.checkout(code);
  }


};
