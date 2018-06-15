const TenantSearchStrategy = require('./search-strategy/tenantSearchStrategy');

const tenantSearchStrategy = new TenantSearchStrategy();
class BaseSearchService {
  getStrategy(type) {
    switch (type) {
      default:
        return tenantSearchStrategy;
    }
  }
}

module.exports = new BaseSearchService();
