import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import classes from '../Deliveries.module.css';

const Header = () => {
    return (
        <div className={classes.Header_Container}>
            <div className={classes.Header_Container_1}>
                <div className={classes.Icon_Container}>
                    <AssignmentIcon className={classes.Header_Icon} />
                </div>
                <div>
                    <h1>
                        Deliveries
                    </h1>
                    <p>
                        Manage flowers delivered to florist.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header;