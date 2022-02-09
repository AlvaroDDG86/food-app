import classes from './MealItem.module.css'
import MealItemForm from '../MealItemForm/MealItemForm'
import { useContext } from 'react'
import CartContext from '../../../store/cart-context'

const MealItem = (props) => {
    const cartContext = useContext(CartContext)
    const price = `$${props.price.toFixed(2)}`

    const addItemHandler = (amount) => {
        const meal = {
            id: props.id,
            name: props.name,
            description: props.description,
            price: props.price,
            amount
        }
        cartContext.addItem(meal)
    }
    return <li className={classes.meal}>
        <div>
            <h3>{ props.name }</h3>
            <div className={classes.description}>
                { props.description }
            </div>
            <div className={classes.price}>
                { price }
            </div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddItem={addItemHandler} />
        </div>
    </li>
}

export default MealItem