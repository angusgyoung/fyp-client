import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import GenericButton from "./GenericButton";
import "./ComposePostModal.css";

import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import {generateKeyPair, setKeypairInLocalStorage} from "../../helpers/crypto";
import {userContext} from "../../context/UserContext";

class SetkeypairModal extends Component {


    constructor(props) {
        super(props);

        this.setShowModal = props.setShowModal;
        this.showPrivateKeyPassphrase = false;

        this.formChanged = this.formChanged.bind(this);
        this.setNewKeypair = this.setNewKeypair.bind(this);
        this.generateNewKeypair = this.generateNewKeypair.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.setShowModal(false);
    }

    generateNewKeypair() {
        let email = this.context.currentUser.profile.username;
        generateKeyPair(email, this.state.passphrase).then(keypair => {
            setKeypairInLocalStorage(keypair);
            alert("Keypair set");
        })
    }

    setNewKeypair() {
        this.closeModal();
    }

    formChanged(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <Modal className="set-keypair-modal" show={this.props.showModal} onChange={this.formChanged} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Set new keypair
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="set-keypair-form">
                        <FormGroup>
                            <FormLabel>
                                Set a new public and encrypted private keypair. Ensure that the public key has been associated with
                                the email used to create your account in one of the below keyservers: laalala
                            </FormLabel>
                            <FormControl
                                id="public-key-textarea"
                                as="textarea"
                                name="publicKey"
                                rows="3"
                                onChange={this.formChanged}
                                maxLength="120" />
                            <FormControl
                                id="private-key-textarea"
                                as="textarea"
                                name="privateKey"
                                rows="3"
                                onChange={this.formChanged}
                                maxLength="120" />
                            <Form.Group>
                                <Form.Label>Private key passphrase. You will need this when signing posts</Form.Label>
                                <Form.Control name="passphrase" show={this.showPrivateKeyPassphrase.toString()} type="password" placeholder="Passphrase" />
                            </Form.Group>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>
                    <GenericButton onClick={this.generateNewKeypair}>Generate a keypair for me</GenericButton>
                    <GenericButton onClick={this.setNewKeypair}>Set Keypair</GenericButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

SetkeypairModal.contextType = userContext;

export default SetkeypairModal;