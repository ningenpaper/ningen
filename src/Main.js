import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  const [time, setTime] = useState({
    y: "0",
    mon: "0",
    d: "1",
    h: "12",
    m: "00",
    s: "00",
    mi: "000",
  });
  const [message, setMessage] = useState("");

  // 시계 기능
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        y: now.getFullYear(),
        mon: String(now.getMonth() + 1).padStart(2, "0"),
        d: String(now.getDate()).padStart(2, "0"),
        h: String(now.getHours()).padStart(2, "0"),
        m: String(now.getMinutes()).padStart(2, "0"),
        s: String(now.getSeconds()).padStart(2, "0"),
        mi: String(now.getMilliseconds()).padStart(3, "0"),
      });
    };

    const interval = setInterval(updateClock, 10);
    return () => clearInterval(interval);
  }, []);

  // 메시지 전송
  const sendMail = (e) => {
    e.preventDefault();
    window.location.href = `mailto:ningenpaperpress@gmail.com?subject=Message from Website&body=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div className="main-page">
      <div className="left">
        <div id="timedate">
          <span>{time.y}</span>.<span>{time.mon}</span>.<span>{time.d}</span>.<span>{time.h}</span>:
          <span>{time.m}</span>:<span>{time.s}</span>:<span>{time.mi}</span>
        </div>

        <div id="title">
          <Link to="/">Ningen Paper Press</Link>
        </div>

        <div id="header-description">
          <p>
            Hey. Wake Up! It's time to print
            <br />
            <Link to="/">www.ningenpaperpress.com</Link>
            <br />
            Can you check the index below...? Please...
          </p>
        </div>

        <nav id="menu-list">
          <Link to="/prints">Prints</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/others">Public Audio</Link>
          <Link to="/index">pdf Library</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>

      <div className="right">
        <div id="contact">
          Contact <img src="/web-image/hand.png" alt="hand" />
        </div>
        <form onSubmit={sendMail}>
          <textarea
            id="message"
            placeholder="Feel free to reach us anytime and anywhere..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <button type="submit">Send Message</button>
        </form>

        <div id="des">
          Do you want to make your own book? <br />
          If you have any provocative contents, <br />
          please reach our publisher. <br />
          We are always waiting for you.
        </div>

        <div id="links">
          <div>ningenpaperpress@gmail.com</div>
          <a
            href="https://www.instagram.com/ningenpaper.press/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ningenpaper.press
          </a>
        </div>
      </div>

      <div className="fixed">
        <img id="member" src="/web-image/index-ningen-photo.png" alt="Ningen members" />
        <div className="tag">
          <h1>Welcome...</h1>
          <h2>Ningen...</h2>
          <h3>Paper...</h3>
          <h4>Web...</h4>
        </div>
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
    </div>
  );
}

export default Main;
