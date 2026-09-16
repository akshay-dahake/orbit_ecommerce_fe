import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { getProducts } from "../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        setError(err.response?.data?.message || "Unable to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(products.filter((p) => p.active).map((p) => p.category).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const value = search.toLowerCase();

    return products
      .filter((product) => product.active)
      .filter((product) => {
        if (!value) return true;
        return (
          product.name?.toLowerCase().includes(value) ||
          product.description?.toLowerCase().includes(value) ||
          product.category?.toLowerCase().includes(value)
        );
      })
      .filter((product) => !category || product.category === category);
  }, [products, search, category]);

  function updateSearch(value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("search", value);
    else next.delete("search");
    setSearchParams(next);
  }

  function updateCategory(value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("category", value);
    else next.delete("category");
    setSearchParams(next);
  }

  if (loading) return <Loading />;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">CATALOG</span>
          <h1>Products</h1>
        </div>
      </div>

      <div className="filters">
        <input
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder="Search products..."
        />
        <select value={category} onChange={(e) => updateCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {error && <div className="alert error">{error}</div>}

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}