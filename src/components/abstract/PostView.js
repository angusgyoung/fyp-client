import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileCard from "../elements/ProfileCard";
import Container from "react-bootstrap/Container";
import PostContainer from "../elements/PostContainer";
import PostAwareComponent from "./PostAwareComponent";

class PostView extends PostAwareComponent {

    render() {

        const hasPosts = this.props.posts.length > 0
        const title = this.props.title;
        const posts = this.props.posts;

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
                        {hasPosts &&
                            posts.map(post => (
                                <Row>
                                    <PostContainer post={post} />
                                </Row>
                            ))
                            || (
                                <Row>
                                    <p>no posts</p>
                                </Row>
                            )
                        }
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