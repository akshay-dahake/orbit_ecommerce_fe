import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">ORBIT E-COMMERCE</span>
        <h1>Shop simple. Shop fast.</h1>
        <p>
          Browse active products, add them to your cart, place an order,
          and track your orders from one simple frontend.
        </p>
        <Link className="button primary large" to="/products">
          Browse Products
        </Link>
      </div>
    </section>
  );
}