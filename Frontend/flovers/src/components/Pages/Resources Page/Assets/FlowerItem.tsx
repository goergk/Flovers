import React from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import classes from '../Resources.module.css';
import { Flower } from '../../../../services/FloristsApi';

interface Props {
    flower: Flower,
    indexOfElement: number,
    index: number,
    handleInput: (index: number) => void
}

const FlowerItem: React.FC<Props> = ({
    flower,
    indexOfElement,
    index,
    handleInput
}) => {
    return (
        <div className={classes.List_Item_Container}>
            <div className={classes.Show_Number}>
                <p
                    className={classes.List_Container_Text}
                    style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}>
                    {index + 1}
                </p>
            </div>
            <div className={classes.Show_Name}>
                <p
                    className={indexOfElement !== index
                        ?
                        classes.List_Container_Text_First
                        :
                        classes.List_Container_Text_First_True
                    }>
                    {flower.name}
                </p>
            </div>
            <div className={classes.Show_Date}>
                <p
                    className={classes.List_Container_Text}
                    style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}>
                    {flower.creation_date.toString().split('T')[0]}
                </p>
            </div>
            <div className={classes.Show_Price}>
                <p
                    className={classes.List_Container_Text}
                    style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}>
                    {flower.price}$
                </p>
            </div>
            <div className={classes.Show_Amount}>
                <p
                    className={classes.List_Container_Text}
                    style={{ "color": indexOfElement !== index ? "rgb(195, 195, 195)" : "#d97979" }}>
                    {flower.amount}
                </p>
                <ExpandCircleDownIcon
                    onClick={e => handleInput(index)}
                    className={indexOfElement !== index ? classes.Show_More_Icon : classes.Show_More_Icon_True}
                />
            </div>
        </div>
    );
};

export default FlowerItem;
