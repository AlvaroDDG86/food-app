import classes from './Cart.module.css'
import Modal from '../../../UI/Modal/Modal'
const Cart = (props) => {
    const cartItems = [{
        id: "m1",
        name: "Sushi",
        description: "Finest fish and veggies",
        price: 22.99,
      }].map(item => {
        return <li key={item.id}>
            {item.name}
        </li>
    })
    return (
        <Modal onClose={props.onHideCart}>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>total amount</span>
                <span>21.23</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={classes['button']}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart