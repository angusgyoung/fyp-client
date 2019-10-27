import React from "react";
import Loading from "../components/Loading";
import {useAuth0} from "../react-auth0-spa";
import Card from "react-bootstrap/Card";

import "./ProfileCard.css"
import NewPostButton from "./NewPostButton";
import theme from "../util/theme";

const ProfileCard = () => {
    const {loading, user} = useAuth0();

    if (loading || !user) {
        return <Loading/>;
    }

    return (
        <Card className="profileCard p-0">
            <Card.Img
                src={user.picture}
                alt="Profile"
                className="rounded-circle p-1"
            />
            <Card.Title className="p-1">{user.nickname}</Card.Title>
            <Card.Subtitle className="text-muted p-1">{user.email}</Card.Subtitle>
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
