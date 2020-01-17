import React, {Component, useState} from "react";

import theme from "../../util/theme";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Moment from "react-moment";

import GenericButton from "./GenericButton";
import { retrievePostSignature } from "../../services/api";

class PostContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            postSignature : "Fetching..."
        };

        this.viewSignature = this.viewSignature.bind(this);

    }

    async viewSignature(){
        const {signatureKey} = this.props.post;
        const {isOpen} = this.state;

        const postSignature = await retrievePostSignature(signatureKey);
        this.setState({isOpen : !isOpen, postSignature});
    }

    render() {
        const {isOpen, postSignature} = this.state;

        const {post} = this.props;
        const {username, content, timestamp, signatureKey} = post;

        return (
            <Card style={styles.postContainer}>
                <Card.Title style={styles.postContainerUser}>
                    <div className="float-left">{username}</div>
                    <div className="text-muted float-right">
                        <Moment unix format="h:mm a · MMM D YYYY">
                            {timestamp}
                        </Moment>
                    </div>
                </Card.Title>
                <Card.Text style={styles.postContainerText}>{content}</Card.Text>
                <Card.Subtitle style={styles.postContainerVerificationBar}>
                    <div>
                        <div className="text-muted float-left">
                            Signature Key: {signatureKey}
                        </div>
                        <div className="float-right">
                            <GenericButton
                                onClick={this.viewSignature}
                                className="genericButton"
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpen}
                            >
                                See Post Signature
                            </GenericButton>
                        </div>
                    </div>
                </Card.Subtitle>
                <Collapse in={isOpen} style={styles.verificationExpandView}>
                    <div id="example-collapse-text">{postSignature}</div>
                </Collapse>
            </Card>
        );
    }
}

const styles = {
    postContainer: {
        backgroundColor: "black",
        borderStyle: "solid",
        borderColor: theme.BORDER_COLOR,
        marginBottom: theme.GLOBAL_MARGIN,
        width: "100%"
    },

    postContainerUser: {
        padding: "0.5rem",
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: theme.BORDER_COLOR
    },

    postContainerText: {
        padding: theme.GLOBAL_PADDING
    },

    postContainerVerificationBar: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: theme.BORDER_COLOR,
        padding: theme.GLOBAL_PADDING
    },

    verificationExpandView: {
        padding: theme.GLOBAL_PADDING,
        backgroundColor: theme.GREY,
        fontFamily: "Consolas,monaco,monospace"
    }
};

export default PostContainer;
