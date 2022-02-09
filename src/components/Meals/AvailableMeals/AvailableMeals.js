import { useContext, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import CartContext from '../../../store/cart-context'
import { parseObjectToArray } from "../../../helpers";

const AvailableMeals = () => {
  const [ meals, setMeals ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ httpError, setHttpError ] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://react-tasks-bb7ce-default-rtdb.firebaseio.com/meals.json')
      if (!response.ok) {
        throw new Error(`${response.status} - Something went wrong`)
      }
      const data = await response.json()
      const mealsFromBack = parseObjectToArray(data, ['name', 'description', 'price'])
      debugger
      setMeals(mealsFromBack)
      setIsLoading(false)
    }
    // This returns a promise, but async is not allowed, only need the catch
    fetchData().catch(error => {
      setHttpError(error.message)
      setIsLoading(false)
    })
  }, [])

  const cartContext = useContext(CartContext)
  const addItemHandler = (items) => {
    cartContext.addItem({
      id: "m4",
      name: "Green Bowl",
      description: "Healthy...and green...",
      price: 18.99,
    })
  }
  if (isLoading) {
    return (
      <section className={classes.loader}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => {
            return (
              <MealItem
                name={meal.name}
                description={meal.description}
                price={meal.price}
                id={meal.id}
                key={meal.id}
                onAddItem={addItemHandler}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
