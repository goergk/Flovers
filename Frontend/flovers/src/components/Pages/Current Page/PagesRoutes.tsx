import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../Index Page/Index';
import LandingPage from '../Landing Page/LandingPage';
import { PageType } from './PageType';
import classes from './CurrentPage.module.css';
import SignIn from '../Sign In Page/SignIn';
import SignUp from '../Sign Up Page/SignUp';

const Page = () => {

    return (
        <div className={classes.Main_Container}>
            <Switch>
                <Route path={`${PageType.LANDING_PAGE}`} exact>
                    <LandingPage />
                </Route>
                <Route path={`${PageType.INDEX}`}>
                    <Index />
                </Route>
                <Route path={`${PageType.SIGNIN}`}>
                    <SignIn />
                </Route>
                <Route path={`${PageType.SIGNUP}`}>
                    <SignUp />
                </Route>
            </Switch>
        </ div>
    )
}

export default Page;