import React from 'react';
import classes from '../Sales.module.css';
import NumbersIcon from '@mui/icons-material/Numbers';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import EventIcon from '@mui/icons-material/Event';

const Tags = () => {
    return (
        <>
            <div className={classes.Show_Number}>
                <Grid3x3Icon className={classes.Icon} />
            </div>
            <div className={classes.Show_Name}>
                <NumbersIcon className={classes.Icon} />
                <p className={classes.Show_Container_Text}>
                    Sale ID
                </p>
            </div>
            <div className={classes.Show_Date}>
                <EventIcon className={classes.Icon} />
                <p className={classes.Show_Container_Text}>
                    Added
                </p>
            </div>
        </>
    )
}

export default Tags;