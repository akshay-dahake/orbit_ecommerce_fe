import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="card product-card">
      <Link to={`/products/${product.id}`} className="image-wrap">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="image-placeholder">No image</div>
        )}
      </Link>

      <div className="card-body">
        <div className="category">{product.category}</div>
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="product-bottom">
          <strong>₹{Number(product.price).toFixed(2)}</strong>
          <span>{product.stockQuantity} in stock</span>
        </div>

        <div className="actions">
          <Link className="button secondary" to={`/products/${product.id}`}>
            View
          </Link>
          <button
            className="button primary"
            disabled={!product.stockQuantity}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}