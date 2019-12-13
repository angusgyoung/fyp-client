import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import history from "./helpers/history";
// styles
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import { authenticationService } from "./services/authentication.service";
import { userContext } from "./context/UserContext";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {}
        }

        this.checkIsAuthorised = this.checkIsAuthorised.bind(this);
        this.setUserAfterLogin = this.setUserAfterLogin.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
            // get and set currently logged in user to state
            this.checkIsAuthorised();
    }

    checkIsAuthorised() {
        let userInState = localStorage.getItem('currentUser');
        if (userInState) {
            this.setState({currentUser: userInState})
        }
    }

    setUserAfterLogin(user) {
        this.setState({currentUser: user})
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        const user = {
            currentUser,
            isAuthenticated : !!currentUser.profile,
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
