import React from 'react';
import classes from '../Deliveries.module.css';

interface Props {
    handleOpenMobileAdd: () => void
}

const DeliveryAddButton: React.FC<Props> = ({
    handleOpenMobileAdd
}) => {
    return (
        <div className={classes.Button_Container_Mobile}>
            <button className={classes.Add_Flower_Button_Mobile} onClick={e => handleOpenMobileAdd()}>
                New Delivery
            </button>
        </div>
    )
}

export default DeliveryAddButton