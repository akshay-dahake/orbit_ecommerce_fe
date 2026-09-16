import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { cancelOrder, getOrderById } from "../services/orderService";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrderById(id)
      .then(setOrder)
      .catch((err) => {
        setError(err.response?.data?.message || "Unable to load order.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleCancel() {
    setWorking(true);
    setError("");

    try {
      const updated = await cancelOrder(id);
      setOrder(updated);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to cancel this order."
      );
    } finally {
      setWorking(false);
    }
  }

  if (loading) return <Loading />;

  if (error && !order) {
    return (
      <section className="page">
        <div className="alert error">{error}</div>
        <button className="button secondary" onClick={() => navigate("/orders")}>
          Back to Orders
        </button>
      </section>
    );
  }

  return (
    <section className="page">
      <Link className="back-link" to="/orders">← Back to Orders</Link>

      <div className="detail-header">
        <div>
          <span className="eyebrow">ORDER DETAILS</span>
          <h1>{order.orderNumber}</h1>
        </div>
        <span className="status large-status">{order.status}</span>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="order-summary">
        <div>
          <span className="muted">Created</span>
          <strong>{new Date(order.createdAt).toLocaleString()}</strong>
        </div>
        <div>
          <span className="muted">Total</span>
          <strong>₹{Number(order.totalAmount).toFixed(2)}</strong>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2>Items</h2>

          <div className="order-items">
            {order.items?.map((item) => (
              <div className="order-item" key={item.id}>
                <div>
                  <strong>Product #{item.productId}</strong>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div>
                  <p>Price: ₹{Number(item.price).toFixed(2)}</p>
                  <strong>₹{Number(item.subtotal).toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>

          {order.status === "CREATED" && (
            <button
              className="button danger-button"
              disabled={working}
              onClick={handleCancel}
            >
              {working ? "Cancelling..." : "Cancel Order"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}