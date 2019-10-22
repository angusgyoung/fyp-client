import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./services/history";

// styles
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";

const App = () => {
    const { loading } = useAuth0();

    if (loading) {
        return <Loading />;
    }

    return (
        <Router history={history}>
            <div id="app" className="d-flex flex-column h-100">
                <Navigation />
                <Container className="flex-grow-1 mt-5">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <PrivateRoute path="/profile" component={Profile} />
                    </Switch>
                </Container>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
