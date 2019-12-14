import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import GenericButton from "./GenericButton";
import "./ComposePostModal.css";

import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import { createPost } from "../../services/api";

class ComposePostModal extends Component {


    constructor(props){
        super(props);

        this.setShowModal = props.setShowModal;

        this.formChanged = this.formChanged.bind(this);
        this.parsePostContent = this.parsePostContent.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.setShowModal(false);
    }

    parsePostContent() {
        createPost(this.state.post, 'testuser+1234@gmail.com');
        this.closeModal();
    }

    formChanged(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render() {
        return (
            <Modal className="composePostModal" show={this.props.showModal} onHide={this.closeModal}>
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
                                name="post"
                                rows="3"
                                onChange={this.formChanged}
                                maxLength="120"/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>
                    <GenericButton onClick={this.parsePostContent}>Post</GenericButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ComposePostModal;