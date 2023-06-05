import React from "react";
import Cart from "./Cart";

const Header = ({ cartItems }) => {
  return (
    <header>
      <h1>Richard and Marwan</h1>
      <Cart cartItems={cartItems} />
    </header>
  );
};

export default Header;
