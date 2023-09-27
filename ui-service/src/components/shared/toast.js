import classes from "./toast.module.css";
import { Toast } from "react-bootstrap";


export default function ToastComponent(props) {
    const {
        message,
        type,
        isVisible,
        animation=true,
        onCloseClicked,
    } = props;

    return (
        <div className={classes.container}>
            <Toast
                className="d-inline-block m-1"
                bg={type}
                animation={animation}
                show={isVisible}
                onClose={onCloseClicked}
            >
                <Toast.Header
                    closeButton
                    closeVariant='black'
                >
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    {message}
                </Toast.Body>
            </Toast>
        </div>
    )  
}