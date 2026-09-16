import api from "./api";

export async function getProducts() {
  const response = await api.get("/api/products");
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
}