import React from 'react';
import { Form } from 'react-bootstrap'

const FormInput = (props) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type={props.type} placeholder={props.placeholder} autoComplete={props.autoComplete} value={props.value} onChange={props.onChange}/>
                <Form.Text className="text-muted">
                    {props.text}
                </Form.Text>
            </Form.Group>
        </>
    )
}

export default FormInput;
