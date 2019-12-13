import React from "react";
import Card from "react-bootstrap/Card";

import "./ProfileCard.css"
import NewPostButton from "./NewPostButton";
import theme from "../util/theme";
import { userContext } from "../context/UserContext";

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
                        <Card.Subtitle className="text-muted p-1">{user.currentUser.profile.id}</Card.Subtitle>
                        <Card.Subtitle style={styles.composePostContainer}>
                            <div>
                                <NewPostButton />
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
