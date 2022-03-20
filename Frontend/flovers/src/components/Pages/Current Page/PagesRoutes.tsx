import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import FloristSelect from '../Select Florist Page/FloristSelect';
import LandingPage from '../Landing Page/LandingPage';
import { PageType } from './PageType';
import classes from './CurrentPage.module.css';
import SignIn from '../Sign In Page/SignIn';
import SignUp from '../Sign Up Page/SignUp';
import Error from '../Error Page/Error';
import FloversPage from '../Current App Page/FloversPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const Page = () => {

    const { login } = useSelector((state: RootState) => state.Login);

    return (
        <div className={classes.Main_Container}>
            <Switch>
                <Route path={`${PageType.LANDING_PAGE}`} exact>
                    <LandingPage />
                </Route>
                <Route path={`${PageType.FLOWERS}`}>
                    <FloristSelect />
                </Route>
                <Route path={`${PageType.RESOURCES}`}>
                    <FloversPage />
                </Route>
                <Route path={`${PageType.DELIVERIES}`}>
                    <FloversPage />
                </Route>
                <Route path={`${PageType.COMPOSITIONS}`}>
                    <FloversPage />
                </Route>
                <Route path={`${PageType.SALES}`}>
                    <FloversPage />
                </Route>
                <Route path={`${PageType.STATISTICS}`}>
                    <FloversPage />
                </Route>
                <Route path={`${PageType.SIGNIN}`}>
                    {
                        login
                            ?
                            <Redirect from={`${PageType.SIGNIN}`} to={`${PageType.FLOWERS}`} />
                            :
                            <SignIn />
                    }
                </Route>
                <Route path={`${PageType.SIGNUP}`}>
                    {
                        login
                            ?
                            <Redirect from={`${PageType.SIGNUP}`} to={`${PageType.FLOWERS}`} />
                            :
                            <SignUp />
                    }
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