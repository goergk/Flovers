import React from 'react'
import classes from './Alert.module.css';

interface Props {
    message: string;
}

const Alert: React.FC<Props> = ({ message }) => {
    return (
        <div className={classes.Alert_Container}>
            <h4>
                {message}
            </h4>
        </div>
    )
}

export default Alert