import React from 'react';
import SpaIcon from '@mui/icons-material/Spa';
import classes from './Logo.module.css';

const Logo = () => {
    return (
        <>
            <div className={classes.Logo_Container}>
                <SpaIcon className={classes.Logo_Icon} />
                <h2>
                    Flovers
                </h2>
            </div>
        </>
    )
}

export default Logo;
