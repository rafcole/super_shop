import React from "react";

const Header = ({ total, cartItems }) => {
  return (
    <header>
      <h1>Richard and Marwan</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <p>
          {cartItems.length == 0
            ? "Your cart is empty"
            : "You have items in your cart"}{" "}
        </p>
        <p>Total: ${total}</p>
        <button className="checkout" disabled={cartItems.length == 0}>
          Checkout
        </button>
      </div>
    </header>
  );
};

export default Header;
