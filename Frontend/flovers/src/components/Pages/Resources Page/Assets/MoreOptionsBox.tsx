import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import classes from '../Resources.module.css';
import { Delivery, Flower } from '../../../../services/FloristsApi';

interface Props {
    flower: Flower,
    indexOfElement: number,
    index: number,
    handleOpenEdit: (flower_id: number) => void,
    setEditValues: (florist_name: string, florist_price: string) => void,
    handleOpenDelete: (flower_id: number) => void,
    deliveriesData: Delivery[] | undefined,
    handleOpenDelivery: () => void,
    updateSingleDelivery: (delivery_id: number, flower_name: string) => void
}

const MoreOptionsBox: React.FC<Props> = ({
    flower,
    indexOfElement,
    index,
    handleOpenEdit,
    setEditValues,
    handleOpenDelete,
    deliveriesData,
    handleOpenDelivery,
    updateSingleDelivery
}) => {
    let i = 0;

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
            {flower.amount !== 0
                ?
                deliveriesData?.map((delivery) => {
                    return (
                        <React.Fragment key={delivery.id}>
                            {delivery.flowers.map((flower_, index) => {
                                if (flower_.name === flower.name && i < 3) {
                                    i += 1;
                                    return (
                                        <React.Fragment key={flower_.id}>
                                            <div
                                                className={classes.More_Options_List_Container_1}
                                                key={delivery.id}
                                                onClick={e => {
                                                    updateSingleDelivery(delivery.id, flower_.name);
                                                    handleOpenDelivery();
                                                }}
                                            >
                                                <div className={classes.C1}>
                                                    <p className={classes.List_Container_Text_White}>
                                                        {delivery.id}
                                                    </p>
                                                </div>
                                                <div className={classes.C2}>
                                                    <p className={classes.List_Container_Text_White}>
                                                        {flower_.amount}
                                                    </p>
                                                </div>
                                                <div className={classes.C3}>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </React.Fragment>
                    )
                })
                :
                <h5 style={{ marginLeft: '2.5em' }}>
                    No deliveries found
                </h5>
            }
        </div>
    );
};

export default MoreOptionsBox;
