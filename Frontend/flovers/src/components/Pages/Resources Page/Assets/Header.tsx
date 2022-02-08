import React from 'react';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import classes from '../Resources.module.css';

const Header = () => {
    return (
        <div className={classes.Header_Container}>
            <div className={classes.Header_Container_1}>
                <div className={classes.Icon_Container}>
                    <WarehouseIcon className={classes.Header_Icon} />
                </div>
                <div>
                    <h1>
                        Resources
                    </h1>
                    <p>
                        Manage available flowers or add new ones.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;
