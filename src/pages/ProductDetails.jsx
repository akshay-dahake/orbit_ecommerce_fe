import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((err) => {
        setError(err.response?.data?.message || "Unable to load product.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;

  if (error || !product) {
    return (
      <section className="page">
        <div className="alert error">{error || "Product not found."}</div>
        <Link className="button secondary" to="/products">Back to Products</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <Link className="back-link" to="/products">← Back to Products</Link>

      <div className="detail-card">
        <div className="detail-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="image-placeholder">No image</div>
          )}
        </div>

        <div className="detail-content">
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price">₹{Number(product.price).toFixed(2)}</div>
          <p>
            <strong>Available stock:</strong> {product.stockQuantity}
          </p>

          {product.active && product.stockQuantity > 0 ? (
            <div className="buy-row">
              <input
                type="number"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(1, Math.min(Number(e.target.value) || 1, product.stockQuantity))
                  )
                }
              />
              <button
                className="button primary large"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="alert">This product is currently unavailable.</div>
          )}
        </div>
      </div>
    </section>
  );
}