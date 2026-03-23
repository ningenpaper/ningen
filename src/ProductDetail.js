import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import "./ProductDetail.css";

function ProductDetail() {
  const { slug } = useParams();
  const { addToCart, cartCount } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/prints/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!product) {
    return <div className="container">Product not found</div>;
  }

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
          <img src={product.mainImage} alt={product.name} />
        </div>

        <div className="item-info">
          <div className="title">{product.name}</div>

          <div className="price-container">
            <div className="price-info">
              <p id="total">PRICE: ${product.price}</p>
            </div>
            <button className="checkout-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="des">
        {product.author && (
          <>
            Text: {product.author} <br />
          </>
        )}
        {product.designer && (
          <>
            Design: {product.designer}
            <br />
            <br />
          </>
        )}
        {product.size && (
          <>
            {product.size} <br />
          </>
        )}
        {product.pages && (
          <>
            {product.pages} pages <br />
          </>
        )}
        {product.year && <>Printed {product.year}</>}
      </div>

      <div className="content">{product.description}</div>

      <div className="detail-images">
        {product.detailImages?.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${product.name} detail ${index + 1}`}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
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

export default ProductDetail;
