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
        {products.map((product, index) => {
          const folderName = product["Folder Name"];
          const category = product["Category"];
          const imagePath = `/prints/${folderName}/main.webp`;

          return (
            <div key={index} className="item">
              <Link to={`/product/${folderName}`}>
                <div className="item-image">
                  <img src={imagePath} alt={product["Product Name"]} />
                </div>
                <div className="item-title">{product["Product Name"]}</div>
              </Link>
            </div>
          );
        })}
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
