import React from 'react';
import classes from '../Compositions.module.css';
import EventIcon from '@mui/icons-material/Event';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

const Tags = () => {
    return (
        <>
            <div className={classes.Show_Number}>
                <Grid3x3Icon className={classes.Icon} />
            </div>
            <div className={classes.Show_Name}>
                <FormatColorTextIcon className={classes.Icon} />
                <p className={classes.Show_Container_Text}>
                    Bouquet name
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

export default Tags