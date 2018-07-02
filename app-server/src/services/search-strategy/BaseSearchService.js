const elasticsearch = require('elasticsearch');
const config = require('../../config/config.js');

class BaseSearchService {
  constructor() {
    console.log(this.client);
    if (!this.client) {
      this.client = new elasticsearch.Client({
        host: config.get('es:uri')
      });
      console.log(
        'BaseSearchService Connect to elasticsearch:',
        config.get('es:uri')
      );
    }
  }

  connect() {}
  healthCheck() {}
  indexExists() {}
  createMapping() {}
  update() {}
  getMapping() {}
}

module.exports = BaseSearchService;
