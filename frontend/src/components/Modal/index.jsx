import React from 'react';
import { Modal, Button,Spinner} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const ModalBox = (props) => {
    const downloading = useSelector(state => state.documents.downloading);

    return (
        <>
            <Modal size="lg" show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>

                    {downloading ? 
                        <Button variant="info" value={props._id} disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        downloading...
                    </Button> 
                    :    
                    <Button value={props.value} variant="primary" onClick={props.handleAction}>
                        {props.action}
                    </Button>
                }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalBox;
