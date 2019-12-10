import React from "react";
import {createFeedWsClient} from "../services/socket";
import ProfileCardFeedView from "../views/ProfileCardFeedView";

class Feed extends ProfileCardFeedView {

    constructor(props) {
        super(props)
    }

    wsClient = createFeedWsClient((message) => {
        this.state.posts.unshift(JSON.parse(message.body));
        this.setState({posts: this.state.posts});
    });
}


export default Feed;
