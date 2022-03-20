import React, { useState } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Error from '../Error Page/Error';
import Resources from '../Resources Page/Resources';
import Deliveries from '../Deliveries Page/Deliveries';
import Compositions from '../Compositions Page/Compositions';
import Sales from '../Sales Page/Sales';
import Stats from '../Statistics Page/Stats';
import { PageType } from '../Current Page/PageType';
import Sidebar from '../../Assets/Sidebar/Sidebar';
import classes from './FloversPage.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import SpaIcon from '@mui/icons-material/Spa';

const FloversPage = () => {
    const [logout, setLogout] = useState(false);
    const { login } = useSelector((state: RootState) => state.Login);

    return (
        <div className={logout ? classes.Page_Container_Logut : classes.Page_Container}>
            <div className={classes.Sidebar_Container}>
                <Sidebar setLogout={setLogout} />
                <Link to={`${PageType.FLOWERS}`}><SpaIcon className={classes.Logo_Icon} /></Link>
            </div>
            <div className={classes.Main_Page_Container}>
                <Switch>
                    <Route path={`${PageType.RESOURCES}`}>
                        {
                            login
                                ?
                                <Resources />
                                :
                                <Redirect from={`${PageType.RESOURCES}`} to={`${PageType.SIGNIN}`} />
                        }
                    </Route>
                    <Route path={`${PageType.DELIVERIES}`}>
                        {
                            login
                                ?
                                <Deliveries />
                                :
                                <Redirect from={`${PageType.RESOURCES}`} to={`${PageType.SIGNIN}`} />
                        }
                    </Route>
                    <Route path={`${PageType.COMPOSITIONS}`}>
                        {
                            login
                                ?
                                <Compositions />
                                :
                                <Redirect from={`${PageType.RESOURCES}`} to={`${PageType.SIGNIN}`} />
                        }
                    </Route>
                    <Route path={`${PageType.SALES}`}>
                        {
                            login
                                ?
                                <Sales />
                                :
                                <Redirect from={`${PageType.RESOURCES}`} to={`${PageType.SIGNIN}`} />
                        }
                    </Route>
                    <Route path={`${PageType.STATISTICS}`}>
                        {
                            login
                                ?
                                <Stats />
                                :
                                <Redirect from={`${PageType.RESOURCES}`} to={`${PageType.SIGNIN}`} />
                        }
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