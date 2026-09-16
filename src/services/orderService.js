import api from "./api";

export async function createOrder(items) {
  const response = await api.post("/api/orders", { items });
  return response.data;
}

export async function getOrders() {
  const response = await api.get("/api/orders");
  return response.data;
}

export async function getOrderById(id) {
  const response = await api.get(`/api/orders/${id}`);
  return response.data;
}

export async function cancelOrder(id) {
  const response = await api.patch(`/api/orders/${id}/cancel`);
  return response.data;
}