import React, {Fragment, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const NewPostButton = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <Button className="genericButton" onClick={handleShow}>
                Compose Post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Compose Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Some compose form
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}
export default NewPostButton;
