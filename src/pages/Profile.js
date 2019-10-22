import React from "react";
import Loading from "../components/Loading";
import {useAuth0} from "../react-auth0-spa";
import Container from "react-bootstrap/Container";
import PostView from "../views/PostView";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <PostView title="Profile"/>
    </Container>
  );
};

export default Profile;
