import React from "react";
import Loading from "../components/Loading";
import Card from "react-bootstrap/Card";

import "./ProfileCard.css"
import NewPostButton from "./NewPostButton";
import theme from "../util/theme";
import { authenticationService } from "../services/authentication.service";

const ProfileCard = () => {
    const currentUser  = authenticationService.currentUserValue;

    return (        
        <Card className="profileCard p-0">
            <Card.Img
                src={currentUser.profile.profileImageUrl}
                alt="Profile"
                className="rounded-circle p-1"
            />
            <Card.Title className="p-1">{ currentUser.username }</Card.Title>
            <Card.Subtitle className="text-muted p-1">{ currentUser.id }</Card.Subtitle>
            <Card.Subtitle style={styles.composePostContainer}>
                <div>
                    <NewPostButton/>
                </div>
            </Card.Subtitle>
        </Card>
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
