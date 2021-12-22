import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './SignUp.module.css';
import { PageType } from '../Current Page/PageType';
import Logo from '../../Assets/Logo/Logo';
import TextField from '@mui/material/TextField/TextField';

const SignUp = () => {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirm: "",
    })

    function handleChange(evt: any) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    return (
        <div className={classes.Sign_In_Container}>
            <div className={classes.Navbar_Container}>
                <Link to={`${PageType.LANDING_PAGE}`} style={{ textDecoration: 'none' }}>
                    <Logo />
                </Link>
            </div>
            <div className={classes.Container_1}>
                <div className={classes.Login_Container}>
                    <h3>
                        Sign Up
                    </h3>
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={state.username}
                        onChange={handleChange}
                        className={classes.Sign_In_Input}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={state.email}
                        onChange={handleChange}
                        className={classes.Sign_In_Input}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={state.password}
                        onChange={handleChange}
                        className={classes.Sign_In_Input}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={state.confirm}
                        onChange={handleChange}
                        className={classes.Sign_In_Input}
                    />
                    <div className={classes.Login_Button}>
                        <b>Register</b>
                    </div>
                    <div className={classes.Container_2}>
                        <Link to={`${PageType.SIGNIN}`} style={{ textDecoration: 'none', color: '#d97979' }}>
                            <h4>
                                Already have an Account?
                            </h4>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
