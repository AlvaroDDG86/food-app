import React, { useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../../UI/Modal/Modal";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import CartItem from "../CartItem/CartItem";
import Checkout from "../Checkout/Checkout";
const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const addItemHandler = (item) => {
    const meal = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      amount: 1,
    };
    cartContext.addItem(meal);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-tasks-bb7ce-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart()
  };
  const removeItemHandler = (id) => {
    cartContext.removeItem(id);
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => {
        return (
          <CartItem
            name={item.name}
            price={item.price}
            id={item.id}
            key={item.id}
            amount={item.amount}
            onAddItem={addItemHandler.bind(null, item)}
            onRemoveItem={removeItemHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartContext.items.length ? cartItems : <p>No items yet</p>}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{cartContext.totalItems}</span>
      </div>
      <div className={classes.total}>
        <span>Total price</span>
        <span>${cartContext.totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onHideCart} onSubmit={submitOrderHandler} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {cartContext.items.length > 0 && (
            <button className={classes["button"]} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>
  const isDidSubmitModalContent = <React.Fragment>
      <p>Order has been sent</p>
      <div className={classes.actions}>
        <button className={classes["button"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>

  return <Modal onClose={props.onHideCart}>
    {!isSubmitting && !didSubmit &&  cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && isDidSubmitModalContent}
  </Modal>;
};

export default Cart;
