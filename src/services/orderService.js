import api from "./api";

// export async function createOrder(items) {
//   const response = await api.post("/api/orders", { items });
//   return response.data;
// }

// export async function getOrders() {
//   const response = await api.get("/api/orders");
//   return response.data;
// }

// export async function getOrderById(id) {
//   const response = await api.get(`/api/orders/${id}`);
//   return response.data;
// }

// export async function cancelOrder(id) {
//   const response = await api.patch(`/api/orders/${id}/cancel`);
//   return response.data;
// }


import axios from "axios";

const ORDER_SERVICE_URL = "http://localhost:8083";

export async function createOrder(items) {
  const response = await axios.post(`${ORDER_SERVICE_URL}/api/orders`, {
    items
  });

  return response.data;
}

export async function getOrders() {
  const response = await axios.get(`${ORDER_SERVICE_URL}/api/orders`);
  return response.data;
}

export async function getOrderById(id) {
  const response = await axios.get(
    `${ORDER_SERVICE_URL}/api/orders/${id}`
  );

  return response.data;
}

export async function cancelOrder(id) {
  const response = await axios.patch(
    `${ORDER_SERVICE_URL}/api/orders/${id}/cancel`
  );

  return response.data;
}