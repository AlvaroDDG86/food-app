import ReactDom from 'react-dom'
import Card from '../Card/Card'
import classes from './Modal.module.css'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClose={props.onClose}></div>
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                { props.children }
            </div>
        </div>
    )
}


const Modal = (props) => {
    return (
        <Card>
            {
                ReactDom.createPortal(
                    <Backdrop />,
                    document.getElementById('backdrop')
                )
            }
            {
                ReactDom.createPortal(
                    <ModalOverlay>{ props.children }</ModalOverlay>,
                    document.getElementById('modal')
                )
            }
        </Card>
    )
}

export default Modal