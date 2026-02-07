import { useParams, Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./ProductDetail.css";

function ProductDetail({ products }) {
  const { folderName } = useParams();
  const { addToCart, cartCount } = useCart();

  const product = products.find((p) => p["Folder Name"] === folderName);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  const category = product["Category"];
  const price = parseInt(product["Price"]) || 0;
  const imagePath = `/prints/${folderName}`;

  return (
    <>
      <div className="header prints-header">
        <span>
          <Link to="/">ningen paper press</Link> sells{" "}
          <Link to="/prints">print matters</Link>.
        </span>
        <Link to="/cart" className="cart-button">
          cart{cartCount > 0 ? `(${cartCount})` : ""}
        </Link>
      </div>

      <div className="item">
        <div className="item-image">
          <img src={`${imagePath}/main.webp`} alt={product["Product Name"]} />
        </div>

        <div className="item-info">
          <div className="title">{product["Product Name"]}</div>

          <div className="price-container">
            <div className="price-info">
              <p id="total">PRICE: ${price}</p>
            </div>
            <button className="checkout-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="des">
        {product["Author"] && (
          <>
            Text: {product["Author"]} <br />
          </>
        )}
        {product["Designer"] && (
          <>
            Design: {product["Designer"]}
            <br />
            <br />
          </>
        )}
        {product["Size"] && (
          <>
            {product["Size"]} <br />
          </>
        )}
        {product["Pages"] && (
          <>
            {product["Pages"]} pages <br />
          </>
        )}
        {product["Year"] && (
          <>
            Printed {product["Year"]}
          </>
        )}
      </div>

      <div className="content">{product["Description"]}</div>

      <div className="detail-images">
        <img
          src={`${imagePath}/detail-1.webp`}
          alt={`${product["Product Name"]} detail 1`}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <img
          src={`${imagePath}/detail-2.webp`}
          alt={`${product["Product Name"]} detail 2`}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <img
          src={`${imagePath}/detail-3.webp`}
          alt={`${product["Product Name"]} detail 3`}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
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

export default ProductDetail;
