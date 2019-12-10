import React from "react";
import {createProfileWsClient} from "../services/socket";
import ProfileCardFeedView from "../views/ProfileCardFeedView";

class Profile extends ProfileCardFeedView {

    constructor(props) {
        super(props);
    }

    wsClient = createProfileWsClient(this.props.user.nickname, (message) => {
        this.state.posts.unshift(JSON.parse(message.body));
        this.setState({posts: this.state.posts});
    });
}

export default Profile;
