import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './SignIn.module.css';
import { PageType } from '../Current Page/PageType';
import Logo from '../../Assets/Logo/Logo';
import Input from '../../Assets/Sign_Input/Input';
import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
    Username: "",
    Password: "",
};

const FORM_VALIDATION = Yup.object().shape({
    Username: Yup.string().required("Required"),
    Password: Yup.string().required("Required"),
});

const SignIn = () => {
    const history = useHistory();
    const changeRoute = () => history.push('/flovers');
    const [error, setError] = useState('');

    const onSubmit = () => {
        console.log('Its working :)');
    };

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues,
        validationSchema: FORM_VALIDATION,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit,
    });

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
                        Sign in
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <Input
                            error={errors.Username}
                            value={values.Username}
                            onChange={handleChange}
                            type="text"
                            name="Username"
                            text="Username"
                        />
                        <Input
                            error={errors.Password}
                            value={values.Password}
                            onChange={handleChange}
                            type="password"
                            name="Password"
                            text="Password"
                        />
                        {error !== '' && <p className={classes.Login_Error}>{error}</p>}
                        <button className={classes.Login_Button}>Login</button>
                    </form>
                    <div className={classes.Container_2}>
                        <Link to={`${PageType.SIGNUP}`} style={{ textDecoration: 'none', color: '#d97979' }}>
                            <h4>
                                Don't have an Account?
                            </h4>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
