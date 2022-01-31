import { useState } from "react";
import Cart from "./components/Cart/CartIcon/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showModal, setShowModal ] = useState(false)
  const showCartHandler = () => {
    setShowModal(true)
  }
  const hideCartHandler = () => {
    setShowModal(false)
  }
  return (
    <CartProvider>
      {showModal && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
