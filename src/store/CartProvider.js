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

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({
      type: "DELETE_ITEM",
      id,
    });
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
