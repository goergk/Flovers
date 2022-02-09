import React from 'react';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../Resources.module.css';

interface Props {
    openDelete: boolean,
    handleCloseDelete: () => void,
    handleDelete: () => void
}

const DeleteFlowerModal: React.FC<Props> = ({
    openDelete,
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
                    <div className={classes.Close_Icon_container}>
                        <CancelIcon className={classes.Close_Icon} onClick={handleCloseDelete} />
                    </div>
                    <h2>
                        Are you sure to delete this flower?
                    </h2>
                    <form className={classes.Modal_Form}>
                        <button className={classes.Modal_button} onClick={e => handleDelete()} type="button">Delete</button>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
};

export default DeleteFlowerModal;
