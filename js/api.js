/**
 * EwuarSoft - Cliente de API para frontend
 * Gestiona todas las peticiones hacia el backend y MySQL
 */

const API = (() => {
  // Configuración de URL del Backend:
  // En producción (Netlify, Vercel, GitHub Pages), puedes definir la URL aquí o mediante window.BACKEND_API_URL
  const CLOUD_BACKEND_URL = window.BACKEND_API_URL || localStorage.getItem('ewuarsoft_backend_url') || '';

  // Determina la URL base automáticamente (soporta puerto local 3000, Live Server, archivo directo o nube)
  const isDirectOrOtherPort = window.location.protocol === 'file:' || 
    (!window.location.origin.includes(':3000') && !window.location.host.includes(':3000'));
  
  const BASE_URL = CLOUD_BACKEND_URL || (isDirectOrOtherPort ? 'http://localhost:3000' : '');
  const API_URL = `${BASE_URL}/api`;

  /**
   * Petición genérica con fetch y manejo estandarizado de respuestas
   */
  async function request(endpoint, method = 'POST', body = {}) {
    const url = `${API_URL}${endpoint}`;
    const token = localStorage.getItem('ewuarsoft_token');

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers
    };

    if (method === 'POST') {
      options.body = JSON.stringify(body || {});
    }

    try {
      const response = await fetch(url, options);
      let data = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        throw new Error(`Respuesta no válida del servidor (${response.status} ${response.statusText})`);
      }

      if (!response.ok || (data && data.success === false)) {
        const errorMsg = data && data.error ? data.error : `Error en la solicitud (${response.status})`;
        const error = new Error(errorMsg);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar con el servidor backend. Asegúrate de que el servidor Node.js esté corriendo en http://localhost:3000');
      }
      throw err;
    }
  }

  return {
    // Comprobación de salud y conexión MySQL
    checkHealth: async () => {
      try {
        const res = await fetch(`${BASE_URL}/health`);
        return await res.json();
      } catch (e) {
        return { success: false, error: e.message };
      }
    },

    // Autenticación de Usuarios
    login: (email, password) => request('/auth/login', 'POST', { email, password }),
    register: (userData) => request('/auth/register', 'POST', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'VENDEDOR'
    }),
    getUsers: () => request('/auth/users', 'POST', {}),

    // Categorías
    getCategories: () => request('/categories/list', 'POST', {}),
    createCategory: (data) => request('/categories/create', 'POST', data),

    // Proveedores
    getSuppliers: () => request('/suppliers/list', 'POST', {}),
    createSupplier: (data) => request('/suppliers/create', 'POST', data),

    // Productos
    getProducts: (includeInactive = true) => request('/products/list', 'POST', { include_inactive: includeInactive }),
    getProduct: (id) => request('/products/get', 'POST', { id: Number(id) }),
    createProduct: (data) => request('/products/create', 'POST', {
      sku: data.sku,
      name: data.name,
      description: data.description || null,
      category_id: Number(data.category_id),
      supplier_id: data.supplier_id ? Number(data.supplier_id) : null,
      purchase_price: Number(data.purchase_price),
      sale_price: Number(data.sale_price),
      min_stock: Number(data.min_stock || 0),
      initial_stock: data.initial_stock !== undefined ? Number(data.initial_stock) : 0,
      initial_stock_note: data.initial_stock_note || null
    }),
    updateProduct: (id, fields) => request('/products/update', 'POST', { id: Number(id), fields }),
    deactivateProduct: (id) => request('/products/deactivate', 'POST', { id: Number(id) }),
    activateProduct: (id) => request('/products/activate', 'POST', { id: Number(id) }),

    // Inventario
    registerEntry: (productId, quantity, note) => request('/inventory/entry', 'POST', {
      product_id: Number(productId),
      quantity: Number(quantity),
      note: note ? String(note).trim() : null
    }),
    registerExit: (productId, quantity, note) => request('/inventory/exit', 'POST', {
      product_id: Number(productId),
      quantity: Number(quantity),
      note: note ? String(note).trim() : null
    }),
    getMovements: (limit = 50) => request('/inventory/movements', 'POST', { limit: Number(limit) }),

    // Ventas
    createSale: (items) => request('/sales/create', 'POST', {
      items: items.map(i => ({
        product_id: Number(i.product_id),
        quantity: Number(i.quantity)
      }))
    }),

    // Reportes
    getInventoryReport: () => request('/reports/inventory', 'POST', {}),
    getLowStockReport: (threshold = null) => {
      const body = {};
      if (threshold !== null && threshold !== undefined && threshold !== '') {
        body.threshold = Number(threshold);
      }
      return request('/reports/low-stock', 'POST', body);
    },
    getSalesReport: (from = null, to = null) => {
      const body = {};
      if (from) body.from = from;
      if (to) body.to = to;
      return request('/reports/sales', 'POST', body);
    }
  };
})();

window.API = API;
