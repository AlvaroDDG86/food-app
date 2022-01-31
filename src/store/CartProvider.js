import { useEffect, useState } from "react"
import CartContext from "./card-context"

const CartProvider = props => {
    const [items, setItems] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        setTotalAmount(items.reduce((prev, current) => prev + current.amount, 0))
    }, [items])

    const addItemHandler = item => {
        const index = items.findIndex(meal => meal.id === item.id)
        if (index > -1) {

        } else {
            setItems(prev => [...prev, item ])
        }
    }

    const removeItemHandler = id => {
        setItems(prev => prev.filter(current => current.id !== id))
    }

    return <CartContext.Provider value={{
        items,
        totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }}>
        { props.children }
    </CartContext.Provider>
}

export default CartProvider