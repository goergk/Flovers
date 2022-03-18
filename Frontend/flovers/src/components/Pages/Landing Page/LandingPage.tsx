import React from 'react';
import classes from './LandingPage.module.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { PageType } from '../Current Page/PageType';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../Assets/Logo/Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import HeartSvg from '../../Svg/heart_icon.svg';
import CoffeeSvg from '../../Svg/coffee_icon.svg';

const LandingPage = () => {
    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.FLOWERS}`);
    const { login } = useSelector((state: RootState) => state.Login);

    if (login) { changeRoute() }

    return (
        <>
            <div className={classes.Container_1}>
                <div className={classes.Navbar_Container}>
                    <Link to={`${PageType.LANDING_PAGE}`} style={{ textDecoration: 'none' }}>
                        <Logo />
                    </Link>
                    <Link to={`${PageType.SIGNIN}`} style={{ textDecoration: 'none' }}>
                        <div className={classes.Login_Container}>
                            <p>
                                Sign In
                            </p>
                        </div>
                    </Link>
                </div>
                <div className={classes.Title_Container}>
                    <h1>
                        Manage your beloved flowers wherever you are
                    </h1>
                </div>
                <div className={classes.Text_Container}>
                    <h2>
                        Flovers is not just a website about pretty flowers, but a set of tools to manage your florist effectively.
                    </h2>
                </div>
                <div className={classes.Main_Button_Container}>
                    <div style={{ width: 'fit-content' }}>
                        <Link to={`${PageType.SIGNUP}`} style={{ textDecoration: 'none' }}>
                            <div className={classes.Button_Container}>
                                <h2>Start now</h2>
                                <ArrowRightAltIcon className={classes.Arrow} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={classes.Container_2}>
                <div className={classes.Offers_Container}>
                    <div className={classes.Offer_Container}>
                        <SettingsIcon className={classes.Offer_Icon} />
                        <h2>
                            Manage your florist
                        </h2>
                        <p>
                            Thanks to this page, you'll get access to many tools which will help you manage your florist.
                        </p>
                    </div>
                    <div className={classes.Offer_Container}>
                        <AutoGraphIcon className={classes.Offer_Icon} />
                        <h2>
                            Achieve better results
                        </h2>
                        <p>
                            Using better methods and tools to manage your florist will help you achieve better sales results.
                        </p>
                    </div>
                    <div className={classes.Offer_Container}>
                        <SentimentSatisfiedAltIcon className={classes.Offer_Icon} />
                        <h2>
                            Satisfied Customers
                        </h2>
                        <p>
                            Better florist management will result in greater comfort and customer satisfaction.
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.Container_3}>
                <div className={classes.Footer}>
                    <h2>
                        Made with &nbsp; &nbsp;
                        <img src={HeartSvg} alt="Heart" className={classes.Icon} />
                        &nbsp; &nbsp; and &nbsp; &nbsp;
                        <img src={CoffeeSvg} alt="Coffee" className={classes.Icon} />
                        &nbsp; &nbsp; by Grzegorz Kawecki
                    </h2>
                    <h2>
                        Copyright &#xA9; 2022
                    </h2>
                </div>
            </div>
        </>
    )
}

export default LandingPage;
