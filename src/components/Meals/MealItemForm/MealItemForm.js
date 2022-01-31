import classes from './MealItemForm.module.css'
import Input from '../../UI/Input/Input'

const MealItemForm = (props) => {
    const submitHandler = (event) => {
        event.preventDefault()
        props.onAddItem(2)
    }
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
            input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}
            label="Amount"
        />
        <button>
            + Add
        </button>
    </form>
}

export default MealItemForm