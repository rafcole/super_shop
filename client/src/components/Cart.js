import React from "react";

const Cart = ({ cartItems }) => {
  //
  const cartTotal = () => {
    let sum = 0;

    const subTotals = cartItems
      .map(item => item.price * item.quantity)
      .forEach(sub => (sum += sub));

    return sum;
  };

  console.log({ cartItems });
  // TODO - handling of Total inside of table ele important vs just using a p tag?
  // example empty cart uses p
  // example populated cart has total inside table

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty</p>
          <p>Total: ${cartTotal()}</p>
        </>
      ) : (
        <table class="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.title.slice(0, 20)}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" className="total">
                Total: ${cartTotal()}
              </td>
            </tr>
          </tfoot>
        </table>
      )}

      <button className="checkout" disabled={cartItems.length == 0}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
