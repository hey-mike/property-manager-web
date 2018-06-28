const elasticsearch = require('elasticsearch');
const config = require('../config/config.js');
const _ = require('lodash');
const BaseSearchService = require('./search-strategy/BaseSearchService');

// https://www.elastic.co/blog/setting-up-elasticsearch-for-a-blog
const ES_INDEX = 'property_manager';
class SearchService extends BaseSearchService {
  constructor() {
    super();
    console.log('SearchService')
  }

  async connect() {
    this.client = new elasticsearch.Client({
      host: config.get('es:uri')
    });
    try {
      await this.healthCheck();
      await this.createIndex();
      await this.createMapping();
    } catch (err) {
      console.trace('connect', err);
      throw new Error(err);
    }
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
      throw new Error(error);
    }
  }

  indexExists() {
    return this.client.indices.exists({
      index: ES_INDEX
    });
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
            name: {
              properties: {
                firstName: {
                  type: 'completion',
                  analyzer: 'simple',
                  search_analyzer: 'simple'
                },
                lastName: {
                  type: 'completion',
                  analyzer: 'simple',
                  search_analyzer: 'simple'
                },
                suggest: {
                  type: 'completion'
                }
              }
            },
            gender: { type: 'text' },
            age: { type: 'text' },
            title: { type: 'text' },
            email: { type: 'text' },
            phone: { type: 'text' }
          }
        }
      });

      if (response.acknowledged) {
        console.log(`Mapping successfully`);
      }
      return response;
    } catch (error) {
      //if the error is not index error
      if (error.status !== 400) {
        console.trace('createIndex err', error);
      }
      throw new Error(error);
    }
  }
  async getMapping() {
    try {
      const response = await this.client.indices.getMapping({
        index: ES_INDEX,
        type: 'tenant'
      });

      console.log('getMapping', response);

      return response;
    } catch (err) {
      throw new Error(err);
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
    return {
      _score: hit._score,
      _id: hit._id,
      name: hit._source.name,
      email: hit._source.email,
      createdAt: hit._source.createdAt
    };
  }

  async search(query) {
    try {
      // console.log(query)
      const result = await this.client.search({
        index: ES_INDEX,
        type: 'tenant',
        body: query
      });
      return {
        data: result.hits.hits.map(this.searchHitToResult),
        total: result.hits.total
      };
    } catch (error) {
      console.trace('search', error);
      throw new Error(error);
    }
  }
  async getSuggestions(text, size) {
    return await this.client.search({
      index: ES_INDEX,
      type: 'tenant',
      body: {
        suggest: {
          firstNameSuggester: {
            prefix: text,
            completion: {
              field: 'name.firstName',
              size: size,
              fuzzy: {
                fuzziness: 'auto'
              }
            }
          },
          lastNameSuggester: {
            prefix: text,
            completion: {
              field: 'name.lastName',
              size: size,
              fuzzy: {
                fuzziness: 'auto'
              }
            }
          }
        }
      }
    });
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
      return err;
    }
  }

  async deleteIndex() {
    try {
      const result = await this.client.indices.delete({ index: ES_INDEX });
      console.log('Index deleted', result);
      return result;
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
