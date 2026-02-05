import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import "./body.css";
import "./reset.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ1FiG1bGFJRGbBdtapj0EI9oOsa9Hi5J7pTtCvnbwBpluHWxOyJ2wmrhsMUiasjUXRukkMSjP767I/pub?output=csv";

  useEffect(() => {
    fetch(SHEET_URL)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setProducts(results.data);
            setLoading(false);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <a href="/">Ningen Paper Press</a> sells <a href="/">print matters</a>.
        </header>

        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/product/:folderName" element={<ProductDetail products={products} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
