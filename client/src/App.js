import { useState, useEffect } from "react";
import productData from "./mockData/data";
import Header from "./components/Header";
import axios from "axios";

import ProductListing from "./components/ProductListing";
import AddForm from "./components/AddForm";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      const data = response.data;

      setProducts(data)
    }
    fetchProducts();
  }, [])

  const handleSubmitNewProduct = (formData) => {
    console.log("form Data made it to app.js", {formData})
    // setProducts(formData.concat)
  }

  return (
    <div id="app">
      <Header cartItems={cartItems} total={total} />
      <main>
        <ProductListing products={...products} />
        <AddForm onSubmitNewProduct={handleSubmitNewProduct}/>
      </main>
    </div>
  );
};

export default App;
