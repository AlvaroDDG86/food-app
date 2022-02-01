import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <div className={classes.name}>{props.name}</div>
        <span className={classes.amount}>{props.amount}x</span>
        <span className={classes.price}>(${props.price})</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onAddItem}>+</button>
        <button onClick={props.onRemoveItem}>-</button>
      </div>
    </li>
  );
};

export default CartItem;
