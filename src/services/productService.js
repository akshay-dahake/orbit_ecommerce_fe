import api from "./api";

// export async function getProducts() {
//   const response = await api.get("/api/products");
//   return response.data;
// }

// export async function getProductById(id) {
//   const response = await api.get(`/api/products/${id}`);
//   return response.data;
// }

import axios from "axios";

const PRODUCT_SERVICE_URL = "http://localhost:8082";

export async function getProducts() {
  const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products`);
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(
    `${PRODUCT_SERVICE_URL}/api/products/${id}`
  );
  return response.data;
}