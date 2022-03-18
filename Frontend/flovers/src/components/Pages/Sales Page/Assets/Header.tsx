import React from 'react';
import classes from '../Sales.module.css';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Header = () => {
    return (
        <div className={classes.Header_Container}>
            <div className={classes.Header_Container_1}>
                <div className={classes.Icon_Container}>
                    <MonetizationOnIcon className={classes.Header_Icon} />
                </div>
                <div>
                    <h1>
                        Sales
                    </h1>
                    <p>
                        Sell your flowers and bouquets.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header