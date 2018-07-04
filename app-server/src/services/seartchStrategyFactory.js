const elasticsearch = require('elasticsearch');
const config = require('../config/config.js');

const TenantSearchStrategy = require('./search-strategy/tenantSearchStrategy');

const tenantSearchStrategy = new TenantSearchStrategy();
class seartchStrategyFactory {
  constructor() {
    this.client = new elasticsearch.Client({
      host: config.get('es:uri')
    });
    this.healthCheck();
  }
  async healthCheck() {
    try {
      // ping usually has a 3000ms timeout
      const result = await this.client.ping({
        requestTimeout: 3000
      });
      console.log('-- ES Client Health --', result);
    } catch (error) {
      console.trace('elasticsearch cluster is down!');
      throw new Error(error);
    }
  }
  getStrategy(type) {
    switch (type) {
      default:
        return tenantSearchStrategy;
    }
  }
}

module.exports = new seartchStrategyFactory();
