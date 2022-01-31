import { Fragment, useState } from "react";
import Cart from "./components/Cart/CartIcon/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [showModal, setShowModal ] = useState(false)
  const showCartHandler = () => {
    setShowModal(true)
  }
  const hideCartHandler = () => {
    setShowModal(false)
  }
  return (
    <Fragment>
      {showModal && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </Fragment>
  );
}

export default App;
