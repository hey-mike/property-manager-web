import axios from '../../core/axiosClient';
import LocalStorageService from '../../core/services/local-store.service';
import bodybuilder from 'bodybuilder';

class TenantService {
  static requestHeaders() {
    const jwt = LocalStorageService.getAuth();
    return { AUTHORIZATION: `Bearer ${jwt}` };
  }

  static async searchTenants({ query, pagination, sorter }) {
    try {
      let body = bodybuilder();

      if (query) {
        body = body.query('fuzzy', query.field, query.value);
      }
      // handle pagination
      if (pagination) {
        const from = (pagination.current - 1) * pagination.pageSize;

        body = body.from(from).size(pagination.pageSize);
      }

      //handle sorting
      if (sorter && sorter.field) {
        const searchSort = {};
        if (sorter.field === 'name') {
          searchSort['name.firstName'] = sorter.order;
        } else {
          searchSort[sorter.field] = sorter.order;
        }

        body = body.sort([searchSort]);
      }

      body = body.build();

      console.log('body', body);

      return await axios.post('/tenant/search', { body });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  static async getAllTenants() {
    try {
      await axios.get('/tenant');
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  static async createTenant(tenant) {
    try {
      await axios.post('/tenant', { tenant });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  static readTenant(id) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const request = new Request(`/api/employee/${id}`, {
      method: 'GET',
      headers: headers,
    });

    return fetch(request);
  }

  static updateTenant(employee) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const request = new Request(`/api/employee/${employee._id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(employee),
    });

    return fetch(request);
  }

  static deleteTenant(id) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const request = new Request(`/api/employee/${id}`, {
      method: 'DELETE',
      headers: headers,
    });

    return fetch(request);
  }

  static deleteBulkTenant(docIds) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const request = new Request(`/api/employee`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({
        docIds: docIds,
      }),
    });

    return fetch(request);
  }
}

export default TenantService;
