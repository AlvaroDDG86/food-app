import CartIcon from "../../Cart/CartIcon/CartIcon";
import classes from "./HeaderCardButton.module.css";
import CartContext from "../../../store/card-context";
import { useContext } from "react";

const HeaderCardButton = (props) => {
  const cartContext = useContext(CartContext);
  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{cartContext.totalItems}</span>
    </button>
  );
};

export default HeaderCardButton;
