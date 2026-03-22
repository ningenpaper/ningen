import { useLocation, Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const { orderItems, subtotal } = location.state || { orderItems: [], subtotal: 0 };

  return (
    <>
      <div className="header">
        <a href="/">ningen paper press</a> loves your order.
      </div>

      <div className="success-page">
        <h1 className="success-title">Thank you for your purchase!</h1>
        <p className="success-message">
          We've received your order and will contact you within 2-3 business days.
        </p>

        {orderItems.length > 0 && (
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            <table className="summary-table">
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item.slug}>
                    <td className="summary-image">
                      <img src={item.mainImage} alt={item.name} />
                    </td>
                    <td className="summary-name">{item.name}</td>
                    <td className="summary-qty">x{item.quantity}</td>
                    <td className="summary-price">${item.price * item.quantity}</td>
                  </tr>
                ))}
                <tr className="summary-total-row">
                  <td></td>
                  <td></td>
                  <td className="summary-total-label">Total</td>
                  <td className="summary-total-price">${subtotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
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

export default OrderSuccess;
