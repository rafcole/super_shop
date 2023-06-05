import { useState, useEffect } from "react";
import productData from "./mockData/data";
import Header from "./components/Header";
import axios from "axios";

import ProductListing from "./components/ProductListing";
import AddForm from "./components/AddForm";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  // const [total, setTotal] = useState(0);

  // populate data
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      const data = response.data;

      setProducts(data);
    };
    fetchProducts();

    // fetchCartItems function definition had been here

    const fetchCartItems = async () => {
      const response = await axios.get("/api/cart");
      const data = response.data;

      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  const handleSubmitNewProduct = formData => {
    console.log("form Data made it to app.js", { formData });
    // setProducts(formData.concat)

    // add a product to mongo
    // router.post("/products", (req, res, next) => {
    //   const { title, price, quantity } = req.body;
    //   Product.create({ title, price, quantity })
    //     .then(product => res.json(product))
    //     .catch(err => next(err));
    // });
  };

  return (
    <div id="app">
      <Header cartItems={cartItems} />
      <main>
        <ProductListing
          products={products}
          setCartItems={setCartItems}
          setProducts={setProducts}
        />
        <AddForm onSubmitNewProduct={handleSubmitNewProduct} />
      </main>
    </div>
  );
};

export default App;
