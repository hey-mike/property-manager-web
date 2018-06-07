const elasticsearch = require('elasticsearch');

// https://www.elastic.co/blog/setting-up-elasticsearch-for-a-blog
const ES_INDEX = "property_manager";
class SearchService {
  constructor() {
    this.client = new elasticsearch.Client({
      host: 'http://localhost:9200'
    });
    this.healthCheck();
    this.createIndex();
    this.createMapping();
  }
  async healthCheck() {
    try {
      // ping usually has a 3000ms timeout
      await this.client.ping({
        requestTimeout: 1000
      });
      console.log('All is well');
    } catch (error) {
      console.trace('elasticsearch cluster is down!');
    }
  }

  async createIndex() {
    try {
      const response = await this.client.indices.create({
        index: ES_INDEX
      });

      if (response.acknowledged) {
        console.log(`Create index ${response.index} successfully`);
      }
    } catch (error) {
      //if the error is not index error
      if (error.status !== 400) {
        console.trace('createIndex err', error.status);
      }
    }
  }
  async createMapping() {
    try {
      const response = await this.client.indices.putMapping({
        index: ES_INDEX,
        type: 'tenant',
        body: {
          properties: {
            created: { type: 'date' },
            name: { type: 'string' },
            gender: { type: 'string' },
            age: { type: 'string' },
            title: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' }
          }
        }
      });

      if (response.acknowledged) {
        console.log(`Create index ${response.index} successfully`);
      }
    } catch (error) {
      //if the error is not index error
      if (error.status !== 400) {
        console.trace('createIndex err', error.status);
      }
    }
  }
  toIndex(tenant) {
    return {
      created: tenant.created,
      name: tenant.title,
      gender: tenant.slug,
      age: tenant.teaser,
      title: tenant.introduction,
      email: tenant.body,
      phone: tenant.tags
    };
  }

  async update(tenant) {
    const id = tenant._id.toString();
    let result = false;
    try {
      result = await this.client.update({
        index: ES_INDEX,
        type: 'tenant',
        id,
        body: {
          doc: this.toIndex(tenant),
          doc_as_upsert: true
        }
      });
    } catch (error) {
      result = false;
    }
    return result;
  }
  async search() {
    try {
      const response = await this.client.search({
        q: 'pants'
      });
      console.log('response', response.hits.hits);
    } catch (error) {
      console.trace(error.message);
    }
  }
}

module.exports = new SearchService();
