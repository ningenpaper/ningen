import { Link } from "react-router-dom";
import "./Others.css";

function Others() {
  return (
    <>
      <div className="alert">Sorry...</div>

      <div className="go-back">
        <Link to="/">Go back</Link>
      </div>

      <div className="image">
        <Link to="/">
          <img src="/web-image/hand.png" alt="hand" />
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

export default Others;
