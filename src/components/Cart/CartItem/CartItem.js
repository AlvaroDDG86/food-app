import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <span className={classes.name}>{props.amount}x</span>
        <span className={classes.name}>{props.name}</span>
        <span className={classes.price}>(${props.price})</span>
      </div>
      <button onClick={_ => props.onRemoveItem(props.id)}>X</button>
    </li>
  );
};

export default CartItem;
