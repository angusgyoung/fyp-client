import React from "react";
import SplitPostView from "../views/SplitPostView";
import { getPostsForUser } from "../services/api";

class Profile extends SplitPostView {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        getPostsForUser(this.props.user.name).then(response => {
            if (response.status == 200) {
                response.json().then(postPage => this.setState({ posts: postPage.content }));
            }
        });

        this.state.wsClient.addSubscription(`/queue/${this.props.user.name}/posts`, (message) => {
            console.log('GOT MESSAGE!', message);
            this.state.posts.unshift(JSON.parse(message.body));
            this.setState({ posts: this.state.posts });
        })
    }
}

export default Profile;
