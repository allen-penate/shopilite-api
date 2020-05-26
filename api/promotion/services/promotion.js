'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  getAplicator(promotions) {
    return {
      firstApplicable(cartItem) {
        return promotions.find((promotion) => {
          return (
            promotion.product.sku === cartItem.product.sku &&
            promotion.rule &&
            strapi.services.rule.matches(promotion.rule, cartItem.quantity)
          );
        });
      },

      getActionFor(promotion) {
        if (!promotion || !promotion.action || !promotion.action.action_type) {
          return strapi.services.nopromoaction;
        }
        return strapi.services[`${promotion.action.action_type}action`] || strapi.services.nopromoaction;
      },
    };
  },
};

