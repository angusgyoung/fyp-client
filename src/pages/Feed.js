import React from "react";
import PostView from "../views/PostView";

import {getPosts} from "../services/api"
import {createWsClient} from "../services/socket";

class Feed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            user: props.user
        };
    }

    async componentDidMount() {
        let postPage = await getPosts();

        this.newPostsWs = await createWsClient('ws://localhost:8080/api/v1/isys/websocket',
            '/topic/posts', (frame) => {
                console.log('Received frame: ', frame);
                this.state.posts.unshift(JSON.parse(frame.body));
                this.setState({posts: this.state.posts})
        });

        this.setState({posts: postPage.content})
    }

    render() {
        return (
            <PostView title="Feed" posts={this.state.posts}/>
        );
    }
}


export default Feed;
