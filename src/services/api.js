const API_URL = "http://161.35.104.211:8000";

const MI_TOKEN = 12345

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${MI_TOKEN}`
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error en la petición a la API");
  }
  return response.json();
};

export const api = {
  products: {
    getAll: () => fetch(`${API_URL}/products`, { 
      method: 'GET',
      headers: getHeaders() 
    }).then(handleResponse),
    
    create: (data) => fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

    update: (id, data) => fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

    delete: (id) => fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse)
  },

  categories: {
    getAll: () => fetch(`${API_URL}/categories`, { 
      method: 'GET',
      headers: getHeaders() 
    }).then(handleResponse),
    
    create: (data) => fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

    update: (id, data) => fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

    delete: (id) => fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse)
  }
};