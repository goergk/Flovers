import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../Index Page/Index';
import LandingPage from '../Landing Page/LandingPage';
import { PageType } from './PageType';
import classes from './CurrentPage.module.css';

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
            </Switch>
        </ div>
    )
}

export default Page;