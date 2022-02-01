import { useRef } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input/Input'

const MealItemForm = (props) => {
    const amountInputRef = useRef()
    const submitHandler = (event) => {
        event.preventDefault()
        props.onAddItem(+amountInputRef.current.value)
        amountInputRef.current.value = 1
    }
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef}
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