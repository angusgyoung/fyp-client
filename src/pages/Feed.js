import React from "react";
import { getPosts } from "../services/api"
import PostView from "../components/abstract/PostView";


class Feed extends PostView {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.setState({ currentPage: 0, hasMore: true });

        getPosts().then(posts => {
            if (posts && posts.length > 0) {
                console.debug("Got posts:", posts);
                this.setState({ posts: posts });
            } else {
                this.setState({ hasMore: false })
            }
        }).catch(error => {
            console.error("Failed to get posts:", error.message);
            this.setState({ posts: [] });
        });

        this.state.wsClient.addSubscription('/topic/posts', (message) => {
            console.debug("Received message:", message.body);
            // push new posts to the front of the array to get
            // displayed first
            this.state.posts.unshift(JSON.parse(message.body));
            this.setState({ posts: this.state.posts });
        })
    }
}


export default Feed;
