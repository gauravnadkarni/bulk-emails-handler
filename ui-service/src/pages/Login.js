
import { Card, Row, Col, Button, Container, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import classes from './Login.module.css';
import { useState } from 'react';

function Login() {
  const initialState = {
    email:null,
    password:null,
    isChecking:false,
    isError:false,
    error:{email:null,password:null,action:null},
  }
  const [loginInfo, setLoginInfo] = useState(initialState);

  const {
    email,
    password,
    isChecking,
    isError,
    error,
  } = loginInfo;

  const validateLoginForm = () => {
    const errorObject = {};
    let isError = false;
    if(!email) {
      errorObject.email = "Invalid email";
      isError=true;
    }
    if(!password) {
      errorObject.password = "Invalid email";
      isError=true;
    }
    this.setLoginInfo((prevState)=>({...prevState,error:errorObject,isError}));
    return !isError;
  }

  const onLoginClicked = async () => {
    if(validateLoginForm()===false) {
      return;
    }
    axios.post('/users/auth/signin',{
      email,
      password,
      setInCookie:true,
    }).then((response)=>{

    }).catch((err)=> {

    });
  };

  return (
    <div className={classes.container}>
      <Card className={classes.panelParent}>
        <Card.Header>
            <span className={classes.headerTitle}>Login</span>
        </Card.Header>
        <Card.Body>
            <Container fluid>
                <Row className={classes.headerRow}>
                    <Col lg={12} md={12}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        <Form.Control
                          placeholder="abc@domain.com"
                          aria-label="Email"
                          aria-describedby="basic-addon1"
                          value={email}
                        />
                      </InputGroup>
                    </Col>
                </Row>
                <Row className={classes.headerRow}>
                    <Col lg={12} md={12}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            value={password}
                          />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className={classes.headerRow}>
                    <Col lg={{offset:9,span:3}} md={{offset:9,span:3}}>
                      <Button 
                        variant="primary"
                        onClick={onLoginClicked}
                      >Login
                      </Button>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
      </Card>
    </div>)
}

export default Login;
