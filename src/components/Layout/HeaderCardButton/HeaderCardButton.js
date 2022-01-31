import CartIcon from "../../Cart/CartIcon/CartIcon";
import classes from './HeaderCardButton.module.css'

const HeaderCardButton = (props) => {
  return (
    <button className={classes.button}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Cart</span>
        <span className={classes.badge}>2</span>
    </button>
  );
};

export default HeaderCardButton;
