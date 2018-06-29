const config = require('../config/config.js');
const elasticsearch = require('elasticsearch');
const TenantSearchStrategy = require('./search-strategy/tenantSearchStrategy');

this.client = new elasticsearch.Client({
  host: config.get('es:uri')
});

const tenantSearchStrategy = new TenantSearchStrategy(this.client);
class searchStrategyFactory {
  getStrategy(type) {
    switch (type) {
      default:
        return tenantSearchStrategy;
    }
  }
}

module.exports = new searchStrategyFactory();
