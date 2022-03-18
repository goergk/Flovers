import React from 'react';
import classes from '../Sales.module.css';

interface Props {
    handleOpenMobileAdd: () => void
}

const SaleAddButton: React.FC<Props> = ({
    handleOpenMobileAdd
}) => {
    return (
        <div className={classes.Button_Container_Mobile}>
            <button className={classes.Add_Flower_Button_Mobile} onClick={e => handleOpenMobileAdd()}>
                New Sale
            </button>
        </div>
    )
}

export default SaleAddButton