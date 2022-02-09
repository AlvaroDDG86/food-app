import React, { useRef, useState } from "react";
import classes from "./checkout.module.css";
import { isStringEmpty, isStringLength } from "../../../helpers";
const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInput = useRef("");
  const streetInput = useRef("");
  const postalCodeInput = useRef("");
  const cityInput = useRef("");
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;

    const nameValid = !isStringEmpty(enteredName);
    const streetValid = !isStringEmpty(enteredStreet);
    const postalCodeValid = isStringLength(enteredPostalCode, 5);
    const cityValid = !isStringEmpty(enteredCity);

    setFormInputValidity({
      name: nameValid,
      street: streetValid,
      postalCode: postalCodeValid,
      city: cityValid,
    });

    const formIsValid =
      nameValid && streetValid && postalCodeValid && cityValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      enteredName,
      enteredStreet,
      enteredPostalCode,
      enteredCity,
    });
  };

  const controlNameClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
  const controlStreetClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`
  const controlPostalCodeClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`
  const controlCityClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={controlNameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputValidity.name && <p>Enter a name</p>}
      </div>
      <div className={controlStreetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputValidity.street && <p>Enter a street</p>}
      </div>
      <div className={controlPostalCodeClasses}>
        <label htmlFor="portal">Portal Code</label>
        <input type="text" id="portal" ref={postalCodeInput} />
        {!formInputValidity.postalCode && <p>Enter a portal code(5 long)</p>}
      </div>
      <div className={controlCityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputValidity.city && <p>Enter a city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confir</button>
      </div>
    </form>
  );
};

export default Checkout;
