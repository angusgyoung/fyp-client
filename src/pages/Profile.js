import React from "react";
import SplitPostView from "../views/SplitPostView";
import { getPostsForUser } from "../services/api";
import { authenticationService } from "../services/authentication.service";

class Profile extends SplitPostView {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const profile = this.state.currentUser.profile;

        getPostsForUser(profile.username).then(response => {
            if (response.status == 200) {
                response.json().then(postPage => this.setState({ posts: postPage.content }));
            }
        });

        this.state.wsClient.addSubscription(`/queue/${profile.username}/posts`, (message) => {
            this.state.posts.unshift(JSON.parse(message.body));
            this.setState({ posts: this.state.posts });
        })
    }
}

export default Profile;
