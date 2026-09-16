import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

export default function Cart() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  async function handlePlaceOrder() {
    if (!items.length) return;

    setPlacingOrder(true);
    setError("");

    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      }));

      const order = await createOrder(orderItems);
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to place order. Please check product stock and try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">SHOPPING CART</span>
          <h1>Your Cart</h1>
        </div>
      </div>

      {!items.length ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add a product to continue.</p>
          <Link className="button primary" to="/products">Browse Products</Link>
        </div>
      ) : (
        <>
          {error && <div className="alert error">{error}</div>}

          <div className="cart-list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="checkout-card">
            <div>
              <span>Total Amount</span>
              <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>
            <button
              className="button primary large"
              disabled={placingOrder}
              onClick={handlePlaceOrder}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}