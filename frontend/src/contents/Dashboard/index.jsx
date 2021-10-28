import React, { useEffect, useState } from 'react'
import { Container, Card, Modal, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addDocument, deleteDocument, downloadThis } from '../../actions';
import Cardcom from '../../components/CardComponent';
import FormInput from '../../components/FormInput';
import { selectTag } from '../../components/helpers';
import './style.css';
import { helpingConstants } from '../../actions/constants';

const Dashboard = () => {
    const [show, setShow] = useState(false);
    const [err, setErr] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const errorClose = () => setErr(false);
    const errorShow = () => setErr(true);
    const dispatch = useDispatch();
    const data = useSelector(state => state.documents);
    const [fileName, setFileName] = useState('');
    const [documentFile, setDocumentFile] = useState('');
    const [ID, setID] = useState('');


    const handelUpload = () => {
        const form = new FormData();

        form.append('fileName', fileName);
        form.append('documentFile', documentFile);

        dispatch(addDocument(form));
        setFileName('');
        setDocumentFile('');
    }

    const downloadthisDocument = (e) => {
        let id = e.target.value;
        setID(id);
        dispatch(downloadThis(id));
    }

    const deletethisDocument = (e) => {
        let id = e.target.value;
        setID(id);
        dispatch(deleteDocument(id));
    }

    const handelFile = (e) => {
        setDocumentFile(e.target.files[0]);
    }

    const Customcard = () => {
        return (
            <Card style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px'}}>
                <Card.Title>Add a New Document</Card.Title>
                <i className="fa fa-plus-circle" style={{ fontSize: '4rem', margin: '9px', cursor: 'pointer' }} onClick={handleShow}></i>
            </Card>
        )
    }
    const setDate = (time) => {
        let date = new Date(time);
        let tm = date.toDateString();
        return tm.slice(3);
    }

    const ErrorModal = (props) => {
        return (<Modal show={err} onHide={errorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>OOPS !!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.msg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={errorClose}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>)
        
    }

    const cardComponent = (val, index) => {
        return (
            <Cardcom
                _id={val._id}
                title={val.document.docName}
                index={index}
                text={setDate(val.time)}
                pbutton="download"
                sbutton="delete"
                tbutton="preview"
                ID={ID}
                download={downloadthisDocument}
                delete={deletethisDocument}
                document={val.document}
                children={selectTag(val.document, "500px", "filled")}
            />
        )
    }

    useEffect(()=>{
        if(data.error){
            errorShow();
        }
        if(!err){
            dispatch({type:helpingConstants.CLEAR_MODAL_ERROR});
        }
        if(!data.loading){
            handleClose();
        }
    },[data.error,data.loading,dispatch,err])

    return (
        <>
            <Container className="dashboard_grid" fluid>
                {data.error ? 
                    <ErrorModal msg={data.error} />
                    :
                    null
                }
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormInput
                            label="Set Filename"
                            type="text"
                            placeholder="Enter file name (Recommended)"
                            text="If you leave this field blank then your file name would be same as originalfile name."
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <FormInput
                            type="file"
                            onChange={handelFile}
                        />
                    </Modal.Body>
                    {data.loading ?
                        <Modal.Footer>
                            <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Uploading...
                            </Button>

                        </Modal.Footer>
                        :
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handelUpload}>
                                Upload
                            </Button>
                        </Modal.Footer>
                    }
                </Modal>

                <Customcard />

                {data.documents && data.documents.length > 0 ? data.documents.map((val, index) => {
                    return cardComponent(val, index);
                }) : null}


            </Container>
        </>
    )
}

export default Dashboard;
