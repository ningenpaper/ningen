import { useParams } from "react-router-dom";
import { useState } from "react";
import "./ProductDetail.css";

function ProductDetail({ products }) {
  const { folderName } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p["Folder Name"] === folderName);

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  const category = product["Category"];
  const price = parseInt(product["Price"]) || 0;
  const total = price * quantity;
  const imagePath = `/images/products/${category}/${folderName}`;

  return (
    <>
      <div className="header">
        <a href="/">ningen paper press</a> sells{" "}
        <a href="/prints">print matters</a>.
      </div>

      <div className="item">
        <div className="item-image">
          <img src={`${imagePath}/main.webp`} alt={product["Product Name"]} />
        </div>

        <div className="item-info">
          <div className="title">{product["Product Name"]}</div>

          <div className="price-container">
            <div className="price-info">
              <label>
                QUANTITY:{" "}
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </label>
              <p id="total">PRICE: ${total}</p>
            </div>
            <a
              className="cart"
              href={`https://www.paypal.com/paypalme/ningenpaperpress/${total}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>CHECK OUT</button>
            </a>
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
