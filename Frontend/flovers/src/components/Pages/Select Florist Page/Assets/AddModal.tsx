import Modal from '@mui/material/Modal';
import React from 'react';
import { Backdrop, Fade } from '@mui/material';
import Loader from '../../../Assets/Loader/Loader';
import CancelIcon from '@mui/icons-material/Cancel';
import classes from '../FloristSelect.module.css';
import TextField from '@mui/material/TextField';
import { FormikErrors } from 'formik';

interface Props {
    open: boolean,
    loader: boolean,
    handleClose: () => void,
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
    values: {
        Name: string;
    },
    errors: FormikErrors<{
        Name: string;
    }>,
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    },
    err: boolean,
    setErr: React.Dispatch<React.SetStateAction<boolean>>
}

const AddModal: React.FC<Props> = ({
    open,
    loader,
    handleClose,
    handleSubmit,
    values,
    errors,
    handleChange,
    err,
    setErr
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.Modal_container}>
                    {
                        loader
                            ?
                            <Loader />
                            :
                            <>
                                <CancelIcon className={classes.Close_Icon} onClick={handleClose} />
                                <h2>
                                    Add new Florist
                                </h2>
                                <p>
                                    <b>Select name for your florist:</b>
                                </p>
                                <form className={classes.Modal_Form} onSubmit={handleSubmit}>
                                    <TextField
                                        id="Name"
                                        label="Florist Name"
                                        variant="outlined"
                                        size="small"
                                        value={values.Name}
                                        error={errors.Name !== undefined || err}
                                        helperText={err ? 'Florist with that name already exists' : errors.Name}
                                        onChange={e => { handleChange(e); setErr(false); }}
                                    />
                                    <button className={classes.Modal_button} type="submit">Add</button>
                                </form>
                            </>
                    }
                </div>
            </Fade>
        </Modal>
    )
}

export default AddModal;