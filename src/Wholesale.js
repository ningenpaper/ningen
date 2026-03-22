import { useState } from "react";
import "./Wholesale.css";

function Wholesale() {
  const [message, setMessage] = useState("");

  const sendMail = (e) => {
    e.preventDefault();
    window.location.href = `mailto:ningenpaperpress@gmail.com?subject=Wholesale Inquiry&body=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <>
      <div className="header">
        <a href="/">ningen paper press</a> sells in wholesale.
      </div>

      <div className="wholesale-page">
        <div className="wholesale-title">
          Do you run a shop or need zines in bulk?
          <br />
          If so...
        </div>

        <form className="wholesale-form" onSubmit={sendMail}>
          <textarea
            className="wholesale-textarea"
            placeholder="Interested in wholesale? Just send us a message with your shop name, location, address, and what you'd like to order. We'll get back to you with our wholesale catalog."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="wholesale-btn">
            Send Message
          </button>
        </form>
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

export default Wholesale;
