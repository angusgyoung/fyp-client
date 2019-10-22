import React from "react";
import Loading from "../components/Loading";
import {useAuth0} from "../react-auth0-spa";
import PostView from "../views/PostView";

const Feed = () => {
    const {loading, user} = useAuth0();

    if (loading || !user) {
        return <Loading/>;
    }

    return (
        <PostView title="Feed"/>
    );

};


export default Feed;
