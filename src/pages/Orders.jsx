import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { getOrders } from "../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((err) => {
        setError(err.response?.data?.message || "Unable to load orders.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">ORDER HISTORY</span>
          <h1>My Orders</h1>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      {!orders.length ? (
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p>Your placed orders will appear here.</p>
          <Link className="button primary" to="/products">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <Link to={`/orders/${order.id}`} className="order-card" key={order.id}>
              <div>
                <span className="muted">Order Number</span>
                <h3>{order.orderNumber}</h3>
              </div>
              <div>
                <span className="muted">Date</span>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="muted">Status</span>
                <span className="status">{order.status}</span>
              </div>
              <div>
                <span className="muted">Total</span>
                <strong>₹{Number(order.totalAmount).toFixed(2)}</strong>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}