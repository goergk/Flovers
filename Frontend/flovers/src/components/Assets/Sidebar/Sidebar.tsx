import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../Assets/Logo/Logo';
import classes from './Sidebar.module.css';
import { SidebarData } from './SidebarData';
import { PageType } from '../../Pages/Current Page/PageType';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../features/login';

interface Props {
    setLogout: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<Props> = ({ setLogout }) => {
    const [mobileOpen, setMobileOpen] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const updateWidth = () => setWidth(window.innerWidth);

    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.LANDING_PAGE}`);
    const dispatch = useDispatch();

    const { pathname } = useLocation();

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
                        let border = false;
                        if (item.path === `${PageType.COMPOSITIONS}`) { border = true }
                        return (
                            <Link
                                to={item.path}
                                style={
                                    border
                                        ?
                                        { borderBottom: '1px solid gray', textDecoration: 'none', color: 'white', marginBottom: '1em', width: '100%' }
                                        :
                                        { textDecoration: 'none', color: 'white' }}
                                key={index}
                                onClick={handleDrawerToggle}
                            >
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
                            setLogout(true);
                            setTimeout(function () {
                                dispatch(signOut());
                                changeRoute();
                            }, 800);
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
                        let border = false;
                        if (item.path === `${PageType.COMPOSITIONS}`) { border = true }
                        return (
                            <Link
                                to={item.path}
                                style={
                                    border
                                        ?
                                        { borderBottom: '1px solid gray', textDecoration: 'none', color: 'white', marginBottom: '1em' }
                                        :
                                        { textDecoration: 'none', color: 'white' }}
                                key={index}
                            >
                                <div
                                    className={pathname !== item.path ? classes.List_Container : classes.List_Container_Active}>
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
                            setLogout(true);
                            setTimeout(function () {
                                dispatch(signOut());
                                changeRoute();
                            }, 800);
                        }}>
                        Log out
                    </div>
                </div>
            }
        </>
    )
}

export default Sidebar;
