import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../Deliveries.module.css';
import { Delivery } from '../../../../services/FloristsApi';

interface Props {
    openDelivery: boolean,
    handleCloseDelivery: () => void,
    singleDelivery: Delivery | undefined
}

const ShowDeliveryModal: React.FC<Props> = ({
    openDelivery,
    handleCloseDelivery,
    singleDelivery
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openDelivery}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openDelivery}>
                <div className={classes.Main_Delivery_Modal_container}>
                    <div className={classes.Delivery_Modal_Container}>
                        <div className={classes.Close_Icon_container}>
                            <CancelIcon className={classes.Close_Icon} onClick={handleCloseDelivery} />
                        </div>
                        <h2>
                            Delivery {singleDelivery?.id}
                        </h2>
                        <div className={classes.Delivery_Modal_List_Container} style={{ maxHeight: '100%', overflow: 'auto' }}>
                            {
                                singleDelivery?.flowers?.map((flower, index) => {
                                    return (
                                        <div className={classes.Delivery_Item_Container} key={flower.id}>
                                            <div className={classes.Container_C1}>
                                                <b>{index + 1}</b>
                                            </div>
                                            <div className={classes.Container_C2}>
                                                {flower.name}
                                            </div>
                                            <div className={classes.Container_C3}>
                                                {flower.amount}
                                            </div>
                                            <div className={classes.Container_C4}>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ShowDeliveryModal