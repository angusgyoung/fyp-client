import React from "react";
import Loading from "../components/Loading";
import {useAuth0} from "../react-auth0-spa";
import Card from "react-bootstrap/Card";

import "./ProfileCard.css"

const ProfileCard = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <Loading />;
    }

    return (
        <Card className="profileCard">
            <Card.Img
                src={user.picture}
                alt="Profile"
                className="rounded-circle"
            />
            <Card.Title>{user.nickname}</Card.Title>
            <Card.Subtitle className="text-muted">{user.email}</Card.Subtitle>
        </Card>
    );
}

export default ProfileCard;
