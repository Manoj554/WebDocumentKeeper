import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import Home from '../../contents/Home';
import Dashboard from '../../contents/Dashboard';
import Signin from '../../contents/Signin';
import Signup from '../../contents/Signup';
import Error from '../../contents/Error';
import PrivateRoute from '../privateRoute';
import ContactUs from '../../contents/contactUs';

const Routing = () => {
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>

                <PrivateRoute  path="/dashboard" component={Dashboard}/>

                <Route exact path="/signup">
                    <Signup/>
                </Route>
                <Route exact path="/signin">
                    <Signin/>
                </Route>
                <Route exact path="/contact">
                    <ContactUs/>
                </Route>
                <Route>
                    <Error/>
                </Route>
            </Switch>
        </>
    )
}

export default Routing;
