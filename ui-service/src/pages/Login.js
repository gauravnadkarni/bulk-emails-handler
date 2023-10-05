
import { Card, Row, Col, Button, Container, InputGroup, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import classes from './Login.module.css';
import { useEffect, useState } from 'react';
import classnames from "classnames"

function Login() {
  const initialErrorState = {email:null,password:null,action:null};
  const initialState = {
    email:"",
    password:"",
    isChecking:false,
    isError:false,
    error:{email:null,password:null,action:null},
  }
  const [loginInfo, setLoginInfo] = useState(initialState);
  const navigate = useNavigate();

  const {
    email,
    password,
    isChecking,
    isError,
    error,
  } = loginInfo;

  const validateLoginForm = () => {
    const errorObject = {...initialErrorState};
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isError = false;
    if(!email || (emailRegex.test(email)!==true)) {
      errorObject.email = "Invalid email";
      isError=true;
    } 

    if(!password) {
      errorObject.password = "Invalid password";
      isError=true;
    }
    setLoginInfo((prevState)=>({...prevState,error:errorObject,isError}));
    return !isError;
  }

  const onLoginClicked = async () => {
    if(validateLoginForm()===false) {
      return;
    }
    setLoginInfo((prevState)=>({...prevState,isChecking:true}));
    axios.post('/users/auth/signin',{
      email,
      password,
      setInCookie:true,
    }).then((response)=>{
      setLoginInfo((prevState)=>({...initialState}));
      navigate('/ui/dashboard');
    }).catch((err)=> {
      setLoginInfo((prevState)=>({
        ...prevState,
        isChecking:false,
        error:{...prevState.errorObject,action:err.response.data.message},
        isError:true,
      }));
    });
  };
  useEffect(()=>{
    console.log(loginInfo);
  })
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
                      <InputGroup className="mb-1">
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        <Form.Control
                          placeholder="abc@domain.com"
                          aria-label="Email"
                          aria-describedby="basic-addon1"
                          value={email}
                          onChange={(e)=>{setLoginInfo((prevState)=>({...prevState,email:e.target.value}))}}
                        />
                      </InputGroup>
                      {isError && <div className={classes.error}>{error.email}</div>}
                    </Col>
                </Row>
                <Row className={classes.headerRow}>
                    <Col lg={12} md={12}>
                        <InputGroup className="mb-1">
                          <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            value={password}
                            onChange={(e)=>{setLoginInfo((prevState)=>({...prevState,password:e.target.value}))}}
                          />
                        </InputGroup>
                        {isError && <div className={classes.error}>{error.password}</div>}
                    </Col>
                </Row>
                <Row className={classes.headerRow}>
                    <Col lg={9} md={9}>
                      {isError && <div className={classes.error}>{error.action}</div>}
                    </Col>
                    <Col lg={3} md={3}>
                      <Button 
                        variant="primary"
                        onClick={onLoginClicked}
                        disabled={isChecking}
                      >{isChecking ? (<Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>) : "Login"}
                      </Button>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
      </Card>
    </div>)
}

export default Login;