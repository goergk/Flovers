import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../Assets/Logo/Logo';
import classes from './Sidebar.module.css';
import { SidebarData } from './SidebarData';
import { PageType } from '../../Pages/Current Page/PageType';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../features/login';

const Sidebar = () => {
    const [mobileOpen, setMobileOpen] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const updateWidth = () => setWidth(window.innerWidth);

    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.LANDING_PAGE}`);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        if (width > 1000 && !mobileOpen) { setMobileOpen(true); }
        return () => window.removeEventListener("resize", updateWidth);
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return (
        <>
            {width < 1000 && mobileOpen
                &&
                <MenuIcon onClick={handleDrawerToggle} className={classes.Menu_Icon} />
            }
            {!mobileOpen
                ?
                <div className={mobileOpen ? classes.Sidebar_container_mobile : classes.Sidebar_container}>

                    <CloseIcon onClick={handleDrawerToggle} className={classes.Close_Icon} />
                    {SidebarData.map((item, index) => {
                        return (
                            <Link to={item.path} style={{ textDecoration: 'none', color: 'white' }} key={index}>
                                <div className={classes.List_Container}>
                                    {item.icon}
                                    <h3>
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        )
                    })}
                    <div className={classes.Logut_Button}
                        onClick={() => {
                            dispatch(signOut());
                            changeRoute();
                        }}>
                        Log out
                    </div>
                </div>
                :
                <div className={classes.Sidebar_container_Web}>
                    <div style={{ marginLeft: '-1.3em' }}>
                        <Logo />
                    </div>
                    {SidebarData.map((item, index) => {
                        return (
                            <Link to={item.path} style={{ textDecoration: 'none', color: 'white' }} key={index}>
                                <div className={classes.List_Container}>
                                    {item.icon}
                                    <h3>
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        )
                    })}
                    <div className={classes.Logut_Button}
                        onClick={() => {
                            dispatch(signOut());
                            changeRoute();
                        }}>
                        Log out
                    </div>
                </div>
            }
        </>
    )
}

export default Sidebar;