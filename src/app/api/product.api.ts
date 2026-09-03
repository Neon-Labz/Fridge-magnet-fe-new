import api from "@/lib/axios";

export const productApi = {
  async getAllProducts() {
    const response = await api.get('/products');
    return response.data.data.products;
  },

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`);
    const d = response.data.data;
    return d?.product ?? d;
  }
};
