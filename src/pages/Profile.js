import React from "react";
import { getPostsForUser } from "../services/api";
import PostView from "../components/abstract/PostView";

class Profile extends PostView {

    constructor(props) {
        super(props)
    }

    getNextPageOfPosts() {
        let currentPage = this.state.currentPage;
        currentPage++;

        let username = this.context.currentUser.profile.username;

        this.setState({ currentPage });
        console.debug('Current page:', this.state.currentPage);
        getPostsForUser(username, currentPage)
            .then(posts => {
                if (posts && posts.length > 0) {
                    console.debug("Got next page of posts:", posts)
                    this.state.posts.push(...posts);
                    this.setState({ posts: this.state.posts })
                } else {
                    // we didn't get any posts
                    this.setState({ hasMore: false })
                }
            });
    }

    async componentDidMount() {
        const profile = this.context.currentUser.profile;
        this.setState({ currentPage: 0, hasMore: true });

        getPostsForUser(profile.username).then(posts => {
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

        this.state.wsClient.addSubscription(`/queue/${profile.username}/posts`, (message) => {
            this.state.posts.unshift(JSON.parse(message.body));
            this.setState({ posts: this.state.posts });
        })
    }
}

export default Profile;
