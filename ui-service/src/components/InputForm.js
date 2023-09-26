import { Row, Col, InputGroup, Form, Button, Alert, Spinner } from "react-bootstrap";
import classes from "./InputForm.module.css";

export default function InputForm(props) {
    const {
        onInputChange,
        value:inputValue,
        onButtonClick,
        showError,
        showLoading,
    } = props;
    return <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className={classes.columnContainer}>
            <div className={classes.controlContainer}>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Number of emails to be sent"
                        aria-label="Number of emails to be sent"
                        aria-describedby="basic-addon2"
                        type="number"
                        onChange={onInputChange}
                        value={inputValue}
                    />
                    <Button 
                        variant="outline-secondary"
                        onClick={onButtonClick}
                    >
                        Send
                    </Button>
                </InputGroup>
                {showError && <Alert variant="danger" className={classes.error}>
                    Please enter a number greater than zero
                </Alert>}
                {showLoading && <div className={classes.centerSpinner}><Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner></div>}
            </div>
        </Col>
    </Row>
}