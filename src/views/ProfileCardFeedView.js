import React, {Component} from "react";
import {getPosts} from "../services/api";
import PostView from "./PostView";

class ProfileCardFeedView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: props.user
        }
    }

    wsClient;

    async componentDidMount() {
        let postPage = await getPosts();
        this.setState({posts: postPage.content})
    }

    componentWillUnmount() {
        this.wsClient.deactivate();
    }
    render() {
        return (
            <PostView title={this.props.title} posts={this.state.posts}/>
        );
    }

}

export default ProfileCardFeedView;