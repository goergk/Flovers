import React from 'react';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import EventIcon from '@mui/icons-material/Event';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import BarChartIcon from '@mui/icons-material/BarChart';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import classes from '../Resources.module.css';

const Tags = () => {
    return (
        <>
            <div className={classes.Show_Number}>
                <Grid3x3Icon className={classes.Icon} />
            </div>
            <div className={classes.Show_Name}>
                <FormatColorTextIcon className={classes.Icon} />
                <p className={classes.Show_Container_Text}>
                    Name
                </p>
            </div>
            <div className={classes.Show_Date}>
                <EventIcon className={classes.Icon} />
                <p className={classes.Show_Container_Text}>
                    Added
                </p>
            </div>
            <div className={classes.Show_Price}>
                <RequestQuoteIcon className={classes.Icon} />
                <p className={classes.Show_Container_Text}>
                    Price
                </p>
            </div>
            <div className={classes.Show_Amount}>
                <BarChartIcon className={classes.Icon} />
                <p className={classes.Show_Container_Text}>
                    Amount
                </p>
            </div>
        </>
    );
};

export default Tags;
