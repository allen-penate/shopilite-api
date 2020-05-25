'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */
const uuid = require('uuid');

module.exports = {
  
  async create({code}){
    if(!code){
      let code = uuid();
    }
    return await strapi.query('cart').create({code: code});
  }
};
