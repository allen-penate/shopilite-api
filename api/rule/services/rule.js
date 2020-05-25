"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

const RuleMatcher = {
  atLeast(rule, target) {
    return rule.quantity >= target;
  },

  itemTotal(rule, target) {
    return rule.quantity >= target;
  },
};

module.exports = {
  matches(rule, target) {
    return RuleMatcher[rule.rule_type](rule, target) || false;
  },
};
