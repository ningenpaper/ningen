import { useState, useEffect } from "react";
import Papa from "papaparse";
import "./IndexLibrary.css";

function IndexLibrary() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // ningen-index Google Sheet CSV URL
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZO5KMls4n9X-cPzblFblh4Mam04m5C2dNd7XZgMRdddW6l-Q2LUGydEEIv0EVRXaDkMasfkTH2z6L/pub?output=csv";

    fetch(SHEET_URL)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Index data:", results.data);
            setBooks(results.data);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching index data:", error);
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
        {books.map((book, index) => {
          const title = book.Title?.endsWith('.pdf') ? book.Title : `${book.Title}.pdf`;
          return (
            <div key={index} className="book">
              ▣ {book.Author},{" "}
              <a
                href={book.PDF}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={showImage}
                onMouseMove={moveImage}
                onMouseLeave={hideImage}
              >
                {title}
                {book.Image && <img src={book.Image} alt={book.Title} />}
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
