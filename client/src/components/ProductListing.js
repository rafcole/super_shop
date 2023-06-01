import React from "react";
import Product from "./Product";

const ProductListing = ({ products }) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(item => (
          <Product product={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
