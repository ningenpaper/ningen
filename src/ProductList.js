import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function ProductList({ products }) {
  const { cartCount } = useCart();

  return (
    <>
      <div className="header prints-header">
        <span>
          <Link to="/">ningen paper press</Link> sells print matters. Take them on a reasonable price.
        </span>
        <Link to="/cart" className="cart-button">
          cart{cartCount > 0 ? `(${cartCount})` : ""}
        </Link>
      </div>

      <div className="collection">
        {products.map((product) => (
          <div key={product.id} className="item">
            <Link to={`/product/${product.slug}`}>
              <div className="item-image">
                <img src={product.mainImage} alt={product.name} />
              </div>
              <div className="item-title">{product.name}</div>
            </Link>
          </div>
        ))}
      </div>

      <div className="footer">
        2025 Ningen Paper Press. Check out our latest news{" "}
        <a
          href="https://www.instagram.com/ningenpaper.press/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ningenpaperpress
        </a>
        .
      </div>
    </>
  );
}

export default ProductList;
