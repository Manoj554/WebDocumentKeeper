import React, { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectTag } from '../helpers';
import ModalBox from '../Modal';

const Cardcom = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const loading = useSelector(state => state.documents.deleting);
    const downloading = useSelector(state => state.documents.downloading);

    const titleTrim = (val) =>{
        if(val.length > 27){
            val = val.substr(0,24)+' .....';
        }
        return val;
    }

    return (
        <>
            <Card style={{ width: '100%' }} key={props.index}>
                {selectTag(props.document, "250px", "fit")}
                <Card.Body className="bg-warning">
                    <Card.Title title={props.title}>{titleTrim(props.title)}</Card.Title>
                    <Card.Text className="text-info" style={{fontSize:'1.1rem'}}>
                        Date :- <span className="text-secondary">{props.text}</span>
                    </Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {downloading ?
                            (props._id === props.ID ?
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
                                <Button value={props._id} variant="primary" onClick={props.download}>{props.pbutton}</Button>
                            )
                            :
                            <Button value={props._id} variant="primary" onClick={props.download}>{props.pbutton}</Button>
                        }

                        {props.tbutton ? <Button variant="success" onClick={handleShow}>{props.tbutton}</Button> : null}

                        {loading ?
                            (props._id === props.ID ?
                                <Button variant="info" value={props._id} disabled>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    deleting...
                                </Button>
                                :
                                <Button variant="danger" value={props._id} onClick={props.delete}>{props.sbutton}</Button>)
                            :
                            <Button variant="danger" value={props._id} onClick={props.delete}>{props.sbutton}</Button>
                        }
                    </div>
                    <ModalBox handleClose={handleClose}
                        handleAction={props.download}
                        title={props.title}
                        show={show}
                        value={props._id}
                        children={props.children}
                        action="Download"
                    />
                </Card.Body>
            </Card>
        </>
    )
}

export default Cardcom;
