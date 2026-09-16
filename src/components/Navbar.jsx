import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="brand">Orbit</Link>

      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        <NavLink to="/cart">Cart ({totalItems})</NavLink>
      </nav>
    </header>
  );
}