import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { creatAccount } from '../../actions';
import  { Redirect } from 'react-router-dom'; 

import FormInput from '../../components/FormInput';
import Loader from '../../components/Loader';

const Signup = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');
    // const [info,setInfo] = useState(true);
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);

    const handelSubmit = (e) => {
        e.preventDefault();

        const user = {
            firstName: fname,
            lastName: lname,
            email: email,
            password: password,
            rpassword: rpassword
        }

        dispatch(creatAccount(user));
    }
    if(state.authenticate){
        return <Redirect to='/dashboard' />
    }

    if(state.success){
        return <Redirect to='/signin' />
    }

  
    return (
        <>
            <Container>
                <Row style={{ marginTop: '80px' }}>
                    <Col md={{ span: 6, offset: 3 }} className="SigninStyle">
                        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Create Account</h1>
                        {state.caerror != null ?
                            <Alert variant="danger" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                {state.caerror}
                            </Alert>
                            :
                            state.message !== '' ?
                                <Alert variant="success" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    {state.message}
                                </Alert>
                                :
                                null}
                        {state.loading ? <Loader/> :
                        <Form onSubmit={handelSubmit}>
                            <Row>
                                <Col md={6}>
                                    <FormInput
                                        label="FirstName"
                                        type="text"
                                        placeholder="Enter firstname"
                                        value={fname}
                                        onChange={e => setFname(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormInput
                                        label="LastName"
                                        type="text"
                                        placeholder="Enter lastname"
                                        value={lname}
                                        onChange={e => setLname(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <FormInput
                                label="Email"
                                type="email"
                                placeholder="Enter valid emailId"
                                autoComplete="username"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                text="We'll never share your email with anyone else."
                            />
                            <FormInput
                                label="Password"
                                type="password"
                                placeholder="Set a password for your Account"
                                value={password}
                                autoComplete="new-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <FormInput
                                label="Repeat Password"
                                type="password"
                                placeholder="Confirm Password"
                                value={rpassword}
                                autoComplete="new-password"
                                onChange={e => setRpassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Signup
                            </Button>
                        </Form>
                        }
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Signup;
