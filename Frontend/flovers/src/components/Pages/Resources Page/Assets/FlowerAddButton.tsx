import React from 'react';
import classes from '../Resources.module.css';

interface Props {
    handleOpenAdd: () => void
}

const FlowerAddButton: React.FC<Props> = ({ handleOpenAdd }) => {
    return (
        <div className={classes.Button_Container_Mobile}>
            <button className={classes.Add_Flower_Button_Mobile} onClick={e => handleOpenAdd()}>
                Add Flower
            </button>
        </div>
    );
};

export default FlowerAddButton;
