import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import FloristSelect from '../Select Florist Page/FloristSelect';
import LandingPage from '../Landing Page/LandingPage';
import { PageType } from './PageType';
import classes from './CurrentPage.module.css';
import SignIn from '../Sign In Page/SignIn';
import SignUp from '../Sign Up Page/SignUp';
import Error from '../Error Page/Error';

const Page = () => {

    return (
        <div className={classes.Main_Container}>
            <Switch>
                <Route path={`${PageType.LANDING_PAGE}`} exact>
                    <LandingPage />
                </Route>
                <Route path={`${PageType.FLOWERS}`}>
                    <FloristSelect />
                </Route>
                <Route path={`${PageType.SIGNIN}`}>
                    <SignIn />
                </Route>
                <Route path={`${PageType.SIGNUP}`}>
                    <SignUp />
                </Route>
                <Route path='/404'>
                    <Error />
                </Route>
                <Redirect from='*' to='/404' />
            </Switch>
        </ div >
    )
}

export default Page;