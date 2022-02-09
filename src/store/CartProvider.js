import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      let itemsUpdated = [];
      const indexItem = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      if (indexItem > -1) {
        const currentItem = {
          ...state.items[indexItem],
          amount: state.items[indexItem].amount + action.item.amount,
        };
        itemsUpdated = [...state.items];
        itemsUpdated[indexItem] = currentItem;
      } else {
        itemsUpdated = state.items.concat(action.item);
      }
      return {
        items: itemsUpdated,
        totalAmount: itemsUpdated
          .reduce((prev, current) => prev + current.amount * current.price, 0)
          .toFixed(2),
        totalItems: itemsUpdated.reduce(
          (prev, current) => prev + current.amount,
          0
        ),
      };
    case "DELETE_ITEM":
      const indexItemDelete = state.items.findIndex(
        (item) => item.id === action.id
      );
      const updatedItem = {
        ...state.items[indexItemDelete],
        amount: --state.items[indexItemDelete].amount,
      };
      const itemsPrevalent = [
          ...state.items
      ]
      if (updatedItem.amount === 0) {
          itemsPrevalent.splice(indexItemDelete, 1)
      } else {
          itemsPrevalent[indexItemDelete] = updatedItem
      }
      return {
        items: itemsPrevalent,
        totalAmount: itemsPrevalent
          .reduce((prev, current) => prev + current.amount * current.price, 0)
          .toFixed(2),
        totalItems: itemsPrevalent.reduce(
          (prev, current) => prev + current.amount,
          0
        ),
      };
    case 'CLEAR': 
      return defaultCartState;
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

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' })
  }

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        totalItems: cartState.totalItems,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
