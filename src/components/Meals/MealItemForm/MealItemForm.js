import classes from './MealItemForm.module.css'
import Input from '../../UI/Input/Input'

const MealItemForm = (props) => {
    return <form className={classes.form}>
        <Input 
            id={props.id}
            label="items"
            type="number"
        />
        <button>
            Save
        </button>
    </form>
}

export default MealItemForm