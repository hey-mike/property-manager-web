const TenantSearchStrategy = require('./search-strategy/tenantSearchStrategy');

const tenantSearchStrategy = new TenantSearchStrategy();
class seartchStrategyFactory {
  getStrategy(type) {
    switch (type) {
      default:
        return tenantSearchStrategy;
    }
  }
}

module.exports = new seartchStrategyFactory();
