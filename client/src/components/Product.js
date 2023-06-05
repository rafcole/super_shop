import React from "react";

const Product = ({ product, onAdd }) => {
  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          <button
            className="add-to-cart"
            onClick={() => {
              onAdd(product._id);
            }}>
            Add to Cart
          </button>
          <button className="edit">Edit</button>
        </div>
        <button className="delete-button">
          <span>X</span>
        </button>
      </div>
    </li>
  );
};

export default Product;
