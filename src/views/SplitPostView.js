import React, {Component} from "react";
import PostView from "./PostView";
import PostAwareComponent from "../components/PostAwareComponent";

class SplitPostView extends PostAwareComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PostView title={this.props.title} posts={this.state.posts}/>
        );
    }

}
export default SplitPostView;