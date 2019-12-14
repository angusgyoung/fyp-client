import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import Footer from "./components/elements/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import history from "./helpers/history";

import Container from "react-bootstrap/Container";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import { userContext } from "./context/UserContext";
import { authenticationHelper } from "./helpers/authentication";


class App extends Component {
    constructor(props) {
        super(props);

        this.checkIsAuthorised = this.getUserFromLocalStorage.bind(this);
        this.setUserAfterLogin = this.setUserAfterLogin.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
            currentUser: {}
        }
    }

    componentDidMount() {
        // get and set currently logged in user to state
        this.setState({ currentUser: this.getUserFromLocalStorage() });
    }

    getUserFromLocalStorage() {
        let userInLocalStorage = localStorage.getItem('currentUser');
        if (userInLocalStorage) {
            console.debug('Restoring user from local storage');
            return JSON.parse(userInLocalStorage);
        } else {
            console.debug('No user in local storage');
            return {};
        }
    }

    setUserAfterLogin(user) {
        this.setState({ currentUser: user });
    }

    logout() {
        authenticationHelper.logout();
        this.setState({ currentUser: {} });
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        const user = {
            currentUser,
            isAuthenticated: !!currentUser.profile,
            setUserAfterLogin: this.setUserAfterLogin,
            logout: this.logout
        }

        return (
            <userContext.Provider value={user}>
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
            </userContext.Provider>
        )
    }
}

export default App;
