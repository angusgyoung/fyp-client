import React from "react";
import Card from "react-bootstrap/Card";
import Moment from "react-moment"

import "./ProfileCard.css"
import NewPostButton from "./NewPostButton";
import SetKeypairButton from "./SetKeypairButton";

import theme from "../../util/theme";
import { userContext } from "../../context/UserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProfileCard = () => {
    return (
        <userContext.Consumer>
            {
                user =>
                    <Card className="profileCard p-0">
                        <Card.Img
                            src={user.currentUser.profile.profileImageUrl}
                            alt="Profile"
                            className="rounded-circle p-1"
                        />
                        <Card.Title className="p-1">{user.currentUser.profile.username}</Card.Title>
                        <Card.Subtitle className="text-muted p-1">
                            <Row>
                                <Col>
                                    Account Born on
                                </Col>
                                <Col>
                                    <Moment unix format="MMM D YYYY">
                                        {user.currentUser.profile.accountCreatedTimestamp}
                                    </Moment>
                                </Col>
                            </Row>

                        </Card.Subtitle>
                        <Card.Subtitle style={styles.composePostContainer}>
                            <div>
                                <NewPostButton />
                            </div>
                            <div>
                                <SetKeypairButton />
                            </div>
                        </Card.Subtitle>
                    </Card>
            }
        </userContext.Consumer>

    );
}

const styles = {
    composePostContainer: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: theme.BORDER_COLOR,
        padding: "1rem"
    }
}

export default ProfileCard;
