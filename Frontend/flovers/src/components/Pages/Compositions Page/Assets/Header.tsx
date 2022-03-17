import React from 'react';
import classes from '../Compositions.module.css';
import GrassIcon from '@mui/icons-material/Grass';

const Header = () => {
    return (
        <div className={classes.Header_Container}>
            <div className={classes.Header_Container_1}>
                <div className={classes.Icon_Container}>
                    <GrassIcon className={classes.Header_Icon} />
                </div>
                <div>
                    <h1>
                        Compose
                    </h1>
                    <p>
                        Create bouquets out of the available flowers.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header