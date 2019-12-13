import React from "react";
import { createFeedWsClient } from "../services/socket";
import SplitPostView from "../views/SplitPostView";
import { getPosts} from "../services/api"


class Feed extends SplitPostView {

    constructor(props) {
        super(props);        
    }

    async componentDidMount() {
        const response = await getPosts();
        if (response.status == 200) {
            const postPage = await response.json();
            this.setState({ posts: postPage.content });
        }

        this.state.wsClient.addSubscription('/topic/posts', (message) => {
            this.state.posts.unshift(JSON.parse(message.body));
            this.setState({ posts: this.state.posts });
        })
    }
}


export default Feed;
