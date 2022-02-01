import { useReducer } from "react";
import CartContext from "./card-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const itemsUpdated = state.items.concat(action.item);
      return {
        items: itemsUpdated,
        totalAmount: itemsUpdated
          .reduce((prev, current) => prev + current.amount * current.price, 0)
          .toFixed(2),
        totalItems: itemsUpdated.reduce((prev, current) => prev + current.amount, 0),
      };
    case "DELETE_ITEM":
      const itemsPrevalent = state.items.filter(item => item.id !== action.id);
      return {
        items: itemsPrevalent,
        totalAmount: itemsPrevalent
          .reduce((prev, current) => prev + current.amount * current.price, 0)
          .toFixed(2),
        totalItems: itemsPrevalent.reduce((prev, current) => prev + current.amount, 0),
      };
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // const [items, setItems] = useState([])
  // const [totalAmount, setTotalAmount] = useState(0)
  // const [totalItems, setTotalItems] = useState(0)

  // useEffect(() => {
  //     setTotalAmount(items.reduce((prev, current) => prev + (current.amount * current.price), 0).toFixed(2))
  //     setTotalItems(items.reduce((prev, current) => prev + (current.amount), 0))
  // }, [items])

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
    // const index = items.findIndex(meal => meal.id === item.id)
    // if (index > -1) {

    // } else {
    //     setItems(prev => [...prev, item ])
    // }
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({
      type: "DELETE_ITEM",
      id,
    });
    // setItems(prev => prev.filter(current => current.id !== id))
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        totalItems: cartState.totalItems,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
