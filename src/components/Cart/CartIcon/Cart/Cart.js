import classes from "./Cart.module.css";
import Modal from "../../../UI/Modal/Modal";
import { useContext } from "react";
import CartContext from "../../../../store/card-context";
const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const removeItemHandler = (id) => {
    cartContext.removeItem(id)
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => {
        return <li key={item.id}>
          {item.name}
          <button onClick={_ => removeItemHandler(item.id)}>Remove</button>
        </li>;
      })}
    </ul>
  );
  const noItemsFound = <p>No items yet</p>;
  return (
    <Modal onClose={props.onHideCart}>
      {cartContext.items.length ? cartItems : noItemsFound}
      <div className={classes.total}>
        <span>total amount</span>
        <span>{cartContext.totalAmount}</span>
      </div>
      <div className={classes.total}>
        <span>total price</span>
        <span>{cartContext.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes["button"]}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
