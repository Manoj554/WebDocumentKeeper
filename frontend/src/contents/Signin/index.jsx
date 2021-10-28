import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import { login } from '../../actions';
import { Redirect } from 'react-router';
import Loader from '../../components/Loader';


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to='/dashboard' />
    }

    return (
        <>
            <Container>
                <Row style={{ marginTop: '100px' }}>
                    <Col md={{ span: 6, offset: 3 }} className="SigninStyle">
                        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Login !!!</h1>
                        {auth.error != null ?
                            <Alert variant="danger" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                {auth.error}
                            </Alert>
                            :
                            auth.message !== '' ?
                                <Alert variant="success" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    {auth.message}
                                </Alert>
                                :
                                null}
                        {auth.authenticating ? <Loader />
                            :
                            <Form onSubmit={handleSubmit}>
                                <FormInput
                                    label="Email"
                                    type="email"
                                    placeholder="Enter valid emailId"
                                    value={email}
                                    autoComplete="username"
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <FormInput
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    autoComplete="current-password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <Button variant="primary" type="submit">
                                    Signin
                                </Button>
                            </Form>
                        }
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Signin;
