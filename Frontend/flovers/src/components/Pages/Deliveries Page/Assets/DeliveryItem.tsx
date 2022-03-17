import React from 'react';
import classes from '../Deliveries.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Delivery } from '../../../../services/FloristsApi';

interface Props {
    delivery: Delivery,
    updateSingleDelivery: (delivery_id: number) => void,
    handleOpenDelivery: () => void,
    index: number,
    handleOpenDelete: () => void
}

const DeliveryItem: React.FC<Props> = ({
    delivery,
    updateSingleDelivery,
    handleOpenDelivery,
    index,
    handleOpenDelete
}) => {
    return (
        <div
            className={classes.List_Item_Container}
            key={delivery.id}
            onClick={e => {
                updateSingleDelivery(delivery.id);
                handleOpenDelivery();
            }}
        >
            <div className={classes.Show_Number}>
                <p className={classes.List_Container_Text}>
                    {index + 1}
                </p>
            </div>
            <div className={classes.Show_Name}>
                <p className={classes.List_Container_Text_First}>
                    {delivery.id}
                </p>
            </div>
            <div className={classes.Show_Date}>
                <p className={classes.List_Container_Text}>
                    {delivery.date.toString().split('T')[0]}
                </p>
            </div>
            <div className={classes.Show_Amount}>
                <DeleteForeverIcon className={classes.More_Options_Icon}
                    onClick={e => {
                        e.stopPropagation();
                        updateSingleDelivery(delivery.id);
                        handleOpenDelete();
                    }} />
            </div>
        </div>
    )
}

export default DeliveryItem