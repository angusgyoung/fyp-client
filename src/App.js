import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import history from "./services/history";
// styles
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import { authenticationService } from "./helpers/authentication";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div id="app" className="d-flex flex-column h-100">
                    <Navigation />
                    <Container className="flex-grow-1 mt-5">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/home" exact component={Home} />
                            <Route path="/login" exact component={Login} />
                            <PrivateRoute path="/profile" component={Profile} />
                            <PrivateRoute path="/feed" component={Feed} />
                        </Switch>
                    </Container>
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App;
