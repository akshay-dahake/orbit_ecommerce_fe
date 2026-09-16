import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page empty-state">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link className="button primary" to="/">Go Home</Link>
    </section>
  );
}