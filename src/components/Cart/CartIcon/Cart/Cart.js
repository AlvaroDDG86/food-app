import classes from "./Cart.module.css";
import Modal from "../../../UI/Modal/Modal";
import { useContext } from "react";
import CartContext from "../../../../store/card-context";
import CartItem from "../../CartItem/CartItem";
const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const addItemHandler = (item) => {
    const meal = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      amount: 1
    }
    cartContext.addItem(meal)
  }
  const removeItemHandler = (id) => {
    cartContext.removeItem(id)
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => {
        return <CartItem
                name={item.name}
                price={item.price}
                id={item.id}
                amount={item.amount}
                onAddItem={addItemHandler.bind(null, item)}
                onRemoveItem={removeItemHandler.bind(null, item.id)}
              />
      })}
    </ul>
  );
  const noItemsFound = <p>No items yet</p>;
  return (
    <Modal onClose={props.onHideCart}>
      {cartContext.items.length ? cartItems : noItemsFound}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{cartContext.totalItems}</span>
      </div>
      <div className={classes.total}>
        <span>Total price</span>
        <span>${cartContext.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        { cartContext.items.length > 0 && <button className={classes["button"]}>Order</button> }
      </div>
    </Modal>
  );
};

export default Cart;
