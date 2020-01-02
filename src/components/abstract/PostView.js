import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InfiniteScroll from "react-infinite-scroll-component";

import ProfileCard from "../elements/ProfileCard";
import PostContainer from "../elements/PostContainer";
import PostAwareComponent from "./PostAwareComponent";

import { getPosts } from "../../services/api";

class PostView extends PostAwareComponent {

    constructor(props) {
        super(props);

        this.getNextPageOfPosts = this.getNextPageOfPosts.bind(this);
    }

    // Gets the next page of posts. In the case
    // of a profile page, this method should be overridden
    // to call getPostsForUser instead
    getNextPageOfPosts() {
        let currentPage = this.state.currentPage;
        currentPage++;
        this.setState({ currentPage });
        console.debug('Current page:', this.state.currentPage);
        getPosts(currentPage)
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

    render() {

        const posts = this.state.posts;
        const hasMore = this.state.hasMore;
        const hasPosts = posts.length > 0
        const title = this.props.title;
        const getNextPageOfPosts = this.getNextPageOfPosts

        return (
            <Container className="mb-5">
                <Row>
                    <Col className="offset-md-3" style={styles.postViewHeader}>
                        <h2>{title}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-3">
                        <div style={styles.postViewProfileCardDiv}>
                            <ProfileCard />
                        </div>
                    </Col>
                    <Col className="col-md-8">
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={getNextPageOfPosts}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Thats everything</b>
                                </p>
                            }
                        >
                            {hasPosts &&
                                posts.map(post => (
                                    <Row className="m-2">
                                        <PostContainer post={post} />
                                    </Row>
                                ))
                            }
                        </InfiniteScroll>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const styles = {
    postViewHeader: {
        paddingLeft: "0px"
    },
    postViewProfileCardDiv: {
        position: "fixed"
    }
}

export default PostView;