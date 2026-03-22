import { useState, useEffect } from "react";
import "./IndexLibrary.css";

function IndexLibrary() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/library")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching library data:", error);
      });
  }, []);

  const showImage = (e) => {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.style.display = "block";
      img.style.left = `${e.clientX}px`;
      img.style.top = `${e.clientY}px`;
    }
  };

  const moveImage = (e) => {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.style.left = `${e.clientX}px`;
      img.style.top = `${e.clientY}px`;
    }
  };

  const hideImage = (e) => {
    const img = e.currentTarget.querySelector("img");
    if (img) {
      img.style.display = "none";
    }
  };

  return (
    <>
      <div className="header">
        <a href="/">ningen paper press</a> introduces virtual pdfs you can read.
      </div>

      <div className="list-of-books">
        {books.map((book) => {
          const title = book.title?.endsWith('.pdf') ? book.title : `${book.title}.pdf`;
          return (
            <div key={book.id} className="book">
              ▣ {book.author},{" "}
              <a
                href={book.pdf}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={showImage}
                onMouseMove={moveImage}
                onMouseLeave={hideImage}
              >
                {title}
                {book.image && <img src={book.image} alt={book.title} />}
              </a>
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

export default IndexLibrary;
