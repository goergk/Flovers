import React from 'react';
import classes from '../Compositions.module.css';

interface Props {
    handleOpenMobileAdd: () => void
}

const BouquetAddButton: React.FC<Props> = ({
    handleOpenMobileAdd
}) => {
    return (
        <div className={classes.Button_Container_Mobile}>
            <button className={classes.Add_Bouquet_Button_Mobile} onClick={e => handleOpenMobileAdd()}>
                New Bouquet
            </button>
        </div>
    )
}

export default BouquetAddButton;