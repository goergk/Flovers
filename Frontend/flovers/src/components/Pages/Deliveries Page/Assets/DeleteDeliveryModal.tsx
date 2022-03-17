import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import Loader from '../../../Assets/Loader/Loader';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../Deliveries.module.css';
import { Delivery } from '../../../../services/FloristsApi';

interface Props {
    openDelete: boolean,
    loader: boolean,
    handleCloseDelete: () => void,
    deleteSingleDelivery: (delivery_id: number) => void,
    singleDelivery: Delivery | undefined
}

const DeleteDeliveryModal: React.FC<Props> = ({
    openDelete,
    loader,
    handleCloseDelete,
    deleteSingleDelivery,
    singleDelivery
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openDelete}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openDelete}>
                <div className={classes.Modal_container}>
                    {loader
                        ?
                        <Loader />
                        :
                        <>
                            <div className={classes.Close_Icon_container}>
                                <CancelIcon className={classes.Close_Icon} onClick={handleCloseDelete} />
                            </div>
                            <h2>
                                Are you sure to delete this delivery?
                            </h2>
                            <button className={classes.Modal_button} onClick={e => { deleteSingleDelivery(singleDelivery!.id) }}>Delete</button>
                        </>
                    }

                </div>
            </Fade>
        </Modal>
    )
}

export default DeleteDeliveryModal;