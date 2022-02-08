import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import classes from '../Resources.module.css';
import { Flower } from '../../../../services/FloristsApi';

interface Props {
    flower: Flower,
    indexOfElement: number,
    index: number,
    handleOpenEdit: (flower_id: number) => void,
    setEditValues: (florist_name: string, florist_price: string) => void,
    handleOpenDelete: (flower_id: number) => void,
}

const MoreOptionsBox: React.FC<Props> = ({
    flower,
    indexOfElement,
    index,
    handleOpenEdit,
    setEditValues,
    handleOpenDelete
}) => {
    return (
        <div className={indexOfElement !== index ? classes.More_Options_Container : classes.More_Options_Container_Show}>
            <div className={classes.More_Options_Container_1}>
                <div className={classes.C1}>
                    <p className={classes.List_Container_Text}>
                        Last 3 Deliveries:
                    </p>
                </div>
                <div className={classes.C2}></div>
                <div className={classes.C3}>
                    <ModeEditIcon
                        className={classes.More_Options_Icon}
                        onClick={e => {
                            handleOpenEdit(flower.id);
                            setEditValues(flower.name, flower.price);
                        }}
                    />
                    <DeleteForeverIcon
                        className={classes.More_Options_Icon}
                        onClick={e => handleOpenDelete(flower.id)}
                    />
                </div>
            </div>
            <div className={classes.More_Options_Container_1}>
                <div className={classes.C1}>
                    <p className={classes.List_Container_Text}>
                        Delivery:
                    </p>
                </div>
                <div className={classes.C2}>
                    <p className={classes.List_Container_Text}>
                        Amount:
                    </p>
                </div>
                <div className={classes.C3}>
                </div>
            </div>
            {[1, 2, 3].map(item => {
                return (
                    <div className={classes.More_Options_List_Container_1}>
                        <div className={classes.C1}>
                            <p className={classes.List_Container_Text_White}>
                                990321
                            </p>
                        </div>
                        <div className={classes.C2}>
                            <p className={classes.List_Container_Text_White}>
                                7
                            </p>
                        </div>
                        <div className={classes.C3}>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default MoreOptionsBox;
