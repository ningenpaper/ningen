import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import Main from "./Main";
import IndexLibrary from "./IndexLibrary";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Others from "./Others";
import Projects from "./Projects";
import About from "./About";
import "./reset.css";
import "./body.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ningen-prints Google Sheet CSV URL
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSXjubWwylELlxJi67h2un3d9B6LXb0SR01vh2lTPPyPDR4i8LBLErNly86YDl9z9qtrJ_4AIDqBkzC/pub?output=csv";

    fetch(SHEET_URL)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Products data:", results.data);
            setProducts(results.data);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/index" element={<IndexLibrary />} />
        <Route path="/prints" element={<ProductList products={products} />} />
        <Route path="/product/:folderName" element={<ProductDetail products={products} />} />
        <Route path="/others" element={<Others />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
