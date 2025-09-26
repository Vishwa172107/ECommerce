const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/w';

export const api = {
    getProducts: `${BASE_URL}/api/products/`,
    getProductbyId: (id) => `${BASE_URL}/api/products/${id}/`,
    CreateProduct: `${BASE_URL}/admin/products/create/`,
    UpdateProduct: (id) => `${BASE_URL}/admin/products/${id}/update/`,
    DeleteProduct: (id) => `${BASE_URL}/admin/products/${id}/delete/`,
    login: `${BASE_URL}/auth/login/`,
    CheckAuth: `${BASE_URL}/auth/me/`,
    Logout: `${BASE_URL}/auth/logout/`,
    googleLogin: `${BASE_URL}/auth/google/`,
    AdminStats: `${BASE_URL}/admin/stats/`,
}