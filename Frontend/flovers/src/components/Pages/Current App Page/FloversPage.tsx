import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Error from '../Error Page/Error';
import Resources from '../Resources Page/Resources';
import Deliveries from '../Deliveries Page/Deliveries';
import Compositions from '../Compositions Page/Compositions';
import { PageType } from '../Current Page/PageType';
import Sidebar from '../../Assets/Sidebar/Sidebar';
import classes from './FloversPage.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const FloversPage = () => {
    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.SIGNIN}`);
    const { login } = useSelector((state: RootState) => state.Login);
    if (!login) { changeRoute() }

    return (
        <div className={classes.Page_Container}>
            <div className={classes.Sidebar_Container}>
                <Sidebar />
            </div>
            <div className={classes.Main_Page_Container}>
                <Switch>
                    <Route path={`${PageType.RESOURCES}`}>
                        <Resources />
                    </Route>
                    <Route path={`${PageType.DELIVERIES}`}>
                        <Deliveries />
                    </Route>
                    <Route path={`${PageType.COMPOSITIONS}`}>
                        <Compositions />
                    </Route>
                    <Route path='/404'>
                        <Error />
                    </Route>
                    <Redirect from='*' to='/404' />
                </Switch>
            </div>
        </div >
    )
}

export default FloversPage;