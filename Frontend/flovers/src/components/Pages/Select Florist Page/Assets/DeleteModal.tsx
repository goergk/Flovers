import Modal from '@mui/material/Modal';
import React from 'react';
import { Backdrop, Fade } from '@mui/material';
import Loader from '../../../Assets/Loader/Loader';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../FloristSelect.module.css';

interface Props {
    openDelete: boolean,
    loader: boolean,
    handleCloseDelete: () => void,
    handleDelete: () => void
}

const DeleteModal: React.FC<Props> = ({
    openDelete,
    loader,
    handleCloseDelete,
    handleDelete
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
                    {
                        loader
                            ?
                            <Loader />
                            :
                            <>
                                <div className={classes.Close_Icon_container}>
                                    <CancelIcon className={classes.Close_Icon} onClick={handleCloseDelete} />
                                </div>
                                <h2>
                                    Are you sure to delete this florist?
                                </h2>
                                <button className={classes.Modal_button} onClick={e => handleDelete()} type="button">Delete</button>
                            </>
                    }
                </div>
            </Fade>
        </Modal>
    )
}

export default DeleteModal;