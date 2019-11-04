import React from "react";
import PostView from "../views/PostView";
import {getPostsForUser} from "../services/api";
import {createWsClient} from "../services/socket";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: props.user
        }
    }

    async componentDidMount() {

        console.log(this.state.user);
        let postPage = await getPostsForUser(this.state.user.nickname);

        this.newPostsWs = await createWsClient('ws://localhost:8080/api/v1/isys/websocket',
            `/queue/${this.state.user.nickname}/posts`, (frame) => {
                console.log('Received frame: ', frame);
                this.state.posts.unshift(JSON.parse(frame.body));
                this.setState({posts: this.state.posts})
            });

        this.setState({posts: postPage.content})
    }

    render() {
        return (
            <PostView title="Profile" posts={this.state.posts}/>
        );
    }
}

export default Profile;
