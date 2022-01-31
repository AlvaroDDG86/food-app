import React, { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from '../../../assets/meals.jpg'
import HeaderCardButton from "../HeaderCardButton/HeaderCardButton";


const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>OrderApp</h1>
        <HeaderCardButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="meal" />
      </div>
    </Fragment>
  );
};

export default Header;
