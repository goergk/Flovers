import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './SignUp.module.css';
import { PageType } from '../Current Page/PageType';
import Logo from '../../Assets/Logo/Logo';
import Input from '../../Assets/Sign_Input/Input';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { signIn } from '../../../features/login';

const initialValues = {
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
    Username: Yup.string().required("Required"),
    Email: Yup.string().email("Invalid email.").required("Required"),
    Password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character."
        )
        .required("Password required."),
    ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("Password"), null], "Password doesn't match")
        .required("Confirm password."),
});

const SignUp = () => {
    const history = useHistory();
    const changeRoute = () => history.push(`${PageType.FLOWERS}`);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const onSubmit = () => {
        setError('');
        fetch('http://127.0.0.1:8000/api/register/', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                "username": values.Username,
                "email": values.Email,
                "password": values.Password,
                "confirmation": values.ConfirmPassword
            })
        }).then((response) => {
            response.json().then(data => {
                if (response.ok) {
                    sessionStorage.setItem('username', data.user.username);
                    sessionStorage.setItem('user_id', data.user.id);

                    fetch('http://127.0.0.1:8000/api/token/', {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json; charset=UTF-8'
                        },
                        body: JSON.stringify({
                            "username": values.Username,
                            "password": values.Password
                        })
                    }).then((response) => {
                        response.json().then(data => {
                            if (response.ok) {
                                sessionStorage.setItem('token', data.access);
                                dispatch(signIn());
                                changeRoute();
                            }
                        })
                    });
                }
                else {
                    setError('');
                    setError('Username already taken.');
                }
            })
        });
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
                        Sign Up
                    </h3>
                    <form onSubmit={handleSubmit} className={classes.Login_From_Container}>
                        <Input
                            error={errors.Username}
                            value={values.Username}
                            onChange={handleChange}
                            type="text"
                            name="Username"
                            text="Username"
                        />
                        <Input
                            error={errors.Email}
                            value={values.Email}
                            onChange={handleChange}
                            type="text"
                            name="Email"
                            text="Email"
                        />
                        <Input
                            error={errors.Password}
                            value={values.Password}
                            onChange={handleChange}
                            type="password"
                            name="Password"
                            text="Password"
                        />
                        <Input
                            error={errors.ConfirmPassword}
                            value={values.ConfirmPassword}
                            onChange={handleChange}
                            type="password"
                            name="ConfirmPassword"
                            text="Confirm Password"
                        />
                        <p className={classes.Login_Error}>{error}</p>
                        <button className={classes.Login_Button} type="submit">Register</button>
                    </form>
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
