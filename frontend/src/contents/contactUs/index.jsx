import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Container, FloatingLabel, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../actions';

const ContactUs = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const contact = useSelector(state => state.contactus);

    const handleSubmit = (e) => {
        e.preventDefault();
        const contact = { name, email, phone, city, message };
        dispatch(contactUs(contact));
    }

    useEffect(()=>{
        if(contact.message !== ''){
            setName('');
            setPhone('');
            setEmail('');
            setCity('');
            setMessage('');
        }
    },[contact.message])
    
    return (
        <>
            <Container>
                <Row style={{ paddingTop: '90px' }}>
                    <Col md={{ span: 6, offset: 3 }} className="SigninStyle">
                        <h1 style={{ marginBottom: '20px' }}>Contact </h1>
                        {contact.error !== null ?
                            <Alert variant="danger" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                {contact.error}
                            </Alert>
                            :
                            contact.message !== '' ?
                                <Alert variant="danger" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    {contact.message}
                                </Alert>
                                :
                                null
                        }
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col md={6} >
                                    <Form.Group >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter fullname" value={name} onChange={e => setName(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={6} >
                                    <Form.Group controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Col md={6} >
                                    <Form.Group controlId="formGridPassword">
                                        <Form.Label>PhoneNo</Form.Label>
                                        <Form.Control type="phone" placeholder="Enter number" value={phone} onChange={e => setPhone(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col md={6} >
                                    <Form.Group controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="What is your city name?" value={city} onChange={e => setCity(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Message</Form.Label>
                                <FloatingLabel controlId="floatingTextarea" label="Write something here" className="mb-3">
                                    <Form.Control as="textarea" style={{ height: '100px' }} value={message} onChange={e => setMessage(e.target.value)} />
                                </FloatingLabel>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="warning" style={{float:'right'}}><a href="https://manojkumar.herokuapp.com" target="_black">Contact to Developer</a></Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ContactUs;
