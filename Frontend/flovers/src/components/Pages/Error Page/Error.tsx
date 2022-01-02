import React from 'react';
import classes from './Error.module.css';
import ErrorIcon from '@mui/icons-material/Error';

const Error = () => {
    return (
        <div className={classes.Error_Container}>
            <h1>
                404
            </h1>
            <ErrorIcon className={classes.Error_Icon} />
            <h2>
                Page not found
            </h2>
        </div>
    )
}

export default Error;
