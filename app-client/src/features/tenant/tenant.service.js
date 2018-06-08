import axios from '../../core/axiosClient';
import LocalStorageService from '../../core/services/local-store.service';

class TenantService {
  static requestHeaders() {
    const jwt = LocalStorageService.getAuth();
    return { AUTHORIZATION: `Bearer ${jwt}` };
  }
  // async function getUser() {
  //   try {
  //     const response = await axios.get('/user?ID=12345');
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  static async getAllTenants() {
    try {
      const response = await axios.get('/tenant');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  static createTenant(employee) {
    const headers = Object.assign(
      {
        'Content-Type': 'application/json',
      },
      this.requestHeaders()
    );
    const request = new Request(`/api/employee`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(employee),
    });

    return fetch(request);
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
