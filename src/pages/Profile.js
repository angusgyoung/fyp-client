import React from "react";
import { getPostsForUser } from "../services/api";
import PostView from "../components/abstract/PostView";

class Profile extends PostView {

    async componentDidMount() {
        const profile = this.context.currentUser.profile;

        getPostsForUser(profile.username).then(response => {
            if (response.status === 200) {
                response.json().then(postPage => this.setState({ posts: postPage.content }));
            }
        });

        this.state.wsClient.addSubscription(`/queue/${profile.username}/posts`, (message) => {
            this.state.posts.unshift(JSON.parse(message.body));
            this.setState({ posts: this.state.posts });
        })
    }

    render() {
        return <PostView title="Profile" posts={this.state.posts}/>
    }
}

export default Profile;
