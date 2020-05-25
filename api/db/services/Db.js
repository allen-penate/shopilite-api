const FixtureManager = {
  async createAction(action) {
    product = await strapi.query("product").findOne(action.target);
    if (product) {
      await strapi
        .query("action")
        .create(Object.assign(action, { target: product.id }));
    }
  },

  async createPromotion(promotion) {
    const product = await strapi.query("product").findOne(promotion.product);
    let rule = await strapi.query("rule").findOne(promotion.rule);
    if (!rule) {
      rule = await strapi.query("rule").create(promotion.rule);
    }
    const action = await strapi.query("action").findOne(promotion.action);
    if (product && rule && action) {
      await strapi.query("promotion").create(
        Object.assign(promotion, {
          product: product.id,
          rule: rule.id,
          action: action.id,
        })
      );
    }
  },

  async createCart(cart) {
    const code = cart.code;
    cart.items.forEach(async (item) => {
      await strapi.services.cart.addProduct(code, {
        sku: item.product.sku,
        quantity: item.quantity,
      });
    });
  },
};

module.exports = {
  async init() {
    await this.initProducts();
    await this.initActions();
    await this.initPromotions();
    await this.initCarts();
  },

  async initProducts() {
    const products = await strapi.query("product").find({});
    if (!products || products.length === 0) {
      strapi.api.db.config.products.forEach(async (product) => {
        await strapi.query("product").create(product);
      });
    }
  },

  async initActions() {
    const actions = await strapi.query("action").find({});
    if (!actions || actions.length === 0) {
      strapi.api.db.config.actions.forEach(FixtureManager.createAction);
    }
  },  

  async initPromotions() {
    const promotions = await strapi.query("promotion").find({});
    if (!promotions || promotions.length === 0) {
      strapi.api.db.config.promotions.forEach(FixtureManager.createPromotion);
    }
  },

  async initCarts() {
    const carts = await strapi.query("cart").find({});
    if (!carts || carts.length === 0) {
      strapi.api.db.config.carts.forEach(FixtureManager.createCart);
    }
  },
};
