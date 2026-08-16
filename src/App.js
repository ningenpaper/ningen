import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "./Main";
import IndexLibrary from "./IndexLibrary";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import ShoppingCart from "./ShoppingCart";
import Others from "./Others";
import Projects from "./Projects";
import About from "./About";
import Wholesale from "./Wholesale";
import OrderSuccess from "./OrderSuccess";
import { CartProvider } from "./CartContext";
import { AudioProvider } from "./AudioContext";
import "./reset.css";
import "./body.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/prints")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
  }, []);

  return (
    <AudioProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/index" element={<IndexLibrary />} />
          <Route path="/prints" element={<ProductList products={products} />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/public-audio" element={<Others />} />
          <Route path="/others" element={<Others />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </AudioProvider>
  );
}

export default App;
