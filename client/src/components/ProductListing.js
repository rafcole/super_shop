import React from "react";
import Product from "./Product";
import axios from "axios";

const ProductListing = ({ products, setCartItems, setProducts }) => {
  //
  const handleAddToCart = async productId => {
    // when product is added to cart
    // tell mongo about add
    // update cart state
    // update product state
    const res = await axios.post("/api/add-to-cart", { productId });
    console.log({ res });

    const { data } = await axios.get("/api/cart");

    setCartItems(data);

    const prodRes = await axios.get("/api/products");
    setProducts(prodRes.data);
  };

  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(item => (
          <Product product={item} key={item.id} onAdd={handleAddToCart} />
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
