import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <div className="image-placeholder">No image</div>
        )}
      </div>

      <div className="cart-info">
        <h3>{item.name}</h3>
        <p>₹{Number(item.price).toFixed(2)} each</p>

        <div className="quantity-row">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={item.stockQuantity}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, e.target.value)}
          />
          <span>Stock: {item.stockQuantity}</span>
        </div>
      </div>

      <div className="cart-total">
        <strong>₹{(Number(item.price) * item.quantity).toFixed(2)}</strong>
        <button className="link-button danger" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}