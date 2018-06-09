const elasticsearch = require('elasticsearch');
const config = require('../config/config.js');
const _ = require('lodash');

// https://www.elastic.co/blog/setting-up-elasticsearch-for-a-blog
const ES_INDEX = 'property_manager';
class SearchService {
  constructor() {}

  connect() {
    this.client = new elasticsearch.Client({
      host: config.get('es:uri')
    });
    this.createIndex();
    this.healthCheck();
    this.createMapping();
  }
  async healthCheck() {
    try {
      // ping usually has a 3000ms timeout
      const result = await this.client.ping({
        requestTimeout: 3000
      });
      console.log('Connect to elasticsearch:', config.get('es:uri'));
      console.log('-- ES Client Health --', result);
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
            createdAt: { type: 'date' },
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
        console.trace('createIndex err', error);
      }
    }
  }
  toIndex(tenant) {
    return {
      createdAt: tenant.createdAt,
      name: tenant.name,
      gender: tenant.gender,
      age: tenant.age,
      title: tenant.title,
      email: tenant.email,
      phone: tenant.phone
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
  async bulk(tenants) {
    try {
      const response = await this.client.bulk({
        body: _.flatMap(tenants, article => [
          {
            update: {
              _index: ES_INDEX,
              _type: 'tenant',
              _id: article._id.toString()
            }
          },
          {
            doc: this.toIndex(article),
            doc_as_upsert: true
          }
        ])
      });

      console.log(`bulk successfully`, response);
    } catch (error) {
      console.trace('createIndex err', error);
    }
  }
  searchHitToResult(hit) {
    console.log('hit', hit);
    return {
      _score: hit._score,
      _id: hit._id,
      name: hit._source.name,
      email: hit._source.email,
      createdAt: hit._source.createdAt
    };
  }

  filters(options) {
    const tags = Array.isArray(options.tags) ? options.tags : [];
    const clauses = tags.map(this.tagToFilter);
    if (options.since) {
      clauses.unshift(this.since(options.since));
    }
    return this.all(clauses);
  }
  all(clauses) {
    return { bool: { must: clauses } };
  }
  since(date) {
    return { range: { created: { gte: date } } };
  }
  tagToFilter(tag) {
    return { term: { tags: tag } };
  }

  async search(body) {
    try {
      const result = await this.client.search({
        index: ES_INDEX,
        type: 'tenant',
        body: body
      });
      return result.hits.hits.map(this.searchHitToResult);
    } catch (error) {
      console.trace(error.message);
    }
  }
  async count() {
    try {
      const result = await this.client.count({
        index: ES_INDEX,
        type: 'tenant'
      });
      console.log('count index', result);
    } catch (err) {
      console.trace(err.message);
    }
  }

  async deleteIndex() {
    try {
      const result = await this.client.indices.delete({ index: ES_INDEX });
      console.log('Index deleted', result);
    } catch (err) {
      console.trace(err.message);
    }
  }

  async deleteDoc(id) {
    try {
      const result = await this.client.delete({
        index: ES_INDEX,
        type: 'tenant',
        id: id
      });
      console.log('deleteDoc', result);
    } catch (err) {
      console.trace(err.message);
    }
  }
}

module.exports = new SearchService();
