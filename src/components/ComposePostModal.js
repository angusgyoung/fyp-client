import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import GenericButton from "./GenericButton";

import "./ComposePostModal.css"
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";

const ComposePostModal = (props) => {

    const closeModal = () => props.setShowModal(false);

    return (
        <Modal className="composePostModal" show={props.showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Compose Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>
                            What do you want to say
                        </FormLabel>
                        <FormControl 
                        id="composePostTextArea" 
                        as="textarea" 
                        rows="3" 
                        maxLength="120"/>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                    </Button>
                <GenericButton>Post</GenericButton>
            </Modal.Footer>
        </Modal>
    );
}

export default ComposePostModal;