import React from "react";
import { getPosts} from "../services/api"
import PostView from "../components/abstract/PostView";


class Feed extends PostView {
    
    async componentDidMount() {
        const response = await getPosts();
        if (response.status === 200) {
            const postPage = await response.json();
            this.setState({ posts: postPage.content });
        }

        this.state.wsClient.addSubscription('/topic/posts', (message) => {
            this.state.posts.unshift(JSON.parse(message.body));
            this.setState({ posts: this.state.posts });
        })
    }

    render() {
        return <PostView title="Feed" posts={this.state.posts}/>
    }
}


export default Feed;
